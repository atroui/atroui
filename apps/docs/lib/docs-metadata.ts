import { buildPageMetadata } from "atroui/lib/seo"

type DocsMetaInput = {
  title: string
  description: string
  path: string
  type?: "website" | "article"
  publishedTime?: string
}

/** Docs-site metadata via shared AtroUI SEO helpers. */
export function docsPageMetadata(input: DocsMetaInput) {
  return buildPageMetadata(input)
}

/** Component doc page: unique snippet for “{Title} AtroUI”. */
export function componentPageMetadata(
  title: string,
  path: string,
  description?: string
) {
  return buildPageMetadata({
    title,
    description:
      description ??
      `${title} in AtroUI - the React / Next.js component library and dark-first design system at atroui.com.`,
    path,
  })
}
