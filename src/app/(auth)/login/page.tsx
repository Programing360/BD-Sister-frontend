import { Suspense } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { AuthCard, LoginForm } from "@/features/auth";
import { ROUTES } from "@/config/routes";
import { Spinner } from "@/components/feedback/spinner";

export const metadata: Metadata = {
  title: "Sign In | BDSisters.org",
  description:
    "Sign in to your BDSisters account to connect with fellow Bangladeshi women entrepreneurs, join cohorts, and access your dashboard.",
};

export default function LoginPage() {
  return (
    <AuthCard
      badge="Secure Access"
      title="Welcome Back, Sister"
      description="Sign in to your BDSisters account to connect, collaborate, and grow."
      backHref="/"
      backLabel="Back to Homepage"
      footer={
        <p className="text-gray-600 dark:text-gray-400">
          Don&apos;t have an account yet?{" "}
          <Link
            href={ROUTES.auth.register}
            className="font-semibold text-purple-700 hover:underline dark:text-purple-400"
          >
            Join our Community
          </Link>
        </p>
      }
    >
      <Suspense
        fallback={
          <div className="flex justify-center py-8">
            <Spinner size="md" />
          </div>
        }
      >
        <LoginForm />
      </Suspense>
    </AuthCard>
  );
}
