import * as React from "react";
import { cn } from "@/lib/utils";
import { Label } from "./label";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  help?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type = "text", label, error, help, id, ...props }, ref) => {
    const inputId = id || React.useId();

    return (
      <div className="w-full">
        {label && (
          <Label 
            htmlFor={inputId} 
            className="mb-1.5 block text-sm text-neutral-950"
          >
            {label}
          </Label>
        )}
        <input
          id={inputId}
          type={type}
          className={cn(
            "flex h-9 w-full rounded-[10px] bg-[#f3f3f5] px-3 py-1 text-sm text-neutral-950 placeholder:text-[#717182]",
            "transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0a66c2] focus-visible:ring-offset-2",
            "disabled:cursor-not-allowed disabled:opacity-50",
            error && "ring-2 ring-error ring-offset-2",
            className
          )}
          ref={ref}
          {...props}
        />
        {(error || help) && (
          <p className={cn(
            "mt-1.5 text-sm",
            error ? "text-error" : "text-[#717182]"
          )}>
            {error || help}
          </p>
        )}
      </div>
    );
  },
);
Input.displayName = "Input";

export { Input };
