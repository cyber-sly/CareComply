import { Container } from "@/components/ui/container";
import { ContactForm } from "@/components/marketing/contact-form";

export const metadata = {
  title: "Contact — KEPA HUB",
  description: "Questions about an order, a template, or anything else? Send us a message.",
};

const SOCIALS = [
  { label: "Pinterest", short: "P" },
  { label: "LinkedIn", short: "in" },
  { label: "Facebook", short: "f" },
  { label: "TikTok", short: "Tk" },
  { label: "YouTube", short: "Yt" },
];

export default function ContactPage() {
  return (
    <Container className="py-14 md:py-20">
      <div className="mb-10 max-w-[560px]">
        <h1 className="mb-2.5 text-[30px] md:text-[36px]">Contact</h1>
        <p className="text-[15px] leading-relaxed text-grey">
          Questions about an order, a template, or anything else? Send us a message and
          we&rsquo;ll get back to you.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-12 md:grid-cols-[1fr_0.85fr]">
        <ContactForm />

        <div className="space-y-5">
          <div className="rounded-lg bg-paper-deep p-6">
            <h4 className="mb-2.5 text-base">Looking to book a consultation?</h4>
            <p className="mb-2.5 text-sm leading-relaxed text-grey">
              Booking directly is faster than emailing — you&rsquo;ll see real availability and
              confirm in a couple of minutes.
            </p>
            <a href="/consultancy" className="text-sm font-semibold text-verified hover:underline">
              Book directly here →
            </a>
          </div>
          <div className="rounded-lg bg-paper-deep p-6">
            <h4 className="mb-2.5 text-base">Email us directly</h4>
            <p className="text-sm text-grey">hello@kepahub.co.uk [placeholder]</p>
          </div>
          <div className="rounded-lg bg-paper-deep p-6">
            <h4 className="mb-3 text-base">Follow along</h4>
            <div className="flex gap-3">
              {SOCIALS.map((s) => (
                <a
                  key={s.label}
                  href="#"
                  aria-label={s.label}
                  className="flex h-8 w-8 items-center justify-center rounded-full border border-line text-xs font-semibold hover:border-ink"
                >
                  {s.short}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}
