import Link from "next/link";
import { LegalPage } from "@/components/marketing/legal-page";

export const metadata = { title: "Cookie Policy — KEPA HUB" };

export default function CookiePolicyPage() {
  return (
    <LegalPage
      title="Cookie Policy"
      updated="[PLACEHOLDER — to be reviewed by a solicitor before publishing] · Last updated: June 2026"
    >
      <p>
        This Cookie Policy explains how KEPA HUB uses cookies and similar technologies on
        our website. This is a draft template to be reviewed before publishing, alongside a real
        cookie consent banner.
      </p>

      <h2>1. What are cookies</h2>
      <p>
        Cookies are small text files stored on your device when you visit a website. They help
        websites function correctly and allow us to understand how visitors use our site.
      </p>

      <h2>2. Cookies we use</h2>
      <ul>
        <li><strong>Essential cookies</strong> — required for basic site functionality, such as remembering items in your basket</li>
        <li><strong>Analytics cookies</strong> — help us understand how visitors use the site (e.g. Google Analytics)</li>
        <li><strong>Marketing cookies</strong> — used for tracking the effectiveness of social media and advertising (e.g. Pinterest, Meta pixels), where applicable</li>
      </ul>

      <h2>3. Managing cookies</h2>
      <p>
        You can control or delete cookies through your browser settings. Disabling essential
        cookies may affect site functionality, such as your basket contents.
      </p>

      <h2>4. Changes to this policy</h2>
      <p>We may update this Cookie Policy from time to time. Please check back periodically for changes.</p>

      <h2>5. Contact</h2>
      <p>
        For questions about our use of cookies, contact us via our{" "}
        <Link href="/contact">Contact page</Link>.
      </p>
    </LegalPage>
  );
}
