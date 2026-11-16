import type { ReactNode } from "react";
import Link from "next/link";
import { ThemeToggle } from "@/components/shared/theme-toggle";
import { ShieldCheck, Heart, Sparkles } from "lucide-react";

interface AuthLayoutProps {
  children: ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col bg-[#FAF9FC] text-[#252238] transition-colors duration-200 dark:bg-[#120F1D] dark:text-[#E8E4F0]">
      {/* Top Branding Navigation */}
      <header className="border-b border-gray-200/70 bg-white/80 backdrop-blur-md dark:border-white/5 dark:bg-[#181424]/80">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
          <Link
            href="/"
            className="group flex items-center gap-2.5 transition-transform duration-200 hover:scale-[1.01]"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-700 text-white shadow-md shadow-purple-700/20 dark:bg-[#B794F6] dark:text-[#20132D]">
              <Sparkles className="h-5 w-5" />
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-bold tracking-tight text-gray-900 group-hover:text-purple-700 dark:text-white dark:group-hover:text-purple-300">
                BDSisters<span className="text-purple-700 dark:text-purple-400">.org</span>
              </span>
              <span className="hidden text-[10px] font-medium text-gray-500 sm:inline dark:text-gray-400">
                Bangladeshi Muslim Women&apos;s Digital Platform
              </span>
            </div>
          </Link>

          <div className="flex items-center gap-3">
            <ThemeToggle />
          </div>
        </div>
      </header>

      {/* Main Centered Content */}
      <main className="flex flex-1 items-center justify-center px-4 py-8 sm:px-6 lg:px-8">
        <div className="w-full max-w-md">{children}</div>
      </main>

      {/* Trust & Amanah Footer */}
      <footer className="border-t border-gray-200/60 bg-white/50 py-4 text-center text-xs text-gray-500 dark:border-white/5 dark:bg-[#151121]/50 dark:text-gray-400">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-6 gap-y-2 px-4">
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="h-4 w-4 text-purple-700 dark:text-purple-400" />
            <span>256-Bit TLS End-to-End Encryption</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Heart className="h-3.5 w-3.5 text-pink-500" />
            <span>Built by & for Bangladeshi Sisters</span>
          </div>
          <div>
            <span>© 2026 BDSisters.org. All rights reserved.</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
