"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils/cn";
import { MAIN_DASHBOARD_NAV_ITEMS, type DashboardNavItem } from "../navigation/dashboard-nav-items";
import { Badge } from "@/components/ui/badge";

interface SidebarNavProps {
  collapsed?: boolean;
  onItemClick?: () => void;
}

export function SidebarNav({ collapsed = false, onItemClick }: SidebarNavProps) {
  const pathname = usePathname();

  const isItemActive = (item: DashboardNavItem) => {
    if (item.href === "/dashboard") {
      return pathname === "/dashboard";
    }
    return pathname === item.href || pathname.startsWith(`${item.href}/`);
  };

  return (
    <nav className="flex flex-col gap-1 px-3" aria-label="Dashboard Main Navigation">
      {!collapsed && (
        <span className="px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-muted">
          Platform Workspace
        </span>
      )}

      {MAIN_DASHBOARD_NAV_ITEMS.map((item) => {
        const active = isItemActive(item);
        const Icon = item.icon;

        return (
          <Link
            key={item.id}
            href={item.href}
            onClick={onItemClick}
            title={collapsed ? item.title : undefined}
            aria-current={active ? "page" : undefined}
            className={cn(
              "group relative flex items-center rounded-xl transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-primary/20",
              collapsed ? "h-11 w-11 justify-center mx-auto" : "gap-3 px-3.5 py-2.5 text-xs font-medium",
              active
                ? "bg-primary text-white shadow-xs font-semibold"
                : "text-muted hover:bg-surface hover:text-foreground"
            )}
          >
            <Icon
              className={cn(
                "h-4 w-4 shrink-0 transition-transform duration-150 group-hover:scale-105",
                active ? "text-white" : "text-muted group-hover:text-foreground"
              )}
              aria-hidden="true"
            />

            {!collapsed && (
              <>
                <span className="flex-1 truncate">{item.title}</span>
                {item.badge !== undefined && (
                  <Badge
                    size="sm"
                    variant={active ? "primary" : "secondary"}
                    className={cn(
                      "text-[10px] px-1.5 py-0",
                      active ? "bg-white/20 text-white border-0" : ""
                    )}
                  >
                    {item.badge}
                  </Badge>
                )}
                {item.comingSoon && (
                  <span className="text-[10px] text-muted uppercase tracking-wider">Soon</span>
                )}
              </>
            )}
          </Link>
        );
      })}
    </nav>
  );
}
