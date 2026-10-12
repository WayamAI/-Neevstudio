import * as React from "react";
import { cn } from "@/lib/utils";

/** Selected state is a slightly brighter gray surface — never an inverted block. */
export const filterChipClass = cn(
  "inline-flex h-7 shrink-0 items-center gap-1.5 whitespace-nowrap rounded-full border px-2.5 text-label-sm cursor-pointer outline-none",
  "transition-colors duration-[180ms] focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
  "border-muted bg-action text-tertiary hover:border-default hover:bg-raised-2 hover:text-secondary",
  "data-[selected=true]:border-active data-[selected=true]:bg-raised-2 data-[selected=true]:text-primary",
  "data-[state=active]:border-active data-[state=active]:bg-raised-2 data-[state=active]:text-primary",
);

export interface FilterChipProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  selected?: boolean;
  /** Optional count shown after the label, e.g. "Critical 1". */
  count?: number | string;
}

export const FilterChip = React.forwardRef<HTMLButtonElement, FilterChipProps>(
  ({ selected = false, count, className, children, ...props }, ref) => (
    <button
      ref={ref}
      type="button"
      aria-pressed={selected}
      data-selected={selected}
      className={cn(filterChipClass, className)}
      {...props}
    >
      {children}
      {count !== undefined && (
        <span className={cn("tabular", selected ? "text-secondary" : "text-quaternary")}>
          {count}
        </span>
      )}
    </button>
  ),
);
FilterChip.displayName = "FilterChip";
