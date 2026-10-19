import { AppIcon, type IconSize } from "@/components/ui/app-icon";
import { markFallbackIcon, markSrc, type MarkId } from "@/lib/marks";
import { cn } from "@/lib/utils";

function fallbackIconSize(size: number): IconSize {
  if (size <= 20) return "xs";
  if (size <= 28) return "sm";
  if (size <= 36) return "md";
  if (size <= 44) return "xl";
  return "2xl";
}

/** Decorative 3D mark. Empty alt — the adjacent label is the name. */
export function Mark({
  id,
  size = 40,
  className,
}: {
  id: MarkId;
  size?: number;
  className?: string;
}) {
  const src = markSrc(id);
  if (src) {
    return (
      <img
        src={src}
        alt=""
        width={size}
        height={size}
        draggable={false}
        className={cn("pointer-events-none shrink-0 select-none object-contain", className)}
      />
    );
  }
  // Placeholder until the render exists: brand-orange line icon on a soft tile.
  return (
    <span
      aria-hidden
      style={{ width: size, height: size }}
      className={cn(
        "flex shrink-0 items-center justify-center rounded-[28%] bg-[var(--ref-orange-500)]/12 text-[var(--ref-orange-500)]",
        className,
      )}
    >
      <AppIcon name={markFallbackIcon(id)} size={fallbackIconSize(size)} />
    </span>
  );
}
