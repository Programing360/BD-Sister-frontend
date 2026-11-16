import type { Metadata } from "next";
import Link from "next/link";
import { MainContainer } from "@/components/layout/container";
import { PageHeader } from "@/components/layout/page-header";
import { Section } from "@/components/layout/section";
import { ResponsiveGrid } from "@/components/layout/grid";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { ROUTES } from "@/config/routes";
import {
  Briefcase,
  Search,
  MapPin,
  ShoppingBag,
  Palette,
  Utensils,
  Laptop,
  GraduationCap,
  Heart,
  ArrowRight,
  Sparkles,
  Store,
  Leaf,
  Info,
  ArrowUpRight,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Women-Led Businesses Directory & Enterprise Network",
  description:
    "Discover businesses founded and led by Bangladeshi women. Explore fashion, catering, crafts, digital services, education, and home-based enterprises.",
};

const categories = [
  {
    icon: Palette,
    name: "Handicrafts & Art",
    description: "Heritage crafts, Nakshi Kantha, pottery, textiles",
    color: "purple",
  },
  {
    icon: Utensils,
    name: "Culinary & Catering",
    description: "Home-cooked meals, catering, sweets, pantry staples",
    color: "rose",
  },
  {
    icon: ShoppingBag,
    name: "Fashion & Apparel",
    description: "Modest wear, hijabs, custom tailoring, abayas",
    color: "pink",
  },
  {
    icon: Laptop,
    name: "Tech & Digital Services",
    description: "Web development, graphic design, social marketing",
    color: "blue",
  },
  {
    icon: GraduationCap,
    name: "Education & Tutoring",
    description: "Language coaching, academic tutoring, workshops",
    color: "emerald",
  },
  {
    icon: Heart,
    name: "Wellness & Self-Care",
    description: "Skincare, herbal products, personal wellness",
    color: "amber",
  },
];

const businesses = [
  {
    id: "biz-1",
    name: "Nakshi Craft Atelier",
    category: "Handicrafts & Art",
    district: "Dhaka",
    owner: "Suraiya Akter",
    description:
      "Preserving traditional Bangladeshi embroidery through contemporary home furnishings, quilts, and custom decorative pieces.",
    tags: ["Heritage Craft", "Eco-Friendly"],
    icon: Palette,
    color: "purple",
  },
  {
    id: "biz-2",
    name: "Saffron & Spice Kitchen",
    category: "Culinary & Catering",
    district: "Chittagong",
    owner: "Tasnima Begum",
    description:
      "Bespoke event catering and daily executive tiffin services inspired by traditional coastal Bengali recipes.",
    tags: ["Home Kitchen", "Catering"],
    icon: Utensils,
    color: "rose",
  },
  {
    id: "biz-3",
    name: "Modest Elegance Apparel",
    category: "Fashion & Apparel",
    district: "Sylhet",
    owner: "Farhana Islam",
    description:
      "Breathable linen abayas, custom embroidered scarves, and modest office wear designed for contemporary women.",
    tags: ["Modest Fashion", "Custom Stitching"],
    icon: ShoppingBag,
    color: "pink",
  },
  {
    id: "biz-4",
    name: "PixelCraft Digital Studio",
    category: "Tech & Digital Services",
    district: "Dhaka",
    owner: "Nusrat Rahman",
    description:
      "A creative studio specializing in brand identity, packaging design, and e-commerce UI design for startups.",
    tags: ["Brand Design", "E-Commerce"],
    icon: Laptop,
    color: "blue",
  },
  {
    id: "biz-5",
    name: "Little Stars Tutoring Hub",
    category: "Education & Tutoring",
    district: "Rajshahi",
    owner: "Dr. Samira Khan",
    description:
      "Personalized STEM mentoring and educational foundations delivered through engaging learning experiences.",
    tags: ["Online Classes", "Education"],
    icon: GraduationCap,
    color: "emerald",
  },
  {
    id: "biz-6",
    name: "Prakriti Herbal Naturals",
    category: "Wellness & Self-Care",
    district: "Khulna",
    owner: "Ayesha Siddiqua",
    description:
      "Artisanal herbal hair care, coconut oil, and handcrafted personal care products inspired by local botanicals.",
    tags: ["Herbal Care", "Artisanal"],
    icon: Leaf,
    color: "amber",
  },
];

