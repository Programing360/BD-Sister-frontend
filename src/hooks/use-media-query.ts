"use client";

import { useSyncExternalStore } from "react";

/**
 * Responsive media query hook using React 18/19 useSyncExternalStore
 * Prevents hydration mismatch and cascading re-renders.
 */
export function useMediaQuery(query: string): boolean {
  const subscribe = (callback: () => void) => {
    if (typeof window === "undefined") return () => {};
    const mediaQueryList = window.matchMedia(query);
    mediaQueryList.addEventListener("change", callback);
    return () => {
      mediaQueryList.removeEventListener("change", callback);
    };
  };

  const getSnapshot = () => {
    if (typeof window === "undefined") return false;
    return window.matchMedia(query).matches;
  };

  const getServerSnapshot = () => false;

  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
