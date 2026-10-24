import { z } from "zod"

export type WowCatalogEntry = {
  name: string
  title: string
  description: string
  type: string
}

export const WOW_CATALOG: WowCatalogEntry[] = [
  { name: "marquee", title: "Marquee", description: "Infinite logo/testimonial strip — reverse/pause/vertical/repeat.", type: "registry:ui" },
  { name: "border-beam", title: "Border Beam", description: "Brand light travelling the container edge. Reduced-motion safe.", type: "registry:ui" },
  { name: "magic-card", title: "Magic Card", description: "Cursor spotlight + brand border glow on soft-rect panels.", type: "registry:ui" },
  { name: "animated-beam", title: "Animated Beam", description: "SVG integration beam between two nodes. Brand gradient.", type: "registry:ui" },
  { name: "bento-grid", title: "Bento Grid", description: "Soft-rect bento grid + card with top hairline glow.", type: "registry:ui" },
  { name: "meteors", title: "Meteors", description: "Capped CSS meteor streaks for heroes. Reduced-motion safe.", type: "registry:ui" },
  { name: "dock", title: "Dock", description: "macOS magnification dock. Token chrome, reduced-motion static.", type: "registry:ui" },
  { name: "orbiting-circles", title: "Orbiting Circles", description: "Icons orbiting a center node for integration art.", type: "registry:ui" },
  { name: "number-ticker", title: "Number Ticker", description: "Count-up on inView with tabular nums.", type: "registry:ui" },
  { name: "aurora-text", title: "Aurora Text", description: "Slow brand gradient sweep for display words.", type: "registry:ui" },
  { name: "saas-starter", title: "SaaS Starter", description: "One-file SaaS composite — announcement, hero, logos, features, stats, pricing teaser, CTA, footer note.", type: "registry:block" },
]

export function listCatalog(): WowCatalogEntry[] {
  return [...WOW_CATALOG]
}

export function getCatalogEntry(name: string): WowCatalogEntry | undefined {
  const key = name.trim().replace(/^@atroui\//, "")
  return WOW_CATALOG.find((item) => item.name === key)
}

export function searchWowCatalog(query: string, limit = 20): WowCatalogEntry[] {
  const q = query.trim().toLowerCase()
  if (!q) return WOW_CATALOG.slice(0, limit)
  return WOW_CATALOG.filter((item) =>
    `${item.name} ${item.title} ${item.description}`.toLowerCase().includes(q)
  ).slice(0, limit)
}

/** Public install path while AtroUI is on the shadcn directory. */
export function installCommands(name: string): { shadcn: string; atroui: string } {
  const n = name.trim().replace(/^@atroui\//, "")
  return {
    shadcn: `npx shadcn@latest add @atroui/${n}`,
    atroui: `npx atroui add ${n}`,
  }
}

export function docsUrl(name: string): string {
  return `https://www.atroui.com/docs/components#${name.trim().replace(/^@atroui\//, "")}`
}

function withInstall(item: WowCatalogEntry) {
  const commands = installCommands(item.name)
  return { ...item, install: commands.shadcn, installCommands: commands, docs: docsUrl(item.name) }
}

export const catalogTool = {
  name: "get_wow_catalog",
  description: "List the 10 AtroUI wow primitives + saas-starter with install commands. Optional query filters by name/title/description.",
  schema: {
    query: z.string().optional().describe("Filter text, e.g. marquee, beam, pricing. Omit to list all."),
  },
  handler: async ({ query }: { query?: string }) => {
    const items = query ? searchWowCatalog(query) : listCatalog()
    return {
      content: [
        {
          type: "text" as const,
          text: JSON.stringify(items.map(withInstall), null, 2),
        },
      ],
    }
  },
}

/** Register the wow catalog tool on an McpServer (same server.tool shape as siblings). */
export function registerCatalogTool(server: {
  tool: (name: string, description: string, schema: object, handler: (args: { query?: string }) => Promise<unknown>) => void
}): void {
  server.tool(catalogTool.name, catalogTool.description, catalogTool.schema, catalogTool.handler)
}
