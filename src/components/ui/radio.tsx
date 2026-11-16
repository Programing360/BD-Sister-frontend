import { forwardRef, useId, type InputHTMLAttributes, type ReactNode } from "react";
import { cn } from "@/lib/utils/cn";

export interface RadioProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
  label?: ReactNode;
  description?: ReactNode;
}

export const Radio = forwardRef<HTMLInputElement, RadioProps>(
  ({ className, label, description, disabled, id, ...props }, ref) => {
    const defaultId = useId();
    const generatedId = id ?? defaultId;

    return (
      <div className={cn("flex items-start gap-3", className)}>
        <div className="relative flex items-center justify-center pt-0.5">
          <input
            ref={ref}
            id={generatedId}
            type="radio"
            disabled={disabled}
            className="peer sr-only"
            {...props}
          />
          <label
            htmlFor={generatedId}
            className={cn(
              "flex h-4 w-4 shrink-0 items-center justify-center rounded-full border border-border bg-background transition-colors cursor-pointer",
              "peer-focus-visible:ring-2 peer-focus-visible:ring-primary peer-focus-visible:ring-offset-2",
              "peer-checked:border-primary peer-checked:bg-primary",
              "peer-disabled:cursor-not-allowed peer-disabled:opacity-50 peer-disabled:bg-surface"
            )}
          >
            <span className="h-1.5 w-1.5 rounded-full bg-white opacity-0 peer-checked:opacity-100 transition-opacity" />
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

Radio.displayName = "Radio";
