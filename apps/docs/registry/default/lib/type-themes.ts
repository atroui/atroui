/**
 * Live type faces — Display (heading/display) and Body (sans/body/label).
 * Orthogonal to accent, surface, radius, and light/dark.
 *
 * CSS: `html[data-type-display]` / `html[data-type-body]`.
 * Defaults (Mira pair): Display = Serif, Body = Sans — no attributes.
 *
 * Faces must already be loaded (docs layout: Merriweather, DM Sans, Geist Mono).
 * Legacy `data-type` presets (mira/sans/serif/mono) still migrate + install as pairs.
 */

export const TYPE_DISPLAY_STORAGE_KEY = "atro-type-display"
export const TYPE_BODY_STORAGE_KEY = "atro-type-body"
export const TYPE_DISPLAY_ATTR = "data-type-display"
export const TYPE_BODY_ATTR = "data-type-body"

/** @deprecated Prefer TYPE_DISPLAY_STORAGE_KEY / TYPE_BODY_STORAGE_KEY */
export const TYPE_THEME_STORAGE_KEY = "atro-type-theme"
/** @deprecated Prefer TYPE_DISPLAY_ATTR / TYPE_BODY_ATTR */
export const TYPE_THEME_ATTR = "data-type"

export const TYPE_DISPLAY_DEFAULT = "serif" as const
export const TYPE_BODY_DEFAULT = "sans" as const

/** Semantic font roles remapped by face / preset. */
export type TypeFontRemaps = {
  "font-heading": string
  "font-display": string
  "font-sans": string
  "font-body": string
  "font-label": string
}

export type TypeDisplayRemaps = Pick<
  TypeFontRemaps,
  "font-heading" | "font-display"
>
export type TypeBodyRemaps = Pick<TypeFontRemaps, "font-body" | "font-label">

/** Host CSS var references — used when next/font (or equivalent) is already loaded. */
const HOST = {
  merriweather: "var(--font-merriweather)",
  dmSans: "var(--font-dm-sans)",
  geistMono: "var(--font-geist-mono)",
  caveat: "var(--font-caveat)",
  instrument: "var(--font-instrument)",
  spaceGrotesk: "var(--font-space-grotesk)",
} as const

/** Literal stacks for registry cssVars (FOUT-ok MVP without next/font). */
export const TYPE_THEME_LITERAL_STACKS = {
  merriweather: '"Merriweather", ui-serif, Georgia, serif',
  dmSans: '"DM Sans", ui-sans-serif, system-ui, sans-serif',
  geistMono:
    '"Geist Mono", ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
  caveat: '"Caveat", "Segoe Print", "Bradley Hand", cursive',
  instrument: '"Instrument Serif", ui-serif, Georgia, serif',
  spaceGrotesk: '"Space Grotesk", ui-sans-serif, system-ui, sans-serif',
} as const

export const TYPE_FACES = [
  {
    id: "serif",
    label: "Serif",
    description: "Merriweather",
    sample: "Aa",
    host: HOST.merriweather,
    literal: TYPE_THEME_LITERAL_STACKS.merriweather,
  },
  {
    id: "sans",
    label: "Sans",
    description: "DM Sans",
    sample: "Aa",
    host: HOST.dmSans,
    literal: TYPE_THEME_LITERAL_STACKS.dmSans,
  },
  {
    id: "mono",
    label: "Mono",
    description: "Geist Mono",
    sample: "01",
    host: HOST.geistMono,
    literal: TYPE_THEME_LITERAL_STACKS.geistMono,
  },
  {
    id: "sketch",
    label: "Sketch",
    description: "Caveat",
    sample: "Aa",
    host: HOST.caveat,
    literal: TYPE_THEME_LITERAL_STACKS.caveat,
  },
  {
    id: "instrument",
    label: "Instrument",
    description: "Instrument Serif",
    sample: "Aa",
    host: HOST.instrument,
    literal: TYPE_THEME_LITERAL_STACKS.instrument,
  },
  {
    id: "grotesk",
    label: "Grotesk",
    description: "Space Grotesk",
    sample: "Aa",
    host: HOST.spaceGrotesk,
    literal: TYPE_THEME_LITERAL_STACKS.spaceGrotesk,
  },
] as const

