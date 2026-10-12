import { useEffect, useRef, useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { cn } from "@/lib/utils";
import { AppIcon } from "@/components/ui/app-icon";
import { APP_NAME, APP_TAGLINE } from "@/lib/branding";
import { useTheme } from "@/lib/theme-context";
import { NAV_GROUPS, navItemForPath } from "@/lib/navigation";
import { SidebarItem } from "@/components/layout/SidebarItem";

/**
 * Primary navigation: every Nirmiti page is its own item with its own icon,
 * in the original sections. Collapsed (68px) shows icons with tooltips;
 * expanded (252px) and the mobile drawer show section labels and item labels.
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
      {wordmark ? (
        <>
          <img
            src="/brand/wayam-logo-dark-bg-cropped.svg"
            alt="Wayam AI"
            width={748}
            height={427}
            className="hidden h-8 w-auto shrink-0 dark:block"
          />
          <img
            src="/brand/wayam-logo-light-bg-cropped.svg"
            alt="Wayam AI"
            width={748}
            height={427}
            className="h-8 w-auto shrink-0 dark:hidden"
          />
          <span className="min-w-0 border-l border-muted pl-2.5">
            <span className="block truncate font-display text-display-base text-primary">
              {APP_NAME}
            </span>
            <span className="block truncate text-micro text-quaternary">{BUILD}</span>
          </span>
        </>
      ) : (
        <img
          src="/brand/favicon.svg"
          alt=""
          width={32}
          height={32}
          className="size-8 shrink-0 rounded-[10px]"
        />
      )}
    </Link>
  );
}

export function Sidebar({ open = false, onClose }: { open?: boolean; onClose?: () => void }) {
  const path = useRouterState({ select: (s) => s.location.pathname });
  const { theme, toggle: toggleTheme } = useTheme();
  const [expanded, setExpanded] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const activeItem = navItemForPath(path);
  const showExpanded = expanded || open;
  const isDark = theme === "dark";

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
          "min-h-0 flex-1 overflow-x-hidden overflow-y-auto py-3",
          showExpanded ? "px-3" : "px-[14px]",
        )}
      >
        {NAV_GROUPS.map((group, gi) => (
          <div key={group.id} className={cn(gi > 0 && (showExpanded ? "mt-4" : "mt-2"))}>
            {showExpanded ? (
              <p className="mb-1.5 px-1 text-caption tracking-[0.08em] text-quaternary uppercase">
                {group.label}
              </p>
            ) : (
              gi > 0 && (
                <div aria-hidden className="mx-auto mb-2 h-px w-6 bg-[var(--stroke-muted)]" />
              )
            )}
            <ul aria-label={group.label} className="flex flex-col gap-1.5">
              {group.items.map((item) => (
                <li key={item.href}>
                  <SidebarItem
                    {...item}
                    active={activeItem?.href === item.href}
                    expanded={showExpanded}
                    onNavigate={onClose}
                  />
                </li>
              ))}
            </ul>
          </div>
        ))}
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
      </div>
    </aside>
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
