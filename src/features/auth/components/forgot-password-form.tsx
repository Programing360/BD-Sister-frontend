"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { Mail } from "lucide-react";
import { forgetPassword } from "@/lib/auth/client";
import { forgotPasswordSchema, type ForgotPasswordFormData } from "../schemas";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Alert } from "@/components/feedback/alert";
import { ROUTES } from "@/config/routes";

export function ForgotPasswordForm() {
  const [submittedEmail, setSubmittedEmail] = useState<string | null>(null);
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (data: ForgotPasswordFormData) => {
    setServerError(null);

    try {
      const response = await forgetPassword({
        email: data.email,
        redirectTo: `${window.location.origin}${ROUTES.auth.resetPassword}`,
      });

      if (response.error) {
        // Log privately on server/client but avoid exposing account existence to unauthenticated callers
        console.error("[Password Reset Request Error]:", response.error);
      }

      // Security requirement: Always show the same neutral success confirmation
      // to avoid account enumeration attacks.
      setSubmittedEmail(data.email);
    } catch (err: unknown) {
      console.error("[Forgot Password Exception]:", err);
      // Still show the generic success state for enumeration protection unless network failure
      setSubmittedEmail(data.email);
    }
  };

  if (submittedEmail) {
    return (
      <div className="space-y-4">
        <Alert variant="success" title="Reset Link Dispatched">
          <span>
            If an account is associated with <strong>{submittedEmail}</strong>, we have sent a
            secure password reset link. Please check your inbox and spam folder.
          </span>
        </Alert>

        <div className="rounded-xl bg-purple-50 p-4 text-xs text-purple-900 dark:bg-purple-950/30 dark:text-purple-200">
          <p className="font-semibold">Important:</p>
          <p className="mt-1">
            The link is single-use and will expire in <strong>1 hour</strong> for your security.
          </p>
        </div>

        <div className="pt-2 text-center">
          <Link href={ROUTES.auth.login}>
            <Button variant="outline" size="md" fullWidth>
              Return to Sign In
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
      {serverError && (
        <Alert variant="danger" title="Request Failed">
          {serverError}
        </Alert>
      )}

      <div>
        <label
          htmlFor="forgot-email"
          className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-gray-700 dark:text-gray-300"
        >
          Account Email Address
        </label>
        <Input
          id="forgot-email"
          type="email"
          placeholder="sister@example.com"
          autoComplete="email"
          autoFocus
          leftIcon={<Mail className="h-4 w-4 text-gray-400" />}
          error={errors.email?.message}
          {...register("email")}
        />
      </div>

      <Button
        type="submit"
        variant="primary"
        size="lg"
        fullWidth
        isLoading={isSubmitting}
        className="mt-2 bg-purple-700 text-white hover:bg-purple-800 dark:bg-[#B794F6] dark:text-[#20132D] dark:hover:bg-[#C4A7FF]"
      >
        Send Password Reset Link
      </Button>

      <div className="text-center pt-2">
        <Link
          href={ROUTES.auth.login}
          className="text-xs font-medium text-purple-700 hover:underline dark:text-purple-400"
        >
          Remembered your password? Sign In
        </Link>
      </div>
    </form>
  );
}
