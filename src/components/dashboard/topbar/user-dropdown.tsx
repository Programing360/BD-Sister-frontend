"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/features/auth";
import { ROUTES } from "@/config/routes";
import {
  User,
  Settings,
  HelpCircle,
  LogOut,
  ChevronDown,
  Loader2,
  Sparkles,
} from "lucide-react";
import { toast } from "react-toastify";

export function UserDropdown() {
  const { user, signOut } = useAuth();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  const handleSignOut = async () => {
    try {
      setIsLoggingOut(true);
      await signOut();
      toast.success("Successfully signed out. Have a blessed day, Sister!");
      router.push(ROUTES.auth.login);
    } catch (error) {
      console.error("Sign out error:", error);
      toast.error("Failed to sign out cleanly. Redirecting...");
      router.push(ROUTES.auth.login);
    } finally {
      setIsLoggingOut(false);
      setIsOpen(false);
    }
  };

  const displayName = user?.name || "Sister Member";
  const displayEmail = user?.email || "member@bdsisters.org";

  return (
    <div ref={dropdownRef} className="relative inline-block text-left">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-haspopup="menu"
        aria-label="Open member account menu"
        className="flex items-center gap-2 rounded-xl p-1 text-left transition-colors hover:bg-surface focus:outline-none focus:ring-2 focus:ring-primary/20"
      >
        <Avatar
          src={user?.image}
          name={displayName}
          size="sm"
          className="border border-border/80"
        />
        <div className="hidden lg:block">
          <p className="text-xs font-semibold text-foreground line-clamp-1 leading-tight">
            {displayName}
          </p>
          <p className="text-[11px] text-muted line-clamp-1">{displayEmail}</p>
        </div>
        <ChevronDown
          className={`h-3.5 w-3.5 text-muted transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
          aria-hidden="true"
        />
      </button>

      {isOpen && (
        <div
          role="menu"
          aria-orientation="vertical"
          className="absolute right-0 z-50 mt-2 w-64 origin-top-right rounded-2xl border border-border bg-background p-2 shadow-xl ring-1 ring-black/5 animate-in fade-in-0 zoom-in-95 duration-150"
        >
          {/* User Info Header */}
          <div className="border-b border-border/60 px-3 py-2.5">
            <div className="flex items-center justify-between mb-1">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-muted">
                Signed In Sister
              </span>
              <Badge variant="secondary" size="sm" className="text-[10px]">
                <Sparkles className="h-2.5 w-2.5 mr-0.5" />
                Member
              </Badge>
            </div>
            <p className="text-sm font-bold text-foreground truncate">{displayName}</p>
            <p className="text-xs text-muted truncate mt-0.5">{displayEmail}</p>
          </div>

          {/* Navigation Links */}
          <div className="py-1">
            <Link
              href={ROUTES.member.profile}
              onClick={() => setIsOpen(false)}
              role="menuitem"
              className="flex items-center gap-2.5 rounded-xl px-3 py-2 text-xs font-medium text-foreground transition-colors hover:bg-surface hover:text-primary focus:bg-surface focus:outline-none"
            >
              <User className="h-4 w-4 text-muted" aria-hidden="true" />
              <span>View Profile</span>
            </Link>

            <Link
              href={ROUTES.member.settings}
              onClick={() => setIsOpen(false)}
              role="menuitem"
              className="flex items-center gap-2.5 rounded-xl px-3 py-2 text-xs font-medium text-foreground transition-colors hover:bg-surface hover:text-primary focus:bg-surface focus:outline-none"
            >
              <Settings className="h-4 w-4 text-muted" aria-hidden="true" />
              <span>Account Settings</span>
            </Link>

            <Link
              href={ROUTES.public.contact}
              onClick={() => setIsOpen(false)}
              role="menuitem"
              className="flex items-center gap-2.5 rounded-xl px-3 py-2 text-xs font-medium text-foreground transition-colors hover:bg-surface hover:text-primary focus:bg-surface focus:outline-none"
            >
              <HelpCircle className="h-4 w-4 text-muted" aria-hidden="true" />
              <span>Help & Support</span>
            </Link>
          </div>

          {/* Logout Action */}
          <div className="border-t border-border/60 pt-1">
            <button
              type="button"
              onClick={handleSignOut}
              disabled={isLoggingOut}
              role="menuitem"
              className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-xs font-medium text-danger transition-colors hover:bg-danger/10 focus:bg-danger/10 focus:outline-none disabled:opacity-50"
            >
              {isLoggingOut ? (
                <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
              ) : (
                <LogOut className="h-4 w-4" aria-hidden="true" />
              )}
              <span>{isLoggingOut ? "Signing out..." : "Log Out"}</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

