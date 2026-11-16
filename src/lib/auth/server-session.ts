import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "./index";
import type { AuthUser, AuthSession } from "@/types/auth";

export interface ServerSessionResult {
  user: AuthUser;
  session: AuthSession;
}

/**
 * Authoritatively retrieves the cryptographic session on the server.
 *
 * Safe for use in Server Components, Server Actions, and Route Handlers.
 * Returns null if no valid session exists or if the database is unreachable.
 */
export async function getServerSession(): Promise<ServerSessionResult | null> {
  try {
    const reqHeaders = await headers();
    const result = await auth.api.getSession({
      headers: reqHeaders,
    });

    if (!result || !result.user || !result.session) {
      return null;
    }

    return {
      user: result.user as unknown as AuthUser,
      session: result.session as unknown as AuthSession,
    };
  } catch (error) {
    console.error("[Auth Server] Failed to retrieve session from headers:", error);
    return null;
  }
}

/**
 * Server Component / Server Action Guard.
 *
 * Verifies that the current request has an active session. If unauthenticated,
 * safely redirects to /login with an open-redirect protected callbackUrl.
 */
export async function requireAuth(
  callbackUrl: string = "/dashboard"
): Promise<ServerSessionResult> {
  const sessionResult = await getServerSession();

  if (!sessionResult) {
    const safeCallback = callbackUrl.startsWith("/") && !callbackUrl.startsWith("//")
      ? callbackUrl
      : "/dashboard";
    redirect(`/login?callbackUrl=${encodeURIComponent(safeCallback)}`);
  }

  return sessionResult;
}

