import { describe, expect, it } from "vitest"
import { writeFileSync } from "node:fs"
import { composeQuickOgPreview } from "./compose"

describe("composeQuickOgPreview smoke", () => {
  it("renders techMinimal jpeg without AI", async () => {
    const buf = await composeQuickOgPreview({
      title: "Ship the social card",
      subtitle: "Scope to planner to OG",
      style: "techMinimal",
    })
    expect(buf.byteLength).toBeGreaterThan(5_000)
    // JPEG SOI
    expect(buf[0]).toBe(0xff)
    expect(buf[1]).toBe(0xd8)
    writeFileSync("/tmp/og-preview-smoke.jpg", buf)
  }, 30_000)
})
