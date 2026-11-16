"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  User,
  Store,
  ShoppingBag,
  MessageSquare,
  Calendar,
  LogOut,
  Menu,
  X,
  CheckCircle2,
  Clock,
  Sparkles,
  ChevronRight,
  Loader2,
} from "lucide-react";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/features/auth";
import { ROUTES } from "@/config/routes";
import { toast } from "react-toastify";
import type { AuthUser } from "@/types/auth";

interface NavItem {
  label: string;
  href: string;
  icon: React.ElementType;
}

const NAV_ITEMS: NavItem[] = [
  { label: "Overview", href: ROUTES.member.dashboard, icon: LayoutDashboard },
  { label: "My Profile", href: ROUTES.member.profile, icon: User },
  { label: "Business Profiles", href: ROUTES.member.myBusiness, icon: Store },
  { label: "Marketplace", href: ROUTES.public.marketplace, icon: ShoppingBag },
  { label: "Forums & Circles", href: ROUTES.public.community, icon: MessageSquare },
  { label: "Events", href: ROUTES.public.events, icon: Calendar },
];

interface SidebarContentProps {
  pathname: string;
  onCloseMobile: () => void;
  user: AuthUser | null;
  memberId: string;
  onLogout: () => void;
  isLoggingOut: boolean;
}

/**
 * Declared outside the render function to prevent state reset and React Compiler errors.
 */
