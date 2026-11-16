import type { ReactNode } from "react";
import { cn } from "@/lib/utils/cn";
import { FolderOpen } from "lucide-react";

export interface EmptyStateProps {
  icon?: ReactNode;
  title: string;
  description?: string;
  action?: ReactNode;
  className?: string;
}

export function EmptyState({ icon, title, description, action, className }: EmptyStateProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center rounded-xl border border-dashed border-border p-8 text-center",
        "bg-surface/50",
        className
      )}
    >
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary-light text-primary dark:bg-primary-light/30">
        {icon ?? <FolderOpen className="h-6 w-6" aria-hidden="true" />}
      </div>
      <h3 className="mt-4 text-base font-semibold text-foreground">{title}</h3>
      {description && <p className="mt-1.5 max-w-sm text-sm text-muted">{description}</p>}
      {action && <div className="mt-5">{action}</div>}
    </div>
  );
}
