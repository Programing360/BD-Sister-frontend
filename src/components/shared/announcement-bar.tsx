"use client";

import { useState } from "react";
import Link from "next/link";
import { ROUTES } from "@/config/routes";
import { Sparkles, X } from "lucide-react";

export function AnnouncementBar() {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="relative isolate flex items-center justify-between gap-x-4 overflow-hidden bg-primary px-4 py-2 text-xs font-medium text-white sm:px-6">
      <div className="flex flex-1 items-center justify-center gap-2 text-center">
        <Sparkles className="hidden h-3.5 w-3.5 shrink-0 sm:inline" aria-hidden="true" />
        <span>
          Welcome to <strong className="font-semibold">BDSisters.org</strong> — Empowering
          Bangladeshi women in business, community, and leadership.
        </span>
        <Link
          href={ROUTES.public.community}
          className="ml-2 inline-flex items-center underline underline-offset-2 hover:opacity-80 transition-opacity font-semibold"
        >
          Explore Community &rarr;
        </Link>
      </div>

      <button
        type="button"
        onClick={() => setIsVisible(false)}
        className="rounded p-1 text-white/80 hover:text-white focus:outline-none focus-visible:ring-1 focus-visible:ring-white shrink-0"
        aria-label="Dismiss announcement"
      >
        <X className="h-3.5 w-3.5" />
      </button>
    </div>
  );
}
