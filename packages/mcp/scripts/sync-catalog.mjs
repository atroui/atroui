import { readFileSync, writeFileSync, mkdirSync } from "node:fs"
import { dirname, join } from "node:path"
import { fileURLToPath } from "node:url"

const root = join(dirname(fileURLToPath(import.meta.url)), "..")
const registryPath = join(root, "../../apps/docs/registry.json")
const outDir = join(root, "data")
const outPath = join(outDir, "catalog.json")

const registry = JSON.parse(readFileSync(registryPath, "utf8"))
const items = (registry.items ?? []).map((item) => ({
  name: item.name,
  title: item.title ?? item.name,
  description: item.description ?? "",
  type: item.type ?? "registry:item",
}))

mkdirSync(outDir, { recursive: true })
writeFileSync(
  outPath,
  `${JSON.stringify({ generatedFrom: "apps/docs/registry.json", items }, null, 2)}\n`
)
console.error(`Wrote ${items.length} catalog items to ${outPath}`)
