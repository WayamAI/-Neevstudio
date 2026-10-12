import { useState } from "react";
import { useRouterState } from "@tanstack/react-router";
import { Badge } from "@/components/ui/badge";
import { AppIcon } from "@/components/ui/app-icon";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { SidebarMenuButton } from "@/components/layout/Sidebar";
import { APP_NAME } from "@/lib/branding";
import { groupForPath, navItemForPath } from "@/lib/navigation";
import { programs, notifications } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

/** Chronos top-bar pill (search, scope, notifications). */
const pill =
  "flex h-8 items-center gap-1.5 rounded-full border border-muted bg-action px-3 text-label-sm text-tertiary outline-none transition-colors duration-[180ms] hover:border-default hover:bg-raised-2 hover:text-secondary focus-visible:ring-2 focus-visible:ring-ring";

/**
 * Application top bar, adapted from Chronos: where you are (group + page
 * title) on the left, Nirmiti's global controls as pills on the right.
 */
export function Topbar({ onMenu }: { onMenu: () => void }) {
  const path = useRouterState({ select: (s) => s.location.pathname });
  const item = navItemForPath(path);
  const group = groupForPath(path);
  const [activeProgram, setActiveProgram] = useState(programs[0]);

  return (
    <header className="flex h-14 shrink-0 items-center justify-between gap-3 border-b border-muted bg-page px-4 sm:gap-4 sm:px-5">
      <nav aria-label="Breadcrumb" className="flex min-w-0 items-center gap-2.5">
        <SidebarMenuButton onClick={onMenu} />
        {group && group.label !== item?.label && (
          <span className="hidden text-caption tracking-[0.08em] text-quaternary uppercase sm:inline">
            {group.label}
          </span>
        )}
        <span aria-current="page" className="truncate font-display text-display-lg text-primary">
          {item?.label ?? APP_NAME}
        </span>
      </nav>

      <div className="flex shrink-0 items-center gap-2">
        {/* Search */}
        <label className={cn(pill, "hidden w-[220px] cursor-text md:flex xl:w-[300px]")}>
          <AppIcon name="search" size="xs" />
          <input
            aria-label="Search"
            placeholder="Search requirements, parts, standards…"
            className="min-w-0 flex-1 bg-transparent text-label-sm text-primary outline-none placeholder:text-tertiary"
          />
          <kbd className="rounded border border-muted px-1 text-caption text-quaternary">K</kbd>
        </label>

        {/* Program switcher */}
        <DropdownMenu>
          <DropdownMenuTrigger className={cn(pill, "max-w-[200px]")}>
            <span className="truncate text-secondary">{activeProgram.name}</span>
            <span className="hidden text-quaternary sm:inline">·</span>
            <span className="hidden truncate text-success sm:inline">{activeProgram.stage}</span>
            <AppIcon name="chevronDown" size="xs" />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-72">
            <DropdownMenuLabel>Switch program</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {programs.map((p) => (
              <DropdownMenuItem
                key={p.id}
                onSelect={() => setActiveProgram(p)}
                className="flex flex-col items-start gap-0.5 py-2"
              >
                <div className="flex w-full items-center justify-between">
                  <span className="font-medium text-primary">{p.name}</span>
                  <span className="tabular text-caption text-tertiary">{p.maturity}%</span>
                </div>
                <span className="text-caption text-tertiary">
                  {p.subtitle} · {p.stage}
                </span>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Notifications */}
        <DropdownMenu>
          <DropdownMenuTrigger
            aria-label={`Notifications (${notifications.length})`}
            className="relative flex size-8 items-center justify-center rounded-full text-icon-tertiary outline-none transition-colors duration-[180ms] hover:bg-action hover:text-icon-secondary focus-visible:ring-2 focus-visible:ring-ring"
          >
            <AppIcon name="notification" />
            <span className="absolute -top-0.5 -right-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-error-badge px-1 text-micro leading-none font-medium text-badge tabular">
              {notifications.length}
            </span>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80 max-w-[calc(100vw-1.5rem)]">
            <DropdownMenuLabel className="flex items-center justify-between">
              <span>Notifications</span>
              <Badge variant="secondary" className="tabular">
                {notifications.length}
              </Badge>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            {notifications.map((n) => (
              <DropdownMenuItem key={n.id} className="flex flex-col items-start gap-1 py-2">
                <div className="flex w-full items-center gap-2">
                  <span
                    className={cn(
                      "h-1.5 w-1.5 shrink-0 rounded-full",
                      n.severity === "critical"
                        ? "bg-icon-error"
                        : n.severity === "warn"
                          ? "bg-icon-warning"
                          : "bg-icon-info",
                    )}
                  />
                  <span className="text-body-sm text-primary">{n.text}</span>
                </div>
                <span className="pl-3.5 text-micro text-tertiary">{n.when}</span>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Settings shortcut — kept as in the original (no handler) */}
        <button
          type="button"
          aria-label="Settings"
          className="hidden size-8 items-center justify-center rounded-full text-icon-tertiary outline-none transition-colors duration-[180ms] hover:bg-action hover:text-icon-secondary focus-visible:ring-2 focus-visible:ring-ring sm:flex"
        >
          <AppIcon name="settings" />
        </button>

        {/* User */}
        <DropdownMenu>
          <DropdownMenuTrigger
            aria-label="Account: A. Bermejo"
            className="rounded-full outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <Avatar className="size-8">
              <AvatarFallback className="bg-action-primary text-caption text-on-color">
                AB
              </AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>Signed in as</DropdownMenuLabel>
            <DropdownMenuItem className="flex-col items-start">
              <div className="text-label-md text-primary">A. Bermejo</div>
              <div className="text-caption text-tertiary">Program Manager · Aeris V500</div>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Profile & preferences</DropdownMenuItem>
            <DropdownMenuItem>Switch role</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-error focus:text-error">Sign out</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
