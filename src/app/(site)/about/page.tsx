import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { ButtonLink } from "@/components/ui/button";

export const metadata = {
  title: "About — KEPA HUB",
  description: "Built from real experience in care compliance.",
};

const VALUES = [
  {
    title: "Written for the real thing",
    body: "Every document is built around what CIW actually looks for — not generic placeholder text.",
  },
  {
    title: "Yours to make your own",
    body: "Every template is fully editable. Add your branding, adjust the language, make it fit your agency.",
  },
  {
    title: "No subscriptions, no traps",
    body: "Pay once, keep it forever. We believe in earning repeat business, not locking you in.",
  },
];

export default function AboutPage() {
  return (
    <>
      <Container className="grid grid-cols-1 items-center gap-12 py-14 md:grid-cols-[0.55fr_1fr] md:py-16">
        <div className="flex aspect-[4/5] items-center justify-center rounded-lg border border-line bg-paper-deep p-5 text-center font-mono text-xs text-grey-light">
          [Photo of founder/consultant]
        </div>
        <div>
          <Eyebrow>Our story</Eyebrow>
          <h1 className="mb-4 text-[30px] leading-tight md:text-[36px]">
            Built from real experience in care compliance.
          </h1>
          <p className="mb-4 max-w-[540px] text-[15.5px] leading-relaxed text-ink-soft">
            KEPA HUB was founded by [Name], a registered manager with [X] years of experience
            in domiciliary care. After seeing the same paperwork gaps come up again and again
            during inspections, [Name] started writing templates that actually reflect how real
            agencies operate — not generic downloads, but documents built around CIW
            expectations.
          </p>
          <p className="mb-6 max-w-[540px] text-[15.5px] leading-relaxed text-ink-soft">
            [Placeholder bio — to be personalised with the founder&rsquo;s real background,
            qualifications, and story before launch.]
          </p>
          <div className="flex flex-wrap gap-3.5">
            <ButtonLink href="/shop" variant="primary">Browse Templates</ButtonLink>
            <ButtonLink href="/consultancy" variant="outline">Book a Call</ButtonLink>
          </div>
        </div>
      </Container>

      <section className="bg-paper-deep">
        <Container className="max-w-[760px] py-16 text-center md:py-20">
          <Eyebrow center>Why we exist</Eyebrow>
          <h2 className="mb-5 text-[26px] md:text-[30px]">
            Why templates aren&rsquo;t enough on their own
          </h2>
          <p className="mb-6 text-[15.5px] leading-relaxed text-ink-soft">
            A template gets you most of the way there — but every agency is different, and
            inspections are unpredictable. That&rsquo;s why we also offer consultancy services:
            mock inspections, policy reviews, and registered manager mentoring, for when you want
            a second pair of expert eyes on your specific service.
          </p>
          <a href="/consultancy" className="text-[14px] font-semibold text-verified hover:underline">
            See Consultancy Services →
          </a>
        </Container>
      </section>

      <Container className="py-16 md:py-20">
        <div className="rounded-xl bg-verified px-8 py-11 text-center text-white">
          <p className="mx-auto max-w-[640px] font-display text-xl leading-relaxed md:text-2xl">
            &ldquo;We exist to make compliance feel manageable, not overwhelming.&rdquo;
          </p>
        </div>
      </Container>

      <section className="bg-paper-deep">
        <Container className="py-16 md:py-20">
          <div className="mb-12 text-center">
            <Eyebrow center>What we believe</Eyebrow>
            <h2 className="text-[26px] md:text-[30px]">How we approach every template</h2>
          </div>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
            {VALUES.map((v) => (
              <div key={v.title}>
                <h4 className="mb-2 text-[17px]">{v.title}</h4>
                <p className="text-sm leading-relaxed text-grey">{v.body}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <Container className="py-20 text-center">
        <h2 className="mb-8 text-[28px] md:text-[32px]">Ready to get inspection-ready?</h2>
        <div className="flex flex-wrap justify-center gap-3.5">
          <ButtonLink href="/shop" variant="primary">Browse the Shop</ButtonLink>
          <ButtonLink href="/consultancy" variant="outline">Book a Consultation</ButtonLink>
        </div>
      </Container>
    </>
  );
}
