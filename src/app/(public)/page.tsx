import type { Metadata } from "next";
import Link from "next/link";
import { MainContainer } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { ResponsiveGrid } from "@/components/layout/grid";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Accordion } from "@/components/ui/accordion";
import { ROUTES } from "@/config/routes";
import { siteConfig } from "@/config/site";
import {
  Users,
  Briefcase,
  ShoppingBag,
  GraduationCap,
  Calendar,
  TrendingUp,
  HeartHandshake,
  Bot,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  MapPin,
  Compass,
  Star,
  MessageCircle,
  Heart,
  Sprout,
  Store,
  Info,
  CalendarDays,
  Video,
  Clock,
  Quote,
  Lightbulb,
  MessageCircleQuestion,
} from "lucide-react";

import womenImage from "../../../public/images.jpg";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Empowering Bangladeshi Muslim Women in Business & Community",
  description:
    "A digital ecosystem connecting Bangladeshi women entrepreneurs, professionals, learners, and community leaders. Discover opportunities, learn skills, and build businesses.",
  openGraph: {
    title: "BDSisters.org — Empowering Bangladeshi Muslim Women",
    description:
      "A digital home for Bangladeshi women to connect, learn, grow their businesses, and build meaningful opportunities together.",
    url: siteConfig.url,
    siteName: siteConfig.name,
    locale: "en_US",
    type: "website",
  },
};

