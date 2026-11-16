import type { Metadata } from "next";
import Link from "next/link";
import { MainContainer } from "@/components/layout/container";
import { PageHeader } from "@/components/layout/page-header";
import { Section } from "@/components/layout/section";
import { Accordion } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ROUTES } from "@/config/routes";
import { HelpCircle, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Frequently Asked Questions & Help Center",
  description:
    "Find answers about joining BDSisters, listing your business, participating in workshops, community privacy, and platform rules.",
};

export default function FAQPage() {
  const generalFAQs = [
    {
      id: "gen-1",
      title: "What is BDSisters.org?",
      content:
        "BDSisters.org is an AI-powered digital community and business enablement platform specifically designed for Bangladeshi Muslim women. It brings together entrepreneurs, freelancers, learners, and community members into one supportive ecosystem.",
      defaultOpen: true,
    },
    {
      id: "gen-2",
      title: "Who can join the BDSisters community?",
      content:
        "Any Bangladeshi woman—whether an entrepreneur running a home-kitchen, a software developer, an undergraduate student, an artisan, or a professional—is welcome to join. Our platform emphasizes mutual dignity, sisterhood, and ethical growth.",
    },
    {
      id: "gen-3",
      title: "Is community membership free of charge?",
      content:
        "Yes, joining the community, participating in discussions, and browsing directory listings are completely free. Certain specialized cohort masterclasses or premium vendor tools may carry optional fees to compensate instructors.",
    },
  ];

  const businessFAQs = [
    {
      id: "biz-1",
      title: "How do I list my business in the directory?",
      content:
        "Registered members can submit their business details, including category, district, description, and contact info, through their profile. Listings are reviewed by our community team to ensure authenticity and maintain trust.",
      defaultOpen: true,
    },
    {
      id: "biz-2",
      title: "What types of businesses can be listed?",
      content:
        "Any legal, ethical, and Halal venture founded or managed by women in Bangladesh can be listed—including apparel, handicrafts, catering, baking, digital agencies, tutoring services, and consulting practices.",
    },
    {
      id: "biz-3",
      title: "Will there be online selling and payments on BDSisters?",
      content:
        "Yes. While Phase 1 focuses on directory networking, upcoming phases will introduce verified marketplace storefronts with integrated local mobile financial services (bKash, Nagad) and courier logistics partnerships.",
    },
  ];

  const learningFAQs = [
    {
      id: "learn-1",
      title: "How do workshops and webinars work?",
      content:
        "We host both online Zoom/Google Meet webinars accessible from anywhere in the world and occasional in-person networking sessions in major Bangladeshi cities like Dhaka, Chittagong, and Sylhet.",
      defaultOpen: true,
    },
    {
      id: "learn-2",
      title: "Can I apply to become a mentor or workshop host?",
      content:
        "Absolutely. We actively invite experienced female entrepreneurs, corporate professionals, lawyers, and educators to share their knowledge through structured community workshops.",
    },
  ];

  const privacyFAQs = [
    {
      id: "priv-1",
      title: "How does BDSisters protect member privacy?",
      content:
        "We take privacy seriously. Member contact information is never sold to third parties, and community discussions are moderated. Screenshots or sharing member posts outside without permission is strictly prohibited.",
      defaultOpen: true,
    },
    {
      id: "priv-2",
      title: "How are community rules enforced?",
      content:
        "Our moderation team reviews reported content and member inquiries. Any violation of our Code of Conduct (harassment, spam, unethical selling) results in warnings or immediate account removal.",
    },
  ];

  return (
    <div className="flex flex-col">
      <Section spacing="sm">
        <MainContainer size="md">
          <PageHeader
            title="Help &amp; Frequently Asked Questions"
            description="Clear answers about our sisterhood platform, membership benefits, business directory, and community standards."
            breadcrumbs={
              <div className="flex items-center gap-1.5">
                <Link href={ROUTES.public.home} className="hover:text-foreground">
                  Home
                </Link>
                <span>/</span>
                <span className="text-foreground">FAQ</span>
              </div>
            }
          />

          <div className="space-y-12 mt-8">
            {/* General */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Badge variant="primary">General Platform</Badge>
              </div>
              <h2 className="text-xl font-bold text-foreground mb-4">
                About the Platform &amp; Membership
              </h2>
              <Accordion items={generalFAQs} />
            </div>

            {/* Businesses */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Badge variant="secondary">Enterprise Network</Badge>
              </div>
              <h2 className="text-xl font-bold text-foreground mb-4">
                Women-Led Businesses &amp; Marketplace
              </h2>
              <Accordion items={businessFAQs} />
            </div>

            {/* Learning & Events */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Badge variant="primary">Education</Badge>
              </div>
              <h2 className="text-xl font-bold text-foreground mb-4">
                Learning, Mentorship &amp; Events
              </h2>
              <Accordion items={learningFAQs} />
            </div>

            {/* Privacy */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Badge variant="neutral">Trust &amp; Safety</Badge>
              </div>
              <h2 className="text-xl font-bold text-foreground mb-4">
                Privacy, Security &amp; Moderation
              </h2>
              <Accordion items={privacyFAQs} />
            </div>
          </div>

          {/* Contact Box */}
          <div className="mt-16 rounded-2xl bg-surface border border-border p-8 text-center">
            <HelpCircle className="h-8 w-8 text-primary mx-auto mb-3" />
            <h3 className="text-lg font-bold text-foreground">Still Have Unanswered Questions?</h3>
            <p className="text-sm text-muted mt-1.5 max-w-md mx-auto">
              Our community support sisters are available to guide you through any aspect of the
              platform.
            </p>
            <div className="mt-5 flex justify-center">
              <Link href={ROUTES.public.contact}>
                <Button variant="primary" rightIcon={<ArrowRight className="h-4 w-4" />}>
                  Contact Our Support Team
                </Button>
              </Link>
            </div>
          </div>
        </MainContainer>
      </Section>
    </div>
  );
}
