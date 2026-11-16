"use client";

import Link from "next/link";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ROUTES } from "@/config/routes";
import {
  ShieldCheck,
  AlertCircle,
  MapPin,
  Briefcase,
  Calendar,
  Sparkles,
  ArrowRight,
} from "lucide-react";
import type { AuthUser } from "@/types/auth";
import type { ProfileCompletionData } from "../types";

interface MemberProfileSummaryProps {
  user: AuthUser | null;
  completionData?: ProfileCompletionData;
  className?: string;
}

export function MemberProfileSummary({
  user,
  completionData,
  className,
}: MemberProfileSummaryProps) {
  const displayName = user?.name || "Sister Member";
  const displayEmail = user?.email || "member@bdsisters.org";
  const roleName = user?.role ? String(user.role).replace(/_/g, " ") : "Member";

  const joinDate = (() => {
    if (!user?.createdAt) return "Joined BDSisters";
    try {
      return new Date(user.createdAt).toLocaleDateString("en-US", {
        month: "long",
        year: "numeric",
      });
    } catch {
      return "Joined BDSisters";
    }
  })();

  return (
    <Card className={`rounded-3xl border border-border/80 bg-surface/40 p-6 shadow-xs ${className || ""}`}>
      <CardContent className="p-0">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          {/* Avatar & Identifiers */}
          <div className="flex items-center gap-4">
            <Avatar
              src={user?.image}
              name={displayName}
              size="lg"
              className="border-2 border-primary/20 shadow-xs"
            />
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="text-base sm:text-lg font-bold text-foreground">{displayName}</h2>
                <Badge variant="primary" size="sm" className="capitalize text-[10px]">
                  <Sparkles className="h-2.5 w-2.5 mr-0.5" />
                  {roleName}
                </Badge>
                {user?.emailVerified ? (
                  <Badge variant="success" size="sm" className="text-[10px] gap-1">
                    <ShieldCheck className="h-3 w-3" />
                    Verified Sister
                  </Badge>
                ) : (
                  <Badge variant="warning" size="sm" className="text-[10px] gap-1">
                    <AlertCircle className="h-3 w-3" />
                    Verification Pending
                  </Badge>
                )}
              </div>

              <p className="mt-0.5 text-xs text-muted">{displayEmail}</p>

              {/* Sub-meta: Role, Location, Join Date */}
              <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted">
                <span className="flex items-center gap-1">
                  <Briefcase className="h-3.5 w-3.5 text-primary" />
                  <span>Member Identity</span>
                </span>
                <span className="flex items-center gap-1">
                  <MapPin className="h-3.5 w-3.5" />
                  <span>Bangladesh</span>
                </span>
                <span className="flex items-center gap-1">
                  <Calendar className="h-3.5 w-3.5" />
                  <span>Sister since {joinDate}</span>
                </span>
              </div>
            </div>
          </div>

          {/* Profile CTA */}
          <div className="flex flex-col sm:items-end gap-2 shrink-0">
            {completionData && (
              <div className="flex items-center gap-2">
                <div className="text-right">
                  <p className="text-[11px] text-muted font-medium">Profile Score</p>
                  <p className="text-xs font-bold text-primary">{completionData.percentage}% Complete</p>
                </div>
                <div className="h-8 w-8 rounded-full border-2 border-primary/30 flex items-center justify-center text-[10px] font-bold text-primary">
                  {completionData.percentage}%
                </div>
              </div>
            )}

            <Link href={ROUTES.member.profile}>
              <Button variant="outline" size="sm" className="gap-1.5 text-xs">
                <span>View Full Profile</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Button>
            </Link>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

