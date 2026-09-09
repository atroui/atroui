/**
 * Live surface (room) themes — orthogonal to accent + radius + light/dark.
 * CSS: `html[data-surface="<id>"]` in globals.css. Default Mira = no attribute.
 * Opinionated: max 4 non-default rooms. Never touch primary / ring / charts / brand.
 */

export const SURFACE_THEME_STORAGE_KEY = "atro-surface-theme"
export const SURFACE_THEME_ATTR = "data-surface"

export const SURFACE_THEMES = [
  {
    id: "mira",
    label: "Mira",
    description: "Cool paper — default",
    /** Picker chip — light canvas */
    swatch: "oklch(0.968 0.007 286)",
  },
  {
    id: "mist",
    label: "Mist",
    description: "Cooler grey room",
    swatch: "oklch(0.96 0.005 255)",
  },
  {
    id: "paper",
    label: "Paper",
    description: "Brighter canvas",
    swatch: "oklch(0.98 0.005 286)",
  },
  {
    id: "stone",
    label: "Stone",
    description: "Quiet neutral",
    swatch: "oklch(0.965 0.006 82)",
  },
  {
    id: "ink",
    label: "Ink",
    description: "Deeper room",
    swatch: "oklch(0.94 0.008 286)",
  },
] as const

export type SurfaceThemeId = (typeof SURFACE_THEMES)[number]["id"]

/** Non-default rooms — Mira lives in :root / .dark. */
export type SurfaceRoomId = Exclude<SurfaceThemeId, "mira">

/**
 * Surface / chrome tokens only. Do not include primary, sidebar-primary,
 * ring, charts, or brand — those stay on the accent axis.
 */
export type SurfaceTokens = {
  background: string
  foreground: string
  card: string
  "card-foreground": string
  popover: string
  "popover-foreground": string
  secondary: string
  "secondary-foreground": string
  muted: string
  "muted-foreground": string
  accent: string
  "accent-foreground": string
  border: string
  input: string
  sidebar: string
  "sidebar-foreground": string
  "sidebar-accent": string
  "sidebar-accent-foreground": string
  "sidebar-border": string
  "elev-ambient": string
  "elev-key": string
}

/** Token maps for Theme Studio / registry — mirrors globals.css data-surface blocks. */
export const SURFACE_THEME_TOKENS: Record<
  SurfaceRoomId,
  { light: SurfaceTokens; dark: SurfaceTokens }
