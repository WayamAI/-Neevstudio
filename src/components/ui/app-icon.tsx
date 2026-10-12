import { icons, type IconName } from "@/lib/icons";
import { cn } from "@/lib/utils";

export type IconSize = "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl";

// Chronos sizing: 17px in nav pucks, 14px in tree leaves, 13–16px in controls.
const sizePx: Record<IconSize, number> = {
  xs: 12,
  sm: 14,
  md: 16,
  lg: 17,
  xl: 20,
  "2xl": 24,
  "3xl": 28,
};

export interface AppIconProps {
  name: IconName;
  size?: IconSize;
  className?: string;
  /** Provide for meaningful standalone icons; omit for decorative ones. */
  "aria-label"?: string;
  "aria-hidden"?: boolean | "true" | "false";
}

/** The single icon primitive (lucide, 1.75 stroke). Color comes from currentColor. */
export function AppIcon({
  name,
  size = "md",
  className,
  "aria-label": ariaLabel,
  "aria-hidden": ariaHidden,
}: AppIconProps) {
  const Icon = icons[name];
  const labelled = Boolean(ariaLabel);
  return (
    <Icon
      size={sizePx[size]}
      strokeWidth={1.75}
      className={cn("shrink-0", className)}
      aria-hidden={
        ariaHidden === undefined ? !labelled : ariaHidden === true || ariaHidden === "true"
      }
      aria-label={ariaLabel}
      role={labelled ? "img" : undefined}
      focusable={false}
    />
  );
}
