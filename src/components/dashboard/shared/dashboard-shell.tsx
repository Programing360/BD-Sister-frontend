"use client";

import type { ReactNode } from "react";
import { DashboardSidebar } from "../sidebar/dashboard-sidebar";
import { MobileSidebarDrawer } from "../sidebar/mobile-sidebar-drawer";
import { DashboardTopbar } from "../topbar/dashboard-topbar";
import { SearchCommandPalette } from "../search/search-command-palette";
import { NotificationDrawer } from "../notifications/notification-drawer";
import { useDashboardData } from "@/features/dashboard/hooks/use-dashboard-data";

interface DashboardShellProps {
  children: ReactNode;
}

export function DashboardShell({ children }: DashboardShellProps) {
  const {
    notifications,
    unreadNotificationsCount,
    markNotificationAsRead,
    markAllNotificationsAsRead,
  } = useDashboardData();

  return (
    <div className="flex min-h-screen bg-background text-foreground antialiased">
      {/* 1. Desktop Persistent Sidebar */}
      <DashboardSidebar />

      {/* 2. Mobile Responsive Drawer */}
      <MobileSidebarDrawer />

      {/* 3. Main Application Column */}
      <div className="flex flex-1 flex-col min-w-0">
        {/* Topbar */}
        <DashboardTopbar unreadNotificationsCount={unreadNotificationsCount} />

        {/* Page Content */}
        <main className="flex-1 overflow-x-hidden bg-surface/30">
          {children}
        </main>
      </div>

      {/* 4. Global Command Palette Modal (Cmd+K / Ctrl+K) */}
      <SearchCommandPalette />

      {/* 5. Global Notification Slide-Over Drawer */}
      <NotificationDrawer
        notifications={notifications}
        unreadCount={unreadNotificationsCount}
        onMarkAsRead={markNotificationAsRead}
        onMarkAllAsRead={markAllNotificationsAsRead}
      />
    </div>
  );
}

