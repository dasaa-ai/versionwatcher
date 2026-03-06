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
};

type PlanStatus = {
  status: string | null;
  stripe_price_id: string | null;
};

const CARD_STYLE: React.CSSProperties = {
  border: "1px solid rgba(148, 163, 184, 0.35)",
  borderRadius: 14,
  padding: 16,
  background: "rgba(2, 6, 23, 0.35)",
  boxShadow: "0 10px 30px rgba(0,0,0,0.25)",
};

function formatDateTime(iso: string | null) {
  if (!iso) return "—";
  try {
    const d = new Date(iso);
    return d.toLocaleString();
  } catch {
    return iso;
  }
}

export default function DashboardClientImpl() {
  const router = useRouter();
  const sp = useSearchParams();

  const supabase = useMemo(() => supabaseBrowser(), []);

  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState<string | null>(null);

  const [planName, setPlanName] = useState<string>("Basic");
  const [status, setStatus] = useState<string>("inactive");
  const [limit, setLimit] = useState<number>(3);

  const [watchlist, setWatchlist] = useState<WatchItem[]>([]);
  const [busy, setBusy] = useState(false);

  // Search UI
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<AppSuggestion[]>([]);
  const [hoveredIndex, setHoveredIndex] = useState<number>(-1);
  const [selectedApp, setSelectedApp] = useState<AppSuggestion | null>(null);

  // "check now" result
  const [checkNowMsg, setCheckNowMsg] = useState<string | null>(null);

  // Handle "checked now" result via query param (optional)
  useEffect(() => {
    const checked = sp.get("checked");
    const updated = sp.get("updated");
    const emailed = sp.get("emailed");
    if (checked || updated || emailed) {
      setCheckNowMsg(
        `Checked ${checked ?? "0"}. Updated ${updated ?? "0"}. Emailed ${emailed ?? "0"}.`
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Load session + user
  useEffect(() => {
    let cancelled = false;

    async function boot() {
      setLoading(true);
      setCheckNowMsg(null);

      const { data: sessionData } = await supabase.auth.getSession();
      const session = sessionData.session;

      if (!session) {
        if (!cancelled) router.replace("/login");
        return;
      }

      const { data: userData } = await supabase.auth.getUser();
      const user = userData.user;

      if (!user) {
        if (!cancelled) router.replace("/login");
        return;
      }

      if (cancelled) return;

      setEmail(user.email ?? null);

      // fetch plan/subscription status from your API route
      await refreshPlan();

      // fetch watchlist
      await refreshWatchlist();

      if (!cancelled) setLoading(false);
    }

    boot();

    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router, supabase]);

  async function refreshPlan() {
    try {
      const res = await fetch("/api/session", { method: "GET" });
      if (!res.ok) return;

      const json = (await res.json()) as PlanStatus;
      const price = json.stripe_price_id ?? null;
      const st = (json.status ?? "inactive").toLowerCase();

      // Your price IDs -> plan mapping
      // (Keep aligned with your API/Stripe setup)
      if (price && st === "active") {
        setStatus("active");
        // Default to Pro when active & has a price id
        setPlanName("Pro");
        setLimit(Infinity);
      } else {
        setStatus(st);
        setPlanName("Basic");
        setLimit(3);
      }
    } catch {
      // ignore
    }
  }

  async function refreshWatchlist() {
    try {
      const res = await fetch("/api/check-updates", { method: "GET" });
      if (!res.ok) return;
      const json = await res.json();
      setWatchlist(Array.isArray(json?.watchlist) ? json.watchlist : []);
    } catch {
      // ignore
    }
  }

  async function logout() {
    setBusy(true);
    try {
      await supabase.auth.signOut();
      router.replace("/login");
    } finally {
      setBusy(false);
    }
  }

  async function openBillingPortal() {
    setBusy(true);
    try {
      const res = await fetch("/api/billing-portal", { method: "POST" });
      const json = await res.json();
      if (json?.url) window.location.href = json.url;
    } finally {
      setBusy(false);
    }
  }

  // Search suggestions (server)
  useEffect(() => {
    let cancelled = false;

    async function run() {
      const q = query.trim();
      setSelectedApp(null);

      if (q.length < 2) {
        setSuggestions([]);
        setHoveredIndex(-1);
        return;
      }

      try {
        const res = await fetch("/api/app-search?q=" + encodeURIComponent(q));
        if (!res.ok) return;
        const json = await res.json();
        if (cancelled) return;
        setSuggestions(Array.isArray(json?.results) ? json.results : []);
        setHoveredIndex(-1);
      } catch {
        // ignore
      }
    }

    run();
    return () => {
      cancelled = true;
    };
  }, [query]);

  async function addToWatchlist() {
    if (!selectedApp) return;
    setBusy(true);
    try {
      const res = await fetch("/api/check-updates", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          appId: selectedApp.appId,
          appName: selectedApp.name,
          country: "us",
          version: selectedApp.version ?? null,
        }),
      });

      const json = await res.json();
      if (!res.ok) {
        alert(json?.error || "Failed to add app.");
        return;
      }

      setQuery("");
      setSuggestions([]);
      setSelectedApp(null);
      await refreshWatchlist();
      await refreshPlan();
    } finally {
      setBusy(false);
    }
  }

  async function removeFromWatchlist(id: string) {
    setBusy(true);
    try {
      const res = await fetch("/api/check-updates", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });

      const json = await res.json();
      if (!res.ok) {
        alert(json?.error || "Failed to remove app.");
        return;
      }

      await refreshWatchlist();
      await refreshPlan();
    } finally {
      setBusy(false);
    }
  }

  async function checkUpdatesNow() {
    setBusy(true);
    setCheckNowMsg(null);
    try {
      const res = await fetch("/api/check-updates-now", { method: "POST" });
      const json = await res.json();

      if (!res.ok) {
        alert(json?.error || "Check failed.");
        return;
      }

      setCheckNowMsg(
        `Checked ${json?.checked ?? 0}. Updated ${json?.updated ?? 0}. Emailed ${json?.emailed ?? 0}.`
      );

      await refreshWatchlist();
    } finally {
      setBusy(false);
    }
  }

  if (loading) {
    return (
      <div style={{ padding: 24, color: "#e2e8f0" }}>
        Loading dashboard...
      </div>
    );
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "radial-gradient(1200px 600px at 30% 10%, rgba(59,130,246,0.22), transparent 60%), #000",
        color: "#e2e8f0",
        padding: 28,
        display: "flex",
        justifyContent: "center",
      }}
    >
      <div style={{ width: "min(980px, 100%)" }}>
        <h1 style={{ fontSize: 44, margin: "8px 0 8px" }}>Dashboard</h1>
        <div style={{ marginBottom: 18, opacity: 0.9 }}>
          Logged in as: <strong>{email ?? "—"}</strong>
        </div>

        <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 14 }}>
          <button
            onClick={logout}
            disabled={busy}
            style={{
              padding: "10px 18px",
              borderRadius: 10,
              border: "1px solid rgba(148,163,184,0.35)",
              background: "rgba(30,58,138,0.5)",
              color: "#f8fafc",
              cursor: "pointer",
              fontWeight: 700,
            }}
          >
            Logout
          </button>

          <button
            onClick={checkUpdatesNow}
            disabled={busy}
            style={{
              padding: "10px 18px",
              borderRadius: 10,
              border: "1px solid rgba(148,163,184,0.35)",
              background: "#f8fafc",
              color: "#0f172a",
              cursor: "pointer",
              fontWeight: 700,
            }}
          >
            Check updates now
          </button>

          <button
            onClick={openBillingPortal}
            disabled={busy}
            style={{
              padding: "10px 18px",
              borderRadius: 10,
              border: "1px solid rgba(148,163,184,0.35)",
              background: "#f8fafc",
              color: "#0f172a",
              cursor: "pointer",
              fontWeight: 700,
            }}
          >
            Manage billing
          </button>
        </div>

        {checkNowMsg ? (
          <div
            style={{
              ...CARD_STYLE,
              marginBottom: 18,
              background: "rgba(30,58,138,0.25)",
              borderColor: "rgba(59,130,246,0.35)",
            }}
          >
            {checkNowMsg}
          </div>
        ) : null}

        <div
          style={{
            height: 1,
            background: "rgba(148, 163, 184, 0.35)",
            margin: "18px 0",
          }}
        />

        {/* Plan */}
        <div style={{ ...CARD_STYLE, marginBottom: 18 }}>
          <div style={{ display: "flex", alignItems: "baseline", gap: 12, flexWrap: "wrap" }}>
            <h2 style={{ margin: 0 }}>Your plan</h2>
            <div style={{ color: "#e2e8f0", fontStyle: "italic", fontWeight: 700 }}>
              <span style={{ fontWeight: 800, color: "#f8fafc" }}>{planName}</span>
              <span style={{ opacity: 0.9 }}> ({status}) • Apps: </span>
              <span style={{ fontWeight: 800, color: "#f8fafc" }}>{watchlist.length}</span>
              <span style={{ opacity: 0.9 }}> / </span>
              <span style={{ fontWeight: 800, color: "#f8fafc" }}>{limit === Infinity ? "∞" : limit}</span>
            </div>
          </div>
        </div>

        {/* Add App */}
        <div style={{ ...CARD_STYLE, marginBottom: 18 }}>
          <h2 style={{ marginTop: 0 }}>Add an iOS app</h2>

          <div style={{ position: "relative", maxWidth: 640 }}>
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search an app (e.g. Spotify)"
              style={{
                width: "100%",
                padding: "12px 14px",
                borderRadius: 10,
                border: "1px solid rgba(148,163,184,0.35)",
                outline: "none",
                background: "rgba(2,6,23,0.45)",
                color: "#f8fafc",
              }}
            />

            {suggestions.length > 0 ? (
              <div
                style={{
                  position: "absolute",
                  top: 46,
                  left: 0,
                  right: 0,
                  background: "white",
                  color: "#0f172a",
                  borderRadius: 12,
                  border: "1px solid rgba(148,163,184,0.35)",
                  boxShadow: "0 20px 50px rgba(0,0,0,0.35)",
                  overflow: "hidden",
                  zIndex: 50,
                }}
              >
                {suggestions.slice(0, 8).map((s, idx) => (
                  <button
                    key={s.appId}
                    type="button"
                    onMouseEnter={() => setHoveredIndex(idx)}
                    onMouseLeave={() => setHoveredIndex(-1)}
                    onClick={() => {
                      setSelectedApp(s);
                      setQuery(s.name);
                      setSuggestions([]);
                      setHoveredIndex(-1);
                    }}
                    style={{
                      width: "100%",
                      textAlign: "left",
                      padding: "12px 14px",
                      background: hoveredIndex === idx ? "#f1f5f9" : "white",
                      border: "none",
                      color: "#0f172a",
                      display: "flex",
                      alignItems: "center",
                      gap: 12,
                      cursor: "pointer",
                    }}
                  >
                    <img
                      src={s.iconUrl ?? ""}
                      alt=""
                      width={34}
                      height={34}
                      style={{
                        borderRadius: 8,
                        background: "#e2e8f0",
                        flex: "0 0 auto",
                      }}
                      onError={(e) => {
                        (e.currentTarget as HTMLImageElement).style.display = "none";
                      }}
                    />
                    <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                      <div style={{ fontWeight: 800, color: "#0f172a" }}>{s.name}</div>
                      {s.version ? (
                        <div style={{ fontSize: 12, color: "#334155", opacity: 0.95 }}>
                          v{s.version}
                        </div>
                      ) : null}
                    </div>
                  </button>
                ))}
              </div>
            ) : null}
          </div>

          <div style={{ display: "flex", gap: 12, alignItems: "center", marginTop: 14, flexWrap: "wrap" }}>
            <button
              onClick={addToWatchlist}
              disabled={busy || !selectedApp || watchlist.length >= limit}
              style={{
                padding: "10px 16px",
                borderRadius: 10,
                border: "1px solid rgba(148,163,184,0.35)",
                background: "rgba(30,58,138,0.55)",
                color: "#f8fafc",
                cursor: busy ? "not-allowed" : "pointer",
                fontWeight: 800,
                opacity: !selectedApp || watchlist.length >= limit ? 0.55 : 1,
              }}
            >
              Add to watchlist
            </button>

            <div style={{ fontSize: 13, opacity: 0.75 }}>
              Tip: select the app from the dropdown first.
            </div>

            {watchlist.length >= limit ? (
              <div style={{ fontSize: 13, color: "#fbbf24" }}>
                You’ve hit your plan limit.
              </div>
            ) : null}
          </div>
        </div>

        {/* Watchlist */}
        <div style={{ ...CARD_STYLE }}>
          <h2 style={{ marginTop: 0 }}>Your watchlist</h2>

          {watchlist.length === 0 ? (
            <div style={{ opacity: 0.8 }}>No apps yet. Add one above.</div>
          ) : (
            <div style={{ display: "grid", gap: 14 }}>
              {watchlist.map((item) => (
                <div
                  key={item.id}
                  style={{
                    border: "1px solid rgba(148,163,184,0.25)",
                    borderRadius: 14,
                    padding: 16,
                    background: "rgba(2,6,23,0.25)",
                    display: "flex",
                    justifyContent: "space-between",
                    gap: 14,
                    alignItems: "center",
                    flexWrap: "wrap",
                  }}
                >
                  <div style={{ minWidth: 260 }}>
                    <div style={{ fontSize: 18, fontWeight: 900 }}>
                      {item.app_name ?? "Unknown app"}
                    </div>
                    <div style={{ fontSize: 13, opacity: 0.8, marginTop: 4 }}>
                      App Store ID: <strong>{item.app_store_id}</strong> • last version:{" "}
                      <strong>{item.last_version ?? "—"}</strong>
                    </div>
                    <div style={{ fontSize: 13, opacity: 0.75, marginTop: 6 }}>
                      Last checked: {formatDateTime(item.last_checked_at)}
                    </div>
                  </div>

                  <button
                    onClick={() => removeFromWatchlist(item.id)}
                    disabled={busy}
                    style={{
                      padding: "10px 18px",
                      borderRadius: 12,
                      border: "1px solid rgba(248,113,113,0.55)",
                      background: "rgba(2,6,23,0.15)",
                      color: "#f87171",
                      cursor: "pointer",
                      fontWeight: 900,
                      minWidth: 120,
                    }}
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        <div style={{ height: 28 }} />
      </div>
    </div>
  );
}
