import {
  DEFAULT_REGISTRY_BASE,
  type RegistryCatalog,
  type RegistryItem,
  normalizeItemName,
} from "./types.js"

function joinUrl(base: string, path: string): string {
  return `${base.replace(/\/$/, "")}/${path.replace(/^\//, "")}`
}

export async function fetchCatalog(
  baseUrl = DEFAULT_REGISTRY_BASE
): Promise<RegistryCatalog> {
  const url = joinUrl(baseUrl, "r/registry.json")
  const res = await fetch(url)
  if (!res.ok) {
    throw new Error(`Failed to fetch catalog (${res.status}): ${url}`)
  }
  const data = (await res.json()) as RegistryCatalog
  if (!data?.items || !Array.isArray(data.items)) {
    throw new Error("Invalid registry.json: missing items[]")
  }
  return data
}

export async function fetchItem(
  name: string,
  baseUrl = DEFAULT_REGISTRY_BASE
): Promise<RegistryItem> {
  const id = normalizeItemName(name)
  const url = joinUrl(baseUrl, `r/${id}.json`)
  const res = await fetch(url)
  if (!res.ok) {
    throw new Error(`Component "${id}" not found (${res.status}): ${url}`)
  }
  const data = (await res.json()) as RegistryItem
  if (!data?.name) {
    throw new Error(`Invalid registry item at ${url}`)
  }
  return data
}
