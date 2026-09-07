import type { Metadata } from "next"
import Link from "next/link"
import { DocsArticleHeader } from "@/components/docs/docs-article-header"
import { DocsPager } from "@/components/docs-pager"
import { docsPageMetadata } from "@/lib/docs-metadata"
import { pseoCollections } from "@/lib/pseo"

export const metadata: Metadata = docsPageMetadata({
  title: "Component collections",
  description:
    "AtroUI grouped by job: Next.js forms with Host APIs, OG images, indie launch workflow, dark marketing sections. Not a dump of every registry item.",
  path: "/docs/collections",
})

export default function CollectionsIndexPage() {
  return (
    <article className="space-y-10">
      <DocsArticleHeader
        eyebrow="Programmatic catalog"
        title="Collections"
        lede={
          <>
            Four jobs people actually search for. Each hub links to owned registry
            blocks — not a thousand thin keyword pages.
          </>
        }
      />
      <ul className="divide-y divide-border-subtle border-y border-border-subtle">
        {pseoCollections.map((collection) => (
          <li key={collection.slug}>
            <Link
              href={`/docs/collections/${collection.slug}`}
              className="block py-4 transition-colors hover:bg-muted/30"
            >
              <span className="ds-headline block text-lg text-foreground">
                {collection.title}
              </span>
              <span className="ds-meta mt-1 block">{collection.description}</span>
            </Link>
          </li>
        ))}
      </ul>
      <DocsPager href="/docs/collections" kind="guides" />
    </article>
  )
}
