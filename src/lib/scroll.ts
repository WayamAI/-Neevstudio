/** id of the shell's scroll container (<main> in routes/_app.tsx). */
export const APP_SCROLL_ID = "app-scroll";

export function appScrollElement(): HTMLElement {
  return document.getElementById(APP_SCROLL_ID) ?? document.documentElement;
}
