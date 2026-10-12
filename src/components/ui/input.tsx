import * as React from "react";

import { cn } from "@/lib/utils";

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-9 w-full rounded-full border border-muted bg-action px-4 py-1 text-base text-primary outline-none transition-colors duration-[180ms] file:border-0 file:bg-transparent file:text-label-sm file:text-primary placeholder:text-quaternary hover:border-default focus-visible:border-default focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-error-stroke md:text-body-md",
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);
Input.displayName = "Input";

export { Input };
