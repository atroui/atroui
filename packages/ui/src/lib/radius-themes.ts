/**
 * Live radius themes — orthogonal to accent + light/dark.
 * CSS: `html[data-radius="<id>"]` in globals.css. Default Mira = no attribute.
 */

export const RADIUS_THEME_STORAGE_KEY = "atro-radius-theme"
export const RADIUS_THEME_ATTR = "data-radius"

export const RADIUS_THEMES = [
  {
    id: "soft",
    label: "Soft",
    description: "0.65rem — rounder soft-rect",
    /** CSS --radius value */
    value: "0.65rem",
  },
  {
    id: "mira",
    label: "Mira",
    description: "0.45rem — Atro default",
    value: "0.45rem",
  },
  {
    id: "sharp",
    label: "Sharp",
    description: "0.25rem — tighter corners",
    value: "0.25rem",
  },
] as const

export type RadiusThemeId = (typeof RADIUS_THEMES)[number]["id"]

export function isRadiusThemeId(value: string): value is RadiusThemeId {
  return RADIUS_THEMES.some((t) => t.id === value)
}

export function radiusThemeValue(id: RadiusThemeId): string {
  return RADIUS_THEMES.find((t) => t.id === id)?.value ?? "0.45rem"
}

/** Apply radius theme to `<html>`. Mira clears the attribute (CSS default). */
export function applyRadiusTheme(id: RadiusThemeId) {
  if (typeof document === "undefined") return
  const root = document.documentElement
  if (id === "mira") {
    root.removeAttribute(RADIUS_THEME_ATTR)
  } else {
    root.setAttribute(RADIUS_THEME_ATTR, id)
  }
  try {
    localStorage.setItem(RADIUS_THEME_STORAGE_KEY, id)
  } catch {
    /* private mode */
  }
}

export function readStoredRadiusTheme(): RadiusThemeId {
  if (typeof window === "undefined") return "mira"
  try {
    const raw = localStorage.getItem(RADIUS_THEME_STORAGE_KEY)
    if (raw && isRadiusThemeId(raw)) return raw
  } catch {
    /* private mode */
  }
  return "mira"
}

/** Inline before paint — paste into a blocking `<script>` in the root layout. */
export const RADIUS_THEME_BOOT_SCRIPT = `(function(){try{var k=${JSON.stringify(RADIUS_THEME_STORAGE_KEY)},a=${JSON.stringify(RADIUS_THEME_ATTR)},t=localStorage.getItem(k);if(t&&t!=="mira")document.documentElement.setAttribute(a,t);}catch(e){}})();`