const colorStyles = {
  purple: {
    icon: "bg-purple-100 text-purple-700 dark:bg-purple-400/15 dark:text-[#C4A7FF]",
    accent: "text-purple-700 dark:text-[#C4A7FF]",
  },
  rose: {
    icon: "bg-rose-100 text-rose-600 dark:bg-rose-400/15 dark:text-[#F0B7C6]",
    accent: "text-rose-600 dark:text-[#F0B7C6]",
  },
  pink: {
    icon: "bg-pink-100 text-pink-700 dark:bg-pink-400/15 dark:text-[#F0B7D4]",
    accent: "text-pink-700 dark:text-[#F0B7D4]",
  },
  blue: {
    icon: "bg-blue-100 text-blue-700 dark:bg-blue-400/15 dark:text-[#9CC9FF]",
    accent: "text-blue-700 dark:text-[#9CC9FF]",
  },
  emerald: {
    icon: "bg-emerald-100 text-emerald-700 dark:bg-emerald-400/15 dark:text-[#9ED9B5]",
    accent: "text-emerald-700 dark:text-[#9ED9B5]",
  },
  amber: {
    icon: "bg-amber-100 text-amber-700 dark:bg-amber-400/15 dark:text-[#F2CC8F]",
    accent: "text-amber-700 dark:text-[#F2CC8F]",
  },
};

const popularSearches = ["Handicrafts", "Catering", "Modest Wear", "Design", "Dhaka", "Chittagong"];

