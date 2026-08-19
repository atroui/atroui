/** Contrast + OKLCH companion palettes for ThemeAdapt. */

export type Rgb = [number, number, number]

export type Oklch = { l: number; c: number; h: number }

export type ThemeSwatch = {
  background: Rgb
  foreground: Rgb
  muted: Rgb
  brand: Rgb
}

const TARGET_AA = 4.5

export const COMPANION_VAR_KEYS = [
  "--background",
  "--foreground",
  "--muted-foreground",
  "--muted",
  "--card",
  "--card-foreground",
  "--popover",
  "--popover-foreground",
  "--border",
  "--border-subtle",
  "--brand",
  "--primary",
  "--input",
  "--ring",
  "--surface",
] as const

export function srgbToLinear(c: number): number {
  const x = c / 255
  return x <= 0.04045 ? x / 12.92 : ((x + 0.055) / 1.055) ** 2.4
}

export function linearToSrgb(c: number): number {
  const x = c <= 0.0031308 ? 12.92 * c : 1.055 * c ** (1 / 2.4) - 0.055
  return Math.max(0, Math.min(255, Math.round(x * 255)))
}

export function relativeLuminance(rgb: Rgb): number {
  const [r, g, b] = rgb
  return (
    0.2126 * srgbToLinear(r) +
    0.7152 * srgbToLinear(g) +
    0.0722 * srgbToLinear(b)
  )
}

export function contrastRatio(a: Rgb, b: Rgb): number {
  const l1 = relativeLuminance(a)
  const l2 = relativeLuminance(b)
  const lighter = Math.max(l1, l2)
  const darker = Math.min(l1, l2)
  return (lighter + 0.05) / (darker + 0.05)
}

