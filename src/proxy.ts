import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * Next.js 16 Proxy Convention
 *
 * ARCHITECTURAL NOTICE:
 * 1. Preliminary Routing Layer: Performs client routing, pre-flight redirect checks,
 *    and request tracking.
 * 2. Defense-in-Depth Principle: The proxy is NOT the sole security boundary.
 *    Protected Server Components, Server Actions, and Route Handlers verify
 *    the cryptographic session validity authoritatively against the database.
 * 3. Open Redirect Protection: All redirect targets are validated to prevent
 *    malicious off-site phishing redirects.
 */

const PROTECTED_PREFIXES = [
  "/dashboard",
  "/profile",
  "/my-business",
  "/business",
  "/messages",
  "/notifications",
  "/settings",
  "/admin",
];

const AUTH_PAGES = ["/login", "/register", "/sign-in", "/sign-up"];

function hasSessionCookie(request: NextRequest): boolean {
  return Boolean(
    request.cookies.get("bdsisters.session_token")?.value ||
    request.cookies.get("__Secure-bdsisters.session_token")?.value ||
    request.cookies.get("better-auth.session_token")?.value ||
    request.cookies.get("__Secure-better-auth.session_token")?.value
  );
}

function isSafeCallbackUrl(url: string | null): boolean {
  if (!url) return false;
  // Must begin with a single "/" and NOT "//" or contain protocol
  return url.startsWith("/") && !url.startsWith("//") && !url.includes("://");
}

export function proxy(request: NextRequest) {
  const { pathname, search, searchParams } = request.nextUrl;
  const isAuthenticated = hasSessionCookie(request);

  // 1. Protected Member Route Enforcement
  const isProtectedRoute = PROTECTED_PREFIXES.some(
    (prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`)
  );

  if (isProtectedRoute && !isAuthenticated) {
    const loginUrl = new URL("/login", request.url);
    const destination = `${pathname}${search}`;
    if (pathname !== "/dashboard") {
      loginUrl.searchParams.set("callbackUrl", destination);
    }
    return NextResponse.redirect(loginUrl);
  }

  // 2. Redirect Authenticated Sisters away from login/register
  const isAuthPage = AUTH_PAGES.includes(pathname);
  if (isAuthPage && isAuthenticated) {
    const callbackParam = searchParams.get("callbackUrl");
    const targetUrl = isSafeCallbackUrl(callbackParam) ? callbackParam! : "/dashboard";
    return NextResponse.redirect(new URL(targetUrl, request.url));
  }

  // 3. Transparent pass-through for public pages & API
  const response = NextResponse.next();
  response.headers.set("x-bdsisters-pathname", pathname);

  return response;
}

export default proxy;

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static assets)
     * - _next/image (image optimization)
     * - favicon.ico, public assets (svg, png, etc.)
     * - api/auth (auth route handlers need direct execution)
     */
    "/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|api/auth|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
