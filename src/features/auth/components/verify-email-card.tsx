"use client";

import { useEffect, useState, useTransition } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Mail, CheckCircle2, RefreshCw, ArrowRight } from "lucide-react";
import { verifyEmail, sendVerificationEmail } from "@/lib/auth/client";
import { resendVerificationSchema, type ResendVerificationFormData } from "../schemas";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Alert } from "@/components/feedback/alert";
import { ROUTES } from "@/config/routes";

type VerificationStatus = "idle" | "verifying" | "success" | "error";

export function VerifyEmailCard() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const queryEmail = searchParams.get("email") || "";
  const registered = searchParams.get("registered") === "true";

  const [status, setStatus] = useState<VerificationStatus>(token ? "verifying" : "idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [resendSuccess, setResendSuccess] = useState(false);
  const [isResending, startResendTransition] = useTransition();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResendVerificationFormData>({
    resolver: zodResolver(resendVerificationSchema),
    defaultValues: {
      email: queryEmail,
    },
  });

  useEffect(() => {
    if (!token) return;

    let isMounted = true;

    async function executeVerification() {
      try {
        const response = await verifyEmail({
          query: { token: token! },
        });

        if (!isMounted) return;

        if (response.error) {
          setStatus("error");
          setErrorMessage(
            response.error.message ||
              "This verification link is invalid or has expired. Please request a new one."
          );
        } else {
          setStatus("success");
        }
      } catch (err: unknown) {
        if (!isMounted) return;
        const message =
          err instanceof Error
            ? err.message
            : "An unexpected error occurred during email verification.";
        setStatus("error");
        setErrorMessage(message);
      }
    }

    executeVerification();

    return () => {
      isMounted = false;
    };
  }, [token]);

  const onResend = async (data: ResendVerificationFormData) => {
    setErrorMessage(null);
    setResendSuccess(false);

    startResendTransition(async () => {
      try {
        const response = await sendVerificationEmail({
          email: data.email,
          callbackURL: ROUTES.member.dashboard,
        });

        if (response.error) {
          setErrorMessage(
            response.error.message || "Could not dispatch verification email. Please try again."
          );
        } else {
          setResendSuccess(true);
        }
      } catch (err: unknown) {
        const message =
          err instanceof Error ? err.message : "An unexpected error occurred. Please try again.";
        setErrorMessage(message);
      }
    });
  };

  // State 1: Active verification in progress
  if (status === "verifying") {
    return (
      <div className="space-y-4 py-8 text-center">
        <div className="flex justify-center">
          <RefreshCw className="h-8 w-8 animate-spin text-purple-600" />
        </div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          Verifying Your Email Address...
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Please wait while we confirm your email token with our secure sisterhood registry.
        </p>
      </div>
    );
  }

  // State 2: Verification succeeded
  if (status === "success") {
    return (
      <div className="space-y-6 text-center">
        <div className="flex justify-center">
          <div className="rounded-full bg-green-100 p-3 dark:bg-green-950/40">
            <CheckCircle2 className="h-10 w-10 text-green-600 dark:text-green-400" />
          </div>
        </div>
        <div>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">
            Email Verified Successfully!
          </h3>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Assalamu Alaikum! Your account has been verified. You can now access all member
            privileges, connect with sisters, and participate in community activities.
          </p>
        </div>
        <div>
          <Link href={ROUTES.member.dashboard}>
            <Button
              variant="primary"
              size="lg"
              fullWidth
              rightIcon={<ArrowRight className="h-4 w-4" />}
              className="bg-purple-700 text-white hover:bg-purple-800 dark:bg-[#B794F6] dark:text-[#20132D]"
            >
              Enter Member Portal
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  // State 3: Token verification failed
  if (status === "error") {
    return (
      <div className="space-y-6">
        <Alert variant="danger" title="Verification Failed">
          {errorMessage || "The verification link is invalid or has expired."}
        </Alert>

        <div className="rounded-xl border border-gray-100 bg-gray-50/70 p-4 dark:border-white/5 dark:bg-white/5">
          <h4 className="text-sm font-semibold text-gray-900 dark:text-white">
            Request a New Verification Link
          </h4>
          <p className="mt-1 text-xs text-gray-600 dark:text-gray-400">
            Enter your registered email address below to receive a fresh verification link.
          </p>

          <form onSubmit={handleSubmit(onResend)} className="mt-4 space-y-3" noValidate>
            <Input
              type="email"
              placeholder="sister@example.com"
              leftIcon={<Mail className="h-4 w-4 text-gray-400" />}
              error={errors.email?.message}
              {...register("email")}
            />
            <Button type="submit" variant="primary" fullWidth isLoading={isResending}>
              Resend Verification Email
            </Button>
          </form>
        </div>

        {resendSuccess && (
          <Alert variant="success" title="Fresh Verification Link Sent">
            Please check your inbox and spam folder for the updated link.
          </Alert>
        )}
      </div>
    );
  }

  // State 4: Default prompt (e.g. freshly registered sister waiting for email)
  return (
    <div className="space-y-6">
      {registered && (
        <Alert variant="info" title="Account Created">
          We are thrilled to welcome you to BDSisters! Please verify your email to unlock all
          features.
        </Alert>
      )}

      <div className="text-center">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-purple-100 dark:bg-purple-900/40">
          <Mail className="h-7 w-7 text-purple-700 dark:text-purple-300" />
        </div>
        <h3 className="mt-4 text-lg font-bold text-gray-900 dark:text-white">
          Check Your Email Inbox
        </h3>
        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
          We sent a verification link to your email address. Click the link inside to activate your
          account.
        </p>
      </div>

      {resendSuccess ? (
        <Alert variant="success" title="Verification Email Dispatched">
          A new verification link has been delivered to your inbox.
        </Alert>
      ) : (
        <div className="rounded-xl border border-gray-100 bg-gray-50/70 p-4 dark:border-white/5 dark:bg-white/5">
          <h4 className="text-xs font-semibold uppercase tracking-wider text-gray-700 dark:text-gray-300">
            Didn&apos;t receive the email?
          </h4>
          <p className="mt-1 text-xs text-gray-500">
            Check your spam or junk folder, or request a fresh link below:
          </p>

          <form onSubmit={handleSubmit(onResend)} className="mt-3 space-y-3" noValidate>
            <Input
              type="email"
              placeholder="sister@example.com"
              leftIcon={<Mail className="h-4 w-4 text-gray-400" />}
              error={errors.email?.message}
              {...register("email")}
            />
            <Button type="submit" variant="outline" size="sm" fullWidth isLoading={isResending}>
              Resend Verification Link
            </Button>
          </form>
        </div>
      )}

      <div className="text-center pt-2">
        <Link
          href={ROUTES.auth.login}
          className="text-xs font-medium text-purple-700 hover:underline dark:text-purple-400"
        >
          Already verified? Sign In
        </Link>
      </div>
    </div>
  );
}
