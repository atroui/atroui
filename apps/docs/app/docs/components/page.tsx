import type { Metadata } from "next"
import Link from "next/link"
import { DocsPageHeader } from "@/components/docs-page-header"
import { badgeLabel, navigation } from "@/lib/navigation"
import { docsPageMetadata } from "@/lib/docs-metadata"

export const metadata: Metadata = docsPageMetadata({
  title: "Components",
  description:
    "Browse the AtroUI component catalog - primitives, blocks, tools, and headless SEO modules for React and Next.js.",
  path: "/docs/components",
})

export default function ComponentsIndexPage() {
  const sections = navigation.filter((s) => s.title !== "Getting Started")

  return (
    <article className="mx-auto max-w-3xl space-y-10">
      <DocsPageHeader
        eyebrow="Library"
        title="Components"
        description={
          <>
            Production UI curated into primitives, blocks, tools, and headless
            modules. For search-intent clusters (forms, OG images, launch), start
            at{" "}
            <Link href="/docs/collections" className="bam-link">
              Collections
            </Link>
            . Items tagged CLI install with{" "}
            <code className="rounded-md bg-muted px-1.5 py-0.5 font-mono text-[12px] text-foreground">
              npx shadcn@latest add @atroui/…
            </code>
            . Items tagged{" "}
            <Link href="/docs/host-api" className="bam-link">
              Host API
            </Link>{" "}
            need thin{" "}
            <code className="rounded-md bg-muted px-1.5 py-0.5 font-mono text-[12px] text-foreground">
              /api/*
            </code>{" "}
            routes plus your own keys.
          </>
        }
      />

      {sections.map((section) => (
        <section key={section.title} className="space-y-3">
          <h2 className="ds-nav-section text-foreground">{section.title}</h2>
          <ul className="md-glass divide-y divide-border-subtle">
            {section.items.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="flex items-center justify-between gap-3 px-4 py-3.5 transition-colors hover:bg-white/5"
                >
                  <span className="min-w-0">
                    <span className="ds-sketch block text-lg text-foreground">
                      {item.title}
                    </span>
                    {item.description ? (
                      <span className="ds-meta mt-0.5 block">
                        {item.description}
                      </span>
                    ) : null}
                  </span>
                  <span className="flex shrink-0 items-center gap-3">
                    {item.badge ? (
                      <span
                        className={`ds-sketch text-[13px] ${
                          item.badge === "registry" || item.badge === "host-api"
                            ? "text-brand"
                            : "text-muted-foreground"
                        }`}
                      >
                        {badgeLabel[item.badge]}
                      </span>
                    ) : null}
                    <span className="text-muted-foreground" aria-hidden>
                      →
                    </span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </article>
  )
}
