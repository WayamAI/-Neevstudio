import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportError } from "../lib/error-reporting";
import { LoginGate } from "@/components/login-gate";
import { ThemeProvider } from "@/components/theme-provider";
import { APP_NAME, APP_TAGLINE } from "@/lib/branding";
import { THEME_STORAGE_KEY } from "@/lib/theme-context";
import { buttonVariants } from "@/components/ui/button";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-page px-4">
      <div className="max-w-md text-center">
        <h1 className="font-display text-display-metric-xl text-primary tabular">404</h1>
        <h2 className="mt-6 text-heading-md text-primary">Page not found</h2>
        <p className="mt-2 text-body-md text-tertiary">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link to="/" className={buttonVariants()}>
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportError(error, { boundary: "root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-page px-4">
      <div className="max-w-md text-center">
        <h1 className="text-heading-md text-primary">This page didn't load</h1>
        <p className="mt-2 text-body-md text-tertiary">Something went wrong on our end.</p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className={buttonVariants()}
          >
            Try again
          </button>
          <a href="/" className={buttonVariants({ variant: "outline" })}>
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      {
        title: `${APP_NAME} - ${APP_TAGLINE} for Regulated Hardware`,
      },
      {
        name: "description",
        content:
          "Decompose, classify, verify, and optimize regulated hardware programs with live, bidirectional traceability from requirements to BOM.",
      },
      { name: "author", content: APP_NAME },
      { name: "theme-color", content: "#000000" },
      { property: "og:title", content: `${APP_NAME} - ${APP_TAGLINE}` },
      {
        property: "og:description",
        content: "Live requirement-to-BOM traceability for regulated hardware programs.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      {
        rel: "preconnect",
        href: "https://fonts.googleapis.com",
      },
      {
        rel: "preconnect",
        href: "https://fonts.gstatic.com",
        crossOrigin: "anonymous",
      },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Geist:wght@400;500;600;700&family=Michroma&family=JetBrains+Mono:wght@400;500&display=swap",
      },
      { rel: "stylesheet", href: appCss },
      { rel: "icon", href: "/favicon.ico", sizes: "48x48" },
      { rel: "icon", href: "/brand/favicon.svg", type: "image/svg+xml" },
      { rel: "icon", href: "/brand/favicon-32.png", type: "image/png", sizes: "32x32" },
      { rel: "apple-touch-icon", href: "/apple-touch-icon.png", sizes: "180x180" },
      { rel: "manifest", href: "/site.webmanifest" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en" style={{ colorScheme: "light" }} suppressHydrationWarning>
      <head>
        {/* Light by default (Chronos); apply a saved dark choice before first paint. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `try{if(localStorage.getItem(${JSON.stringify(THEME_STORAGE_KEY)})==="dark"){var d=document.documentElement;d.classList.add("dark");d.style.colorScheme="dark"}}catch(e){}`,
          }}
        />
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <LoginGate>
          <Outlet />
        </LoginGate>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
