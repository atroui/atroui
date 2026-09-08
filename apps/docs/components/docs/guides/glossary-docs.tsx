import Link from "next/link"
import { notFound } from "next/navigation"
import { BreadcrumbJsonLd } from "atroui"
import { DocsArticleHeader } from "@/components/docs/docs-article-header"
import { DocsPager } from "@/components/docs-pager"
import { getPseoTerm, pseoGlossary } from "@/lib/pseo"

export function GlossaryIndexPage() {
  return (
    <article className="space-y-10">
      <DocsArticleHeader
        eyebrow="Reference"
        title="Glossary"
        lede={
          <>
            Short, citeable answers for search and AI overviews. Not a dump of
            every CSS token.
          </>
        }
      />
      <ul className="divide-y divide-border-subtle border-y border-border-subtle">
        {pseoGlossary.map((term) => (
          <li key={term.slug}>
            <Link
              href={`/docs/glossary/${term.slug}`}
              className="block py-4 transition-colors hover:bg-muted/30"
            >
              <span className="docs-hub-title">{term.title}</span>
              <span className="docs-hub-meta">{term.description}</span>
            </Link>
          </li>
        ))}
      </ul>
      <DocsPager href="/docs/glossary" kind="guides" />
    </article>
  )
}

export function GlossaryTermDoc({ slug }: { slug: string }) {
  const term = getPseoTerm(slug)
  if (!term) notFound()

  const path = `/docs/glossary/${term.slug}`

  return (
    <article className="space-y-10">
      <BreadcrumbJsonLd
        items={[
          { name: "Docs", path: "/docs" },
          { name: "Glossary", path: "/docs/glossary" },
          { name: term.title, path },
        ]}
      />

      <DocsArticleHeader
        eyebrow="Glossary"
        title={term.title}
        lede={term.description}
      />

      <section className="space-y-4">
        <h2 className="docs-section-title">Definition</h2>
        <p className="leading-relaxed">{term.definition}</p>
      </section>

      <section className="space-y-4">
        <h2 className="docs-section-title">Why it matters</h2>
        <p className="leading-relaxed">{term.whyItMatters}</p>
      </section>

      <nav className="space-y-2" aria-label="Related">
        <h2 className="docs-section-title">Related</h2>
        <ul className="flex flex-wrap gap-x-4 gap-y-1 text-[14px]">
          {term.relatedPaths.map((item) => (
            <li key={item.href}>
              <Link href={item.href} className="bam-link">
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <DocsPager href={path} kind="glossary" />
    </article>
  )
}
