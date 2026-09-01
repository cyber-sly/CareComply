"use client";

import { useToast } from "@/lib/toast/toast-context";

export function NewsletterForm() {
  const { showToast } = useToast();

  return (
    <form
      className="flex gap-2"
      onSubmit={async (e) => {
        e.preventDefault();
        const form = e.currentTarget;
        const email = new FormData(form).get("email");
        try {
          await fetch("/api/leads", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, source: "newsletter" }),
          });
        } catch {
          // Non-critical — still show the confirmation either way.
        }
        showToast("Thanks — you're on the list");
        form.reset();
      }}
    >
      <input
        type="email"
        name="email"
        required
        placeholder="you@agency.co.uk"
        className="w-full flex-1 rounded border border-line bg-white px-3.5 py-2.5 text-sm focus:border-verified focus:outline-none"
      />
      <button
        type="submit"
        className="rounded-[3px] bg-verified px-4 py-2.5 text-sm font-semibold text-white transition hover:-translate-y-px"
      >
        Join
      </button>
    </form>
  );
}
