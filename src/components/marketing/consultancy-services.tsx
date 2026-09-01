"use client";

import { useState } from "react";
import { Calendar, X } from "lucide-react";
import { cn } from "@/lib/utils";

type Service = {
  id: string;
  title: string;
  price: string;
  description: string;
  variant: "free" | "paid";
  note: string;
};

const SERVICES: Service[] = [
  {
    id: "discovery",
    title: "Discovery Call",
    price: "Free · 15 minutes",
    description: "Not sure which service is right for you? Start with a free, no-pressure call to talk through what you need.",
    variant: "free",
    note: "In the live site, this space holds an embedded Calendly widget (or similar) showing the consultant's real-time availability for a free 15-minute call. No payment required for this option.",
  },
  {
    id: "mock-inspection",
    title: "Mock CIW/CQC Inspection",
    price: "From £[X] · remote or on-site",
    description: "A full walkthrough of your documentation and processes as an inspector would see them, with a written report of strengths and gaps.",
    variant: "paid",
    note: "In the live site: visitor picks a date/time, fills in name, email, phone and a short \u201cwhat would you like help with?\u201d field, then pays the fee to confirm.",
  },
  {
    id: "policy-review",
    title: "Policy Review",
    price: "From £[X] · per policy set",
    description: "Send us your existing policies; we review them against current CQC/CIW expectations and return tracked-change recommendations.",
    variant: "paid",
    note: "Large policy packs may need a quote-on-request step before booking — to be confirmed with pricing decisions.",
  },
  {
    id: "mentoring",
    title: "Registered Manager Mentoring",
    price: "From £[X] · per session",
    description: "Ongoing 1:1 support for registered managers — new or experienced — covering compliance, staff management, and inspection readiness.",
    variant: "paid",
    note: "Could offer single-session or monthly retainer booking options once pricing is confirmed.",
  },
];

export function ConsultancyServices() {
  const [activeId, setActiveId] = useState<string | null>(null);
  const active = SERVICES.find((s) => s.id === activeId);

  return (
    <div id="consultancy-services">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {SERVICES.map((service, i) => (
          <div
            key={service.id}
            className={cn(
              "flex flex-col rounded-lg border bg-white p-6",
              service.variant === "free" ? "border-verified" : "border-line"
            )}
          >
            <div
              className={cn(
                "mb-4 flex h-9 w-9 items-center justify-center rounded-full font-mono text-xs font-semibold",
                service.variant === "free"
                  ? "bg-verified-soft text-verified"
                  : "bg-paper-deep text-grey"
              )}
            >
              {service.variant === "free" ? "✆" : String(i).padStart(2, "0")}
            </div>
            <h3 className="mb-1.5 text-lg">{service.title}</h3>
            <p className="mb-3 font-mono text-[12.5px] text-grey-light">{service.price}</p>
            <p className="mb-5 flex-1 text-[13.5px] leading-relaxed text-grey">
              {service.description}
            </p>
            <button
              onClick={() => setActiveId(service.id)}
              className={cn(
                "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-[3px] px-[22px] py-[11px] text-sm font-semibold transition",
                service.variant === "free"
                  ? "border-[1.5px] border-verified text-verified hover:bg-verified hover:text-white"
                  : "border-[1.5px] border-ink text-ink hover:bg-ink hover:text-white"
              )}
            >
              {service.variant === "free" ? "Book Free Call" : "Book This Service"}
            </button>
          </div>
        ))}
      </div>

      {active && (
        <div className="mt-8 rounded-lg border border-line bg-white p-7">
          <div className="mb-5 flex items-center justify-between">
            <h3 className="text-lg">Book {active.title}</h3>
            <button
              onClick={() => setActiveId(null)}
              aria-label="Close booking panel"
              className="text-grey hover:text-clay"
            >
              <X size={18} />
            </button>
          </div>
          <div className="flex flex-col items-center gap-3 rounded-md bg-paper-deep px-8 py-12 text-center">
            <Calendar size={28} strokeWidth={1.5} className="text-grey-light" />
            <p className="font-semibold">Calendly availability would embed here</p>
            <p className="max-w-md text-[13.5px] text-grey">{active.note}</p>
          </div>
        </div>
      )}
    </div>
  );
}
