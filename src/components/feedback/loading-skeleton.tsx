import { cn } from "@/lib/utils/cn";

export interface LoadingSkeletonProps {
  className?: string;
  variant?: "rectangular" | "circular" | "rounded";
}

export function LoadingSkeleton({ className, variant = "rounded" }: LoadingSkeletonProps) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "animate-pulse bg-muted-light/25 dark:bg-muted/20",
        variant === "circular" && "rounded-full",
        variant === "rounded" && "rounded-md",
        variant === "rectangular" && "rounded-none",
        className
      )}
    />
  );
}
