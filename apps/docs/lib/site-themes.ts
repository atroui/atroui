/**
 * Named sheets for the docs host. The landing is the live preview —
 * pick a room, copy the tokens. Not a tweakcn clone: four designed
 * identities, not a color-picker.
 */

export type SiteThemeId = "paper" | "atro" | "ink" | "dawn"

export type SiteTheme = {
  id: SiteThemeId
  label: string
  kind: "light" | "dark"
  hint: string
  preview: { ground: string; raised: string; accent: string }
  vars: Record<string, string>
}

export const SITE_THEMES: SiteTheme[] = [
  {
    id: "paper",
    label: "Paper",
    kind: "light",
    hint: "Warm studio",
    preview: { ground: "#f6f6f4", raised: "#fdfdfc", accent: "#212223" },
    vars: {
      "--background": "#f6f6f4",
      "--foreground": "#212223",
      "--card": "#fdfdfc",
      "--primary": "#212223",
      "--primary-foreground": "#ffffff",
      "--muted-foreground": "#595959",
      "--border": "#eaeae9",
      "--brand": "#1d93d2",
      "--radius": "10px",
    },
  },
  {
    id: "atro",
    label: "Atro",
    kind: "dark",
    hint: "Brand blue dark",
    preview: { ground: "#080c14", raised: "#10182a", accent: "#0b7bff" },
    vars: {
      "--background": "#080c14",
      "--foreground": "#e8eef6",
      "--card": "#10182a",
      "--primary": "#0b7bff",
      "--primary-foreground": "#ffffff",
      "--muted-foreground": "#8b9bb4",
      "--border": "#1a2744",
      "--brand": "#0b7bff",
      "--radius": "10px",
    },
  },
  {
    id: "ink",
    label: "Ink",
    kind: "dark",
    hint: "Black canvas",
    preview: { ground: "#07080a", raised: "#121316", accent: "#f4f4f5" },
    vars: {
      "--background": "#07080a",
      "--foreground": "#f4f4f5",
      "--card": "#121316",
      "--primary": "#f4f4f5",
      "--primary-foreground": "#07080a",
      "--muted-foreground": "#a1a1aa",
      "--border": "#27272a",
      "--brand": "#0b7bff",
      "--radius": "10px",
    },
  },
  {
    id: "dawn",
    label: "Dawn",
    kind: "light",
    hint: "Paper, blue action",
    preview: { ground: "#f6f6f4", raised: "#fdfdfc", accent: "#1d93d2" },
    vars: {
      "--background": "#f6f6f4",
      "--foreground": "#212223",
      "--card": "#fdfdfc",
      "--primary": "#0b7bff",
      "--primary-foreground": "#ffffff",
      "--muted-foreground": "#595959",
      "--border": "#eaeae9",
      "--brand": "#0b7bff",
      "--radius": "10px",
    },
  },
]

export const DEFAULT_THEME: SiteThemeId = "paper"

const LEGACY: Record<string, SiteThemeId> = {
  light: "paper",
  dark: "atro",
  system: "paper",
}

export function resolveSiteTheme(theme: string | undefined): SiteThemeId {
  if (theme && SITE_THEMES.some((item) => item.id === theme)) {
    return theme as SiteThemeId
  }
  return LEGACY[theme ?? ""] ?? DEFAULT_THEME
}

export function themeCssSnippet(id: SiteThemeId) {
  const sheet = SITE_THEMES.find((item) => item.id === id) ?? SITE_THEMES[0]
  const selector = sheet.kind === "dark" ? ".dark" : ":root"
  const body = Object.entries(sheet.vars)
    .map(([key, value]) => `  ${key}: ${value};`)
    .join("\n")
  return `${selector} {\n${body}\n}\n`
}
