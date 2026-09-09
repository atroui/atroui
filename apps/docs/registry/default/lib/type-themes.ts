/**
 * Live type (font) themes — orthogonal to accent, radius, and light/dark.
 * CSS: `html[data-type="<id>"]` in globals.css. Default Mira = no attribute.
 *
 * Faces must already be loaded (docs layout: Merriweather, DM Sans, Geist Mono).
 * Consumers installing @atroui/type-* get literal family stacks via cssVars.
 */

export const TYPE_THEME_STORAGE_KEY = "atro-type-theme"
export const TYPE_THEME_ATTR = "data-type"

/** Semantic font roles remapped by each preset (mono keeps --font-mono as Geist). */
export type TypeFontRemaps = {
  "font-heading": string
  "font-display": string
  "font-sans": string
  "font-body": string
  "font-label": string
}

/** Host CSS var references — used when next/font (or equivalent) is already loaded. */
const HOST = {
  merriweather: "var(--font-merriweather)",
  dmSans: "var(--font-dm-sans)",
  geistMono: "var(--font-geist-mono)",
} as const

/** Literal stacks for registry cssVars (FOUT-ok MVP without next/font). */
export const TYPE_THEME_LITERAL_STACKS = {
  merriweather: '"Merriweather", ui-serif, Georgia, serif',
  dmSans: '"DM Sans", ui-sans-serif, system-ui, sans-serif',
  geistMono:
    '"Geist Mono", ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
} as const

export const TYPE_THEMES = [
  {
    id: "mira",
    label: "Mira",
    description: "Merriweather · DM Sans — Atro default",
    /** Preview sample style for the picker */
    sample: "Aa",
    remaps: {
      "font-heading": HOST.merriweather,
      "font-display": HOST.merriweather,
      "font-sans": HOST.dmSans,
      "font-body": HOST.dmSans,
      "font-label": HOST.dmSans,
    } satisfies TypeFontRemaps,
  },
  {
    id: "sans",
    label: "Sans",
    description: "DM Sans everywhere",
    sample: "Aa",
    remaps: {
      "font-heading": HOST.dmSans,
      "font-display": HOST.dmSans,
      "font-sans": HOST.dmSans,
      "font-body": HOST.dmSans,
      "font-label": HOST.dmSans,
    } satisfies TypeFontRemaps,
  },
  {
    id: "serif",
    label: "Serif",
    description: "Merriweather editorial",
    sample: "Aa",
    remaps: {
      "font-heading": HOST.merriweather,
      "font-display": HOST.merriweather,
      "font-sans": HOST.merriweather,
      "font-body": HOST.merriweather,
      "font-label": HOST.merriweather,
    } satisfies TypeFontRemaps,
  },
  {
    id: "mono",
    label: "Mono",
    description: "DM Sans · Geist Mono chrome",
    sample: "Aa",
    remaps: {
      "font-heading": HOST.dmSans,
      "font-display": HOST.dmSans,
      "font-sans": HOST.geistMono,
      "font-body": HOST.geistMono,
      "font-label": HOST.geistMono,
    } satisfies TypeFontRemaps,
  },
] as const

export type TypeThemeId = (typeof TYPE_THEMES)[number]["id"]

/** Literal remaps for registry:theme packages (no next/font required). */
export const TYPE_THEME_LITERAL_REMAPS: Record<
  Exclude<TypeThemeId, "mira">,
  TypeFontRemaps
> = {
  sans: {
    "font-heading": TYPE_THEME_LITERAL_STACKS.dmSans,
    "font-display": TYPE_THEME_LITERAL_STACKS.dmSans,
    "font-sans": TYPE_THEME_LITERAL_STACKS.dmSans,
    "font-body": TYPE_THEME_LITERAL_STACKS.dmSans,
    "font-label": TYPE_THEME_LITERAL_STACKS.dmSans,
  },
  serif: {
    "font-heading": TYPE_THEME_LITERAL_STACKS.merriweather,
    "font-display": TYPE_THEME_LITERAL_STACKS.merriweather,
    "font-sans": TYPE_THEME_LITERAL_STACKS.merriweather,
    "font-body": TYPE_THEME_LITERAL_STACKS.merriweather,
    "font-label": TYPE_THEME_LITERAL_STACKS.merriweather,
  },
  mono: {
    "font-heading": TYPE_THEME_LITERAL_STACKS.dmSans,
    "font-display": TYPE_THEME_LITERAL_STACKS.dmSans,
    "font-sans": TYPE_THEME_LITERAL_STACKS.geistMono,
    "font-body": TYPE_THEME_LITERAL_STACKS.geistMono,
    "font-label": TYPE_THEME_LITERAL_STACKS.geistMono,
  },
}

export function isTypeThemeId(value: string): value is TypeThemeId {
  return TYPE_THEMES.some((t) => t.id === value)
}

/** Apply type theme to `<html>`. Mira clears the attribute (CSS default). */
export function applyTypeTheme(id: TypeThemeId) {
  if (typeof document === "undefined") return
  const root = document.documentElement
  if (id === "mira") {
    root.removeAttribute(TYPE_THEME_ATTR)
  } else {
    root.setAttribute(TYPE_THEME_ATTR, id)
  }
  try {
    localStorage.setItem(TYPE_THEME_STORAGE_KEY, id)
  } catch {
    /* private mode */
  }
}

export function readStoredTypeTheme(): TypeThemeId {
  if (typeof window === "undefined") return "mira"
  try {
    const raw = localStorage.getItem(TYPE_THEME_STORAGE_KEY)
    if (raw && isTypeThemeId(raw)) return raw
  } catch {
    /* private mode */
  }
  return "mira"
}

/** Inline before paint — paste into a blocking `<script>` in the root layout. */
export const TYPE_THEME_BOOT_SCRIPT = `(function(){try{var k=${JSON.stringify(TYPE_THEME_STORAGE_KEY)},a=${JSON.stringify(TYPE_THEME_ATTR)},t=localStorage.getItem(k);if(t&&t!=="mira")document.documentElement.setAttribute(a,t);}catch(e){}})();`
