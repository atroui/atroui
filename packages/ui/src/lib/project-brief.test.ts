import { describe, expect, it } from "vitest"
import {
  briefFromScopeMessage,
  buildOgHref,
  buildThumbnailHref,
  isProjectBrief,
  parseProjectBrief,
  type ProjectBrief,
} from "./project-brief"

const sample: ProjectBrief = {
  name: "LaunchKit",
  oneLiner: "Scope to social card in one loop",
  audience: "indie founders",
  pages: ["home", "pricing"],
  tone: "direct",
  constraints: ["7-day sprint"],
  ogTitle: "Ship the social card",
  ogSubtitle: "Scope → planner → OG",
}

describe("project-brief", () => {
  it("validates and parses JSON", () => {
    expect(isProjectBrief(sample)).toBe(true)
    expect(isProjectBrief({ name: 1 })).toBe(false)
    expect(parseProjectBrief(JSON.stringify(sample))).toEqual(sample)
    expect(parseProjectBrief("nope")).toBeNull()
  })

  it("builds OG and thumbnail hrefs", () => {
    const og = buildOgHref(sample)
    expect(og.startsWith("/og?mode=quick&")).toBe(true)
    expect(og).toContain("title=Ship+the+social+card")
    expect(og).toContain("#og-workspace")
    expect(buildThumbnailHref(sample)).toBe(
      "/thumbnail?title=Ship+the+social+card"
    )
  })

  it("seeds a brief from a scope message", () => {
    const brief = briefFromScopeMessage("  AI waitlist for indie tools  ")
    expect(brief.name).toContain("AI waitlist")
    expect(brief.oneLiner).toBe("AI waitlist for indie tools")
    expect(buildOgHref(brief)).toContain("mode=quick")
  })
})
