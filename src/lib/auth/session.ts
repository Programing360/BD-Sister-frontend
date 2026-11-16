import type { AuthUser, AuthSession, SessionContextValue } from "@/types/auth";

export function createEmptySessionContext(): SessionContextValue {
  return {
    user: null,
    session: null,
    isAuthenticated: false,
    isLoading: true,
  };
}

export function isSessionExpired(session: AuthSession | null): boolean {
  if (!session) return true;
  return new Date(session.expiresAt).getTime() <= Date.now();
}

export function hasRequiredRole(user: AuthUser | null, allowedRoles: string[]): boolean {
  if (!user) return false;
  return allowedRoles.includes(user.role);
}
