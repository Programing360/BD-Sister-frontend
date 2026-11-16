"use client";

import { forwardRef, useId, type InputHTMLAttributes, type ReactNode } from "react";
import { cn } from "@/lib/utils/cn";

export interface SwitchProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "type" | "size"> {
  label?: ReactNode;
  description?: ReactNode;
  size?: "sm" | "md";
}

export const Switch = forwardRef<HTMLInputElement, SwitchProps>(
  ({ className, label, description, disabled, id, size = "md", ...props }, ref) => {
    const defaultId = useId();
    const generatedId = id ?? defaultId;

    const sizeTrack = size === "sm" ? "h-5 w-9" : "h-6 w-11";
    const sizeThumb =
      size === "sm"
        ? "h-3.5 w-3.5 translate-x-0.5 peer-checked:translate-x-4"
        : "h-4.5 w-4.5 translate-x-1 peer-checked:translate-x-5";

    return (
      <div className={cn("flex items-start gap-3", className)}>
        <div className="relative inline-flex items-center pt-0.5">
          <input
            ref={ref}
            id={generatedId}
            type="checkbox"
            disabled={disabled}
            className="peer sr-only"
            {...props}
          />
          <label
            htmlFor={generatedId}
            className={cn(
              "relative inline-flex items-center rounded-full bg-border transition-colors cursor-pointer",
              "peer-focus-visible:ring-2 peer-focus-visible:ring-primary peer-focus-visible:ring-offset-2",
              "peer-checked:bg-primary",
              "peer-disabled:cursor-not-allowed peer-disabled:opacity-50",
              sizeTrack
            )}
          >
            <span
              className={cn(
                "pointer-events-none inline-block rounded-full bg-white shadow-sm transition-transform duration-200 ease-in-out",
                sizeThumb
              )}
            />
          </label>
        </div>
        {(label || description) && (
          <div className="flex flex-col text-sm">
            {label && (
              <label
                htmlFor={generatedId}
                className={cn(
                  "font-medium text-foreground cursor-pointer select-none",
                  disabled && "cursor-not-allowed opacity-50"
                )}
              >
                {label}
              </label>
            )}
            {description && (
              <span className="text-xs text-muted leading-relaxed">{description}</span>
            )}
          </div>
        )}
      </div>
    );
  }
);

Switch.displayName = "Switch";
