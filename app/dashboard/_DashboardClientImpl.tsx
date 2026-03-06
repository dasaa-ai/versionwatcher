"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { supabaseBrowser } from "@/lib/supabaseBrowser";

type AppSuggestion = {
  appId: string;
  name: string;
  version?: string | null;
  iconUrl?: string | null;
};

type WatchItem = {
  id: string;
  user_id: string;
  app_store_id: string;
  app_name: string | null;
  country: string | null;
  last_version: string | null;
  last_checked_at: string | null;
  created_at: string | null;
};

type SubscriptionRow = {
  user_id: string;
  status: string | null;
  stripe_price_id: string | null;
};

const PRICE_BASIC = process.env.NEXT_PUBLIC_STRIPE_PRICE_BASIC;
const PRICE_PRO = process.env.NEXT_PUBLIC_STRIPE_PRICE_PRO;

function planNameFromPriceId(priceId: string | null) {
  if (!priceId) return "Free";
  if (PRICE_PRO && priceId === PRICE_PRO) return "Pro";
  if (PRICE_BASIC && priceId === PRICE_BASIC) return "Basic";
  return "Free";
}

function getPlanLimit(planName: string, status: string) {
  // Free / inactive users: 1
  if (status !== "active") return 1;

  if (planName === "Pro") return Infinity;
  if (planName === "Basic") return 5;

  return 1;
}

