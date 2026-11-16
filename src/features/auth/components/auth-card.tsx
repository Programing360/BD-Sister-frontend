import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { ReactNode } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

interface AuthCardProps {
  badge?: string;
  title: string;
  description: string;
  children: ReactNode;
  footer?: ReactNode;
  backHref?: string;
  backLabel?: string;
}

export function AuthCard({
  badge,
  title,
  description,
  children,
  footer,
  backHref,
  backLabel,
}: AuthCardProps) {
  return (
    <div className="w-full">
      {backHref && (
        <div className="mb-4">
          <Link
            href={backHref}
            className="inline-flex items-center gap-1.5 text-xs font-medium text-gray-500 transition-colors hover:text-purple-700 dark:text-gray-400 dark:hover:text-purple-300"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>{backLabel ?? "Back"}</span>
          </Link>
        </div>
      )}

      <Card className="rounded-2xl border border-gray-200/80 bg-white shadow-xl shadow-purple-950/5 dark:border-white/10 dark:bg-[#1E192B]">
        <CardHeader className="space-y-2 pb-6 text-center">
          {badge && (
            <div className="flex justify-center">
              <Badge variant="primary" size="sm">
                {badge}
              </Badge>
            </div>
          )}
          <CardTitle className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl dark:text-white">
            {title}
          </CardTitle>
          <CardDescription className="text-sm text-gray-600 dark:text-gray-400">
            {description}
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">{children}</CardContent>

        {footer && (
          <CardFooter className="flex flex-col border-t border-gray-100 pt-6 text-center text-xs text-gray-600 dark:border-white/5 dark:text-gray-400">
            {footer}
          </CardFooter>
        )}
      </Card>
    </div>
  );
}
