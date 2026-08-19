import { describe, expect, it } from "vitest"
import {
  getCatalogItem,
  installCommand,
  installCommands,
  loadCatalog,
  normalizeItemName,
  searchCatalog,
} from "./catalog.js"

const fixture = [
  {
    name: "home-hero",
    title: "Home Hero",
    description: "Landing hero with CTA.",
    type: "registry:block",
  },
  {
    name: "og-workspace",
    title: "OG Workspace",
    description: "Compose social cards.",
    type: "registry:block",
  },
  {
    name: "contact-form",
    title: "Contact Form",
    description: "Form that posts to a Host API.",
    type: "registry:block",
  },
]

describe("catalog", () => {
  it("normalizes @atroui/ prefix", () => {
    expect(normalizeItemName("@atroui/home-hero")).toBe("home-hero")
  })

  it("builds the shadcn add command", () => {
    expect(installCommand("home-hero")).toBe(
      "npx shadcn@latest add @atroui/home-hero"
    )
    expect(installCommands("home-hero").atroui).toBe("npx atroui add home-hero")
  })

  it("ranks exact name above description hits", () => {
    const results = searchCatalog(fixture, "hero")
    expect(results[0]?.name).toBe("home-hero")
  })

  it("finds by namespaced name", () => {
    expect(getCatalogItem(fixture, "@atroui/og-workspace")?.title).toBe(
      "OG Workspace"
    )
  })

  it("loads the bundled registry snapshot", () => {
    const items = loadCatalog()
    expect(items.length).toBeGreaterThan(20)
    expect(getCatalogItem(items, "button")).toBeDefined()
  })
})
