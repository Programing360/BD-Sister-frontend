import { useId, type ReactNode } from "react";
import { cn } from "@/lib/utils/cn";
import { Label } from "./label";

export interface FormFieldProps {
  label?: string;
  required?: boolean;
  error?: string;
  helperText?: string;
  className?: string;
  children: (props: { id: string; error: boolean; "aria-describedby"?: string }) => ReactNode;
}

export function FormField({
  label,
  required = false,
  error,
  helperText,
  className,
  children,
}: FormFieldProps) {
  const generatedId = useId();
  const errorId = `${generatedId}-error`;
  const helperId = `${generatedId}-helper`;

  const ariaDescribedBy = error ? errorId : helperText ? helperId : undefined;

  return (
    <div className={cn("flex flex-col gap-1.5 w-full", className)}>
      {label && (
        <Label htmlFor={generatedId} required={required}>
          {label}
        </Label>
      )}
      {children({
        id: generatedId,
        error: Boolean(error),
        "aria-describedby": ariaDescribedBy,
      })}
      {error ? (
        <span id={errorId} className="text-xs font-medium text-danger" role="alert">
          {error}
        </span>
      ) : helperText ? (
        <span id={helperId} className="text-xs text-muted">
          {helperText}
        </span>
      ) : null}
    </div>
  );
}
