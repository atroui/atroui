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
      <ul className="divide-y divide-border-subtle overflow-hidden rounded-lg border border-border-subtle">
        {pseoCollections.map((collection) => (
          <li key={collection.slug}>
            <Link
              href={`/docs/collections/${collection.slug}`}
              className="block px-4 py-4 transition-colors hover:bg-white/[0.03]"
            >
              <span className="block text-[15px] font-medium tracking-tight text-foreground">
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
