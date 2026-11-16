"use client";

import { useSession, signOut as clientSignOut } from "@/lib/auth/client";
import type { AuthUser, AuthSession, SessionContextValue } from "@/types/auth";
import { useCallback } from "react";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/config/routes";

interface UseAuthReturn extends SessionContextValue {
  signOut: () => Promise<void>;
  refetch: () => void;
}

/**
 * Reactive Authentication Hook
 * Wraps Better Auth's reactive session store and provides standardized helper actions.
 */
export function useAuth(): UseAuthReturn {
  const router = useRouter();
  const { data, isPending, refetch } = useSession();

  const user: AuthUser | null = data?.user
    ? {
        id: data.user.id,
        email: data.user.email,
        name: data.user.name,
        image: data.user.image,
        role: (data.user as { role?: string }).role ?? "member",
        emailVerified: data.user.emailVerified ?? false,
        createdAt: data.user.createdAt,
        updatedAt: data.user.updatedAt,
      }
    : null;

  const session: AuthSession | null = data?.session
    ? {
        id: data.session.id,
        userId: data.session.userId,
        expiresAt: data.session.expiresAt,
        token: data.session.token,
        ipAddress: data.session.ipAddress,
        userAgent: data.session.userAgent,
      }
    : null;

  const signOut = useCallback(async () => {
    await clientSignOut();
    router.push(ROUTES.auth.login);
    router.refresh();
  }, [router]);

  return {
    user,
    session,
    isAuthenticated: Boolean(data?.user),
    isLoading: isPending,
    signOut,
    refetch: () => {
      refetch();
    },
  };
}
