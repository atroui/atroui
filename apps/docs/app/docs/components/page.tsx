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
    <div className="mx-auto max-w-6xl">
      <header className="mb-8 border-b border-border-subtle pb-6">
        <p className="ds-mono-label mb-3">
          Library · {catalogNavItems.length} components
        </p>
        <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
          Components
        </h1>
        <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-muted-foreground">
          Real, running previews — not screenshots. Search or filter, then open
          any component to copy it in with{" "}
          <code className="rounded-md bg-muted px-1.5 py-0.5 font-mono text-[12px] text-foreground">
            npx shadcn@latest add @atroui/…
          </code>
          . Host&nbsp;API items pair with thin{" "}
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
