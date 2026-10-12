import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

// Chronos StatusBadge: solid fill + white label for status, quiet pill otherwise.
const badgeVariants = cva(
  "inline-flex max-w-full items-center gap-1 truncate rounded-full border border-transparent px-2.5 py-0.5 text-caption whitespace-nowrap transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-ring",
  {
    variants: {
      variant: {
        default: "border-muted bg-raised-2 text-secondary",
        secondary: "bg-action text-secondary",
        destructive: "border-error-stroke/50 bg-error-subtle text-error",
        outline: "border-muted text-tertiary",
        success: "border-success-stroke/50 bg-success-subtle text-success",
        warning: "border-warning-stroke/50 bg-warning-subtle text-warning",
        info: "border-info-stroke/50 bg-info-subtle text-info",
        neutral: "border-neutral-stroke/50 bg-neutral-subtle text-neutral",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };
