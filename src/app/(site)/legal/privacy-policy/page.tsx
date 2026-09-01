import Link from "next/link";
import { LegalPage } from "@/components/marketing/legal-page";

export const metadata = { title: "Privacy Policy — CareComply UK" };

export default function PrivacyPolicyPage() {
  return (
    <LegalPage
      title="Privacy Policy"
      updated="[PLACEHOLDER — to be reviewed by a solicitor before publishing] · Last updated: June 2026"
    >
      <p>
        This Privacy Policy explains how CareComply UK (&ldquo;we&rdquo;, &ldquo;us&rdquo;)
        collects, uses, and protects your personal information when you visit our website,
        purchase a template, or book a consultation. This is a draft template and must be
        reviewed and confirmed against your actual data practices before publishing.
      </p>

      <h2>1. Information we collect</h2>
      <ul>
        <li>Contact details you provide (name, email, phone) via forms, free downloads, checkout, or booking</li>
        <li>Payment information, processed by our payment provider (we do not store full card details)</li>
        <li>Booking details for consultancy services</li>
        <li>Technical information such as IP address and browser type, via standard analytics tools</li>
      </ul>

      <h2>2. How we use your information</h2>
      <ul>
        <li>To deliver purchased templates and process orders</li>
        <li>To confirm and manage consultancy bookings</li>
        <li>To send marketing emails, where you&rsquo;ve opted in (you can unsubscribe at any time)</li>
        <li>To improve our website and services</li>
      </ul>

      <h2>3. Sharing your information</h2>
      <p>
        We do not sell your personal data. We may share information with trusted service
        providers who help us operate the website (e.g. payment processors, email marketing
        platforms, booking software), under appropriate data protection agreements.
      </p>

      <h2>4. Your rights under UK GDPR</h2>
      <p>
        You have the right to access, correct, or request deletion of your personal data, and to
        object to or restrict certain processing. To exercise these rights, contact us using the
        details on our <Link href="/contact">Contact page</Link>.
      </p>

      <h2>5. Data retention</h2>
      <p>
        [To be confirmed] We retain personal data only as long as necessary for the purposes
        outlined in this policy, or as required by law.
      </p>

      <h2>6. Cookies</h2>
      <p>
        Our website uses cookies. See our <Link href="/legal/cookie-policy">Cookie Policy</Link>{" "}
        for details.
      </p>

      <h2>7. Contact</h2>
      <p>
        For any questions about this policy or your personal data, contact us via our{" "}
        <Link href="/contact">Contact page</Link>.
      </p>
    </LegalPage>
  );
}
