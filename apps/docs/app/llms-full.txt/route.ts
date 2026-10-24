import { readFileSync } from "node:fs"
import { join } from "node:path"
import { allNavItems } from "@/lib/navigation"
import { pseoCollections, pseoGlossary } from "@/lib/pseo"

type RegistryItem = {
  name: string
  description?: string
  type?: string
}

function loadRegistryItems(): RegistryItem[] {
  try {
    const raw = readFileSync(
      join(process.cwd(), "registry.json"),
      "utf8",
    )
    const data = JSON.parse(raw) as { items?: RegistryItem[] }
    return Array.isArray(data.items) ? data.items : []
  } catch {
    try {
      const raw = readFileSync(
        join(process.cwd(), "public/r/registry.json"),
        "utf8",
      )
      const data = JSON.parse(raw) as { items?: RegistryItem[] }
      return Array.isArray(data.items) ? data.items : []
    } catch {
      return []
    }
  }
}

function docsHrefFor(name: string): string | null {
  const hit = allNavItems.find(
    (item) =>
      item.href.includes(`/${name}`) ||
      item.href.endsWith(`-${name}`) ||
      item.href.includes(`-${name}`),
  )
  return hit ? `https://www.atroui.com${hit.href}` : null
}

export function GET() {
  const items = loadRegistryItems().slice().sort((a, b) =>
    a.name.localeCompare(b.name),
  )

  const registryLines = items.map((item) => {
    const desc = (item.description ?? "").trim() || item.type || "registry item"
    const docs = docsHrefFor(item.name)
    const base = `- \`@atroui/${item.name}\` — ${desc}`
    return docs ? `${base} · ${docs}` : base
  })

  const lines = [
    "# AtroUI — full catalog",
    "",
    "> Dark-first React / Next.js catalog. Official shadcn namespace @atroui (public directory, no GitHub token).",
    "> npx shadcn@latest add @atroui/…  Tailwind CSS v4. Own the copied files. MIT.",
    "> Never import UI from the npm package `atroui`. Host APIs only: atroui/api/* + BYOK.",
    "> Agent playbook: https://www.atroui.com/docs/guides/for-agents",
    "> Host APIs: https://www.atroui.com/docs/host-api",
    "> Compare: https://www.atroui.com/docs/compare",
    "> Short index: https://www.atroui.com/llms.txt",
    "> https://www.atroui.com",
    "",
    "## Collections",
    ...pseoCollections.map(
      (c) => `- ${c.title}: https://www.atroui.com/docs/collections/${c.slug}`,
    ),
    "",
    "## Glossary",
    ...pseoGlossary.map(
      (t) => `- ${t.title}: https://www.atroui.com/docs/glossary/${t.slug}`,
    ),
    "",
    "## Docs nav",
    ...allNavItems.map(
      (item) => `- ${item.title}: https://www.atroui.com${item.href}`,
    ),
    "",
    `## Registry (@atroui/…) — ${items.length} items`,
    ...registryLines,
    "",
  ]

  return new Response(lines.join("\n"), {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  })
}
