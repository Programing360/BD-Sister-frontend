"use client";

import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@/features/auth";
import { getDevelopmentDashboardData } from "../api/dashboard-api";
import type { DashboardOverviewResponse } from "../types";
import { useState } from "react";

export function useDashboardData() {
  const { user, isAuthenticated, isLoading: isAuthLoading } = useAuth();
  const [notificationsState, setNotificationsState] = useState<
    DashboardOverviewResponse["notifications"] | null
  >(null);

  const query = useQuery({
    queryKey: ["member-dashboard-overview", user?.id],
    queryFn: async (): Promise<DashboardOverviewResponse> => {
      // In production, this issues an Axios request to /api/v1/member/dashboard/overview
      // Simulating network response latency cleanly:
      await new Promise((resolve) => setTimeout(resolve, 80));
      return getDevelopmentDashboardData(user);
    },
    enabled: isAuthenticated && Boolean(user),
    staleTime: 1000 * 60 * 5, // 5 minutes cache
  });

  // Effective notifications list with client-side mutation support
  const notifications = notificationsState ?? query.data?.notifications ?? [];

  const markNotificationAsRead = (id: string) => {
    setNotificationsState((prev) => {
      const current = prev ?? query.data?.notifications ?? [];
      return current.map((n) => (n.id === id ? { ...n, read: true } : n));
    });
  };

  const markAllNotificationsAsRead = () => {
    setNotificationsState((prev) => {
      const current = prev ?? query.data?.notifications ?? [];
      return current.map((n) => ({ ...n, read: true }));
    });
  };

  const unreadNotificationsCount = notifications.filter((n) => !n.read).length;

  return {
    ...query,
    user,
    isLoading: isAuthLoading || query.isLoading,
    notifications,
    unreadNotificationsCount,
    markNotificationAsRead,
    markAllNotificationsAsRead,
  };
}

