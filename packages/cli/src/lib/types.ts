export type RegistryFile = {
  path: string
  type?: string
  target?: string
  content?: string
}

export type RegistryItem = {
  name: string
  type?: string
  title?: string
  description?: string
  dependencies?: string[]
  registryDependencies?: string[]
  files?: RegistryFile[]
}

export type RegistryCatalog = {
  name?: string
  homepage?: string
  items: Array<{
    name: string
    title?: string
    description?: string
    type?: string
  }>
}

export const DEFAULT_REGISTRY_BASE = "https://www.atroui.com"

export function normalizeItemName(raw: string): string {
  let name = raw.trim()
  if (name.startsWith("@atroui/")) name = name.slice("@atroui/".length)
  if (name.startsWith("atroui/")) name = name.slice("atroui/".length)
  return name.replace(/\.json$/i, "")
}

export function registryDepToName(dep: string): string {
  return normalizeItemName(dep)
}
