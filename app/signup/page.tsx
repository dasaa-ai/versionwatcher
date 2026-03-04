"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabaseBrowser } from "@/lib/supabaseBrowser";

export default function SignupPage() {
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

  async function signUpWithEmail(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError(null);

    const { error } = await supabase.auth.signUp({
      email,
      password,
      // If you later enable email confirmation, Supabase will use this
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      },
    });

    setBusy(false);

    if (error) {
      setError(error.message);
      return;
    }

    // If email confirmations are OFF, user is logged in immediately.
    // If ON, they'll need to confirm first.
    router.replace("/dashboard");
  }

  async function signInWithGoogle() {
    setBusy(true);
    setError(null);

    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });

    setBusy(false);

    if (error) setError(error.message);
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white px-4">
      <div className="w-full max-w-md rounded-2xl border border-white/10 bg-white/5 p-8 shadow-xl">
        <h1 className="text-3xl font-semibold tracking-tight">Sign up</h1>
        <p className="mt-2 text-sm text-white/60">
          Create your account to start watching versions.
        </p>

        {error && (
          <div className="mt-4 rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-2 text-sm text-red-200">
            {error}
          </div>
        )}

        <button
          onClick={signInWithGoogle}
          disabled={busy}
          className="mt-6 w-full rounded-xl bg-white px-4 py-3 text-black font-medium hover:bg-white/90 disabled:opacity-60"
        >
          Continue with Google
        </button>

        <div className="my-6 flex items-center gap-3">
          <div className="h-px flex-1 bg-white/10" />
          <div className="text-xs text-white/50">OR</div>
          <div className="h-px flex-1 bg-white/10" />
        </div>

        <form onSubmit={signUpWithEmail} className="space-y-4">
          <div>
            <label className="block text-sm text-white/70">Email</label>
            <input
              type="email"
              className="mt-2 w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 outline-none focus:border-white/30"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
            />
          </div>

          <div>
            <label className="block text-sm text-white/70">Password</label>
            <input
              type="password"
              className="mt-2 w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 outline-none focus:border-white/30"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              minLength={6}
            />
          </div>

          <button
            type="submit"
            disabled={busy}
            className="w-full rounded-xl bg-blue-600 px-4 py-3 font-medium hover:bg-blue-500 disabled:opacity-60"
          >
            Create account
          </button>
        </form>

        <p className="mt-5 text-sm text-white/60">
          Already have an account?{" "}
          <a href="/login" className="underline text-white">
            Log in
          </a>
        </p>
      </div>
    </div>
  );
}
