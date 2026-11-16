"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BrandLogo } from "@/components/shared/brand-logo";
import { ThemeToggle } from "@/components/shared/theme-toggle";
import { AnnouncementBar } from "@/components/shared/announcement-bar";
import { Button } from "@/components/ui/button";
import { Drawer } from "@/components/ui/drawer";
import { ROUTES } from "@/config/routes";
import { cn } from "@/lib/utils/cn";
import { ArrowRight, Menu } from "lucide-react";

export interface SiteHeaderProps {
  isMemberPortal?: boolean;
}

const navLinks = [
  { label: "Home", href: ROUTES.public.home },
  { label: "About", href: ROUTES.public.about },
  { label: "Community", href: ROUTES.public.community },
  { label: "Businesses", href: ROUTES.public.businesses },
  { label: "Marketplace", href: ROUTES.public.marketplace },
  { label: "Learning", href: ROUTES.public.learning },
  { label: "Events", href: ROUTES.public.events },
  { label: "Contact", href: ROUTES.public.contact },
];

export function SiteHeader({ isMemberPortal = false }: SiteHeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const isLinkActive = (href: string) => {
    if (href === "/") return pathname === "/";

    return pathname === href || pathname.startsWith(`${href}/`);
  };

  const closeMobileMenu = () => setMobileMenuOpen(false);

  return (
    <header className="sticky top-0 z-50 w-full">
      {/* Announcement */}
      {!isMemberPortal && <AnnouncementBar />}

      {/* Main Header */}
      <div className="relative bg-white/90 shadow-sm shadow-purple-950/[0.03] backdrop-blur-xl transition-colors dark:bg-[#160D24]/90 dark:shadow-black/10">
        <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Brand */}
          <div className="flex shrink-0 items-center">
            <BrandLogo size="md" />
          </div>

          {/* Desktop Navigation */}
          {!isMemberPortal && (
            <nav className="hidden items-center gap-1 xl:flex" aria-label="Main navigation">
              {navLinks.map((link) => {
                const isActive = isLinkActive(link.href);

                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    aria-current={isActive ? "page" : undefined}
                    className={cn(
                      "relative rounded-full px-3 py-2 text-[13px] font-medium transition-all duration-200",
                      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500",
                      isActive
                        ? "bg-purple-100 text-purple-800 dark:bg-[#A78BFA]/15 dark:text-[#C4A7FF]"
                        : "text-gray-600 hover:bg-purple-50 hover:text-purple-800 dark:text-[#B8AFC3] dark:hover:bg-[#A78BFA]/10 dark:hover:text-[#C4A7FF]"
                    )}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </nav>
          )}

          {/* Right Actions */}
          <div className="flex shrink-0 items-center gap-2 sm:gap-3">
            <ThemeToggle />

            {!isMemberPortal && (
              <>
                {/* Desktop Authentication */}
                <div className="hidden items-center gap-2 sm:flex">
                  <Link href={ROUTES.auth.signIn}>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="rounded-full px-4 font-semibold text-gray-700 hover:bg-purple-50 hover:text-purple-800 dark:text-[#D0C7DA] dark:hover:bg-[#A78BFA]/10 dark:hover:text-[#C4A7FF]"
                    >
                      Sign In
                    </Button>
                  </Link>

                  <Link href={ROUTES.auth.signUp}>
                    <Button
                      variant="primary"
                      size="sm"
                      rightIcon={<ArrowRight className="h-3.5 w-3.5" />}
                      className="rounded-full bg-purple-700 px-5 font-semibold text-white shadow-md shadow-purple-700/15 transition-all hover:-translate-y-0.5 hover:bg-purple-800 dark:bg-[#B794F6] dark:text-[#20132D] dark:hover:bg-[#C4A7FF]"
                    >
                      Join Community
                    </Button>
                  </Link>
                </div>

                {/* Mobile Menu Trigger */}
                <Button
                  variant="ghost"
                  size="icon-sm"
                  onClick={() => setMobileMenuOpen(true)}
                  aria-label="Open mobile menu"
                  aria-expanded={mobileMenuOpen}
                  aria-controls="mobile-navigation"
                  className="rounded-full text-gray-700 hover:bg-purple-100 hover:text-purple-800 xl:hidden dark:text-[#D0C7DA] dark:hover:bg-[#A78BFA]/15 dark:hover:text-[#C4A7FF]"
                >
                  <Menu className="h-5 w-5" />
                </Button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {!isMemberPortal && (
        <Drawer
          isOpen={mobileMenuOpen}
          onClose={closeMobileMenu}
          title="BDSisters.org"
          description="Bangladeshi Women's Digital Platform"
          position="right"
        >
          <div id="mobile-navigation" className="flex flex-col gap-6">
            {/* Navigation */}
            <nav className="flex flex-col gap-1.5" aria-label="Mobile navigation">
              {navLinks.map((link) => {
                const isActive = isLinkActive(link.href);

                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={closeMobileMenu}
                    aria-current={isActive ? "page" : undefined}
                    className={cn(
                      "group flex items-center justify-between rounded-xl px-4 py-3 transition-all duration-200",
                      isActive
                        ? "bg-purple-100 text-purple-800 dark:bg-[#A78BFA]/15 dark:text-[#C4A7FF]"
                        : "text-gray-700 hover:bg-purple-50 hover:text-purple-800 dark:text-[#D0C7DA] dark:hover:bg-[#A78BFA]/10 dark:hover:text-[#C4A7FF]"
                    )}
                  >
                    <span className="flex items-center gap-3">
                      <span
                        className={cn(
                          "h-1.5 w-1.5 rounded-full transition-colors",
                          isActive
                            ? "bg-purple-600 dark:bg-[#C4A7FF]"
                            : "bg-gray-300 group-hover:bg-purple-400 dark:bg-[#554363]"
                        )}
                      />

                      <span className="text-sm font-semibold">{link.label}</span>
                    </span>

                    <ArrowRight
                      className={cn(
                        "h-4 w-4 transition-all duration-200",
                        isActive
                          ? "translate-x-0 text-purple-600 dark:text-[#C4A7FF]"
                          : "-translate-x-1 text-gray-400 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 dark:text-[#9F94AC]"
                      )}
                    />
                  </Link>
                );
              })}
            </nav>

            {/* Authentication Actions */}
            <div className="flex flex-col gap-3 pt-2">
              <Link href={ROUTES.auth.signIn} onClick={closeMobileMenu}>
                <Button
                  variant="outline"
                  fullWidth
                  size="md"
                  className="rounded-full border-0 bg-purple-50 font-semibold text-purple-800 hover:bg-purple-100 dark:bg-[#A78BFA]/10 dark:text-[#C4A7FF] dark:hover:bg-[#A78BFA]/20"
                >
                  Sign In
                </Button>
              </Link>

              <Link href={ROUTES.auth.signUp} onClick={closeMobileMenu}>
                <Button
                  variant="primary"
                  fullWidth
                  size="md"
                  rightIcon={<ArrowRight className="h-4 w-4" />}
                  className="rounded-full bg-purple-700 font-semibold text-white hover:bg-purple-800 dark:bg-[#B794F6] dark:text-[#20132D] dark:hover:bg-[#C4A7FF]"
                >
                  Join Community
                </Button>
              </Link>
            </div>

            {/* Footer Message */}
            <div className="rounded-2xl bg-[#F8F5FC] p-4 dark:bg-[#21152F]">
              <p className="text-center text-xs leading-6 text-gray-600 dark:text-[#AFA4BC]">
                A place to connect, learn, and grow together.
                <span className="mt-1 block font-semibold text-purple-700 dark:text-[#C4A7FF]">
                  Your Sisterhood Awaits.
                </span>
              </p>
            </div>
          </div>
        </Drawer>
      )}
    </header>
  );
}
