import { describe, expect, it } from "vitest"
import {
  companionDark,
  contrastRatio,
  ensureContrast,
  parseHex,
  parseRgb,
  relativeLuminance,
} from "./adaptive-theme"
import type { ThemeSwatch } from "./adaptive-theme"

describe("adaptive-theme contrast", () => {
  it("parses rgb()", () => {
    expect(parseRgb("rgb(18, 18, 18)")).toEqual([18, 18, 18])
    expect(parseRgb("rgb(250 250 250)")).toEqual([250, 250, 250])
  })

  it("rejects non-hex color strings", () => {
    expect(parseHex("red")).toBeNull()
    expect(parseHex("#fff")).toBeNull()
    expect(parseHex("#F4F1EA")).toEqual([244, 241, 234])
  })

  it("white on black is high contrast", () => {
    expect(contrastRatio([255, 255, 255], [0, 0, 0])).toBeGreaterThan(20)
  })

  it("lifts dim grey on near-black to AA", () => {
    const bg: [number, number, number] = [12, 12, 12]
    const fg: [number, number, number] = [48, 48, 52]
    expect(contrastRatio(fg, bg)).toBeLessThan(4.5)
    const out = ensureContrast(fg, bg, 4.5)
    expect(out.repaired).toBe(true)
    expect(out.ratio).toBeGreaterThanOrEqual(4.5)
    expect(relativeLuminance(out.rgb)).toBeGreaterThan(relativeLuminance(fg))
  })

  it("leaves passing pairs alone", () => {
    const out = ensureContrast([245, 245, 245], [12, 12, 12], 4.5)
    expect(out.repaired).toBe(false)
  })
})

describe("companionDark", () => {
  const warmPaper: ThemeSwatch = {
    background: parseHex("#F4F1EA")!,
    foreground: parseHex("#1C1915")!,
    muted: parseHex("#9A948A")!,
    brand: parseHex("#C45C26")!,
  }

  it("naive dark lets muted type fail AA on warm paper", () => {
    const naive = companionDark(warmPaper, "naive")
    expect(contrastRatio(naive.muted, naive.background)).toBeLessThan(4.5)
  })

  it("adaptive dark keeps muted type at AA and preserves brand", () => {
    const adaptive = companionDark(warmPaper, "adaptive")
    expect(contrastRatio(adaptive.muted, adaptive.background)).toBeGreaterThanOrEqual(
      4.5
    )
    expect(contrastRatio(adaptive.foreground, adaptive.background)).toBeGreaterThanOrEqual(
      4.5
    )
    expect(adaptive.brand).toEqual(warmPaper.brand)
  })
})