export default function DashboardPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const supabase = supabaseBrowser();

  const [loading, setLoading] = useState(true);

  const [email, setEmail] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);

  const [subscription, setSubscription] = useState<SubscriptionRow | null>(null);
  const [watchlist, setWatchlist] = useState<WatchItem[]>([]);

  const [appQuery, setAppQuery] = useState("");
  const [suggestions, setSuggestions] = useState<AppSuggestion[]>([]);
  const [selectedApp, setSelectedApp] = useState<AppSuggestion | null>(null);

  const [adding, setAdding] = useState(false);
  const [removingId, setRemovingId] = useState<string | null>(null);

  const [checkingNow, setCheckingNow] = useState(false);
  const [checkNowMsg, setCheckNowMsg] = useState<string | null>(null);

  const success = searchParams.get("success") === "true";

  async function refreshAll() {
    setLoading(true);

    const { data: auth } = await supabase.auth.getUser();
    const user = auth.user;

    if (!user) {
      router.push("/login");
      return;
    }

    setEmail(user.email ?? null);
    setUserId(user.id);

    const [watchRes, subRes] = await Promise.all([
      supabase
        .from("watchlist")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false }),
      supabase.from("subscriptions").select("*").eq("user_id", user.id).maybeSingle(),
    ]);

    setWatchlist((watchRes.data as WatchItem[]) || []);
    setSubscription((subRes.data as SubscriptionRow) || null);

    setLoading(false);
  }

  useEffect(() => {
    refreshAll();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function logout() {
    await supabase.auth.signOut();
    router.push("/login");
  }

  async function startCheckout(plan: "basic" | "pro") {
    const priceId = plan === "basic" ? PRICE_BASIC : PRICE_PRO;

    if (!priceId) {
      alert(
        `Missing ${plan.toUpperCase()} priceId in env.\n\nCheck .env.local has:\nNEXT_PUBLIC_STRIPE_PRICE_BASIC=price_...\nNEXT_PUBLIC_STRIPE_PRICE_PRO=price_...\n\nThen restart: npm run dev`
      );
      return;
    }

    const res = await fetch("/api/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ priceId }),
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data?.error || "Checkout failed");
      return;
    }

    window.location.href = data.url;
  }

  async function openBillingPortal() {
    if (!userId) return;

    const res = await fetch("/api/billing-portal", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId }),
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data?.error || "Failed to open billing portal");
      return;
    }

    window.location.href = data.url;
  }

  // --- App search (typeahead)
  useEffect(() => {
    let active = true;

    async function run() {
      const q = appQuery.trim();
      if (q.length < 2) {
        setSuggestions([]);
        return;
      }

      const res = await fetch(`/api/app-search?term=${encodeURIComponent(q)}&country=ie`);
      const data = await res.json();
      if (!active) return;

      if (res.ok && Array.isArray(data?.results)) {
        setSuggestions(data.results);
      } else {
        setSuggestions([]);
      }
    }

    run();
    return () => {
      active = false;
    };
  }, [appQuery]);

  function selectSuggestion(s: AppSuggestion) {
    setSelectedApp(s);
    setAppQuery(s.name);
    setSuggestions([]);
  }

  const planName = useMemo(
    () => planNameFromPriceId(subscription?.stripe_price_id ?? null),
    [subscription?.stripe_price_id]
  );

  const status = subscription?.status ?? "inactive";
  const limit = getPlanLimit(planName, status);
  const isPaidActive = status === "active";
  const showUpgradeButtons = !isPaidActive;

  async function addSelectedApp() {
    if (!selectedApp || adding) return;

    // Enforce plan limit in UI
    if (watchlist.length >= limit) {
      if (planName === "Free") alert("Free plan allows only 1 app. Upgrade to add more.");
      else alert("You have reached your plan limit. Upgrade to add more apps.");
      return;
    }

    setAdding(true);

    try {
      const { data: auth } = await supabase.auth.getUser();
      const user = auth.user;

      if (!user) {
        router.push("/login");
        return;
      }

      // Robustly resolve App Store ID (different shapes supported)
      const appStoreIdRaw =
        (selectedApp as any).app_store_id ??
        (selectedApp as any).appId ??
        (selectedApp as any).trackId ??
        (selectedApp as any).id;

      const appStoreId = appStoreIdRaw ? String(appStoreIdRaw) : "";

      if (!appStoreId) {
        alert(
          "Could not add this app because its App Store ID is missing. Please re-select the app from the dropdown list and try again."
        );
        return;
      }

      const insertRes = await supabase.from("watchlist").insert({
        user_id: user.id,
        app_store_id: appStoreId,
        app_name: selectedApp.name,
        country: "ie",
        last_version: selectedApp.version || null,
      });

      if (insertRes.error) {
        alert(insertRes.error.message);
        return;
      }

      setSelectedApp(null);
      setAppQuery("");
      setSuggestions([]);

      await refreshAll();
    } finally {
      setAdding(false);
    }
  }

  async function removeWatchItem(item: WatchItem) {
    if (removingId) return;

    setRemovingId(item.id);

    try {
      const { data: auth } = await supabase.auth.getUser();
      const user = auth.user;

      if (!user) {
        router.push("/login");
        return;
      }

      const res = await supabase
        .from("watchlist")
        .delete()
        .eq("id", item.id)
        .eq("user_id", user.id);

      if (res.error) {
        alert(res.error.message);
        return;
      }

      await refreshAll();
    } finally {
      setRemovingId(null);
    }
  }

  async function checkUpdatesNow() {
    if (checkingNow) return;

    setCheckingNow(true);
    setCheckNowMsg(null);

    try {
      const res = await fetch("/api/check-updates-now", { method: "POST" });
      const data = await res.json();

      if (!res.ok) {
        alert(data?.error || "Check failed");
        return;
      }

      setCheckNowMsg(
        `Checked ${data.checked}. Updated ${data.updated}. Emailed ${data.emailed}.`
      );

      // Refresh UI timestamps (last_checked_at etc.)
      await refreshAll();
    } finally {
      setCheckingNow(false);
    }
  }

  if (loading) return <p style={{ padding: 40 }}>Loading…</p>;

  return (
    <main style={{ minHeight: "100vh", padding: 40, maxWidth: 900, margin: "0 auto" }}>
      <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 6 }}>Dashboard</h1>
      <p style={{ marginTop: 0 }}>
        Logged in as: <strong>{email}</strong>
      </p>

      {success && (
        <div
          style={{
            marginTop: 16,
            padding: 12,
            borderRadius: 12,
            background: "rgba(34,197,94,0.15)",
            border: "1px solid rgba(34,197,94,0.35)",
          }}
        >
          ✅ Payment successful! Your subscription is active.
        </div>
      )}

      <div style={{ display: "flex", gap: 10, marginTop: 18, flexWrap: "wrap" }}>
        <button
          onClick={logout}
          style={{
            padding: "10px 14px",
            borderRadius: 10,
            border: "1px solid #0f172a",
            background: "#0f172a",
            color: "white",
            cursor: "pointer",
          }}
        >
          Logout
        </button>

        <button
          onClick={checkUpdatesNow}
          disabled={checkingNow}
          style={{
            padding: "10px 14px",
            borderRadius: 10,
            border: "1px solid #0f172a",
            background: "white",
            color: "#0f172a",
            cursor: checkingNow ? "not-allowed" : "pointer",
          }}
        >
          {checkingNow ? "Checking…" : "Check updates now"}
        </button>

        {isPaidActive && (
          <button
            onClick={openBillingPortal}
            style={{
              padding: "10px 14px",
              borderRadius: 10,
              border: "1px solid #0f172a",
              background: "white",
              color: "#0f172a",
              cursor: "pointer",
            }}
          >
            Manage billing
          </button>
        )}
      </div>

      {checkNowMsg && (
        <div
          style={{
            marginTop: 12,
            padding: 12,
            borderRadius: 12,
            background: "rgba(59,130,246,0.12)",
            border: "1px solid rgba(59,130,246,0.25)",
          }}
        >
          {checkNowMsg}
        </div>
      )}

      <hr style={{ margin: "22px 0" }} />

      <div style={{ display: "flex", alignItems: "baseline", gap: 12, flexWrap: "wrap" }}>
        <h2 style={{ margin: 0 }}>Your plan</h2>
        <div style={{ color: "#334155" }}>
          <strong>{planName}</strong> ({status}) • Apps: <strong>{watchlist.length}</strong> /{" "}
          <strong>{limit === Infinity ? "∞" : limit}</strong>
        </div>
      </div>

      {showUpgradeButtons && (
        <div style={{ display: "flex", gap: 10, marginTop: 12, flexWrap: "wrap" }}>
          <button
            onClick={() => startCheckout("basic")}
            style={{
              padding: "10px 14px",
              borderRadius: 10,
              border: "1px solid #0f172a",
              background: "#0f172a",
              color: "white",
              cursor: "pointer",
            }}
          >
            Upgrade Basic (€9)
          </button>

          <button
            onClick={() => startCheckout("pro")}
            style={{
              padding: "10px 14px",
              borderRadius: 10,
              border: "1px solid #0f172a",
              background: "white",
              color: "#0f172a",
              cursor: "pointer",
            }}
          >
            Upgrade Pro (€19)
          </button>
        </div>
      )}

      <hr style={{ margin: "22px 0" }} />

      <h2 style={{ marginTop: 0 }}>Add an iOS app</h2>

      <div style={{ position: "relative", maxWidth: 520 }}>
        <input
          value={appQuery}
          onChange={(e) => {
            setAppQuery(e.target.value);
            setSelectedApp(null);
          }}
          placeholder="Search an app (e.g. Spotify)"
          style={{
            width: "100%",
            padding: "12px 12px",
            borderRadius: 10,
            border: "1px solid #cbd5e1",
            outline: "none",
          }}
        />

        {suggestions.length > 0 && (
          <div
            style={{
              position: "absolute",
              zIndex: 20,
              top: 46,
              left: 0,
              right: 0,
              background: "white",
              border: "1px solid #e2e8f0",
              borderRadius: 10,
              overflow: "hidden",
              boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
            }}
          >
            {suggestions.slice(0, 8).map((s) => (
              <button
                key={s.appId}
                onClick={() => selectSuggestion(s)}
                style={{
                  width: "100%",
                  textAlign: "left",
                  padding: 10,
                  border: "none",
                  background: "white",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                }}
              >
                {s.iconUrl ? (
                  <img
                    src={s.iconUrl}
                    alt=""
                    width={32}
                    height={32}
                    style={{ borderRadius: 8 }}
                  />
                ) : (
                  <div
                    style={{
                      width: 32,
                      height: 32,
                      borderRadius: 8,
                      background: "#e2e8f0",
                    }}
                  />
                )}
                <div>
                  <div style={{ fontWeight: 700 }}>{s.name}</div>
                  <div style={{ fontSize: 12, color: "#64748b" }}>
                    {s.version ? `v${s.version}` : ""}
                  </div>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>

      <div style={{ marginTop: 12, display: "flex", gap: 10, flexWrap: "wrap" }}>
        <button
          onClick={addSelectedApp}
          disabled={!selectedApp || adding}
          style={{
            padding: "10px 14px",
            borderRadius: 10,
            border: "1px solid #0f172a",
            background: "#0f172a",
            color: "white",
            cursor: !selectedApp || adding ? "not-allowed" : "pointer",
          }}
        >
          {adding ? "Adding…" : "Add to watchlist"}
        </button>

        <div style={{ color: "#64748b", fontSize: 13, alignSelf: "center" }}>
          Tip: select the app from the dropdown first.
        </div>
      </div>

      <hr style={{ margin: "22px 0" }} />

      <h2 style={{ marginTop: 0 }}>Your watchlist</h2>

      {watchlist.length === 0 ? (
        <p style={{ color: "#64748b" }}>No apps yet. Add one above.</p>
      ) : (
        <div style={{ display: "grid", gap: 10 }}>
          {watchlist.map((w) => (
            <div
              key={w.id}
              style={{
                border: "1px solid #e2e8f0",
                borderRadius: 12,
                padding: 12,
                display: "flex",
                justifyContent: "space-between",
                gap: 12,
                alignItems: "center",
                flexWrap: "wrap",
              }}
            >
              <div style={{ minWidth: 260 }}>
                <div style={{ fontWeight: 800 }}>{w.app_name || "Unknown app"}</div>
                <div style={{ fontSize: 13, color: "#64748b" }}>
                  App Store ID: <span style={{ fontFamily: "monospace" }}>{w.app_store_id}</span>
                  {w.last_version ? ` • last version: v${w.last_version}` : ""}
                </div>
                <div style={{ fontSize: 12, color: "#94a3b8", marginTop: 4 }}>
                  Last checked: {w.last_checked_at ? new Date(w.last_checked_at).toLocaleString() : "—"}
                </div>
              </div>

              <button
                onClick={() => removeWatchItem(w)}
                disabled={removingId === w.id}
                style={{
                  padding: "10px 12px",
                  borderRadius: 10,
                  border: "1px solid rgba(239,68,68,0.45)",
                  background: "rgba(239,68,68,0.08)",
                  color: "#b91c1c",
                  cursor: removingId === w.id ? "not-allowed" : "pointer",
                }}
              >
                {removingId === w.id ? "Removing…" : "Remove"}
              </button>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}

