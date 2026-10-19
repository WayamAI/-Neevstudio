// 3D mark registry (Chronos pattern): dimensional orange renders that sit
// beside page titles, on KPI tiles and on stage cards. Sidebar and controls
// keep the lucide line icons from lib/icons.ts.
//
// Drop PNGs named `<id>.png` into src/assets/marks/ — they are picked up by
// the glob below (no code change). Any id without a file falls back to its
// line icon on an orange tile, so the UI never shows a broken image.
import type { IconName } from "@/lib/icons";

export const MARKS = {
  // Pages
  overview: "dashboard",
  "new-breakdown": "fileAdd",
  "requirements-matrix": "fileExport",
  breakdown: "hierarchy",
  compliance: "compliance",
  classification: "listCheck",
  verification: "verification",
  hardware: "hardware",
  traceability: "traceability",
  capabilities: "agent",
  "agent-runs": "activity",
  approvals: "approval",
  reports: "report",
  integrations: "integration",
  audit: "history",
  settings: "settings",

  // Overview KPIs and telemetry
  "kpi-requirements": "document",
  "kpi-critical-safety": "shield",
  "kpi-test-coverage": "verification",
  "kpi-bom-saving": "hardware",
  telemetry: "activity",

  // Activity, insight and empty states
  agent: "agent",
  human: "user",
  insight: "sparkle",
  alert: "warning",
  empty: "archive",
  dhf: "document",
} as const satisfies Record<string, IconName>;

export type MarkId = keyof typeof MARKS;

const files = import.meta.glob<string>("../assets/marks/*.png", {
  eager: true,
  query: "?url",
  import: "default",
});

const byId: Partial<Record<string, string>> = Object.fromEntries(
  Object.entries(files).map(([path, url]) => [
    path
      .split("/")
      .pop()!
      .replace(/\.png$/, ""),
    url,
  ]),
);

/** URL of the rendered mark, or undefined when the PNG has not been added yet. */
export function markSrc(id: MarkId): string | undefined {
  return byId[id];
}

export function markFallbackIcon(id: MarkId): IconName {
  return MARKS[id];
}
