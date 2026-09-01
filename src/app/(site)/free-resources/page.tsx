"use client";

import { useState } from "react";
import { Container } from "@/components/ui/container";
import { ButtonLink } from "@/components/ui/button";
import { Eyebrow } from "@/components/ui/eyebrow";
import { ResourceGateModal } from "@/components/marketing/resource-gate-modal";

const RESOURCES = [
  {
    code: "IR",
    name: "Incident Report Form",
    description: "A ready-to-use incident report form covering the core fields CQC/CIW expect to see.",
  },
  {
    code: "FR",
    name: "Falls Risk Assessment",
    description: "A complete falls risk assessment template for domiciliary care service users.",
  },
  {
    code: "ST",
    name: "Supervision Template",
    description: "A structured staff supervision form to document 1:1s consistently.",
  },
];

export default function FreeResourcesPage() {
  const [openResource, setOpenResource] = useState<string | null>(null);

  return (
    <>
      <Container className="pt-16 pb-14 text-center md:pt-20">
        <div className="mx-auto max-w-[640px]">
          <Eyebrow center>No charge, no catch</Eyebrow>
          <h1 className="mb-4 text-[30px] leading-tight md:text-[40px]">
            Free templates, no catch.
          </h1>
          <p className="text-[15px] leading-relaxed text-ink-soft md:text-base">
            Download these free documents and see the quality for yourself. We&rsquo;ll also send
            you occasional templates and CQC/CIW tips by email — unsubscribe any time.
          </p>
        </div>
      </Container>

      <Container className="pb-16">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
          {RESOURCES.map((r) => (
            <div key={r.code} className="rounded-lg border border-line bg-white p-7 text-center">
              <div className="mx-auto mb-4 flex h-13 w-13 items-center justify-center rounded-full bg-verified-soft font-mono text-sm font-bold text-verified">
                {r.code}
              </div>
              <h3 className="mb-2 text-lg">{r.name}</h3>
              <p className="mb-5 text-[13.5px] leading-relaxed text-grey">{r.description}</p>
              <button
                onClick={() => setOpenResource(r.name)}
                className="inline-flex w-full items-center justify-center rounded-[3px] bg-ink px-[22px] py-[11px] text-sm font-semibold text-white transition hover:-translate-y-px"
              >
                Download Free
              </button>
            </div>
          ))}
        </div>
      </Container>

      <section className="bg-paper-deep">
        <Container className="py-14">
          <div className="flex flex-col items-center gap-8 rounded-xl bg-ink px-8 py-11 text-center text-white md:flex-row md:text-left">
            <div className="flex-1">
              <h2 className="mb-2 text-2xl text-white md:text-[28px]">Like what you see?</h2>
              <p className="text-[15px] leading-relaxed text-white/80">
                These free templates are a small taste of what&rsquo;s in our full bundles — 10
                care plans, 6 risk assessments, and more, ready to edit today.
              </p>
            </div>
            <ButtonLink href="/shop" variant="on-dark" className="shrink-0">
              Browse Full Bundles →
            </ButtonLink>
          </div>
        </Container>
      </section>

      <ResourceGateModal openResource={openResource} onClose={() => setOpenResource(null)} />
    </>
  );
}
