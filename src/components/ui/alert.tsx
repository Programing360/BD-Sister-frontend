"use client";

import { useState, type ReactNode } from "react";
import { cn } from "@/lib/utils/cn";
import { AlertCircle, CheckCircle2, Info, AlertTriangle, X } from "lucide-react";

export type AlertVariant = "info" | "success" | "warning" | "danger";

export interface AlertProps {
  variant?: AlertVariant;
  title?: string;
  children: ReactNode;
  dismissible?: boolean;
  onDismiss?: () => void;
  className?: string;
}

const variantStyles: Record<
  AlertVariant,
  { container: string; icon: string; IconComponent: typeof Info }
> = {
  info: {
    container: "bg-info-light/60 border-info/30 text-foreground dark:bg-info-light/20",
    icon: "text-info",
    IconComponent: Info,
  },
  success: {
    container: "bg-success-light/60 border-success/30 text-foreground dark:bg-success-light/20",
    icon: "text-success",
    IconComponent: CheckCircle2,
  },
  warning: {
    container: "bg-warning-light/60 border-warning/30 text-foreground dark:bg-warning-light/20",
    icon: "text-warning",
    IconComponent: AlertTriangle,
  },
  danger: {
    container: "bg-danger-light/60 border-danger/30 text-foreground dark:bg-danger-light/20",
    icon: "text-danger",
    IconComponent: AlertCircle,
  },
};

export function Alert({
  variant = "info",
  title,
  children,
  dismissible = false,
  onDismiss,
  className,
}: AlertProps) {
  const [isDismissed, setIsDismissed] = useState(false);

  if (isDismissed) return null;

  const { container, icon, IconComponent } = variantStyles[variant];

  const handleDismiss = () => {
    setIsDismissed(true);
    onDismiss?.();
  };

  return (
    <div
      role="alert"
      className={cn(
        "relative flex w-full gap-3 rounded-lg border p-4 text-sm transition-all",
        container,
        className
      )}
    >
      <IconComponent className={cn("h-5 w-5 shrink-0 mt-0.5", icon)} aria-hidden="true" />
      <div className="flex-1">
        {title && <h5 className="font-semibold text-foreground mb-1">{title}</h5>}
        <div className="text-muted leading-relaxed">{children}</div>
      </div>
      {dismissible && (
        <button
          type="button"
          onClick={handleDismiss}
          className="text-muted hover:text-foreground shrink-0 rounded p-1 transition-colors"
          aria-label="Dismiss alert"
        >
          <X className="h-4 w-4" />
        </button>
      )}
    </div>
  );
}
