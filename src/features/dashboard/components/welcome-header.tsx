"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ROUTES } from "@/config/routes";
import { Sparkles, ArrowRight, UserCheck } from "lucide-react";
import type { AuthUser } from "@/types/auth";

interface WelcomeHeaderProps {
  user: AuthUser | null;
  profileCompletionPercentage: number;
}

export function WelcomeHeader({ user, profileCompletionPercentage }: WelcomeHeaderProps) {
  const firstName = user?.name ? user.name.trim().split(" ")[0] : "Sister";

  // Formatted date in English and Bengali
  const today = new Date();
  const englishDate = today.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <div className="relative overflow-hidden rounded-3xl border border-border/80 bg-gradient-to-br from-surface via-background to-primary-light/20 p-6 sm:p-8 shadow-xs">
      {/* Decorative background glow */}
      <div
        className="pointer-events-none absolute -top-24 -right-24 h-64 w-64 rounded-full bg-primary/10 blur-3xl"
        aria-hidden="true"
      />

      <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
        <div className="space-y-2 max-w-2xl">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-primary">
            <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
            <span>Member Workspace • {englishDate}</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground">
            Salam, {firstName}! Welcome to your Sisterhood Portal
          </h1>

          <p className="text-xs sm:text-sm text-muted leading-relaxed">
            Your centralized space to connect with Bangladeshi Muslim women entrepreneurs,
            explore learning cohorts, expand your business, and collaborate with purpose.
          </p>
        </div>

        {/* Quick Action CTAs */}
        <div className="flex flex-wrap items-center gap-3 shrink-0">
          {profileCompletionPercentage < 100 && (
            <Link href={ROUTES.member.profile}>
              <Button variant="primary" size="sm" className="gap-2 shadow-xs">
                <UserCheck className="h-4 w-4" />
                <span>Complete Profile ({profileCompletionPercentage}%)</span>
              </Button>
            </Link>
          )}

          <Link href={ROUTES.public.community}>
            <Button variant="outline" size="sm" className="gap-2 bg-background/80">
              <span>Explore Circles</span>
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

