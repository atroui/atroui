import type { Metadata } from "next"
import Link from "next/link"
import { DocsPageHeader } from "@/components/docs-page-header"
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
    <article className="mx-auto max-w-3xl space-y-10">
      <DocsPageHeader
        eyebrow="Programmatic catalog"
        title="Collections"
        description={
          <>
            Four jobs people actually search for. Each hub links to owned registry
            blocks — not a thousand thin keyword pages.
          </>
        }
      />
      <ul className="md-glass divide-y divide-border-subtle">
        {pseoCollections.map((collection) => (
          <li key={collection.slug}>
            <Link
              href={`/docs/collections/${collection.slug}`}
              className="block px-4 py-4 transition-colors hover:bg-white/5"
            >
              <span className="ds-sketch block text-lg text-foreground">
                {collection.title}
              </span>
              <span className="ds-meta mt-1 block">{collection.description}</span>
            </Link>
          </li>
        ))}
      </ul>
    </article>
  )
}
