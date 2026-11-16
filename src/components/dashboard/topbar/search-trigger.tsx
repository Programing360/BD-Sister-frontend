"use client";

import { Search } from "lucide-react";
import { useUIStore } from "@/store/use-ui-store";

export function SearchTrigger() {
  const toggleSearch = useUIStore((state) => state.toggleSearch);

  return (
    <button
      type="button"
      onClick={toggleSearch}
      aria-label="Search dashboard workspace (Press Ctrl+K or Cmd+K)"
      className="flex items-center gap-2.5 rounded-xl border border-border/70 bg-surface/80 px-3 py-1.5 text-xs text-muted transition-all hover:border-primary/40 hover:bg-surface focus:outline-none focus:ring-2 focus:ring-primary/20 w-36 sm:w-56 md:w-64"
    >
      <Search className="h-3.5 w-3.5 text-muted shrink-0" aria-hidden="true" />
      <span className="flex-1 text-left truncate">Search workspace...</span>
      <kbd className="hidden sm:inline-flex items-center gap-0.5 rounded border border-border bg-background px-1.5 py-0.5 text-[10px] font-mono text-muted shadow-xs">
        ⌘K
      </kbd>
    </button>
  );
}

