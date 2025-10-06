import * as React from "react";
import { cn } from "@/lib/utils";
import { Label } from "./label";

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  help?: string;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, label, error, help, id, ...props }, ref) => {
    const textareaId = id || React.useId();

    return (
      <div className="w-full">
        {label && (
          <Label 
            htmlFor={textareaId} 
            className="mb-1.5 block text-sm text-neutral-950"
          >
            {label}
          </Label>
        )}
        <textarea
          id={textareaId}
          className={cn(
            "min-h-[64px] w-full resize-y rounded-[10px] bg-[#f3f3f5] px-3 py-2 text-sm text-neutral-950 placeholder:text-[#717182]",
            "transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0a66c2] focus-visible:ring-offset-2",
            "disabled:cursor-not-allowed disabled:opacity-50",
            error && "ring-2 ring-error ring-offset-2",
            className,
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
Textarea.displayName = "Textarea";

export { Textarea };
