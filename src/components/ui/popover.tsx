"use client";

import { useState, useRef, useEffect, type ReactNode } from "react";
import { cn } from "@/lib/utils/cn";

export interface PopoverProps {
  trigger: ReactNode;
  content: ReactNode;
  align?: "left" | "right" | "center";
  className?: string;
}

export function Popover({ trigger, content, align = "center", className }: PopoverProps) {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  const alignStyles = {
    left: "left-0",
    right: "right-0",
    center: "left-1/2 -translate-x-1/2",
  };

  return (
    <div ref={ref} className="relative inline-block">
      <div onClick={() => setIsOpen(!isOpen)}>{trigger}</div>
      {isOpen && (
        <div
          className={cn(
            "absolute z-50 mt-2 rounded-xl border border-border bg-background p-4 shadow-dropdown animate-in fade-in-0 zoom-in-95 duration-150",
            alignStyles[align],
            className
          )}
        >
          {content}
        </div>
      )}
    </div>
  );
}
