import type { ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { AppIcon } from "@/components/ui/app-icon";
import type { IconName } from "@/lib/icons";
import type { NavTone } from "@/lib/navigation";
import { cn } from "@/lib/utils";

// Adapted from the Chronos sidebar (components/layout/sidebar-item.tsx):
// circular "puck" icons, label beside the puck when expanded, tree leaves
// hanging off a shared spine.

function puckClass(active: boolean) {
  return cn(
    "flex size-9 shrink-0 items-center justify-center rounded-full",
    "transition-[background-color,color] duration-[180ms] ease-out",
    active
      ? "bg-action-primary text-icon-on-color"
      : "bg-action text-icon-tertiary group-hover:bg-raised-2 group-hover:text-icon-secondary",
  );
}

function wrapperClass(expanded: boolean, extra = "") {
  return cn(
    "group relative flex items-center rounded-full outline-none",
    "transition-colors duration-[180ms] ease-out",
    "focus-visible:ring-2 focus-visible:ring-ring",
    expanded ? "w-full gap-3 pr-3" : "justify-center",
    extra,
  );
}

function labelClass(active: boolean) {
  return cn(
    "truncate text-label-sm transition-colors duration-[180ms]",
    active ? "text-primary" : "text-tertiary group-hover:text-secondary",
  );
}

function StatusDot({ tone }: { tone?: NavTone }) {
  return (
    <span
      aria-hidden
      className={cn(
        "absolute top-0 right-0 size-2 rounded-full ring-2 ring-container",
        tone === "error" ? "bg-icon-error" : "bg-icon-warning",
      )}
    />
  );
}

function Trailing({
  meta,
  badge,
  tone,
  active,
}: {
  meta?: string;
  badge?: string;
  tone?: NavTone;
  active?: boolean;
}) {
  return (
    <>
      {meta && (
        <span
          className={cn(
            "ml-auto shrink-0 tabular text-caption",
            active ? "text-tertiary" : "text-quaternary",
          )}
        >
          {meta}
        </span>
      )}
      {badge && (
        <span
          className={cn(
            "ml-auto shrink-0 tabular text-caption",
            tone === "error" ? "text-error" : "text-warning",
          )}
        >
          {badge}
        </span>
      )}
    </>
  );
}

type ItemProps = {
  icon: IconName;
  /** Visible when expanded; always the accessible name. */
  label: string;
  active?: boolean;
  expanded?: boolean;
  meta?: string;
  badge?: string;
  tone?: NavTone;
  onNavigate?: () => void;
} & ({ href: string; onClick?: never } | { href?: undefined; onClick: () => void });

/** One rail control — a route link with `href`, otherwise a button. */
export function SidebarItem({
  icon,
  label,
  active = false,
  expanded = false,
  href,
  onClick,
  onNavigate,
  meta,
  badge,
  tone,
}: ItemProps) {
  const content = (
    <>
      <span className={cn(puckClass(active), "relative")}>
        <AppIcon name={icon} size="lg" />
        {!expanded && badge && <StatusDot tone={tone} />}
      </span>
      {expanded && (
        <>
          <span className={labelClass(active)}>{label}</span>
          <Trailing meta={meta} badge={badge} tone={tone} active={active} />
        </>
      )}
    </>
  );
  const name = [label, meta, badge].filter(Boolean).join(" · ");

  if (href) {
    return (
      <Link
        to={href}
        title={expanded ? undefined : name}
        aria-label={expanded ? undefined : name}
        aria-current={active ? "page" : undefined}
        onClick={onNavigate}
        className={wrapperClass(expanded)}
      >
        {content}
      </Link>
    );
  }
  return (
    <button
      type="button"
      onClick={onClick}
      title={expanded ? undefined : label}
      aria-label={label}
      className={wrapperClass(expanded)}
    >
      {content}
    </button>
  );
}

/** Collapsible group header — same puck, plus a chevron when expanded. */
export function SidebarGroupTrigger({
  icon,
  label,
  active = false,
  expanded = false,
  open = false,
  alert,
  onClick,
}: {
  icon: IconName;
  label: string;
  active?: boolean;
  expanded?: boolean;
  open?: boolean;
  /** Tone of the most urgent child badge, shown as a dot when collapsed. */
  alert?: NavTone;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      title={expanded ? undefined : label}
      aria-label={label}
      aria-expanded={expanded ? open : undefined}
      className={wrapperClass(expanded, expanded ? "pr-2" : "")}
    >
      <span className={cn(puckClass(active), "relative")}>
        <AppIcon name={icon} size="lg" />
        {!expanded && alert && <StatusDot tone={alert} />}
      </span>
      {expanded && (
        <>
          <span className={cn(labelClass(active), "min-w-0 flex-1 text-left")}>{label}</span>
          <AppIcon
            name="chevronRight"
            size="sm"
            className={cn(
              "text-icon-quaternary transition-transform duration-[180ms]",
              open && "rotate-90",
            )}
          />
        </>
      )}
    </button>
  );
}

/** Nested leaf — a short tick off the shared spine; the last leaf is an L. */
export function SidebarTreeItem({
  href,
  label,
  icon,
  active = false,
  last = false,
  meta,
  badge,
  tone,
  onNavigate,
}: {
  href: string;
  label: string;
  icon: IconName;
  active?: boolean;
  last?: boolean;
  meta?: string;
  badge?: string;
  tone?: NavTone;
  onNavigate?: () => void;
}) {
  return (
    <Link
      to={href}
      aria-current={active ? "page" : undefined}
      onClick={onNavigate}
      className={cn(
        "group relative flex items-center gap-2 rounded-lg py-1.5 pr-2 pl-3",
        "outline-none transition-colors duration-[180ms] ease-out",
        "focus-visible:ring-2 focus-visible:ring-ring",
        active ? "bg-action text-primary" : "text-tertiary hover:bg-action hover:text-secondary",
      )}
    >
      {last ? (
        <span
          aria-hidden
          className="pointer-events-none absolute top-0 -left-px h-1/2 w-2.5 rounded-bl-[3px] border-b border-l border-muted"
        />
      ) : (
        <span
          aria-hidden
          className="pointer-events-none absolute top-1/2 -left-px h-px w-2.5 bg-[var(--stroke-muted)]"
        />
      )}
      <AppIcon
        name={icon}
        size="sm"
        className={
          active ? "text-icon-secondary" : "text-icon-quaternary group-hover:text-icon-tertiary"
        }
      />
      <span className="truncate text-label-sm">{label}</span>
      <Trailing meta={meta} badge={badge} tone={tone} active={active} />
    </Link>
  );
}

/** Spine stops at the last leaf so it cannot paint through groups below. */
export function SidebarTreeBranch({ children }: { children: ReactNode }) {
  return (
    <div className="relative mt-0.5 ml-[18px] overflow-hidden">
      <span
        aria-hidden
        className="pointer-events-none absolute top-0 bottom-4 left-0 w-px bg-[var(--stroke-muted)]"
      />
      {children}
    </div>
  );
}
