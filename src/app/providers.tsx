"use client";

import type { ReactNode } from "react";
import { QueryProvider } from "@/providers/query-provider";
import { ThemeProvider } from "@/providers/theme-provider";
import { HeroUIProvider } from "@/providers/heroui-provider";
import { ToastProvider } from "@/providers/toast-provider";

interface ProvidersProps {
  children: ReactNode;
}

/**
 * Root Client Providers Wrapper
 *
 * Centralized composition of HeroUI v3 RouterProvider, TanStack Query,
 * next-themes ThemeProvider, and React Toastify.
 */
export function Providers({ children }: ProvidersProps) {
  return (
    <ThemeProvider>
      <HeroUIProvider>
        <QueryProvider>
          {children}
          <ToastProvider />
        </QueryProvider>
      </HeroUIProvider>
    </ThemeProvider>
  );
}
