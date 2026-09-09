/**
 * Theme Studio export helpers — paste-ready CSS for accent + radius axes.
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

export const THEME_EXPORT_INSTALL =
  "npx shadcn@latest add @atroui/color-theme-picker"

function formatAccentBlock(selector: string, tokens: AccentTokens): string {
  const lines = (Object.keys(tokens) as (keyof AccentTokens)[]).map(
    (key) => `  --${key}: ${tokens[key]};`,
  )
  return `${selector} {\n${lines.join("\n")}\n}`
}

/**
 * Build paste-ready CSS for the chosen accent + radius.
 * Mira accent / mira radius omit their blocks (defaults live in :root).
 */
export function buildThemeExportCss(opts: {
  accent: ColorThemeId
  radius: RadiusThemeId
}): string {
  const accentMeta =
    COLOR_THEMES.find((t) => t.id === opts.accent) ?? COLOR_THEMES[0]!
  const radiusMeta =
    RADIUS_THEMES.find((t) => t.id === opts.radius) ?? RADIUS_THEMES[1]!

  const header = [
    `/* AtroUI Theme Studio export — Accent: ${accentMeta.label} · Radius: ${radiusMeta.label}`,
    `   Paste into your globals.css. Keep .dark for appearance.`,
    `   Install picker: ${THEME_EXPORT_INSTALL}`,
    `*/`,
  ].join("\n")

  const parts: string[] = [header, ""]

  if (opts.accent === "mira") {
    parts.push(
      `/* Mira accent is the Atro default — no ${COLOR_THEME_ATTR} block needed. */`,
      "",
    )
  } else {
    const tokens = COLOR_THEME_TOKENS[opts.accent]
    parts.push(
      formatAccentBlock(
        `html[${COLOR_THEME_ATTR}="${opts.accent}"]`,
        tokens.light,
      ),
      formatAccentBlock(
        `html.dark[${COLOR_THEME_ATTR}="${opts.accent}"]`,
        tokens.dark,
      ),
      "",
    )
  }

  if (opts.radius === "mira") {
    parts.push(
      `/* Mira radius (0.45rem) is the Atro default — no ${RADIUS_THEME_ATTR} block needed. */`,
      "",
    )
  } else {
    parts.push(
      `html[${RADIUS_THEME_ATTR}="${opts.radius}"] {`,
      `  --radius: ${radiusThemeValue(opts.radius)};`,
      `}`,
      "",
    )
  }

  return parts.join("\n").trimEnd() + "\n"
}

/** Registry theme packages that bake accent/radius into consumer globals via cssVars. Mira is default — no package. */
export function themeRegistryCompanions(opts: {
  accent: ColorThemeId
  radius: RadiusThemeId
}): string[] {
  const out: string[] = []
  if (opts.accent !== "mira") out.push(`@atroui/theme-${opts.accent}`)
  if (opts.radius !== "mira") out.push(`@atroui/radius-${opts.radius}`)
  return out
}

/** items: "button" or "@atroui/button" — appends accent/radius theme packages when not Mira. */
export function buildShadcnAddCommand(
  items: string[],
  opts: { accent: ColorThemeId; radius: RadiusThemeId },
): string {
  const normalized = items.map((i) =>
    i.startsWith("@") ? i : `@atroui/${i.replace(/^@atroui\//, "")}`,
  )
  const all = [...normalized, ...themeRegistryCompanions(opts)]
  return `npx shadcn@latest add ${[...new Set(all)].join(" ")}`
}
