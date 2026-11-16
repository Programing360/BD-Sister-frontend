"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Eye, EyeOff, Lock } from "lucide-react";
import { resetPassword } from "@/lib/auth/client";
import { resetPasswordSchema, type ResetPasswordFormData } from "../schemas";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Alert } from "@/components/feedback/alert";
import { ROUTES } from "@/config/routes";

export function ResetPasswordForm() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: ResetPasswordFormData) => {
    if (!token) {
      setAuthError("Missing or invalid password reset token. Please request a new reset link.");
      return;
    }

    setAuthError(null);

    try {
      const response = await resetPassword({
        newPassword: data.password,
        token,
      });

      if (response.error) {
        setAuthError(
          response.error.message ||
            "The password reset link is invalid or has expired. Please request a new one."
        );
        return;
      }

      setIsSuccess(true);
    } catch (err: unknown) {
      const message =
        err instanceof Error
          ? err.message
          : "An unexpected error occurred while resetting password.";
      setAuthError(message);
    }
  };

  if (!token) {
    return (
      <div className="space-y-4 text-center">
        <Alert variant="danger" title="Invalid or Missing Reset Token">
          We could not find a valid reset token in your request URL. The link may be malformed or
          incomplete.
        </Alert>
        <div className="pt-2">
          <Link href={ROUTES.auth.forgotPassword}>
            <Button variant="primary" fullWidth>
              Request a New Reset Link
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  if (isSuccess) {
    return (
      <div className="space-y-4 text-center">
        <Alert variant="success" title="Password Successfully Reset">
          Your password has been securely updated. You can now log in using your new credentials.
        </Alert>
        <div className="pt-2">
          <Link href={ROUTES.auth.login}>
            <Button variant="primary" size="lg" fullWidth>
              Proceed to Sign In
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
      {authError && (
        <Alert variant="danger" title="Password Reset Failed">
          {authError}
        </Alert>
      )}

      {/* New Password */}
      <div>
        <label
          htmlFor="reset-password"
          className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-gray-700 dark:text-gray-300"
        >
          New Password
        </label>
        <div className="relative">
          <Input
            id="reset-password"
            type={showPassword ? "text" : "password"}
            placeholder="Min. 8 characters"
            autoComplete="new-password"
            autoFocus
            leftIcon={<Lock className="h-4 w-4 text-gray-400" />}
            error={errors.password?.message}
            {...register("password")}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-3 text-gray-400 hover:text-gray-600 focus:outline-none dark:hover:text-gray-200"
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {/* Confirm Password */}
      <div>
        <label
          htmlFor="reset-confirm-password"
          className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-gray-700 dark:text-gray-300"
        >
          Confirm New Password
        </label>
        <div className="relative">
          <Input
            id="reset-confirm-password"
            type={showConfirmPassword ? "text" : "password"}
            placeholder="Re-type new password"
            autoComplete="new-password"
            leftIcon={<Lock className="h-4 w-4 text-gray-400" />}
            error={errors.confirmPassword?.message}
            {...register("confirmPassword")}
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute right-3 top-3 text-gray-400 hover:text-gray-600 focus:outline-none dark:hover:text-gray-200"
            aria-label={showConfirmPassword ? "Hide password" : "Show password"}
          >
            {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
        </div>
      </div>

      <Button
        type="submit"
        variant="primary"
        size="lg"
        fullWidth
        isLoading={isSubmitting}
        className="mt-2 bg-purple-700 text-white hover:bg-purple-800 dark:bg-[#B794F6] dark:text-[#20132D] dark:hover:bg-[#C4A7FF]"
      >
        Update Password
      </Button>
    </form>
  );
}
