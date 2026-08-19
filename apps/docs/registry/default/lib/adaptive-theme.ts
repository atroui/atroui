/** Contrast helpers for the adaptive theme switch. No DOM. */

export type Rgb = [number, number, number]

const TARGET_AA = 4.5

export function srgbToLinear(c: number): number {
  const x = c / 255
  return x <= 0.04045 ? x / 12.92 : ((x + 0.055) / 1.055) ** 2.4
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

/** Accepts #RRGGBB only. Rejects other strings so callers cannot inject CSS. */
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

/**
 * Nudge a foreground color toward white or black until it meets min contrast
 * against the background. Preserves hue of midtones as much as a mix allows.
 */
export function ensureContrast(
  foreground: Rgb,
  background: Rgb,
  minRatio = TARGET_AA
): { rgb: Rgb; repaired: boolean; ratio: number } {
  const start = contrastRatio(foreground, background)
  if (start >= minRatio) {
    return { rgb: foreground, repaired: false, ratio: start }
  }
  const toward: Rgb =
    relativeLuminance(foreground) >= relativeLuminance(background)
      ? [255, 255, 255]
      : [0, 0, 0]
  let lo = 0
  let hi = 1
  let best: Rgb = mixRgb(foreground, toward, 1)
  for (let i = 0; i < 18; i++) {
    const mid = (lo + hi) / 2
    const cand = mixRgb(foreground, toward, mid)
    if (contrastRatio(cand, background) >= minRatio) {
      best = cand
      hi = mid
    } else {
      lo = mid
    }
  }
  const rgb: Rgb = [
    Math.round(best[0]),
    Math.round(best[1]),
    Math.round(best[2]),
  ]
  return { rgb, repaired: true, ratio: contrastRatio(rgb, background) }
}

export type ThemeSwatch = {
  background: Rgb
  foreground: Rgb
  muted: Rgb
  brand: Rgb
}

function roundRgb(rgb: Rgb): Rgb {
  return [
    Math.round(rgb[0]),
    Math.round(rgb[1]),
    Math.round(rgb[2]),
  ]
}

/**
 * Build a dark companion for a designed light palette.
 * naive: crush into near-black and grey the brand (typical invert damage).
 * adaptive: keep a hint of the paper hue + brand, lift type to AA.
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
  const background = roundRgb(mixRgb(light.background, [16, 16, 18], 0.86))
  const fgSeed = mixRgb(light.foreground, [248, 247, 244], 0.4)
  const mutedSeed = mixRgb(light.muted, [226, 222, 214], 0.28)
  return {
    background,
    foreground: ensureContrast(fgSeed, background, floor).rgb,
    muted: ensureContrast(mutedSeed, background, floor).rgb,
    brand: light.brand,
  }
}
