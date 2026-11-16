"use client";

import Link from "next/link";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ROUTES } from "@/config/routes";
import { CheckCircle2, Circle, ArrowRight, Sparkles } from "lucide-react";
import type { ProfileCompletionData } from "../types";

interface ProfileCompletionCardProps {
  data: ProfileCompletionData;
}

export function ProfileCompletionCard({ data }: ProfileCompletionCardProps) {
  const { percentage, completedCount, totalCount, items } = data;

  if (percentage >= 100) {
    return null; // All done!
  }

  return (
    <Card className="rounded-3xl border border-border/80 bg-surface/40 p-6 shadow-xs">
      <CardHeader className="p-0 mb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-primary-light/70 text-primary dark:bg-primary-light/15">
              <Sparkles className="h-4 w-4" />
            </div>
            <div>
              <CardTitle className="text-sm font-bold text-foreground">
                Profile Completion ({percentage}%)
              </CardTitle>
              <CardDescription className="text-xs text-muted">
                {completedCount} of {totalCount} initial profile steps completed
              </CardDescription>
            </div>
          </div>

          <Link href={ROUTES.member.profile}>
            <Button variant="ghost" size="sm" className="text-xs text-primary gap-1">
              <span>View Profile</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Button>
          </Link>
        </div>

        {/* Progress Bar */}
        <div className="mt-4 h-2 w-full overflow-hidden rounded-full bg-border/80">
          <div
            className="h-full rounded-full bg-primary transition-all duration-500 ease-out"
            style={{ width: `${percentage}%` }}
            role="progressbar"
            aria-valuenow={percentage}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label={`Profile completion ${percentage}%`}
          />
        </div>
      </CardHeader>

      <CardContent className="p-0">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 pt-2">
          {items.map((item) => (
            <div
              key={item.id}
              className={`flex items-start gap-2.5 rounded-2xl p-3 border text-xs transition-colors ${
                item.completed
                  ? "border-border/60 bg-background/50 text-muted"
                  : "border-primary/30 bg-primary-light/10 text-foreground"
              }`}
            >
              {item.completed ? (
                <CheckCircle2 className="h-4 w-4 text-success shrink-0 mt-0.5" aria-hidden="true" />
              ) : (
                <Circle className="h-4 w-4 text-primary shrink-0 mt-0.5" aria-hidden="true" />
              )}
              <div className="min-w-0">
                <p className={`font-semibold ${item.completed ? "line-through text-muted" : "text-foreground"}`}>
                  {item.label}
                </p>
                <p className="text-[11px] text-muted line-clamp-1 mt-0.5">{item.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4 flex items-center justify-between border-t border-border/60 pt-3 text-[11px] text-muted">
          <span>Complete your identity to unlock business directory features in Step 6.</span>
          <Link href={ROUTES.member.profile} className="font-semibold text-primary hover:underline">
            Complete now →
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}

