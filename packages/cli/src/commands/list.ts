import pc from "picocolors"
import { fetchCatalog } from "../lib/registry.js"
import { DEFAULT_REGISTRY_BASE } from "../lib/types.js"

export async function listCommand(registry?: string): Promise<void> {
  const baseUrl = registry ?? DEFAULT_REGISTRY_BASE
  const catalog = await fetchCatalog(baseUrl)

  console.log(pc.bold(`AtroUI registry (${catalog.items.length})`))
  console.log(pc.dim(baseUrl + "/r/registry.json"))
  console.log()

  const width = Math.max(...catalog.items.map((i) => i.name.length), 8)

  for (const item of catalog.items) {
    const name = item.name.padEnd(width)
    const title = item.title ?? ""
    console.log(`  ${pc.cyan(name)}  ${pc.dim(title)}`)
  }
}
