import Link from "next/link"
import { ComponentGallery } from "@/components/gallery/component-gallery"
import { DocsArticleHeader } from "@/components/docs/docs-article-header"
import { catalogNavItems } from "@/lib/navigation"

export function ComponentsGalleryPage() {
  return (
    <article className="docs-book-wide space-y-10">
      <DocsArticleHeader
        eyebrow={`Catalog · ${catalogNavItems.length} components`}
        title="Components"
        lede={
          <>
            Live previews — not screenshots. Search or filter, then open a
            component to install with{" "}
            <code>npx shadcn@latest add @atroui/…</code>. Host API items pair with
            thin{" "}
            <Link href="/docs/host-api" className="bam-link">
              /api/*
            </Link>{" "}
            routes and your own keys.
          </>
        }
      />

      <ComponentGallery />
    </article>
  )
}
