import Link from "next/link";
import Image from "next/image";
import { Container } from "@/components/ui/container";
import { NewsletterForm } from "@/components/layout/newsletter-form";

const SOCIALS = [
  { label: "Pinterest", short: "P" },
  { label: "LinkedIn", short: "in" },
  { label: "Facebook", short: "f" },
  { label: "TikTok", short: "Tk" },
  { label: "YouTube", short: "Yt" },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-line bg-paper-deep">
      <Container className="py-16">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="flex items-center gap-2">
              <Image src="/Logo.png" alt="" width={44} height={44} className="h-11 w-auto" />
              <span className="font-display text-lg font-bold">KEPA HUB</span>
            </div>
            <p className="mt-2 max-w-[220px] text-sm text-grey">
              Helping care providers build safer, stronger and inspection-ready services.
            </p>
            <div className="mt-4 flex gap-3">
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

          <div>
            <h4 className="mb-3 font-display text-base font-bold">Shop</h4>
            <ul className="space-y-2 text-sm text-ink-soft">
              <li><Link href="/shop/starter-pack" className="hover:text-verified">Starter Pack</Link></li>
              <li><Link href="/shop/manager-toolkit" className="hover:text-verified">Manager Toolkit</Link></li>
              <li><Link href="/shop/policy-pack" className="hover:text-verified">Policy Pack</Link></li>
              <li><Link href="/shop/premium-kit" className="hover:text-verified">Premium Kit</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="mb-3 font-display text-base font-bold">Company</h4>
            <ul className="space-y-2 text-sm text-ink-soft">
              <li><Link href="/about" className="hover:text-verified">About</Link></li>
              <li><Link href="/blog" className="hover:text-verified">Blog</Link></li>
              <li><Link href="/contact" className="hover:text-verified">Contact</Link></li>
              <li><Link href="/faqs" className="hover:text-verified">FAQs</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="mb-3 font-display text-base font-bold">Stay informed</h4>
            <p className="mb-3.5 text-sm text-grey">
              Free templates and compliance tips, occasionally.
            </p>
            <NewsletterForm />
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-line pt-6 text-xs text-grey sm:flex-row sm:items-center sm:justify-between">
          <span>&copy; {new Date().getFullYear()} KEPA HUB. All rights reserved.</span>
          <div className="flex flex-wrap gap-4">
            <Link href="/legal/privacy-policy" className="hover:text-ink">Privacy Policy</Link>
            <Link href="/legal/terms" className="hover:text-ink">Terms</Link>
            <Link href="/legal/licence-terms" className="hover:text-ink">Licence Terms</Link>
            <Link href="/legal/cookie-policy" className="hover:text-ink">Cookies</Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}
