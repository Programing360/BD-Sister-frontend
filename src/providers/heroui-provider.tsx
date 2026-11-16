"use client";

import type { ReactNode } from "react";
import { useRouter } from "next/navigation";
import { RouterProvider } from "@heroui/react";

interface HeroUIProviderProps {
  children: ReactNode;
}

/**
 * HeroUI v3 Router Integration
 *
 * Configures HeroUI's client router to navigate via Next.js App Router (useRouter().push)
 * for client-side SPA transitions without hard page refreshes.
 */
export function HeroUIProvider({ children }: HeroUIProviderProps) {
  const router = useRouter();

  return <RouterProvider navigate={router.push}>{children}</RouterProvider>;
}
