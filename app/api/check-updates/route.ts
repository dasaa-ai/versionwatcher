import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

type AppStoreLookup = {
  name: string;
  version: string;
  trackViewUrl: string;
  artworkUrl100?: string;
  appId: string;
  country: string;
};

type SubscriptionRow = {
  user_id: string;
  status: string | null;
  stripe_price_id: string | null;
};

async function fetchAppDetails(appId: string, country: string): Promise<AppStoreLookup | null> {
  const safeCountry = (country || "us").toLowerCase();

  const res = await fetch(
    `https://itunes.apple.com/lookup?id=${encodeURIComponent(appId)}&country=${encodeURIComponent(
      safeCountry
    )}`,
    {
      cache: "no-store",
    }
  );

  if (!res.ok) return null;

  const data = await res.json();
  const app = data?.results?.[0];
  if (!app?.version) return null;

  return {
    name: app.trackName ?? "Unknown app",
    version: app.version,
    trackViewUrl: app.trackViewUrl ?? "",
    artworkUrl100: app.artworkUrl100 ?? "",
    appId: String(app.trackId ?? appId),
    country: safeCountry,
  };
}

function getPlanLimitForUser(
  sub: SubscriptionRow | null,
  PRICE_BASIC?: string,
  PRICE_PRO?: string
) {
  if (!sub || sub.status !== "active") return 1;

  if (sub.stripe_price_id && PRICE_PRO && sub.stripe_price_id === PRICE_PRO) return Infinity;
  if (sub.stripe_price_id && PRICE_BASIC && sub.stripe_price_id === PRICE_BASIC) return 5;

  // Active but unknown price id → safest downgrade behavior
  return 1;
}

function appStoreButtonHtml(url: string) {
  return `
    <a href="${url}"
       style="
         display:inline-block;
         padding:12px 16px;
         border-radius:10px;
         text-decoration:none;
         font-weight:600;
         background:#2563eb;
         color:white;
       ">
      Open in App Store
    </a>
  `;
}

// Accept either:
// 1) Authorization: Bearer <CRON_SECRET>   (Vercel Cron secret approach)
// 2) x-cron-secret: <CRON_SECRET>          (legacy/manual curl approach)
function isAuthorized(req: NextRequest) {
  const secret = process.env.CRON_SECRET;

  if (!secret) {
    // If CRON_SECRET isn't set, don't block.
    // But you should keep it set in production.
    return true;
  }

  const auth = req.headers.get("authorization") || "";
  if (auth.startsWith("Bearer ")) {
    const token = auth.slice("Bearer ".length).trim();
    if (token === secret) return true;
  }

  const legacy = req.headers.get("x-cron-secret");
  if (legacy && legacy === secret) return true;

  return false;
}

