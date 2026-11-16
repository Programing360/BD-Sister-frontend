import Link from "next/link";
import { BrandLogo } from "@/components/shared/brand-logo";
import { ROUTES } from "@/config/routes";
import { siteConfig } from "@/config/site";
import { ArrowUpRight, Heart, Mail, MapPin, Sparkles } from "lucide-react";

const CURRENT_YEAR = new Date().getFullYear();

const footerGroups = [
  {
    title: "Explore",
    links: [
      { label: "About BDSisters", href: ROUTES.public.about },
      { label: "Women's Community", href: ROUTES.public.community },
      { label: "Women-Led Businesses", href: ROUTES.public.businesses },
      { label: "Online Marketplace", href: ROUTES.public.marketplace },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Learning & Skills", href: ROUTES.public.learning },
      { label: "Events & Workshops", href: ROUTES.public.events },
      { label: "Help & FAQ", href: ROUTES.public.faq },
      { label: "Contact Support", href: ROUTES.public.contact },
    ],
  },
];

export function SiteFooter() {
  return (
    <div className="bg-[#f3edfc]">
      <footer className="relative isolate overflow-hidden rounded-t-[2.5rem] bg-gradient-to-r from-[#080D38] via-[#180C27] to-[#301006] text-white sm:rounded-t-[3.5rem]">
        {/* Background Decorations */}
        <div className="pointer-events-none absolute -left-32 -top-32 h-96 w-96 rounded-full bg-indigo-500/15 blur-[100px]" />
        <div className="pointer-events-none absolute -right-32 bottom-0 h-96 w-96 rounded-full bg-orange-500/10 blur-[100px]" />

        <div className="relative mx-auto max-w-7xl px-6 pb-8 pt-16 sm:px-8 sm:pt-20 lg:px-10">
          {/* Main Footer Content */}
          <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-5 lg:gap-10">
            {/* Brand Column */}
            <div className="lg:col-span-2">
              <div className="mb-6 inline-flex rounded-2xl bg-white/10 p-3">
                <BrandLogo size="md" showTagline />
              </div>

              <p className="max-w-sm text-sm leading-7 text-white/65">
                An AI-powered digital sanctuary and economic empowerment platform connecting
                Bangladeshi Muslim women entrepreneurs, professionals, learners, and community
                leaders worldwide.
              </p>

              <div className="mt-6 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2">
                <Heart className="h-3.5 w-3.5 fill-current text-rose-300" />
                <span className="text-xs font-semibold tracking-wide text-white/90">
                  Together We Grow
                </span>
              </div>
            </div>

            {/* Navigation Groups */}
            {footerGroups.map((group) => (
              <div key={group.title}>
                <h4 className="mb-6 text-xs font-bold uppercase tracking-[0.18em] text-white">
                  {group.title}
                </h4>

                <ul className="space-y-4">
                  {group.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="group inline-flex items-center gap-1.5 text-sm text-white/60 transition-colors duration-200 hover:text-white"
                      >
                        {link.label}

                        <ArrowUpRight className="h-3 w-3 -translate-y-0.5 opacity-0 transition-all duration-200 group-hover:translate-x-0.5 group-hover:opacity-100" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            {/* Contact Column */}
            <div>
              <h4 className="mb-6 text-xs font-bold uppercase tracking-[0.18em] text-white">
                Get in Touch
              </h4>

              <p className="mb-5 max-w-xs text-sm leading-6 text-white/60">
                Have a question or want to collaborate? We would love to hear from you.
              </p>

              <Link
                href={ROUTES.public.contact}
                className="group inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-[#160D2B] transition-all duration-300 hover:-translate-y-0.5 hover:bg-purple-100"
              >
                <Mail className="h-4 w-4" />
                Contact Us
                <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </Link>

              <div className="mt-7 flex items-start gap-2.5 text-sm text-white/55">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-purple-300" />
                <span>Bangladesh & Beyond</span>
              </div>
            </div>
          </div>

          {/* Large Brand Typography */}
          <div className="relative mt-20 select-none overflow-hidden sm:mt-24">
            <p
              aria-label="BD SISTER"
              className="bg-gradient-to-r from-white/90 via-purple-200/80 to-rose-200/70 bg-clip-text text-center text-[18vw] font-black leading-[0.85] tracking-[-0.085em] text-transparent sm:text-[16vw] lg:text-[15vw]"
            >
              BD SISTER
            </p>
          </div>

          {/* Footer Divider */}
          <div className="mt-12 h-px w-full bg-white/15" />

          {/* Copyright */}
          <div className="flex flex-col items-center justify-between gap-4 pt-7 text-center sm:flex-row sm:text-left">
            <p className="text-xs text-white/50">
              © {CURRENT_YEAR} {siteConfig.name}. All rights reserved.
            </p>

            <p className="flex items-center justify-center gap-2 text-xs text-white/50">
              Designed with
              <Heart className="h-3.5 w-3.5 fill-current text-rose-300" />
              for Bangladeshi sisters.
            </p>
          </div>

          {/* Closing Message */}
          <div className="mt-7 flex items-center justify-center gap-2 text-center">
            <Sparkles className="h-3.5 w-3.5 text-purple-300" />
            <p className="text-[11px] font-medium tracking-wide text-white/40">
              A community built on dignity, sisterhood, and shared ambition.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
