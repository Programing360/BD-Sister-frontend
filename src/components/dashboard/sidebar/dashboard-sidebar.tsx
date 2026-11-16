"use client";

import { useUIStore } from "@/store/use-ui-store";
import { BrandLogo } from "@/components/shared/brand-logo";
import { SidebarNav } from "./sidebar-nav";
import { SidebarAccountNav } from "./sidebar-account-nav";
import { cn } from "@/lib/utils/cn";
import { ROUTES } from "@/config/routes";
import { Sparkles } from "lucide-react";

export function DashboardSidebar() {
  const isSidebarCollapsed = useUIStore((state) => state.isSidebarCollapsed);

  return (
    <aside
      aria-label="Member Dashboard Sidebar"
      className={cn(
        "hidden md:flex flex-col border-r border-border/80 bg-background transition-all duration-300 ease-in-out shrink-0 select-none z-20 h-screen sticky top-0",
        isSidebarCollapsed ? "w-20" : "w-64"
      )}
    >
      {/* Sidebar Header / Brand */}
      <div className="flex h-16 items-center px-4 border-b border-border/80">
        {isSidebarCollapsed ? (
          <div className="mx-auto">
            <BrandLogo size="sm" showTagline={false} href={ROUTES.member.dashboard} />
          </div>
        ) : (
          <div className="flex items-center justify-between w-full">
            <BrandLogo size="md" showTagline={false} href={ROUTES.member.dashboard} />
            <span className="inline-flex items-center gap-1 rounded-full bg-primary-light/60 px-2 py-0.5 text-[10px] font-bold text-primary dark:bg-primary-light/15 dark:text-primary-light">
              <Sparkles className="h-2.5 w-2.5" />
              Member
            </span>
          </div>
        )}
      </div>

      {/* Main Nav Items (Scrollable) */}
      <div className="flex-1 overflow-y-auto py-4 scrollbar-thin">
        <SidebarNav collapsed={isSidebarCollapsed} />
      </div>

      {/* Account / Preference Nav Items (Pinned Bottom) */}
      <div className="pb-4">
        <SidebarAccountNav collapsed={isSidebarCollapsed} />
      </div>
    </aside>
  );
}

