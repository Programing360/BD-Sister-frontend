import { betterAuth } from "better-auth";
import { mongodbAdapter } from "@better-auth/mongo-adapter";
import { getMongoClient, getMongoDb } from "./db";
import { sendVerificationEmailNotification, sendPasswordResetEmailNotification } from "./email";

/**
 * BDSisters.org - Server-Side Better Auth Instance
 *
 * Implements:
 * - Persistent MongoDB adapter
 * - Email and Password authentication
 * - Transactional email verification
 * - Secure password reset flow
 * - Custom user fields (role: 'member' | 'admin' | etc.)
 * - Strict cookie security and trusted origin protection
 */

const mongoClient = getMongoClient();
const mongoDb = getMongoDb();

const baseURL =
  process.env.BETTER_AUTH_URL ?? process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";

const secret = process.env.BETTER_AUTH_SECRET ?? "bdsisters-temporary-secret-key-32-chars-long";

const trustedOrigins = [
  baseURL,
  "http://localhost:3000",
  "http://127.0.0.1:3000",
  process.env.NEXT_PUBLIC_APP_URL,
].filter(Boolean) as string[];

export const auth = betterAuth({
  database: mongoDb && mongoClient ? mongodbAdapter(mongoDb, { client: mongoClient }) : undefined,
  secret,
  baseURL,
  trustedOrigins,
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: false,
    resetPasswordTokenExpiresIn: 60 * 60, // 1 hour
    async sendResetPassword(data) {
      const resetUrl = `${baseURL}/reset-password?token=${encodeURIComponent(data.token)}`;
      await sendPasswordResetEmailNotification({
        to: data.user.email,
        name: data.user.name,
        resetUrl,
        token: data.token,
      });
    },
  },
  emailVerification: {
    sendOnSignUp: true,
    autoSignInAfterVerification: true,
    expiresIn: 60 * 60 * 24, // 24 hours
    async sendVerificationEmail(data) {
      const verificationUrl = `${baseURL}/verify-email?token=${encodeURIComponent(data.token)}`;
      await sendVerificationEmailNotification({
        to: data.user.email,
        name: data.user.name,
        verificationUrl,
        token: data.token,
      });
    },
  },
  user: {
    additionalFields: {
      role: {
        type: "string",
        defaultValue: "member",
        required: false,
      },
    },
  },
  session: {
    expiresIn: 60 * 60 * 24 * 7, // 7 days
    updateAge: 60 * 60 * 24, // 1 day
    cookieCache: {
      enabled: true,
      maxAge: 5 * 60,
    },
  },
  advanced: {
    cookiePrefix: "bdsisters",
    useSecureCookies: process.env.NODE_ENV === "production",
  },
});

export type Auth = typeof auth;