export default function HomePage() {
  const platformFeatures = [
    {
      icon: Users,
      title: "Women's Community",
      description:
        "A supportive, moderated circle where women share experiences, exchange insights, and build lifelong bonds of sisterhood.",
      link: ROUTES.public.community,
      badge: "Sisterhood",
    },
    {
      icon: Briefcase,
      title: "Business Networking",
      description:
        "Directory of women-led enterprises across Bangladesh to expand market reach, find suppliers, and partner on projects.",
      link: ROUTES.public.businesses,
      badge: "Enterprise",
    },
    {
      icon: ShoppingBag,
      title: "Online Marketplace",
      description:
        "Dedicated platform concept for women artisans, home chefs, designers, and consultants to showcase products and services.",
      link: ROUTES.public.marketplace,
      badge: "Commerce",
    },
    {
      icon: GraduationCap,
      title: "Learning & Skill Development",
      description:
        "Curated workshops, masterclasses, and skill-building cohorts designed for freelancing, technology, and entrepreneurship.",
      link: ROUTES.public.learning,
      badge: "Academy",
    },
    {
      icon: Calendar,
      title: "Events & Workshops",
      description:
        "Webinars, in-person networking sessions, and career discussions hosted across Dhaka, Chittagong, Sylhet, and online.",
      link: ROUTES.public.events,
      badge: "Gatherings",
    },
    {
      icon: TrendingUp,
      title: "Career & Professional Growth",
      description:
        "Guidance for freelancers, corporate professionals, and graduates entering competitive modern markets.",
      link: ROUTES.public.learning,
      badge: "Careers",
    },
    {
      icon: HeartHandshake,
      title: "Mentorship & Collaboration",
      description:
        "Pairing experienced business owners and senior professionals with ambitious newcomers seeking constructive guidance.",
      link: ROUTES.public.community,
      badge: "Mentorship",
    },
    {
      icon: Bot,
      title: "AI-Powered Assistance",
      description:
        "Intelligent recommendations, business plan organizers, and community matching to accelerate your personal goals.",
      link: ROUTES.public.about,
      badge: "Smart Tech",
    },
  ];

  const howItWorksSteps = [
    {
      step: "01",
      title: "Join the Community",
      description:
        "Create your free member profile and introduce your background, aspirations, or current business craft.",
    },
    {
      step: "02",
      title: "Build Your Presence",
      description:
        "List your venture in our business directory or document your skills to discover relevant cohorts and mentors.",
    },
    {
      step: "03",
      title: "Connect & Discover",
      description:
        "Participate in topic-based circles, ask questions in a safe space, and collaborate on shared initiatives.",
    },
    {
      step: "04",
      title: "Learn, Grow & Flourish",
      description:
        "Attend practical workshops, market your products ethically, and elevate your personal and financial independence.",
    },
  ];

  const sampleBusinesses = [
    {
      name: "Nakshi Craft Atelier",
      category: "Handicrafts & Heritage Art",
      district: "Dhaka",
      description:
        "Handcrafted traditional Nakshi Kantha, home decor, and hand-embroidered textiles made by local women artisans.",
      tag: "Heritage Craft",
    },
    {
      name: "Saffron & Spice Kitchen",
      category: "Culinary & Catering",
      district: "Chittagong",
      description:
        "Authentic, hygienic home-catering and organic pantry essentials prepared with traditional Bengali care.",
      tag: "Home Culinary",
    },
    {
      name: "Modest Elegance Apparel",
      category: "Fashion & Lifestyle",
      district: "Sylhet",
      description:
        "Contemporary modest wear, custom abayas, and sustainable everyday hijabs designed for modern professionals.",
      tag: "Modest Fashion",
    },
  ];

  const faqItems = [
    {
      id: "faq-1",
      title: "What is BDSisters.org?",
      content:
        "BDSisters.org is an AI-powered digital community and business enablement platform specifically created for Bangladeshi Muslim women. It unites entrepreneurs, freelancers, learners, and professionals into one collaborative ecosystem.",
      defaultOpen: true,
    },
    {
      id: "faq-2",
      title: "Who can join the BDSisters community?",
      content:
        "Any Bangladeshi woman—whether aspiring entrepreneur, student, freelancer, professional, home-maker, or seasoned business owner—is welcome to join. Our platform emphasizes mutual dignity, sisterhood, and ethical growth.",
    },
    {
      id: "faq-3",
      title: "Is membership free?",
      content:
        "Yes, basic community membership, directory browsing, and public participation are free. Premium learning circles, verified vendor tools, and specialized masterclasses may have nominal fees in the future to sustain mentors and instructors.",
    },
    {
      id: "faq-4",
      title: "How can women promote their businesses on the platform?",
      content:
        "Registered members can submit their business for inclusion in the curated Women-Led Business Directory, showcase products in our upcoming ethical marketplace, and network directly with buyers and business partners.",
    },
    {
      id: "faq-5",
      title: "What learning opportunities and resources are available?",
      content:
        "We focus on practical, high-impact skills: freelancing essentials, digital marketing, business bookkeeping, e-commerce operations, and professional leadership tailored to the Bangladeshi market context.",
    },
    {
      id: "faq-6",
      title: "How can someone participate in workshops and webinars?",
      content:
        "Upcoming events and sessions are listed on our Events page. Members can RSVP, receive calendar reminders, and join interactive live virtual sessions or local regional meetups.",
    },
  ];

  return (
    <div className="flex flex-col">
      {/* --------------------------------------------------------------------- */}
      {/* SECTION 3: Hero Section */}
      {/* --------------------------------------------------------------------- */}
      <section className="relative isolate overflow-hidden bg-[#160D24] py-20 sm:py-24 lg:py-28">
        {/* Background Decoration */}
        <div className="pointer-events-none absolute -left-40 top-0 -z-10 h-[450px] w-[450px] rounded-full bg-[#783E91]/15 blur-[130px]" />
        <div className="pointer-events-none absolute -bottom-40 right-0 -z-10 h-[400px] w-[400px] rounded-full bg-[#A45D79]/10 blur-[120px]" />

        <MainContainer size="lg">
          <div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-12 lg:gap-10">
            {/* LEFT CONTENT */}
            <div
              className="text-center lg:col-span-7 lg:text-left"
              data-aos="fade-up"
              data-aos-duration="900"
            >
              {/* Eyebrow */}
              <div className="mb-7 inline-flex items-center gap-2.5 rounded-full bg-[#A78BFA]/10 px-4 py-2">
                <span className="h-2 w-2 rounded-full bg-[#C4A7FF] shadow-[0_0_12px_rgba(196,167,255,0.8)]" />
                <span className="text-xs font-semibold tracking-[0.12em] text-[#D4BDFB] uppercase">
                  Empowering Bangladeshi Muslim Women
                </span>
              </div>

              {/* Heading */}
              <h1 className="text-4xl font-extrabold leading-[1.15] tracking-tight text-[#F9F5FF] sm:text-5xl lg:text-[4.25rem]">
                A Place to Grow.
                <br />
                A Community to
                <br className="hidden sm:block" />
                <span className="text-[#C4A7FF]">Belong.</span>
              </h1>

              {/* Description */}
              <p className="mx-auto mt-7 max-w-xl text-base leading-8 text-[#B8AFC3] sm:text-lg lg:mx-0">
                Bringing Bangladeshi women together to share knowledge, discover opportunities, grow
                meaningful businesses, and build a future where every woman has the support to
                thrive.
              </p>

              {/* CTA */}
              <div className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row lg:justify-start">
                <Link href={ROUTES.auth.signUp} className="w-full sm:w-auto">
                  <Button
                    variant="primary"
                    size="lg"
                    fullWidth
                    rightIcon={<ArrowRight className="h-4 w-4" />}
                    className="rounded-xl bg-[#B794F6] px-8 py-3.5 font-semibold text-[#20132D] shadow-[0_8px_30px_rgba(183,148,246,0.18)] transition-all duration-300 hover:-translate-y-1 hover:bg-[#CBB2FF]"
                  >
                    Join Our Community
                  </Button>
                </Link>

                <Link href={ROUTES.public.businesses} className="w-full sm:w-auto">
                  <Button
                    variant="outline"
                    size="lg"
                    fullWidth
                    className="rounded-xl bg-white/5 px-8 py-3.5 font-semibold text-white shadow-none transition-all duration-300 hover:-translate-y-1 hover:bg-white/10 hover:text-white"
                  >
                    Explore Opportunities
                  </Button>
                </Link>
              </div>

              {/* Trust Indicators */}
              <div className="mt-12 flex flex-wrap items-center justify-center gap-x-7 gap-y-4 text-xs font-medium text-[#A99DB4] lg:justify-start">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="h-4 w-4 text-[#C4A7FF]" />
                  <span>Safe & Moderated Community</span>
                </div>

                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-[#9ED9B5]" />
                  <span>Ethical Business Network</span>
                </div>

                <div className="flex items-center gap-2">
                  <Compass className="h-4 w-4 text-[#E2AFC5]" />
                  <span>Nationwide Connections</span>
                </div>
              </div>
            </div>

            {/* RIGHT IMAGE */}
            <div
              className="relative lg:col-span-5"
              data-aos="fade-left"
              data-aos-duration="1000"
              data-aos-delay="200"
            >
              <div className="relative mx-auto max-w-[460px] lg:max-w-none">
                {/* Image Glow */}
                <div className="absolute -inset-5 -z-10 rounded-[40px] bg-gradient-to-br from-[#9563C4]/20 via-transparent to-[#D68BA7]/20 blur-2xl" />

                {/* Main Image */}
                <div className="group relative overflow-hidden rounded-[30px] bg-[#281B34] shadow-[0_30px_90px_rgba(0,0,0,0.35)]">
                  <Image
                    src={womenImage}
                    alt="Bangladeshi women connecting, collaborating and growing together"
                    className="aspect-[4/4.5] w-full object-cover transition-transform duration-1000 group-hover:scale-[1.04] lg:aspect-[4/5]"
                    priority
                  />

                  {/* Image Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#160D24]/80 via-transparent to-transparent" />

                  {/* Image Caption */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
                    <p className="text-xs font-semibold tracking-[0.18em] text-[#D4BDFB] uppercase">
                      Together, We Rise
                    </p>

                    <h3 className="mt-2 max-w-xs text-2xl font-bold leading-tight text-white sm:text-3xl">
                      Stronger voices.
                      <br />
                      Brighter futures.
                    </h3>
                  </div>
                </div>

                {/* Floating District Card */}
                <div
                  className="absolute -bottom-7 -left-3 flex items-center gap-4 rounded-2xl bg-[#2B1D38] p-4 shadow-[0_15px_50px_rgba(0,0,0,0.3)] sm:-left-8 sm:p-5"
                  data-aos="fade-up"
                  data-aos-delay="600"
                >
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#A78BFA]/15 text-base font-extrabold text-[#D4BDFB]">
                    64+
                  </div>

                  <div>
                    <p className="text-sm font-bold text-white">Districts, One Community</p>
                    <p className="mt-1 text-xs text-[#A99DB4]">
                      Connecting women across Bangladesh
                    </p>
                  </div>
                </div>

                {/* Decorative Floating Element */}
                <div
                  className="absolute -right-3 top-10 hidden rounded-2xl bg-[#352442] p-4 shadow-xl sm:block lg:-right-6"
                  data-aos="fade-down"
                  data-aos-delay="700"
                >
                  <Heart className="h-6 w-6 fill-[#D9A6B5] text-[#D9A6B5]" />
                </div>
              </div>
            </div>
          </div>
        </MainContainer>
      </section>
      {/* --------------------------------------------------------------------- */}
      {/* SECTION 4: Introduction / About BDSisters */}
      {/* --------------------------------------------------------------------- */}
      <Section
        spacing="lg"
        surface="muted"
        className="relative isolate overflow-hidden bg-white py-20 dark:bg-[#1C1228] sm:py-28"
      >
        {/* Background Decoration */}
        <div className="pointer-events-none absolute -left-40 top-0 -z-10 h-80 w-80 rounded-full bg-purple-300/20 blur-[120px] dark:bg-[#8B5CF6]/10" />
        <div className="pointer-events-none absolute -bottom-40 right-0 -z-10 h-96 w-96 rounded-full bg-rose-200/30 blur-[130px] dark:bg-[#D9A6B5]/10" />

        <MainContainer size="lg">
          <div className="mx-auto max-w-4xl text-center">
            {/* Eyebrow */}
            <div
              data-aos="fade-up"
              className="mb-7 inline-flex items-center gap-2.5 rounded-full bg-purple-100 px-4 py-2 dark:bg-[#A78BFA]/10"
            >
              <Heart className="h-3.5 w-3.5 text-rose-500 dark:text-[#D9A6B5]" />

              <span className="text-xs font-semibold tracking-[0.16em] text-purple-800 uppercase dark:text-[#C4A7FF]">
                Who We Are
              </span>
            </div>

            {/* Heading */}
            <h2
              data-aos="fade-up"
              data-aos-delay="100"
              className="text-3xl font-bold leading-[1.2] tracking-tight text-gray-900 sm:text-4xl lg:text-5xl dark:text-[#F9F5FF]"
            >
              More Than a Platform.
              <br className="hidden sm:block" />
              <span className="text-purple-700 dark:text-[#C4A7FF]">
                A Sisterhood With Purpose.
              </span>
            </h2>

            {/* Description */}
            <p
              data-aos="fade-up"
              data-aos-delay="200"
              className="mx-auto mt-7 max-w-3xl text-base leading-8 text-gray-600 sm:text-lg dark:text-[#B8AFC3]"
            >
              BDSisters.org was created to bring Bangladeshi women closer to the opportunities,
              knowledge, and connections they deserve. We are building a trusted space where women
              can grow their businesses, exchange experiences, learn from one another, and find
              meaningful support — all while staying true to their cultural and ethical values.
            </p>

            {/* Brand Values */}
            <div
              data-aos="fade-up"
              data-aos-delay="300"
              className="mt-12 grid grid-cols-1 gap-10 sm:grid-cols-3 sm:gap-6"
            >
              {/* Trust */}
              <div className="flex flex-col items-center">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-purple-100 dark:bg-[#A78BFA]/10">
                  <ShieldCheck className="h-5 w-5 text-purple-700 dark:text-[#C4A7FF]" />
                </div>

                <h3 className="text-sm font-bold text-gray-900 dark:text-white">Built on Trust</h3>

                <p className="mt-2 max-w-[220px] text-sm leading-6 text-gray-500 dark:text-[#9F94AC]">
                  A respectful environment where trust and dignity come first.
                </p>
              </div>

              {/* Growth */}
              <div className="flex flex-col items-center">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-rose-100 dark:bg-[#D9A6B5]/10">
                  <Users className="h-5 w-5 text-rose-600 dark:text-[#D9A6B5]" />
                </div>

                <h3 className="text-sm font-bold text-gray-900 dark:text-white">
                  Growing Together
                </h3>

                <p className="mt-2 max-w-[220px] text-sm leading-6 text-gray-500 dark:text-[#9F94AC]">
                  Connecting women through knowledge, collaboration, and mentorship.
                </p>
              </div>

              {/* Impact */}
              <div className="flex flex-col items-center">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-100 dark:bg-[#9ED9B5]/10">
                  <Sprout className="h-5 w-5 text-emerald-700 dark:text-[#9ED9B5]" />
                </div>

                <h3 className="text-sm font-bold text-gray-900 dark:text-white">Creating Impact</h3>

                <p className="mt-2 max-w-[220px] text-sm leading-6 text-gray-500 dark:text-[#9F94AC]">
                  Making meaningful opportunities accessible to women nationwide.
                </p>
              </div>
            </div>

            {/* CTA */}
            <div data-aos="fade-up" data-aos-delay="400" className="mt-12">
              <Link href={ROUTES.public.about}>
                <Button
                  variant="primary"
                  rightIcon={<ArrowRight className="h-4 w-4" />}
                  className="rounded-xl bg-purple-700 px-7 py-3 font-semibold text-white shadow-lg shadow-purple-500/15 transition-all duration-300 hover:-translate-y-1 hover:bg-purple-800 dark:bg-[#B794F6] dark:text-[#20132D] dark:hover:bg-[#CBB2FF]"
                >
                  Discover Our Story
                </Button>
              </Link>
            </div>
          </div>
        </MainContainer>
      </Section>
      {/* --------------------------------------------------------------------- */}
      {/* SECTION 5: Platform Features */}
      {/* --------------------------------------------------------------------- */}
      ```tsx
      <Section
        spacing="lg"
        surface="default"
        className="relative isolate overflow-hidden bg-white py-20 sm:py-24 dark:bg-[#160D24]"
      >
        {/* Background Decoration */}
        <div className="pointer-events-none absolute -right-40 top-0 -z-10 h-80 w-80 rounded-full bg-purple-200/30 blur-[120px] dark:bg-[#8B5CF6]/10" />
        <div className="pointer-events-none absolute -bottom-40 -left-40 -z-10 h-80 w-80 rounded-full bg-rose-100/40 blur-[120px] dark:bg-[#D9A6B5]/10" />

        <MainContainer size="lg">
          {/* Section Heading */}
          <div className="mx-auto mb-14 max-w-2xl text-center" data-aos="fade-up">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-purple-100 px-4 py-2 dark:bg-[#A78BFA]/10">
              <Sparkles className="h-3.5 w-3.5 text-purple-700 dark:text-[#C4A7FF]" />
              <span className="text-xs font-semibold tracking-[0.15em] text-purple-800 uppercase dark:text-[#C4A7FF]">
                Comprehensive Capabilities
              </span>
            </div>

            <h2 className="text-3xl font-bold leading-tight tracking-tight text-gray-900 sm:text-4xl lg:text-[2.7rem] dark:text-[#F9F5FF]">
              Everything You Need to
              <span className="text-purple-700 dark:text-[#C4A7FF]"> Connect, Learn & Grow</span>
            </h2>

            <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-gray-600 sm:text-base dark:text-[#B8AFC3]">
              A connected ecosystem designed to bring women closer to meaningful relationships,
              business opportunities, knowledge, and personal growth.
            </p>
          </div>

          {/* Feature Grid */}
          <ResponsiveGrid columns={4} gap="md">
            {platformFeatures.map((feat, index) => {
              const IconComp = feat.icon;

              return (
                <Card
                  key={feat.title}
                  hoverEffect
                  data-aos="fade-up"
                  data-aos-delay={index * 100}
                  className="group flex h-full flex-col justify-between overflow-hidden rounded-2xl border-0 bg-[#F8F5FC] shadow-sm transition-all duration-300 hover:-translate-y-1 hover:bg-[#F3EDFC] hover:shadow-xl hover:shadow-purple-900/5 dark:bg-[#21152F] dark:shadow-black/10 dark:hover:bg-[#2B1D38] dark:hover:shadow-black/20"
                >
                  <CardHeader>
                    {/* Icon & Badge */}
                    <div className="mb-6 flex items-center justify-between gap-2">
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-purple-100 transition-all duration-300 group-hover:bg-purple-200 dark:bg-[#A78BFA]/15 dark:group-hover:bg-[#A78BFA]/25">
                        <IconComp className="h-5 w-5 text-purple-700 transition-transform duration-300 group-hover:scale-110 dark:text-[#C4A7FF]" />
                      </div>

                      <Badge
                        variant="neutral"
                        size="sm"
                        className="bg-white text-gray-600 dark:bg-[#352442] dark:text-[#C4A7FF]"
                      >
                        {feat.badge}
                      </Badge>
                    </div>

                    {/* Feature Title */}
                    <CardTitle className="text-base font-bold text-gray-900 transition-colors group-hover:text-purple-800 dark:text-[#F9F5FF] dark:group-hover:text-[#C4A7FF]">
                      {feat.title}
                    </CardTitle>

                    {/* Description */}
                    <CardDescription className="mt-2 text-xs leading-6 text-gray-600 sm:text-sm dark:text-[#A99DB4]">
                      {feat.description}
                    </CardDescription>
                  </CardHeader>

                  {/* Learn More */}
                  <CardContent className="pt-3">
                    <Link
                      href={feat.link}
                      className="inline-flex items-center gap-2 text-xs font-semibold text-purple-700 transition-all duration-300 group-hover:gap-3 dark:text-[#C4A7FF]"
                    >
                      <span>Explore Feature</span>
                      <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                  </CardContent>
                </Card>
              );
            })}
          </ResponsiveGrid>
        </MainContainer>
      </Section>
      {/* --------------------------------------------------------------------- */}
      {/* SECTION 6: Community Introduction */}
      {/* --------------------------------------------------------------------- */}
      <Section
        spacing="lg"
        surface="brand"
        className="relative overflow-hidden bg-[#160D24] py-20 sm:py-24"
      >
        <MainContainer size="lg">
          <div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-20">
            {/* Left Content */}
            <div data-aos="fade-right" data-aos-duration="900">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-[#8B5CF6]/10 px-4 py-2">
                <span className="h-2 w-2 rounded-full bg-[#B794F6]" />
                <span className="text-xs font-semibold tracking-[0.15em] text-[#C4A7FF] uppercase">
                  Sisterhood Circle
                </span>
              </div>

              <h2 className="max-w-xl text-3xl font-bold leading-[1.2] tracking-tight text-white sm:text-4xl lg:text-5xl">
                Grow Together.
                <br />
                <span className="text-[#B794F6]">Succeed Together.</span>
              </h2>

              <p className="mt-6 max-w-lg text-base leading-8 text-[#B8AFC3] sm:text-lg">
                Success feels different when you have the right people beside you. Connect with
                ambitious women, share experiences, discover opportunities, and build meaningful
                relationships in a community that genuinely supports your journey.
              </p>

              {/* Features */}
              <div className="mt-9 space-y-5">
                {[
                  {
                    title: "Real experiences, real connections",
                    description: "Learn from women who have walked similar paths.",
                  },
                  {
                    title: "Opportunities that move you forward",
                    description: "Find collaborators, business partners, and mentors.",
                  },
                  {
                    title: "A space where respect comes first",
                    description: "Build relationships in a supportive and respectful environment.",
                  },
                ].map((item, index) => (
                  <div
                    key={item.title}
                    className="flex items-start gap-4"
                    data-aos="fade-up"
                    data-aos-delay={index * 120}
                  >
                    <div className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#8B5CF6]/15">
                      <CheckCircle2 className="h-4 w-4 text-[#C4A7FF]" />
                    </div>

                    <div>
                      <h3 className="text-sm font-semibold text-white sm:text-base">
                        {item.title}
                      </h3>
                      <p className="mt-1 text-sm leading-6 text-[#9F94AC]">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* CTA */}
              <div className="mt-10" data-aos="fade-up" data-aos-delay="400">
                <Link href={ROUTES.public.community}>
                  <Button
                    variant="primary"
                    rightIcon={<ArrowRight className="h-4 w-4" />}
                    className="rounded-xl bg-[#A78BFA] px-7 py-3 font-semibold text-[#1B1028] transition-all duration-300 hover:bg-[#C4B5FD] hover:shadow-[0_8px_30px_rgba(167,139,250,0.2)]"
                  >
                    Explore Community
                  </Button>
                </Link>
              </div>
            </div>

            {/* Right Content */}
            <div
              className="relative"
              data-aos="fade-left"
              data-aos-duration="1000"
              data-aos-delay="150"
            >
              {/* Decorative background */}
              <div className="absolute -right-10 -top-10 h-56 w-56 rounded-full bg-[#7C3AED]/15 blur-[100px]" />

              <div className="relative rounded-[28px] bg-[#21152F] p-5 shadow-[0_25px_80px_rgba(0,0,0,0.25)] sm:p-7">
                <div className="mb-7 flex items-center justify-between">
                  <div>
                    <p className="text-xs font-medium tracking-wider text-[#A78BFA] uppercase">
                      Community Conversations
                    </p>
                    <h3 className="mt-2 text-xl font-bold text-white">Ideas worth sharing.</h3>
                  </div>

                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#8B5CF6]/15">
                    <MessageCircle className="h-5 w-5 text-[#C4A7FF]" />
                  </div>
                </div>

                <div className="space-y-3">
                  {/* Discussion 1 */}
                  <div className="group rounded-2xl bg-[#2B1E3A] p-5 transition-all duration-300 hover:bg-[#352446]">
                    <div className="flex items-center justify-between gap-3">
                      <span className="text-xs font-semibold text-[#C4A7FF]">
                        Freelancing & Tech
                      </span>
                      <span className="text-[11px] text-[#8F829D]">Career</span>
                    </div>

                    <h4 className="mt-3 text-sm font-semibold leading-6 text-white sm:text-base">
                      How do you manage international clients while maintaining a healthy work-life
                      balance?
                    </h4>

                    <div className="mt-4 flex items-center gap-2 text-xs text-[#A99BB5]">
                      <Users className="h-3.5 w-3.5" />
                      <span>Experiences & advice</span>
                      <span className="ml-auto text-[#C4A7FF] transition-transform group-hover:translate-x-1">
                        →
                      </span>
                    </div>
                  </div>

                  {/* Discussion 2 */}
                  <div className="group rounded-2xl bg-[#2B1E3A] p-5 transition-all duration-300 hover:bg-[#352446]">
                    <div className="flex items-center justify-between gap-3">
                      <span className="text-xs font-semibold text-[#F0B6D8]">
                        Women in Business
                      </span>
                      <span className="text-[11px] text-[#8F829D]">Business</span>
                    </div>

                    <h4 className="mt-3 text-sm font-semibold leading-6 text-white sm:text-base">
                      Building a small business in Bangladesh: finding reliable suppliers and
                      growing sustainably.
                    </h4>

                    <div className="mt-4 flex items-center gap-2 text-xs text-[#A99BB5]">
                      <Users className="h-3.5 w-3.5" />
                      <span>Business collaboration</span>
                      <span className="ml-auto text-[#F0B6D8] transition-transform group-hover:translate-x-1">
                        →
                      </span>
                    </div>
                  </div>

                  {/* Discussion 3 */}
                  <div className="group rounded-2xl bg-[#2B1E3A] p-5 transition-all duration-300 hover:bg-[#352446]">
                    <div className="flex items-center justify-between gap-3">
                      <span className="text-xs font-semibold text-[#9ED9B5]">Personal Growth</span>
                      <span className="text-[11px] text-[#8F829D]">Mentorship</span>
                    </div>

                    <h4 className="mt-3 text-sm font-semibold leading-6 text-white sm:text-base">
                      Taking the first step towards your dream career, even when self-doubt gets in
                      the way.
                    </h4>

                    <div className="mt-4 flex items-center gap-2 text-xs text-[#A99BB5]">
                      <Users className="h-3.5 w-3.5" />
                      <span>Growth & inspiration</span>
                      <span className="ml-auto text-[#9ED9B5] transition-transform group-hover:translate-x-1">
                        →
                      </span>
                    </div>
                  </div>
                </div>

                <div className="mt-6 flex items-center justify-between rounded-xl bg-[#8B5CF6]/10 px-4 py-4">
                  <div>
                    <p className="text-sm font-semibold text-white">Your voice belongs here.</p>
                    <p className="mt-1 text-xs text-[#A99BB5]">
                      Every connection starts with a conversation.
                    </p>
                  </div>

                  <Heart className="h-6 w-6 shrink-0 text-[#C4A7FF]" />
                </div>
              </div>
            </div>
          </div>
        </MainContainer>
      </Section>
      {/* --------------------------------------------------------------------- */}
      {/* SECTION 7: Women Entrepreneurs & Businesses */}
      {/* --------------------------------------------------------------------- */}
      <Section
        spacing="lg"
        surface="default"
        className="relative isolate overflow-hidden bg-white py-20 sm:py-24 dark:bg-[#160D24]"
      >
        {/* Background Decoration */}
        <div className="pointer-events-none absolute -right-40 top-0 -z-10 h-80 w-80 rounded-full bg-purple-200/25 blur-[120px] dark:bg-[#8B5CF6]/10" />

        <MainContainer size="lg">
          {/* Section Heading */}
          <div
            className="mb-12 flex flex-col justify-between gap-7 md:flex-row md:items-end"
            data-aos="fade-up"
          >
            <div className="max-w-2xl">
              <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-purple-100 px-4 py-2 dark:bg-[#A78BFA]/10">
                <Store className="h-3.5 w-3.5 text-purple-700 dark:text-[#C4A7FF]" />
                <span className="text-xs font-semibold tracking-[0.14em] text-purple-800 uppercase dark:text-[#C4A7FF]">
                  Economic Empowerment
                </span>
              </div>

              <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl dark:text-[#F9F5FF]">
                Women-Led
                <span className="text-purple-700 dark:text-[#C4A7FF]"> Business Showcase</span>
              </h2>

              <p className="mt-4 max-w-xl text-sm leading-7 text-gray-600 sm:text-base dark:text-[#B8AFC3]">
                Discover inspiring ventures founded and operated by Bangladeshi women. Explore local
                craftsmanship, creative businesses, and professional services while supporting
                women-led entrepreneurship.
              </p>
            </div>

            <Link href={ROUTES.public.businesses} className="shrink-0">
              <Button
                variant="primary"
                rightIcon={<ArrowRight className="h-4 w-4" />}
                className="rounded-xl bg-purple-700 px-6 py-3 font-semibold text-white shadow-md shadow-purple-900/10 transition-all duration-300 hover:-translate-y-1 hover:bg-purple-800 dark:bg-[#B794F6] dark:text-[#20132D] dark:hover:bg-[#CBB2FF]"
              >
                Explore Businesses
              </Button>
            </Link>
          </div>

          {/* Showcase Notice */}
          <div
            className="mb-6 flex items-center gap-2 text-xs text-gray-500 dark:text-[#9F94AC]"
            data-aos="fade-up"
          >
            <Info className="h-3.5 w-3.5 shrink-0 text-purple-600 dark:text-[#C4A7FF]" />
            <span>Illustrative business profiles showcasing the directory experience.</span>
          </div>

          {/* Business Grid */}
          <ResponsiveGrid columns={3} gap="md">
            {sampleBusinesses.map((biz, index) => (
              <Card
                key={biz.name}
                hoverEffect
                data-aos="fade-up"
                data-aos-delay={index * 120}
                className="group flex h-full flex-col justify-between overflow-hidden rounded-2xl border-0 bg-[#F8F5FC] shadow-sm transition-all duration-300 hover:-translate-y-1 hover:bg-[#F3EDFC] hover:shadow-xl hover:shadow-purple-900/5 dark:bg-[#21152F] dark:shadow-black/10 dark:hover:bg-[#2B1D38]"
              >
                <CardHeader>
                  {/* Category & Location */}
                  <div className="mb-5 flex items-center justify-between gap-3">
                    <Badge
                      variant="secondary"
                      size="sm"
                      className="bg-purple-100 text-purple-800 dark:bg-[#A78BFA]/15 dark:text-[#D4BDFB]"
                    >
                      {biz.tag}
                    </Badge>

                    <div className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-[#A99DB4]">
                      <MapPin className="h-3.5 w-3.5 text-purple-600 dark:text-[#C4A7FF]" />
                      <span>{biz.district}</span>
                    </div>
                  </div>

                  {/* Business Name */}
                  <CardTitle className="text-lg font-bold text-gray-900 transition-colors group-hover:text-purple-800 dark:text-[#F9F5FF] dark:group-hover:text-[#C4A7FF]">
                    {biz.name}
                  </CardTitle>

                  {/* Category */}
                  <p className="mt-1 text-xs font-semibold text-purple-700 dark:text-[#C4A7FF]">
                    {biz.category}
                  </p>

                  {/* Description */}
                  <CardDescription className="mt-3 text-sm leading-6 text-gray-600 dark:text-[#A99DB4]">
                    {biz.description}
                  </CardDescription>
                </CardHeader>

                <CardContent className="pt-4">
                  {/* Bottom Information */}
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-amber-100 dark:bg-amber-400/10">
                        <ShieldCheck className="h-4 w-4 text-amber-700 dark:text-amber-300" />
                      </div>

                      <div>
                        <p className="text-xs font-bold text-gray-800 dark:text-[#F9F5FF]">
                          Member Profile
                        </p>
                        <p className="text-[10px] text-gray-500 dark:text-[#9F94AC]">
                          Illustrative listing
                        </p>
                      </div>
                    </div>

                    <Link
                      href={ROUTES.public.businesses}
                      className="inline-flex shrink-0 items-center gap-1 text-xs font-semibold text-purple-700 transition-all duration-300 hover:gap-2 dark:text-[#C4A7FF]"
                    >
                      View Profile
                      <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </ResponsiveGrid>
        </MainContainer>
      </Section>
      {/* --------------------------------------------------------------------- */}
      {/* SECTION 8: Learning & Development */}
      {/* --------------------------------------------------------------------- */}
      <Section
        spacing="lg"
        surface="muted"
        className="relative isolate overflow-hidden bg-[#F8F5FC] py-20 dark:bg-[#160D24] sm:py-24"
      >
        <MainContainer size="lg">
          {/* Background decoration */}
          <div className="pointer-events-none absolute -left-24 top-20 h-64 w-64 rounded-full bg-purple-300/15 blur-3xl dark:bg-purple-500/10" />
          <div className="pointer-events-none absolute -right-24 bottom-0 h-72 w-72 rounded-full bg-rose-300/15 blur-3xl dark:bg-rose-500/10" />

          {/* Section Heading */}
          <div className="relative mx-auto mb-14 max-w-2xl text-center" data-aos="fade-up">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-purple-100 px-4 py-2 dark:bg-[#A78BFA]/10">
              <GraduationCap className="h-4 w-4 text-purple-700 dark:text-[#C4A7FF]" />
              <span className="text-xs font-semibold tracking-wide text-purple-800 dark:text-[#C4A7FF]">
                Skill Advancement
              </span>
            </div>

            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl dark:text-[#F9F5FF]">
              Practical Learning Tailored for{" "}
              <span className="text-purple-700 dark:text-[#C4A7FF]">Your Goals</span>
            </h2>

            <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-gray-600 sm:text-base dark:text-[#B8AFC3]">
              Build practical skills, gain confidence, and discover new opportunities through
              learning experiences designed around your ambitions.
            </p>
          </div>

          {/* Learning Categories */}
          <ResponsiveGrid columns={3} gap="md">
            {[
              {
                title: "Digital Skills & Freelancing",
                description:
                  "Master digital tools, client communication, international marketplace profiles, and creative skills like graphic design.",
                icon: <GraduationCap className="h-6 w-6" />,
                iconBg: "bg-purple-100 dark:bg-[#A78BFA]/15",
                iconColor: "text-purple-700 dark:text-[#C4A7FF]",
                label: "Digital Careers",
              },
              {
                title: "E-Commerce & Small Business",
                description:
                  "Learn business costing, inventory management, courier logistics in Bangladesh, and effective social commerce.",
                icon: <Briefcase className="h-6 w-6" />,
                iconBg: "bg-rose-100 dark:bg-[#D9A6B5]/15",
                iconColor: "text-rose-600 dark:text-[#D9A6B5]",
                label: "Entrepreneurship",
              },
              {
                title: "Financial Literacy & Halal Growth",
                description:
                  "Understand budgeting, cash flow, digital payments, and ethical financial strategies for long-term growth.",
                icon: <TrendingUp className="h-6 w-6" />,
                iconBg: "bg-emerald-100 dark:bg-[#9ED9B5]/15",
                iconColor: "text-emerald-700 dark:text-[#9ED9B5]",
                label: "Financial Growth",
              },
            ].map((item, index) => (
              <Card
                key={item.title}
                hoverEffect
                className="group h-full rounded-2xl border-0 bg-white p-1 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:bg-[#FDFBFF] hover:shadow-xl dark:border-0 dark:bg-[#21152F] dark:hover:bg-[#2B1D38]"
                data-aos="fade-up"
                data-aos-delay={index * 120}
              >
                <CardHeader className="p-5 sm:p-6">
                  <div className="mb-5 flex items-center justify-between">
                    <div
                      className={`flex h-12 w-12 items-center justify-center rounded-2xl ${item.iconBg} ${item.iconColor} transition-transform duration-300 group-hover:scale-110`}
                    >
                      {item.icon}
                    </div>

                    <span className="rounded-full bg-[#F3EDFC] px-3 py-1 text-[10px] font-semibold tracking-wide text-purple-700 dark:bg-[#A78BFA]/10 dark:text-[#C4A7FF]">
                      {item.label}
                    </span>
                  </div>

                  <CardTitle className="text-lg font-bold leading-snug text-gray-900 dark:text-[#F9F5FF]">
                    {item.title}
                  </CardTitle>

                  <CardDescription className="mt-3 text-sm leading-7 text-gray-600 dark:text-[#AFA4BC]">
                    {item.description}
                  </CardDescription>
                </CardHeader>
              </Card>
            ))}
          </ResponsiveGrid>

          {/* CTA */}
          <div className="relative mt-12 text-center" data-aos="fade-up">
            <Link href={ROUTES.public.learning}>
              <Button
                variant="primary"
                rightIcon={
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                }
                className="group rounded-full bg-purple-700 px-7 py-3 font-semibold text-white shadow-lg shadow-purple-700/15 transition-all hover:bg-purple-800 dark:bg-[#B794F6] dark:text-[#20132D] dark:hover:bg-[#C4A7FF]"
              >
                Explore Learning
              </Button>
            </Link>

            <p className="mt-4 text-xs text-gray-500 dark:text-[#9F94AC]">
              Learn practical skills. Build confidence. Grow together.
            </p>
          </div>
        </MainContainer>
      </Section>
      {/* --------------------------------------------------------------------- */}
      {/* SECTION 9: Events & Opportunities */}
      {/* --------------------------------------------------------------------- */}
      <Section
        spacing="lg"
        surface="default"
        className="relative isolate overflow-hidden bg-white py-20 dark:bg-[#160D24] sm:py-24"
      >
        <MainContainer size="lg">
          {/* Background decoration */}
          <div className="pointer-events-none absolute -right-24 top-10 h-72 w-72 rounded-full bg-purple-300/15 blur-3xl dark:bg-purple-500/10" />
          <div className="pointer-events-none absolute -left-24 bottom-0 h-64 w-64 rounded-full bg-rose-300/10 blur-3xl dark:bg-rose-500/10" />

          {/* Header */}
          <div className="relative mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div className="max-w-2xl" data-aos="fade-up">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-purple-100 px-4 py-2 dark:bg-[#A78BFA]/10">
                <CalendarDays className="h-4 w-4 text-purple-700 dark:text-[#C4A7FF]" />
                <span className="text-xs font-semibold tracking-wide text-purple-800 dark:text-[#C4A7FF]">
                  Community Calendar
                </span>
              </div>

              <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl dark:text-[#F9F5FF]">
                Upcoming Events &{" "}
                <span className="text-purple-700 dark:text-[#C4A7FF]">Workshops</span>
              </h2>

              <p className="mt-4 max-w-xl text-sm leading-7 text-gray-600 sm:text-base dark:text-[#B8AFC3]">
                Connect with inspiring women, learn from experienced mentors, and turn meaningful
                conversations into opportunities for growth.
              </p>
            </div>

            <div data-aos="fade-up">
              <Link href={ROUTES.public.events}>
                <Button
                  variant="outline"
                  rightIcon={<ArrowRight className="h-4 w-4" />}
                  className="rounded-full border-0 bg-[#F3EDFC] px-6 text-purple-800 hover:bg-purple-100 dark:bg-[#A78BFA]/10 dark:text-[#C4A7FF] dark:hover:bg-[#A78BFA]/20"
                >
                  View All Events
                </Button>
              </Link>
            </div>
          </div>

          {/* Events */}
          <div className="relative space-y-5">
            {[
              {
                day: "28",
                weekday: "SAT",
                month: "NOV",
                category: "Virtual Webinar",
                categoryStyle:
                  "bg-purple-100 text-purple-700 dark:bg-[#A78BFA]/15 dark:text-[#C4A7FF]",
                dateStyle: "bg-purple-100 text-purple-800 dark:bg-[#A78BFA]/15 dark:text-[#C4A7FF]",
                title: "Islamic Business Ethics for Contemporary Digital Entrepreneurs",
                location: "Online Zoom Session",
                time: "7:00 PM – 8:30 PM BST",
                icon: <Video className="h-4 w-4" />,
                description:
                  "Explore ethical business practices and responsible growth in the digital economy.",
              },
              {
                day: "05",
                weekday: "FRI",
                month: "DEC",
                category: "Regional Circle",
                categoryStyle: "bg-rose-100 text-rose-700 dark:bg-[#D9A6B5]/15 dark:text-[#D9A6B5]",
                dateStyle: "bg-rose-100 text-rose-700 dark:bg-[#D9A6B5]/15 dark:text-[#D9A6B5]",
                title: "Dhaka Sisters Meetup: Networking & Creative Collaboration",
                location: "Dhanmondi, Dhaka",
                time: "3:30 PM – 6:00 PM BST",
                icon: <Users className="h-4 w-4" />,
                description:
                  "Meet local entrepreneurs, exchange ideas, and build meaningful connections.",
              },
            ].map((event, index) => (
              <div
                key={event.title}
                className="group relative flex flex-col gap-5 rounded-2xl bg-[#F8F5FC] p-5 transition-all duration-300 hover:-translate-y-1 hover:bg-[#F3EDFC] hover:shadow-xl sm:flex-row sm:items-center sm:p-6 dark:bg-[#21152F] dark:hover:bg-[#2B1D38]"
                data-aos="fade-up"
                data-aos-delay={index * 120}
              >
                {/* Date */}
                <div
                  className={`flex h-[88px] w-full shrink-0 flex-row items-center justify-center gap-3 rounded-xl sm:h-24 sm:w-24 sm:flex-col sm:gap-1 ${event.dateStyle}`}
                >
                  <span className="text-xs font-bold tracking-widest">{event.weekday}</span>
                  <span className="text-3xl font-extrabold leading-none">{event.day}</span>
                  <span className="text-xs font-semibold tracking-widest">{event.month}</span>
                </div>

                {/* Event Details */}
                <div className="min-w-0 flex-1">
                  <div className="mb-3 flex flex-wrap items-center gap-2">
                    <span
                      className={`inline-flex items-center rounded-full px-3 py-1 text-[11px] font-semibold ${event.categoryStyle}`}
                    >
                      {event.category}
                    </span>
                    <span className="text-[11px] font-medium text-gray-400 dark:text-[#9F94AC]">
                      Community Event
                    </span>
                  </div>

                  <h3 className="text-lg font-bold leading-snug text-gray-900 transition-colors group-hover:text-purple-700 sm:text-xl dark:text-[#F9F5FF] dark:group-hover:text-[#C4A7FF]">
                    {event.title}
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-gray-500 dark:text-[#AFA4BC]">
                    {event.description}
                  </p>

                  <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2">
                    <span className="flex items-center gap-2 text-xs font-medium text-gray-500 dark:text-[#B8AFC3]">
                      <MapPin className="h-4 w-4 text-purple-600 dark:text-[#C4A7FF]" />
                      {event.location}
                    </span>

                    <span className="flex items-center gap-2 text-xs font-medium text-gray-500 dark:text-[#B8AFC3]">
                      <Clock className="h-4 w-4 text-purple-600 dark:text-[#C4A7FF]" />
                      {event.time}
                    </span>
                  </div>
                </div>

                {/* RSVP */}
                <div className="shrink-0 sm:pl-3">
                  <Link href={ROUTES.public.events}>
                    <Button
                      variant="primary"
                      size="sm"
                      rightIcon={<ArrowRight className="h-4 w-4" />}
                      className="w-full rounded-full bg-purple-700 px-5 text-white transition-all hover:bg-purple-800 sm:w-auto dark:bg-[#B794F6] dark:text-[#20132D] dark:hover:bg-[#C4A7FF]"
                    >
                      Details & RSVP
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* Footer note */}
          <div
            className="mt-8 flex flex-col items-center justify-center gap-2 text-center sm:flex-row"
            data-aos="fade-up"
          >
            <Sparkles className="h-4 w-4 text-purple-600 dark:text-[#C4A7FF]" />
            <p className="text-xs text-gray-500 dark:text-[#9F94AC]">
              More opportunities to connect, learn, and grow together.
            </p>
          </div>
        </MainContainer>
      </Section>
      {/* --------------------------------------------------------------------- */}
      {/* SECTION 10: How It Works */}
      {/* --------------------------------------------------------------------- */}
      <Section
        spacing="lg"
        surface="muted"
        className="relative isolate overflow-hidden bg-[#F8F5FC] py-20 dark:bg-[#160D24] sm:py-24"
      >
        <MainContainer size="lg">
          {/* Background decoration */}
          <div className="pointer-events-none absolute -left-24 top-10 h-64 w-64 rounded-full bg-purple-300/15 blur-3xl dark:bg-purple-500/10" />
          <div className="pointer-events-none absolute -right-24 bottom-0 h-64 w-64 rounded-full bg-rose-300/10 blur-3xl dark:bg-rose-500/10" />

          {/* Section Header */}
          <div className="relative mx-auto mb-14 max-w-2xl text-center" data-aos="fade-up">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-purple-100 px-4 py-2 dark:bg-[#A78BFA]/10">
              <Sparkles className="h-4 w-4 text-purple-700 dark:text-[#C4A7FF]" />
              <span className="text-xs font-semibold tracking-wide text-purple-800 dark:text-[#C4A7FF]">
                Four Simple Steps
              </span>
            </div>

            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl dark:text-[#F9F5FF]">
              How <span className="text-purple-700 dark:text-[#C4A7FF]">BDSisters</span> Works
            </h2>

            <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-gray-600 sm:text-base dark:text-[#B8AFC3]">
              From joining the community to discovering new opportunities, take meaningful steps
              toward learning, connection, and growth.
            </p>
          </div>

          {/* Steps */}
          <ResponsiveGrid columns={4} gap="md">
            {howItWorksSteps.map((step, index) => (
              <div
                key={step.step}
                className="group relative flex h-full flex-col justify-between overflow-hidden rounded-2xl bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:bg-[#FDFBFF] hover:shadow-xl dark:bg-[#21152F] dark:hover:bg-[#2B1D38]"
                data-aos="fade-up"
                data-aos-delay={index * 100}
              >
                {/* Decorative number */}
                <div className="pointer-events-none absolute -right-3 -top-6 select-none text-8xl font-black leading-none text-purple-100/70 transition-transform duration-300 group-hover:scale-110 dark:text-[#A78BFA]/10">
                  {String(step.step).padStart(2, "0")}
                </div>

                <div className="relative">
                  <div className="mb-7 flex items-center justify-between">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-purple-100 text-purple-700 dark:bg-[#A78BFA]/15 dark:text-[#C4A7FF]">
                      <span className="text-sm font-extrabold">
                        {String(step.step).padStart(2, "0")}
                      </span>
                    </div>

                    <span className="text-xs font-semibold uppercase tracking-widest text-purple-600/70 dark:text-[#A78BFA]/70">
                      Step {step.step}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold leading-snug text-gray-900 dark:text-[#F9F5FF]">
                    {step.title}
                  </h3>

                  <p className="mt-3 text-sm leading-7 text-gray-600 dark:text-[#AFA4BC]">
                    {step.description}
                  </p>
                </div>

                {/* Bottom accent */}
                <div className="mt-7 flex items-center gap-2">
                  <div className="h-1 w-8 rounded-full bg-purple-600 transition-all duration-300 group-hover:w-14 dark:bg-[#B794F6]" />
                  <div className="h-1 w-2 rounded-full bg-purple-200 dark:bg-[#A78BFA]/20" />
                  <div className="h-1 w-2 rounded-full bg-purple-200 dark:bg-[#A78BFA]/20" />
                </div>
              </div>
            ))}
          </ResponsiveGrid>
        </MainContainer>
      </Section>
      {/* --------------------------------------------------------------------- */}
      {/* SECTION 11: Community Stories / Voices */}
      {/* --------------------------------------------------------------------- */}
      <Section
        spacing="lg"
        surface="default"
        className="relative isolate overflow-hidden bg-white py-20 dark:bg-[#160D24] sm:py-24"
      >
        <MainContainer size="lg">
          {/* Background decoration */}
          <div className="pointer-events-none absolute -left-24 top-10 h-64 w-64 rounded-full bg-purple-300/15 blur-3xl dark:bg-purple-500/10" />
          <div className="pointer-events-none absolute -right-24 bottom-0 h-64 w-64 rounded-full bg-rose-300/10 blur-3xl dark:bg-rose-500/10" />

          {/* Header */}
          <div className="relative mx-auto mb-14 max-w-2xl text-center" data-aos="fade-up">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-purple-100 px-4 py-2 dark:bg-[#A78BFA]/10">
              <Heart className="h-4 w-4 text-purple-700 dark:text-[#C4A7FF]" />
              <span className="text-xs font-semibold tracking-wide text-purple-800 dark:text-[#C4A7FF]">
                Sisterhood Perspectives
              </span>
            </div>

            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl dark:text-[#F9F5FF]">
              Voices of <span className="text-purple-700 dark:text-[#C4A7FF]">Shared Ambition</span>
            </h2>

            <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-gray-600 sm:text-base dark:text-[#B8AFC3]">
              Every woman has a story, an ambition, and a dream worth supporting. Together, we can
              create a space where those dreams grow stronger.
            </p>
          </div>

          {/* Perspective Cards */}
          <ResponsiveGrid columns={3} gap="md">
            {[
              {
                quote:
                  "Finding a safe space where Bangladeshi women can discuss serious business hurdles, pricing, and supplier negotiations without judgment is what makes this concept so necessary.",
                role: "Apparel Designer",
                location: "Dhaka Division",
                initials: "AD",
                accent: "bg-purple-100 text-purple-700 dark:bg-[#A78BFA]/15 dark:text-[#C4A7FF]",
                quoteColor: "text-purple-200 dark:text-[#A78BFA]/20",
              },
              {
                quote:
                  "As a freelancer starting out from home, having senior women in tech guide me through client contracts gave me the confidence to stand on my own feet.",
                role: "Tech Freelancer",
                location: "Chattogram",
                initials: "TF",
                accent: "bg-rose-100 text-rose-700 dark:bg-[#D9A6B5]/15 dark:text-[#D9A6B5]",
                quoteColor: "text-rose-200 dark:text-[#D9A6B5]/20",
              },
              {
                quote:
                  "Sisterhood in business means we don't compete destructively; we recommend each other and grow together with barakah.",
                role: "Home Baker",
                location: "Sylhet",
                initials: "HB",
                accent: "bg-emerald-100 text-emerald-700 dark:bg-[#9ED9B5]/15 dark:text-[#9ED9B5]",
                quoteColor: "text-emerald-200 dark:text-[#9ED9B5]/20",
              },
            ].map((item, index) => (
              <div
                key={item.role}
                className="group relative flex h-full flex-col justify-between overflow-hidden rounded-2xl bg-[#F8F5FC] p-6 transition-all duration-300 hover:-translate-y-1 hover:bg-[#F3EDFC] hover:shadow-xl sm:p-7 dark:bg-[#21152F] dark:hover:bg-[#2B1D38]"
                data-aos="fade-up"
                data-aos-delay={index * 120}
              >
                {/* Decorative quote */}
                <div
                  className={`pointer-events-none absolute -right-2 -top-5 text-8xl font-serif leading-none ${item.quoteColor}`}
                >
                  &ldquo;
                </div>

                <div className="relative">
                  <div className="mb-6 flex items-center justify-between">
                    <div className="flex gap-1 text-amber-500">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star key={star} className="h-3.5 w-3.5 fill-current" />
                      ))}
                    </div>

                    <Quote className="h-5 w-5 text-purple-400/70 dark:text-[#A78BFA]/60" />
                  </div>

                  <p className="text-sm leading-8 text-gray-700 dark:text-[#D0C7DA]">
                    &ldquo;{item.quote}&rdquo;
                  </p>
                </div>

                {/* Contributor */}
                <div className="mt-8 flex items-center justify-between gap-3">
                  <div className="flex min-w-0 items-center gap-3">
                    <div
                      className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-xs font-bold ${item.accent}`}
                    >
                      {item.initials}
                    </div>

                    <div className="min-w-0">
                      <p className="truncate text-sm font-bold text-gray-900 dark:text-[#F9F5FF]">
                        {item.role}
                      </p>
                      <p className="mt-1 text-xs text-gray-500 dark:text-[#A99DB4]">
                        {item.location}
                      </p>
                    </div>
                  </div>

                  <span className="shrink-0 rounded-full bg-white px-3 py-1.5 text-[10px] font-semibold text-purple-700 dark:bg-[#2B1D38] dark:text-[#C4A7FF]">
                    Illustrative
                  </span>
                </div>
              </div>
            ))}
          </ResponsiveGrid>

          {/* Disclaimer */}
          <div
            className="mt-8 flex items-center justify-center gap-2 text-center"
            data-aos="fade-up"
          >
            <Info className="h-3.5 w-3.5 shrink-0 text-gray-400 dark:text-[#9F94AC]" />
            <p className="text-xs text-gray-500 dark:text-[#9F94AC]">
              Illustrative community perspectives reflecting the founding mission of BDSisters.
            </p>
          </div>
        </MainContainer>
      </Section>
      {/* --------------------------------------------------------------------- */}
      {/* SECTION 12: FAQ Preview */}
      {/* --------------------------------------------------------------------- */}
      <Section
        spacing="lg"
        surface="muted"
        className="relative isolate overflow-hidden bg-[#F8F5FC] py-20 dark:bg-[#160D24] sm:py-24"
      >
        <MainContainer size="md">
          {/* Background decoration */}
          <div className="pointer-events-none absolute -left-24 top-10 h-64 w-64 rounded-full bg-purple-300/15 blur-3xl dark:bg-purple-500/10" />
          <div className="pointer-events-none absolute -right-24 bottom-0 h-64 w-64 rounded-full bg-rose-300/10 blur-3xl dark:bg-rose-500/10" />

          {/* Header */}
          <div className="relative mx-auto mb-12 max-w-xl text-center" data-aos="fade-up">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-purple-100 px-4 py-2 dark:bg-[#A78BFA]/10">
              <MessageCircleQuestion className="h-4 w-4 text-purple-700 dark:text-[#C4A7FF]" />
              <span className="text-xs font-semibold tracking-wide text-purple-800 dark:text-[#C4A7FF]">
                Questions & Clarity
              </span>
            </div>

            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl dark:text-[#F9F5FF]">
              Frequently Asked{" "}
              <span className="text-purple-700 dark:text-[#C4A7FF]">Questions</span>
            </h2>

            <p className="mx-auto mt-4 max-w-md text-sm leading-7 text-gray-600 sm:text-base dark:text-[#B8AFC3]">
              Everything you need to know about BDSisters, our community, and how you can become
              part of the journey.
            </p>
          </div>

          {/* FAQ Accordion */}
          <div
            className="relative rounded-2xl bg-white p-3 shadow-sm sm:p-5 dark:bg-[#21152F]"
            data-aos="fade-up"
            data-aos-delay="100"
          >
            <Accordion items={faqItems} />
          </div>

          {/* Footer CTA */}
          <div
            className="relative mt-10 flex flex-col items-center justify-center gap-4 text-center"
            data-aos="fade-up"
            data-aos-delay="150"
          >
            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-[#B8AFC3]">
              <Lightbulb className="h-4 w-4 text-purple-600 dark:text-[#C4A7FF]" />
              <span>Still have questions? We&apos;re here to help.</span>
            </div>

            <Link href={ROUTES.public.faq}>
              <Button
                variant="outline"
                rightIcon={
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                }
                className="group rounded-full border-0 bg-purple-100 px-6 font-semibold text-purple-800 transition-all hover:bg-purple-200 dark:bg-[#A78BFA]/15 dark:text-[#C4A7FF] dark:hover:bg-[#A78BFA]/25"
              >
                Explore All FAQs
              </Button>
            </Link>
          </div>
        </MainContainer>
      </Section>
      {/* --------------------------------------------------------------------- */}
      {/* SECTION 13: Final Call to Action */}
      {/* --------------------------------------------------------------------- */}
      <section className="relative isolate overflow-hidden bg-[#F3EDFC] py-20 dark:bg-[#1C1228] sm:py-24">
        {/* Background decoration */}
        <div className="pointer-events-none absolute -left-20 -top-24 h-72 w-72 rounded-full bg-purple-300/30 blur-3xl dark:bg-purple-500/15" />
        <div className="pointer-events-none absolute -bottom-24 -right-20 h-80 w-80 rounded-full bg-rose-300/25 blur-3xl dark:bg-rose-500/10" />

        <MainContainer size="md">
          <div className="relative mx-auto max-w-3xl text-center" data-aos="fade-up">
            {/* Eyebrow */}
            <div className="mb-7 inline-flex items-center gap-2 rounded-full bg-white/80 px-4 py-2 shadow-sm dark:bg-[#A78BFA]/10">
              <Sparkles className="h-4 w-4 text-purple-600 dark:text-[#D9A6B5]" />
              <span className="text-xs font-bold tracking-wide text-purple-800 dark:text-[#C4A7FF]">
                Your Sisterhood Awaits
              </span>
            </div>

            {/* Heading */}
            <h2 className="text-3xl font-extrabold leading-tight tracking-tight text-gray-900 sm:text-4xl lg:text-5xl dark:text-[#F9F5FF]">
              Your Journey. Your Community.
              <span className="mt-1 block text-purple-700 dark:text-[#C4A7FF]">Your Future.</span>
            </h2>

            {/* Description */}
            <p className="mx-auto mt-6 max-w-xl text-sm leading-7 text-gray-600 sm:text-base sm:leading-8 dark:text-[#B8AFC3]">
              Become part of a growing ecosystem where women support women in business, learning,
              and life. Connect, discover opportunities, and grow together with BDSisters.
            </p>

            {/* CTA Buttons */}
            <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link href={ROUTES.auth.signUp} className="w-full sm:w-auto">
                <Button
                  variant="primary"
                  size="lg"
                  fullWidth
                  rightIcon={
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  }
                  className="group rounded-full bg-purple-700 px-8 font-bold text-white shadow-lg shadow-purple-700/20 transition-all hover:-translate-y-0.5 hover:bg-purple-800 dark:bg-[#B794F6] dark:text-[#20132D] dark:shadow-purple-500/10 dark:hover:bg-[#C4A7FF]"
                >
                  Join BDSisters
                </Button>
              </Link>

              <Link href={ROUTES.public.contact} className="w-full sm:w-auto">
                <Button
                  variant="outline"
                  size="lg"
                  fullWidth
                  className="rounded-full border-0 bg-white px-8 font-semibold text-gray-800 shadow-sm transition-all hover:-translate-y-0.5 hover:bg-purple-50 dark:bg-[#2B1D38] dark:text-[#F9F5FF] dark:hover:bg-[#382447]"
                >
                  Contact Our Team
                </Button>
              </Link>
            </div>

            {/* Supporting message */}
            <div className="mt-9 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-xs font-medium text-gray-500 dark:text-[#A99DB4]">
              <span className="flex items-center gap-2">
                <Heart className="h-3.5 w-3.5 text-rose-500 dark:text-[#D9A6B5]" />
                Grow Together
              </span>

              <span className="flex items-center gap-2">
                <Users className="h-3.5 w-3.5 text-purple-600 dark:text-[#C4A7FF]" />
                Stronger Together
              </span>
            </div>
          </div>
        </MainContainer>
      </section>
    </div>
  );
}
