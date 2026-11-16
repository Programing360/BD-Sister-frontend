import { auth } from "@/lib/auth";
import { toNextJsHandler } from "better-auth/next-js";

/**
 * Better Auth Route Handler for Next.js App Router
 * Handles all authentication endpoints under /api/auth/*
 */
export const { POST, GET } = toNextJsHandler(auth);
