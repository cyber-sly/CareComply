"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/lib/toast/toast-context";

export function ContactForm() {
  const { showToast } = useToast();
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);

    setLoading(true);
    try {
      await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: formData.get("email"),
          name: formData.get("name"),
          source: "contact",
          resource_requested: `${formData.get("subject")}: ${formData.get("message")}`,
        }),
      });
    } catch {
      // Non-critical for the demo flow.
    } finally {
      setLoading(false);
      showToast("Thanks — we'll be in touch within 1 business day");
      form.reset();
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="mb-1.5 block text-[13.5px] font-semibold" htmlFor="c-name">
          Name
        </label>
        <input
          id="c-name"
          name="name"
          required
          className="w-full rounded border border-line bg-white px-3.5 py-3 text-sm focus:border-verified focus:outline-none"
        />
      </div>
      <div>
        <label className="mb-1.5 block text-[13.5px] font-semibold" htmlFor="c-email">
          Email
        </label>
        <input
          id="c-email"
          name="email"
          type="email"
          required
          className="w-full rounded border border-line bg-white px-3.5 py-3 text-sm focus:border-verified focus:outline-none"
        />
      </div>
      <div>
        <label className="mb-1.5 block text-[13.5px] font-semibold" htmlFor="c-subject">
          Subject
        </label>
        <select
          id="c-subject"
          name="subject"
          className="w-full rounded border border-line bg-white px-3.5 py-3 text-sm focus:border-verified focus:outline-none"
        >
          <option>General enquiry</option>
          <option>Order issue</option>
          <option>Consultancy enquiry</option>
          <option>Other</option>
        </select>
      </div>
      <div>
        <label className="mb-1.5 block text-[13.5px] font-semibold" htmlFor="c-message">
          Message
        </label>
        <textarea
          id="c-message"
          name="message"
          required
          rows={5}
          className="w-full resize-y rounded border border-line bg-white px-3.5 py-3 text-sm focus:border-verified focus:outline-none"
        />
      </div>
      <Button type="submit" variant="primary" block disabled={loading}>
        {loading ? "Sending…" : "Send Message"}
      </Button>
    </form>
  );
}
