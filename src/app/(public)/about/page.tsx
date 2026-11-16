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
  Heart,
  ShieldCheck,
  Sparkles,
  Users,
  Target,
  Compass,
  ArrowRight,
  Briefcase,
  GraduationCap,
  Handshake,
  Lightbulb,
} from "lucide-react";

export const metadata: Metadata = {
  title: "About Us — Mission, Vision & Sisterhood Values",
  description:
    "Learn about BDSisters.org, our mission to empower Bangladeshi Muslim women in entrepreneurship and education, our core values, and the platform ecosystem.",
};

const coreValues = [
  {
    icon: Heart,
    title: "Sisterhood & Empathy",
    description:
      "We believe in lifting as we climb. Every sister's voice is respected, and mutual encouragement is our foundational strength.",
    color: "rose",
  },
  {
    icon: ShieldCheck,
    title: "Trust & Dignified Space",
    description:
      "A safe, moderated environment with guidelines that encourage security, modesty, and respectful interactions.",
    color: "purple",
  },
  {
    icon: Sparkles,
    title: "Ethical & Halal Growth",
    description:
      "Promoting honest commerce, fair pricing, transparent partnerships, and business models grounded in integrity.",
    color: "amber",
  },
  {
    icon: Users,
    title: "Collaborative Empowerment",
    description:
      "Fostering joint ventures, cross-promotion, and shared knowledge rather than destructive competition.",
    color: "emerald",
  },
  {
    icon: Target,
    title: "Practical Excellence",
    description:
      "Focusing on high-value, market-tested competencies that support economic independence and career growth.",
    color: "blue",
  },
  {
    icon: Compass,
    title: "Inclusivity Across Bangladesh",
    description:
      "Connecting sisters from Dhaka to Sylhet, Chittagong to Rajshahi, as well as Bangladeshi diaspora worldwide.",
    color: "pink",
  },
];

