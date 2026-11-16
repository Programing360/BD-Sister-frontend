import type { ReactNode } from "react";
import { cn } from "@/lib/utils/cn";
import { Card, CardContent } from "./card";
import { TrendingUp, TrendingDown } from "lucide-react";

export interface StatCardProps {
  label: string;
  value: string | number;
  icon?: ReactNode;
  trend?: {
    value: number;
    isPositive: boolean;
    label?: string;
  };
  description?: string;
  className?: string;
}

export function StatCard({ label, value, icon, trend, description, className }: StatCardProps) {
  return (
    <Card className={cn("overflow-hidden", className)}>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <p className="text-xs font-semibold uppercase tracking-wider text-muted">{label}</p>
          {icon && (
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary-light text-primary dark:bg-primary-light/20">
              {icon}
            </div>
          )}
        </div>

        <div className="mt-3 flex items-baseline gap-2">
          <span className="text-2xl font-bold tracking-tight text-foreground">{value}</span>
          {trend && (
            <span
              className={cn(
                "inline-flex items-center text-xs font-semibold gap-0.5",
                trend.isPositive ? "text-success" : "text-danger"
              )}
            >
              {trend.isPositive ? (
                <TrendingUp className="h-3.5 w-3.5" aria-hidden="true" />
              ) : (
                <TrendingDown className="h-3.5 w-3.5" aria-hidden="true" />
              )}
              <span>{trend.value > 0 ? `+${trend.value}%` : `${trend.value}%`}</span>
            </span>
          )}
        </div>

        {(trend?.label || description) && (
          <p className="mt-1 text-xs text-muted">{trend?.label ?? description}</p>
        )}
      </CardContent>
    </Card>
  );
}
