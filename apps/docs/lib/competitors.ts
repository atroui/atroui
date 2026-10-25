/**
 * Centralized competitor facts for /docs/compare pages.
 * Keep profiles in competitor-profiles/ as research; this module is the public copy source.
 */

export type CompetitorSlug = "aceternity" | "magic-ui"

export type CompetitorRecord = {
  slug: CompetitorSlug
  name: string
  site: string
  pricingUrl: string
  tagline: string
  freeTier: string
  paidFrom: string
  sectionsModel: string
  hostApis: string
  liveRooms: string
  install: string
  agents: string
  taste: string
  bestFor: string
  notIdealFor: string
  strengths: string[]
  limitations: string[]
}

export const atrouiFacts = {
  name: "AtroUI",
  site: "https://www.atroui.com",
  tagline: "Add the section. Own the room.",
  freeTier: "MIT catalog — free-first",
  paidFrom: "$0 (no Pro wall on sections)",
  sectionsModel: "Production sections via registry (MIT)",
  hostApis: "Yes — BYOK Host APIs (waitlist, contact, OG, scope, …)",
  liveRooms: "/landing, /launch, /themes, /og — same files you install",
  install: "npx shadcn add @atroui/… (+ @atroui/cli, MCP)",
  agents: "MCP + /docs/guides/for-agents + llms.txt",
  taste: "Dark-first, soft-rect, anti-slop",
  bestFor:
    "Builders who already use shadcn and want dark production sections they own, plus forms/AI routes on their own keys",
  notIdealFor:
    "Teams hunting max motion candy, beams, or a paid mega-block library",
} as const

export const competitors: Record<CompetitorSlug, CompetitorRecord> = {
  aceternity: {
    slug: "aceternity",
    name: "Aceternity UI",
    site: "https://ui.aceternity.com",
    pricingUrl: "https://ui.aceternity.com/pricing",
    tagline: "Beautiful landing pages for React",
    freeTier: "~100–118 free animated components",
    paidFrom: "$169 (1-year) / $199 lifetime",
    sectionsModel: "Most production blocks behind Pro",
    hostApis: "No Host API / BYOK product line",
    liveRooms: "Docs previews (not install-matched rooms)",
    install: "npx shadcn add @aceternity/… (+ Pro token)",
    agents: "Strong MCP / agent install story",
    taste: "Premium motion landings; hero/shader heavy",
    bestFor:
      "Teams that want the largest Pro landing-block catalog and agent-first install of polished marketing UI",
    notIdealFor:
      "Teams that need MIT sections + hardened form/AI routes with keys only in their .env",
    strengths: [
      "Block and template volume",
      "Agent / MCP distribution",
      "Category mindshare for pretty Next landings",
    ],
    limitations: [
      "Pro paywall on most sections",
      "No BYOK Host API line",
      "Taste cluster overlaps common AI-landing patterns",
    ],
  },
  "magic-ui": {
    slug: "magic-ui",
    name: "Magic UI",
    site: "https://magicui.design",
    pricingUrl: "https://pro.magicui.design",
    tagline: "UI library for Design Engineers",
    freeTier: "150+ MIT animated components",
    paidFrom: "Pro $199 one-time (sections + templates)",
    sectionsModel: "Effects free; composed sections Pro",
    hostApis: "No Host API / BYOK product line",
    liveRooms: "Docs / demos",
    install: "shadcn registry / MCP",
    agents: "MCP emerging alongside CLI",
    taste: "High motion — beams, marquees, spectacle",
    bestFor:
      "Design engineers who want animated shadcn companions and are fine paying for Pro sections",
    notIdealFor:
      "Teams that want soft-rect production sections + Host APIs without a Pro wall",
    strengths: [
      "Motion mindshare and free effect catalog",
      "Clear free vs Pro split",
      "shadcn companion positioning",
    ],
    limitations: [
      "Spectacle over production restraint",
      "Sections altitude is paid",
      "No hardened forms/AI routes",
    ],
  },
}

export function compareHref(slug: CompetitorSlug): string {
  return slug === "aceternity"
    ? "/docs/compare/vs-aceternity"
    : "/docs/compare/vs-magic-ui"
}
