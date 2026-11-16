"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Eye, EyeOff, Lock, Mail } from "lucide-react";
import { signIn } from "@/lib/auth/client";
import { loginSchema, type LoginFormData } from "../schemas";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Alert } from "@/components/feedback/alert";
import { ROUTES } from "@/config/routes";

function sanitizeCallbackUrl(url: string | null): string {
  if (!url) return ROUTES.member.dashboard;
  // Prevent open redirect vulnerabilities:
  // Must start with a single "/" and not "//" or contain protocol
  if (url.startsWith("/") && !url.startsWith("//") && !url.includes("://")) {
    return url;
  }
  return ROUTES.member.dashboard;
}

export function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = sanitizeCallbackUrl(searchParams.get("callbackUrl"));

  const [showPassword, setShowPassword] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    setAuthError(null);

    try {
      const response = await signIn.email({
        email: data.email,
        password: data.password,
        rememberMe: data.rememberMe,
        callbackURL: callbackUrl,
      });

      if (response.error) {
        setAuthError(
          response.error.message ||
            "Invalid email or password. Please check your credentials and try again."
        );
        return;
      }

      // Successful login redirect
      router.push(callbackUrl);
      router.refresh();
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : "An unexpected authentication error occurred";
      setAuthError(message);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
      {authError && (
        <Alert variant="danger" title="Sign In Failed">
          {authError}
        </Alert>
      )}

      {/* Email Input */}
      <div>
        <label
          htmlFor="login-email"
          className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-gray-700 dark:text-gray-300"
        >
          Email Address
        </label>
        <Input
          id="login-email"
          type="email"
          placeholder="sister@example.com"
          autoComplete="email"
          autoFocus
          leftIcon={<Mail className="h-4 w-4 text-gray-400" />}
          error={errors.email?.message}
          {...register("email")}
        />
      </div>

      {/* Password Input */}
      <div>
        <div className="mb-1.5 flex items-center justify-between">
          <label
            htmlFor="login-password"
            className="block text-xs font-semibold uppercase tracking-wider text-gray-700 dark:text-gray-300"
          >
            Password
          </label>
          <Link
            href={ROUTES.auth.forgotPassword}
            className="text-xs font-medium text-purple-700 hover:underline dark:text-purple-400"
          >
            Forgot password?
          </Link>
        </div>
        <div className="relative">
          <Input
            id="login-password"
            type={showPassword ? "text" : "password"}
            placeholder="••••••••"
            autoComplete="current-password"
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

      {/* Remember Me Checkbox */}
      <div className="pt-1">
        <Checkbox
          id="login-rememberMe"
          label="Keep me signed in on this trusted device"
          {...register("rememberMe")}
        />
      </div>

      {/* Submit Button */}
      <Button
        type="submit"
        variant="primary"
        size="lg"
        fullWidth
        isLoading={isSubmitting}
        className="mt-2 bg-purple-700 text-white hover:bg-purple-800 dark:bg-[#B794F6] dark:text-[#20132D] dark:hover:bg-[#C4A7FF]"
      >
        Sign In to Sisterhood
      </Button>
    </form>
  );
}
