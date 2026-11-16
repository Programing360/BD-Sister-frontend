"use client";

import Link from "next/link";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Sparkles, ArrowRight, Award } from "lucide-react";
import type { RecommendationItem } from "../types";

interface RecommendedOpportunitiesProps {
  opportunities: RecommendationItem[];
}

export function RecommendedOpportunities({ opportunities }: RecommendedOpportunitiesProps) {
  return (
    <Card className="rounded-3xl border border-border/80 bg-surface/40 p-6 shadow-xs flex flex-col justify-between">
      <div>
        <CardHeader className="p-0 pb-4 border-b border-border/60">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-primary" aria-hidden="true" />
              <CardTitle className="text-sm font-bold text-foreground">
                Recommended Opportunities
              </CardTitle>
            </div>
            <span className="text-[10px] text-muted font-medium">Curated Cohorts</span>
          </div>
        </CardHeader>

        <CardContent className="p-0 pt-4 space-y-3.5">
          {opportunities.map((opp) => (
            <div
              key={opp.id}
              className="group rounded-2xl border border-border/70 bg-background/80 p-3.5 transition-all hover:border-primary/40 hover:shadow-xs"
            >
              <div className="flex items-center justify-between gap-2 mb-1.5">
                <Badge variant="primary" size="sm" className="text-[10px]">
                  {opp.category}
                </Badge>
                {opp.badge && (
                  <span className="flex items-center gap-1 text-[10px] font-semibold text-primary">
                    <Award className="h-3 w-3" />
                    {opp.badge}
                  </span>
                )}
              </div>

              <h3 className="text-xs font-bold text-foreground group-hover:text-primary transition-colors">
                {opp.title}
              </h3>

              <p className="mt-1 text-xs text-muted leading-relaxed line-clamp-2">
                {opp.description}
              </p>

              <div className="mt-2.5 flex items-center justify-between pt-2 border-t border-border/50 text-[11px]">
                <span className="text-muted line-clamp-1">{opp.benefit}</span>
                <Link
                  href={opp.ctaUrl}
                  className="font-semibold text-primary hover:underline shrink-0 flex items-center gap-0.5"
                >
                  <span>{opp.ctaText}</span>
                  <ArrowRight className="h-3 w-3" />
                </Link>
              </div>
            </div>
          ))}
        </CardContent>
      </div>

      <div className="pt-4 mt-2 border-t border-border/60 text-center">
        <p className="text-[11px] text-muted">
          AI-assisted opportunity matching will be activated in upcoming platform upgrades.
        </p>
      </div>
    </Card>
  );
}
