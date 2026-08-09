import { fetchItem } from "./registry.js"
import {
  registryDepToName,
  type RegistryItem,
  normalizeItemName,
} from "./types.js"

/**
 * BFS resolve registryDependencies. Returns items in install order
 * (dependencies before dependents).
 */
export async function resolveTree(
  names: string[],
  baseUrl: string
): Promise<RegistryItem[]> {
  const queue = names.map(normalizeItemName)
  const seen = new Set<string>()
  const ordered: RegistryItem[] = []

  while (queue.length > 0) {
    const name = queue.shift()!
    if (seen.has(name)) continue
    seen.add(name)

    const item = await fetchItem(name, baseUrl)
    for (const dep of item.registryDependencies ?? []) {
      const depName = registryDepToName(dep)
      if (!seen.has(depName)) queue.push(depName)
    }
    ordered.push(item)
  }

  // Dependencies should be written before dependents: reverse BFS discovery
  // is wrong for nested deps discovered late. Topological: process deps first
  // by putting each item after its registry deps in a stable pass.
  const byName = new Map(ordered.map((i) => [i.name, i]))
  const visiting = new Set<string>()
  const done = new Set<string>()
  const result: RegistryItem[] = []

  function visit(name: string) {
    if (done.has(name)) return
    if (visiting.has(name)) return
    visiting.add(name)
    const item = byName.get(name)
    if (!item) return
    for (const dep of item.registryDependencies ?? []) {
      visit(registryDepToName(dep))
    }
    visiting.delete(name)
    done.add(name)
    result.push(item)
  }

  for (const name of names.map(normalizeItemName)) {
    visit(name)
  }
  // Include any transitive-only nodes not in the original names list
  for (const item of ordered) {
    visit(item.name)
  }

  return result
}

export function collectNpmDependencies(items: RegistryItem[]): string[] {
  const set = new Set<string>()
  for (const item of items) {
    for (const dep of item.dependencies ?? []) {
      set.add(dep)
    }
  }
  return [...set].sort()
}
