import type { ReactNode } from "react";
import { cn } from "@/lib/utils/cn";

export interface DividerProps {
  orientation?: "horizontal" | "vertical";
  label?: ReactNode;
  className?: string;
}

export function Divider({ orientation = "horizontal", label, className }: DividerProps) {
  if (orientation === "vertical") {
    return (
      <div
        role="separator"
        aria-orientation="vertical"
        className={cn("inline-block h-full min-h-[1em] w-px bg-border", className)}
      />
    );
  }

  if (label) {
    return (
      <div
        role="separator"
        aria-orientation="horizontal"
        className={cn("relative my-4 flex items-center justify-center", className)}
      >
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-border" />
        </div>
        <span className="relative bg-background px-3 text-xs uppercase tracking-wider text-muted select-none">
          {label}
        </span>
      </div>
    );
  }

  return <hr className={cn("my-4 border-0 border-t border-border", className)} role="separator" />;
}
