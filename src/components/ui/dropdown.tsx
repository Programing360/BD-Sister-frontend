"use client";

import { useState, useRef, useEffect, type ReactNode } from "react";
import { cn } from "@/lib/utils/cn";

export interface DropdownItem {
  id: string;
  label: string;
  icon?: ReactNode;
  disabled?: boolean;
  destructive?: boolean;
  onClick: () => void;
}

export interface DropdownProps {
  trigger: ReactNode;
  items: (DropdownItem | { type: "divider" })[];
  align?: "left" | "right";
  className?: string;
}

export function Dropdown({ trigger, items, align = "right", className }: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleEscape);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen]);

  return (
    <div ref={containerRef} className="relative inline-block text-left">
      <div onClick={() => setIsOpen(!isOpen)}>{trigger}</div>

      {isOpen && (
        <div
          role="menu"
          aria-orientation="vertical"
          className={cn(
            "absolute z-50 mt-2 min-w-[180px] rounded-lg border border-border bg-background p-1.5 shadow-dropdown animate-in fade-in-0 zoom-in-95 duration-150",
            align === "right" ? "right-0" : "left-0",
            className
          )}
        >
          {items.map((item, index) => {
            if ("type" in item && item.type === "divider") {
              return <div key={`div-${index}`} className="my-1 border-t border-border" />;
            }

            const dropdownItem = item as DropdownItem;
            return (
              <button
                key={dropdownItem.id}
                role="menuitem"
                disabled={dropdownItem.disabled}
                onClick={() => {
                  dropdownItem.onClick();
                  setIsOpen(false);
                }}
                className={cn(
                  "flex w-full items-center gap-2.5 rounded-md px-3 py-2 text-xs font-medium transition-colors select-none",
                  dropdownItem.destructive
                    ? "text-danger hover:bg-danger-light/50 active:bg-danger-light"
                    : "text-foreground hover:bg-surface active:bg-surface-raised",
                  dropdownItem.disabled && "cursor-not-allowed opacity-50"
                )}
              >
                {dropdownItem.icon && (
                  <span className="shrink-0 text-muted">{dropdownItem.icon}</span>
                )}
                <span>{dropdownItem.label}</span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
