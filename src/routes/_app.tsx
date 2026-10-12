import { useEffect, useState } from "react";
import { createFileRoute, Outlet, useRouterState } from "@tanstack/react-router";
import { Sidebar } from "@/components/layout/Sidebar";
import { Topbar } from "@/components/layout/Topbar";
import { TooltipProvider } from "@/components/ui/tooltip";
import { APP_SCROLL_ID, appScrollElement } from "@/lib/scroll";

export const Route = createFileRoute("/_app")({
  component: AppLayout,
});

// Chronos shell: fixed-height frame, sidebar + top bar stay put, the page
// scrolls inside <main>. Long-running views follow output via APP_SCROLL_ID.
function AppLayout() {
  const [navOpen, setNavOpen] = useState(false);
  const path = useRouterState({ select: (s) => s.location.pathname });

  // New page starts at the top (the window no longer scrolls); close the drawer.
  useEffect(() => {
    appScrollElement().scrollTop = 0;
    setNavOpen(false);
  }, [path]);

  return (
    <TooltipProvider delayDuration={150}>
      <div className="flex h-dvh w-full overflow-hidden bg-page text-secondary">
        {navOpen && (
          <button
            type="button"
            aria-label="Close navigation"
            onClick={() => setNavOpen(false)}
            className="fixed inset-0 z-40 bg-overlay lg:hidden"
          />
        )}
        <Sidebar open={navOpen} onClose={() => setNavOpen(false)} />
        <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
          <Topbar onMenu={() => setNavOpen(true)} />
          <main
            id={APP_SCROLL_ID}
            className="min-h-0 flex-1 overflow-y-auto bg-page px-4 pb-6 sm:px-5"
          >
            <Outlet />
          </main>
        </div>
      </div>
    </TooltipProvider>
  );
}
