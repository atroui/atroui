import type { Metadata } from "next"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { badgeLabel, catalogNavItems, navigation } from "@/lib/navigation"
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
    <div className="mx-auto max-w-5xl space-y-12">
      <header>
        <p className="ms-stamp mb-3">Library · {catalogNavItems.length} components</p>
        <h1 className="ds-headline text-3xl text-foreground sm:text-4xl md:text-5xl">
          Components
        </h1>
        <p className="ds-lede mt-4 max-w-2xl">
          Production UI curated into primitives, blocks, tools, and headless
          modules. Items tagged{" "}
          <span className="atro-chip-brand atro-chip">CLI</span> install with{" "}
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
          routes plus your own keys. For search-intent clusters, start at{" "}
          <Link href="/docs/collections" className="bam-link">
            Collections
          </Link>
          .
        </p>

        <nav
          aria-label="Component categories"
          className="mt-6 flex flex-wrap gap-2"
        >
          {sections.map((section) => (
            <a
              key={section.title}
              href={`#${section.title.toLowerCase()}`}
              className="atro-chip transition-colors hover:border-brand/40 hover:text-foreground"
            >
              {section.title}
              <span className="text-muted-foreground/70">
                {section.items.length}
              </span>
            </a>
          ))}
        </nav>
      </header>

      {sections.map((section) => (
        <section
          key={section.title}
          id={section.title.toLowerCase()}
          className="scroll-mt-24 space-y-4"
        >
          <div className="flex items-baseline justify-between gap-3">
            <h2 className="ds-nav-section text-foreground">{section.title}</h2>
            <span className="ds-mono-label">
              {section.items.length} items
            </span>
          </div>

          <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {section.items.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="atro-tile group h-full flex-col p-4"
                >
                  <div className="flex items-start justify-between gap-2">
                    <span className="ds-sketch text-lg text-foreground">
                      {item.title}
                    </span>
                    {item.badge ? (
                      <span
                        className={
                          item.badge === "registry"
                            ? "atro-chip"
                            : "atro-chip-brand atro-chip"
                        }
                      >
                        {badgeLabel[item.badge]}
                      </span>
                    ) : null}
                  </div>
                  {item.description ? (
                    <p className="ds-meta mt-1.5 flex-1">{item.description}</p>
                  ) : null}
                  <span className="mt-3 inline-flex items-center gap-1 text-[12px] font-medium text-muted-foreground">
                    View
                    <ArrowUpRight
                      className="atro-tile-arrow size-3.5"
                      aria-hidden
                    />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  )
}
