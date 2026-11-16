import type { ReactNode } from "react";
import { cn } from "@/lib/utils/cn";

interface DashboardPageContainerProps {
  children: ReactNode;
  className?: string;
  maxWidth?: "default" | "full" | "narrow";
}

export function DashboardPageContainer({
  children,
  className,
  maxWidth = "default",
}: DashboardPageContainerProps) {
  const maxWidthClass = {
    default: "max-w-7xl",
    full: "max-w-full",
    narrow: "max-w-4xl",
  }[maxWidth];

  return (
    <div className={cn("w-full mx-auto p-4 sm:p-6 lg:p-8", maxWidthClass, className)}>
      {children}
    </div>
  );
}

