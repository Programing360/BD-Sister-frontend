import Link from "next/link";
import { cn } from "@/lib/utils/cn";
import { ROUTES } from "@/config/routes";
import { Sparkles } from "lucide-react";

export interface BrandLogoProps {
  size?: "sm" | "md" | "lg";
  showTagline?: boolean;
  className?: string;
  href?: string;
}

const sizeStyles = {
  sm: { icon: "h-5 w-5", title: "text-base", sub: "text-[10px]" },
  md: { icon: "h-6 w-6", title: "text-lg", sub: "text-xs" },
  lg: { icon: "h-8 w-8", title: "text-2xl", sub: "text-sm" },
};

export function BrandLogo({
  size = "md",
  showTagline = false,
  className,
  href = ROUTES.public.home,
}: BrandLogoProps) {
  const { icon, title, sub } = sizeStyles[size];

  const content = (
    <div className={cn("inline-flex items-center gap-2.5 select-none", className)}>
      <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-primary-dark text-white shadow-sm ring-2 ring-primary/20">
        <Sparkles className={cn(icon, "stroke-[2.2]")} />
      </div>
      <div className="flex flex-col">
        <div className="flex items-center tracking-tight leading-none">
          <span className={cn("font-extrabold text-primary", title)}>BD</span>
          <span className={cn("font-extrabold text-foreground", title)}>Sisters</span>
          <span className="ml-1 text-[11px] font-semibold text-secondary-dark tracking-normal">
            .org
          </span>
        </div>
        {showTagline && (
          <span className={cn("font-medium text-muted tracking-tight mt-0.5", sub)}>
            Bangladeshi Women&apos;s Community &amp; Enterprise
          </span>
        )}
      </div>
    </div>
  );

  return (
    <Link
      href={href}
      className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-lg"
    >
      {content}
    </Link>
  );
}
