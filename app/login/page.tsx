"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { supabaseBrowser } from "@/lib/supabaseBrowser";

export default function LoginPage() {
  const router = useRouter();
  const supabase = supabaseBrowser();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // If already logged in, go to dashboard
  useEffect(() => {
    (async () => {
      const { data } = await supabase.auth.getUser();
      if (data.user) router.replace("/dashboard");
    })();
  }, [router, supabase]);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError(null);

    const res = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (!res.ok) {
      setError(data?.error ?? "Login failed");
      setBusy(false);
      return;
    }

    // After server sets cookies, refresh auth state + go dashboard
    await supabase.auth.getUser();
    router.replace("/dashboard");
  }

  async function signInWithGoogle() {
    try {
      setBusy(true);
      setError(null);

      // This should match what you added in Supabase Auth URL Configuration
      // (usually /auth/callback). If your project uses a different callback,
      // change it here too.
      const redirectTo = `${window.location.origin}/auth/callback`;

      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: { redirectTo },
      });

      if (error) {
        setError(error.message);
        setBusy(false);
      }
      // If no error, browser will redirect to Google automatically.
    } catch (err: any) {
      setError(err?.message ?? "Google sign-in failed");
      setBusy(false);
    }
  }

  return (
    <main style={{ minHeight: "100vh", display: "grid", placeItems: "center" }}>
      <div style={{ width: "100%", maxWidth: 420, padding: 24 }}>
        <h1 style={{ fontSize: 24, marginBottom: 12 }}>Login</h1>

        {/* Google OAuth */}
        <button
          type="button"
          disabled={busy}
          onClick={signInWithGoogle}
          style={{
            width: "100%",
            padding: "10px 14px",
            borderRadius: 10,
            border: "1px solid rgba(255,255,255,0.15)",
            background: "rgba(255,255,255,0.92)",
            color: "#111",
            cursor: busy ? "not-allowed" : "pointer",
            opacity: busy ? 0.7 : 1,
            fontWeight: 700,
            marginBottom: 14,
          }}
        >
          {busy ? "Please wait..." : "Continue with Google"}
        </button>

        {/* Divider */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            margin: "14px 0",
            opacity: 0.7,
          }}
        >
          <div style={{ height: 1, flex: 1, background: "rgba(255,255,255,0.15)" }} />
          <div style={{ fontSize: 12 }}>OR</div>
          <div style={{ height: 1, flex: 1, background: "rgba(255,255,255,0.15)" }} />
        </div>

        {/* Email + Password */}
        <form onSubmit={onSubmit}>
          <label style={{ display: "block", marginBottom: 8 }}>Email</label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            required
            autoComplete="email"
            style={{
              width: "100%",
              padding: "10px 12px",
              borderRadius: 10,
              border: "1px solid #334155",
              marginBottom: 14,
              background: "transparent",
              color: "white",
            }}
          />

          <label style={{ display: "block", marginBottom: 8 }}>Password</label>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            required
            autoComplete="current-password"
            style={{
              width: "100%",
              padding: "10px 12px",
              borderRadius: 10,
              border: "1px solid #334155",
              marginBottom: 14,
              background: "transparent",
              color: "white",
            }}
          />

          {error && <p style={{ color: "#fb7185", marginBottom: 10 }}>{error}</p>}

          <button
            disabled={busy}
            type="submit"
            style={{
              width: "100%",
              padding: "10px 14px",
              borderRadius: 10,
              border: "1px solid #0f172a",
              background: "#0f172a",
              color: "white",
              cursor: busy ? "not-allowed" : "pointer",
              opacity: busy ? 0.7 : 1,
            }}
          >
            {busy ? "Logging in..." : "Login"}
          </button>
        </form>

        {/* Signup link */}
        <div style={{ marginTop: 14, fontSize: 13, opacity: 0.85 }}>
          Don&apos;t have an account?{" "}
          <Link href="/signup" style={{ textDecoration: "underline", color: "white" }}>
            Sign up
          </Link>
        </div>
      </div>
    </main>
  );
}
