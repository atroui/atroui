import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { BreadcrumbJsonLd } from "atroui"
import { DocsPageHeader } from "@/components/docs-page-header"
import { docsPageMetadata } from "@/lib/docs-metadata"
import { getPseoTerm, pseoGlossary } from "@/lib/pseo"

type Props = { params: Promise<{ slug: string }> }

export function generateStaticParams() {
  return pseoGlossary.map((t) => ({ slug: t.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const term = getPseoTerm(slug)
  if (!term) return {}
  return docsPageMetadata({
    title: term.title,
    description: term.description,
    path: `/docs/glossary/${term.slug}`,
  })
}

export default async function GlossaryTermPage({ params }: Props) {
  const { slug } = await params
  const term = getPseoTerm(slug)
  if (!term) notFound()

  const path = `/docs/glossary/${term.slug}`

  return (
    <article className="mx-auto max-w-3xl space-y-10">
      <BreadcrumbJsonLd
        items={[
          { name: "Docs", path: "/docs" },
          { name: "Glossary", path: "/docs/glossary" },
          { name: term.title, path },
        ]}
      />

      <DocsPageHeader
        eyebrow="Glossary"
        title={term.title}
        description={term.description}
      />

      <section className="space-y-3">
        <h2 className="ds-headline text-base text-foreground">Definition</h2>
        <p className="text-[15px] leading-relaxed text-muted-foreground">
          {term.definition}
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="ds-headline text-base text-foreground">
          Why it matters
        </h2>
        <p className="text-[15px] leading-relaxed text-muted-foreground">
          {term.whyItMatters}
        </p>
      </section>

      <nav className="space-y-2" aria-label="Related">
        <h2 className="ds-headline text-base text-foreground">Related</h2>
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
    </article>
  )
}