async function runCheckUpdates(req: NextRequest) {
  if (!isAuthorized(req)) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

  const headers = {
    apikey: serviceRoleKey,
    Authorization: `Bearer ${serviceRoleKey}`,
    "Content-Type": "application/json",
  };

  const PRICE_BASIC = process.env.NEXT_PUBLIC_STRIPE_PRICE_BASIC;
  const PRICE_PRO = process.env.NEXT_PUBLIC_STRIPE_PRICE_PRO;

  const resendKey = process.env.RESEND_API_KEY;
  const fromEmail = process.env.ALERT_FROM_EMAIL || "Updates <onboarding@resend.dev>";
  const resend = resendKey ? new Resend(resendKey) : null;

  // 1) Load watchlist
  const watchlistResp = await fetch(`${supabaseUrl}/rest/v1/watchlist?select=*`, {
    headers,
    cache: "no-store",
  });

  if (!watchlistResp.ok) {
    const t = await watchlistResp.text();
    return NextResponse.json({ ok: false, error: "Failed to read watchlist", details: t }, { status: 500 });
  }

  const watchlistRows = await watchlistResp.json();

  // 2) Load profiles (emails)
  const profilesResp = await fetch(`${supabaseUrl}/rest/v1/profiles?select=id,email`, {
    headers,
    cache: "no-store",
  });

  if (!profilesResp.ok) {
    const t = await profilesResp.text();
    return NextResponse.json({ ok: false, error: "Failed to read profiles", details: t }, { status: 500 });
  }

  const profiles = await profilesResp.json();

  const emailByUserId = new Map<string, string>();
  for (const p of profiles) {
    if (p?.id && p?.email) emailByUserId.set(p.id, p.email);
  }

  // 3) Load subscriptions
  const subsResp = await fetch(
    `${supabaseUrl}/rest/v1/subscriptions?select=user_id,status,stripe_price_id`,
    { headers, cache: "no-store" }
  );

  if (!subsResp.ok) {
    const t = await subsResp.text();
    return NextResponse.json({ ok: false, error: "Failed to read subscriptions", details: t }, { status: 500 });
  }

  const subs: SubscriptionRow[] = await subsResp.json();

  const subByUserId = new Map<string, SubscriptionRow>();
  for (const s of subs) {
    if (s?.user_id) subByUserId.set(s.user_id, s);
  }

  // 4) Group watchlist by user
  const watchByUser = new Map<string, any[]>();
  for (const row of watchlistRows) {
    if (!row?.user_id) continue;
    const arr = watchByUser.get(row.user_id) || [];
    arr.push(row);
    watchByUser.set(row.user_id, arr);
  }

  // Sort each user's apps by created_at (oldest first) so limit selection is stable
  for (const [uid, rows] of watchByUser.entries()) {
    rows.sort((a, b) => {
      const da = a.created_at ? new Date(a.created_at).getTime() : 0;
      const db = b.created_at ? new Date(b.created_at).getTime() : 0;
      return da - db;
    });
    watchByUser.set(uid, rows);
  }

  let checked = 0;
  let updated = 0;
  let emailed = 0;
  let skippedByPlan = 0;

  for (const [userId, rows] of watchByUser.entries()) {
    const sub = subByUserId.get(userId) || null;
    const limit = getPlanLimitForUser(sub, PRICE_BASIC, PRICE_PRO);

    const allowedRows = limit === Infinity ? rows : rows.slice(0, limit);
    const blockedCount = limit === Infinity ? 0 : Math.max(0, rows.length - allowedRows.length);
    skippedByPlan += blockedCount;

    for (const row of allowedRows) {
      checked++;

      const appId = row.app_store_id;
      const prevVersion = row.last_version;
      const country = row.country || "us";

      if (!appId) continue;

      const latest = await fetchAppDetails(String(appId), String(country));
      if (!latest) continue;

      // Always update last_checked_at + app_name
      await fetch(`${supabaseUrl}/rest/v1/watchlist?id=eq.${row.id}`, {
        method: "PATCH",
        headers,
        body: JSON.stringify({
          last_checked_at: new Date().toISOString(),
          app_name: row.app_name ?? latest.name,
        }),
      });

      // If it's the first time (prevVersion is null), initialize and do NOT email.
      if (!prevVersion) {
        await fetch(`${supabaseUrl}/rest/v1/watchlist?id=eq.${row.id}`, {
          method: "PATCH",
          headers,
          body: JSON.stringify({ last_version: latest.version }),
        });
        continue;
      }

      // If version changed, update DB + email
      if (latest.version !== prevVersion) {
        updated++;

        await fetch(`${supabaseUrl}/rest/v1/watchlist?id=eq.${row.id}`, {
          method: "PATCH",
          headers,
          body: JSON.stringify({ last_version: latest.version }),
        });

        const to = emailByUserId.get(row.user_id);
        if (!to) continue;

        if (resend) {
          try {
            const url = latest.trackViewUrl;

            await resend.emails.send({
              from: fromEmail,
              to,
              subject: `✅ Update available: ${latest.name} → v${latest.version}`,
              html: `
                <div style="font-family:system-ui,-apple-system,Segoe UI,Roboto,Arial; line-height:1.4;">
                  <div style="max-width:560px;margin:0 auto;padding:16px;">
                    <h2 style="margin:0 0 10px;">${latest.name} has an update 🎉</h2>
                    <p style="margin:0 0 12px;">
                      Old: <b>${prevVersion}</b> → New: <b>${latest.version}</b>
                    </p>

                    ${url ? `<div style="margin:16px 0;">${appStoreButtonHtml(url)}</div>` : ""}

                    <p style="color:#6b7280;font-size:13px;margin-top:18px;">
                      You’re receiving this because this app is in your watchlist.
                    </p>
                  </div>
                </div>
              `,
            });

            emailed++;
          } catch (e) {
            console.error("Email send failed:", e);
          }
        }
      }
    }
  }

  return NextResponse.json({
    ok: true,
    checked,
    updated,
    emailed,
    skippedByPlan,
  });
}

// Vercel Cron uses GET
export async function GET(req: NextRequest) {
  return runCheckUpdates(req);
}

// Keep POST too (handy for manual testing)
export async function POST(req: NextRequest) {
  return runCheckUpdates(req);
}
