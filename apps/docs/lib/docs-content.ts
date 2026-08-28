/**
 * MDX docs content map — slug → content module under `content/docs/`.
 * Remaining guides still use TSX pages but share DocsMdxPage / page tree.
 */
export const docsMdxSlugs = ["index", "host-api", "compare"] as const

export type DocsMdxSlug = (typeof docsMdxSlugs)[number]

export function hrefToDocsMdxSlug(href: string): DocsMdxSlug | null {
  if (href === "/docs") return "index"
  if (!href.startsWith("/docs/")) return null
  const slug = href.slice("/docs/".length)
  return (docsMdxSlugs as readonly string[]).includes(slug)
    ? (slug as DocsMdxSlug)
    : null
}
