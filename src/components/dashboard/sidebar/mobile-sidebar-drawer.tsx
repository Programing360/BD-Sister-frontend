"use client";

import { useEffect } from "react";
import { useUIStore } from "@/store/use-ui-store";
import { BrandLogo } from "@/components/shared/brand-logo";
import { SidebarNav } from "./sidebar-nav";
import { SidebarAccountNav } from "./sidebar-account-nav";
import { ROUTES } from "@/config/routes";
import { X, Sparkles } from "lucide-react";

export function MobileSidebarDrawer() {
  const isMobileSidebarOpen = useUIStore((state) => state.isMobileSidebarOpen);
  const setMobileSidebarOpen = useUIStore((state) => state.setMobileSidebarOpen);

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape" && isMobileSidebarOpen) {
        setMobileSidebarOpen(false);
      }
    }

    if (isMobileSidebarOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isMobileSidebarOpen, setMobileSidebarOpen]);

  if (!isMobileSidebarOpen) return null;

  return (
    <div className="fixed inset-0 z-50 md:hidden" role="dialog" aria-modal="true" aria-label="Mobile Navigation">
      {/* Backdrop */}
      <div
        onClick={() => setMobileSidebarOpen(false)}
        className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity duration-200"
        aria-hidden="true"
      />

      {/* Drawer Container */}
      <div className="fixed inset-y-0 left-0 flex w-72 max-w-[85vw] flex-col bg-background shadow-2xl animate-in slide-in-from-left duration-200 border-r border-border">
        {/* Header */}
        <div className="flex h-16 items-center justify-between px-5 border-b border-border/80">
          <div className="flex items-center gap-2">
            <BrandLogo size="sm" showTagline={false} href={ROUTES.member.dashboard} />
            <span className="inline-flex items-center gap-1 rounded-full bg-primary-light/60 px-2 py-0.5 text-[10px] font-bold text-primary dark:bg-primary-light/15 dark:text-primary-light">
              <Sparkles className="h-2.5 w-2.5" />
              Member
            </span>
          </div>
          <button
            type="button"
            onClick={() => setMobileSidebarOpen(false)}
            aria-label="Close navigation sidebar"
            className="flex h-8 w-8 items-center justify-center rounded-lg text-muted hover:text-foreground hover:bg-surface focus:outline-none focus:ring-2 focus:ring-primary/20"
          >
            <X className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>

        {/* Scrollable Navigation */}
        <div className="flex-1 overflow-y-auto py-4 scrollbar-thin">
          <SidebarNav onItemClick={() => setMobileSidebarOpen(false)} />
        </div>

        {/* Account Nav (Pinned) */}
        <div className="pb-4">
          <SidebarAccountNav onItemClick={() => setMobileSidebarOpen(false)} />
        </div>
      </div>
    </div>
  );
}

