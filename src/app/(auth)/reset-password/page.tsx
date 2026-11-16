import { Suspense } from "react";
import type { Metadata } from "next";
import { AuthCard, ResetPasswordForm } from "@/features/auth";
import { Spinner } from "@/components/feedback/spinner";

export const metadata: Metadata = {
  title: "Set New Password | BDSisters.org",
  description: "Update your BDSisters.org account password securely.",
};

export default function ResetPasswordPage() {
  return (
    <AuthCard
      badge="Account Security"
      title="Create New Password"
      description="Choose a strong password of at least 8 characters with letters and numbers."
      backHref="/login"
      backLabel="Back to Sign In"
    >
      <Suspense
        fallback={
          <div className="flex justify-center py-8">
            <Spinner size="md" />
          </div>
        }
      >
        <ResetPasswordForm />
      </Suspense>
    </AuthCard>
  );
}
