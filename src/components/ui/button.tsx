import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

// Chronos pill controls: inverse primary, bordered action-surface secondary.
const buttonVariants = cva(
  "inline-flex items-center justify-center gap-1.5 whitespace-nowrap rounded-full text-label-sm cursor-pointer outline-none transition-colors duration-[180ms] focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-45 disabled:cursor-not-allowed [&_svg]:pointer-events-none [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-action-primary text-action-primary-content hover:bg-action-primary-hover",
        destructive: "bg-error-badge text-badge hover:opacity-90",
        outline:
          "border border-muted bg-action text-secondary hover:border-default hover:bg-raised-2 hover:text-primary",
        secondary:
          "border border-muted bg-action text-secondary hover:border-default hover:bg-raised-2 hover:text-primary",
        ghost: "text-tertiary hover:bg-action hover:text-secondary",
        link: "text-secondary underline-offset-2 hover:text-primary hover:underline",
      },
      size: {
        default: "h-8 px-3.5",
        sm: "h-7 px-3",
        lg: "h-11 px-5 text-label-md",
        icon: "size-8",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
