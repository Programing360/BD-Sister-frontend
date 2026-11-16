"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import { useRouter } from "next/navigation";
import { useUIStore } from "@/store/use-ui-store";
import { ROUTES } from "@/config/routes";
import {
  Search,
  X,
  LayoutDashboard,
  User,
  Store,
  Users,
  ShoppingBag,
  GraduationCap,
  Calendar,
  MessageSquare,
  Bell,
  Settings,
  HelpCircle,
  ArrowRight,
} from "lucide-react";

interface SearchEntry {
  id: string;
  title: string;
  category: "Workspace" | "Community" | "Commerce" | "Learning" | "Account";
  href: string;
  icon: typeof LayoutDashboard;
  keywords: string[];
}

const SEARCH_DATABASE: SearchEntry[] = [
  {
    id: "dash",
    title: "Member Dashboard Overview",
    category: "Workspace",
    href: ROUTES.member.dashboard,
    icon: LayoutDashboard,
    keywords: ["home", "stats", "overview", "metrics", "summary"],
  },
  {
    id: "prof",
    title: "My Profile & Identity",
    category: "Workspace",
    href: ROUTES.member.profile,
    icon: User,
    keywords: ["profile", "bio", "name", "avatar", "account", "identity"],
  },
  {
    id: "biz",
    title: "My Business Directory Listing",
    category: "Commerce",
    href: ROUTES.member.myBusiness,
    icon: Store,
    keywords: ["business", "shop", "boutique", "service", "company", "listing"],
  },
  {
    id: "comm",
    title: "Community Circles & Sisterhood",
    category: "Community",
    href: ROUTES.public.community,
    icon: Users,
    keywords: ["community", "circles", "sisters", "networking", "cohorts"],
  },
  {
    id: "market",
    title: "BDSisters Marketplace",
    category: "Commerce",
    href: ROUTES.public.marketplace,
    icon: ShoppingBag,
    keywords: ["marketplace", "products", "halal", "buy", "sell", "crafts"],
  },
  {
    id: "learn",
    title: "Learning Tracks & Masterclasses",
    category: "Learning",
    href: ROUTES.public.learning,
    icon: GraduationCap,
    keywords: ["courses", "learning", "freelancing", "tech", "skills", "webinar"],
  },
  {
    id: "events",
    title: "Upcoming Events & Meetups",
    category: "Community",
    href: ROUTES.public.events,
    icon: Calendar,
    keywords: ["events", "workshops", "meetups", "sessions", "dates"],
  },
  {
    id: "msg",
    title: "Direct Messages & Inquiries",
    category: "Workspace",
    href: ROUTES.member.messages,
    icon: MessageSquare,
    keywords: ["messages", "inbox", "chat", "direct", "conversation"],
  },
  {
    id: "notif",
    title: "Activity Notifications",
    category: "Workspace",
    href: ROUTES.member.notifications,
    icon: Bell,
    keywords: ["notifications", "alerts", "updates", "activity"],
  },
  {
    id: "sett",
    title: "Account Settings & Security",
    category: "Account",
    href: ROUTES.member.settings,
    icon: Settings,
    keywords: ["settings", "password", "security", "preferences", "email"],
  },
  {
    id: "help",
    title: "Help Center & Sister Support",
    category: "Account",
    href: ROUTES.public.contact,
    icon: HelpCircle,
    keywords: ["help", "support", "contact", "faq", "assistance"],
  },
];

