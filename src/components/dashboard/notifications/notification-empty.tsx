import { BellOff } from "lucide-react";

export function NotificationEmpty() {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-surface border border-border/80 text-muted">
        <BellOff className="h-6 w-6" aria-hidden="true" />
      </div>
      <h3 className="mt-4 text-sm font-semibold text-foreground">All caught up, Sister!</h3>
      <p className="mt-1 max-w-xs text-xs text-muted leading-relaxed">
        You don&apos;t have any unread notifications right now. We will notify you when community updates or events arrive.
      </p>
    </div>
  );
}

