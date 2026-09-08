import Link from "next/link"
import { notFound } from "next/navigation"
import { BreadcrumbJsonLd, FaqJsonLd } from "atroui"
import { DocsArticleHeader } from "@/components/docs/docs-article-header"
import { DocsPager } from "@/components/docs-pager"
import { allNavItems } from "@/lib/navigation"
import {
  getPseoCollection,
  getPseoPage,
  pseoCollections,
} from "@/lib/pseo"

function labelFor(path: string) {
  return (
    getPseoPage(path)?.title ??
    allNavItems.find((item) => item.href === path)?.title ??
    path
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
      <ul className="divide-y divide-border-subtle border-y border-border-subtle">
        {pseoCollections.map((collection) => (
          <li key={collection.slug}>
            <Link
              href={`/docs/collections/${collection.slug}`}
              className="block py-4 transition-colors hover:bg-muted/30"
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

  return (
    <article className="space-y-10">
      <BreadcrumbJsonLd
        items={[
          { name: "Docs", path: "/docs" },
          { name: "Collections", path: "/docs/collections" },
          { name: collection.title, path },
        ]}
      />
      <FaqJsonLd items={collection.faqs} pagePath={path} />

      <DocsArticleHeader
        eyebrow="Collection"
        title={collection.title}
        lede={collection.intro}
      />

      <section className="space-y-4">
        <h2 className="docs-section-title">Why this grouping</h2>
        <p className="leading-relaxed">{collection.why}</p>
      </section>

      <section className="space-y-4">
        <h2 className="docs-section-title">Install these</h2>
        <ul className="md-glass divide-y divide-border-subtle">
          {collection.paths.map((href) => (
            <li key={href}>
              <Link
                href={href}
                className="block px-4 py-3.5 text-[15px] text-foreground transition-colors hover:bg-white/5"
              >
                {labelFor(href)}
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {collection.faqs.length > 0 ? (
        <section className="space-y-4">
          <h2 className="docs-section-title">FAQ</h2>
          <dl className="space-y-4">
            {collection.faqs.map((faq) => (
              <div key={faq.q}>
                <dt className="text-[15px] font-medium text-foreground">
                  {faq.q}
                </dt>
                <dd className="mt-1.5 leading-relaxed">{faq.a}</dd>
              </div>
            ))}
          </dl>
        </section>
      ) : null}

      <DocsPager href={path} kind="collections" />
    </article>
  )
}
