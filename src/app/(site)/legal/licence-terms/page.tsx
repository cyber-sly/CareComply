import Link from "next/link";
import { LegalPage } from "@/components/marketing/legal-page";

export const metadata = { title: "Licence Terms — CareComply UK" };

export default function LicenceTermsPage() {
  return (
    <LegalPage
      title="Licence Terms"
      updated="[PLACEHOLDER — to be reviewed by a solicitor before publishing] · Last updated: June 2026"
    >
      <p>
        This page explains what you can and can&rsquo;t do with templates purchased from
        CareComply UK. This is a draft and the specific terms below (especially multi-location
        use) need a decision from the business owner before publishing.
      </p>

      <h2>1. What&rsquo;s included in your licence</h2>
      <ul>
        <li>You may use, edit, and rebrand any purchased template for use within your own care agency</li>
        <li>You may add your own logo, branding, and adjust the content to suit your service</li>
        <li>You may print and distribute copies internally for staff and service user use</li>
      </ul>

      <h2>2. Single-location vs multi-location use [decision needed]</h2>
      <p>
        [PLACEHOLDER — the business needs to decide]: Is each purchase licensed to one registered
        location only, or does it cover a company with multiple branches? This affects how the
        templates can be used by agencies with more than one site, and may justify a different
        price tier for multi-branch licences.
      </p>

      <h2>3. What&rsquo;s not permitted</h2>
      <ul>
        <li>Reselling, redistributing, or sharing templates with other businesses or individuals outside your organisation</li>
        <li>Publishing templates publicly (e.g. on a public-facing website) in a way that allows others to copy them</li>
        <li>Removing or claiming copyright ownership of the original template structure</li>
      </ul>

      <h2>4. Ownership</h2>
      <p>
        CareComply UK retains copyright ownership of all template designs and structures. Your
        licence grants usage rights, not ownership of the underlying content.
      </p>

      <h2>5. Questions about your licence</h2>
      <p>
        If you&rsquo;re unsure whether your intended use is covered by your licence (for example,
        expanding to a second location), please <Link href="/contact">contact us</Link> before
        proceeding.
      </p>
    </LegalPage>
  );
}
