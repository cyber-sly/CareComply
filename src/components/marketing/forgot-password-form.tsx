"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";

export function ForgotPasswordForm() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const supabase = createClient();
    const { error: resetError } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });

    setLoading(false);

    // Supabase doesn't report whether the email is registered, so this
    // covers both success and "no such account" with the same message —
    // that's deliberate, it avoids leaking which emails have accounts.
    if (resetError) {
      setError(resetError.message);
      return;
    }

    setSent(true);
  }

  if (sent) {
    return (
      <div className="rounded-md border border-line bg-paper-deep px-4 py-3.5 text-[13.5px] leading-relaxed text-ink-soft">
        If an account exists for <strong>{email}</strong>, you&rsquo;ll receive a password reset
        link shortly.
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="mb-1.5 block text-sm font-semibold" htmlFor="email">
          Email
        </label>
        <input
          id="email"
          type="email"
          required
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full rounded border border-line bg-white px-3.5 py-2.5 text-sm focus:border-verified focus:outline-none"
        />
      </div>
      {error && <p className="text-sm text-clay">{error}</p>}
      <Button type="submit" variant="verified" block disabled={loading}>
        {loading ? "Sending…" : "Send reset link"}
      </Button>
    </form>
  );
}
