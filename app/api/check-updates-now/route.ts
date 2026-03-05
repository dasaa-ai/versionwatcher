import { NextResponse } from "next/server";
import { Resend } from "resend";
import { createServerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

type SubscriptionRow = {
  status: string | null;
  stripe_price_id: string | null;
};

type AppStoreLookup = {
  name: string;
  version: string;
  trackViewUrl: string;
  artworkUrl100?: string;
  appId: string;
  country: string;
};

async function fetchAppDetails(appId: string, country: string): Promise<AppStoreLookup | null> {
  const safeCountry = (country || "us").toLowerCase();

  const res = await fetch(
    `https://itunes.apple.com/lookup?id=${encodeURIComponent(appId)}&country=${encodeURIComponent(
      safeCountry
    )}`,
    { cache: "no-store" }
  );
  if (!res.ok) return null;

  const data = await res.json();
  const app = data?.results?.[0];
  if (!app?.version) return null;

  const trackViewUrl: string =
    app.trackViewUrl || `https://apps.apple.com/${safeCountry}/app/id${appId}`;

  return {
    name: app.trackName ?? "Unknown app",
    version: app.version,
    trackViewUrl,
    artworkUrl100: app.artworkUrl100,
    appId,
    country: safeCountry,
  };
}

function getPlanLimitForUser(sub: SubscriptionRow | null, PRICE_BASIC?: string, PRICE_PRO?: string) {
  // Default = Free
  let limit = 1;

  const active = sub?.status === "active";
  if (!active) return limit;

  if (sub?.stripe_price_id && PRICE_PRO && sub.stripe_price_id === PRICE_PRO) return Infinity;
  if (sub?.stripe_price_id && PRICE_BASIC && sub.stripe_price_id === PRICE_BASIC) return 5;

  // Active but unknown price_id → safest downgrade behavior
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

export async function POST() {
  // Auth (cookie session)
  const cookieStore = await cookies() as any;

const supabaseAuth = createServerClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  {
    cookies: {
      get(name: string) {
        return cookieStore.get(name)?.value;
      },
      set(name: string, value: string, options: any) {
        cookieStore.set({ name, value, ...options });
      },
      remove(name: string, options: any) {
        cookieStore.set({ name, value: "", ...options, maxAge: 0 });
      },
    },
  }
);

  const { data: auth } = await supabaseAuth.auth.getUser();
  const user = auth.user;

  if (!user) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
  const PRICE_BASIC = process.env.NEXT_PUBLIC_STRIPE_PRICE_BASIC;
  const PRICE_PRO = process.env.NEXT_PUBLIC_STRIPE_PRICE_PRO;

  const headers = {
    apikey: serviceKey,
    Authorization: `Bearer ${serviceKey}`,
    "Content-Type": "application/json",
  };

  // 1) Read this user's watchlist
  const watchRes = await fetch(
    `${supabaseUrl}/rest/v1/watchlist?select=*&user_id=eq.${encodeURIComponent(user.id)}`,
    { headers, cache: "no-store" }
  );
  if (!watchRes.ok) {
    const t = await watchRes.text();
    return NextResponse.json({ error: "Failed to read watchlist", details: t }, { status: 500 });
  }
  const watchlist = (await watchRes.json()) as any[];

  // 2) Read this user's subscription
  const subRes = await fetch(
    `${supabaseUrl}/rest/v1/subscriptions?select=status,stripe_price_id&user_id=eq.${encodeURIComponent(
      user.id
    )}&limit=1`,
    { headers, cache: "no-store" }
  );
  if (!subRes.ok) {
    const t = await subRes.text();
    return NextResponse.json({ error: "Failed to read subscription", details: t }, { status: 500 });
  }
  const subArr = (await subRes.json()) as SubscriptionRow[];
  const sub = subArr?.[0] ?? null;

  // Apply plan limit (stable order: oldest first)
  watchlist.sort((a, b) => {
    const da = a.created_at ? new Date(a.created_at).getTime() : 0;
    const db = b.created_at ? new Date(b.created_at).getTime() : 0;
    return da - db;
  });

  const limit = getPlanLimitForUser(sub, PRICE_BASIC, PRICE_PRO);
  const allowedRows = limit === Infinity ? watchlist : watchlist.slice(0, limit);

  const resendKey = process.env.RESEND_API_KEY;
  const resend = resendKey ? new Resend(resendKey) : null;
  const fromEmail = process.env.ALERT_FROM_EMAIL || "Updates <onboarding@resend.dev>";

  let checked = 0;
  let updated = 0;
  let emailed = 0;

  for (const row of allowedRows) {
    checked++;

    const appId = row.app_store_id;
    const country = row.country || "us";
    const prevVersion = row.last_version;

    const latest = await fetchAppDetails(appId, country);
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

    // First time initialization: set last_version, do NOT email
    if (!prevVersion) {
      await fetch(`${supabaseUrl}/rest/v1/watchlist?id=eq.${row.id}`, {
        method: "PATCH",
        headers,
        body: JSON.stringify({ last_version: latest.version }),
      });
      continue;
    }

    // Version changed → update + email
    if (latest.version !== prevVersion) {
      updated++;

      await fetch(`${supabaseUrl}/rest/v1/watchlist?id=eq.${row.id}`, {
        method: "PATCH",
        headers,
        body: JSON.stringify({ last_version: latest.version }),
      });

      if (resend && user.email) {
        try {
          const url = latest.trackViewUrl;

          await resend.emails.send({
            from: fromEmail,
            to: user.email,
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

  return NextResponse.json({ ok: true, checked, updated, emailed });
}
