"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../lib/firebase";
import { authErrorMessage } from "../../lib/authErrors";
import { Button } from "../components/Button";

const inputClass =
  "min-h-11 w-full rounded-control border border-border bg-white px-3 font-body text-sm text-ink placeholder:text-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy focus-visible:ring-offset-2";

export default function SignInPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push("/");
    } catch (err) {
      setError(authErrorMessage(err));
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-surface px-[clamp(16px,5vw,64px)] py-10">
      <div className="w-full max-w-md">
        <Link
          href="/"
          className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-navy transition-opacity hover:opacity-70"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M19 12H5M12 5l-7 7 7 7" />
          </svg>
          Back to Home
        </Link>

        <div className="rounded-3xl border border-border bg-white p-8 shadow-sm sm:p-10">
          <div className="mb-8 border-b border-border pb-6">
            <span className="text-xs font-bold uppercase tracking-widest text-orange">NS-VTC</span>
            <h1 className="mt-1 font-heading text-2xl font-extrabold text-ink">Sign In</h1>
            <p className="mt-1 text-sm text-muted">Sign in to manage NS-VTC website content.</p>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div>
              <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-ink">Email Address</label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                placeholder="you@example.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={inputClass}
              />
            </div>

            <div>
              <div className="mb-1.5 flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium text-ink">Password</label>
                <Link href="/forgot-password" className="text-xs font-semibold text-navy hover:underline">
                  Forgot password?
                </Link>
              </div>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                placeholder="••••••••"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={inputClass}
              />
            </div>

            {error && (
              <p className="rounded-card bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p>
            )}

            <Button type="submit" variant="accent" disabled={loading} className="w-full">
              {loading ? "Signing In..." : "Sign In"}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
