import { AppIcon } from "@/components/ui/app-icon";
import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { appScrollElement } from "@/lib/scroll";

export function StatusIcon({ status, small }: { status: string; small?: boolean }) {
  const size = small ? "h-3.5 w-3.5" : "h-4 w-4";
  if (status === "done")
    return <AppIcon name="success" className={cn(size, "text-success shrink-0")} />;
  if (status === "running")
    return <AppIcon name="spinner" className={cn(size, "text-primary animate-spin shrink-0")} />;
  if (status === "failed")
    return <AppIcon name="warning" className={cn(size, "text-coral shrink-0")} />;
  return <div className={cn(size, "rounded-full border border-border shrink-0")} />;
}

/** Keeps the window pinned to the bottom while new rows stream in — but only if
 *  the user is already near the bottom; scrolling up to read pauses it. */
export function useStickToBottom(dep: number) {
  const stuck = useRef(true);
  useEffect(() => {
    const onScroll = () => {
      const el = appScrollElement();
      stuck.current = el.scrollHeight - el.scrollTop - el.clientHeight < 160;
    };
    const target = appScrollElement();
    target.addEventListener("scroll", onScroll, { passive: true });
    return () => target.removeEventListener("scroll", onScroll);
  }, []);
  useEffect(() => {
    if (dep > 0 && stuck.current) {
      const el = appScrollElement();
      el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
    }
  }, [dep]);
}
