import type { Metadata } from "next";
import Link from "next/link";

import { MainContainer } from "@/components/layout/container";
import { PageHeader } from "@/components/layout/page-header";
import { Section } from "@/components/layout/section";
import { ResponsiveGrid } from "@/components/layout/grid";

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ROUTES } from "@/config/routes";

import {
  GraduationCap,
  BookOpen,
  Laptop,
  Briefcase,
  TrendingUp,
  Clock,
  Users,
  Sparkles,
  ArrowRight,
  ArrowUpRight,
  Lightbulb,
  Target,
  Heart,
  CheckCircle2,
  Presentation,
  Award,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Learning & Skills Development Hub",
  description:
    "Skill development, business workshops, and practical cohorts designed for Bangladeshi women freelancers, founders, and professionals.",
};

const learningTracks = [
  {
    icon: Laptop,
    title: "Digital Skills & Freelancing",
    description:
      "Practical guidance on UI design, web development, virtual assistance, and profile optimization for global marketplaces.",
    level: "All Levels",
    duration: "4–6 Weeks",
    category: "Technology",
    accent: "bg-purple-100 text-purple-700 dark:bg-purple-400/10 dark:text-purple-300",
  },
  {
    icon: Briefcase,
    title: "E-Commerce & Social Selling",
    description:
      "Learn product photography, social marketing, domestic courier logistics, and customer relationship management.",
    level: "Beginner / Intermediate",
    duration: "3 Weeks",
    category: "Entrepreneurship",
    accent: "bg-rose-100 text-rose-700 dark:bg-rose-400/10 dark:text-rose-300",
  },
  {
    icon: TrendingUp,
    title: "Financial Planning & Bookkeeping",
    description:
      "Understand cash flow management, business accounting, profit calculation, and responsible financial planning.",
    level: "Foundational",
    duration: "2 Weeks",
    category: "Finance",
    accent: "bg-emerald-100 text-emerald-700 dark:bg-emerald-400/10 dark:text-emerald-300",
  },
  {
    icon: Users,
    title: "Leadership & Public Speaking",
    description:
      "Build confidence in pitching your business, negotiating with clients, and leading community initiatives.",
    level: "Intermediate",
    duration: "4 Weeks",
    category: "Personal Growth",
    accent: "bg-amber-100 text-amber-700 dark:bg-amber-400/10 dark:text-amber-300",
  },
];

const learningPillars = [
  {
    icon: BookOpen,
    title: "Practical Learning",
    description:
      "Focus on real-world skills, hands-on activities, and project-based learning relevant to today's opportunities.",
    accent: "bg-purple-100 text-purple-700 dark:bg-purple-400/10 dark:text-purple-300",
  },
  {
    icon: Users,
    title: "Learn Together",
    description:
      "Connect with fellow learners through supportive study groups, peer discussions, and shared progress.",
    accent: "bg-rose-100 text-rose-700 dark:bg-rose-400/10 dark:text-rose-300",
  },
  {
    icon: Sparkles,
    title: "Mentorship & Guidance",
    description:
      "Learn from experienced professionals and entrepreneurs who can share practical insights and guidance.",
    accent: "bg-emerald-100 text-emerald-700 dark:bg-emerald-400/10 dark:text-emerald-300",
  },
];

const learningBenefits = [
  "Build practical, career-ready skills.",
  "Learn through guided exercises and projects.",
  "Connect with a supportive learning community.",
  "Explore opportunities for personal and professional growth.",
];

