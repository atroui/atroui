import { defineConfig, devices } from "@playwright/test"

const PORT = Number(process.env.PLAYWRIGHT_PORT ?? 3000)
const baseURL = process.env.PLAYWRIGHT_BASE_URL ?? `http://localhost:${PORT}`

/**
 * Runs against a production build by default. `next dev` compiles each route on
 * first request, so a parallel sweep of every route times out on compilation
 * rather than on anything real. Set PLAYWRIGHT_DEV=1 to point at `next dev`
 * while iterating on a single spec.
 */
const useDevServer = process.env.PLAYWRIGHT_DEV === "1"

/**
 * Safety net for the Specimen revamp.
 *
 * `smoke` must stay green through every redesign commit — it asserts routes
 * resolve, render a heading, and raise no page errors. `visual` only captures
 * full-page screenshots for human review; it makes no assertions so a
 * deliberate redesign never shows up as a failure.
 */
export default defineConfig({
  testDir: "./e2e",
  fullyParallel: true,
  forbidOnly: Boolean(process.env.CI),
  retries: process.env.CI ? 1 : 0,
  reporter: process.env.CI ? [["github"], ["list"]] : [["list"]],
  timeout: 45_000,
  expect: { timeout: 10_000 },

  use: {
    baseURL,
    trace: "retain-on-failure",
    screenshot: "only-on-failure",
  },

  projects: [
    {
      name: "smoke",
      testMatch: /smoke\.spec\.ts/,
      use: { ...devices["Desktop Chrome"] },
    },
    {
      name: "smoke-mobile",
      testMatch: /smoke\.spec\.ts/,
      use: { ...devices["Pixel 7"] },
    },
    {
      name: "visual",
      testMatch: /visual\.spec\.ts/,
      use: { ...devices["Desktop Chrome"], viewport: { width: 1440, height: 900 } },
    },
  ],

  webServer: {
    command: useDevServer ? "pnpm dev" : `pnpm build && pnpm start --port ${PORT}`,
    url: baseURL,
    // Opt-in only: a server left over from an older build answers every request
    // with a 404 shell, which fails all routes for reasons unrelated to the code.
    reuseExistingServer: process.env.PLAYWRIGHT_REUSE === "1",
    // A cold production build of the full catalog is the long pole here.
    timeout: 480_000,
    stdout: "ignore",
    stderr: "pipe",
  },
})
