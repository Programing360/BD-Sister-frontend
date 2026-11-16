"use client";

import Link from "next/link";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ShieldCheck, Mail, Users, Store, Calendar, ArrowRight, Clock } from "lucide-react";
import type { ActivityItem } from "../types";
import { formatDistanceToNow } from "date-fns";

interface RecentActivitySectionProps {
  activities: ActivityItem[];
}

const ICON_MAP: Record<string, typeof ShieldCheck> = {
  ShieldCheck,
  Mail,
  Users,
  Store,
  Calendar,
};

export function RecentActivitySection({ activities }: RecentActivitySectionProps) {
  return (
    <Card className="rounded-3xl border border-border/80 bg-surface/40 p-6 shadow-xs">
      <CardHeader className="p-0 pb-4 border-b border-border/60">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-primary" aria-hidden="true" />
            <CardTitle className="text-sm font-bold text-foreground">
              Recent Account Activity
            </CardTitle>
          </div>
          <Badge variant="secondary" size="sm" className="text-[10px]">
            Live Timeline
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="p-0 pt-4">
        {activities.length === 0 ? (
          <div className="py-8 text-center text-xs text-muted">
            No recent activity recorded yet. Engage in community circles or register your business to see your timeline grow.
          </div>
        ) : (
          <div className="relative pl-6 space-y-5 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-[1px] before:bg-border/80">
            {activities.map((act) => {
              const Icon = ICON_MAP[act.iconName] || ShieldCheck;
              const formattedTime = (() => {
                try {
                  return formatDistanceToNow(new Date(act.timestamp), { addSuffix: true });
                } catch {
                  return "recently";
                }
              })();

              return (
                <div key={act.id} className="relative group">
                  {/* Timeline Node Dot */}
                  <div className="absolute -left-[19px] top-1 flex h-4 w-4 items-center justify-center rounded-full bg-background border-2 border-primary text-primary">
                    <Icon className="h-2 w-2 text-primary" aria-hidden="true" />
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                    <p className="text-xs font-bold text-foreground">{act.title}</p>
                    <span className="text-[10px] text-muted">{formattedTime}</span>
                  </div>

                  <p className="mt-0.5 text-xs text-muted leading-relaxed">{act.description}</p>

                  {act.actionUrl && (
                    <Link
                      href={act.actionUrl}
                      className="mt-1.5 inline-flex items-center gap-1 text-[11px] font-semibold text-primary hover:underline"
                    >
                      <span>Action required</span>
                      <ArrowRight className="h-3 w-3" />
                    </Link>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
