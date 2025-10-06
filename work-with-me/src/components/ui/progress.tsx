import * as React from "react";
import { cn } from "@/lib/utils";

export interface ProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Value between 0 and 100 */
  value?: number;
  /** Optional label to display above the progress bar */
  label?: string;
}

const Progress = React.forwardRef<HTMLDivElement, ProgressProps>(
  ({ className, value = 0, label, ...props }, ref) => {
    const normalizedValue = Math.min(100, Math.max(0, value));

    return (
      <div className="w-full">
        {label && (
          <div className="mb-2">
            <p className="text-sm font-normal text-neutral-950">
              {label || `${normalizedValue}% Complete`}
            </p>
          </div>
        )}
        <div
          ref={ref}
          className={cn(
            "relative h-2 w-full overflow-hidden rounded-[16777216px] bg-[rgba(10,102,194,0.2)]",
            className
          )}
          role="progressbar"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={normalizedValue}
          {...props}
        >
          <div
            className="h-full bg-[#0a66c2] transition-all duration-500 ease-in-out"
            style={{ width: `${normalizedValue}%` }}
          />
        </div>
      </div>
    );
  }
);
Progress.displayName = "Progress";

export { Progress };
