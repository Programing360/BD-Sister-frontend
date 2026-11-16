import { forwardRef, type HTMLAttributes } from "react";
import { cn } from "@/lib/utils/cn";

export interface SectionProps extends HTMLAttributes<HTMLElement> {
  spacing?: "sm" | "md" | "lg" | "none";
  surface?: "default" | "muted" | "brand";
}

const spacingMap = {
  sm: "py-6 sm:py-8",
  md: "py-10 sm:py-16",
  lg: "py-16 sm:py-24",
  none: "py-0",
};

const surfaceMap = {
  default: "bg-background text-foreground",
  muted: "bg-surface text-foreground",
  brand: "bg-primary-light/40 text-foreground dark:bg-primary-light/10",
};

export const Section = forwardRef<HTMLElement, SectionProps>(
  ({ className, spacing = "md", surface = "default", ...props }, ref) => {
    return (
      <section
        ref={ref}
        className={cn(
          "w-full transition-colors",
          spacingMap[spacing],
          surfaceMap[surface],
          className
        )}
        {...props}
      />
    );
  }
);
Section.displayName = "Section";
