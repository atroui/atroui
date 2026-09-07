import type { Metadata } from "next"
import Link from "next/link"
import { ComponentGallery } from "@/components/gallery/component-gallery"
import { catalogNavItems } from "@/lib/navigation"
import { docsPageMetadata } from "@/lib/docs-metadata"

export const metadata: Metadata = docsPageMetadata({
  title: "Components",
  description:
    "Browse the AtroUI component catalog - live previews of primitives, blocks, tools, and headless SEO modules for React and Next.js.",
  path: "/docs/components",
})

export default function ComponentsIndexPage() {
  return (
    <div className="docs-book-wide">
      <header className="docs-book-header">
        <p className="docs-book-eyebrow">
          Catalog · {catalogNavItems.length} components
        </p>
        <h1 className="docs-book-title">Components</h1>
        <p className="docs-book-lede">
          Live previews — not screenshots. Search or filter, then open a
          component to install with{" "}
          <code>npx shadcn@latest add @atroui/…</code>. Host API items pair with
          thin{" "}
          <Link href="/docs/host-api" className="bam-link">
            /api/*
          </Link>{" "}
          routes and your own keys.
        </p>
      </header>

      <ComponentGallery />
    </div>
  )
}
