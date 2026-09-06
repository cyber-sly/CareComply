import Link from "next/link";
import { Container } from "@/components/ui/container";
import { ButtonLink } from "@/components/ui/button";
import { AccordionItem } from "@/components/ui/accordion-item";

export const metadata = {
  title: "FAQs — KEPA HUB",
  description: "Everything you need to know before buying a template or booking a consultation.",
};

export default function FAQsPage() {
  return (
    <>
      <Container className="py-14 md:py-16">
        <div className="max-w-[600px]">
          <h1 className="mb-2.5 text-[30px] md:text-[36px]">Frequently Asked Questions</h1>
          <p className="text-[15px] leading-relaxed text-grey">
            Everything you need to know before buying a template or booking a consultation.
          </p>
        </div>
      </Container>

      <Container className="max-w-[760px] pb-16">
        <div className="mb-10">
          <h2 className="mb-1 text-xl">Templates &amp; formats</h2>
          <AccordionItem question="What format are the templates in?" defaultOpen>
            Word (.docx) and PDF.
          </AccordionItem>
          <AccordionItem question="Can I edit and rebrand the templates?">
            Yes, with your agency&rsquo;s name and logo, in line with our licence terms.
          </AccordionItem>
          <AccordionItem question="Are these templates legally required documents?">
            No — they are templates to help you meet CIW expectations; you remain responsible
            for compliance.
          </AccordionItem>
        </div>

        <div className="mb-10">
          <h2 className="mb-1 text-xl">Orders &amp; licensing</h2>
          <AccordionItem question="Do you offer refunds?">
            [Policy to be confirmed — typically no refunds on digital downloads once delivered,
            due to instant access. This will be stated clearly before purchase.]
          </AccordionItem>
          <AccordionItem question="Can I use one bundle across multiple branches/locations?">
            This depends on the licence terms for multi-branch use — see our{" "}
            <Link href="/legal/licence-terms" className="font-semibold text-verified">
              Licence Terms
            </Link>{" "}
            page.
          </AccordionItem>
          <AccordionItem question="Is this a subscription?">
            No — templates are a one-off payment and yours to keep. (Our future membership option
            will be subscription-based and clearly marked as such.)
          </AccordionItem>
        </div>

        <div>
          <h2 className="mb-1 text-xl">Consultancy &amp; booking</h2>
          <AccordionItem question="How do I book a consultation?">
            Visit the{" "}
            <Link href="/consultancy" className="font-semibold text-verified">
              Consultancy
            </Link>{" "}
            page and choose a service to see live availability.
          </AccordionItem>
          <AccordionItem question="Do you cover Scotland (Care Inspectorate) or Northern Ireland (RQIA)?">
            [Scope to be confirmed — our current templates and consultancy are written around CIW
            (Wales) standards.]
          </AccordionItem>
        </div>
      </Container>

      <Container className="pb-20 text-center">
        <h2 className="mb-8 text-[28px] md:text-[32px]">Still have a question?</h2>
        <div className="flex flex-wrap justify-center gap-3.5">
          <ButtonLink href="/contact" variant="primary">Contact Us</ButtonLink>
          <ButtonLink href="/consultancy" variant="outline">Book a Free Call</ButtonLink>
        </div>
      </Container>
    </>
  );
}
