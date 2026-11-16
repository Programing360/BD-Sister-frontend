import type { Metadata } from "next";
import Link from "next/link";
import { MainContainer } from "@/components/layout/container";
import { PageHeader } from "@/components/layout/page-header";
import { Section } from "@/components/layout/section";
import { ResponsiveGrid } from "@/components/layout/grid";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ROUTES } from "@/config/routes";
import {
  Users,
  ShieldCheck,
  HeartHandshake,
  MessageCircle,
  Sparkles,
  ArrowRight,
  Lock,
  Heart,
  Handshake,
  UserRoundCheck,
  Globe2,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Community Circles & Sisterhood Network",
  description:
    "Join the BDSisters community. A safe, moderated network for Bangladeshi Muslim women to exchange advice, build professional connections, and support one another.",
};

const communityPillars = [
  {
    icon: Users,
    title: "Sisterhood Circles",
    description:
      "Interest and regional cohorts where members share everyday challenges, celebrate milestones, and build authentic friendships.",
    color: "purple",
  },
  {
    icon: MessageCircle,
    title: "Collaborative Knowledge Exchange",
    description:
      "Dedicated spaces for discussing pricing strategies, marketing tactics, supplier recommendations, and freelance productivity.",
    color: "rose",
  },
  {
    icon: HeartHandshake,
    title: "Peer & Senior Mentorship",
    description:
      "Connect with experienced women leaders who offer practical guidance on growing businesses and advancing professional careers.",
    color: "emerald",
  },
  {
    icon: Sparkles,
    title: "Mutual Business Promotion",
    description:
      "Participate in community showcase opportunities where members recommend and support each other's products and services.",
    color: "amber",
  },
];

const codeOfConduct = [
  {
    icon: Heart,
    title: "Mutual Respect & Dignity",
    description:
      "We uphold Islamic and cultural principles of courteous speech (Adab), empathy, and kindness. Trolling, mocking, or disrespectful conduct is not acceptable.",
    color: "rose",
  },
  {
    icon: Lock,
    title: "Privacy & Member Confidentiality",
    description:
      "Discussions within private sisterhood circles should remain confidential. Personal contact details, screenshots, or family situations must not be shared without consent.",
    color: "purple",
  },
  {
    icon: Sparkles,
    title: "Halal & Ethical Standards",
    description:
      "Business offerings, recommendations, and collaborative initiatives promoted within the community should follow ethical, lawful, and transparent standards.",
    color: "amber",
  },
  {
    icon: ShieldCheck,
    title: "Zero Tolerance for Harassment",
    description:
      "Our moderation standards are designed to help maintain a harassment-free environment for women across different backgrounds and experience levels.",
    color: "emerald",
  },
];

const colorStyles = {
  purple: {
    icon: "bg-purple-100 text-purple-700 dark:bg-purple-400/15 dark:text-[#C4A7FF]",
  },
  rose: {
    icon: "bg-rose-100 text-rose-600 dark:bg-rose-400/15 dark:text-[#F0B7C6]",
  },
  emerald: {
    icon: "bg-emerald-100 text-emerald-700 dark:bg-emerald-400/15 dark:text-[#9ED9B5]",
  },
  amber: {
    icon: "bg-amber-100 text-amber-700 dark:bg-amber-400/15 dark:text-[#F2CC8F]",
  },
};

