import { describe, expect, it } from "vitest"
import { getSkill, listSkills } from "./skills.js"

describe("skills", () => {
  it("lists design and host-api", () => {
    const ids = listSkills().map((s) => s.id)
    expect(ids).toEqual(["design", "host-api"])
  })

  it("resolves family-values alias", () => {
    const skill = getSkill("family-values")
    expect(skill?.id).toBe("design")
    expect(skill?.markdown).toContain("Family Values")
  })

  it("resolves byok alias", () => {
    const skill = getSkill("byok")
    expect(skill?.id).toBe("host-api")
    expect(skill?.markdown).toContain("Bring your own keys")
  })
})