export type TypeFaceId = (typeof TYPE_FACES)[number]["id"]

export function isTypeFaceId(value: string): value is TypeFaceId {
  return TYPE_FACES.some((f) => f.id === value)
}

export function typeFaceMeta(id: TypeFaceId) {
  return TYPE_FACES.find((f) => f.id === id) ?? TYPE_FACES[0]!
}

function displayRemaps(face: TypeFaceId, literal: boolean): TypeDisplayRemaps {
  const stack = literal
    ? typeFaceMeta(face).literal
    : typeFaceMeta(face).host
  return { "font-heading": stack, "font-display": stack }
}

function bodyRemaps(face: TypeFaceId, literal: boolean): TypeBodyRemaps {
  const stack = literal
    ? typeFaceMeta(face).literal
    : typeFaceMeta(face).host
  return {
    "font-body": stack,
    "font-label": stack,
  }
}

/** Full role remap for legacy pair presets / export. */
function pairRemaps(display: TypeFaceId, body: TypeFaceId, literal: boolean): TypeFontRemaps {
  return {
    ...displayRemaps(display, literal),
    "font-sans": literal
      ? typeFaceMeta(body).literal
      : typeFaceMeta(body).host,
    ...bodyRemaps(body, literal),
  }
}

export function typeDisplayRemaps(
  face: TypeFaceId,
  literal = false,
): TypeDisplayRemaps {
  return displayRemaps(face, literal)
}

export function typeBodyRemaps(
  face: TypeFaceId,
  literal = false,
): TypeBodyRemaps {
  return bodyRemaps(face, literal)
}

/** Apply display face to `<html>`. Serif clears the attribute (Mira default). */
export function applyTypeDisplay(id: TypeFaceId) {
  if (typeof document === "undefined") return
  const root = document.documentElement
  if (id === TYPE_DISPLAY_DEFAULT) {
    root.removeAttribute(TYPE_DISPLAY_ATTR)
  } else {
    root.setAttribute(TYPE_DISPLAY_ATTR, id)
  }
  // Clear legacy pair attr so role CSS wins.
  root.removeAttribute(TYPE_THEME_ATTR)
  try {
    localStorage.setItem(TYPE_DISPLAY_STORAGE_KEY, id)
    localStorage.removeItem(TYPE_THEME_STORAGE_KEY)
  } catch {
    /* private mode */
  }
}

/** Apply body face to `<html>`. Sans clears the attribute (Mira default). */
export function applyTypeBody(id: TypeFaceId) {
  if (typeof document === "undefined") return
  const root = document.documentElement
  if (id === TYPE_BODY_DEFAULT) {
    root.removeAttribute(TYPE_BODY_ATTR)
  } else {
    root.setAttribute(TYPE_BODY_ATTR, id)
  }
  root.removeAttribute(TYPE_THEME_ATTR)
  try {
    localStorage.setItem(TYPE_BODY_STORAGE_KEY, id)
    localStorage.removeItem(TYPE_THEME_STORAGE_KEY)
  } catch {
    /* private mode */
  }
}

export function readStoredTypeDisplay(): TypeFaceId {
  if (typeof window === "undefined") return TYPE_DISPLAY_DEFAULT
  try {
    const raw = localStorage.getItem(TYPE_DISPLAY_STORAGE_KEY)
    if (raw && isTypeFaceId(raw)) return raw
    const legacy = migrateLegacyPreset()
    if (legacy) return legacy.display
  } catch {
    /* private mode */
  }
  return TYPE_DISPLAY_DEFAULT
}

export function readStoredTypeBody(): TypeFaceId {
  if (typeof window === "undefined") return TYPE_BODY_DEFAULT
  try {
    const raw = localStorage.getItem(TYPE_BODY_STORAGE_KEY)
    if (raw && isTypeFaceId(raw)) return raw
    const legacy = migrateLegacyPreset()
    if (legacy) return legacy.body
  } catch {
    /* private mode */
  }
  return TYPE_BODY_DEFAULT
}

/* ─── Legacy presets (pair packages + old storage) ─── */

