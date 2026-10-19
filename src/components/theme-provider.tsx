import { useEffect, useState, type ReactNode } from "react";
import { ThemeContext, THEME_STORAGE_KEY, type Theme } from "@/lib/theme-context";

export function ThemeProvider({ children }: { children: ReactNode }) {
  // Light by default (Chronos). The inline script in __root applies a saved
  // dark choice before paint; start from it so the first effect keeps it.
  const [theme, setThemeState] = useState<Theme>(() =>
    typeof document !== "undefined" && document.documentElement.classList.contains("dark")
      ? "dark"
      : "light",
  );

  useEffect(() => {
    const stored = (typeof window !== "undefined" &&
      localStorage.getItem(THEME_STORAGE_KEY)) as Theme | null;
    if (stored === "dark" || stored === "light") setThemeState(stored);
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle("dark", theme === "dark");
    root.style.colorScheme = theme;
    try {
      localStorage.setItem(THEME_STORAGE_KEY, theme);
    } catch {
      /* ignore */
    }
  }, [theme]);

  const setTheme = (t: Theme) => setThemeState(t);
  const toggle = () => setThemeState((p) => (p === "dark" ? "light" : "dark"));

  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggle }}>{children}</ThemeContext.Provider>
  );
}
