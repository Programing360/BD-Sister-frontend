import type { Metadata } from "next";
import Link from "next/link";
import { AuthCard, RegisterForm } from "@/features/auth";
import { ROUTES } from "@/config/routes";

export const metadata: Metadata = {
  title: "Create Free Account | BDSisters.org",
  description:
    "Join BDSisters.org — the dedicated platform for Bangladeshi Muslim women entrepreneurs, professionals, and learners.",
};

export default function RegisterPage() {
  return (
    <AuthCard
      badge="Sisterhood Registration"
      title="Join BDSisters.org"
      description="Connect with trusted women entrepreneurs, mentors, and peers across Bangladesh."
      backHref="/"
      backLabel="Back to Homepage"
      footer={
        <p className="text-gray-600 dark:text-gray-400">
          Already have an account?{" "}
          <Link
            href={ROUTES.auth.login}
            className="font-semibold text-purple-700 hover:underline dark:text-purple-400"
          >
            Sign In here
          </Link>
        </p>
      }
    >
      <RegisterForm />
    </AuthCard>
  );
}
