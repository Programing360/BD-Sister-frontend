"use client";

import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils/cn";
import { User } from "lucide-react";

export type AvatarSize = "xs" | "sm" | "md" | "lg" | "xl";

export interface AvatarProps {
  src?: string | null;
  alt?: string;
  name?: string;
  size?: AvatarSize;
  className?: string;
  status?: "online" | "offline" | "busy" | "away";
}

const sizeStyles: Record<
  AvatarSize,
  { container: string; icon: string; text: string; dot: string }
> = {
  xs: { container: "h-6 w-6", icon: "h-3.5 w-3.5", text: "text-[10px]", dot: "h-1.5 w-1.5" },
  sm: { container: "h-8 w-8", icon: "h-4 w-4", text: "text-xs", dot: "h-2 w-2" },
  md: { container: "h-10 w-10", icon: "h-5 w-5", text: "text-sm", dot: "h-2.5 w-2.5" },
  lg: { container: "h-12 w-12", icon: "h-6 w-6", text: "text-base", dot: "h-3 w-3" },
  xl: { container: "h-16 w-16", icon: "h-8 w-8", text: "text-lg", dot: "h-3.5 w-3.5" },
};

const statusColors = {
  online: "bg-success",
  offline: "bg-muted",
  busy: "bg-danger",
  away: "bg-warning",
};

export function Avatar({
  src,
  alt = "User avatar",
  name,
  size = "md",
  className,
  status,
}: AvatarProps) {
  const [imageError, setImageError] = useState(false);
  const { container, icon, text, dot } = sizeStyles[size];

  const getInitials = (fullName?: string) => {
    if (!fullName) return "";
    const parts = fullName.trim().split(" ");
    if (parts.length >= 2) {
      return `${parts[0]?.[0] ?? ""}${parts[1]?.[0] ?? ""}`.toUpperCase();
    }
    return (fullName[0] ?? "").toUpperCase();
  };

  const initials = getInitials(name);

  return (
    <div className={cn("relative inline-flex shrink-0 select-none", container, className)}>
      <div className="relative h-full w-full overflow-hidden rounded-full border border-border bg-surface flex items-center justify-center font-medium text-muted">
        {src && !imageError ? (
          <Image
            src={src}
            alt={alt}
            fill
            sizes="64px"
            className="object-cover"
            onError={() => setImageError(true)}
          />
        ) : initials ? (
          <span className={cn("font-semibold text-primary", text)}>{initials}</span>
        ) : (
          <User className={cn("text-muted", icon)} aria-hidden="true" />
        )}
      </div>

      {status && (
        <span
          className={cn(
            "absolute bottom-0 right-0 rounded-full ring-2 ring-background",
            statusColors[status],
            dot
          )}
          aria-label={`Status: ${status}`}
        />
      )}
    </div>
  );
}
