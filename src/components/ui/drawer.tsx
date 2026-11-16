"use client";

import { useEffect, type ReactNode } from "react";
import { cn } from "@/lib/utils/cn";
import { X } from "lucide-react";
import { Button } from "./button";

export interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  children: ReactNode;
  footer?: ReactNode;
  position?: "left" | "right";
  className?: string;
}

export function Drawer({
  isOpen,
  onClose,
  title,
  description,
  children,
  footer,
  position = "right",
  className,
}: DrawerProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby={title ? "drawer-title" : undefined}
      className="fixed inset-0 z-50 flex"
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity animate-in fade-in-0"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer Panel */}
      <div
        className={cn(
          "relative z-50 flex h-full w-full max-w-md flex-col border-border bg-background p-6 shadow-modal",
          "animate-in duration-300 ease-in-out",
          position === "right"
            ? "ml-auto border-l slide-in-from-right"
            : "mr-auto border-r slide-in-from-left",
          className
        )}
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            {title && (
              <h2 id="drawer-title" className="text-lg font-semibold text-foreground">
                {title}
              </h2>
            )}
            {description && <p className="mt-1 text-sm text-muted">{description}</p>}
          </div>
          <Button
            variant="ghost"
            size="icon-sm"
            onClick={onClose}
            aria-label="Close drawer"
            className="text-muted hover:text-foreground shrink-0"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        <div className="mt-6 flex-1 overflow-y-auto">{children}</div>

        {footer && (
          <div className="mt-6 border-t border-border pt-4 flex items-center justify-end gap-3">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
}
