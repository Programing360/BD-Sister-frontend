"use client";

import { useUIStore } from "@/store/use-ui-store";
import { DashboardBreadcrumbs } from "./breadcrumbs";
import { SearchTrigger } from "./search-trigger";
import { NotificationButton } from "./notification-button";
import { UserDropdown } from "./user-dropdown";
import { ThemeToggle } from "@/components/shared/theme-toggle";
import { Menu, PanelLeftClose, PanelLeft } from "lucide-react";

interface DashboardTopbarProps {
  unreadNotificationsCount?: number;
}

export function DashboardTopbar({ unreadNotificationsCount = 0 }: DashboardTopbarProps) {
  const toggleMobileSidebar = useUIStore((state) => state.toggleMobileSidebar);
  const isSidebarCollapsed = useUIStore((state) => state.isSidebarCollapsed);
  const toggleSidebar = useUIStore((state) => state.toggleSidebar);

  return (
    <header className="sticky top-0 z-30 flex h-16 w-full items-center justify-between border-b border-border/80 bg-background/85 px-4 sm:px-6 backdrop-blur-md">
      {/* Left section: Mobile Hamburger + Desktop Toggle + Breadcrumbs */}
      <div className="flex items-center gap-3">
        {/* Mobile Hamburger Drawer Trigger */}
        <button
          type="button"
          onClick={toggleMobileSidebar}
          aria-label="Open navigation sidebar"
          className="flex h-9 w-9 items-center justify-center rounded-xl border border-border/60 bg-surface text-muted transition-colors hover:text-foreground md:hidden focus:outline-none focus:ring-2 focus:ring-primary/20"
        >
          <Menu className="h-4 w-4" aria-hidden="true" />
        </button>

        {/* Desktop Sidebar Collapse Toggle */}
        <button
          type="button"
          onClick={toggleSidebar}
          aria-label={isSidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          className="hidden md:flex h-9 w-9 items-center justify-center rounded-xl border border-border/60 bg-surface/80 text-muted transition-colors hover:text-foreground hover:bg-surface focus:outline-none focus:ring-2 focus:ring-primary/20"
        >
          {isSidebarCollapsed ? (
            <PanelLeft className="h-4 w-4" aria-hidden="true" />
          ) : (
            <PanelLeftClose className="h-4 w-4" aria-hidden="true" />
          )}
        </button>

        <DashboardBreadcrumbs />
      </div>

      {/* Right section: Search + Notifications + Theme Toggle + User Avatar Menu */}
      <div className="flex items-center gap-2 sm:gap-3">
        <SearchTrigger />
        <NotificationButton unreadCount={unreadNotificationsCount} />
        <ThemeToggle />
        <div className="h-5 w-[1px] bg-border/60 hidden sm:block" aria-hidden="true" />
        <UserDropdown />
      </div>
    </header>
  );
}