export function parseRgb(css: string): Rgb | null {
  const t = css.trim()
  const m = t.match(
    /^rgba?\(\s*([0-9.]+)\s*[, ]\s*([0-9.]+)\s*[, ]\s*([0-9.]+)/i
  )
  if (!m?.[1] || !m[2] || !m[3]) return null
  const r = Number(m[1])
  const g = Number(m[2])
  const b = Number(m[3])
  if (![r, g, b].every((n) => Number.isFinite(n))) return null
  return [r, g, b]
}

export function parseHex(hex: string): Rgb | null {
  const m = hex.trim().match(/^#([0-9a-fA-F]{6})$/)
  if (!m?.[1]) return null
  const n = Number.parseInt(m[1], 16)
  if (!Number.isFinite(n)) return null
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255]
}

export function clampContrast(minRatio: number): number {
  if (!Number.isFinite(minRatio)) return 4.5
  return Math.min(21, Math.max(1, minRatio))
}

export function rgbToCss(rgb: Rgb): string {
  const r = Math.max(0, Math.min(255, Math.round(rgb[0])))
  const g = Math.max(0, Math.min(255, Math.round(rgb[1])))
  const b = Math.max(0, Math.min(255, Math.round(rgb[2])))
  return `rgb(${r} ${g} ${b})`
}

export function mixRgb(from: Rgb, to: Rgb, t: number): Rgb {
  return [
    from[0] + (to[0] - from[0]) * t,
    from[1] + (to[1] - from[1]) * t,
    from[2] + (to[2] - from[2]) * t,
  ]
}

export function rgbToOklch(rgb: Rgb): Oklch {
  const r = srgbToLinear(rgb[0])
  const g = srgbToLinear(rgb[1])
  const b = srgbToLinear(rgb[2])
  const l = 0.4122214708 * r + 0.5363325363 * g + 0.0514459929 * b
  const m = 0.2119034982 * r + 0.6806995451 * g + 0.1073969566 * b
  const s = 0.0883024619 * r + 0.2817188376 * g + 0.6299787005 * b
  const l_ = Math.cbrt(l)
  const m_ = Math.cbrt(m)
  const s_ = Math.cbrt(s)
  const L = 0.2104542553 * l_ + 0.793617785 * m_ - 0.0040720468 * s_
  const a = 1.9779984951 * l_ - 2.428592205 * m_ + 0.4505937099 * s_
  const b2 = 0.0259040371 * l_ + 0.7827717662 * m_ - 0.808675766 * s_
  const C = Math.hypot(a, b2)
  let h = (Math.atan2(b2, a) * 180) / Math.PI
  if (h < 0) h += 360
  return { l: L, c: C, h }
}

export function oklchToRgb({ l: L, c: C, h }: Oklch): Rgb {
  const hr = (h * Math.PI) / 180
  const a = Math.cos(hr) * C
  const b = Math.sin(hr) * C
  const l_ = L + 0.3963377774 * a + 0.2158037573 * b
  const m_ = L - 0.1055613458 * a - 0.0638541728 * b
  const s_ = L - 0.0894841775 * a - 1.291485548 * b
  const l = l_ * l_ * l_
  const m = m_ * m_ * m_
  const s = s_ * s_ * s_
  const r = +4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s
  const g = -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s
  const bl = -0.0041960863 * l - 0.7034186147 * m + 1.707614701 * s
  return [linearToSrgb(r), linearToSrgb(g), linearToSrgb(bl)]
}

export function hueDelta(a: number, b: number): number {
  const d = Math.abs(a - b) % 360
  return d > 180 ? 360 - d : d
}

function withHue(color: Oklch, fallback: Oklch): Oklch {
  if (color.c >= 0.012) return color
  return { l: color.l, c: Math.max(color.c, fallback.c * 0.3), h: fallback.h }
}

/** Raise or lower OKLCH lightness only until contrast passes. Keeps C and H. */
export function ensureContrastOklch(
  foreground: Rgb,
  background: Rgb,
  minRatio = TARGET_AA
): { rgb: Rgb; repaired: boolean; ratio: number } {
  const start = contrastRatio(foreground, background)
  if (start >= minRatio) {
    return { rgb: foreground, repaired: false, ratio: start }
  }
  const fg = rgbToOklch(foreground)
  const towardLight = relativeLuminance(foreground) >= relativeLuminance(background)
  let lo = towardLight ? fg.l : 0
  let hi = towardLight ? 1 : fg.l
  let best = foreground
  for (let i = 0; i < 20; i++) {
    const mid = (lo + hi) / 2
    const cand = oklchToRgb({ l: mid, c: fg.c, h: fg.h })
    if (contrastRatio(cand, background) >= minRatio) {
      best = cand
      if (towardLight) hi = mid
      else lo = mid
    } else if (towardLight) {
      lo = mid
    } else {
      hi = mid
    }
  }
  return { rgb: best, repaired: true, ratio: contrastRatio(best, background) }
}

export function ensureContrast(
  foreground: Rgb,
  background: Rgb,
  minRatio = TARGET_AA
): { rgb: Rgb; repaired: boolean; ratio: number } {
  return ensureContrastOklch(foreground, background, minRatio)
}

function roundRgb(rgb: Rgb): Rgb {
  return [Math.round(rgb[0]), Math.round(rgb[1]), Math.round(rgb[2])]
}

/**
 * Dark companion for a designed light palette.
 * naive: crush + grey brand (the usual damage).
 * adaptive: keep hue, drop L on the canvas, lift type to AA in OKLCH.
 */
export function companionDark(
  light: ThemeSwatch,
  kind: "naive" | "adaptive",
  minRatio = TARGET_AA
): ThemeSwatch {
  const floor = clampContrast(minRatio)
  if (kind === "naive") {
    const background = roundRgb(mixRgb(light.background, [10, 10, 12], 0.9))
    return {
      background,
      foreground: roundRgb(mixRgb(light.foreground, [228, 228, 226], 0.5)),
      muted: roundRgb(mixRgb(light.muted, background, 0.72)),
      brand: roundRgb(mixRgb(light.brand, [118, 118, 118], 0.5)),
    }
  }

  const paper = rgbToOklch(light.background)
  const ink = withHue(rgbToOklch(light.foreground), paper)
  const quiet = withHue(rgbToOklch(light.muted), paper)
  const mark = withHue(rgbToOklch(light.brand), paper)

  const background = oklchToRgb({
    l: 0.17,
    c: paper.c * 0.5,
    h: paper.h,
  })
  const foreground = ensureContrastOklch(
    oklchToRgb({ l: 0.93, c: Math.min(ink.c, 0.04), h: ink.h }),
    background,
    floor
  ).rgb
  const muted = ensureContrastOklch(
    oklchToRgb({ l: 0.72, c: Math.max(quiet.c * 0.8, 0.02), h: quiet.h }),
    background,
    floor
  ).rgb
  const brand = oklchToRgb({
    l: Math.max(mark.l, 0.62),
    c: mark.c,
    h: mark.h,
  })

  return { background, foreground, muted, brand }
}

export function companionToCssVars(swatch: ThemeSwatch): Record<string, string> {
  const paper = rgbToOklch(swatch.background)
  const card = oklchToRgb({
    l: Math.min(0.24, paper.l + 0.05),
    c: paper.c * 0.85,
    h: paper.h,
  })
  const border = oklchToRgb({
    l: Math.min(0.34, paper.l + 0.12),
    c: paper.c * 0.45,
    h: paper.h,
  })
  const mutedBg = oklchToRgb({
    l: Math.min(0.22, paper.l + 0.04),
    c: paper.c * 0.65,
    h: paper.h,
  })
  return {
    "--background": rgbToCss(swatch.background),
    "--foreground": rgbToCss(swatch.foreground),
    "--muted-foreground": rgbToCss(swatch.muted),
    "--muted": rgbToCss(mutedBg),
    "--card": rgbToCss(card),
    "--card-foreground": rgbToCss(swatch.foreground),
    "--popover": rgbToCss(card),
    "--popover-foreground": rgbToCss(swatch.foreground),
    "--border": rgbToCss(border),
    "--border-subtle": rgbToCss(border),
    "--brand": rgbToCss(swatch.brand),
    "--primary": rgbToCss(swatch.brand),
    "--input": rgbToCss(border),
    "--ring": rgbToCss(swatch.brand),
    "--surface": rgbToCss(card),
  }
}

export function applyCompanionPalette(root: HTMLElement, swatch: ThemeSwatch) {
  const vars = companionToCssVars(swatch)
  for (const key of COMPANION_VAR_KEYS) {
    const value = vars[key]
    if (value) root.style.setProperty(key, value)
  }
  root.setAttribute("data-theme-adapt", "companion")
}

export function clearCompanionPalette(root: HTMLElement) {
  for (const key of COMPANION_VAR_KEYS) {
    root.style.removeProperty(key)
  }
  root.removeAttribute("data-theme-adapt")
}

function isDarkSelector(selector: string): boolean {
  return /(?:^|[\s,.])dark\b|\[data-theme=["']dark["']\]/.test(selector)
}

function isRootSelector(selector: string): boolean {
  return /(^|,\s*)(:root|html)(\s|,|$|:)/.test(selector) && !isDarkSelector(selector)
}

function collectFromRules(
  rules: CSSRuleList,
  out: Record<string, string>
) {
  for (const rule of rules) {
    if (
      rule instanceof CSSMediaRule ||
      rule instanceof CSSSupportsRule ||
      rule instanceof CSSLayerBlockRule ||
      (typeof CSSGroupingRule !== "undefined" && rule instanceof CSSGroupingRule)
    ) {
      if (
        rule instanceof CSSMediaRule &&
        /prefers-color-scheme:\s*dark/.test(rule.conditionText)
      ) {
        continue
      }
      collectFromRules(rule.cssRules, out)
      continue
    }
    if (!(rule instanceof CSSStyleRule)) continue
    if (!isRootSelector(rule.selectorText)) continue
    for (let i = 0; i < rule.style.length; i++) {
      const name = rule.style.item(i)
      if (name.startsWith("--")) {
        out[name] = rule.style.getPropertyValue(name).trim()
      }
    }
  }
}

export function collectLightRootProps(
  sheets: ArrayLike<CSSStyleSheet>
): Record<string, string> {
  const out: Record<string, string> = {}
  for (let i = 0; i < sheets.length; i++) {
    const sheet = sheets[i]
    if (!sheet) continue
    let rules: CSSRuleList
    try {
      rules = sheet.cssRules
    } catch {
      continue
    }
    collectFromRules(rules, out)
  }
  return out
}

function readVarRgb(probe: HTMLElement, token: string): Rgb | null {
  probe.style.backgroundColor = `var(${token})`
  return parseRgb(getComputedStyle(probe).backgroundColor)
}

let lightCache: ThemeSwatch | null = null

function swatchFromProbe(
  probe: HTMLElement
): ThemeSwatch | null {
  const background = readVarRgb(probe, "--background")
  const foreground = readVarRgb(probe, "--foreground")
  const muted =
    readVarRgb(probe, "--muted-foreground") ?? readVarRgb(probe, "--muted")
  const brand = readVarRgb(probe, "--brand") ?? readVarRgb(probe, "--primary")
  if (!background || !foreground || !muted || !brand) return null
  return { background, foreground, muted, brand }
}

/** Snapshot the authored light :root palette, even if html currently has .dark. */
export function sampleLightSwatch(): ThemeSwatch | null {
  if (typeof document === "undefined") return null
  const props = collectLightRootProps(document.styleSheets)
  if (Object.keys(props).length > 0) {
    const probe = document.createElement("div")
    probe.setAttribute("aria-hidden", "true")
    probe.style.cssText =
      "position:fixed;left:-9999px;top:0;width:2px;height:2px;pointer-events:none"
    for (const [key, value] of Object.entries(props)) {
      probe.style.setProperty(key, value)
    }
    document.body.appendChild(probe)
    try {
      const swatch = swatchFromProbe(probe)
      if (swatch) lightCache = swatch
      return swatch ?? lightCache
    } finally {
      probe.remove()
    }
  }
  if (!document.documentElement.classList.contains("dark")) {
    const live = swatchFromProbe(document.documentElement)
    if (live) lightCache = live
    return live
  }
  return lightCache
}