function SidebarContent({
  pathname,
  onCloseMobile,
  memberId,
  onLogout,
  isLoggingOut,
}: SidebarContentProps) {
  const isActiveRoute = (href: string) => {
    if (href === "/dashboard") {
      return pathname === href;
    }
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  return (
    <div className="flex h-full flex-col justify-between px-4 py-5 select-none">
      {/* Brand */}
      <div>
        <div className="mb-9 flex items-center justify-between px-2">
          <Link
            href={ROUTES.member.dashboard}
            className="flex items-center gap-3"
            onClick={onCloseMobile}
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-600 shadow-md shadow-purple-600/20">
              <Sparkles className="h-5 w-5 text-white" />
            </div>

            <div>
              <span className="text-[19px] font-bold tracking-tight text-gray-900">
                BDSisters<span className="text-purple-600">.org</span>
              </span>
              <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-gray-400">
                Sisterhood Portal
              </p>
            </div>
          </Link>

          <button
            type="button"
            onClick={onCloseMobile}
            className="rounded-lg p-2 text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-900 lg:hidden"
            aria-label="Close sidebar"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Navigation */}
        <div className="mb-3 px-3">
          <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-gray-400">
            Workspace
          </p>
        </div>

        <nav className="space-y-1.5" aria-label="Dashboard Sidebar Navigation">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = isActiveRoute(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onCloseMobile}
                aria-current={isActive ? "page" : undefined}
                className={`
                  group relative flex items-center gap-3
                  rounded-xl px-3.5 py-3 text-[13px]
                  transition-all duration-200
                  ${
                    isActive
                      ? "bg-purple-50 font-semibold text-purple-700 shadow-xs"
                      : "font-medium text-gray-500 hover:bg-gray-50 hover:text-gray-900"
                  }
                `}
              >
                {/* Active indicator bar */}
                {isActive && (
                  <span className="absolute bottom-2.5 left-0 top-2.5 w-[3px] rounded-r-full bg-purple-600" />
                )}

                <Icon
                  className={`
                    h-[18px] w-[18px] shrink-0 transition-colors
                    ${isActive ? "text-purple-600" : "text-gray-400 group-hover:text-purple-600"}
                  `}
                  strokeWidth={isActive ? 2.3 : 1.8}
                />

                <span>{item.label}</span>

                {isActive && <ChevronRight className="ml-auto h-4 w-4 text-purple-500" />}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Bottom Section */}
      <div className="space-y-4 border-t border-gray-100 pt-5">
        {/* Member Information Box */}
        <div className="rounded-xl border border-purple-100 bg-purple-50/60 p-3.5">
          <div className="mb-2 flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-white text-purple-600 shadow-xs">
              <Sparkles className="h-3.5 w-3.5" />
            </div>
            <p className="text-xs font-semibold text-gray-700">Membership</p>
          </div>

          <p className="mb-1 text-[10px] text-gray-500">Member ID</p>

          <p className="font-mono text-xs font-bold tracking-wide text-purple-700 truncate">
            {memberId}
          </p>
        </div>

        {/* Real Better Auth Logout Button */}
        <button
          type="button"
          onClick={onLogout}
          disabled={isLoggingOut}
          className="flex h-11 w-full items-center justify-start gap-3 rounded-xl px-3 text-sm font-medium text-gray-500 transition-colors hover:bg-red-50 hover:text-red-600 focus:outline-none focus:ring-2 focus:ring-red-200 disabled:opacity-50"
        >
          {isLoggingOut ? (
            <Loader2 className="h-[17px] w-[17px] animate-spin text-red-600" />
          ) : (
            <LogOut className="h-[17px] w-[17px]" />
          )}
          <span>{isLoggingOut ? "Logging out..." : "Logout"}</span>
        </button>
      </div>
    </div>
  );
}

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, signOut } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  // Close mobile drawer on escape key
  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape" && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isMobileMenuOpen]);

  const handleLogout = async () => {
    try {
      setIsLoggingOut(true);
      await signOut();
      toast.success("Successfully logged out. Have a blessed day, Sister!");
      router.push(ROUTES.auth.login);
    } catch (err) {
      console.error("Sign out error:", err);
      toast.error("Failed to sign out. Redirecting...");
      router.push(ROUTES.auth.login);
    } finally {
      setIsLoggingOut(false);
      setIsMobileMenuOpen(false);
    }
  };

  const displayName = user?.name || "Sister Member";
  const displayEmail = user?.email || "member@bdsisters.org";
  const memberId = user?.id ? `BDS-${user.id.slice(-6).toUpperCase()}` : "BDS-2026-MEMBER";
  const isVerified = Boolean(user?.emailVerified);

  return (
    <div className="min-h-screen bg-[#F8F7FC] text-gray-900 selection:bg-purple-100 selection:text-purple-900">
      {/* Desktop Sidebar */}
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-[260px] border-r border-gray-200/80 bg-white lg:block">
        <SidebarContent
          pathname={pathname}
          onCloseMobile={() => setIsMobileMenuOpen(false)}
          user={user}
          memberId={memberId}
          onLogout={handleLogout}
          isLoggingOut={isLoggingOut}
        />
      </aside>

      {/* Mobile Overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 z-40 bg-gray-950/30 backdrop-blur-xs lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Mobile Sidebar */}
      <aside
        aria-label="Mobile navigation"
        className={`
          fixed inset-y-0 left-0 z-50 w-[280px]
          border-r border-gray-200 bg-white
          shadow-2xl transition-transform duration-300 ease-in-out
          lg:hidden
          ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        <SidebarContent
          pathname={pathname}
          onCloseMobile={() => setIsMobileMenuOpen(false)}
          user={user}
          memberId={memberId}
          onLogout={handleLogout}
          isLoggingOut={isLoggingOut}
        />
      </aside>

      {/* Main Layout Area */}
      <div className="flex min-h-screen flex-col lg:pl-[260px]">
        {/* Header */}
        <header className="sticky top-0 z-20 border-b border-gray-200/80 bg-white/95 backdrop-blur-md">
          <div className="mx-auto flex min-h-[72px] max-w-[1600px] items-center justify-between gap-3 px-4 sm:px-6 lg:px-8">
            {/* Left Section */}
            <div className="flex min-w-0 items-center gap-3">
              <button
                type="button"
                onClick={() => setIsMobileMenuOpen(true)}
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-gray-200 bg-white text-gray-600 transition-colors hover:border-purple-200 hover:bg-purple-50 hover:text-purple-600 lg:hidden focus:outline-none focus:ring-2 focus:ring-purple-200"
                aria-label="Open navigation menu"
              >
                <Menu className="h-5 w-5" />
              </button>

              <div className="hidden sm:block">
                <p className="text-xs font-semibold text-purple-600">
                  Empowering Bangladeshi Women
                </p>
                <p className="mt-0.5 text-sm text-gray-500">Welcome back to your community hub</p>
              </div>

              <div className="sm:hidden">
                <p className="text-sm font-bold text-gray-900">BDSisters</p>
                <p className="text-[11px] text-gray-500">Member Dashboard</p>
              </div>
            </div>

            {/* Right Section */}
            <div className="flex shrink-0 items-center gap-3 sm:gap-4">
              {/* Verification Status Badge */}
              {isVerified ? (
                <Badge
                  variant="success"
                  size="sm"
                  className="hidden sm:inline-flex gap-1"
                >
                  <CheckCircle2 className="h-3.5 w-3.5 text-success" />
                  <span>Verified Member</span>
                </Badge>
              ) : (
                <Badge
                  variant="warning"
                  size="sm"
                  className="hidden sm:inline-flex gap-1"
                >
                  <Clock className="h-3.5 w-3.5 text-warning" />
                  <span>Pending Verification</span>
                </Badge>
              )}

              {/* Profile Link and Avatar */}
              <Link
                href={ROUTES.member.profile}
                className="flex items-center gap-3 border-l border-gray-200 pl-3 sm:pl-4 transition-opacity hover:opacity-85"
                title="View My Profile"
              >
                <div className="hidden text-right md:block">
                  <p className="text-[13px] font-semibold text-gray-900 line-clamp-1">{displayName}</p>
                  <p className="mt-0.5 text-[11px] text-gray-500 line-clamp-1">{displayEmail}</p>
                </div>

                <Avatar
                  src={user?.image}
                  name={displayName}
                  size="sm"
                  className="ring-2 ring-purple-100"
                />
              </Link>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="mx-auto w-full max-w-[1600px] flex-1 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
          {children}
        </main>
      </div>
    </div>
  );
}
