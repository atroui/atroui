/**
 * Public nav API — thin facade over the docs page tree.
 * Prefer `@/lib/docs-page-tree` for new code.
 */
export type { NavItem, NavSection } from "@/lib/navigation-data"
export { badgeLabel } from "@/lib/navigation-data"

import type { NavItem } from "@/lib/navigation-data"
import {
  docsPageTree,
  findCatalogNeighbors as treeCatalogNeighbors,
  findDocsNeighbors,
  findPageNode,
  flattenPageTree,
  pageTreeToNavSections,
} from "@/lib/docs-page-tree"

export const navigation = pageTreeToNavSections(docsPageTree)

export const allNavItems = flattenPageTree(docsPageTree)

export const catalogNavItems = flattenPageTree(docsPageTree).filter((item) => {
  const node = findPageNode(item.href)
  return node?.source === "registry"
})

export type DocKind = "Primitive" | "Block" | "Tool" | "Headless"

const sectionKind: Record<string, DocKind> = {
  Primitives: "Primitive",
  Blocks: "Block",
  Indie: "Block",
  Tools: "Tool",
  Headless: "Headless",
}

export function findNavContext(href: string) {
  for (const section of navigation) {
    const index = section.items.findIndex((item) => item.href === href)
    if (index === -1) continue
    return {
      section,
      item: section.items[index]!,
      kind: sectionKind[section.title],
    }
  }
  return null
}

/** Same-section siblings for internal links (pSEO spokes). */
export function relatedNavItems(href: string, limit = 4): NavItem[] {
  const ctx = findNavContext(href)
  if (!ctx) return []
  return ctx.section.items.filter((item) => item.href !== href).slice(0, limit)
}

/** Catalog-only prev/next (component docs). */
export function findCatalogNeighbors(href: string) {
  return treeCatalogNeighbors(href)
}

/** Full docs-tree prev/next (guides + catalog). */
export { findDocsNeighbors }