/**
 * Preset pairs — kept for @atroui/type-* installs and Theme Studio export.
 * Live picker uses Display + Body faces instead.
 */
export const TYPE_THEMES = [
  {
    id: "mira",
    label: "Mira",
    description: "Serif display · Sans body — Atro default",
    sample: "Aa",
    display: "serif" as const,
    body: "sans" as const,
    remaps: pairRemaps("serif", "sans", false),
  },
  {
    id: "sans",
    label: "Sans",
    description: "DM Sans everywhere",
    sample: "Aa",
    display: "sans" as const,
    body: "sans" as const,
    remaps: pairRemaps("sans", "sans", false),
  },
  {
    id: "serif",
    label: "Serif",
    description: "Merriweather editorial",
    sample: "Aa",
    display: "serif" as const,
    body: "serif" as const,
    remaps: pairRemaps("serif", "serif", false),
  },
  {
    id: "mono",
    label: "Mono",
    description: "Sans display · Mono body",
    sample: "01",
    display: "sans" as const,
    body: "mono" as const,
    remaps: pairRemaps("sans", "mono", false),
  },
] as const

export type TypeThemeId = (typeof TYPE_THEMES)[number]["id"]

export const TYPE_THEME_LITERAL_REMAPS: Record<
  Exclude<TypeThemeId, "mira">,
  TypeFontRemaps
> = {
  sans: pairRemaps("sans", "sans", true),
  serif: pairRemaps("serif", "serif", true),
  mono: pairRemaps("sans", "mono", true),
}

export function isTypeThemeId(value: string): value is TypeThemeId {
  return TYPE_THEMES.some((t) => t.id === value)
}

function migrateLegacyPreset(): {
  display: TypeFaceId
  body: TypeFaceId
} | null {
  try {
    const raw = localStorage.getItem(TYPE_THEME_STORAGE_KEY)
    if (!raw || !isTypeThemeId(raw)) return null
    const preset = TYPE_THEMES.find((t) => t.id === raw)
    if (!preset) return null
    return { display: preset.display, body: preset.body }
  } catch {
    return null
  }
}

/** Apply a legacy pair preset (sets both Display + Body). */
export function applyTypeTheme(id: TypeThemeId) {
  const preset = TYPE_THEMES.find((t) => t.id === id) ?? TYPE_THEMES[0]!
  applyTypeDisplay(preset.display)
  applyTypeBody(preset.body)
}

/** Derive nearest preset from current faces (for install companions / labels). */
export function resolveTypePreset(
  display: TypeFaceId,
  body: TypeFaceId,
): TypeThemeId {
  const match = TYPE_THEMES.find((t) => t.display === display && t.body === body)
  return match?.id ?? "mira"
}

export function readStoredTypeTheme(): TypeThemeId {
  return resolveTypePreset(readStoredTypeDisplay(), readStoredTypeBody())
}

/** Inline before paint — Display + Body (+ legacy pair migration). */
export const TYPE_THEME_BOOT_SCRIPT = `(function(){try{var dk=${JSON.stringify(TYPE_DISPLAY_STORAGE_KEY)},da=${JSON.stringify(TYPE_DISPLAY_ATTR)},dd=${JSON.stringify(TYPE_DISPLAY_DEFAULT)},bk=${JSON.stringify(TYPE_BODY_STORAGE_KEY)},ba=${JSON.stringify(TYPE_BODY_ATTR)},bd=${JSON.stringify(TYPE_BODY_DEFAULT)},lk=${JSON.stringify(TYPE_THEME_STORAGE_KEY)},la=${JSON.stringify(TYPE_THEME_ATTR)},d=localStorage.getItem(dk),b=localStorage.getItem(bk);if(!d&&!b){var old=localStorage.getItem(lk);if(old==="sans"){d="sans";b="sans";}else if(old==="serif"){d="serif";b="serif";}else if(old==="mono"){d="sans";b="mono";}}if(d&&d!==dd)document.documentElement.setAttribute(da,d);if(b&&b!==bd)document.documentElement.setAttribute(ba,b);document.documentElement.removeAttribute(la);}catch(e){}})();`