export default function LearningPage() {
  return (
    <div className="flex flex-col">
      <Section spacing="lg" className="relative overflow-hidden bg-white dark:bg-[#160D24]">
        <MainContainer size="lg">
          {/* Background Decoration */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -top-32 right-0 h-96 w-96 rounded-full bg-purple-200/30 blur-3xl dark:bg-purple-500/10"
          />

          <div
            aria-hidden="true"
            className="pointer-events-none absolute bottom-40 -left-32 h-80 w-80 rounded-full bg-rose-200/20 blur-3xl dark:bg-rose-500/5"
          />

          {/* Page Header */}
          <div className="relative z-10" data-aos="fade-up">
            <PageHeader
              title="Learning & Skills Development"
              description="Discover practical learning experiences, develop valuable skills, and connect with a community that supports your personal and professional growth."
              breadcrumbs={
                <div className="flex items-center gap-1.5 text-sm text-gray-500 dark:text-[#A99DB4]">
                  <Link
                    href={ROUTES.public.home}
                    className="transition-colors hover:text-purple-700 dark:hover:text-[#C4A7FF]"
                  >
                    Home
                  </Link>
                  <span>/</span>
                  <span className="font-medium text-purple-700 dark:text-[#C4A7FF]">Learning</span>
                </div>
              }
              actions={
                <Link href={ROUTES.auth.signUp}>
                  <Button
                    variant="primary"
                    className="shadow-lg shadow-purple-700/10 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                    rightIcon={<GraduationCap className="h-4 w-4" />}
                  >
                    Join Academy
                  </Button>
                </Link>
              }
            />
          </div>

          {/* Learning Philosophy */}
          <section
            className="relative z-10 mt-10 rounded-3xl bg-[#F8F5FC] p-6 sm:p-8 dark:bg-[#21152F]"
            data-aos="fade-up"
            data-aos-delay="100"
          >
            <div className="mb-8 max-w-xl">
              <Badge variant="primary" className="mb-3">
                The BDSisters Learning Approach
              </Badge>

              <h2 className="text-xl font-bold tracking-tight text-gray-900 dark:text-[#F9F5FF] sm:text-2xl">
                Learn With Purpose. Grow With Confidence.
              </h2>

              <p className="mt-2 text-sm leading-7 text-gray-600 dark:text-[#B8AFC3]">
                We believe learning should be practical, accessible, and connected to real
                opportunities.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-7 md:grid-cols-3">
              {learningPillars.map((pillar, index) => {
                const Icon = pillar.icon;

                return (
                  <div
                    key={pillar.title}
                    className="group flex items-start gap-4"
                    data-aos="fade-up"
                    data-aos-delay={index * 100}
                  >
                    <div
                      className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl ${pillar.accent} transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3`}
                    >
                      <Icon className="h-5 w-5" />
                    </div>

                    <div>
                      <h3 className="font-bold text-gray-900 dark:text-[#F9F5FF]">
                        {pillar.title}
                      </h3>

                      <p className="mt-1 text-sm leading-6 text-gray-600 dark:text-[#B8AFC3]">
                        {pillar.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Learning Tracks */}
          <section className="relative z-10 mt-20">
            <div
              className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-end"
              data-aos="fade-up"
            >
              <div>
                <Badge variant="secondary" className="mb-3">
                  Explore Your Potential
                </Badge>

                <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-[#F9F5FF] sm:text-3xl">
                  Explore Learning Tracks
                </h2>

                <p className="mt-2 max-w-xl text-sm leading-7 text-gray-600 dark:text-[#B8AFC3]">
                  Choose a learning direction that matches your interests, ambitions, and
                  professional goals.
                </p>
              </div>

              <div className="flex items-center gap-2 text-sm font-medium text-purple-700 dark:text-[#C4A7FF]">
                <BookOpen className="h-4 w-4" />
                Skill-focused pathways
              </div>
            </div>

            <ResponsiveGrid columns={2} gap="md">
              {learningTracks.map((track, index) => {
                const Icon = track.icon;

                return (
                  <Card
                    key={track.title}
                    data-aos="fade-up"
                    data-aos-delay={index * 100}
                    className="group flex h-full flex-col justify-between border-0 bg-[#F8F5FC] shadow-sm transition-all duration-300 hover:-translate-y-2 hover:bg-[#F3EDFC] hover:shadow-xl dark:bg-[#21152F] dark:hover:bg-[#2B1D38]"
                  >
                    <CardHeader className="p-6">
                      <div className="mb-5 flex items-center justify-between gap-3">
                        <div
                          className={`flex h-12 w-12 items-center justify-center rounded-2xl ${track.accent} transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3`}
                        >
                          <Icon className="h-5 w-5" />
                        </div>

                        <Badge variant="neutral" size="sm">
                          {track.category}
                        </Badge>
                      </div>

                      <CardTitle className="text-lg font-bold text-gray-900 transition-colors duration-300 group-hover:text-purple-700 dark:text-[#F9F5FF] dark:group-hover:text-[#C4A7FF]">
                        {track.title}
                      </CardTitle>

                      <CardDescription className="mt-2 text-sm leading-7 text-gray-600 dark:text-[#B8AFC3]">
                        {track.description}
                      </CardDescription>
                    </CardHeader>

                    <CardContent className="flex flex-wrap items-center justify-between gap-3 px-6 pb-6 pt-0">
                      <div className="flex flex-wrap items-center gap-3 text-xs text-gray-500 dark:text-[#A99DB4]">
                        <span className="flex items-center gap-1.5">
                          <Clock className="h-3.5 w-3.5 text-purple-700 dark:text-[#C4A7FF]" />
                          {track.duration}
                        </span>

                        <span className="flex items-center gap-1.5">
                          <GraduationCap className="h-3.5 w-3.5 text-purple-700 dark:text-[#C4A7FF]" />
                          {track.level}
                        </span>
                      </div>

                      <div className="flex items-center gap-1 text-sm font-semibold text-purple-700 transition-all duration-300 group-hover:translate-x-1 dark:text-[#C4A7FF]">
                        Explore
                        <ArrowUpRight className="h-4 w-4" />
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </ResponsiveGrid>
          </section>

          {/* Learning Benefits */}
          <section className="relative z-10 mt-20">
            <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2">
              <div data-aos="fade-right">
                <Badge variant="primary" className="mb-3">
                  Your Growth Journey
                </Badge>

                <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-[#F9F5FF] sm:text-3xl">
                  Skills That Move You Forward
                </h2>

                <p className="mt-4 text-sm leading-7 text-gray-600 dark:text-[#B8AFC3]">
                  Whether you are starting your career, building a business, or exploring a new
                  passion, continuous learning can open doors to new possibilities.
                </p>

                <div className="mt-7 space-y-4">
                  {learningBenefits.map((benefit) => (
                    <div
                      key={benefit}
                      className="flex items-start gap-3 text-sm text-gray-700 dark:text-[#B8AFC3]"
                    >
                      <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-purple-700 dark:text-[#C4A7FF]" />
                      <span>{benefit}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-8">
                  <Link href={ROUTES.auth.signUp}>
                    <Button variant="primary" rightIcon={<ArrowRight className="h-4 w-4" />}>
                      Start Learning
                    </Button>
                  </Link>
                </div>
              </div>

              {/* Visual Panel */}
              <div
                className="relative overflow-hidden rounded-3xl bg-[#F3EDFC] p-8 sm:p-10 dark:bg-[#21152F]"
                data-aos="fade-left"
              >
                <div
                  aria-hidden="true"
                  className="absolute -right-12 -top-12 h-48 w-48 rounded-full bg-purple-300/30 blur-3xl dark:bg-purple-500/10"
                />

                <div className="relative">
                  <div className="mb-8 flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-purple-700 shadow-sm dark:bg-[#342442] dark:text-[#C4A7FF]">
                    <Lightbulb className="h-7 w-7" />
                  </div>

                  <h3 className="text-xl font-bold text-gray-900 dark:text-[#F9F5FF] sm:text-2xl">
                    Your Next Chapter Starts With One Skill.
                  </h3>

                  <p className="mt-3 text-sm leading-7 text-gray-600 dark:text-[#B8AFC3]">
                    Small steps, consistent practice, and the right community can help turn your
                    ambitions into meaningful progress.
                  </p>

                  <div className="mt-8 grid grid-cols-2 gap-4">
                    <div className="rounded-2xl bg-white/80 p-4 dark:bg-[#2B1D38]">
                      <Target className="mb-3 h-5 w-5 text-purple-700 dark:text-[#C4A7FF]" />

                      <p className="text-sm font-bold text-gray-900 dark:text-[#F9F5FF]">
                        Set Goals
                      </p>

                      <p className="mt-1 text-xs leading-5 text-gray-500 dark:text-[#A99DB4]">
                        Define what you want to achieve.
                      </p>
                    </div>

                    <div className="rounded-2xl bg-white/80 p-4 dark:bg-[#2B1D38]">
                      <Award className="mb-3 h-5 w-5 text-rose-600 dark:text-rose-300" />

                      <p className="text-sm font-bold text-gray-900 dark:text-[#F9F5FF]">
                        Keep Growing
                      </p>

                      <p className="mt-1 text-xs leading-5 text-gray-500 dark:text-[#A99DB4]">
                        Turn knowledge into experience.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Mentorship CTA */}
          <section
            className="relative z-10 mx-auto mt-20 max-w-3xl overflow-hidden rounded-3xl bg-[#F8F5FC] p-7 text-center sm:p-10 dark:bg-[#21152F]"
            data-aos="fade-up"
          >
            <div
              aria-hidden="true"
              className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-purple-200/40 blur-3xl dark:bg-purple-500/10"
            />

            <div className="relative">
              <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-purple-100 text-purple-700 dark:bg-purple-400/10 dark:text-[#C4A7FF]">
                <Presentation className="h-6 w-6" />
              </div>

              <Badge variant="primary" className="mb-3">
                Mentorship Network
              </Badge>

              <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-[#F9F5FF]">
                Have Knowledge Worth Sharing?
              </h2>

              <p className="mx-auto mt-3 max-w-xl text-sm leading-7 text-gray-600 dark:text-[#B8AFC3]">
                If you have experience in entrepreneurship, technology, law, design, or other
                professional fields, connect with us to help inspire and guide the next generation
                of women.
              </p>

              <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <Link href={ROUTES.public.contact}>
                  <Button
                    variant="primary"
                    rightIcon={<ArrowRight className="h-4 w-4" />}
                    className="transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                  >
                    Apply as a Mentor
                  </Button>
                </Link>

                <div className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-[#A99DB4]">
                  <Heart className="h-3.5 w-3.5 text-rose-500" />
                  Share knowledge. Create impact.
                </div>
              </div>
            </div>
          </section>

          {/* Closing Message */}
          <div className="relative z-10 mt-16 text-center" data-aos="fade-up">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-purple-100 text-purple-700 dark:bg-purple-400/10 dark:text-[#C4A7FF]">
              <Sparkles className="h-5 w-5" />
            </div>

            <h2 className="text-xl font-bold text-gray-900 dark:text-[#F9F5FF] sm:text-2xl">
              Learn Something New. Become Something More.
            </h2>

            <p className="mx-auto mt-3 max-w-xl text-sm leading-7 text-gray-600 dark:text-[#B8AFC3]">
              Your journey does not need to be perfect. It just needs a beginning, a willingness to
              learn, and a community that grows alongside you.
            </p>
          </div>
        </MainContainer>
      </Section>
    </div>
  );
}
