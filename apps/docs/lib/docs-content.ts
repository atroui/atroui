/**
 * MDX docs content map — slug → module under `content/docs/`.
 * Changelog / collections / glossary hubs stay TSX (dynamic data).
 */
export const docsMdxSlugs = [
  "index",
  "installation",
  "host-api",
  "registry",
  "theming",
  "brand",
  "identity",
  "guides/launch-workflow",
  "compare",
] as const

export type DocsMdxSlug = (typeof docsMdxSlugs)[number]

export function hrefToDocsMdxSlug(href: string): DocsMdxSlug | null {
  if (href === "/docs") return "index"
  if (!href.startsWith("/docs/")) return null
  const slug = href.slice("/docs/".length)
  return (docsMdxSlugs as readonly string[]).includes(slug)
    ? (slug as DocsMdxSlug)
    : null
}
