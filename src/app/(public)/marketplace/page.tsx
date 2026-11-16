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
  ShoppingBag,
  Store,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  Truck,
  CreditCard,
  Palette,
  Shirt,
  Utensils,
  FileImage,
  Sparkles,
  Heart,
  ArrowUpRight,
  Info,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Online Marketplace — Ethical Sister-to-Sister Commerce",
  description:
    "Discover handcrafted items, modest fashion, artisanal foods, and digital goods produced by Bangladeshi women entrepreneurs. Buy ethically, sell proudly.",
};

const marketplaceCategories = [
  {
    name: "Handcrafted Decor & Textiles",
    desc: "Quilts, cushions, ceramics, and beautiful handloom creations.",
    icon: Palette,
    accent: "bg-purple-100 text-purple-700 dark:bg-purple-400/10 dark:text-purple-300",
  },
  {
    name: "Modest Fashion",
    desc: "Abayas, hijabs, formal dresses, and tailored clothing.",
    icon: Shirt,
    accent: "bg-rose-100 text-rose-700 dark:bg-rose-400/10 dark:text-rose-300",
  },
  {
    name: "Artisanal Foods & Sweets",
    desc: "Traditional pitha, homemade pickles, and baked goods.",
    icon: Utensils,
    accent: "bg-amber-100 text-amber-700 dark:bg-amber-400/10 dark:text-amber-300",
  },
  {
    name: "Digital Creative Products",
    desc: "Social media graphics, planner printables, and illustrations.",
    icon: FileImage,
    accent: "bg-emerald-100 text-emerald-700 dark:bg-emerald-400/10 dark:text-emerald-300",
  },
];

const illustrativeProducts = [
  {
    id: "prod-1",
    title: "Hand-Embroidered Nakshi Throw Quilt",
    seller: "Nakshi Craft Atelier",
    price: "৳ 3,850",
    category: "Home & Heritage",
    accent: "bg-rose-100 dark:bg-rose-400/10",
    iconColor: "text-rose-500 dark:text-rose-300",
  },
  {
    id: "prod-2",
    title: "Pure Cotton Medina Silk Scarf Set",
    seller: "Modest Elegance",
    price: "৳ 1,450",
    category: "Modest Fashion",
    accent: "bg-purple-100 dark:bg-purple-400/10",
    iconColor: "text-purple-500 dark:text-purple-300",
  },
  {
    id: "prod-3",
    title: "Handmade Botanical Soap Duo",
    seller: "Prakriti Naturals",
    price: "৳ 550",
    category: "Organic Wellness",
    accent: "bg-emerald-100 dark:bg-emerald-400/10",
    iconColor: "text-emerald-600 dark:text-emerald-300",
  },
  {
    id: "prod-4",
    title: "Bengali Ramadan & Eid Family Planner",
    seller: "PixelCraft Studio",
    price: "৳ 600",
    category: "Digital Printable",
    accent: "bg-amber-100 dark:bg-amber-400/10",
    iconColor: "text-amber-600 dark:text-amber-300",
  },
];

const buyerBenefits = [
  "Discover unique products created by women entrepreneurs.",
  "Support local Bangladeshi artisans and small businesses.",
  "Connect with sellers for product questions and customization.",
];

const sellerBenefits = [
  "Create product listings without technical complexity.",
  "Reach a community-focused customer audience.",
  "Build your brand and grow your business online.",
];

