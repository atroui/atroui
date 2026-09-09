/**
 * Theme Studio export helpers — paste-ready CSS for accent + surface + type + radius axes.
 */

import {
  COLOR_THEMES,
  COLOR_THEME_ATTR,
  COLOR_THEME_TOKENS,
  type AccentTokens,
  type ColorThemeId,
} from "./color-themes"
import {
  RADIUS_THEMES,
  RADIUS_THEME_ATTR,
  radiusThemeValue,
  type RadiusThemeId,
} from "./radius-themes"
import {
  SURFACE_THEMES,
  SURFACE_THEME_ATTR,
  SURFACE_THEME_TOKENS,
  type SurfaceThemeId,
  type SurfaceTokens,
} from "./surface-themes"
import {
  TYPE_THEMES,
  TYPE_THEME_ATTR,
  type TypeFontRemaps,
  type TypeThemeId,
} from "./type-themes"

export const THEME_EXPORT_INSTALL =
  "npx shadcn@latest add @atroui/color-theme-picker"

type ThemeExportOpts = {
  accent: ColorThemeId
  radius: RadiusThemeId
  surface?: SurfaceThemeId
  type?: TypeThemeId
}

function resolveOpts(opts: ThemeExportOpts): {
  accent: ColorThemeId
  radius: RadiusThemeId
  surface: SurfaceThemeId
  type: TypeThemeId
} {
  return {
    accent: opts.accent,
    radius: opts.radius,
    surface: opts.surface ?? "mira",
    type: opts.type ?? "mira",
  }
}

function formatTokenBlock(
  selector: string,
  tokens: AccentTokens | SurfaceTokens | TypeFontRemaps,
): string {
  const lines = (Object.keys(tokens) as (keyof typeof tokens)[]).map(
    (key) => `  --${key}: ${tokens[key]};`,
  )
  return `${selector} {\n${lines.join("\n")}\n}`
}

/**
 * Build paste-ready CSS for the chosen accent + surface + type + radius.
 * Mira axes omit their blocks (defaults live in :root).
 */
export function buildThemeExportCss(opts: ThemeExportOpts): string {
  const { accent, radius, surface, type } = resolveOpts(opts)
  const accentMeta =
    COLOR_THEMES.find((t) => t.id === accent) ?? COLOR_THEMES[0]!
  const surfaceMeta =
    SURFACE_THEMES.find((t) => t.id === surface) ?? SURFACE_THEMES[0]!
  const typeMeta = TYPE_THEMES.find((t) => t.id === type) ?? TYPE_THEMES[0]!
  const radiusMeta =
    RADIUS_THEMES.find((t) => t.id === radius) ?? RADIUS_THEMES[1]!

  const header = [
    `/* AtroUI Theme Studio export — Accent: ${accentMeta.label} · Surface: ${surfaceMeta.label} · Type: ${typeMeta.label} · Radius: ${radiusMeta.label}`,
    `   Paste into your globals.css. Keep .dark for appearance.`,
    `   Install picker: ${THEME_EXPORT_INSTALL}`,
    `*/`,
  ].join("\n")

  const parts: string[] = [header, ""]

  if (accent === "mira") {
    parts.push(
      `/* Mira accent is the Atro default — no ${COLOR_THEME_ATTR} block needed. */`,
      "",
    )
  } else {
    const tokens = COLOR_THEME_TOKENS[accent]
    parts.push(
      formatTokenBlock(
        `html[${COLOR_THEME_ATTR}="${accent}"]`,
        tokens.light,
      ),
      formatTokenBlock(
        `html.dark[${COLOR_THEME_ATTR}="${accent}"]`,
        tokens.dark,
      ),
      "",
    )
  }

  if (surface === "mira") {
    parts.push(
      `/* Mira surface is the Atro default — no ${SURFACE_THEME_ATTR} block needed. */`,
      "",
    )
  } else {
    const tokens = SURFACE_THEME_TOKENS[surface]
    parts.push(
      formatTokenBlock(
        `html[${SURFACE_THEME_ATTR}="${surface}"]`,
        tokens.light,
      ),
      formatTokenBlock(
        `html.dark[${SURFACE_THEME_ATTR}="${surface}"]`,
        tokens.dark,
      ),
      "",
    )
  }

  if (type === "mira") {
    parts.push(
      `/* Mira type is the Atro default — no ${TYPE_THEME_ATTR} block needed. */`,
      "",
    )
  } else {
    const remaps =
      TYPE_THEMES.find((t) => t.id === type)?.remaps ?? TYPE_THEMES[0]!.remaps
    parts.push(
      formatTokenBlock(`html[${TYPE_THEME_ATTR}="${type}"]`, remaps),
      "",
    )
  }

  if (radius === "mira") {
    parts.push(
      `/* Mira radius (0.45rem) is the Atro default — no ${RADIUS_THEME_ATTR} block needed. */`,
      "",
    )
  } else {
    parts.push(
      `html[${RADIUS_THEME_ATTR}="${radius}"] {`,
      `  --radius: ${radiusThemeValue(radius)};`,
      `}`,
      "",
    )
  }

  return parts.join("\n").trimEnd() + "\n"
}

/** Registry theme packages that bake axes into consumer globals via cssVars. Mira is default — no package. */
export function themeRegistryCompanions(opts: ThemeExportOpts): string[] {
  const { accent, radius, surface, type } = resolveOpts(opts)
  const out: string[] = []
  if (accent !== "mira") out.push(`@atroui/theme-${accent}`)
  if (radius !== "mira") out.push(`@atroui/radius-${radius}`)
  if (surface !== "mira") out.push(`@atroui/surface-${surface}`)
  if (type !== "mira") out.push(`@atroui/type-${type}`)
  return out
}

/** items: "button" or "@atroui/button" — appends non-Mira theme packages. */
export function buildShadcnAddCommand(
  items: string[],
  opts: ThemeExportOpts,
): string {
  const normalized = items.map((i) =>
    i.startsWith("@") ? i : `@atroui/${i.replace(/^@atroui\//, "")}`,
  )
  const all = [...normalized, ...themeRegistryCompanions(opts)]
  return `npx shadcn@latest add ${[...new Set(all)].join(" ")}`
}
