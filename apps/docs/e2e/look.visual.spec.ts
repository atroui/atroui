import { test } from "@playwright/test"

// Scratch spec: viewport-sized captures for eyeballing design work.
// Not part of smoke; run with --project=visual when you want fresh frames.
const shots: Array<{
  name: string
  path: string
  scroll?: number
  light?: boolean
  mobile?: boolean
}> = [
  { name: "look-landing-hero", path: "/" },
  { name: "look-landing-grid", path: "/", scroll: 800 },
  { name: "look-library", path: "/library" },
  { name: "look-docs-intro", path: "/docs" },
  { name: "look-docs-component", path: "/docs/components/ui-button" },
  { name: "look-blog", path: "/blog" },
  { name: "look-light-landing", path: "/", light: true },
  { name: "look-light-grid", path: "/", scroll: 900, light: true },
  { name: "look-light-docs", path: "/docs/components/ui-button", light: true },
  { name: "look-mobile-hero", path: "/", mobile: true },
  { name: "look-mobile-grid", path: "/", scroll: 760, mobile: true },
  { name: "look-mobile-docs", path: "/docs/components/ui-button", mobile: true },
]

for (const shot of shots) {
  test(shot.name, async ({ page }) => {
    if (shot.mobile) {
      await page.setViewportSize({ width: 390, height: 844 })
    }
    if (shot.light) {
      // The site is dark-first via next-themes' class attribute, so the OS
      // preference alone won't flip it.
      await page.addInitScript(() => window.localStorage.setItem("theme", "light"))
    }
    await page.goto(shot.path, { waitUntil: "networkidle" })
    if (shot.scroll) {
      await page.evaluate((y) => window.scrollTo({ top: y }), shot.scroll)
      await page.waitForTimeout(1200)
    }
    await page.waitForTimeout(600)
    await page.screenshot({ path: `e2e/__screens__/${shot.name}.png` })
  })
}
