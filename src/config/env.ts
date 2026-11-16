import { z } from "zod";

const clientEnvSchema = z.object({
  NEXT_PUBLIC_APP_URL: z.string().url().default("http://localhost:3000"),
  NEXT_PUBLIC_API_BASE_URL: z.string().url().default("http://localhost:8000/api/v1"),
  NEXT_PUBLIC_BETTER_AUTH_URL: z.string().url().default("http://localhost:3000"),
  NEXT_PUBLIC_APP_ENV: z
    .enum(["development", "test", "staging", "production"])
    .default("development"),
});

const serverEnvSchema = z.object({
  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
  INTERNAL_API_BASE_URL: z.string().url().optional(),
  BETTER_AUTH_SECRET: z.string().min(16).optional(),
  BETTER_AUTH_URL: z.string().url().optional(),
  INTERNAL_API_SECRET_KEY: z.string().optional(),
  MONGO_URI: z.string().optional(),
  EMAIL_PROVIDER: z.enum(["resend", "smtp", "console"]).default("console"),
  RESEND_API_KEY: z.string().optional(),
  EMAIL_FROM: z.string().default("BDSisters <noreply@bdsisters.org>"),
  SMTP_HOST: z.string().optional(),
  SMTP_PORT: z.string().optional(),
  SMTP_USER: z.string().optional(),
  SMTP_PASSWORD: z.string().optional(),
  GOOGLE_CLIENT_ID: z.string().optional(),
  GOOGLE_CLIENT_SECRET: z.string().optional(),
});

const isServer = typeof window === "undefined";

const parsedClientEnv = clientEnvSchema.parse({
  NEXT_PUBLIC_APP_URL: process.env["NEXT_PUBLIC_APP_URL"],
  NEXT_PUBLIC_API_BASE_URL: process.env["NEXT_PUBLIC_API_BASE_URL"],
  NEXT_PUBLIC_BETTER_AUTH_URL: process.env["NEXT_PUBLIC_BETTER_AUTH_URL"],
  NEXT_PUBLIC_APP_ENV: process.env["NEXT_PUBLIC_APP_ENV"],
});

const parsedServerEnv = isServer
  ? serverEnvSchema.parse({
      NODE_ENV: process.env["NODE_ENV"],
      INTERNAL_API_BASE_URL: process.env["INTERNAL_API_BASE_URL"],
      BETTER_AUTH_SECRET: process.env["BETTER_AUTH_SECRET"],
      BETTER_AUTH_URL: process.env["BETTER_AUTH_URL"],
      INTERNAL_API_SECRET_KEY: process.env["INTERNAL_API_SECRET_KEY"],
      MONGO_URI: process.env["MONGO_URI"],
      EMAIL_PROVIDER: process.env["EMAIL_PROVIDER"] ?? "console",
      RESEND_API_KEY: process.env["RESEND_API_KEY"],
      EMAIL_FROM: process.env["EMAIL_FROM"] ?? "BDSisters <noreply@bdsisters.org>",
      SMTP_HOST: process.env["SMTP_HOST"],
      SMTP_PORT: process.env["SMTP_PORT"],
      SMTP_USER: process.env["SMTP_USER"],
      SMTP_PASSWORD: process.env["SMTP_PASSWORD"],
      GOOGLE_CLIENT_ID: process.env["GOOGLE_CLIENT_ID"],
      GOOGLE_CLIENT_SECRET: process.env["GOOGLE_CLIENT_SECRET"],
    })
  : ({} as z.infer<typeof serverEnvSchema>);

export const env = {
  client: parsedClientEnv,
  server: parsedServerEnv,
  isServer,
  isDev: (process.env["NODE_ENV"] ?? "development") === "development",
  isProd: process.env["NODE_ENV"] === "production",
} as const;

export type ClientEnv = z.infer<typeof clientEnvSchema>;
export type ServerEnv = z.infer<typeof serverEnvSchema>;
