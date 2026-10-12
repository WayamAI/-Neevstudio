import { clsx, type ClassValue } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

// Teach tailwind-merge about the design system's semantic utilities so that
// e.g. cn("text-body-sm", "text-secondary") keeps both (size vs. color) and
// cn("text-tertiary", "text-primary") keeps only the last color.
const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      "font-size": [
        {
          text: [
            "display-metric-xl",
            "display-metric",
            "display-page",
            "display-3xl",
            "display-2xl",
            "display-xl",
            "display-lg",
            "display-base",
            "heading-lg",
            "heading-md",
            "heading-sm",
            "body-lg",
            "body-md",
            "body-sm",
            "label-md",
            "label-sm",
            "caption",
            "micro",
          ],
        },
      ],
      "text-color": [
        {
          text: [
            "primary",
            "secondary",
            "tertiary",
            "quaternary",
            "on-color",
            "success",
            "info",
            "warning",
            "error",
            "neutral",
            "badge",
          ],
        },
      ],
      "border-color": [{ border: ["default", "active", "muted", "disabled", "focus"] }],
    },
  },
});

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
