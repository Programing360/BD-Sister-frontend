import type { Metadata } from "next";
import Link from "next/link";
import { MainContainer } from "@/components/layout/container";
import { PageHeader } from "@/components/layout/page-header";
import { Section } from "@/components/layout/section";
import { Alert } from "@/components/ui/alert";
import { ROUTES } from "@/config/routes";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Privacy Policy (Draft)",
  description:
    "Privacy Policy draft for BDSisters.org outlining data handling principles, member privacy, and confidentiality commitments.",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="flex flex-col">
      <Section spacing="sm">
        <MainContainer size="md">
          <PageHeader
            title="Privacy Policy"
            description="Our commitment to safeguarding the personal information and confidentiality of our community sisters."
            breadcrumbs={
              <div className="flex items-center gap-1.5">
                <Link href={ROUTES.public.home} className="hover:text-foreground">
                  Home
                </Link>
                <span>/</span>
                <span className="text-foreground">Privacy Policy</span>
              </div>
            }
          />

          <Alert
            variant="warning"
            title="Draft Document — Pending Formal Legal Counsel Review"
            className="my-6"
          >
            This document outlines preliminary data handling practices and ethical principles for
            BDSisters.org. It is currently a developer and architectural draft and must undergo
            formal legal validation under applicable laws of Bangladesh before platform launch.
          </Alert>

          <div className="prose prose-sm dark:prose-invert max-w-none space-y-6 text-foreground/90 leading-relaxed">
            <section>
              <h2 className="text-lg font-bold text-foreground">
                1. Introduction &amp; Core Philosophy
              </h2>
              <p className="text-sm text-muted">
                At {siteConfig.name}, we believe privacy is an essential Islamic and ethical
                responsibility (Amanah). We are committed to maintaining a dignified, private, and
                secure digital environment for Bangladeshi Muslim women entrepreneurs, freelancers,
                learners, and community members.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-foreground">2. Information We Collect</h2>
              <p className="text-sm text-muted">
                We collect only information necessary to provide community membership, directory
                discovery, and learning access:
              </p>
              <ul className="list-disc pl-5 text-sm text-muted space-y-1 mt-2">
                <li>
                  <strong>Account Data:</strong> Name, verified email address, and authentication
                  credentials.
                </li>
                <li>
                  <strong>Business Profiles:</strong> Enterprise name, category, district location,
                  contact numbers, and public description.
                </li>
                <li>
                  <strong>Voluntary Member Information:</strong> Bio, skills, district location, and
                  social links provided voluntarily.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-lg font-bold text-foreground">3. How Information Is Used</h2>
              <p className="text-sm text-muted">
                Your data is used strictly to operate the platform: enabling directory discovery,
                delivering workshop reminders, preventing abusive spam/harassment, and connecting
                you with relevant community circles. We do not sell, rent, or trade your personal
                data to external advertisers.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-foreground">4. Sisterhood Confidentiality</h2>
              <p className="text-sm text-muted">
                Private discussions within community cohorts are governed by strict confidentiality
                expectations. Taking unauthorized screenshots, exporting member contacts, or sharing
                private personal disclosures outside the platform is a direct violation of our
                community standards and will result in account termination.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-foreground">5. Contact Regarding Privacy</h2>
              <p className="text-sm text-muted">
                For questions or data deletion requests, contact our privacy officer at{" "}
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
