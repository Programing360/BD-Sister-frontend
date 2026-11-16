import { cn } from "@/lib/utils/cn";

export type StatusType = "active" | "inactive" | "pending" | "danger";

export interface StatusIndicatorProps {
  status: StatusType;
  label?: string;
  pulse?: boolean;
  className?: string;
}

const statusMap: Record<StatusType, { dot: string; pulseBg: string }> = {
  active: { dot: "bg-success", pulseBg: "bg-success/40" },
  inactive: { dot: "bg-muted", pulseBg: "bg-muted/30" },
  pending: { dot: "bg-warning", pulseBg: "bg-warning/40" },
  danger: { dot: "bg-danger", pulseBg: "bg-danger/40" },
};

export function StatusIndicator({ status, label, pulse = true, className }: StatusIndicatorProps) {
  const { dot, pulseBg } = statusMap[status];

  return (
    <span
      className={cn("inline-flex items-center gap-2 text-xs font-medium text-muted", className)}
    >
      <span className="relative flex h-2 w-2">
        {pulse && status === "active" && (
          <span
            className={cn(
              "animate-ping absolute inline-flex h-full w-full rounded-full opacity-75",
              pulseBg
            )}
          />
        )}
        <span className={cn("relative inline-flex rounded-full h-2 w-2", dot)} />
      </span>
      {label && <span>{label}</span>}
    </span>
  );
}