export default function BusinessesPage() {
  return (
    <div className="flex flex-col overflow-hidden bg-white dark:bg-[#160D24]">
      <Section spacing="lg" className="relative isolate overflow-hidden bg-white dark:bg-[#160D24]">
        {/* Background Decorations */}
        <div className="pointer-events-none absolute -left-40 top-20 h-96 w-96 rounded-full bg-purple-200/30 blur-[110px] dark:bg-purple-500/10" />
        <div className="pointer-events-none absolute -right-40 top-[35%] h-96 w-96 rounded-full bg-rose-200/20 blur-[110px] dark:bg-rose-500/10" />

        <MainContainer size="lg">
          {/* Page Header */}
          <div data-aos="fade-up" className="relative">
            <PageHeader
              title="Women-Led Business Directory"
              description="Discover inspiring ventures, explore unique products and services, and support businesses founded by Bangladeshi women."
              breadcrumbs={
                <div className="flex items-center gap-2 text-sm">
                  <Link
                    href={ROUTES.public.home}
                    className="text-gray-500 transition-colors duration-300 hover:text-purple-700 dark:text-[#A99DB4] dark:hover:text-[#C4A7FF]"
                  >
                    Home
                  </Link>
                  <span className="text-gray-300 dark:text-white/20">/</span>
                  <span className="font-medium text-purple-700 dark:text-[#C4A7FF]">
                    Businesses
                  </span>
                </div>
              }
              actions={
                <Link href={ROUTES.auth.signUp}>
                  <Button
                    variant="primary"
                    rightIcon={<Briefcase className="h-4 w-4" />}
                    className="border-0 bg-purple-700 text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-purple-800 dark:bg-[#B794F6] dark:text-[#20132D] dark:hover:bg-[#C4A7FF]"
                  >
                    List Your Business
                  </Button>
                </Link>
              }
            />
          </div>

          {/* Search & Filter */}
          <div
            data-aos="fade-up"
            className="relative mt-12 rounded-3xl bg-[#F8F5FC] p-5 shadow-sm dark:bg-[#21152F] sm:p-7"
          >
            <div className="mb-5">
              <h2 className="text-lg font-bold text-gray-900 dark:text-[#F9F5FF]">
                Find Something You Love
              </h2>
              <p className="mt-1 text-sm text-gray-500 dark:text-[#A99DB4]">
                Explore women-led businesses across Bangladesh.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <div className="min-w-0 flex-1">
                <Input
                  placeholder="Search business, product, or specialty..."
                  leftIcon={<Search className="h-4 w-4" />}
                  className="h-12 rounded-xl border-0 bg-white text-gray-800 shadow-sm placeholder:text-gray-400 dark:bg-[#30213F] dark:text-white dark:placeholder:text-[#81748F]"
                />
              </div>

              <div className="w-full sm:w-52">
                <Input
                  placeholder="Search district..."
                  leftIcon={<MapPin className="h-4 w-4" />}
                  className="h-12 rounded-xl border-0 bg-white text-gray-800 shadow-sm placeholder:text-gray-400 dark:bg-[#30213F] dark:text-white dark:placeholder:text-[#81748F]"
                />
              </div>

              <Button
                variant="primary"
                className="h-12 shrink-0 border-0 bg-purple-700 px-6 text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-purple-800 dark:bg-[#B794F6] dark:text-[#20132D] dark:hover:bg-[#C4A7FF]"
              >
                <div className="flex items-center">
                  <Search className="mr-2 h-4 w-4" />
                  Search
                </div>
              </Button>
            </div>

            <div className="mt-5 flex flex-wrap items-center gap-2">
              <span className="mr-1 text-xs font-semibold text-gray-500 dark:text-[#A99DB4]">
                Popular:
              </span>

              {popularSearches.map((item) => (
                <button
                  key={item}
                  type="button"
                  className="rounded-full bg-white px-3.5 py-1.5 text-xs font-medium text-gray-600 transition-all duration-300 hover:-translate-y-0.5 hover:bg-purple-100 hover:text-purple-800 dark:bg-[#30213F] dark:text-[#B8AFC3] dark:hover:bg-[#3A294B] dark:hover:text-[#C4A7FF]"
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          {/* Categories */}
          <section className="relative mt-20 sm:mt-24">
            <div
              data-aos="fade-up"
              className="mb-9 flex flex-col justify-between gap-4 sm:flex-row sm:items-end"
            >
              <div>
                <Badge className="mb-3 border-0 bg-purple-100 text-purple-800 dark:bg-purple-400/15 dark:text-[#C4A7FF]">
                  <div className="flex items-center">
                    <Store className="mr-1.5 h-3.5 w-3.5" />
                    Explore Categories
                  </div>
                </Badge>

                <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-[#F9F5FF] sm:text-3xl">
                  Discover by <span className="text-purple-700 dark:text-[#C4A7FF]">Industry</span>
                </h2>

                <p className="mt-2 max-w-xl text-sm leading-6 text-gray-600 dark:text-[#B8AFC3]">
                  Explore different industries and find products, services, and creative ventures
                  from women entrepreneurs.
                </p>
              </div>

              <span className="text-xs font-medium text-gray-400 dark:text-[#81748F]">
                {categories.length} Categories
              </span>
            </div>

            <ResponsiveGrid columns={3} gap="md">
              {categories.map((category, index) => {
                const Icon = category.icon;
                const styles = colorStyles[category.color as keyof typeof colorStyles];

                return (
                  <Card
                    key={category.name}
                    data-aos="fade-up"
                    data-aos-delay={index * 80}
                    className="group h-full cursor-pointer rounded-2xl border-0 bg-[#F8F5FC] shadow-sm transition-all duration-300 ease-out hover:-translate-y-1.5 hover:bg-[#F3EDFC] hover:shadow-xl hover:shadow-purple-900/10 dark:bg-[#21152F] dark:hover:bg-[#2B1D38] dark:hover:shadow-black/20"
                  >
                    <CardHeader className="flex-row items-center gap-4 p-5 sm:p-6">
                      <div
                        className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl transition-all duration-300 ease-out group-hover:scale-110 group-hover:rotate-3 ${styles.icon}`}
                      >
                        <Icon className="h-5 w-5" />
                      </div>

                      <div className="min-w-0 flex-1">
                        <CardTitle className="text-sm font-bold text-gray-900 transition-colors duration-300 group-hover:text-purple-700 dark:text-[#F9F5FF] dark:group-hover:text-[#C4A7FF]">
                          {category.name}
                        </CardTitle>

                        <p className="mt-1 text-xs leading-5 text-gray-500 dark:text-[#A99DB4]">
                          {category.description}
                        </p>
                      </div>

                      <ArrowUpRight className="h-4 w-4 shrink-0 text-gray-300 opacity-0 transition-all duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:opacity-100 dark:text-[#C4A7FF]" />
                    </CardHeader>
                  </Card>
                );
              })}
            </ResponsiveGrid>
          </section>

          {/* Featured Businesses */}
          <section className="relative mt-20 sm:mt-24">
            <div
              data-aos="fade-up"
              className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end"
            >
              <div>
                <Badge className="mb-3 border-0 bg-rose-100 text-rose-700 dark:bg-rose-400/15 dark:text-[#F0B7C6]">
                  <div className="flex items-center">
                    <Sparkles className="mr-1.5 h-3.5 w-3.5" />
                    Business Showcase
                  </div>
                </Badge>

                <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-[#F9F5FF] sm:text-3xl">
                  Featured <span className="text-purple-700 dark:text-[#C4A7FF]">Enterprises</span>
                </h2>

                <p className="mt-2 text-sm text-gray-600 dark:text-[#B8AFC3]">
                  A preview of how business profiles can appear in the directory.
                </p>
              </div>

              <Badge className="w-fit border-0 bg-amber-100 text-amber-800 dark:bg-amber-400/15 dark:text-[#F2CC8F]">
                Illustrative Preview
              </Badge>
            </div>

            <div className="mb-6 mt-5 flex items-start gap-2 rounded-xl bg-[#F8F5FC] p-4 dark:bg-[#21152F]">
              <Info className="mt-0.5 h-4 w-4 shrink-0 text-purple-600 dark:text-[#C4A7FF]" />
              <p className="text-xs leading-6 text-gray-500 dark:text-[#A99DB4]">
                These are sample business profiles created to demonstrate the directory layout. They
                are not verified member listings.
              </p>
            </div>

            <ResponsiveGrid columns={3} gap="md">
              {businesses.map((business, index) => {
                const Icon = business.icon;
                const styles = colorStyles[business.color as keyof typeof colorStyles];

                return (
                  <Card
                    key={business.id}
                    data-aos="fade-up"
                    data-aos-delay={index * 80}
                    className="group flex h-full flex-col justify-between overflow-hidden rounded-2xl border-0 bg-[#F8F5FC] shadow-sm transition-all duration-300 ease-out hover:-translate-y-1.5 hover:bg-[#F3EDFC] hover:shadow-xl hover:shadow-purple-900/10 dark:bg-[#21152F] dark:hover:bg-[#2B1D38] dark:hover:shadow-black/20"
                  >
                    <CardHeader className="p-6">
                      <div className="mb-5 flex items-center justify-between">
                        <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-[#A99DB4]">
                          <MapPin className="h-3.5 w-3.5 text-purple-600 dark:text-[#C4A7FF]" />
                          {business.district}
                        </div>

                        <Badge className="border-0 bg-white text-gray-500 dark:bg-[#30213F] dark:text-[#AFA4BC]">
                          Sample
                        </Badge>
                      </div>

                      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-white shadow-sm transition-all duration-300 group-hover:scale-110 group-hover:rotate-3 dark:bg-[#30213F]">
                        <Icon className={`h-5 w-5 ${styles.accent}`} />
                      </div>

                      <CardTitle className="text-base font-bold text-gray-900 transition-colors duration-300 group-hover:text-purple-700 dark:text-[#F9F5FF] dark:group-hover:text-[#C4A7FF]">
                        {business.name}
                      </CardTitle>

                      <p className={`mt-1 text-xs font-semibold ${styles.accent}`}>
                        {business.category}
                      </p>

                      <CardDescription className="mt-3 text-sm leading-6 text-gray-600 dark:text-[#AFA4BC]">
                        {business.description}
                      </CardDescription>

                      <div className="mt-5 flex flex-wrap gap-2">
                        {business.tags.map((tag) => (
                          <span
                            key={tag}
                            className="rounded-full bg-white px-3 py-1 text-[11px] font-medium text-gray-500 transition-colors duration-300 group-hover:bg-purple-100 group-hover:text-purple-800 dark:bg-[#30213F] dark:text-[#AFA4BC] dark:group-hover:bg-[#3A294B] dark:group-hover:text-[#C4A7FF]"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </CardHeader>

                    <CardContent className="flex items-center justify-between gap-3 px-6 pb-6 pt-0">
                      <div className="min-w-0">
                        <p className="text-[10px] font-medium uppercase tracking-wider text-gray-400 dark:text-[#81748F]">
                          Founded by
                        </p>
                        <p className="mt-1 truncate text-xs font-semibold text-gray-800 dark:text-[#E8E0F0]">
                          {business.owner}
                        </p>
                      </div>

                      <Link
                        href={ROUTES.public.contact}
                        className="inline-flex shrink-0 items-center gap-1 text-xs font-semibold text-purple-700 transition-all duration-300 hover:gap-2 dark:text-[#C4A7FF]"
                      >
                        Contact
                        <ArrowRight className="h-3.5 w-3.5" />
                      </Link>
                    </CardContent>
                  </Card>
                );
              })}
            </ResponsiveGrid>
          </section>

          {/* Entrepreneur CTA */}
          <section
            data-aos="fade-up"
            className="relative mx-auto mt-24 max-w-4xl overflow-hidden rounded-[2rem] bg-[#F3EDFC] px-6 py-14 text-center dark:bg-[#21152F] sm:px-12 sm:py-16"
          >
            <div className="pointer-events-none absolute -right-16 -top-20 h-64 w-64 rounded-full bg-purple-300/30 blur-[80px] dark:bg-purple-500/15" />
            <div className="pointer-events-none absolute -bottom-24 -left-16 h-64 w-64 rounded-full bg-rose-300/20 blur-[80px] dark:bg-rose-500/10" />

            <div className="relative">
              <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-purple-700 shadow-sm dark:bg-[#30213F] dark:text-[#C4A7FF]">
                <Briefcase className="h-7 w-7" />
              </div>

              <Badge className="mb-4 border-0 bg-white/80 text-purple-800 dark:bg-white/10 dark:text-[#C4A7FF]">
                For Women Entrepreneurs
              </Badge>

              <h3 className="mx-auto max-w-2xl text-2xl font-bold tracking-tight text-gray-900 dark:text-[#F9F5FF] sm:text-3xl">
                Have a Business?{" "}
                <span className="text-purple-700 dark:text-[#C4A7FF]">
                  Let the World Discover It.
                </span>
              </h3>

              <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-gray-600 dark:text-[#B8AFC3] sm:text-base">
                Introduce your products and services to a community that celebrates women-led
                businesses, meaningful collaboration, and shared growth.
              </p>

              <div className="mt-8">
                <Link href={ROUTES.auth.signUp}>
                  <Button
                    variant="primary"
                    rightIcon={<ArrowRight className="h-4 w-4" />}
                    className="border-0 bg-purple-700 px-6 text-white shadow-lg shadow-purple-900/15 transition-all duration-300 hover:-translate-y-0.5 hover:bg-purple-800 dark:bg-[#B794F6] dark:text-[#20132D] dark:hover:bg-[#C4A7FF]"
                  >
                    Register Your Business
                  </Button>
                </Link>
              </div>

              <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-xs font-medium text-gray-500 dark:text-[#A99DB4]">
                <span className="flex items-center gap-2">
                  <Heart className="h-4 w-4 text-rose-500 dark:text-[#F0B7C6]" />
                  Women Supporting Women
                </span>

                <span className="flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-purple-600 dark:text-[#C4A7FF]" />
                  Shared Opportunities
                </span>
              </div>
            </div>
          </section>
        </MainContainer>
      </Section>
    </div>
  );
}
