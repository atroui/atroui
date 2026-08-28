/**
 * Docs page tree — single source of truth (shadcn pageTree pattern).
 * Sidebar, ⌘K, pager, and mobile docs tree all derive from here.
 */
import {
  navigation as curatedSections,
  type NavItem,
  type NavSection,
} from "@/lib/navigation-data"

export type PageBadge = NonNullable<NavItem["badge"]>

export type PageTreePage = {
  type: "page"
  title: string
  href: string
  description?: string
  badge?: PageBadge
  /** Where the page body lives. */
  source?: "mdx" | "tsx" | "registry" | "external"
}

export type PageTreeFolder = {
  type: "folder"
  title: string
  children: PageTreePage[]
}

export type PageTreeNode = PageTreeFolder | PageTreePage

const CATALOG_FOLDERS = new Set([
  "Primitives",
  "Blocks",
  "Indie",
  "Tools",
  "Headless",
])

const MDX_HREFS = new Set([
  "/docs",
  "/docs/host-api",
  "/docs/compare",
])

const EXTERNAL_HREFS = new Set(["/blog", "/updates"])

function inferSource(href: string, folderTitle: string): PageTreePage["source"] {
  if (EXTERNAL_HREFS.has(href)) return "external"
  if (href.startsWith("/docs/components/") && href !== "/docs/components")
    return "registry"
  if (MDX_HREFS.has(href)) return "mdx"
  if (CATALOG_FOLDERS.has(folderTitle)) return "registry"
  return "tsx"
}

export const docsPageTree: PageTreeFolder[] = curatedSections.map((section) => ({
  type: "folder" as const,
  title: section.title,
  children: section.items.map((item) => ({
    type: "page" as const,
    title: item.title,
    href: item.href,
    description: item.description,
    badge: item.badge,
    source: inferSource(item.href, section.title),
  })),
}))

/** Sidebar / legacy NavSection shape. */
export function pageTreeToNavSections(tree: PageTreeFolder[] = docsPageTree): NavSection[] {
  return tree.map((folder) => ({
    title: folder.title,
    items: folder.children.map((page) => ({
      title: page.title,
      href: page.href,
      description: page.description,
      badge: page.badge,
    })),
  }))
}

/** Flat list in sidebar order (includes external doors). */
export function flattenPageTree(tree: PageTreeFolder[] = docsPageTree): NavItem[] {
  return tree.flatMap((folder) =>
    folder.children.map((page) => ({
      title: page.title,
      href: page.href,
      description: page.description,
      badge: page.badge,
    }))
  )
}

/** In-docs pages only — pager / sequential reading. */
export function flattenDocsPages(tree: PageTreeFolder[] = docsPageTree): NavItem[] {
  return flattenPageTree(tree).filter((item) => {
    const node = findPageNode(item.href, tree)
    return node?.source !== "external"
  })
}

export function findPageNode(
  href: string,
  tree: PageTreeFolder[] = docsPageTree
): PageTreePage | null {
  for (const folder of tree) {
    const hit = folder.children.find((p) => p.href === href)
    if (hit) return hit
  }
  return null
}

export function findDocsNeighbors(href: string) {
  const pages = flattenDocsPages()
  const index = pages.findIndex((item) => item.href === href)
  if (index === -1) return { prev: null, next: null }
  return {
    prev: index > 0 ? pages[index - 1]! : null,
    next: index < pages.length - 1 ? pages[index + 1]! : null,
  }
}

export function findCatalogNeighbors(href: string) {
  const pages = flattenPageTree().filter((item) => {
    const node = findPageNode(item.href)
    return node?.source === "registry"
  })
  const index = pages.findIndex((item) => item.href === href)
  if (index === -1) return { prev: null, next: null }
  return {
    prev: index > 0 ? pages[index - 1]! : null,
    next: index < pages.length - 1 ? pages[index + 1]! : null,
  }
}
