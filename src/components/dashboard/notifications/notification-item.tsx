"use client";

import { cn } from "@/lib/utils/cn";
import type { NotificationItem as NotificationItemType } from "@/features/dashboard/types";
import {
  Bell,
  ShieldCheck,
  Users,
  Store,
  Calendar,
  Check,
  ExternalLink,
} from "lucide-react";
import Link from "next/link";
import { formatDistanceToNow } from "date-fns";

interface NotificationItemProps {
  notification: NotificationItemType;
  onMarkAsRead: (id: string) => void;
  onClosePanel?: () => void;
}

const TYPE_ICONS: Record<NotificationItemType["type"], typeof Bell> = {
  system: Bell,
  security: ShieldCheck,
  community: Users,
  business: Store,
  event: Calendar,
};

const TYPE_STYLES: Record<NotificationItemType["type"], string> = {
  system: "bg-primary-light/60 text-primary dark:bg-primary-light/15",
  security: "bg-amber-100 text-amber-700 dark:bg-amber-950/40 dark:text-amber-400",
  community: "bg-purple-100 text-purple-700 dark:bg-purple-950/40 dark:text-purple-400",
  business: "bg-emerald-100 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400",
  event: "bg-blue-100 text-blue-700 dark:bg-blue-950/40 dark:text-blue-400",
};

export function NotificationItem({
  notification,
  onMarkAsRead,
  onClosePanel,
}: NotificationItemProps) {
  const Icon = TYPE_ICONS[notification.type] || Bell;
  const iconStyle = TYPE_STYLES[notification.type] || TYPE_STYLES.system;

  const formattedTime = (() => {
    try {
      return formatDistanceToNow(new Date(notification.createdAt), { addSuffix: true });
    } catch {
      return "recently";
    }
  })();

  return (
    <div
      className={cn(
        "group relative flex items-start gap-3 rounded-2xl p-3.5 transition-all duration-150 border",
        notification.read
          ? "border-transparent bg-background hover:bg-surface/60"
          : "border-primary/20 bg-primary-light/20 dark:bg-primary-light/5 hover:border-primary/40"
      )}
    >
      {/* Type Icon */}
      <div
        className={cn(
          "flex h-9 w-9 shrink-0 items-center justify-center rounded-xl",
          iconStyle
        )}
      >
        <Icon className="h-4 w-4" aria-hidden="true" />
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-baseline justify-between gap-2">
          <p
            className={cn(
              "text-xs font-semibold truncate",
              notification.read ? "text-foreground" : "text-foreground font-bold"
            )}
          >
            {notification.title}
          </p>
          <span className="text-[10px] text-muted shrink-0">{formattedTime}</span>
        </div>

        <p className="mt-1 text-xs text-muted leading-relaxed line-clamp-2">
          {notification.message}
        </p>

        {/* Actions */}
        <div className="mt-2.5 flex items-center gap-3">
          {notification.actionUrl && (
            <Link
              href={notification.actionUrl}
              onClick={onClosePanel}
              className="inline-flex items-center gap-1 text-[11px] font-semibold text-primary hover:underline"
            >
              <span>View details</span>
              <ExternalLink className="h-3 w-3" aria-hidden="true" />
            </Link>
          )}

          {!notification.read && (
            <button
              type="button"
              onClick={() => onMarkAsRead(notification.id)}
              className="inline-flex items-center gap-1 text-[11px] text-muted hover:text-foreground transition-colors"
              aria-label="Mark as read"
            >
              <Check className="h-3 w-3" aria-hidden="true" />
              <span>Mark as read</span>
            </button>
          )}
        </div>
      </div>

      {/* Unread indicator dot */}
      {!notification.read && (
        <span
          className="h-2 w-2 rounded-full bg-primary shrink-0 mt-1.5"
          aria-label="Unread notification"
        />
      )}
    </div>
  );
}

