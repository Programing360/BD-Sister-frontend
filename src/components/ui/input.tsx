"use client";

import { forwardRef, useState, type InputHTMLAttributes, type ReactNode } from "react";
import { cn } from "@/lib/utils/cn";
import { Eye, EyeOff } from "lucide-react";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: boolean | string;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  helperText?: ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    { className, error, leftIcon, rightIcon, disabled, type = "text", helperText, ...props },
    ref
  ) => {
    const isError = Boolean(error);
    const errorMessage = typeof error === "string" ? error : undefined;

    return (
      <div className="w-full space-y-1">
        <div className="relative flex w-full items-center">
          {leftIcon && (
            <div className="pointer-events-none absolute left-3 flex items-center text-muted">
              {leftIcon}
            </div>
          )}
          <input
            ref={ref}
            type={type}
            disabled={disabled}
            className={cn(
              "h-10 w-full rounded-md border border-border bg-background px-3 text-sm text-foreground",
              "placeholder:text-muted/60 transition-colors",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:border-transparent",
              "disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-surface",
              leftIcon && "pl-10",
              rightIcon && "pr-10",
              isError &&
                "border-danger focus-visible:ring-danger text-danger placeholder:text-danger/60",
              className
            )}
            {...props}
          />
          {rightIcon && (
            <div className="absolute right-3 flex items-center text-muted">{rightIcon}</div>
          )}
        </div>
        {errorMessage && <p className="text-xs text-danger">{errorMessage}</p>}
        {!errorMessage && helperText && <p className="text-xs text-muted">{helperText}</p>}
      </div>
    );
  }
);

Input.displayName = "Input";

export interface PasswordInputProps extends Omit<InputProps, "type" | "rightIcon"> {
  showToggle?: boolean;
}

export const PasswordInput = forwardRef<HTMLInputElement, PasswordInputProps>(
  ({ showToggle = true, ...props }, ref) => {
    const [isVisible, setIsVisible] = useState(false);

    return (
      <Input
        ref={ref}
        type={isVisible ? "text" : "password"}
        rightIcon={
          showToggle ? (
            <button
              type="button"
              onClick={() => setIsVisible(!isVisible)}
              className="text-muted hover:text-foreground focus:outline-none"
              aria-label={isVisible ? "Hide password" : "Show password"}
            >
              {isVisible ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          ) : undefined
        }
        {...props}
      />
    );
  }
);

PasswordInput.displayName = "PasswordInput";
