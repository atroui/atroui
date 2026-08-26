import { test } from "@playwright/test"
import { allRoutes } from "./routes"

/**
 * Capture-only pass. These write full-page screenshots to `e2e/__screens__` so a
 * redesign can be reviewed at a glance; deliberate visual change must never fail
 * a build, which is why nothing here asserts.
 */
test.describe("screens", () => {
  for (const route of allRoutes) {
    test(`capture ${route.name}`, async ({ page }) => {
      await page.goto(route.path, { waitUntil: "networkidle" })
      // Let scroll-reveal and font swap settle before capturing.
      await page.waitForTimeout(600)
      await page.screenshot({
        path: `e2e/__screens__/${route.name}.png`,
        fullPage: true,
      })
    })
  }
})
