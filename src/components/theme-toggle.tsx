import { IconButton } from "@/components/ui/icon-button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { useTheme } from "@/lib/theme-context";

/** `rail` renders the circular sidebar treatment; default is a ghost toolbar button. */
export function ThemeToggle({ rail = false }: { rail?: boolean }) {
  const { theme, toggle } = useTheme();
  const label = `Switch to ${theme === "dark" ? "light" : "dark"} mode`;
  const button = (
    <IconButton
      icon={theme === "dark" ? "sun" : "moon"}
      label={label}
      onClick={toggle}
      variant={rail ? "subtle" : "ghost"}
      shape={rail ? "circle" : "rounded"}
      size={rail ? "lg" : "md"}
      iconSize={rail ? "lg" : "md"}
      className={rail ? "text-icon-tertiary" : undefined}
    />
  );
  if (!rail) return button;
  return (
    <Tooltip>
      <TooltipTrigger asChild>{button}</TooltipTrigger>
      <TooltipContent side="right" sideOffset={10}>
        {label}
      </TooltipContent>
    </Tooltip>
  );
}
