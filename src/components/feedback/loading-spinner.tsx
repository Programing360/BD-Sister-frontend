import { cn } from "@/lib/utils/cn";
import { Loader2 } from "lucide-react";

export type SpinnerSize = "xs" | "sm" | "md" | "lg" | "xl";

export interface LoadingSpinnerProps {
  size?: SpinnerSize;
  className?: string;
  label?: string;
}

const sizeMap: Record<SpinnerSize, string> = {
  xs: "h-3.5 w-3.5",
  sm: "h-4 w-4",
  md: "h-6 w-6",
  lg: "h-8 w-8",
  xl: "h-12 w-12",
};

export function LoadingSpinner({
  size = "md",
  className,
  label = "Loading...",
}: LoadingSpinnerProps) {
  return (
    <div
      role="status"
      aria-label={label}
      className="inline-flex items-center justify-center text-primary"
    >
      <Loader2 className={cn("animate-spin", sizeMap[size], className)} />
      <span className="sr-only">{label}</span>
    </div>
  );
}
