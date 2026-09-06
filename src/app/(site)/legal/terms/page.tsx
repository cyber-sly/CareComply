import Link from "next/link";
import { LegalPage } from "@/components/marketing/legal-page";

export const metadata = { title: "Terms & Conditions — KEPA HUB" };

export default function TermsPage() {
  return (
    <LegalPage
      title="Terms & Conditions"
      updated="[PLACEHOLDER — to be reviewed by a solicitor before publishing] · Last updated: June 2026"
    >
      <p>
        These Terms &amp; Conditions govern your use of the KEPA HUB website and any
        purchase of templates or consultancy services. This is a draft template and must be
        reviewed by a solicitor before publishing. By using this website or purchasing from us,
        you agree to these terms.
      </p>

      <h2>1. Digital products</h2>
      <p>
        All templates are sold as digital downloads, delivered instantly after payment. Because
        digital content is delivered immediately, you acknowledge that your right to cancel under
        the Consumer Contracts Regulations is waived once download access is provided, as
        confirmed at checkout.
      </p>

      <h2>2. Licence to use</h2>
      <p>
        Purchasing a template grants you a licence to use, edit, and rebrand it for your own
        organisation, subject to the terms in our{" "}
        <Link href="/legal/licence-terms">Licence Terms</Link>. Resale or redistribution of
        templates, in original or modified form, is prohibited.
      </p>

      <h2>3. No guarantee of inspection outcome</h2>
      <p>
        Our templates and consultancy services are designed to support compliance with CIW
        expectations, but we cannot guarantee any specific inspection outcome. You remain
        responsible for ensuring your service meets all applicable regulatory requirements.
      </p>

      <h2>4. Consultancy services</h2>
      <p>
        Consultancy bookings (mock inspections, policy reviews, mentoring) are subject to
        availability and may require payment at the time of booking. Cancellation and
        rescheduling terms [to be confirmed] will apply.
      </p>

      <h2>5. Refunds</h2>
      <p>
        [Policy to be confirmed] Typically, no refunds are offered on digital downloads once
        delivered. This will be clearly stated at the point of purchase.
      </p>

      <h2>6. Limitation of liability</h2>
      <p>
        [To be reviewed with a solicitor] To the extent permitted by law, KEPA HUB&rsquo;s
        liability for any claim relating to our templates or services is limited to the amount
        paid for the relevant product or service.
      </p>

      <h2>7. Governing law</h2>
      <p>These terms are governed by the laws of England and Wales [confirm jurisdiction].</p>
    </LegalPage>
  );
}
