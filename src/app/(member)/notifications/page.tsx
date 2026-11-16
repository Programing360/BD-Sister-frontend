"use client";

import { useState } from "react";
import { DashboardPageContainer } from "@/components/dashboard";
import { PageHeader } from "@/components/layout/page-header";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { NotificationItem } from "@/components/dashboard/notifications/notification-item";
import { NotificationEmpty } from "@/components/dashboard/notifications/notification-empty";
import { useDashboardData } from "@/features/dashboard";
import { CheckCheck } from "lucide-react";

export default function MemberNotificationsPage() {
  const {
    notifications,
    unreadNotificationsCount,
    markNotificationAsRead,
    markAllNotificationsAsRead,
  } = useDashboardData();
  const [activeFilter, setActiveFilter] = useState<"all" | "unread">("all");

  const filtered =
    activeFilter === "unread" ? notifications.filter((n) => !n.read) : notifications;

  return (
    <DashboardPageContainer className="space-y-6">
      <PageHeader
        title="Notification Center"
        description="Stay updated with announcements, circle interactions, security alerts, and event reminders."
        actions={
          unreadNotificationsCount > 0 ? (
            <Button
              variant="outline"
              size="sm"
              onClick={markAllNotificationsAsRead}
              className="gap-2"
            >
              <CheckCheck className="h-4 w-4" />
              <span>Mark all as read</span>
            </Button>
          ) : undefined
        }
      />

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-border/60 pb-3">
        <button
          type="button"
          onClick={() => setActiveFilter("all")}
          className={`rounded-xl px-3.5 py-1.5 text-xs font-semibold transition-colors ${activeFilter === "all"
              ? "bg-primary text-white shadow-xs"
              : "text-muted hover:text-foreground hover:bg-surface"
            }`}
        >
          All Notifications ({notifications.length})
        </button>
        <button
          type="button"
          onClick={() => setActiveFilter("unread")}
          className={`rounded-xl px-3.5 py-1.5 text-xs font-semibold transition-colors ${activeFilter === "unread"
              ? "bg-primary text-white shadow-xs"
              : "text-muted hover:text-foreground hover:bg-surface"
            }`}
        >
          Unread ({unreadNotificationsCount})
        </button>
      </div>

      {/* Notification List Container */}
      <Card className="rounded-3xl border border-border/80 bg-surface/30 p-6 shadow-xs">
        <CardContent className="p-0">
          {filtered.length === 0 ? (
            <NotificationEmpty />
          ) : (
            <div className="space-y-3">
              {filtered.map((item) => (
                <NotificationItem
                  key={item.id}
                  notification={item}
                  onMarkAsRead={markNotificationAsRead}
                />
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </DashboardPageContainer>
  );
}
