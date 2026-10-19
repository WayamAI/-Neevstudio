/**
 * Primary navigation (Chronos pattern). Single-item groups render as direct
 * rail items; multi-item groups render as a collapsible tree (flyout when the
 * rail is collapsed). Settings lives in the rail footer. Drives the sidebar,
 * the top-bar breadcrumb and the page-header marks.
 */
import type { IconName } from "@/lib/icons";
import type { MarkId } from "@/lib/marks";

export type NavTone = "error" | "warning";

export interface NavItem {
  label: string;
  href: string;
  icon: IconName;
  /** 3D mark shown beside the page title. */
  mark: MarkId;
  /** Secondary info, e.g. "428 req". */
  meta?: string;
  /** Status count shown beside the label (dot on the collapsed rail). */
  badge?: string;
  tone?: NavTone;
}

export interface NavGroup {
  id: string;
  label: string;
  icon: IconName;
  items: NavItem[];
}

export const NAV_GROUPS: NavGroup[] = [
  {
    id: "program",
    label: "Program",
    icon: "dashboard",
    items: [{ label: "Overview", href: "/", icon: "dashboard", mark: "overview" }],
  },
  {
    id: "lifecycle",
    label: "Lifecycle",
    icon: "lifecycle",
    items: [
      { label: "New Breakdown", href: "/new-breakdown", icon: "fileAdd", mark: "new-breakdown" },
      {
        label: "Requirements Matrix",
        href: "/requirements-matrix",
        icon: "fileExport",
        mark: "requirements-matrix",
      },
      {
        label: "Product Breakdown",
        href: "/breakdown",
        icon: "hierarchy",
        mark: "breakdown",
        meta: "428 req",
      },
      {
        label: "Compliance & Standards",
        href: "/compliance",
        icon: "compliance",
        mark: "compliance",
        meta: "10",
      },
      {
        label: "CTS / CTQ Classification",
        href: "/classification",
        icon: "listCheck",
        mark: "classification",
      },
      {
        label: "Verification (V-Model)",
        href: "/verification",
        icon: "verification",
        mark: "verification",
        meta: "87%",
      },
      {
        label: "Hardware & BOM",
        href: "/hardware",
        icon: "hardware",
        mark: "hardware",
        meta: "342",
      },
    ],
  },
  {
    id: "traceability",
    label: "Traceability",
    icon: "traceability",
    items: [
      {
        label: "Traceability Explorer",
        href: "/traceability",
        icon: "traceability",
        mark: "traceability",
      },
    ],
  },
  {
    id: "platform",
    label: "Platform",
    icon: "agent",
    items: [
      { label: "AI Capability Map", href: "/capabilities", icon: "agent", mark: "capabilities" },
      {
        label: "Agent Runs / Queue",
        href: "/agent-runs",
        icon: "activity",
        mark: "agent-runs",
        badge: "2 failed",
        tone: "error",
      },
      {
        label: "Approvals Queue",
        href: "/approvals",
        icon: "approval",
        mark: "approvals",
        badge: "6 pending",
        tone: "warning",
      },
    ],
  },
  {
    id: "reports",
    label: "Reports",
    icon: "report",
    items: [{ label: "Reports & Exports", href: "/reports", icon: "report", mark: "reports" }],
  },
  {
    id: "admin",
    label: "Admin",
    icon: "integration",
    items: [
      { label: "Integrations", href: "/integrations", icon: "integration", mark: "integrations" },
      { label: "Audit Trail", href: "/audit", icon: "history", mark: "audit" },
    ],
  },
];

/** Rail footer destination (Chronos keeps settings out of the main list). */
export const SETTINGS_ITEM: NavItem = {
  label: "Settings",
  href: "/settings",
  icon: "settings",
  mark: "settings",
};

const SETTINGS_GROUP: NavGroup = {
  id: "settings",
  label: "Settings",
  icon: "settings",
  items: [SETTINGS_ITEM],
};

export const ALL_NAV_ITEMS = [...NAV_GROUPS.flatMap((g) => g.items), SETTINGS_ITEM];

/** Exact match, or longest prefix for nested paths ("/" only matches itself). */
export function navItemForPath(pathname: string): NavItem | undefined {
  return ALL_NAV_ITEMS.filter(
    (item) => pathname === item.href || (item.href !== "/" && pathname.startsWith(`${item.href}/`)),
  ).sort((a, b) => b.href.length - a.href.length)[0];
}

export function groupForPath(pathname: string): NavGroup | undefined {
  const item = navItemForPath(pathname);
  if (!item) return undefined;
  return [...NAV_GROUPS, SETTINGS_GROUP].find((g) => g.items.includes(item));
}

/** Most urgent badge tone among a group's items, for the collapsed-rail dot. */
export function groupAlert(group: NavGroup): NavTone | undefined {
  const tones = group.items.map((i) => i.tone);
  if (tones.includes("error")) return "error";
  if (tones.includes("warning")) return "warning";
  return undefined;
}
