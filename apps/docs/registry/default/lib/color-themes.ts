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

/** Accent tokens overridden by live color themes (surfaces stay Mira). */
export type AccentTokens = {
  primary: string
  "primary-foreground": string
  "sidebar-primary": string
  "sidebar-primary-foreground": string
  ring: string
  "sidebar-ring": string
  "chart-1": string
  "chart-2": string
  "chart-3": string
  "chart-4": string
  "chart-5": string
}

/** Token maps for Theme Studio export — mirrors globals.css accent blocks. */
export const COLOR_THEME_TOKENS: Record<
  ColorThemeId,
  { light: AccentTokens; dark: AccentTokens }
> = {
  mira: {
    light: {
      primary: "oklch(0.457 0.24 277.023)",
      "primary-foreground": "oklch(0.962 0.018 272.314)",
      "sidebar-primary": "oklch(0.511 0.262 276.966)",
      "sidebar-primary-foreground": "oklch(0.962 0.018 272.314)",
      ring: "oklch(0.55 0.08 277)",
      "sidebar-ring": "oklch(0.55 0.08 277)",
      "chart-1": "oklch(0.785 0.115 274.713)",
      "chart-2": "oklch(0.585 0.233 277.117)",
      "chart-3": "oklch(0.511 0.262 276.966)",
      "chart-4": "oklch(0.457 0.24 277.023)",
      "chart-5": "oklch(0.398 0.195 277.366)",
    },
    dark: {
      primary: "oklch(0.398 0.195 277.366)",
      "primary-foreground": "oklch(0.962 0.018 272.314)",
      "sidebar-primary": "oklch(0.585 0.233 277.117)",
      "sidebar-primary-foreground": "oklch(0.962 0.018 272.314)",
      ring: "oklch(0.552 0.016 285.938)",
      "sidebar-ring": "oklch(0.552 0.016 285.938)",
      "chart-1": "oklch(0.785 0.115 274.713)",
      "chart-2": "oklch(0.585 0.233 277.117)",
      "chart-3": "oklch(0.511 0.262 276.966)",
      "chart-4": "oklch(0.457 0.24 277.023)",
      "chart-5": "oklch(0.398 0.195 277.366)",
    },
  },
  tide: {
    light: {
      primary: "oklch(0.457 0.12 185)",
      "primary-foreground": "oklch(0.98 0.01 185)",
      "sidebar-primary": "oklch(0.511 0.13 185)",
      "sidebar-primary-foreground": "oklch(0.98 0.01 185)",
      ring: "oklch(0.55 0.07 185)",
      "sidebar-ring": "oklch(0.55 0.07 185)",
      "chart-1": "oklch(0.785 0.08 185)",
      "chart-2": "oklch(0.585 0.11 185)",
      "chart-3": "oklch(0.511 0.13 185)",
      "chart-4": "oklch(0.457 0.12 185)",
      "chart-5": "oklch(0.42 0.1 185)",
    },
    dark: {
      primary: "oklch(0.42 0.1 185)",
      "primary-foreground": "oklch(0.98 0.01 185)",
      "sidebar-primary": "oklch(0.585 0.12 185)",
      "sidebar-primary-foreground": "oklch(0.98 0.01 185)",
      ring: "oklch(0.55 0.04 185)",
      "sidebar-ring": "oklch(0.55 0.04 185)",
      "chart-1": "oklch(0.785 0.08 185)",
      "chart-2": "oklch(0.585 0.12 185)",
      "chart-3": "oklch(0.511 0.13 185)",
      "chart-4": "oklch(0.457 0.12 185)",
      "chart-5": "oklch(0.42 0.1 185)",
    },
  },
  ember: {
    light: {
      primary: "oklch(0.55 0.16 75)",
      "primary-foreground": "oklch(0.22 0.03 75)",
      "sidebar-primary": "oklch(0.58 0.17 75)",
      "sidebar-primary-foreground": "oklch(0.22 0.03 75)",
      ring: "oklch(0.6 0.1 75)",
      "sidebar-ring": "oklch(0.6 0.1 75)",
      "chart-1": "oklch(0.82 0.1 75)",
      "chart-2": "oklch(0.65 0.14 75)",
      "chart-3": "oklch(0.58 0.17 75)",
      "chart-4": "oklch(0.55 0.16 75)",
      "chart-5": "oklch(0.48 0.14 75)",
    },
    dark: {
      primary: "oklch(0.48 0.14 75)",
      "primary-foreground": "oklch(0.98 0.01 85)",
      "sidebar-primary": "oklch(0.65 0.15 75)",
      "sidebar-primary-foreground": "oklch(0.22 0.03 75)",
      ring: "oklch(0.58 0.06 75)",
      "sidebar-ring": "oklch(0.58 0.06 75)",
      "chart-1": "oklch(0.82 0.1 75)",
      "chart-2": "oklch(0.65 0.15 75)",
      "chart-3": "oklch(0.58 0.17 75)",
      "chart-4": "oklch(0.55 0.16 75)",
      "chart-5": "oklch(0.48 0.14 75)",
    },
  },
  bloom: {
    light: {
      primary: "oklch(0.5 0.18 18)",
      "primary-foreground": "oklch(0.98 0.01 20)",
      "sidebar-primary": "oklch(0.54 0.19 18)",
      "sidebar-primary-foreground": "oklch(0.98 0.01 20)",
      ring: "oklch(0.58 0.1 18)",
      "sidebar-ring": "oklch(0.58 0.1 18)",
      "chart-1": "oklch(0.8 0.1 18)",
      "chart-2": "oklch(0.6 0.15 18)",
      "chart-3": "oklch(0.54 0.19 18)",
      "chart-4": "oklch(0.5 0.18 18)",
      "chart-5": "oklch(0.45 0.15 18)",
    },
    dark: {
      primary: "oklch(0.45 0.15 18)",
      "primary-foreground": "oklch(0.98 0.01 20)",
      "sidebar-primary": "oklch(0.6 0.16 18)",
      "sidebar-primary-foreground": "oklch(0.98 0.01 20)",
      ring: "oklch(0.55 0.05 18)",
      "sidebar-ring": "oklch(0.55 0.05 18)",
      "chart-1": "oklch(0.8 0.1 18)",
      "chart-2": "oklch(0.6 0.16 18)",
      "chart-3": "oklch(0.54 0.19 18)",
      "chart-4": "oklch(0.5 0.18 18)",
      "chart-5": "oklch(0.45 0.15 18)",
    },
  },
  graphite: {
    light: {
      primary: "oklch(0.42 0.04 265)",
      "primary-foreground": "oklch(0.98 0 0)",
      "sidebar-primary": "oklch(0.48 0.045 265)",
      "sidebar-primary-foreground": "oklch(0.98 0 0)",
      ring: "oklch(0.55 0.03 265)",
      "sidebar-ring": "oklch(0.55 0.03 265)",
      "chart-1": "oklch(0.78 0.03 265)",
      "chart-2": "oklch(0.58 0.04 265)",
      "chart-3": "oklch(0.48 0.045 265)",
      "chart-4": "oklch(0.42 0.04 265)",
      "chart-5": "oklch(0.36 0.03 265)",
    },
    dark: {
      primary: "oklch(0.48 0.03 265)",
      "primary-foreground": "oklch(0.98 0 0)",
      "sidebar-primary": "oklch(0.58 0.04 265)",
      "sidebar-primary-foreground": "oklch(0.98 0 0)",
      ring: "oklch(0.55 0.02 265)",
      "sidebar-ring": "oklch(0.55 0.02 265)",
      "chart-1": "oklch(0.78 0.03 265)",
      "chart-2": "oklch(0.58 0.04 265)",
      "chart-3": "oklch(0.48 0.045 265)",
      "chart-4": "oklch(0.42 0.04 265)",
      "chart-5": "oklch(0.36 0.03 265)",
    },
  },
}

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
