import { useState, type FormEvent, type ReactNode } from "react";

import { AppIcon } from "@/components/ui/app-icon";
import { WaveformHero } from "@/components/WaveformHero";
import { APP_NAME, APP_TAGLINE } from "@/lib/branding";
import { useTheme } from "@/lib/theme-context";

// Demo mode — there's no user backend yet, so any well-formed email plus any
// non-empty password signs in. This is intentionally not real auth.
//
// Not persisted (no localStorage/cookie) — every fresh load of the app (new
// tab, reload, reopening the link) shows the login page again. Signing in
// only unlocks the current in-memory session.
export function LoginGate({ children }: { children: ReactNode }) {
  const [unlocked, setUnlocked] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const { theme, toggle } = useTheme();

  if (unlocked) return <>{children}</>;

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
    if (validEmail && password.length > 0) {
      setUnlocked(true);
    } else {
      setError(true);
    }
  };

  const fieldLabel = "text-caption tracking-[0.08em] text-quaternary uppercase";
  const field =
    "h-11 w-full rounded-full border border-muted bg-action px-4 text-body-md text-primary outline-none placeholder:text-quaternary focus-visible:border-default focus-visible:ring-2 focus-visible:ring-ring";

  // Layout follows the Chronos sign-in: brand panel left, form column right.
  return (
    <div className="fixed inset-0 z-50 flex min-h-0 bg-page">
      <aside className="relative hidden min-w-0 flex-[1.4] overflow-hidden border-r border-muted bg-container lg:block">
        <WaveformHero className="absolute inset-0 rounded-none border-0" height={900} />
        <div className="absolute inset-x-0 bottom-0 h-[45%] bg-gradient-to-t from-container to-transparent" />
        <div className="absolute right-10 bottom-10 left-10 max-w-[36rem]">
          <p className="font-display text-display-2xl text-primary xl:text-display-3xl">
            {APP_TAGLINE}
          </p>
          <p className="mt-3 max-w-[46ch] text-body-md text-tertiary">
            Decompose, classify, verify, and optimize regulated hardware programs with live,
            bidirectional traceability from requirements to BOM.
          </p>
        </div>
      </aside>

      <section className="flex min-h-0 w-full shrink-0 flex-col overflow-y-auto bg-page lg:w-[min(28rem,42%)]">
        <div className="flex items-center justify-between px-8 pt-6">
          <span className="flex items-center gap-2.5">
            <img
              src="/brand/wayam-logo-dark-bg-cropped.svg"
              alt="Wayam AI"
              className="hidden h-8 w-auto dark:block"
            />
            <img
              src="/brand/wayam-logo-light-bg-cropped.svg"
              alt="Wayam AI"
              className="h-8 w-auto dark:hidden"
            />
            <span className="border-l border-muted pl-2.5 font-display text-display-base text-primary">
              {APP_NAME}
            </span>
          </span>
          <button
            type="button"
            onClick={toggle}
            aria-label={theme === "dark" ? "Switch to light" : "Switch to dark"}
            className="flex size-8 items-center justify-center rounded-full bg-action text-icon-tertiary outline-none transition-colors duration-[180ms] hover:bg-raised-2 hover:text-icon-secondary focus-visible:ring-2 focus-visible:ring-ring"
          >
            <AppIcon name={theme === "dark" ? "sun" : "moon"} />
          </button>
        </div>

        <div className="flex min-h-0 flex-1 flex-col justify-center px-8 py-10">
          <h1 className="font-display text-display-xl text-primary">Sign in</h1>
          <p className="mt-1.5 text-body-md text-tertiary">
            Sign in with your email and password to continue.
          </p>

          <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-4">
            <label className="flex flex-col gap-1.5" htmlFor="login-email">
              <span className={fieldLabel}>Email</span>
              <input
                id="login-email"
                type="email"
                autoFocus
                autoComplete="email"
                required
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setError(false);
                }}
                className={field}
              />
            </label>
            <label className="flex flex-col gap-1.5" htmlFor="login-password">
              <span className={fieldLabel}>Password</span>
              <input
                id="login-password"
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError(false);
                }}
                className={field}
              />
            </label>
            {error && (
              <p role="alert" className="text-body-sm text-error">
                Enter a valid email and password.
              </p>
            )}
            <button
              type="submit"
              className="mt-1 h-11 rounded-full bg-action-primary text-label-md text-on-color outline-none transition-colors duration-[180ms] hover:bg-action-primary-hover focus-visible:ring-2 focus-visible:ring-ring"
            >
              Sign in
            </button>
          </form>

          <p className="mt-6 text-body-sm text-quaternary">
            Demo mode — any email and password will sign you in.
          </p>
        </div>
      </section>
    </div>
  );
}
