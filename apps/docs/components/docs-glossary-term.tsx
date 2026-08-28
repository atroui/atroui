import Link from "next/link"
import { notFound } from "next/navigation"
import { BreadcrumbJsonLd } from "atroui"
import {
  ProductPageHeader,
  docSectionHeading,
} from "@/components/product-page"
import { getPseoTerm } from "@/lib/pseo"

export function DocsGlossaryTermView({ slug }: { slug: string }) {
  const term = getPseoTerm(slug)
  if (!term) notFound()

  const path = `/docs/glossary/${term.slug}`

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Docs", path: "/docs" },
          { name: "Glossary", path: "/docs/glossary" },
          { name: term.title, path },
        ]}
      />

      <ProductPageHeader
        stamp="Glossary"
        title={term.title}
        lede={term.description}
      />

      <section className="space-y-3">
        <h2 id="definition" className={docSectionHeading}>
          Definition
        </h2>
        <p className="text-[15px] leading-relaxed text-muted-foreground">
          {term.definition}
        </p>
      </section>

      <section className="space-y-3">
        <h2 id="why-it-matters" className={docSectionHeading}>
          Why it matters
        </h2>
        <p className="text-[15px] leading-relaxed text-muted-foreground">
          {term.whyItMatters}
        </p>
      </section>

      <nav className="space-y-2" aria-label="Related">
        <h2 id="related" className={docSectionHeading}>
          Related
        </h2>
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
    </>
  )
}
