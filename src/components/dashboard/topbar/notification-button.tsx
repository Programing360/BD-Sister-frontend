"use client";

import { Bell } from "lucide-react";
import { useUIStore } from "@/store/use-ui-store";

interface NotificationButtonProps {
  unreadCount?: number;
}

export function NotificationButton({ unreadCount = 0 }: NotificationButtonProps) {
  const toggleNotifications = useUIStore((state) => state.toggleNotifications);

  return (
    <button
      type="button"
      onClick={toggleNotifications}
      aria-label={`Open notifications panel. ${unreadCount} unread`}
      className="relative flex h-9 w-9 items-center justify-center rounded-xl border border-border/60 bg-surface/80 text-muted transition-colors hover:border-primary/40 hover:text-foreground hover:bg-surface focus:outline-none focus:ring-2 focus:ring-primary/20"
    >
      <Bell className="h-4 w-4" aria-hidden="true" />
      {unreadCount > 0 && (
        <span
          className="absolute -top-1 -right-1 flex h-4 min-w-[16px] items-center justify-center rounded-full bg-primary px-1 text-[10px] font-bold text-white shadow-xs animate-in zoom-in-50"
          aria-hidden="true"
        >
          {unreadCount > 9 ? "9+" : unreadCount}
        </span>
      )}
    </button>
  );
}

