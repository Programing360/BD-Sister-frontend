import { Suspense } from "react";
import type { Metadata } from "next";
import { AuthCard, VerifyEmailCard } from "@/features/auth";
import { Spinner } from "@/components/feedback/spinner";

export const metadata: Metadata = {
  title: "Verify Email | BDSisters.org",
  description: "Verify your email address to activate your BDSisters.org community membership.",
};

export default function VerifyEmailPage() {
  return (
    <AuthCard
      badge="Account Activation"
      title="Email Verification"
      description="Confirm your email address to unlock full member features and ensure community safety."
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
        <VerifyEmailCard />
      </Suspense>
    </AuthCard>
  );
}
