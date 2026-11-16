import { forwardRef, useId, type InputHTMLAttributes, type ReactNode } from "react";
import { cn } from "@/lib/utils/cn";
import { Check } from "lucide-react";

export interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
  label?: ReactNode;
  description?: ReactNode;
  error?: boolean;
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, label, description, error, disabled, id, ...props }, ref) => {
    const defaultId = useId();
    const generatedId = id ?? defaultId;

    return (
      <div className={cn("flex items-start gap-3", className)}>
        <div className="relative flex items-center justify-center pt-0.5">
          <input
            ref={ref}
            id={generatedId}
            type="checkbox"
            disabled={disabled}
            className="peer sr-only"
            {...props}
          />
          <label
            htmlFor={generatedId}
            className={cn(
              "flex h-4 w-4 shrink-0 items-center justify-center rounded border border-border bg-background transition-colors cursor-pointer",
              "peer-focus-visible:ring-2 peer-focus-visible:ring-primary peer-focus-visible:ring-offset-2",
              "peer-checked:bg-primary peer-checked:border-primary peer-checked:text-white",
              "peer-disabled:cursor-not-allowed peer-disabled:opacity-50 peer-disabled:bg-surface",
              error && "border-danger"
            )}
          >
            <Check className="h-3 w-3 stroke-[3] opacity-0 peer-checked:opacity-100 transition-opacity" />
          </label>
        </div>
        {(label || description) && (
          <div className="flex flex-col text-sm">
            {label && (
              <label
                htmlFor={generatedId}
                className={cn(
                  "font-medium text-foreground cursor-pointer select-none",
                  disabled && "cursor-not-allowed opacity-50"
                )}
              >
                {label}
              </label>
            )}
            {description && (
              <span className="text-xs text-muted leading-relaxed">{description}</span>
            )}
          </div>
        )}
      </div>
    );
  }
);

Checkbox.displayName = "Checkbox";
