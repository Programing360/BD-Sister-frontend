"use client";

import Link from "next/link";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Megaphone, ArrowRight } from "lucide-react";
import type { AnnouncementItem } from "../types";

interface AnnouncementsWidgetProps {
  announcements: AnnouncementItem[];
}

export function AnnouncementsWidget({ announcements }: AnnouncementsWidgetProps) {
  return (
    <Card className="rounded-3xl border border-border/80 bg-surface/40 p-6 shadow-xs">
      <CardHeader className="p-0 pb-4 border-b border-border/60">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Megaphone className="h-4 w-4 text-primary" aria-hidden="true" />
            <CardTitle className="text-sm font-bold text-foreground">
              Official Platform Announcements
            </CardTitle>
          </div>
          <Badge variant="secondary" size="sm" className="text-[10px]">
            BDSisters HQ
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="p-0 pt-4 space-y-3">
        {announcements.map((ann) => (
          <div
            key={ann.id}
            className="rounded-2xl border border-border/70 bg-background/80 p-4 transition-all hover:border-primary/40 hover:shadow-xs"
          >
            <div className="flex items-center justify-between gap-2 mb-1">
              <div className="flex items-center gap-2">
                <Badge
                  variant={ann.priority === "important" ? "primary" : "secondary"}
                  size="sm"
                  className="text-[10px]"
                >
                  {ann.priority === "important" ? "Notice" : "Update"}
                </Badge>
                <h3 className="text-xs font-bold text-foreground">{ann.title}</h3>
              </div>
              <span className="text-[10px] text-muted shrink-0">{ann.date}</span>
            </div>

            <p className="mt-1 text-xs text-muted leading-relaxed">{ann.content}</p>

            {ann.actionUrl && (
              <div className="mt-2.5 pt-2 border-t border-border/50">
                <Link
                  href={ann.actionUrl}
                  className="inline-flex items-center gap-1 text-[11px] font-semibold text-primary hover:underline"
                >
                  <span>{ann.actionText || "Read details"}</span>
                  <ArrowRight className="h-3 w-3" />
                </Link>
              </div>
            )}
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

