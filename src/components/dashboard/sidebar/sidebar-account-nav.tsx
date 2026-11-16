"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { cn } from "@/lib/utils/cn";
import { ACCOUNT_DASHBOARD_NAV_ITEMS } from "../navigation/dashboard-nav-items";
import { useAuth } from "@/features/auth";
import { ROUTES } from "@/config/routes";
import { LogOut, Loader2 } from "lucide-react";
import { toast } from "react-toastify";

interface SidebarAccountNavProps {
  collapsed?: boolean;
  onItemClick?: () => void;
}

export function SidebarAccountNav({ collapsed = false, onItemClick }: SidebarAccountNavProps) {
  const pathname = usePathname();
  const router = useRouter();
  const { signOut } = useAuth();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleSignOut = async () => {
    try {
      setIsLoggingOut(true);
      await signOut();
      toast.success("Successfully signed out. Have a blessed day, Sister!");
      router.push(ROUTES.auth.login);
    } catch (error) {
      console.error("Sign out error:", error);
      toast.error("Failed to sign out cleanly. Redirecting...");
      router.push(ROUTES.auth.login);
    } finally {
      setIsLoggingOut(false);
      if (onItemClick) onItemClick();
    }
  };

  return (
    <div className="flex flex-col gap-1 border-t border-border/80 px-3 pt-3" aria-label="Account Settings Navigation">
      {!collapsed && (
        <span className="px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-muted">
          Preferences &amp; Account
        </span>
      )}

      {ACCOUNT_DASHBOARD_NAV_ITEMS.map((item) => {
        const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
        const Icon = item.icon;

        return (
          <Link
            key={item.id}
            href={item.href}
            onClick={onItemClick}
            title={collapsed ? item.title : undefined}
            aria-current={active ? "page" : undefined}
            className={cn(
              "group relative flex items-center rounded-xl transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-primary/20",
              collapsed ? "h-11 w-11 justify-center mx-auto" : "gap-3 px-3.5 py-2.5 text-xs font-medium",
              active
                ? "bg-primary text-white shadow-xs font-semibold"
                : "text-muted hover:bg-surface hover:text-foreground"
            )}
          >
            <Icon
              className={cn(
                "h-4 w-4 shrink-0 transition-transform duration-150 group-hover:scale-105",
                active ? "text-white" : "text-muted group-hover:text-foreground"
              )}
              aria-hidden="true"
            />
            {!collapsed && <span className="flex-1 truncate">{item.title}</span>}
          </Link>
        );
      })}

      {/* Logout Action */}
      <button
        type="button"
        onClick={handleSignOut}
        disabled={isLoggingOut}
        title={collapsed ? "Log Out" : undefined}
        className={cn(
          "group relative flex items-center rounded-xl text-danger transition-all duration-150 hover:bg-danger/10 focus:outline-none focus:ring-2 focus:ring-danger/20 disabled:opacity-50 text-left",
          collapsed ? "h-11 w-11 justify-center mx-auto mt-1" : "gap-3 px-3.5 py-2.5 text-xs font-medium mt-1"
        )}
      >
        {isLoggingOut ? (
          <Loader2 className="h-4 w-4 shrink-0 animate-spin" aria-hidden="true" />
        ) : (
          <LogOut className="h-4 w-4 shrink-0 transition-transform duration-150 group-hover:-translate-x-0.5" aria-hidden="true" />
        )}
        {!collapsed && <span>{isLoggingOut ? "Signing out..." : "Log Out"}</span>}
      </button>
    </div>
  );
}

