import { readFileSync } from "node:fs"
import { dirname, join } from "node:path"
import { fileURLToPath } from "node:url"

export type CatalogItem = {
  name: string
  title: string
  description: string
  type: string
}

type CatalogFile = {
  items: CatalogItem[]
}

export function loadCatalog(catalogPath = defaultCatalogPath()): CatalogItem[] {
  const parsed = JSON.parse(readFileSync(catalogPath, "utf8")) as CatalogFile
  return parsed.items ?? []
}

export function searchCatalog(
  items: CatalogItem[],
  query: string,
  limit = 20
): CatalogItem[] {
  const q = query.trim().toLowerCase()
  if (!q) {
    return items.slice(0, limit)
  }
  const scored = items
    .map((item) => ({ item, score: scoreItem(item, q) }))
    .filter((row) => row.score > 0)
    .sort((a, b) => b.score - a.score)
  return scored.slice(0, limit).map((row) => row.item)
}

export function getCatalogItem(
  items: CatalogItem[],
  name: string
): CatalogItem | undefined {
  const key = normalizeItemName(name)
  return items.find((item) => item.name === key)
}

/** Public install path while AtroUI is on the shadcn directory. */
export function installCommand(name: string): string {
  return installCommands(name).shadcn
}

export function installCommands(name: string): {
  shadcn: string
  atroui: string
} {
  const n = normalizeItemName(name)
  return {
    shadcn: `npx shadcn@latest add @atroui/${n}`,
    atroui: `npx atroui add ${n}`,
  }
}

export function docsUrl(name: string): string {
  return `https://www.atroui.com/docs/registry#${normalizeItemName(name)}`
}

export function normalizeItemName(name: string): string {
  return name.trim().replace(/^@atroui\//, "")
}

function scoreItem(item: CatalogItem, q: string): number {
  const name = item.name.toLowerCase()
  const title = item.title.toLowerCase()
  const description = item.description.toLowerCase()
  if (name === q) return 100
  if (name.startsWith(q)) return 80
  if (name.includes(q)) return 60
  if (title.includes(q)) return 40
  if (description.includes(q)) return 20
  return 0
}

function defaultCatalogPath(): string {
  return join(dirname(fileURLToPath(import.meta.url)), "../data/catalog.json")
}
