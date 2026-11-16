"use client";

import { StatCard } from "@/components/ui/stat-card";
import { Eye, Users, Briefcase, Calendar } from "lucide-react";
import type { DashboardStatItem } from "../types";

interface OverviewStatsProps {
  stats: DashboardStatItem[];
  isLoading?: boolean;
}

const ICON_MAP: Record<string, typeof Eye> = {
  Eye,
  Users,
  Briefcase,
  Calendar,
};

export function OverviewStats({ stats, isLoading = false }: OverviewStatsProps) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="h-32 rounded-2xl border border-border/70 bg-surface/40 p-6 animate-pulse"
          />
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-bold uppercase tracking-wider text-muted">
          Workspace Overview
        </h2>
        <span className="text-[11px] text-muted font-medium">
          Live Account Telemetry
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => {
          const Icon = ICON_MAP[stat.iconName] || Users;

          return (
            <StatCard
              key={stat.id}
              label={stat.label}
              value={stat.value}
              trend={stat.trend}
              description={stat.description}
              icon={<Icon className="h-4 w-4" />}
              className="rounded-2xl border-border/80 bg-surface/50 shadow-xs hover:border-primary/30 transition-colors"
            />
          );
        })}
      </div>
    </div>
  );
}

