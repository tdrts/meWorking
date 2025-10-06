import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center justify-center rounded-[10px] px-2 py-[2px] text-xs font-medium transition-colors whitespace-nowrap",
  {
    variants: {
      variant: {
        default: "bg-[#0a66c2] text-white border border-transparent",
        outline: "bg-white text-neutral-950 border border-[rgba(0,0,0,0.1)]",
        neutral: "bg-neutral-100 text-neutral-600 border-0",
        inProgress: "bg-blue-100 text-[#1447e6] border-0",
        complete: "bg-green-100 text-[#008236] border-0",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    />
  );
}

export { Badge, badgeVariants };
