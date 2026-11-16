import type { ReactNode } from "react";
import { cn } from "@/lib/utils/cn";

export type BadgeVariant =
  "primary" | "secondary" | "success" | "warning" | "danger" | "outline" | "neutral";

export type BadgeSize = "sm" | "md" | "lg";

export interface BadgeProps {
  variant?: BadgeVariant;
  size?: BadgeSize;
  children: ReactNode;
  icon?: ReactNode;
  className?: string;
}

const variantStyles: Record<BadgeVariant, string> = {
  primary: "bg-primary-light text-primary border-primary/20 dark:bg-primary-light/20",
  secondary: "bg-secondary-light text-foreground border-secondary/30 dark:bg-secondary-light/30",
  success: "bg-success-light text-success border-success/20 dark:bg-success-light/20",
  warning: "bg-warning-light text-warning border-warning/20 dark:bg-warning-light/20",
  danger: "bg-danger-light text-danger border-danger/20 dark:bg-danger-light/20",
  neutral: "bg-surface text-muted border-border",
  outline: "bg-transparent text-foreground border-border-strong",
};

const sizeStyles: Record<BadgeSize, string> = {
  sm: "px-2 py-0.5 text-[11px] gap-1",
  md: "px-2.5 py-0.5 text-xs gap-1.5",
  lg: "px-3 py-1 text-sm gap-2",
};

export function Badge({ variant = "primary", size = "md", children, icon, className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center font-medium rounded-full border select-none transition-colors",
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
    >
      {icon && <span className="inline-flex shrink-0">{icon}</span>}
      <span>{children}</span>
    </span>
  );
}
