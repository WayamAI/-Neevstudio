import type { ReactNode } from "react";

/**
 * In-page header (Chronos pattern): the top bar says where you are; this says
 * what the screen is for and carries its actions. Spans the full content width.
 */
export function PageHeader({
  title,
  subtitle,
  actions,
}: {
  title: string;
  subtitle?: string;
  actions?: ReactNode;
}) {
  return (
    <div className="-mx-4 mb-5 border-b border-muted px-4 py-4 sm:-mx-5 sm:px-5">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
        <div className="min-w-0">
          <h1 className="min-w-0 font-display text-display-lg text-primary sm:text-display-xl">
            {title}
          </h1>
          {subtitle && <p className="mt-1 max-w-[70ch] text-body-md text-tertiary">{subtitle}</p>}
        </div>
        {actions && <div className="flex flex-wrap items-center gap-2">{actions}</div>}
      </div>
    </div>
  );
}
