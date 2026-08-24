import type { Metadata } from "next"
import { buildPageMetadata } from "atroui/lib/seo"
import { getPseoPage } from "@/lib/pseo"
import { shareOgImagePath } from "@/lib/share-og"

type DocsMetaInput = {
  title: string
  description: string
  path: string
  type?: "website" | "article"
  publishedTime?: string
  /** Absolute or site-relative OG. Omit to auto-build a per-route card. */
  image?: string
}

function ogImageForDocsPath(path: string) {
  return shareOgImagePath(path)
}

/** PNG + dimensions + twitter:site so X, LinkedIn, Discord, Slack, iMessage agree. */
function withCrawlerShareTags(meta: Metadata, image: string): Metadata {
  const imageUrl = image.startsWith("http")
    ? image
    : image.startsWith("/")
      ? image
      : `/${image}`
  const ogImages = meta.openGraph?.images
  const first =
    Array.isArray(ogImages) && typeof ogImages[0] === "object" && ogImages[0]
      ? ogImages[0]
      : { url: imageUrl, width: 1200, height: 630, alt: String(meta.title ?? "AtroUI") }
  const url =
    typeof first === "object" && first && "url" in first
      ? first.url
      : imageUrl
  const alt =
    typeof first === "object" && first && "alt" in first && first.alt
      ? first.alt
      : "AtroUI"

  const imageObject = {
    url,
    width: 1200,
    height: 630,
    alt,
    type: "image/png" as const,
  }

  return {
    ...meta,
    openGraph: {
      ...meta.openGraph,
      images: [imageObject],
    },
    twitter: {
      ...meta.twitter,
      card: "summary_large_image",
      site: "@iamk",
      creator: "@iamk",
      images: [imageObject],
    },
  }
}

/** Docs-site metadata via shared AtroUI SEO helpers. */
export function docsPageMetadata(input: DocsMetaInput) {
  const overlay = getPseoPage(input.path)
  const title = overlay?.title ?? input.title
  const description = overlay?.description ?? input.description
  const image = input.image ?? ogImageForDocsPath(input.path)
  return withCrawlerShareTags(
    buildPageMetadata({
      ...input,
      title,
      description,
      image,
    }),
    image
  )
}

/** Component doc page: unique snippet for "{Title} AtroUI". */
export function componentPageMetadata(
  title: string,
  path: string,
  description?: string
) {
  const overlay = getPseoPage(path)
  const resolvedTitle = overlay?.title ?? title
  const resolvedDescription =
    overlay?.description ??
    description ??
    `${title} in AtroUI - preview, install, and API for the React / Next.js catalog at atroui.com.`
  const image = ogImageForDocsPath(path)
  return withCrawlerShareTags(
    buildPageMetadata({
      title: resolvedTitle,
      description: resolvedDescription,
      path,
      image,
    }),
    image
  )
}
