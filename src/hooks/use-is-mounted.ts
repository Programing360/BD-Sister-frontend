"use client";

import { useSyncExternalStore } from "react";

const emptySubscribe = () => () => {};

/**
 * Idiomatic React 18/19 mounted detection hook via useSyncExternalStore
 * Returns false during SSR and true immediately upon client hydration.
 */
export function useIsMounted(): boolean {
  return useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );
}
