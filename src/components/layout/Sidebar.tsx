import { useEffect, useRef, useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { cn } from "@/lib/utils";
import { AppIcon } from "@/components/ui/app-icon";
import { APP_NAME, APP_TAGLINE } from "@/lib/branding";
import { useTheme } from "@/lib/theme-context";
import {
  NAV_GROUPS,
  SETTINGS_ITEM,
  groupAlert,
  groupForPath,
  navItemForPath,
  type NavGroup,
  type NavItem,
} from "@/lib/navigation";
import {
  SidebarGroupTrigger,
  SidebarItem,
  SidebarTreeBranch,
  SidebarTreeItem,
} from "@/components/layout/SidebarItem";

/**
 * Primary navigation, Chronos pattern: single-page groups are direct rail
 * items; the rest are collapsible trees so the rail stays short.
 * Collapsed (68px): group pucks, hover reveals a flyout of children.
 * Expanded (252px) / mobile drawer: accordion tree with branch lines.
 * The expanded preference is remembered per browser.
 */

const EXPANDED_KEY = "neevstudio-sidebar-expanded";
const BUILD = "v2.14.0 · build 8842";

function readExpanded() {
  try {
    return localStorage.getItem(EXPANDED_KEY) === "true";
  } catch {
    return false;
  }
}

function Logo({ wordmark }: { wordmark: boolean }) {
  return (
    <Link
      to="/"
      aria-label={`${APP_NAME} home`}
      title={wordmark ? undefined : `${APP_NAME} — ${APP_TAGLINE}`}
      className="flex min-w-0 items-center gap-2.5 rounded-lg outline-none focus-visible:ring-2 focus-visible:ring-ring"
    >
      <BrandLockup wordmark={wordmark} />
    </Link>
  );
}

/** Chronos lockup: orange mark tile, wordmark beside it when there is room. */
export function BrandLockup({ wordmark, build = true }: { wordmark: boolean; build?: boolean }) {
  return (
    <>
      <img
        src="/brand/favicon.svg"
        alt=""
        width={32}
        height={32}
        className="size-8 shrink-0 rounded-[10px]"
      />
      {wordmark && (
        <span className="min-w-0">
          <span className="block truncate font-display text-[15px] leading-5 tracking-[0.18em] text-primary uppercase">
            {APP_NAME}
          </span>
          {build && <span className="block truncate text-micro text-quaternary">{BUILD}</span>}
        </span>
      )}
    </>
  );
}

export function Sidebar({ open = false, onClose }: { open?: boolean; onClose?: () => void }) {
  const path = useRouterState({ select: (s) => s.location.pathname });
  const { theme, toggle: toggleTheme } = useTheme();
  const [expanded, setExpanded] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const [openIds, setOpenIds] = useState<Record<string, boolean>>({});
  const activeItem = navItemForPath(path);
  const activeGroup = groupForPath(path);
  const showExpanded = expanded || open;
  const isDark = theme === "dark";

  function isGroupOpen(id: string) {
    return openIds[id] ?? id === activeGroup?.id;
  }

  function onGroupClick(group: NavGroup) {
    if (!showExpanded) {
      setExpanded(true);
      setOpenIds((prev) => ({ ...prev, [group.id]: true }));
      return;
    }
    setOpenIds((prev) => ({ ...prev, [group.id]: !isGroupOpen(group.id) }));
  }

  useEffect(() => setExpanded(readExpanded()), []);

  // Keep the active item visible when the list is taller than the viewport.
  useEffect(() => {
    navRef.current?.querySelector("[aria-current=page]")?.scrollIntoView({ block: "nearest" });
  }, [path, showExpanded]);

  function toggleExpanded() {
    const next = !expanded;
    setExpanded(next);
    try {
      localStorage.setItem(EXPANDED_KEY, String(next));
    } catch {
      /* storage blocked */
    }
  }

  return (
    <aside
      aria-label="Primary"
      data-expanded={showExpanded}
      className={cn(
        "flex h-full shrink-0 flex-col border-r border-muted bg-container",
        "transition-[width,transform] duration-200 ease-out",
        "fixed inset-y-0 left-0 z-50 lg:relative lg:z-30 lg:translate-x-0",
        showExpanded ? "w-[252px]" : "w-[68px]",
        open
          ? "translate-x-0"
          : "pointer-events-none -translate-x-full lg:pointer-events-auto lg:translate-x-0",
      )}
    >
      <div
        className={cn(
          "flex h-14 shrink-0 items-center border-b border-muted",
          showExpanded ? "px-4" : "justify-center",
        )}
      >
        <Logo wordmark={showExpanded} />
      </div>

      <nav
        ref={navRef}
        aria-label="Main navigation"
        className={cn(
          "min-h-0 flex-1 py-3",
          showExpanded ? "overflow-x-hidden overflow-y-auto px-3" : "overflow-visible px-[14px]",
        )}
      >
        <ul className="flex flex-col gap-1.5">
          {NAV_GROUPS.map((group) => {
            if (group.items.length === 1) {
              const item = group.items[0];
              return (
                <li key={group.id}>
                  <SidebarItem
                    icon={item.icon}
                    label={item.label}
                    href={item.href}
                    meta={item.meta}
                    badge={item.badge}
                    tone={item.tone}
                    active={activeItem?.href === item.href}
                    expanded={showExpanded}
                    onNavigate={onClose}
                  />
                </li>
              );
            }

            const childActive = group.items.some((i) => i.href === activeItem?.href);
            const openGroup = showExpanded && isGroupOpen(group.id);
            return (
              <li
                key={group.id}
                className={showExpanded ? "relative overflow-hidden" : "group relative"}
              >
                <SidebarGroupTrigger
                  icon={group.icon}
                  label={group.label}
                  active={childActive}
                  expanded={showExpanded}
                  open={openGroup}
                  alert={groupAlert(group)}
                  onClick={() => onGroupClick(group)}
                />
                {openGroup && (
                  <SidebarTreeBranch>
                    <GroupLeaves
                      items={group.items}
                      activeHref={activeItem?.href}
                      onNavigate={onClose}
                    />
                  </SidebarTreeBranch>
                )}
                {!showExpanded && (
                  <CollapsedFlyout
                    group={group}
                    activeHref={activeItem?.href}
                    onNavigate={onClose}
                  />
                )}
              </li>
            );
          })}
        </ul>
      </nav>

      <div
        className={cn(
          "flex shrink-0 flex-col gap-1.5 border-t border-muted py-3",
          showExpanded ? "px-3" : "px-[14px]",
        )}
      >
        <div className="hidden lg:contents">
          <SidebarItem
            icon={showExpanded ? "sidebarClose" : "sidebarOpen"}
            label={showExpanded ? "Collapse sidebar" : "Expand sidebar"}
            onClick={toggleExpanded}
            expanded={showExpanded}
          />
        </div>
        <SidebarItem
          icon={isDark ? "sun" : "moon"}
          label={isDark ? "Switch to light" : "Switch to dark"}
          onClick={toggleTheme}
          expanded={showExpanded}
        />
        <SidebarItem
          icon={SETTINGS_ITEM.icon}
          label={SETTINGS_ITEM.label}
          href={SETTINGS_ITEM.href}
          active={activeItem?.href === SETTINGS_ITEM.href}
          expanded={showExpanded}
          onNavigate={onClose}
        />
      </div>
    </aside>
  );
}

function GroupLeaves({
  items,
  activeHref,
  onNavigate,
}: {
  items: NavItem[];
  activeHref?: string;
  onNavigate?: () => void;
}) {
  return (
    <ul className="flex flex-col">
      {items.map((item, i) => (
        <li key={item.href}>
          <SidebarTreeItem
            href={item.href}
            label={item.label}
            icon={item.icon}
            meta={item.meta}
            badge={item.badge}
            tone={item.tone}
            active={activeHref === item.href}
            last={i === items.length - 1}
            onNavigate={onNavigate}
          />
        </li>
      ))}
    </ul>
  );
}

/** Hover panel for the collapsed rail so nested pages stay one click away. */
function CollapsedFlyout({
  group,
  activeHref,
  onNavigate,
}: {
  group: NavGroup;
  activeHref?: string;
  onNavigate?: () => void;
}) {
  return (
    <div className="pointer-events-none invisible absolute top-0 left-full z-50 opacity-0 transition-[opacity,visibility] duration-[180ms] group-hover:pointer-events-auto group-hover:visible group-hover:opacity-100 focus-within:pointer-events-auto focus-within:visible focus-within:opacity-100">
      <div className="pl-2">
        <div className="max-h-[min(80vh,560px)] w-[248px] overflow-y-auto rounded-xl border border-muted bg-container py-2 shadow-lg">
          <p className="px-3 pb-1 text-caption tracking-[0.08em] text-quaternary uppercase">
            {group.label}
          </p>
          <SidebarTreeBranch>
            <GroupLeaves items={group.items} activeHref={activeHref} onNavigate={onNavigate} />
          </SidebarTreeBranch>
        </div>
      </div>
    </div>
  );
}

/** Mobile-only control; lives in the top bar, not the rail. */
export function SidebarMenuButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label="Open navigation"
      className="flex size-8 items-center justify-center rounded-full bg-action text-icon-tertiary outline-none transition-colors duration-[180ms] hover:bg-raised-2 hover:text-icon-secondary focus-visible:ring-2 focus-visible:ring-ring lg:hidden"
    >
      <AppIcon name="menu" />
    </button>
  );
}