const audiences = [
  {
    icon: Briefcase,
    title: "Entrepreneurs",
    description:
      "Founders building ventures in clothing, crafts, catering, technology services, and wellness.",
    color: "purple",
  },
  {
    icon: Lightbulb,
    title: "Freelancers & Creatives",
    description: "Graphic designers, content creators, software engineers, and remote marketers.",
    color: "rose",
  },
  {
    icon: GraduationCap,
    title: "Students & Learners",
    description:
      "University students and career changers building foundational skills and finding mentors.",
    color: "emerald",
  },
  {
    icon: Heart,
    title: "Community Members",
    description:
      "Sisters seeking positive discussions, life balance advice, and community initiatives.",
    color: "amber",
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
  blue: {
    icon: "bg-blue-100 text-blue-700 dark:bg-blue-400/15 dark:text-[#9CC9FF]",
  },
  pink: {
    icon: "bg-pink-100 text-pink-700 dark:bg-pink-400/15 dark:text-[#F0B7D4]",
  },
};

export default function AboutPage() {
  return (
    <div className="flex flex-col overflow-hidden bg-white dark:bg-[#160D24]">
      <Section spacing="lg" className="relative isolate overflow-hidden bg-white dark:bg-[#160D24]">
        {/* Background Decorations */}
        <div className="pointer-events-none absolute -left-40 top-20 h-96 w-96 rounded-full bg-purple-200/30 blur-[110px] dark:bg-purple-500/10" />
        <div className="pointer-events-none absolute -right-40 top-[35%] h-96 w-96 rounded-full bg-rose-200/20 blur-[110px] dark:bg-rose-500/10" />

        <MainContainer size="lg">
          {/* Page Header */}
          <div className="relative" data-aos="fade-up">
            <PageHeader
              title="About BDSisters.org"
              description="Our mission, founding vision, and commitment to Bangladeshi Muslim women in business, community, and leadership."
              breadcrumbs={
                <div className="flex items-center gap-2 text-sm">
                  <Link
                    href={ROUTES.public.home}
                    className="text-gray-500 transition-colors hover:text-purple-700 dark:text-[#A99DB4] dark:hover:text-[#C4A7FF]"
                  >
                    Home
                  </Link>
                  <span className="text-gray-300 dark:text-white/20">/</span>
                  <span className="font-medium text-purple-700 dark:text-[#C4A7FF]">About</span>
                </div>
              }
            />
          </div>

          {/* Mission & Vision */}
          <div className="relative mt-14 grid grid-cols-1 gap-6 md:grid-cols-2">
            {/* Mission */}
            <Card
              data-aos="fade-up"
              className="group overflow-hidden rounded-3xl border-0 bg-[#F8F5FC] shadow-sm transition-all duration-300 hover:-translate-y-1 hover:bg-[#F3EDFC] hover:shadow-xl hover:shadow-purple-900/5 dark:bg-[#21152F] dark:hover:bg-[#2B1D38]"
            >
              <CardHeader className="p-7 sm:p-9">
                <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-purple-100 text-purple-700 transition-transform duration-300 group-hover:scale-110 dark:bg-purple-400/15 dark:text-[#C4A7FF]">
                  <Target className="h-7 w-7" />
                </div>

                <Badge
                  variant="primary"
                  className="mb-3 w-fit border-0 bg-purple-100 text-purple-800 dark:bg-purple-400/15 dark:text-[#C4A7FF]"
                >
                  Our Mission
                </Badge>

                <CardTitle className="text-2xl font-bold leading-snug text-gray-900 dark:text-[#F9F5FF] sm:text-3xl">
                  Empowering Through Connection & Capability
                </CardTitle>

                <CardDescription className="mt-4 text-sm leading-7 text-gray-600 dark:text-[#B8AFC3]">
                  To provide Bangladeshi Muslim women with a trusted digital sanctuary that unites
                  community support, practical education, and economic empowerment. We enable women
                  to launch sustainable enterprises, advance their professional careers, and
                  collaborate with dignity.
                </CardDescription>
              </CardHeader>
            </Card>

            {/* Vision */}
            <Card
              data-aos="fade-up"
              data-aos-delay="120"
              className="group overflow-hidden rounded-3xl border-0 bg-[#FCF5F8] shadow-sm transition-all duration-300 hover:-translate-y-1 hover:bg-[#F9EAF0] hover:shadow-xl hover:shadow-rose-900/5 dark:bg-[#241725] dark:hover:bg-[#302033]"
            >
              <CardHeader className="p-7 sm:p-9">
                <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-rose-100 text-rose-600 transition-transform duration-300 group-hover:scale-110 dark:bg-rose-400/15 dark:text-[#F0B7C6]">
                  <Compass className="h-7 w-7" />
                </div>

                <Badge
                  variant="secondary"
                  className="mb-3 w-fit border-0 bg-rose-100 text-rose-700 dark:bg-rose-400/15 dark:text-[#F0B7C6]"
                >
                  Our Vision
                </Badge>

                <CardTitle className="text-2xl font-bold leading-snug text-gray-900 dark:text-[#F9F5FF] sm:text-3xl">
                  A Flourishing Ecosystem of Women Leaders
                </CardTitle>

                <CardDescription className="mt-4 text-sm leading-7 text-gray-600 dark:text-[#B8AFC3]">
                  A thriving digital and physical ecosystem where Bangladeshi women entrepreneurs
                  and professionals are recognized, supported, and connected globally. We envision
                  independent, resilient women-led businesses creating positive community impact.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>

          {/* Who We Serve */}
          <section className="relative mt-24 sm:mt-32">
            <div className="mx-auto mb-12 max-w-2xl text-center" data-aos="fade-up">
              <Badge className=" mb-4 border-0 bg-purple-100 px-6 py-1.5 text-purple-800 dark:bg-purple-400/15 dark:text-[#C4A7FF]">
                <div className="flex">
                  <Users className="mr-1.5 h-3.5 w-3.5" />
                  <span>Who We Serve</span>
                </div>
              </Badge>

              <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-[#F9F5FF] sm:text-4xl">
                A Diverse Circle of{" "}
                <span className="text-purple-700 dark:text-[#C4A7FF]">Bangladeshi Women</span>
              </h2>

              <p className="mt-4 text-sm leading-7 text-gray-600 dark:text-[#B8AFC3] sm:text-base">
                BDSisters brings together sisters across varied stages of life, profession, and
                business.
              </p>
            </div>

            <ResponsiveGrid columns={4} gap="md">
              {audiences.map((item, index) => {
                const Icon = item.icon;
                const styles = colorStyles[item.color as keyof typeof colorStyles];

                return (
                  <Card
                    key={item.title}
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

                      <CardTitle className="text-base font-bold text-gray-900 dark:text-[#F9F5FF]">
                        {item.title}
                      </CardTitle>

                      <CardDescription className="mt-2 text-sm leading-6 text-gray-600 dark:text-[#AFA4BC]">
                        {item.description}
                      </CardDescription>
                    </CardHeader>
                  </Card>
                );
              })}
            </ResponsiveGrid>
          </section>

          {/* Core Values */}
          <section className="relative mt-24 sm:mt-32">
            <div className="mx-auto mb-12 max-w-2xl text-center" data-aos="fade-up">
              <Badge className="mb-4 border-0 bg-emerald-100 px-4 py-1.5 text-emerald-800 dark:bg-emerald-400/15 dark:text-[#9ED9B5]">
                <div className="flex">
                  <Sparkles className="mr-1.5 h-3.5 w-3.5" />
                  Guiding Principles
                </div>
              </Badge>

              <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-[#F9F5FF] sm:text-4xl">
                Our Core <span className="text-purple-700 dark:text-[#C4A7FF]">Values</span>
              </h2>

              <p className="mt-4 text-sm leading-7 text-gray-600 dark:text-[#B8AFC3] sm:text-base">
                Every feature, guideline, and interaction on BDSisters is guided by our values.
              </p>
            </div>

            <ResponsiveGrid columns={3} gap="md">
              {coreValues.map((value, index) => {
                const Icon = value.icon;
                const styles = colorStyles[value.color as keyof typeof colorStyles];

                return (
                  <Card
                    key={value.title}
                    data-aos="fade-up"
                    data-aos-delay={index * 80}
                    className="group h-full rounded-2xl border-0 bg-[#F8F5FC] shadow-sm transition-all duration-300 hover:-translate-y-1 hover:bg-[#F3EDFC] hover:shadow-lg hover:shadow-purple-900/5 dark:bg-[#21152F] dark:hover:bg-[#2B1D38]"
                  >
                    <CardHeader className="p-6 sm:p-7">
                      <div
                        className={`mb-5 flex h-12 w-12 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-110 ${styles.icon}`}
                      >
                        <Icon className="h-6 w-6" />
                      </div>

                      <CardTitle className="text-base font-bold text-gray-900 dark:text-[#F9F5FF]">
                        {value.title}
                      </CardTitle>

                      <CardDescription className="mt-2 text-sm leading-7 text-gray-600 dark:text-[#AFA4BC]">
                        {value.description}
                      </CardDescription>
                    </CardHeader>
                  </Card>
                );
              })}
            </ResponsiveGrid>
          </section>

          {/* Bottom CTA */}
          <section
            data-aos="fade-up"
            className="relative mx-auto mt-24 max-w-4xl overflow-hidden rounded-[2rem] bg-[#F3EDFC] px-6 py-14 text-center dark:bg-[#21152F] sm:mt-32 sm:px-12 sm:py-16"
          >
            {/* CTA Decoration */}
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
                Ready to Be Part of the{" "}
                <span className="text-purple-700 dark:text-[#C4A7FF]">Sisterhood?</span>
              </h3>

              <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-gray-600 dark:text-[#B8AFC3] sm:text-base">
                Join a community of Bangladeshi women connecting, learning, growing, and building
                opportunities together.
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
            </div>
          </section>
        </MainContainer>
      </Section>
    </div>
  );
}