> = {
  mist: {
    light: {
      background: "oklch(0.96 0.005 255)",
      foreground: "oklch(0.145 0.004 255)",
      card: "oklch(0.985 0.003 255)",
      "card-foreground": "oklch(0.145 0.004 255)",
      popover: "oklch(0.985 0.003 255)",
      "popover-foreground": "oklch(0.145 0.004 255)",
      secondary: "oklch(0.93 0.006 255)",
      "secondary-foreground": "oklch(0.22 0.005 255)",
      muted: "oklch(0.93 0.006 255)",
      "muted-foreground": "oklch(0.48 0.015 255)",
      accent: "oklch(0.93 0.006 255)",
      "accent-foreground": "oklch(0.22 0.005 255)",
      border: "oklch(0.35 0.015 255 / 0.14)",
      input: "oklch(0.35 0.015 255 / 0.16)",
      sidebar: "oklch(0.948 0.004 255)",
      "sidebar-foreground": "oklch(0.145 0.004 255)",
      "sidebar-accent": "oklch(0.93 0.006 255)",
      "sidebar-accent-foreground": "oklch(0.22 0.005 255)",
      "sidebar-border": "oklch(0.35 0.015 255 / 0.14)",
      "elev-ambient": "oklch(0.25 0.015 255 / 0.14)",
      "elev-key": "oklch(0.2 0.015 255 / 0.08)",
    },
    dark: {
      background: "oklch(0.175 0.008 255)",
      foreground: "oklch(0.985 0 0)",
      card: "oklch(0.225 0.009 255)",
      "card-foreground": "oklch(0.985 0 0)",
      popover: "oklch(0.225 0.009 255)",
      "popover-foreground": "oklch(0.985 0 0)",
      secondary: "oklch(0.28 0.008 255)",
      "secondary-foreground": "oklch(0.985 0 0)",
      muted: "oklch(0.28 0.008 255)",
      "muted-foreground": "oklch(0.7 0.012 255)",
      accent: "oklch(0.28 0.008 255)",
      "accent-foreground": "oklch(0.985 0 0)",
      border: "oklch(1 0 0 / 10%)",
      input: "oklch(1 0 0 / 15%)",
      sidebar: "oklch(0.225 0.009 255)",
      "sidebar-foreground": "oklch(0.985 0 0)",
      "sidebar-accent": "oklch(0.28 0.008 255)",
      "sidebar-accent-foreground": "oklch(0.985 0 0)",
      "sidebar-border": "oklch(1 0 0 / 10%)",
      "elev-ambient": "color-mix(in oklch, var(--foreground) 32%, transparent)",
      "elev-key": "color-mix(in oklch, var(--foreground) 18%, transparent)",
    },
  },
  paper: {
    light: {
      background: "oklch(0.98 0.005 286)",
      foreground: "oklch(0.141 0.005 285.823)",
      card: "oklch(0.995 0.002 286)",
      "card-foreground": "oklch(0.141 0.005 285.823)",
      popover: "oklch(0.995 0.002 286)",
      "popover-foreground": "oklch(0.141 0.005 285.823)",
      secondary: "oklch(0.945 0.006 286)",
      "secondary-foreground": "oklch(0.21 0.006 285.885)",
      muted: "oklch(0.945 0.006 286)",
      "muted-foreground": "oklch(0.48 0.016 285.9)",
      accent: "oklch(0.945 0.006 286)",
      "accent-foreground": "oklch(0.21 0.006 285.885)",
      border: "oklch(0.35 0.018 286 / 0.12)",
      input: "oklch(0.35 0.018 286 / 0.14)",
      sidebar: "oklch(0.968 0.004 286)",
      "sidebar-foreground": "oklch(0.141 0.005 285.823)",
      "sidebar-accent": "oklch(0.945 0.006 286)",
      "sidebar-accent-foreground": "oklch(0.21 0.006 285.885)",
      "sidebar-border": "oklch(0.35 0.018 286 / 0.12)",
      "elev-ambient": "oklch(0.28 0.018 286 / 0.12)",
      "elev-key": "oklch(0.22 0.018 286 / 0.07)",
    },
    dark: {
      background: "oklch(0.2 0.005 286)",
      foreground: "oklch(0.985 0 0)",
      card: "oklch(0.25 0.006 286)",
      "card-foreground": "oklch(0.985 0 0)",
      popover: "oklch(0.25 0.006 286)",
      "popover-foreground": "oklch(0.985 0 0)",
      secondary: "oklch(0.305 0.006 286)",
      "secondary-foreground": "oklch(0.985 0 0)",
      muted: "oklch(0.305 0.006 286)",
      "muted-foreground": "oklch(0.72 0.014 286)",
      accent: "oklch(0.305 0.006 286)",
      "accent-foreground": "oklch(0.985 0 0)",
      border: "oklch(1 0 0 / 10%)",
      input: "oklch(1 0 0 / 15%)",
      sidebar: "oklch(0.25 0.006 286)",
      "sidebar-foreground": "oklch(0.985 0 0)",
      "sidebar-accent": "oklch(0.305 0.006 286)",
      "sidebar-accent-foreground": "oklch(0.985 0 0)",
      "sidebar-border": "oklch(1 0 0 / 10%)",
      "elev-ambient": "color-mix(in oklch, var(--foreground) 30%, transparent)",
      "elev-key": "color-mix(in oklch, var(--foreground) 16%, transparent)",
    },
  },
  stone: {
    light: {
      background: "oklch(0.965 0.006 82)",
      foreground: "oklch(0.16 0.008 75)",
      card: "oklch(0.99 0.003 82)",
      "card-foreground": "oklch(0.16 0.008 75)",
      popover: "oklch(0.99 0.003 82)",
      "popover-foreground": "oklch(0.16 0.008 75)",
      secondary: "oklch(0.932 0.007 82)",
      "secondary-foreground": "oklch(0.23 0.008 75)",
      muted: "oklch(0.932 0.007 82)",
      "muted-foreground": "oklch(0.48 0.012 75)",
      accent: "oklch(0.932 0.007 82)",
      "accent-foreground": "oklch(0.23 0.008 75)",
      border: "oklch(0.35 0.01 80 / 0.14)",
      input: "oklch(0.35 0.01 80 / 0.16)",
      sidebar: "oklch(0.952 0.005 82)",
      "sidebar-foreground": "oklch(0.16 0.008 75)",
      "sidebar-accent": "oklch(0.932 0.007 82)",
      "sidebar-accent-foreground": "oklch(0.23 0.008 75)",
      "sidebar-border": "oklch(0.35 0.01 80 / 0.14)",
      "elev-ambient": "oklch(0.28 0.01 80 / 0.13)",
      "elev-key": "oklch(0.22 0.01 80 / 0.07)",
    },
    dark: {
      background: "oklch(0.18 0.004 80)",
      foreground: "oklch(0.985 0 0)",
      card: "oklch(0.23 0.004 80)",
      "card-foreground": "oklch(0.985 0 0)",
      popover: "oklch(0.23 0.004 80)",
      "popover-foreground": "oklch(0.985 0 0)",
      secondary: "oklch(0.285 0.004 80)",
      "secondary-foreground": "oklch(0.985 0 0)",
      muted: "oklch(0.285 0.004 80)",
      "muted-foreground": "oklch(0.7 0.01 80)",
      accent: "oklch(0.285 0.004 80)",
      "accent-foreground": "oklch(0.985 0 0)",
      border: "oklch(1 0 0 / 10%)",
      input: "oklch(1 0 0 / 15%)",
      sidebar: "oklch(0.23 0.004 80)",
      "sidebar-foreground": "oklch(0.985 0 0)",
      "sidebar-accent": "oklch(0.285 0.004 80)",
      "sidebar-accent-foreground": "oklch(0.985 0 0)",
      "sidebar-border": "oklch(1 0 0 / 10%)",
      "elev-ambient": "color-mix(in oklch, var(--foreground) 32%, transparent)",
      "elev-key": "color-mix(in oklch, var(--foreground) 18%, transparent)",
    },
  },
  ink: {
    light: {
      background: "oklch(0.94 0.008 286)",
      foreground: "oklch(0.14 0.006 285.8)",
      card: "oklch(0.97 0.005 286)",
      "card-foreground": "oklch(0.14 0.006 285.8)",
      popover: "oklch(0.97 0.005 286)",
      "popover-foreground": "oklch(0.14 0.006 285.8)",
      secondary: "oklch(0.91 0.008 286)",
      "secondary-foreground": "oklch(0.21 0.006 285.885)",
      muted: "oklch(0.91 0.008 286)",
      "muted-foreground": "oklch(0.46 0.018 285.9)",
      accent: "oklch(0.91 0.008 286)",
      "accent-foreground": "oklch(0.21 0.006 285.885)",
      border: "oklch(0.32 0.02 286 / 0.16)",
      input: "oklch(0.32 0.02 286 / 0.18)",
      sidebar: "oklch(0.925 0.007 286)",
      "sidebar-foreground": "oklch(0.14 0.006 285.8)",
      "sidebar-accent": "oklch(0.91 0.008 286)",
      "sidebar-accent-foreground": "oklch(0.21 0.006 285.885)",
      "sidebar-border": "oklch(0.32 0.02 286 / 0.16)",
      "elev-ambient": "oklch(0.22 0.02 286 / 0.16)",
      "elev-key": "oklch(0.18 0.02 286 / 0.1)",
    },
    dark: {
      background: "oklch(0.155 0.006 286)",
      foreground: "oklch(0.985 0 0)",
      card: "oklch(0.205 0.007 286)",
      "card-foreground": "oklch(0.985 0 0)",
      popover: "oklch(0.205 0.007 286)",
      "popover-foreground": "oklch(0.985 0 0)",
      secondary: "oklch(0.26 0.007 286)",
      "secondary-foreground": "oklch(0.985 0 0)",
      muted: "oklch(0.26 0.007 286)",
      "muted-foreground": "oklch(0.68 0.014 286)",
      accent: "oklch(0.26 0.007 286)",
      "accent-foreground": "oklch(0.985 0 0)",
      border: "oklch(1 0 0 / 9%)",
      input: "oklch(1 0 0 / 13%)",
      sidebar: "oklch(0.205 0.007 286)",
      "sidebar-foreground": "oklch(0.985 0 0)",
      "sidebar-accent": "oklch(0.26 0.007 286)",
      "sidebar-accent-foreground": "oklch(0.985 0 0)",
      "sidebar-border": "oklch(1 0 0 / 9%)",
      "elev-ambient": "color-mix(in oklch, var(--foreground) 28%, transparent)",
      "elev-key": "color-mix(in oklch, var(--foreground) 15%, transparent)",
    },
  },
}

