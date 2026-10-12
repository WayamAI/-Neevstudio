import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { AppIcon, type IconSize } from "@/components/ui/app-icon";
import type { IconName } from "@/lib/icons";
import { cn } from "@/lib/utils";

const iconButtonVariants = cva(
  "relative inline-flex shrink-0 items-center justify-center cursor-pointer transition-[background-color,color] duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:text-icon-quaternary",
  {
    variants: {
      variant: {
        ghost:
          "text-icon-tertiary hover:bg-action-tertiary-hover hover:text-icon-secondary active:bg-action-tertiary-focused active:text-icon-primary data-[active=true]:bg-action-tertiary-focused data-[active=true]:text-icon-primary",
        subtle: "bg-action text-icon-secondary hover:bg-raised-2 hover:text-icon-primary",
        inverse: "bg-action-primary text-icon-on-color hover:bg-action-primary-hover",
      },
      size: {
        sm: "h-8 w-8",
        md: "h-9 w-9",
        lg: "h-10 w-10",
      },
      shape: {
        rounded: "rounded-control",
        circle: "rounded-full",
      },
    },
    defaultVariants: { variant: "ghost", size: "md", shape: "rounded" },
  },
);

const defaultIconSize: Record<"sm" | "md" | "lg", IconSize> = { sm: "sm", md: "md", lg: "lg" };

export interface IconButtonProps
  extends
    Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "children">,
    VariantProps<typeof iconButtonVariants> {
  icon: IconName;
  /** Accessible name — required because the control has no visible text. */
  label: string;
  iconSize?: IconSize;
  children?: React.ReactNode;
}

/** Icon-only control. `children` render after the icon (e.g. an unread dot). */
const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ icon, label, iconSize, variant, size, shape, className, children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        aria-label={label}
        type={props.type ?? "button"}
        className={cn(iconButtonVariants({ variant, size, shape }), className)}
        {...props}
      >
        <AppIcon name={icon} size={iconSize ?? defaultIconSize[size ?? "md"]} />
        {children}
      </button>
    );
  },
);
IconButton.displayName = "IconButton";

export { IconButton, iconButtonVariants };
