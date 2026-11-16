import { createAuthClient } from "better-auth/react";

/**
 * BDSisters.org - Better Auth React Client
 *
 * Client-side interface for authentication workflows:
 * - Email / Password registration & login
 * - Session tracking (`useSession`)
 * - Password reset requests
 * - Email verification
 */
export const authClient = createAuthClient({
  baseURL:
    process.env.NEXT_PUBLIC_BETTER_AUTH_URL ??
    (typeof window !== "undefined" ? window.location.origin : "http://localhost:3000"),
});

export const { useSession, signIn, signUp, signOut, getSession } = authClient;

export interface RequestPasswordResetParams {
  email: string;
  redirectTo?: string;
}

export interface ResetPasswordParams {
  newPassword: string;
  token: string;
}

export interface VerifyEmailParams {
  query: {
    token: string;
  };
}

export interface SendVerificationEmailParams {
  email: string;
  callbackURL?: string;
}

interface AuthClientProxy {
  forgetPassword(
    params: RequestPasswordResetParams
  ): Promise<{ data?: unknown; error?: { message?: string; code?: string } }>;
  requestPasswordReset(params: {
    body: RequestPasswordResetParams;
  }): Promise<{ data?: unknown; error?: { message?: string; code?: string } }>;
  resetPassword(
    params: ResetPasswordParams
  ): Promise<{ data?: unknown; error?: { message?: string; code?: string } }>;
  verifyEmail(
    params: VerifyEmailParams
  ): Promise<{ data?: unknown; error?: { message?: string; code?: string } }>;
  sendVerificationEmail(
    params: SendVerificationEmailParams
  ): Promise<{ data?: unknown; error?: { message?: string; code?: string } }>;
}

const clientProxy = authClient as unknown as AuthClientProxy;

export const forgetPassword = (params: RequestPasswordResetParams) =>
  clientProxy.forgetPassword(params);
export const requestPasswordReset = (params: RequestPasswordResetParams) =>
  clientProxy.requestPasswordReset({ body: params });
export const resetPassword = (params: ResetPasswordParams) => clientProxy.resetPassword(params);
export const verifyEmail = (params: VerifyEmailParams) => clientProxy.verifyEmail(params);
export const sendVerificationEmail = (params: SendVerificationEmailParams) =>
  clientProxy.sendVerificationEmail(params);
