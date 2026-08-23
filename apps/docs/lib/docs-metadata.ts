import { buildPageMetadata } from "atroui/lib/seo"
import { getPseoPage } from "@/lib/pseo"

type DocsMetaInput = {
  title: string
  description: string
  path: string
  type?: "website" | "article"
  publishedTime?: string
}

/** Docs-site metadata via shared AtroUI SEO helpers. */
export function docsPageMetadata(input: DocsMetaInput) {
  const overlay = getPseoPage(input.path)
  return buildPageMetadata({
    ...input,
    title: overlay?.title ?? input.title,
    description: overlay?.description ?? input.description,
  })
}

/** Component doc page: unique snippet for "{Title} AtroUI". */
export function componentPageMetadata(
  title: string,
  path: string,
  description?: string
) {
  const overlay = getPseoPage(path)
  return buildPageMetadata({
    title: overlay?.title ?? title,
    description:
      overlay?.description ??
      description ??
      `${title} in AtroUI - preview, install, and API for the React / Next.js catalog at atroui.com.`,
    path,
  })
}
