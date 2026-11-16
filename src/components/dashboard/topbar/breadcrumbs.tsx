"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight, Home } from "lucide-react";
import { ROUTES } from "@/config/routes";

const ROUTE_LABELS: Record<string, string> = {
  dashboard: "Overview",
  profile: "My Profile",
  "my-business": "My Business",
  business: "My Business",
  community: "Community Circles",
  marketplace: "Sister Marketplace",
  learning: "Learning Tracks",
  events: "Events & Workshops",
  messages: "Messages",
  notifications: "Notifications",
  settings: "Account Settings",
};

export function DashboardBreadcrumbs() {
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);

  return (
    <nav aria-label="Breadcrumb" className="hidden sm:flex items-center gap-1.5 text-xs text-muted">
      <Link
        href={ROUTES.member.dashboard}
        className="flex items-center gap-1 text-muted hover:text-foreground transition-colors"
      >
        <Home className="h-3.5 w-3.5" aria-hidden="true" />
        <span className="sr-only">Home</span>
      </Link>

      {segments.map((segment, index) => {
        const isLast = index === segments.length - 1;
        const segmentPath = `/${segments.slice(0, index + 1).join("/")}`;
        const label = ROUTE_LABELS[segment] || segment.replace(/-/g, " ");

        return (
          <div key={segmentPath} className="flex items-center gap-1.5">
            <ChevronRight className="h-3.5 w-3.5 text-border shrink-0" aria-hidden="true" />
            {isLast ? (
              <span className="font-semibold text-foreground capitalize" aria-current="page">
                {label}
              </span>
            ) : (
              <Link
                href={segmentPath}
                className="hover:text-foreground capitalize transition-colors"
              >
                {label}
              </Link>
            )}
          </div>
        );
      })}
    </nav>
  );
}