export function isSurfaceThemeId(value: string): value is SurfaceThemeId {
  return SURFACE_THEMES.some((t) => t.id === value)
}

/** Apply surface theme to `<html>`. Mira clears the attribute (CSS default). */
export function applySurfaceTheme(id: SurfaceThemeId) {
  if (typeof document === "undefined") return
  const root = document.documentElement
  if (id === "mira") {
    root.removeAttribute(SURFACE_THEME_ATTR)
  } else {
    root.setAttribute(SURFACE_THEME_ATTR, id)
  }
  try {
    localStorage.setItem(SURFACE_THEME_STORAGE_KEY, id)
  } catch {
    /* private mode */
  }
}

export function readStoredSurfaceTheme(): SurfaceThemeId {
  if (typeof window === "undefined") return "mira"
  try {
    const raw = localStorage.getItem(SURFACE_THEME_STORAGE_KEY)
    if (raw && isSurfaceThemeId(raw)) return raw
  } catch {
    /* private mode */
  }
  return "mira"
}

/** Inline before paint — paste into a blocking `<script>` in the root layout. */
export const SURFACE_THEME_BOOT_SCRIPT = `(function(){try{var k=${JSON.stringify(SURFACE_THEME_STORAGE_KEY)},a=${JSON.stringify(SURFACE_THEME_ATTR)},t=localStorage.getItem(k);if(t&&t!=="mira")document.documentElement.setAttribute(a,t);}catch(e){}})();`
