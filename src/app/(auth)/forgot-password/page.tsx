import type { Metadata } from "next";
import { AuthCard, ForgotPasswordForm } from "@/features/auth";

export const metadata: Metadata = {
  title: "Forgot Password | BDSisters.org",
  description: "Request a secure password reset link for your BDSisters.org account.",
};

export default function ForgotPasswordPage() {
  return (
    <AuthCard
      badge="Account Recovery"
      title="Reset Your Password"
      description="Enter your registered email address and we will dispatch a secure, single-use reset link."
      backHref="/login"
      backLabel="Back to Sign In"
    >
      <ForgotPasswordForm />
    </AuthCard>
  );
}
