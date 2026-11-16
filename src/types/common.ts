import type { ReactNode } from "react";

export type ThemeMode = "light" | "dark" | "system";

export interface BaseComponentProps {
  className?: string;
  children?: ReactNode;
}

export type AsyncState<T> = {
  data: T | null;
  isLoading: boolean;
  isError: boolean;
  error: Error | null;
};
