import Link from "next/link"
import { notFound } from "next/navigation"
import { BreadcrumbJsonLd } from "atroui"
import { DocsArticleHeader } from "@/components/docs/docs-article-header"
import { DocsFaq } from "@/components/docs/docs-faq"
import { DocsPager } from "@/components/docs-pager"
import { cn } from "@/lib/utils"
import {
  allNavItems,
  badgeLabel,
  type NavItem,
} from "@/lib/navigation"
import {
  getPseoCollection,
  getPseoPage,
  pseoCollections,
} from "@/lib/pseo"

function kitEntry(path: string) {
  const page = getPseoPage(path)
  const nav = allNavItems.find((item) => item.href === path)
  return {
    href: path,
    title: nav?.title ?? page?.title ?? path,
    /** One-line job — why this block is in the kit. */
    meta: page?.job ?? nav?.description ?? page?.description ?? "",
    badge: nav?.badge as NavItem["badge"] | undefined,
  }
}

function KitBadge({ badge }: { badge: NonNullable<NavItem["badge"]> }) {
  return (
    <span
      className={cn(
        "docs-book-badge",
        badge === "host-api" || badge === "registry"
          ? "docs-book-badge-accent"
          : undefined
      )}
    >
      {badgeLabel[badge]}
    </span>
  )
}

export function CollectionsIndexPage() {
  return (
    <article className="space-y-10">
      <DocsArticleHeader
        eyebrow="Getting started"
        title="Collections"
        lede={
          <>
            Four jobs people actually search for. Each hub links to owned registry
            blocks — not a thousand thin keyword pages.
          </>
        }
      />
      <ul className="docs-kit-list">
        {pseoCollections.map((collection) => (
          <li key={collection.slug}>
            <Link
              href={`/docs/collections/${collection.slug}`}
              className="docs-kit-row"
            >
              <span className="docs-hub-title">{collection.title}</span>
              <span className="docs-hub-meta">{collection.description}</span>
            </Link>
          </li>
        ))}
      </ul>
      <DocsPager href="/docs/collections" kind="guides" />
    </article>
  )
}

export function CollectionDoc({ slug }: { slug: string }) {
  const collection = getPseoCollection(slug)
  if (!collection) notFound()

  const path = `/docs/collections/${collection.slug}`
  const entries = collection.paths.map(kitEntry)

  return (
    <article className="space-y-10">
      <BreadcrumbJsonLd
        items={[
          { name: "Docs", path: "/docs" },
          { name: "Collections", path: "/docs/collections" },
          { name: collection.title, path },
        ]}
      />

      <DocsArticleHeader
        eyebrow="Collection"
        title={collection.title}
        lede={collection.intro}
      />

      {/* Fundamental first: what is in the kit. */}
      <section className="space-y-4">
        <h2 className="docs-section-title" id="in-this-kit">
          In this kit
        </h2>
        <ul className="docs-kit-list">
          {entries.map((entry) => (
            <li key={entry.href}>
              <Link href={entry.href} className="docs-kit-row">
                <span className="docs-kit-row-head">
                  <span className="docs-hub-title">{entry.title}</span>
                  {entry.badge ? <KitBadge badge={entry.badge} /> : null}
                </span>
                {entry.meta ? (
                  <span className="docs-hub-meta">{entry.meta}</span>
                ) : null}
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="space-y-4">
        <h2 className="docs-section-title" id="why-this-grouping">
          Why this grouping
        </h2>
        <p className="leading-relaxed">{collection.why}</p>
      </section>

      <DocsFaq pagePath={path} items={collection.faqs} />

      <DocsPager href={path} kind="collections" />
    </article>
  )
}
