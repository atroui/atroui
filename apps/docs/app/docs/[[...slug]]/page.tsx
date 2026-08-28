import { notFound } from "next/navigation"
import { findNeighbour } from "fumadocs-core/page-tree"
import { DocsPageShell } from "@/components/docs-page-shell"
import { DocsPager } from "@/components/docs-pager"
import { mdxComponents } from "@/components/docs-mdx"
import { productArticleBody } from "@/components/product-page"
import { normalizeTocTitle, type TocItem } from "@/lib/docs-headings"
import { docsPageMetadata } from "@/lib/docs-metadata"
import { getPseoPage } from "@/lib/pseo"
import { source } from "@/lib/source"
import { cn } from "@/lib/utils"

export const revalidate = false
export const dynamic = "force-static"
export const dynamicParams = false

export function generateStaticParams() {
  return source.generateParams()
}

export async function generateMetadata(props: {
  params: Promise<{ slug?: string[] }>
}) {
  const params = await props.params
  const page = source.getPage(params.slug)
  if (!page) notFound()

  const doc = page.data
  return docsPageMetadata({
    title: doc.title,
    description: doc.description ?? "",
    path: page.url,
  })
}

function mapToc(
  toc: { title: string; url: string; depth: number }[] | undefined,
): TocItem[] {
  return (toc ?? []).map((item) => ({
    id: item.url.replace(/^#/, ""),
    title: normalizeTocTitle(item.title),
    depth: item.depth as 2 | 3 | undefined,
  }))
}

export default async function DocsSlugPage(props: {
  params: Promise<{ slug?: string[] }>
}) {
  const params = await props.params
  const page = source.getPage(params.slug)
  if (!page) notFound()

  const doc = page.data
  const MDX = doc.body
  const pseo = getPseoPage(page.url)
  const neighbours = findNeighbour(source.pageTree, page.url)
  const wide = Boolean(
    (doc as { fullBleed?: boolean }).fullBleed &&
      page.url.startsWith("/docs/components/"),
  )

  return (
    <DocsPageShell toc={mapToc(doc.toc)} wide={wide}>
      <article
        id="docs-article"
        className={cn(productArticleBody, wide && "max-w-6xl")}
      >
        <MDX
          components={mdxComponents}
          pseo={pseo}
          siteUrl={process.env.NEXT_PUBLIC_SITE_URL}
        />
        <DocsPager
          href={page.url}
          prev={
            neighbours.previous
              ? {
                  title: neighbours.previous.name,
                  href: neighbours.previous.url,
                }
              : null
          }
          next={
            neighbours.next
              ? { title: neighbours.next.name, href: neighbours.next.url }
              : null
          }
        />
      </article>
    </DocsPageShell>
  )
}
