import type { ReactNode } from "react";
import { useRouterState } from "@tanstack/react-router";
import { Mark } from "@/components/ui/mark";
import type { MarkId } from "@/lib/marks";
import { navItemForPath } from "@/lib/navigation";

/**
 * In-page header (Chronos pattern): the top bar says where you are; this says
 * what the screen is for and carries its actions. Spans the full content width.
 * The 3D mark beside the title comes from the route's nav item unless given.
 */
export function PageHeader({
  title,
  subtitle,
  actions,
  mark,
}: {
  title: string;
  subtitle?: string;
  actions?: ReactNode;
  /** Override the route's mark; `false` hides it. */
  mark?: MarkId | false;
}) {
  const path = useRouterState({ select: (s) => s.location.pathname });
  const markId = mark === undefined ? navItemForPath(path)?.mark : mark || undefined;

  return (
    <div className="-mx-4 mb-5 border-b border-muted px-4 py-4 sm:-mx-5 sm:px-5">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
        <div className="min-w-0">
          <div className="flex min-w-0 items-center gap-3">
            {markId && <Mark id={markId} size={40} />}
            <h1 className="min-w-0 font-display text-display-lg text-primary sm:text-display-xl">
              {title}
            </h1>
          </div>
          {subtitle && <p className="mt-1 max-w-[70ch] text-body-md text-tertiary">{subtitle}</p>}
        </div>
        {actions && <div className="flex flex-wrap items-center gap-2">{actions}</div>}
      </div>
    </div>
  );
}
