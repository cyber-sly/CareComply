import Link from "next/link";
import { Container } from "@/components/ui/container";
import { ButtonLink } from "@/components/ui/button";
import { Eyebrow } from "@/components/ui/eyebrow";
import { DocStack } from "@/components/marketing/doc-stack";
import { getProducts } from "@/lib/supabase/queries";
import { formatGBP } from "@/lib/utils";
import { Check } from "lucide-react";

const PATHWAYS = [
  {
    tag: "For new agencies",
    title: "Starting a care agency",
    body: "Get every document you need to register and launch, in one kit — from Statement of Purpose to staff forms.",
    href: "/shop/premium-kit",
    cta: "View Premium Kit",
  },
  {
    tag: "For existing agencies",
    title: "Preparing for inspection",
    body: "Audit-ready care plans, risk assessments and policies, reviewed against CIW inspection criteria.",
    href: "/shop/starter-pack",
    cta: "View Starter Pack",
  },
  {
    tag: "For extra support",
    title: "Need expert eyes on it",
    body: "Book a mock inspection or policy review with a registered manager consultant who's done this before.",
    href: "/consultancy",
    cta: "Book a Consultation",
  },
];

const BUNDLE_IDS = ["starter-pack", "manager-toolkit", "policy-pack", "premium-kit"] as const;

const FREE_ITEMS = [
  { code: "IR", name: "Incident Report Form" },
  { code: "FR", name: "Falls Risk Assessment" },
  { code: "ST", name: "Supervision Template" },
];

const TESTIMONIALS = [
  {
    quote:
      "Saved us weeks of paperwork before our CIW inspection. Everything was already aligned to what they actually asked for.",
    who: "Registered manager, Midlands [placeholder]",
  },
  {
    quote:
      "Clear, professional, and actually written for how real domiciliary agencies work day to day.",
    who: "Care agency owner [placeholder]",
  },
  {
    quote:
      "The policy pack alone would have taken me a month to write from scratch. Worth every penny.",
    who: "New agency start-up [placeholder]",
  },
];

