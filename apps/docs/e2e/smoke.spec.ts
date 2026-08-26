import { expect, test, type Page } from "@playwright/test"
import { allRoutes, componentRoutes, coreRoutes } from "./routes"

/**
 * Next.js dev overlay and third-party scripts produce noise that says nothing
 * about page health, so only genuine application failures are collected.
 */
const IGNORED_ERROR_PATTERNS = [
  /favicon/i,
  /posthog/i,
  /vercel/i,
  /web-vitals/i,
  /ERR_INTERNET_DISCONNECTED/i,
  /net::ERR_ABORTED/i,
  /Download the React DevTools/i,
  /webgl/i,
  /Failed to load resource/i,
]

function collectFailures(page: Page) {
  const failures: string[] = []

  page.on("pageerror", (error) => {
    failures.push(`pageerror: ${error.message}`)
  })

  page.on("console", (message) => {
    if (message.type() !== "error") return
    const text = message.text()
    if (IGNORED_ERROR_PATTERNS.some((pattern) => pattern.test(text))) return
    failures.push(`console: ${text}`)
  })

  return failures
}

test.describe("route health", () => {
  for (const route of allRoutes) {
    test(`${route.name} renders`, async ({ page }) => {
      const failures = collectFailures(page)

      const response = await page.goto(route.path, { waitUntil: "domcontentloaded" })
      expect(response?.status(), `${route.path} status`).toBeLessThan(400)

      // Exactly one h1 in the page's own outline. Headings inside `[data-preview]`
      // belong to a rendered specimen — a hero block legitimately owns an h1 —
      // so they are excluded rather than counted against the page.
      const h1 = page.locator("h1")
      await expect(h1.first()).toBeVisible()
      const outlineHeadings = await h1.evaluateAll(
        (nodes) => nodes.filter((node) => !node.closest("[data-preview]")).length
      )
      expect(outlineHeadings, `${route.path} page-level h1 count`).toBe(1)

      await expect(page).toHaveTitle(/.+/)
      expect(failures, `${route.path} runtime errors`).toEqual([])
    })
  }
})

test.describe("layout containment", () => {
  for (const route of allRoutes) {
    // Runs at both desktop and phone widths via the smoke projects. A single
    // unbreakable string — a registry install command, a long code span — is
    // enough to push content past the right edge, and it shows up on the phone
    // first. Measured per element rather than via scrollWidth, because the
    // `overflow-x: clip` guard on body means the document never reports the
    // overflow it is busy hiding.
    test(`${route.name} keeps content in frame`, async ({ page }) => {
      await page.goto(route.path, { waitUntil: "domcontentloaded" })

      const offenders = await page.evaluate(() => {
        const limit = document.documentElement.clientWidth + 1
        const found: string[] = []

        for (const element of document.body.querySelectorAll("*")) {
          // Specimens are deliberately laid out wide and clipped by their plate.
          if (element.closest("[data-preview]")) continue

          // Anything an ancestor already clips or scrolls is contained on purpose.
          let clipped = false
          for (
            let parent = element.parentElement;
            parent && parent !== document.body;
            parent = parent.parentElement
          ) {
            if (getComputedStyle(parent).overflowX !== "visible") {
              clipped = true
              break
            }
          }
          if (clipped) continue

          const box = element.getBoundingClientRect()
          if (!box.width || !box.height) continue
          if (getComputedStyle(element).visibility === "hidden") continue
          if (box.right <= limit) continue

          const name =
            element.tagName.toLowerCase() +
            (typeof element.className === "string" && element.className
              ? `.${element.className.trim().split(/\s+/).join(".")}`
              : "")
          found.push(`${name.slice(0, 120)} → ${Math.round(box.right)}px`)
        }
        return found.slice(0, 5)
      })

      expect(offenders, `${route.path} content past the right edge`).toEqual([])
    })
  }
})

test.describe("navigation", () => {
  test("landing reaches the docs", async ({ page }) => {
    await page.goto("/")
    const bannerDocs = page.getByRole("banner").getByRole("link", {
      name: "Docs",
      exact: true,
    })
    if (await bannerDocs.isVisible()) {
      await bannerDocs.click()
    } else {
      await page.getByRole("button", { name: "Home" }).click()
      await page
        .getByRole("dialog", { name: "Site menu" })
        .getByRole("link", { name: "Docs", exact: true })
        .click()
    }
    await expect(page).toHaveURL(/\/docs/)
  })

  test("landing reaches the library", async ({ page }) => {
    await page.goto("/")
    await page.getByRole("link", { name: "Browse components" }).first().click()
    await expect(page).toHaveURL(/\/library/)
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible()
  })

  test("library filters down", async ({ page }) => {
    await page.goto("/library")
    const search = page.getByRole("searchbox", { name: /search components/i })
    await search.fill("pricing")
    await expect(page.getByRole("link", { name: "Pricing" })).toBeVisible()
  })

  test("blog index links to a post", async ({ page }) => {
    await page.goto("/blog")
    const firstPost = page.locator('a[href^="/blog/"]').first()
    await expect(firstPost).toBeVisible()
    await firstPost.click()
    await expect(page).toHaveURL(/\/blog\/.+/)
    await expect(page.locator("h1").first()).toBeVisible()
  })

  test("404 renders a not-found page", async ({ page }) => {
    const response = await page.goto("/this-route-does-not-exist")
    expect(response?.status()).toBe(404)
    await expect(page.locator("h1").first()).toBeVisible()
  })
})

test.describe("component docs", () => {
  for (const route of componentRoutes) {
    test(`${route.name} documents how to get it`, async ({ page }) => {
      await page.goto(route.path)
      // Chrome differs across kinds — some show a CLI command, headless ones show
      // an import — so assert the page states a way in, not a specific widget.
      const body = (await page.locator("body").textContent()) ?? ""
      expect(body, `${route.path} install guidance`).toMatch(/npx shadcn|import /)
    })
  }
})

test.describe("accessibility basics", () => {
  for (const route of coreRoutes) {
    test(`${route.name} has landmarks and titled links`, async ({ page }) => {
      await page.goto(route.path)

      await expect(page.locator("main")).toHaveCount(1)
      expect(await page.locator("html").getAttribute("lang")).toBeTruthy()

      const namelessLinks = await page
        .locator("a:visible")
        .evaluateAll((links) =>
          links.filter((link) => {
            const hasText = (link.textContent ?? "").trim().length > 0
            const hasLabel = Boolean(
              link.getAttribute("aria-label") ?? link.getAttribute("title")
            )
            const hasImageAlt = Boolean(link.querySelector("img[alt]:not([alt=''])"))
            return !hasText && !hasLabel && !hasImageAlt
          }).length
        )
      expect(namelessLinks, `${route.path} links without an accessible name`).toBe(0)
    })
  }
})
