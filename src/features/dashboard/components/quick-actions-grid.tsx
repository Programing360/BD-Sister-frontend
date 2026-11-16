"use client";

import Link from "next/link";
import { ROUTES } from "@/config/routes";
import {
  User,
  Users,
  Store,
  GraduationCap,
  Calendar,
  ShoppingBag,
  ArrowUpRight,
} from "lucide-react";

const QUICK_ACTIONS = [
  {
    id: "profile",
    title: "Member Profile",
    description: "Update your identity, professional bio, and contact preferences.",
    href: ROUTES.member.profile,
    icon: User,
    color: "bg-purple-100 text-purple-700 dark:bg-purple-950/40 dark:text-purple-400",
  },
  {
    id: "community",
    title: "Community Circles",
    description: "Discover regional cohorts, interest circles, and sisterhood discussions.",
    href: ROUTES.public.community,
    icon: Users,
    color: "bg-rose-100 text-rose-700 dark:bg-rose-950/40 dark:text-rose-400",
  },
  {
    id: "business",
    title: "Register Business",
    description: "List your enterprise in Bangladesh's verified women business directory.",
    href: ROUTES.member.myBusiness,
    icon: Store,
    color: "bg-emerald-100 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400",
  },
  {
    id: "learning",
    title: "Learning Tracks",
    description: "Master digital commerce, freelancing, and financial literacy.",
    href: ROUTES.public.learning,
    icon: GraduationCap,
    color: "bg-amber-100 text-amber-700 dark:bg-amber-950/40 dark:text-amber-400",
  },
  {
    id: "events",
    title: "Workshops & Events",
    description: "RSVP to webinars, networking meetups, and live masterclasses.",
    href: ROUTES.public.events,
    icon: Calendar,
    color: "bg-blue-100 text-blue-700 dark:bg-blue-950/40 dark:text-blue-400",
  },
  {
    id: "marketplace",
    title: "Sister Marketplace",
    description: "Browse modest fashion, halal crafts, baked goods, and creative services.",
    href: ROUTES.public.marketplace,
    icon: ShoppingBag,
    color: "bg-indigo-100 text-indigo-700 dark:bg-indigo-950/40 dark:text-indigo-400",
  },
];

export function QuickActionsGrid() {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-bold uppercase tracking-wider text-muted">
          Quick Actions
        </h2>
        <span className="text-[11px] text-muted font-medium">
          Workspace Shortcuts
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
        {QUICK_ACTIONS.map((action) => {
          const Icon = action.icon;

          return (
            <Link
              key={action.id}
              href={action.href}
              className="group relative flex flex-col justify-between rounded-2xl border border-border/80 bg-surface/40 p-4 transition-all duration-150 hover:border-primary/40 hover:bg-surface hover:shadow-xs focus:outline-none focus:ring-2 focus:ring-primary/20"
            >
              <div>
                <div className="flex items-center justify-between">
                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded-xl ${action.color} transition-transform duration-150 group-hover:scale-105`}
                  >
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <ArrowUpRight
                    className="h-4 w-4 text-muted transition-transform duration-150 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-primary"
                    aria-hidden="true"
                  />
                </div>

                <h3 className="mt-3 text-sm font-bold text-foreground group-hover:text-primary transition-colors">
                  {action.title}
                </h3>
                <p className="mt-1 text-xs text-muted leading-relaxed">
                  {action.description}
                </p>
              </div>

              <div className="mt-4 pt-2 border-t border-border/50 text-[11px] font-semibold text-primary">
                Open section →
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