export default async function HomePage() {
  const products = await getProducts();
  const bundles = BUNDLE_IDS.map((id) => products.find((p) => p.slug === id)).filter(
    (p): p is NonNullable<typeof p> => Boolean(p)
  );

  return (
    <>
      {/* Hero */}
      <section>
        <Container className="grid grid-cols-1 items-center gap-14 py-16 md:grid-cols-[1.15fr_0.85fr] md:py-24">
          <div>
            <Eyebrow>Aligned to CIW standards</Eyebrow>
            <h1 className="mb-[22px] text-[38px] leading-[1.1] md:text-[52px] md:leading-[1.08]">
              Compliant care paperwork, done in <span className="text-verified">minutes</span> — not months.
            </h1>
            <p className="mb-9 max-w-[480px] text-lg leading-relaxed text-ink-soft">
              Professionally written care plans, risk assessments and policies for UK domiciliary care agencies. Download instantly, or have a consultant do it with you.
            </p>
            <div className="mb-10 flex flex-wrap gap-3.5">
              <ButtonLink href="/shop" variant="primary" className="px-[26px] py-[14px] text-[15px]">
                Browse Templates →
              </ButtonLink>
              <ButtonLink href="/consultancy" variant="outline" className="px-[26px] py-[14px] text-[15px]">
                Book a Free 15-min Call
              </ButtonLink>
            </div>
            <div className="flex flex-wrap gap-7 text-[13.5px] text-grey">
              {["Written for CIW standards", "Instant digital download", "Editable Word & PDF"].map((t) => (
                <span key={t} className="flex items-center gap-1.5">
                  <Check size={15} strokeWidth={3} className="text-verified" />
                  {t}
                </span>
              ))}
            </div>
          </div>
          <DocStack />
        </Container>
      </section>

      {/* Pathways */}
      <section className="bg-paper-deep">
        <Container className="py-16 md:py-20">
          <div className="mb-12 max-w-[600px]">
            <Eyebrow>Three starting points</Eyebrow>
            <h2 className="text-[28px] md:text-[32px]">What do you need help with?</h2>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {PATHWAYS.map((p) => (
              <div key={p.title} className="rounded-lg border border-line bg-white p-7">
                <p className="mb-3 font-mono text-[11px] tracking-[0.06em] text-grey-light">
                  {p.tag.toUpperCase()}
                </p>
                <h3 className="mb-2.5 text-xl">{p.title}</h3>
                <p className="mb-5 text-[14.5px] leading-relaxed text-grey">{p.body}</p>
                <Link
                  href={p.href}
                  className="text-[14px] font-semibold text-verified hover:underline"
                >
                  {p.cta} →
                </Link>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Bundles */}
      <section>
        <Container className="py-16 md:py-20">
          <div className="mb-12 max-w-[600px]">
            <Eyebrow>The shop</Eyebrow>
            <h2 className="text-[28px] md:text-[32px]">
              Templates built by people who&rsquo;ve sat through real inspections.
            </h2>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {bundles.map((product) => (
              <div
                key={product.id}
                className={
                  "relative flex flex-col rounded-lg border bg-white p-6 " +
                  (product.featured ? "border-verified" : "border-line")
                }
              >
                {product.featured && (
                  <span className="absolute -top-3 left-6 rounded-full bg-verified px-3 py-1 font-mono text-[10px] font-semibold tracking-wide text-white">
                    MOST POPULAR
                  </span>
                )}
                <div className="mb-5 flex h-24 items-center justify-center rounded-md bg-paper-deep">
                  <div className="flex gap-1.5">
                    <div className="h-14 w-9 rounded-sm border border-line bg-white" />
                    <div className="h-14 w-9 -translate-y-1.5 rounded-sm border border-line bg-white" />
                  </div>
                </div>
                <div className="mb-3 font-display text-lg font-bold leading-snug">
                  {product.name}
                </div>
                <p className="mb-4 flex-1 text-[13.5px] leading-relaxed text-grey">
                  {product.description}
                </p>
                <div className="mb-4 font-mono text-2xl font-semibold">
                  {formatGBP(product.price)}
                </div>
                <ButtonLink
                  href={`/shop/${product.slug}`}
                  variant={product.featured ? "verified" : "outline"}
                  block
                >
                  View Bundle
                </ButtonLink>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Consultancy strip */}
      <section className="bg-paper-deep">
        <Container className="py-14">
          <div className="flex flex-col items-center gap-8 rounded-xl bg-ink px-8 py-11 text-center text-white md:flex-row md:text-left">
            <div className="flex-1">
              <h2 className="mb-2 text-2xl text-white md:text-[28px]">
                Sometimes a template isn&rsquo;t enough.
              </h2>
              <p className="text-[15px] leading-relaxed text-white/80">
                If you need a second pair of expert eyes — a mock CIW inspection, a full policy review, or ongoing mentoring as a registered manager — book time directly with our consultant.
              </p>
            </div>
            <ButtonLink href="/consultancy" variant="on-dark" className="shrink-0">
              See Consultancy Services →
            </ButtonLink>
          </div>
        </Container>
      </section>

      {/* Free resources teaser */}
      <section>
        <Container className="grid grid-cols-1 items-center gap-12 py-16 md:grid-cols-2 md:py-20">
          <div>
            <Eyebrow>Try before you buy</Eyebrow>
            <h2 className="mb-3.5 text-[26px] leading-tight md:text-[30px]">
              Free templates. No catch.
            </h2>
            <p className="text-[15px] leading-relaxed text-grey">
              Grab our free Incident Report Form, Falls Risk Assessment, and Supervision Template. No charge — just your email.
            </p>
            <ButtonLink href="/free-resources" variant="primary" className="mt-[22px] inline-flex">
              Get Free Templates
            </ButtonLink>
          </div>
          <div className="space-y-3">
            {FREE_ITEMS.map((item) => (
              <div
                key={item.code}
                className="flex items-center gap-4 rounded-lg border border-line bg-white p-4"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-paper-deep font-mono text-xs font-semibold">
                  {item.code}
                </div>
                <div className="flex-1">
                  <div className="text-sm font-semibold">{item.name}</div>
                  <div className="font-mono text-xs text-grey-light">PDF · FREE</div>
                </div>
                <Link href="/free-resources" className="text-[13px] font-semibold text-verified">
                  Download →
                </Link>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Testimonials */}
      <section className="bg-paper-deep">
        <Container className="py-16 md:py-20">
          <div className="mb-12 text-center">
            <Eyebrow center>What managers say</Eyebrow>
            <h2 className="text-[28px] md:text-[32px]">
              Trusted by people who&rsquo;ve been through the real thing.
            </h2>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {TESTIMONIALS.map((t) => (
              <div key={t.who} className="rounded-lg border border-line bg-white p-7">
                <span className="mb-2 block font-display text-4xl text-verified/30">&ldquo;</span>
                <p className="mb-5 text-[15px] leading-relaxed text-ink-soft">{t.quote}</p>
                <div className="font-mono text-[11px] tracking-wide text-grey-light uppercase">
                  {t.who}
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Final CTA */}
      <section>
        <Container className="py-20 text-center">
          <h2 className="mb-8 text-[28px] md:text-[32px]">Ready to get inspection-ready?</h2>
          <div className="flex flex-wrap justify-center gap-3.5">
            <ButtonLink href="/shop" variant="primary">Browse the Shop</ButtonLink>
            <ButtonLink href="/consultancy" variant="outline">Book a Consultation</ButtonLink>
          </div>
        </Container>
      </section>
    </>
  );
}
