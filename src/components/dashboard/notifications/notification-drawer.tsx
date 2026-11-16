"use client";

import { useEffect, useState } from "react";
import { useUIStore } from "@/store/use-ui-store";
import { NotificationItem } from "./notification-item";
import { NotificationEmpty } from "./notification-empty";
import { Badge } from "@/components/ui/badge";
import type { NotificationItem as NotificationItemType } from "@/features/dashboard/types";
import { X, CheckCheck, Bell } from "lucide-react";

interface NotificationDrawerProps {
  notifications: NotificationItemType[];
  unreadCount: number;
  onMarkAsRead: (id: string) => void;
  onMarkAllAsRead: () => void;
}

export function NotificationDrawer({
  notifications,
  unreadCount,
  onMarkAsRead,
  onMarkAllAsRead,
}: NotificationDrawerProps) {
  const isNotificationsOpen = useUIStore((state) => state.isNotificationsOpen);
  const setNotificationsOpen = useUIStore((state) => state.setNotificationsOpen);
  const [filter, setFilter] = useState<"all" | "unread">("all");

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape" && isNotificationsOpen) {
        setNotificationsOpen(false);
      }
    }

    if (isNotificationsOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isNotificationsOpen, setNotificationsOpen]);

  if (!isNotificationsOpen) return null;

  const displayedNotifications =
    filter === "unread" ? notifications.filter((n) => !n.read) : notifications;

  return (
    <div
      className="fixed inset-0 z-50 overflow-hidden"
      role="dialog"
      aria-modal="true"
      aria-label="Member Notifications Panel"
    >
      {/* Backdrop */}
      <div
        onClick={() => setNotificationsOpen(false)}
        className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity duration-200"
        aria-hidden="true"
      />

      {/* Drawer Container */}
      <div className="fixed inset-y-0 right-0 flex max-w-full pl-10">
        <div className="w-screen max-w-md bg-background border-l border-border shadow-2xl flex flex-col animate-in slide-in-from-right duration-200">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-border/80 px-5 py-4">
            <div className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary-light/60 text-primary dark:bg-primary-light/15">
                <Bell className="h-4 w-4" aria-hidden="true" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-sm font-bold text-foreground">Notifications</h2>
                  {unreadCount > 0 && (
                    <Badge variant="primary" size="sm" className="text-[10px]">
                      {unreadCount} new
                    </Badge>
                  )}
                </div>
                <p className="text-[11px] text-muted">Updates, circles, and account alerts</p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setNotificationsOpen(false)}
              aria-label="Close notifications panel"
              className="flex h-8 w-8 items-center justify-center rounded-lg text-muted hover:text-foreground hover:bg-surface focus:outline-none focus:ring-2 focus:ring-primary/20"
            >
              <X className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>

          {/* Subheader: Filter Tabs & Mark All as Read */}
          <div className="flex items-center justify-between border-b border-border/60 bg-surface/30 px-5 py-2.5">
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={() => setFilter("all")}
                className={`rounded-lg px-2.5 py-1 text-xs font-semibold transition-colors ${
                  filter === "all"
                    ? "bg-primary text-white"
                    : "text-muted hover:text-foreground hover:bg-surface"
                }`}
              >
                All ({notifications.length})
              </button>
              <button
                type="button"
                onClick={() => setFilter("unread")}
                className={`rounded-lg px-2.5 py-1 text-xs font-semibold transition-colors ${
                  filter === "unread"
                    ? "bg-primary text-white"
                    : "text-muted hover:text-foreground hover:bg-surface"
                }`}
              >
                Unread ({unreadCount})
              </button>
            </div>

            {unreadCount > 0 && (
              <button
                type="button"
                onClick={onMarkAllAsRead}
                className="inline-flex items-center gap-1 text-[11px] font-semibold text-primary hover:underline"
              >
                <CheckCheck className="h-3.5 w-3.5" aria-hidden="true" />
                <span>Mark all read</span>
              </button>
            )}
          </div>

          {/* List Content */}
          <div className="flex-1 overflow-y-auto p-4 space-y-2.5 scrollbar-thin">
            {displayedNotifications.length === 0 ? (
              <NotificationEmpty />
            ) : (
              displayedNotifications.map((notif) => (
                <NotificationItem
                  key={notif.id}
                  notification={notif}
                  onMarkAsRead={onMarkAsRead}
                  onClosePanel={() => setNotificationsOpen(false)}
                />
              ))
            )}
          </div>

          {/* Footer Note */}
          <div className="border-t border-border/60 bg-surface/40 px-5 py-3 text-center">
            <p className="text-[11px] text-muted">
              Live notifications synced. Microservice integration planned for Step 6.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
