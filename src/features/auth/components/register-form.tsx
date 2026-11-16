"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Eye, EyeOff, Lock, Mail, User, CheckCircle2 } from "lucide-react";
import { signUp } from "@/lib/auth/client";
import { registerSchema, type RegisterFormData } from "../schemas";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Alert } from "@/components/ui/alert";
import { ROUTES } from "@/config/routes";

function calculatePasswordStrength(pass: string): {
  score: number;
  label: string;
  color: string;
} {
  if (!pass) return { score: 0, label: "None", color: "bg-gray-200" };
  let score = 0;
  if (pass.length >= 8) score++;
  if (/[A-Z]/.test(pass)) score++;
  if (/[a-z]/.test(pass)) score++;
  if (/[0-9]/.test(pass)) score++;
  if (/[^A-Za-z0-9]/.test(pass)) score++;

  if (score <= 2) return { score, label: "Weak", color: "bg-red-500" };
  if (score === 3 || score === 4) return { score, label: "Good", color: "bg-yellow-500" };
  return { score, label: "Strong", color: "bg-green-500" };
}

export function RegisterForm() {
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordValue, setPasswordValue] = useState("");
  const [authError, setAuthError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
      agreeToTerms: false,
    },
  });

  const strength = calculatePasswordStrength(passwordValue);

  const onSubmit = async (data: RegisterFormData) => {
    setAuthError(null);

    try {
      const response = await signUp.email({
        email: data.email,
        password: data.password,
        name: data.fullName,
        callbackURL: ROUTES.member.dashboard,
      });

      if (response.error) {
        // Handle common Better Auth error codes (e.g. USER_ALREADY_EXISTS)
        if (
          response.error.message?.toLowerCase().includes("exist") ||
          response.error.code === "USER_ALREADY_EXISTS"
        ) {
          setAuthError(
            "An account with this email address already exists. Please sign in or reset your password."
          );
        } else {
          setAuthError(response.error.message || "Registration failed. Please check your details.");
        }
        return;
      }

      // Successful registration - redirect to verify-email or dashboard
      router.push(
        `${ROUTES.auth.verifyEmail}?registered=true&email=${encodeURIComponent(data.email)}`
      );
      router.refresh();
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : "An unexpected registration error occurred";
      setAuthError(message);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
      {authError && (
        <Alert variant="danger" title="Registration Failed">
          {authError}
        </Alert>
      )}

      {/* Full Name */}
      <div>
        <label
          htmlFor="register-fullname"
          className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-gray-700 dark:text-gray-300"
        >
          Full Name
        </label>
        <Input
          id="register-fullname"
          type="text"
          placeholder="e.g. Fatima Rahman"
          autoComplete="name"
          autoFocus
          leftIcon={<User className="h-4 w-4 text-gray-400" />}
          error={errors.fullName?.message}
          {...register("fullName")}
        />
      </div>

      {/* Email Address */}
      <div>
        <label
          htmlFor="register-email"
          className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-gray-700 dark:text-gray-300"
        >
          Email Address
        </label>
        <Input
          id="register-email"
          type="email"
          placeholder="sister@example.com"
          autoComplete="email"
          leftIcon={<Mail className="h-4 w-4 text-gray-400" />}
          error={errors.email?.message}
          {...register("email")}
        />
      </div>

      {/* Password */}
      <div>
        <label
          htmlFor="register-password"
          className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-gray-700 dark:text-gray-300"
        >
          Password
        </label>
        <div className="relative">
          <Input
            id="register-password"
            type={showPassword ? "text" : "password"}
            placeholder="Min. 8 characters"
            autoComplete="new-password"
            leftIcon={<Lock className="h-4 w-4 text-gray-400" />}
            error={errors.password?.message}
            {...register("password", {
              onChange: (e) => setPasswordValue(e.target.value),
            })}
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

        {/* Password Strength Indicator */}
        {passwordValue.length > 0 && (
          <div className="mt-2 space-y-1">
            <div className="flex items-center justify-between text-[11px] text-gray-500">
              <span>Password Strength:</span>
              <span className="font-medium text-gray-700 dark:text-gray-300">{strength.label}</span>
            </div>
            <div className="flex h-1.5 w-full gap-1 overflow-hidden rounded-full bg-gray-100 dark:bg-white/10">
              <div
                className={`h-full transition-all duration-300 ${strength.color}`}
                style={{ width: `${(strength.score / 5) * 100}%` }}
              />
            </div>
          </div>
        )}
      </div>

      {/* Confirm Password */}
      <div>
        <label
          htmlFor="register-confirm-password"
          className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-gray-700 dark:text-gray-300"
        >
          Confirm Password
        </label>
        <div className="relative">
          <Input
            id="register-confirm-password"
            type={showConfirmPassword ? "text" : "password"}
            placeholder="Re-type your password"
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

      {/* Terms & Guidelines Checkbox */}
      <div className="pt-1">
        <Checkbox
          id="register-terms"
          {...register("agreeToTerms")}
          label={
            <span className="text-xs text-gray-600 dark:text-gray-300">
              I agree to the{" "}
              <Link
                href={ROUTES.public.terms}
                target="_blank"
                className="font-medium text-purple-700 underline hover:text-purple-800 dark:text-purple-400"
              >
                Terms of Service
              </Link>{" "}
              and the{" "}
              <Link
                href={ROUTES.public.community}
                target="_blank"
                className="font-medium text-purple-700 underline hover:text-purple-800 dark:text-purple-400"
              >
                Sisterhood Code of Conduct
              </Link>
              .
            </span>
          }
          error={Boolean(errors.agreeToTerms)}
        />
        {errors.agreeToTerms && (
          <p className="mt-1 text-xs text-danger">{errors.agreeToTerms.message}</p>
        )}
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
        Create My Free Account
      </Button>

      {/* Amanah & Privacy Guarantee */}
      <div className="flex items-center justify-center gap-1.5 pt-2 text-center text-[11px] text-gray-500 dark:text-gray-400">
        <CheckCircle2 className="h-3.5 w-3.5 text-green-600 dark:text-green-400" />
        <span>Your data is protected under strict Islamic Amanah & Privacy standards</span>
      </div>
    </form>
  );
}
