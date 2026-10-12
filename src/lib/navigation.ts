/**
 * Primary navigation — the original Nirmiti sidebar: every page is its own
 * item with its own icon, in the original order and sections. Drives the
 * sidebar (rail + expanded + mobile drawer) and the top-bar breadcrumb.
 */
import type { IconName } from "@/lib/icons";

export type NavTone = "error" | "warning";

export interface NavItem {
  label: string;
  href: string;
  icon: IconName;
  /** Secondary info, e.g. "428 req". */
  meta?: string;
  /** Status count shown beside the label (dot on the collapsed rail). */
  badge?: string;
  tone?: NavTone;
}

export interface NavGroup {
  id: string;
  label: string;
  items: NavItem[];
}

export const NAV_GROUPS: NavGroup[] = [
  {
    id: "lifecycle",
    label: "Lifecycle",
    items: [
      { label: "Overview", href: "/", icon: "dashboard" },
      { label: "New Breakdown", href: "/new-breakdown", icon: "fileAdd" },
      { label: "Requirements Matrix", href: "/requirements-matrix", icon: "fileExport" },
      { label: "Product Breakdown", href: "/breakdown", icon: "hierarchy", meta: "428 req" },
      { label: "Compliance & Standards", href: "/compliance", icon: "compliance", meta: "10" },
      { label: "CTS / CTQ Classification", href: "/classification", icon: "listCheck" },
      {
        label: "Verification (V-Model)",
        href: "/verification",
        icon: "verification",
        meta: "87%",
      },
      { label: "Hardware & BOM", href: "/hardware", icon: "hardware", meta: "342" },
    ],
  },
  {
    id: "traceability",
    label: "Traceability",
    items: [{ label: "Traceability Explorer", href: "/traceability", icon: "traceability" }],
  },
  {
    id: "platform",
    label: "Platform",
    items: [
      { label: "AI Capability Map", href: "/capabilities", icon: "agent" },
      {
        label: "Agent Runs / Queue",
        href: "/agent-runs",
        icon: "activity",
        badge: "2 failed",
        tone: "error",
      },
      {
        label: "Approvals Queue",
        href: "/approvals",
        icon: "approval",
        badge: "6 pending",
        tone: "warning",
      },
    ],
  },
  {
    id: "reports",
    label: "Reports",
    items: [{ label: "Reports & Exports", href: "/reports", icon: "report" }],
  },
  {
    id: "settings",
    label: "Settings",
    items: [
      { label: "Integrations", href: "/integrations", icon: "integration" },
      { label: "Audit Trail", href: "/audit", icon: "history" },
      { label: "Settings", href: "/settings", icon: "settings" },
    ],
  },
];

export const ALL_NAV_ITEMS = NAV_GROUPS.flatMap((g) => g.items);

/** Exact match, or longest prefix for nested paths ("/" only matches itself). */
export function navItemForPath(pathname: string): NavItem | undefined {
  return ALL_NAV_ITEMS.filter(
    (item) => pathname === item.href || (item.href !== "/" && pathname.startsWith(`${item.href}/`)),
  ).sort((a, b) => b.href.length - a.href.length)[0];
}

export function groupForPath(pathname: string): NavGroup | undefined {
  const item = navItemForPath(pathname);
  return item ? NAV_GROUPS.find((g) => g.items.includes(item)) : undefined;
}
