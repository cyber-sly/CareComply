import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { ButtonLink } from "@/components/ui/button";
import { ConsultancyServices } from "@/components/marketing/consultancy-services";

export const metadata = {
  title: "Consultancy — CareComply UK",
  description: "Work directly with a registered manager consultant for mock inspections, policy reviews, and mentoring.",
};

const STEPS = [
  { num: "1", title: "Choose a service", body: "Pick the card above that matches what you need help with." },
  { num: "2", title: "Pick a time", body: "See real availability and choose a date and time that works for you." },
  { num: "3", title: "Confirm & pay", body: "Paid services are confirmed with payment at booking; the discovery call is free." },
  { num: "4", title: "Get a reminder", body: "You'll get a confirmation email and a reminder 24 hours before your session." },
];

export default function ConsultancyPage() {
  return (
    <>
      <Container className="pt-16 pb-14 text-center md:pt-20">
        <div className="mx-auto max-w-[680px]">
          <Eyebrow center>1:1 expert support</Eyebrow>
          <h1 className="mb-4 text-[32px] leading-tight md:text-[42px]">
            When you need more than a template.
          </h1>
          <p className="text-base leading-relaxed text-ink-soft md:text-[16.5px]">
            Work directly with a registered manager consultant to get inspection-ready, fix gaps in your policies, or get ongoing support running your service.
          </p>
        </div>
      </Container>

      <Container className="pb-16">
        <ConsultancyServices />
      </Container>

      <section className="bg-paper-deep">
        <Container className="py-16 md:py-20">
          <div className="mb-12 text-center">
            <Eyebrow center>How booking works</Eyebrow>
            <h2 className="text-[26px] md:text-[30px]">From choosing a service to your first session</h2>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {STEPS.map((step) => (
              <div key={step.num} className="text-center">
                <div className="mx-auto mb-3.5 flex h-9 w-9 items-center justify-center rounded-full bg-ink font-mono text-sm text-white">
                  {step.num}
                </div>
                <h5 className="mb-1.5 font-semibold">{step.title}</h5>
                <p className="text-[13.5px] leading-relaxed text-grey">{step.body}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <Container className="py-20 text-center">
        <h2 className="mb-8 text-[28px] md:text-[32px]">Not sure which service is right?</h2>
        <div className="flex flex-wrap justify-center gap-3.5">
          <ButtonLink href="#consultancy-services" variant="primary">
            Book a Free Discovery Call
          </ButtonLink>
          <ButtonLink href="/shop" variant="outline">Browse Templates Instead</ButtonLink>
        </div>
      </Container>
    </>
  );
}
