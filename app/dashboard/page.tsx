"use client";

import React, { Suspense, useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { supabaseBrowser } from "@/lib/supabaseBrowser";

type WatchItem = {
  id: string;
  user_id: string;
  store: string | null;
  app_name: string | null;
  app_store_id: string; // not-null in DB
  country: string | null;
  last_version: string | null;
  last_checked_at: string | null;
  created_at: string;
};

type SubscriptionRow = {
  status: string | null;
  stripe_price_id: string | null;
};

type AppSuggestion = {
  appId: string; // from your /api/app-search mapping
  name: string;
  version?: string;
  iconUrl?: string;
};

const PRICE_BASIC = process.env.NEXT_PUBLIC_STRIPE_PRICE_BASIC;
const PRICE_PRO = process.env.NEXT_PUBLIC_STRIPE_PRICE_PRO;

function planNameFromPriceId(priceId: string | null) {
  if (!priceId) return "Free";
  if (PRICE_PRO && priceId === PRICE_PRO) return "Pro";
  if (PRICE_BASIC && priceId === PRICE_BASIC) return "Basic";
  return "Paid";
}

function getPlanLimit(planName: string, status: string) {
  if (status !== "active") return 1; // Free behavior if not active
  if (planName === "Basic") return 5;
  if (planName === "Pro") return 999999; // practically unlimited
  return 1;
}

/**
 * ✅ Important: Next.js requires useSearchParams() to be inside Suspense.
 * We keep the banner behavior identical, just moved into this child.
 */
function BannerFromQuery({ onBanner }: { onBanner: (msg: string | null) => void }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const success = searchParams.get("success");
    const canceled = searchParams.get("canceled");

    if (success === "1") {
      onBanner("✅ Payment successful! Your subscription is being activated. (May take a few seconds.)");
    } else if (canceled === "1") {
      onBanner("⚠️ Checkout canceled. You can try again anytime.");
    }

    if (success === "1" || canceled === "1") {
      const t = setTimeout(() => {
        router.replace("/dashboard");
      }, 2500);
      return () => clearTimeout(t);
    }
  }, [searchParams, router, onBanner]);

  return null;
}

