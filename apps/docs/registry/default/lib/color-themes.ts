/**
 * Live accent themes — orthogonal to next-themes light/dark/system.
 * CSS: `html[data-color-theme="<id>"]` in globals.css. Default Mira = no attribute.
 */

export const COLOR_THEME_STORAGE_KEY = "atro-color-theme"
export const COLOR_THEME_ATTR = "data-color-theme"

export const COLOR_THEMES = [
  {
    id: "mira",
    label: "Mira",
    description: "Violet — Atro default",
    /** Brand chip for the picker (matches light sidebar-primary) */
    swatch: "oklch(0.511 0.262 277)",
  },
  {
    id: "tide",
    label: "Tide",
    description: "Teal",
    swatch: "oklch(0.511 0.13 185)",
  },
  {
    id: "ember",
    label: "Ember",
    description: "Amber",
    swatch: "oklch(0.58 0.17 75)",
  },
  {
    id: "bloom",
    label: "Bloom",
    description: "Rose",
    swatch: "oklch(0.54 0.19 18)",
  },
  {
    id: "graphite",
    label: "Graphite",
    description: "Cool slate",
    swatch: "oklch(0.48 0.045 265)",
  },
] as const

export type ColorThemeId = (typeof COLOR_THEMES)[number]["id"]

export function isColorThemeId(value: string): value is ColorThemeId {
  return COLOR_THEMES.some((t) => t.id === value)
}

/** Apply accent theme to `<html>`. Mira clears the attribute (CSS default). */
export function applyColorTheme(id: ColorThemeId) {
  if (typeof document === "undefined") return
  const root = document.documentElement
  if (id === "mira") {
    root.removeAttribute(COLOR_THEME_ATTR)
  } else {
    root.setAttribute(COLOR_THEME_ATTR, id)
  }
  try {
    localStorage.setItem(COLOR_THEME_STORAGE_KEY, id)
  } catch {
    /* private mode */
  }
}

export function readStoredColorTheme(): ColorThemeId {
  if (typeof window === "undefined") return "mira"
  try {
    const raw = localStorage.getItem(COLOR_THEME_STORAGE_KEY)
    if (raw && isColorThemeId(raw)) return raw
  } catch {
    /* private mode */
  }
  return "mira"
}

/** Inline before paint — paste into a blocking `<script>` in the root layout. */
export const COLOR_THEME_BOOT_SCRIPT = `(function(){try{var k=${JSON.stringify(COLOR_THEME_STORAGE_KEY)},a=${JSON.stringify(COLOR_THEME_ATTR)},t=localStorage.getItem(k);if(t&&t!=="mira")document.documentElement.setAttribute(a,t);}catch(e){}})();`
