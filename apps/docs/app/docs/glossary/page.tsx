import type { Metadata } from "next"
import Link from "next/link"
import { docsPageMetadata } from "@/lib/docs-metadata"
import { pseoGlossary } from "@/lib/pseo"
import {
  ProductPageHeader,
  ProductPanel,
  ProductPanelLink,
  productArticle,
} from "@/components/product-page"

export const metadata: Metadata = docsPageMetadata({
  title: "AtroUI glossary",
  description:
    "Host API, BYOK, and shadcn registry — the terms that make AtroUI different from a primitives kit.",
  path: "/docs/glossary",
})

export default function GlossaryIndexPage() {
  return (
    <article className={productArticle}>
      <ProductPageHeader
        stamp="Definitions"
        title="Glossary"
        lede="Short, citeable answers for search and AI overviews. Not a dump of every CSS token."
      />
      <ProductPanel>
        {pseoGlossary.map((term) => (
          <ProductPanelLink
            key={term.slug}
            href={`/docs/glossary/${term.slug}`}
            title={term.title}
            description={term.description}
          />
        ))}
      </ProductPanel>
    </article>
  )
}
