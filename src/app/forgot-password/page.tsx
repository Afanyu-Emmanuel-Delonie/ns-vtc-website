"use client";

import { useState } from "react";
import Link from "next/link";
import { sendPasswordResetEmail } from "firebase/auth";
import { FirebaseError } from "firebase/app";
import { auth } from "../../lib/firebase";
import { authErrorMessage } from "../../lib/authErrors";
import { Button } from "../components/Button";

const inputClass =
  "min-h-11 w-full rounded-control border border-border bg-white px-3 font-body text-sm text-ink placeholder:text-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy focus-visible:ring-offset-2";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [sent, setSent] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await sendPasswordResetEmail(auth, email);
      setSent(true);
    } catch (err) {
      // Don't reveal whether an account exists for this email.
      if (err instanceof FirebaseError && err.code === "auth/user-not-found") {
        setSent(true);
      } else {
        setError(authErrorMessage(err));
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-surface px-[clamp(16px,5vw,64px)] py-10">
      <div className="w-full max-w-md">
        <Link
          href="/signin"
          className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-navy transition-opacity hover:opacity-70"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M19 12H5M12 5l-7 7 7 7" />
          </svg>
          Back to Sign In
        </Link>

        {sent ? (
          <div className="flex flex-col items-center gap-4 rounded-3xl border border-border bg-white px-8 py-14 text-center shadow-sm">
            <span className="flex h-16 w-16 items-center justify-center rounded-full bg-navy">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M20 6 9 17l-5-5" />
              </svg>
            </span>
            <h2 className="font-heading text-2xl font-extrabold text-ink">Check Your Email</h2>
            <p className="max-w-xs text-sm leading-relaxed text-muted">
              If an account exists for <span className="font-semibold text-ink">{email}</span>,
              we&rsquo;ve sent a link to reset your password.
            </p>
            <button
              onClick={() => { setSent(false); setEmail(""); }}
              className="mt-2 text-sm font-semibold text-navy underline-offset-4 hover:underline"
            >
              Try a different email
            </button>
          </div>
        ) : (
          <div className="rounded-3xl border border-border bg-white p-8 shadow-sm sm:p-10">
            <div className="mb-8 border-b border-border pb-6">
              <span className="text-xs font-bold uppercase tracking-widest text-orange">NS-VTC</span>
              <h1 className="mt-1 font-heading text-2xl font-extrabold text-ink">Forgot Password</h1>
              <p className="mt-1 text-sm text-muted">
                Enter your email and we&rsquo;ll send you a link to reset your password.
              </p>
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

              {error && (
                <p className="rounded-card bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p>
              )}

              <Button type="submit" variant="accent" disabled={loading} className="w-full">
                {loading ? "Sending..." : "Send Reset Link"}
              </Button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
