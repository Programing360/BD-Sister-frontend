import type { ReactNode } from "react";
import Link from "next/link";
import { PageHeader } from "@/components/layout/page-header";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ROUTES } from "@/config/routes";
import {
  ArrowLeft,
  Sparkles,
  type LucideIcon,
  CheckCircle2,
  Clock,
} from "lucide-react";

interface FeatureRoadmapItem {
  title: string;
  description: string;
}

interface PlaceholderPageProps {
  title: string;
  description: string;
  badgeText?: string;
  targetStep: string;
  icon: LucideIcon;
  roadmapItems?: FeatureRoadmapItem[];
  actions?: ReactNode;
}

export function PlaceholderPage({
  title,
  description,
  badgeText = "Upcoming Milestone",
  targetStep,
  icon: Icon,
  roadmapItems = [],
  actions,
}: PlaceholderPageProps) {
  return (
    <div className="space-y-6">
      <PageHeader
        title={title}
        description={description}
        actions={
          actions || (
            <Link href={ROUTES.member.dashboard}>
              <Button variant="outline" size="sm" className="gap-2">
                <ArrowLeft className="h-4 w-4" />
                <span>Return to Overview</span>
              </Button>
            </Link>
          )
        }
      />

      {/* Main Roadmap Card */}
      <Card className="rounded-3xl border border-border/80 bg-surface/40 p-6 sm:p-8">
        <CardContent className="p-0">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 border-b border-border/60 pb-6">
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary-light/70 text-primary dark:bg-primary-light/15">
                <Icon className="h-7 w-7" aria-hidden="true" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <Badge variant="secondary" size="sm" className="text-[11px] font-semibold">
                    <Clock className="h-3 w-3 mr-1" />
                    {badgeText}
                  </Badge>
                  <span className="text-xs font-mono text-muted">{targetStep}</span>
                </div>
                <h2 className="mt-1.5 text-xl font-bold text-foreground">{title} Architecture</h2>
              </div>
            </div>

            <Link href={ROUTES.member.dashboard}>
              <Button variant="primary" size="sm" className="gap-2">
                <Sparkles className="h-3.5 w-3.5" />
                <span>Back to Dashboard</span>
              </Button>
            </Link>
          </div>

          {/* Explanation */}
          <div className="pt-6">
            <h3 className="text-sm font-bold text-foreground">What to Expect in This Module</h3>
            <p className="mt-1 text-xs text-muted leading-relaxed max-w-2xl">
              This section is actively provisioned in the BDSisters.org roadmap. The navigation,
              session authentication, responsive shell, and permissions foundation are fully established
              in Step 5.
            </p>

            {roadmapItems.length > 0 && (
              <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                {roadmapItems.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-3 rounded-2xl border border-border/60 bg-background p-4"
                  >
                    <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-xs font-bold text-foreground">{item.title}</h4>
                      <p className="mt-0.5 text-[11px] text-muted leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