export function SearchCommandPalette() {
  const isSearchOpen = useUIStore((state) => state.isSearchOpen);
  const setSearchOpen = useUIStore((state) => state.setSearchOpen);
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const handleClose = () => {
    setQuery("");
    setSelectedIndex(0);
    setSearchOpen(false);
  };

  // Keyboard shortcut Ctrl+K / Cmd+K listener
  useEffect(() => {
    function handleGlobalKeyDown(event: KeyboardEvent) {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setSearchOpen(!isSearchOpen);
      }
    }
    window.addEventListener("keydown", handleGlobalKeyDown);
    return () => window.removeEventListener("keydown", handleGlobalKeyDown);
  }, [isSearchOpen, setSearchOpen]);

  // Focus input when opened
  useEffect(() => {
    if (isSearchOpen) {
      document.body.style.overflow = "hidden";
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      document.body.style.overflow = "";
    }
  }, [isSearchOpen]);

  const filteredResults = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return SEARCH_DATABASE;
    return SEARCH_DATABASE.filter(
      (item) =>
        item.title.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q) ||
        item.keywords.some((k) => k.includes(q))
    );
  }, [query]);

  const handleSelect = (item: SearchEntry) => {
    handleClose();
    router.push(item.href);
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Escape") {
      handleClose();
    } else if (event.key === "ArrowDown") {
      event.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % (filteredResults.length || 1));
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setSelectedIndex((prev) =>
        prev - 1 < 0 ? (filteredResults.length || 1) - 1 : prev - 1
      );
    } else if (event.key === "Enter" && filteredResults[selectedIndex]) {
      event.preventDefault();
      handleSelect(filteredResults[selectedIndex]);
    }
  };

  if (!isSearchOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4"
      role="dialog"
      aria-modal="true"
      aria-label="Workspace Command Palette"
    >
      {/* Backdrop */}
      <div
        onClick={handleClose}
        className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity"
        aria-hidden="true"
      />

      {/* Palette Container */}
      <div className="relative w-full max-w-xl overflow-hidden rounded-2xl border border-border bg-background shadow-2xl animate-in fade-in-0 zoom-in-95 duration-150">
        {/* Search Input Bar */}
        <div className="flex items-center gap-3 border-b border-border/80 px-4 py-3.5">
          <Search className="h-4 w-4 text-muted shrink-0" aria-hidden="true" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            onKeyDown={handleKeyDown}
            placeholder="Type to search workspace, circles, events, or settings..."
            className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted focus:outline-none"
            aria-label="Search query"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery("")}
              className="rounded p-1 text-muted hover:text-foreground"
              aria-label="Clear search"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          )}
          <kbd className="hidden sm:inline-flex rounded border border-border bg-surface px-1.5 py-0.5 text-[10px] font-mono text-muted">
            ESC
          </kbd>
        </div>

        {/* Results List */}
        <div className="max-h-80 overflow-y-auto p-2 scrollbar-thin">
          {filteredResults.length === 0 ? (
            <div className="py-10 text-center text-xs text-muted">
              No matching pages or features found for &ldquo;{query}&rdquo;
            </div>
          ) : (
            <div className="space-y-1">
              {filteredResults.map((item, index) => {
                const Icon = item.icon;
                const isSelected = index === selectedIndex;

                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => handleSelect(item)}
                    onMouseEnter={() => setSelectedIndex(index)}
                    className={`flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-left text-xs transition-colors ${
                      isSelected
                        ? "bg-primary text-white font-medium"
                        : "text-foreground hover:bg-surface"
                    }`}
                  >
                    <div className="flex items-center gap-3 truncate">
                      <div
                        className={`flex h-8 w-8 items-center justify-center rounded-lg ${
                          isSelected
                            ? "bg-white/20 text-white"
                            : "bg-surface text-muted"
                        }`}
                      >
                        <Icon className="h-4 w-4" aria-hidden="true" />
                      </div>
                      <div className="truncate">
                        <p className="truncate font-medium">{item.title}</p>
                        <span
                          className={`text-[10px] ${
                            isSelected ? "text-white/80" : "text-muted"
                          }`}
                        >
                          {item.category}
                        </span>
                      </div>
                    </div>
                    <ArrowRight
                      className={`h-3.5 w-3.5 shrink-0 ${
                        isSelected ? "text-white opacity-100" : "opacity-0"
                      }`}
                      aria-hidden="true"
                    />
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer Hint */}
        <div className="border-t border-border/60 bg-surface/40 px-4 py-2 flex items-center justify-between text-[11px] text-muted">
          <span>Navigate with ↑ and ↓</span>
          <span>Press Enter to navigate</span>
        </div>
      </div>
    </div>
  );
}