export default function DashboardPage() {
  const router = useRouter();
  const supabase = useMemo(() => supabaseBrowser(), []);

  const [email, setEmail] = useState<string>("");
  const [userId, setUserId] = useState<string>("");

  const [loading, setLoading] = useState(true);
  const [subscription, setSubscription] = useState<SubscriptionRow | null>(null);
  const [watchlist, setWatchlist] = useState<WatchItem[]>([]);

  // App search
  const [appQuery, setAppQuery] = useState("");
  const [suggestions, setSuggestions] = useState<AppSuggestion[]>([]);
  const [selectedApp, setSelectedApp] = useState<AppSuggestion | null>(null);
  const [adding, setAdding] = useState(false);

  // Banner
  const [banner, setBanner] = useState<string | null>(null);

  async function refreshAll() {
    setLoading(true);

    const { data: auth } = await supabase.auth.getUser();
    const user = auth.user;

    if (!user) {
      router.push("/login");
      return;
    }

    setEmail(user.email || "");
    setUserId(user.id);

    // subscription
    const subRes = await supabase
      .from("subscriptions")
      .select("status, stripe_price_id")
      .eq("user_id", user.id)
      .maybeSingle();

    setSubscription((subRes.data as SubscriptionRow) || { status: null, stripe_price_id: null });

    // watchlist (NEW columns)
    const wlRes = await supabase
      .from("watchlist")
      .select("id,user_id,store,app_name,app_store_id,country,last_version,last_checked_at,created_at")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false });

    setWatchlist((wlRes.data as WatchItem[]) || []);
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

      // keep country fixed for now (you can make it a dropdown later)
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

  async function addSelectedApp() {
    if (!selectedApp || adding) return;

    // Enforce plan limit in UI
    const planName = planNameFromPriceId(subscription?.stripe_price_id ?? null);
    const status = subscription?.status ?? "inactive";
    const limit = getPlanLimit(planName, status);

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

      // Robustly resolve App Store ID
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

      // Optional: prevent duplicates (same app_store_id + same country)
      const alreadyExists = watchlist.some(
        (w) => String(w.app_store_id) === appStoreId && (w.country ?? "ie") === "ie"
      );
      if (alreadyExists) {
        alert("This app is already in your watchlist.");
        setSelectedApp(null);
        setAppQuery("");
        setSuggestions([]);
        return;
      }

      const insertRes = await supabase.from("watchlist").insert({
        user_id: user.id,
        store: "ios",
        app_name: selectedApp.name ?? null,
        app_store_id: appStoreId, // ✅ never null
        country: "ie",
        last_version: selectedApp.version || null,
        // last_checked_at stays null (checker updates it)
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

  const planName = planNameFromPriceId(subscription?.stripe_price_id ?? null);
  const status = subscription?.status ?? "inactive";
  const isPaidActive = status === "active";
  const showUpgradeButtons = !isPaidActive;

  if (loading) return <div style={{ padding: 40 }}>Loading…</div>;

  return (
    <div style={{ padding: 28, maxWidth: 980, margin: "0 auto" }}>
      {/* ✅ This fixes your Vercel build error */}
      <Suspense fallback={null}>
        <BannerFromQuery onBanner={setBanner} />
      </Suspense>

      <h1 style={{ fontSize: 28, marginBottom: 8 }}>Dashboard</h1>

      <div style={{ opacity: 0.9, marginBottom: 18 }}>
        Logged in as: <b>{email || "…"}</b>
      </div>

      {banner && (
        <div
          style={{
            border: "1px solid rgba(40, 255, 140, 0.35)",
            background: "rgba(16, 110, 60, 0.25)",
            padding: 14,
            borderRadius: 12,
            marginBottom: 18,
          }}
        >
          {banner}
        </div>
      )}

      <div
        style={{
          border: "1px solid rgba(120, 160, 255, 0.25)",
          background: "rgba(20, 40, 90, 0.35)",
          padding: 16,
          borderRadius: 12,
          marginBottom: 18,
        }}
      >
        <div style={{ fontSize: 18, marginBottom: 6 }}>🚀 Current Plan: {planName}</div>
        <div style={{ opacity: 0.9 }}>Status: {status}</div>

        <div style={{ marginTop: 14, display: "flex", gap: 10, flexWrap: "wrap" }}>
          {showUpgradeButtons && (
            <>
              <button
                onClick={() => startCheckout("basic")}
                style={{
                  padding: "10px 14px",
                  borderRadius: 10,
                  border: "1px solid rgba(255,255,255,0.15)",
                  background: "rgba(30, 60, 120, 0.55)",
                  color: "white",
                  cursor: "pointer",
                }}
              >
                Upgrade: Basic (€9/mo)
              </button>

              <button
                onClick={() => startCheckout("pro")}
                style={{
                  padding: "10px 14px",
                  borderRadius: 10,
                  border: "1px solid rgba(255,255,255,0.15)",
                  background: "rgba(255,255,255,0.92)",
                  color: "#111",
                  cursor: "pointer",
                }}
              >
                Upgrade: Pro (€19/mo)
              </button>
            </>
          )}

          {isPaidActive && (
            <button
              onClick={openBillingPortal}
              style={{
                padding: "10px 14px",
                borderRadius: 10,
                border: "1px solid rgba(255,255,255,0.15)",
                background: "rgba(255, 255, 255, 0.1)",
                color: "white",
                cursor: "pointer",
              }}
            >
              Manage Billing
            </button>
          )}

          <button
            onClick={logout}
            style={{
              padding: "10px 14px",
              borderRadius: 10,
              border: "1px solid rgba(255,255,255,0.15)",
              background: "rgba(30, 60, 120, 0.55)",
              color: "white",
              cursor: "pointer",
            }}
          >
            Log Out
          </button>
        </div>
      </div>

      <hr style={{ opacity: 0.2, margin: "24px 0" }} />

      <div style={{ marginBottom: 24 }}>
        <div style={{ fontSize: 18, marginBottom: 8 }}>Add App</div>
        <div style={{ fontSize: 14, opacity: 0.8, marginBottom: 10 }}>Search iOS app name</div>

        <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
          <input
            value={appQuery}
            onChange={(e) => {
              setAppQuery(e.target.value);
              setSelectedApp(null);
            }}
            placeholder="Type app name... (e.g., Instagram)"
            style={{
              width: 380,
              padding: "10px 12px",
              borderRadius: 10,
              border: "1px solid rgba(255,255,255,0.2)",
              background: "rgba(0,0,0,0.25)",
              color: "white",
            }}
          />

          <button
            onClick={addSelectedApp}
            disabled={!selectedApp || adding}
            style={{
              padding: "10px 14px",
              borderRadius: 10,
              border: "1px solid rgba(255,255,255,0.15)",
              background: selectedApp ? "rgba(30, 60, 120, 0.55)" : "rgba(80,80,80,0.35)",
              color: "white",
              cursor: selectedApp ? "pointer" : "not-allowed",
            }}
          >
            {adding ? "Adding…" : "Add"}
          </button>
        </div>

        {/* Suggestions dropdown */}
        {suggestions.length > 0 && !selectedApp && (
          <div
            style={{
              marginTop: 10,
              border: "1px solid rgba(255,255,255,0.12)",
              borderRadius: 12,
              overflow: "hidden",
              maxWidth: 560,
              background: "rgba(0,0,0,0.2)",
            }}
          >
            {suggestions.slice(0, 8).map((s, idx) => (
              <div
                key={`${s.appId}-${idx}`}
                onClick={() => selectSuggestion(s)}
                style={{
                  padding: "10px 12px",
                  cursor: "pointer",
                  borderBottom: "1px solid rgba(255,255,255,0.06)",
                  display: "flex",
                  gap: 10,
                  alignItems: "center",
                }}
              >
                <div
                  style={{
                    width: 34,
                    height: 34,
                    borderRadius: 8,
                    overflow: "hidden",
                    background: "rgba(255,255,255,0.08)",
                    flex: "0 0 auto",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {s.iconUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={s.iconUrl} alt="" width={34} height={34} style={{ display: "block" }} />
                  ) : (
                    <span style={{ fontSize: 12, opacity: 0.7 }}>📱</span>
                  )}
                </div>

                <div style={{ minWidth: 0 }}>
                  <div style={{ fontWeight: 700, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                    {s.name}
                  </div>
                  <div style={{ fontSize: 12, opacity: 0.75 }}>
                    ID: {s.appId} • Version: {s.version ?? "—"}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        <div style={{ marginTop: 10, fontSize: 12, opacity: 0.7 }}>
          Tip: Type a few letters and tap the correct app from the list.
        </div>
      </div>

      <hr style={{ opacity: 0.2, margin: "24px 0" }} />

      <div style={{ fontSize: 18, marginBottom: 10 }}>Your Watchlist</div>

      {watchlist.length === 0 ? (
        <div style={{ opacity: 0.8 }}>No apps yet.</div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {watchlist.map((w) => (
            <div
              key={w.id}
              style={{
                border: "1px solid rgba(255,255,255,0.10)",
                borderRadius: 12,
                padding: 14,
                background: "rgba(0,0,0,0.18)",
              }}
            >
              <div style={{ fontWeight: 800, fontSize: 16, marginBottom: 6 }}>{w.app_name || "Untitled App"}</div>
              <div style={{ fontSize: 13, opacity: 0.8 }}>
                Store: {w.store ?? "ios"} • Country: {w.country ?? "ie"}
              </div>
              <div style={{ fontSize: 13, opacity: 0.8 }}>
                App Store ID: {w.app_store_id} • Last version: {w.last_version ?? "—"}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}