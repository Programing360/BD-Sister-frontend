import { forwardRef, type HTMLAttributes } from "react";
import { cn } from "@/lib/utils/cn";

export interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  size?: "sm" | "md" | "lg" | "xl" | "full";
}

const sizeMap = {
  sm: "max-w-3xl",
  md: "max-w-5xl",
  lg: "max-w-7xl",
  xl: "max-w-[1440px]",
  full: "max-w-full",
};

export const MainContainer = forwardRef<HTMLDivElement, ContainerProps>(
  ({ className, size = "lg", ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("mx-auto w-full px-4 sm:px-6 lg:px-8", sizeMap[size], className)}
        {...props}
      />
    );
  }
);
MainContainer.displayName = "MainContainer";

export const Container = MainContainer;

export const PageContainer = forwardRef<HTMLDivElement, ContainerProps>(
  ({ className, size = "lg", ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "mx-auto w-full px-4 py-6 sm:px-6 sm:py-8 lg:px-8 lg:py-10",
          sizeMap[size],
          className
        )}
        {...props}
      />
    );
  }
);
PageContainer.displayName = "PageContainer";

export const SectionContainer = forwardRef<HTMLDivElement, ContainerProps>(
  ({ className, size = "lg", ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "mx-auto w-full px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-16",
          sizeMap[size],
          className
        )}
        {...props}
      />
    );
  }
);
SectionContainer.displayName = "SectionContainer";