export default function CommunityPage() {
  return (
    <div className="flex flex-col overflow-hidden bg-white dark:bg-[#160D24]">
      <Section spacing="lg" className="relative isolate overflow-hidden bg-white dark:bg-[#160D24]">
        {/* Background Decorations */}
        <div className="pointer-events-none absolute -left-40 top-20 h-96 w-96 rounded-full bg-purple-200/30 blur-[110px] dark:bg-purple-500/10" />
        <div className="pointer-events-none absolute -right-40 top-[40%] h-96 w-96 rounded-full bg-rose-200/20 blur-[110px] dark:bg-rose-500/10" />

        <MainContainer size="lg">
          {/* Page Header */}
          <div data-aos="fade-up" className="relative">
            <PageHeader
              title="BDSisters Community"
              description="A supportive circle where Bangladeshi women connect, collaborate, and grow through shared experiences and mutual encouragement."
              breadcrumbs={
                <div className="flex items-center gap-2 text-sm">
                  <Link
                    href={ROUTES.public.home}
                    className="text-gray-500 transition-colors hover:text-purple-700 dark:text-[#A99DB4] dark:hover:text-[#C4A7FF]"
                  >
                    Home
                  </Link>
                  <span className="text-gray-300 dark:text-white/20">/</span>
                  <span className="font-medium text-purple-700 dark:text-[#C4A7FF]">Community</span>
                </div>
              }
              actions={
                <Link href={ROUTES.auth.signUp}>
                  <Button
                    variant="primary"
                    rightIcon={<ArrowRight className="h-4 w-4" />}
                    className="border-0 bg-purple-700 text-white hover:bg-purple-800 dark:bg-[#B794F6] dark:text-[#20132D] dark:hover:bg-[#C4A7FF]"
                  >
                    Join the Circle
                  </Button>
                </Link>
              }
            />
          </div>

          {/* Community Introduction */}
          <div
            data-aos="fade-up"
            className="relative mt-12 overflow-hidden rounded-3xl bg-[#F3EDFC] p-7 dark:bg-[#21152F] sm:p-10"
          >
            <div className="pointer-events-none absolute -right-16 -top-20 h-64 w-64 rounded-full bg-purple-300/30 blur-[80px] dark:bg-purple-500/15" />

            <div className="relative flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
              <div className="max-w-2xl">
                <Badge className="mb-4 border-0 bg-white/80 text-purple-800 dark:bg-white/10 dark:text-[#C4A7FF]">
                  <div className="flex">
                    <Heart className="mr-1.5 h-3.5 w-3.5" />
                    <span>The Power of Sisterhood</span>
                  </div>
                </Badge>

                <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-[#F9F5FF] sm:text-3xl">
                  Grow Together.{" "}
                  <span className="text-purple-700 dark:text-[#C4A7FF]">Achieve Together.</span>
                </h2>

                <p className="mt-3 max-w-xl text-sm leading-7 text-gray-600 dark:text-[#B8AFC3]">
                  A meaningful community is built through trust, shared knowledge, and genuine
                  support. BDSisters aims to create opportunities for women to learn from one
                  another and move forward together.
                </p>
              </div>

              <div className="flex shrink-0 items-center gap-3">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-purple-700 shadow-sm dark:bg-[#30213F] dark:text-[#C4A7FF]">
                  <Users className="h-7 w-7" />
                </div>
                <div>
                  <p className="text-sm font-bold text-gray-900 dark:text-[#F9F5FF]">
                    One Sisterhood
                  </p>
                  <p className="mt-1 text-xs text-gray-500 dark:text-[#A99DB4]">
                    Shared dreams, stronger futures
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Community Pillars */}
          <section className="relative mt-24 sm:mt-28">
            <div data-aos="fade-up" className="mx-auto mb-12 max-w-2xl text-center">
              <Badge className="mb-4 border-0 bg-purple-100 px-4 py-1.5 text-purple-800 dark:bg-purple-400/15 dark:text-[#C4A7FF]">
                <div className="flex">
                  <Globe2 className="mr-1.5 h-3.5 w-3.5" />
                  Our Community
                </div>
              </Badge>

              <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-[#F9F5FF] sm:text-4xl">
                What Makes Our{" "}
                <span className="text-purple-700 dark:text-[#C4A7FF]">Sisterhood Special?</span>
              </h2>

              <p className="mt-4 text-sm leading-7 text-gray-600 dark:text-[#B8AFC3] sm:text-base">
                More than conversations, we aim to create meaningful connections that encourage
                personal and professional growth.
              </p>
            </div>

            <ResponsiveGrid columns={4} gap="md">
              {communityPillars.map((pillar, index) => {
                const Icon = pillar.icon;
                const styles = colorStyles[pillar.color as keyof typeof colorStyles];

                return (
                  <Card
                    key={pillar.title}
                    data-aos="fade-up"
                    data-aos-delay={index * 100}
                    className="group h-full rounded-2xl border-0 bg-[#F8F5FC] shadow-sm transition-all duration-300 hover:-translate-y-1 hover:bg-[#F3EDFC] hover:shadow-lg hover:shadow-purple-900/5 dark:bg-[#21152F] dark:hover:bg-[#2B1D38]"
                  >
                    <CardHeader className="p-6">
                      <div
                        className={`mb-5 flex h-12 w-12 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-110 ${styles.icon}`}
                      >
                        <Icon className="h-6 w-6" />
                      </div>

                      <CardTitle className="text-base font-bold leading-snug text-gray-900 dark:text-[#F9F5FF]">
                        {pillar.title}
                      </CardTitle>

                      <CardDescription className="mt-2 text-sm leading-7 text-gray-600 dark:text-[#AFA4BC]">
                        {pillar.description}
                      </CardDescription>
                    </CardHeader>
                  </Card>
                );
              })}
            </ResponsiveGrid>
          </section>

          {/* Community Guidelines */}
          <section className="relative mt-24 sm:mt-32">
            <div className="mb-10 max-w-2xl" data-aos="fade-up">
              <Badge className="mb-4 border-0 bg-emerald-100 px-4 py-1.5 text-emerald-800 dark:bg-emerald-400/15 dark:text-[#9ED9B5]">
                <div className="flex">
                  <ShieldCheck className="mr-1.5 h-3.5 w-3.5" />
                  Safety & Integrity
                </div>
              </Badge>

              <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-[#F9F5FF] sm:text-4xl">
                Community Guidelines &{" "}
                <span className="text-purple-700 dark:text-[#C4A7FF]">Code of Conduct</span>
              </h2>

              <p className="mt-4 text-sm leading-7 text-gray-600 dark:text-[#B8AFC3] sm:text-base">
                A respectful community starts with shared responsibility. These principles help us
                maintain a dignified and welcoming environment for every sister.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              {codeOfConduct.map((item, index) => {
                const Icon = item.icon;
                const styles = colorStyles[item.color as keyof typeof colorStyles];

                return (
                  <div
                    key={item.title}
                    data-aos="fade-up"
                    data-aos-delay={index * 100}
                    className="group flex gap-5 rounded-2xl bg-[#F8F5FC] p-6 transition-all duration-300 hover:-translate-y-1 hover:bg-[#F3EDFC] hover:shadow-lg hover:shadow-purple-900/5 dark:bg-[#21152F] dark:hover:bg-[#2B1D38] sm:p-7"
                  >
                    <div
                      className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${styles.icon}`}
                    >
                      <Icon className="h-6 w-6" />
                    </div>

                    <div>
                      <h3 className="text-base font-bold text-gray-900 dark:text-[#F9F5FF]">
                        {item.title}
                      </h3>

                      <p className="mt-2 text-sm leading-7 text-gray-600 dark:text-[#AFA4BC]">
                        {item.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Privacy & Safety Highlight */}
          <section
            data-aos="fade-up"
            className="relative mt-16 overflow-hidden rounded-3xl bg-[#F3EDFC] p-7 dark:bg-[#21152F] sm:p-9"
          >
            <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-purple-300/30 blur-[80px] dark:bg-purple-500/15" />

            <div className="relative flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white text-purple-700 shadow-sm dark:bg-[#30213F] dark:text-[#C4A7FF]">
                  <Lock className="h-6 w-6" />
                </div>

                <div className="max-w-xl">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-[#F9F5FF]">
                    Your Privacy Matters
                  </h3>

                  <p className="mt-2 text-sm leading-7 text-gray-600 dark:text-[#B8AFC3]">
                    We value member confidentiality and encourage responsible sharing, respectful
                    communication, and constructive participation throughout the community.
                  </p>
                </div>
              </div>

              <div className="shrink-0">
                <Link href={ROUTES.public.contact}>
                  <Button
                    variant="secondary"
                    rightIcon={<ArrowRight className="h-4 w-4" />}
                    className="border-0 bg-white text-purple-800 hover:bg-purple-50 dark:bg-[#30213F] dark:text-[#C4A7FF] dark:hover:bg-[#3A294B]"
                  >
                    Contact Support
                  </Button>
                </Link>
              </div>
            </div>
          </section>

          {/* Bottom CTA */}
          <section
            data-aos="fade-up"
            className="relative mx-auto mt-24 max-w-4xl overflow-hidden rounded-[2rem] bg-[#F3EDFC] px-6 py-14 text-center dark:bg-[#21152F] sm:mt-28 sm:px-12 sm:py-16"
          >
            <div className="pointer-events-none absolute -right-16 -top-20 h-64 w-64 rounded-full bg-purple-300/30 blur-[80px] dark:bg-purple-500/15" />
            <div className="pointer-events-none absolute -bottom-24 -left-16 h-64 w-64 rounded-full bg-rose-300/20 blur-[80px] dark:bg-rose-500/10" />

            <div className="relative">
              <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-purple-700 shadow-sm dark:bg-[#30213F] dark:text-[#C4A7FF]">
                <Handshake className="h-7 w-7" />
              </div>

              <Badge className="mb-4 border-0 bg-white/80 text-purple-800 dark:bg-white/10 dark:text-[#C4A7FF]">
                Your Sisterhood Awaits
              </Badge>

              <h3 className="mx-auto max-w-2xl text-2xl font-bold tracking-tight text-gray-900 dark:text-[#F9F5FF] sm:text-3xl">
                Your Voice Belongs.{" "}
                <span className="text-purple-700 dark:text-[#C4A7FF]">Your Sisterhood Awaits.</span>
              </h3>

              <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-gray-600 dark:text-[#B8AFC3] sm:text-base">
                Connect with like-minded women, share your experiences, and become part of a
                community built on encouragement and shared ambition.
              </p>

              <div className="mt-8">
                <Link href={ROUTES.auth.signUp}>
                  <Button
                    variant="primary"
                    rightIcon={<ArrowRight className="h-4 w-4" />}
                    className="border-0 bg-purple-700 px-6 text-white shadow-lg shadow-purple-900/15 transition-all duration-300 hover:-translate-y-0.5 hover:bg-purple-800 dark:bg-[#B794F6] dark:text-[#20132D] dark:hover:bg-[#C4A7FF]"
                  >
                    Join BDSisters Today
                  </Button>
                </Link>
              </div>

              <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-xs font-medium text-gray-500 dark:text-[#A99DB4]">
                <span className="flex items-center gap-2">
                  <ShieldCheck className="h-4 w-4 text-emerald-600 dark:text-[#9ED9B5]" />
                  Respect & Dignity
                </span>

                <span className="flex items-center gap-2">
                  <Heart className="h-4 w-4 text-rose-500 dark:text-[#F0B7C6]" />
                  Mutual Support
                </span>

                <span className="flex items-center gap-2">
                  <UserRoundCheck className="h-4 w-4 text-purple-600 dark:text-[#C4A7FF]" />
                  Shared Growth
                </span>
              </div>
            </div>
          </section>
        </MainContainer>
      </Section>
    </div>
  );
}
