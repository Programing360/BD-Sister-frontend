import type { Metadata } from "next";
import Link from "next/link";
import { MainContainer } from "@/components/layout/container";
import { PageHeader } from "@/components/layout/page-header";
import { Section } from "@/components/layout/section";
import { Alert } from "@/components/ui/alert";
import { ROUTES } from "@/config/routes";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Terms & Conditions (Draft)",
  description:
    "Terms and Conditions draft for BDSisters.org outlining community guidelines, commercial conduct, and platform usage expectations.",
};

export default function TermsAndConditionsPage() {
  return (
    <div className="flex flex-col">
      <Section spacing="sm">
        <MainContainer size="md">
          <PageHeader
            title="Terms &amp; Conditions"
            description="The mutual agreement and community code of conduct governing participation on BDSisters.org."
            breadcrumbs={
              <div className="flex items-center gap-1.5">
                <Link href={ROUTES.public.home} className="hover:text-foreground">
                  Home
                </Link>
                <span>/</span>
                <span className="text-foreground">Terms &amp; Conditions</span>
              </div>
            }
          />

          <Alert
            variant="warning"
            title="Draft Document — Pending Formal Legal Counsel Review"
            className="my-6"
          >
            These terms represent architectural specifications and ethical guidelines for community
            participation. They are marked as draft and must undergo formal review by qualified
            legal counsel in Bangladesh prior to commercial launch.
          </Alert>

          <div className="prose prose-sm dark:prose-invert max-w-none space-y-6 text-foreground/90 leading-relaxed">
            <section>
              <h2 className="text-lg font-bold text-foreground">
                1. Acceptance of Community Agreement
              </h2>
              <p className="text-sm text-muted">
                By accessing or registering with {siteConfig.name}, you agree to abide by these
                Terms and our Sisterhood Code of Conduct. If you do not agree with these principles
                of mutual respect and ethical commerce, please refrain from using the platform.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-foreground">
                2. Eligibility &amp; Community Scope
              </h2>
              <p className="text-sm text-muted">
                BDSisters.org is founded to support Bangladeshi Muslim women in entrepreneurship,
                freelancing, skill development, and professional networking. Members must register
                using authentic identity and provide truthful information regarding their ventures.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-foreground">
                3. Ethical Commerce &amp; Vendor Integrity
              </h2>
              <p className="text-sm text-muted">
                Entrepreneurs listing products or services in the directory or marketplace must:
              </p>
              <ul className="list-disc pl-5 text-sm text-muted space-y-1 mt-2">
                <li>
                  Ensure all goods and services meet Halal and lawful standards under the laws of
                  Bangladesh.
                </li>
                <li>
                  Accurately represent item quality, pricing, delivery timelines, and cancellation
                  terms.
                </li>
                <li>
                  Fulfill orders honestly and resolve customer inquiries with grace and fairness.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-lg font-bold text-foreground">
                4. Code of Conduct &amp; Zero-Tolerance Policy
              </h2>
              <p className="text-sm text-muted">
                BDSisters enforces an absolute zero-tolerance policy against:
              </p>
              <ul className="list-disc pl-5 text-sm text-muted space-y-1 mt-2">
                <li>Harassment, bullying, defamation, or derogatory language toward any sister.</li>
                <li>
                  Posting fraudulent investment schemes, pyramid systems, or misleading medical
                  claims.
                </li>
                <li>Unauthorized commercial spam or unsolicited scraping of member information.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-lg font-bold text-foreground">5. Termination &amp; Suspension</h2>
              <p className="text-sm text-muted">
                We reserve the right to suspend or remove any profile, listing, or forum post that
                violates the dignity of our sisterhood or breaches these Terms.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-foreground">6. Contact Information</h2>
              <p className="text-sm text-muted">
                For legal inquiries or conduct reports, contact{" "}
                <a
                  href={`mailto:${siteConfig.links.supportEmail}`}
                  className="text-primary underline"
                >
                  {siteConfig.links.supportEmail}
                </a>
                .
              </p>
            </section>
          </div>
        </MainContainer>
      </Section>
    </div>
  );
}
