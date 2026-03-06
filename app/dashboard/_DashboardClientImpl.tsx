"use client";

import { useEffect, useMemo, useRef, useState } from "react";

type WatchItem = {
  id: string;
  user_id: string;
  app_id: string;
  app_name: string;
  country: string | null;
  last_version: string | null;
  last_checked_at: string | null;
};

type PlanStatus = {
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

const fmtDateTime = (iso: string | null | undefined) => {
  if (!iso) return "—";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "—";
  return d.toLocaleString();
};

function appStoreButtonHtml(url: string) {
  // Simple button for email HTML
  return `
    <div style="margin-top:14px">
      <a href="${url}" style="
        display:inline-block;
        background:#2563eb;
        color:#fff;
        padding:10px 16px;
        border-radius:10px;
        font-weight:700;
        text-decoration:none;
      ">Open in App Store</a>
    </div>
  `;
}

export default function DashboardClient() {
  const [email, setEmail] = useState<string>("");
  const [plan, setPlan] = useState<PlanStatus>({ status: null, stripe_price_id: null });
  const [watchlist, setWatchlist] = useState<WatchItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // Add app search + suggestions
  const [query, setQuery] = useState<string>("");
  const [suggestions, setSuggestions] = useState<AppStoreLookup[]>([]);
  const [selected, setSelected] = useState<AppStoreLookup | null>(null);
  const [suggestLoading, setSuggestLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");

  // “Check updates now”
  const [checkNowBusy, setCheckNowBusy] = useState<boolean>(false);

  const inputRef = useRef<HTMLInputElement | null>(null);

  const planName = useMemo(() => {
    if (plan.status === "pro") return "Pro";
    if (plan.status === "basic") return "Basic";
    return "Basic";
  }, [plan.status]);

  const status = useMemo(() => {
    if (plan.status === "pro") return "active";
    if (plan.status === "basic") return "inactive";
    return "inactive";
  }, [plan.status]);

  const limit = useMemo(() => {
    if (plan.status === "pro") return Infinity;
    return 3;
  }, [plan.status]);

  const showUpgradeButtons = useMemo(() => {
    return plan.status !== "pro";
  }, [plan.status]);

  async function refreshData() {
    setLoading(true);
    setMessage("");

    try {
      // Fetch session
      const sessRes = await fetch("/api/session", { method: "GET" });
      const sessJson = await sessRes.json();
      if (!sessRes.ok) {
        setMessage(sessJson?.error || "Not authenticated");
        setLoading(false);
        return;
      }

      setEmail(sessJson?.email || "");

      // Fetch subscription/plan
      const subRes = await fetch("/api/subscription", { method: "GET" });
      const subJson = await subRes.json();
      if (subRes.ok) {
        setPlan({
          status: subJson?.status ?? "basic",
          stripe_price_id: subJson?.stripe_price_id ?? null,
        });
      } else {
        // fallback
        setPlan({ status: "basic", stripe_price_id: null });
      }

      // Fetch watchlist
      const wlRes = await fetch("/api/watchlist", { method: "GET" });
      const wlJson = await wlRes.json();
      if (wlRes.ok) {
        setWatchlist(Array.isArray(wlJson?.items) ? wlJson.items : []);
      } else {
        setWatchlist([]);
      }
    } catch (e: any) {
      setMessage(e?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    refreshData();
  }, []);

  // Suggestions: debounce query
  useEffect(() => {
    if (!query || query.trim().length < 2) {
      setSuggestions([]);
      setSelected(null);
      return;
    }

    const t = setTimeout(async () => {
      try {
        setSuggestLoading(true);
        const res = await fetch(`/api/app-search?q=${encodeURIComponent(query.trim())}`, {
          method: "GET",
        });
        const json = await res.json();
        if (res.ok) {
          setSuggestions(Array.isArray(json?.results) ? json.results : []);
        } else {
          setSuggestions([]);
        }
      } catch {
        setSuggestions([]);
      } finally {
        setSuggestLoading(false);
      }
    }, 250);

    return () => clearTimeout(t);
  }, [query]);

  async function logout() {
    await fetch("/api/logout", { method: "POST" });
    window.location.href = "/login";
  }

  async function openBillingPortal() {
    const res = await fetch("/api/billing-portal", { method: "POST" });
    const json = await res.json();
    if (res.ok && json?.url) {
      window.location.href = json.url;
    } else {
      setMessage(json?.error || "Could not open billing portal");
    }
  }

  async function upgrade(priceIdEnv: "NEXT_PUBLIC_STRIPE_PRICE_BASIC" | "NEXT_PUBLIC_STRIPE_PRICE_PRO") {
    const priceId = process.env[priceIdEnv];
    // NOTE: priceId is resolved at build time; backend route validates anyway.
    const res = await fetch("/api/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ priceId }),
    });
    const json = await res.json();
    if (res.ok && json?.url) {
      window.location.href = json.url;
    } else {
      setMessage(json?.error || "Checkout failed");
    }
  }

  async function addToWatchlist() {
    setMessage("");
    if (!selected) {
      setMessage("Tip: select the app from the dropdown first.");
      return;
    }

    if (limit !== Infinity && watchlist.length >= limit) {
      setMessage(`Your plan allows up to ${limit} apps. Upgrade to Pro for unlimited.`);
      return;
    }

    try {
      const res = await fetch("/api/watchlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          app_id: selected.appId,
          app_name: selected.name,
          country: selected.country,
        }),
      });
      const json = await res.json();
      if (!res.ok) {
        setMessage(json?.error || "Could not add app");
        return;
      }

      setQuery("");
      setSelected(null);
      setSuggestions([]);
      await refreshData();
      inputRef.current?.focus();
    } catch (e: any) {
      setMessage(e?.message || "Could not add app");
    }
  }

  async function removeFromWatchlist(itemId: string) {
    setMessage("");
    try {
      const res = await fetch(`/api/watchlist?id=${encodeURIComponent(itemId)}`, { method: "DELETE" });
      const json = await res.json();
      if (!res.ok) {
        setMessage(json?.error || "Could not remove app");
        return;
      }
      await refreshData();
    } catch (e: any) {
      setMessage(e?.message || "Could not remove app");
    }
  }

  async function checkUpdatesNow() {
    setMessage("");
    setCheckNowBusy(true);
    try {
      const res = await fetch("/api/check-updates-now", { method: "POST" });
      const json = await res.json();
      if (!res.ok) {
        setMessage(json?.error || "Check failed");
        return;
      }

      const checked = json?.checked ?? 0;
      const updated = json?.updated ?? 0;
      const emailed = json?.emailed ?? 0;

      setMessage(`Checked ${checked}. Updated ${updated}. Emailed ${emailed}.`);
      await refreshData();
    } catch (e: any) {
      setMessage(e?.message || "Check failed");
    } finally {
      setCheckNowBusy(false);
    }
  }

  const pageWrap: React.CSSProperties = {
    minHeight: "100vh",
    padding: "56px 22px",
    color: "white",
    background:
      "radial-gradient(1200px 600px at 20% 0%, rgba(37,99,235,.25), rgba(0,0,0,0) 60%), #000",
  };

  const card: React.CSSProperties = {
    border: "1px solid rgba(148,163,184,.25)",
    borderRadius: 16,
    padding: 22,
    background: "rgba(2,6,23,.35)",
    backdropFilter: "blur(6px)",
  };

  const button: React.CSSProperties = {
    borderRadius: 12,
    padding: "10px 16px",
    border: "1px solid rgba(148,163,184,.28)",
    background: "rgba(30,58,138,.55)",
    color: "white",
    cursor: "pointer",
    fontWeight: 700,
  };

  const whiteButton: React.CSSProperties = {
    borderRadius: 12,
    padding: "10px 16px",
    border: "1px solid rgba(148,163,184,.28)",
    background: "white",
    color: "#0f172a",
    cursor: "pointer",
    fontWeight: 700,
  };

  if (loading) {
    return (
      <div style={pageWrap}>
        <div style={{ maxWidth: 980, margin: "0 auto" }}>
          <div style={card}>Loading dashboard…</div>
        </div>
      </div>
    );
  }

  return (
    <div style={pageWrap}>
      <div style={{ maxWidth: 980, margin: "0 auto" }}>
        <h1 style={{ margin: 0, fontSize: 56, letterSpacing: -1 }}>Dashboard</h1>
        <div style={{ marginTop: 8, opacity: 0.85 }}>
          Logged in as: <strong>{email}</strong>
        </div>

        <div style={{ marginTop: 22, display: "flex", gap: 14, flexWrap: "wrap" }}>
          <button onClick={logout} style={button}>
            Logout
          </button>

          <button onClick={checkUpdatesNow} style={whiteButton} disabled={checkNowBusy}>
            {checkNowBusy ? "Checking…" : "Check updates now"}
          </button>

          <button onClick={openBillingPortal} style={whiteButton}>
            Manage billing
          </button>
        </div>

        {message && (
          <div style={{ marginTop: 16, ...card, padding: 16, borderRadius: 14 }}>
            {message}
          </div>
        )}

        <hr style={{ margin: "22px 0" }} />

        <div style={{ display: "flex", alignItems: "baseline", gap: 12, flexWrap: "wrap" }}>
          <h2 style={{ margin: 0 }}>Your plan</h2>
          <div style={{ color: "#e2e8f0", fontStyle: "italic", fontWeight: 600 }}>
            <strong>{planName}</strong> ({status}) • Apps: <strong>{watchlist.length}</strong> /{" "}
            <strong>{limit === Infinity ? "∞" : limit}</strong>
          </div>
        </div>

        {showUpgradeButtons && (
          <div style={{ marginTop: 14, display: "flex", gap: 12, flexWrap: "wrap" }}>
            <button onClick={() => upgrade("NEXT_PUBLIC_STRIPE_PRICE_BASIC")} style={whiteButton}>
              Upgrade to Basic
            </button>
            <button onClick={() => upgrade("NEXT_PUBLIC_STRIPE_PRICE_PRO")} style={whiteButton}>
              Upgrade to Pro
            </button>
          </div>
        )}

        <hr style={{ margin: "22px 0" }} />

        <div style={card}>
          <h3 style={{ marginTop: 0 }}>Add an iOS app</h3>

          <div style={{ position: "relative", maxWidth: 640 }}>
            <input
              ref={inputRef}
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setSelected(null);
              }}
              placeholder="Search an app (e.g. Spotify)"
              style={{
                width: "100%",
                padding: "12px 14px",
                borderRadius: 12,
                border: "1px solid rgba(148,163,184,.35)",
                background: "rgba(2,6,23,.45)",
                color: "white",
                outline: "none",
              }}
            />

            {suggestLoading && (
              <div style={{ position: "absolute", top: 46, right: 12, opacity: 0.7, fontSize: 12 }}>
                Searching…
              </div>
            )}

            {suggestions.length > 0 && !selected && (
              <div
                style={{
                  position: "absolute",
                  top: 52,
                  left: 0,
                  right: 0,
                  zIndex: 20,
                  borderRadius: 14,
                  border: "1px solid rgba(148,163,184,.25)",
                  overflow: "hidden",
                  background: "white",
                }}
              >
                {suggestions.slice(0, 8).map((s) => (
                  <button
                    key={s.trackViewUrl}
                    onClick={() => {
                      setSelected(s);
                      setQuery(s.name);
                      setSuggestions([]);
                    }}
                    style={{
                      width: "100%",
                      display: "flex",
                      alignItems: "center",
                      gap: 10,
                      padding: "10px 12px",
                      border: "none",
                      borderBottom: "1px solid rgba(15,23,42,.08)",
                      background: "white",
                      color: "#0f172a",
                      cursor: "pointer",
                      textAlign: "left",
                    }}
                  >
                    <img
                      src={s.artworkUrl100 || ""}
                      alt=""
                      style={{ width: 34, height: 34, borderRadius: 8, background: "#f1f5f9" }}
                    />
                    <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                      <div style={{ fontWeight: 700, color: "#0f172a" }}>{s.name}</div>
                      <div style={{ fontSize: 12, color: "#334155" }}>v{s.version}</div>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>

          <div style={{ marginTop: 14, display: "flex", gap: 12, alignItems: "center", flexWrap: "wrap" }}>
            <button onClick={addToWatchlist} style={button}>
              Add to watchlist
            </button>
            <div style={{ opacity: 0.75, fontSize: 13 }}>
              Tip: select the app from the dropdown first.
            </div>
          </div>
        </div>

        <hr style={{ margin: "22px 0" }} />

        <div style={card}>
          <h3 style={{ marginTop: 0 }}>Your watchlist</h3>

          {watchlist.length === 0 ? (
            <div style={{ opacity: 0.8 }}>No apps yet. Add one above.</div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {watchlist.map((w) => (
                <div
                  key={w.id}
                  style={{
                    border: "1px solid rgba(148,163,184,.25)",
                    borderRadius: 14,
                    padding: 14,
                    display: "flex",
                    justifyContent: "space-between",
                    gap: 14,
                    alignItems: "center",
                  }}
                >
                  <div>
                    <div style={{ fontSize: 18, fontWeight: 800 }}>{w.app_name}</div>
                    <div style={{ marginTop: 6, opacity: 0.75, fontSize: 13 }}>
                      App Store ID: <strong>{w.app_id}</strong> • last version:{" "}
                      <strong>{w.last_version || "—"}</strong>
                    </div>
                    <div style={{ marginTop: 4, opacity: 0.75, fontSize: 13 }}>
                      Last checked: <strong>{fmtDateTime(w.last_checked_at)}</strong>
                    </div>
                  </div>

                  <button
                    onClick={() => removeFromWatchlist(w.id)}
                    style={{
                      borderRadius: 12,
                      padding: "10px 16px",
                      border: "1px solid rgba(239,68,68,.45)",
                      background: "rgba(0,0,0,.35)",
                      color: "#ef4444",
                      cursor: "pointer",
                      fontWeight: 800,
                    }}
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        <div style={{ marginTop: 26, opacity: 0.6, fontSize: 12 }}>
          Emails include an “Open in App Store” button: {appStoreButtonHtml("https://apps.apple.com")}
        </div>
      </div>
    </div>
  );
}