export default function MarketplacePage() {
  return (
    <div className="flex flex-col">
      <Section spacing="lg" className="relative overflow-hidden bg-white dark:bg-[#160D24]">
        <MainContainer size="lg">
          {/* Decorative Background */}
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
              title="BDSisters Marketplace"
              description="A meaningful marketplace where women-led businesses meet thoughtful buyers. Discover unique creations, support local entrepreneurs, and grow together."
              breadcrumbs={
                <div className="flex items-center gap-1.5 text-sm text-gray-500 dark:text-[#A99DB4]">
                  <Link
                    href={ROUTES.public.home}
                    className="transition-colors hover:text-purple-700 dark:hover:text-[#C4A7FF]"
                  >
                    Home
                  </Link>
                  <span>/</span>
                  <span className="font-medium text-purple-700 dark:text-[#C4A7FF]">
                    Marketplace
                  </span>
                </div>
              }
              actions={
                <Link href={ROUTES.auth.signUp}>
                  <Button
                    variant="primary"
                    className="shadow-lg shadow-purple-700/10 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                    rightIcon={<Store className="h-4 w-4" />}
                  >
                    Open a Storefront
                  </Button>
                </Link>
              }
            />
          </div>

          {/* Value Propositions */}
          <div
            data-aos="fade-up"
            data-aos-delay="100"
            className="relative z-10 mt-10 rounded-3xl bg-[#F8F5FC] p-6 sm:p-8 dark:bg-[#21152F]"
          >
            <div className="mb-7 max-w-xl">
              <Badge variant="primary" className="mb-3">
                Shopping With Purpose
              </Badge>

              <h2 className="text-xl font-bold tracking-tight text-gray-900 dark:text-[#F9F5FF] sm:text-2xl">
                Commerce That Creates Opportunities
              </h2>

              <p className="mt-2 text-sm leading-7 text-gray-600 dark:text-[#B8AFC3]">
                Every connection between a buyer and a woman-led business can become an opportunity
                for growth.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-7 md:grid-cols-3">
              <div className="group flex items-start gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-purple-100 text-purple-700 transition-transform duration-300 group-hover:rotate-6 group-hover:scale-110 dark:bg-purple-400/10 dark:text-[#C4A7FF]">
                  <ShieldCheck className="h-5 w-5" />
                </div>

                <div>
                  <h3 className="font-bold text-gray-900 dark:text-[#F9F5FF]">
                    Responsible Commerce
                  </h3>
                  <p className="mt-1 text-sm leading-6 text-gray-600 dark:text-[#B8AFC3]">
                    Encouraging transparent product information, fair practices, and responsible
                    transactions.
                  </p>
                </div>
              </div>

              <div className="group flex items-start gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-rose-100 text-rose-700 transition-transform duration-300 group-hover:rotate-6 group-hover:scale-110 dark:bg-rose-400/10 dark:text-rose-300">
                  <Truck className="h-5 w-5" />
                </div>

                <div>
                  <h3 className="font-bold text-gray-900 dark:text-[#F9F5FF]">
                    Support Women Entrepreneurs
                  </h3>
                  <p className="mt-1 text-sm leading-6 text-gray-600 dark:text-[#B8AFC3]">
                    Discover products from women artisans, homemakers, and independent business
                    owners.
                  </p>
                </div>
              </div>

              <div className="group flex items-start gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-700 transition-transform duration-300 group-hover:rotate-6 group-hover:scale-110 dark:bg-emerald-400/10 dark:text-emerald-300">
                  <CreditCard className="h-5 w-5" />
                </div>

                <div>
                  <h3 className="font-bold text-gray-900 dark:text-[#F9F5FF]">
                    Local Payment Experience
                  </h3>
                  <p className="mt-1 text-sm leading-6 text-gray-600 dark:text-[#B8AFC3]">
                    Designed with Bangladesh&apos;s local payment ecosystem in mind.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Marketplace Categories */}
          <section className="relative z-10 mt-20">
            <div
              className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-end"
              data-aos="fade-up"
            >
              <div>
                <Badge variant="secondary" className="mb-3">
                  Explore Collections
                </Badge>

                <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-[#F9F5FF] sm:text-3xl">
                  Find Something Meaningful
                </h2>

                <p className="mt-2 max-w-xl text-sm leading-7 text-gray-600 dark:text-[#B8AFC3]">
                  Explore thoughtfully created products across different categories and discover the
                  creativity of women-led businesses.
                </p>
              </div>

              <span className="text-sm font-medium text-purple-700 dark:text-[#C4A7FF]">
                Explore all categories
              </span>
            </div>

            <ResponsiveGrid columns={4} gap="md">
              {marketplaceCategories.map((category, index) => {
                const Icon = category.icon;

                return (
                  <Card
                    key={category.name}
                    data-aos="fade-up"
                    data-aos-delay={index * 100}
                    className="group h-full border-0 bg-[#F8F5FC] shadow-sm transition-all duration-300 hover:-translate-y-2 hover:bg-[#F3EDFC] hover:shadow-xl dark:bg-[#21152F] dark:hover:bg-[#2B1D38]"
                  >
                    <CardHeader className="p-5">
                      <div
                        className={`mb-5 flex h-12 w-12 items-center justify-center rounded-2xl ${category.accent} transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3`}
                      >
                        <Icon className="h-5 w-5" />
                      </div>

                      <CardTitle className="text-base font-bold text-gray-900 transition-colors duration-300 group-hover:text-purple-700 dark:text-[#F9F5FF] dark:group-hover:text-[#C4A7FF]">
                        {category.name}
                      </CardTitle>

                      <CardDescription className="mt-2 text-sm leading-6 text-gray-600 dark:text-[#B8AFC3]">
                        {category.desc}
                      </CardDescription>

                      <div className="mt-4 flex items-center gap-2 text-sm font-semibold text-purple-700 opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100 dark:text-[#C4A7FF]">
                        Explore
                        <ArrowUpRight className="h-4 w-4" />
                      </div>
                    </CardHeader>
                  </Card>
                );
              })}
            </ResponsiveGrid>
          </section>

          {/* Product Showcase */}
          <section className="relative z-10 mt-20">
            <div
              className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-end"
              data-aos="fade-up"
            >
              <div>
                <Badge variant="primary" className="mb-3">
                  Made With Creativity
                </Badge>

                <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-[#F9F5FF] sm:text-3xl">
                  Featured Artisan Creations
                </h2>

                <p className="mt-2 text-sm leading-7 text-gray-600 dark:text-[#B8AFC3]">
                  A glimpse into the beautiful products our marketplace is designed to showcase.
                </p>
              </div>

              <Badge variant="secondary">Illustrative Preview</Badge>
            </div>

            <div
              className="mb-5 flex items-start gap-2 rounded-xl bg-[#F8F5FC] p-4 dark:bg-[#21152F]"
              data-aos="fade-up"
            >
              <Info className="mt-0.5 h-4 w-4 shrink-0 text-purple-700 dark:text-[#C4A7FF]" />

              <p className="text-xs leading-6 text-gray-600 dark:text-[#B8AFC3]">
                These are sample product profiles for design preview purposes. They do not represent
                verified sellers or currently available inventory.
              </p>
            </div>

            <ResponsiveGrid columns={4} gap="md">
              {illustrativeProducts.map((product, index) => (
                <Card
                  key={product.id}
                  data-aos="fade-up"
                  data-aos-delay={index * 100}
                  className="group flex h-full flex-col justify-between overflow-hidden border-0 bg-white shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl dark:bg-[#21152F]"
                >
                  {/* Product Visual */}
                  <div
                    className={`relative flex h-48 items-center justify-center overflow-hidden ${product.accent}`}
                  >
                    <div className="absolute inset-0 bg-white/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100 dark:bg-white/5" />

                    <ShoppingBag
                      className={`h-14 w-14 ${product.iconColor} transition-all duration-500 group-hover:scale-125 group-hover:-rotate-6`}
                      strokeWidth={1.3}
                    />

                    <div className="absolute left-3 top-3">
                      <Badge variant="neutral" size="sm">
                        Sample
                      </Badge>
                    </div>

                    <div className="absolute bottom-3 right-3 flex h-9 w-9 translate-y-3 items-center justify-center rounded-full bg-white text-purple-700 opacity-0 shadow-md transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 dark:bg-[#21152F] dark:text-[#C4A7FF]">
                      <ArrowUpRight className="h-4 w-4" />
                    </div>
                  </div>

                  <CardHeader className="flex-1 p-4">
                    <Badge variant="neutral" size="sm" className="mb-2 w-fit">
                      {product.category}
                    </Badge>

                    <CardTitle className="line-clamp-2 text-sm font-bold leading-6 text-gray-900 transition-colors duration-300 group-hover:text-purple-700 dark:text-[#F9F5FF] dark:group-hover:text-[#C4A7FF]">
                      {product.title}
                    </CardTitle>

                    <p className="mt-2 text-xs text-gray-500 dark:text-[#A99DB4]">
                      By {product.seller}
                    </p>

                    <p className="mt-4 text-lg font-bold text-purple-700 dark:text-[#C4A7FF]">
                      {product.price}
                    </p>
                  </CardHeader>

                  <CardContent className="p-4 pt-0">
                    <Button
                      variant="outline"
                      size="sm"
                      fullWidth
                      className="border-0 bg-[#F3EDFC] text-purple-700 transition-all duration-300 hover:bg-purple-700 hover:text-white dark:bg-[#342442] dark:text-[#C4A7FF] dark:hover:bg-[#B794F6] dark:hover:text-[#20132D]"
                    >
                      View Details
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </ResponsiveGrid>
          </section>

          {/* Buyer and Seller Workflow */}
          <section
            className="relative z-10 mt-20 overflow-hidden rounded-3xl bg-[#F8F5FC] p-6 sm:p-10 dark:bg-[#21152F]"
            data-aos="fade-up"
          >
            <div className="mb-10 max-w-2xl">
              <Badge variant="primary" className="mb-3">
                How It Works
              </Badge>

              <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-[#F9F5FF] sm:text-3xl">
                A Marketplace Built for Both Sides
              </h2>

              <p className="mt-3 text-sm leading-7 text-gray-600 dark:text-[#B8AFC3]">
                Whether you&apos;re discovering something special or building your own business,
                BDSisters aims to make the experience simple and meaningful.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
              {/* Buyers */}
              <div className="group">
                <div className="mb-5 flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-purple-100 text-purple-700 transition-transform duration-300 group-hover:scale-110 dark:bg-purple-400/10 dark:text-[#C4A7FF]">
                    <ShoppingBag className="h-5 w-5" />
                  </div>

                  <div>
                    <Badge variant="primary" className="mb-1">
                      For Buyers
                    </Badge>

                    <h3 className="text-lg font-bold text-gray-900 dark:text-[#F9F5FF]">
                      Discover With Confidence
                    </h3>
                  </div>
                </div>

                <ul className="space-y-4">
                  {buyerBenefits.map((benefit) => (
                    <li
                      key={benefit}
                      className="flex items-start gap-3 text-sm leading-6 text-gray-600 dark:text-[#B8AFC3]"
                    >
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-purple-700 dark:text-[#C4A7FF]" />
                      {benefit}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Sellers */}
              <div className="group">
                <div className="mb-5 flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-rose-100 text-rose-700 transition-transform duration-300 group-hover:scale-110 dark:bg-rose-400/10 dark:text-rose-300">
                    <Store className="h-5 w-5" />
                  </div>

                  <div>
                    <Badge variant="secondary" className="mb-1">
                      For Sellers
                    </Badge>

                    <h3 className="text-lg font-bold text-gray-900 dark:text-[#F9F5FF]">
                      Grow Your Business
                    </h3>
                  </div>
                </div>

                <ul className="space-y-4">
                  {sellerBenefits.map((benefit) => (
                    <li
                      key={benefit}
                      className="flex items-start gap-3 text-sm leading-6 text-gray-600 dark:text-[#B8AFC3]"
                    >
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-rose-600 dark:text-rose-300" />
                      {benefit}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* CTA */}
            <div className="mt-12 flex flex-col items-center justify-between gap-5 rounded-2xl bg-white p-6 text-center shadow-sm sm:flex-row sm:text-left dark:bg-[#2B1D38]">
              <div>
                <div className="flex items-center justify-center gap-2 sm:justify-start">
                  <Heart className="h-4 w-4 text-rose-500" />

                  <span className="text-sm font-semibold text-purple-700 dark:text-[#C4A7FF]">
                    Your Business Deserves to Grow
                  </span>
                </div>

                <h3 className="mt-2 text-lg font-bold text-gray-900 dark:text-[#F9F5FF]">
                  Ready to share your creations with the world?
                </h3>

                <p className="mt-1 text-sm text-gray-600 dark:text-[#B8AFC3]">
                  Take the first step towards building your online presence.
                </p>
              </div>

              <Link href={ROUTES.auth.signUp}>
                <Button
                  variant="primary"
                  size="lg"
                  className="shrink-0 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                  rightIcon={<ArrowRight className="h-4 w-4" />}
                >
                  Become a Seller
                </Button>
              </Link>
            </div>
          </section>

          {/* Closing Message */}
          <div className="relative z-10 mt-16 text-center" data-aos="fade-up">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-purple-100 text-purple-700 dark:bg-purple-400/10 dark:text-[#C4A7FF]">
              <Sparkles className="h-5 w-5" />
            </div>

            <h2 className="text-xl font-bold text-gray-900 dark:text-[#F9F5FF] sm:text-2xl">
              Every Purchase Can Empower a Sister.
            </h2>

            <p className="mx-auto mt-3 max-w-xl text-sm leading-7 text-gray-600 dark:text-[#B8AFC3]">
              Together, we can create more opportunities for women to showcase their talents, build
              sustainable businesses, and achieve financial independence.
            </p>
          </div>
        </MainContainer>
      </Section>
    </div>
  );
}
