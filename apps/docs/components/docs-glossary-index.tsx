import {
  ProductPageHeader,
  ProductPanel,
  ProductPanelLink,
} from "@/components/product-page"
import { pseoGlossary } from "@/lib/pseo"

export function DocsGlossaryIndexView() {
  return (
    <>
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
    </>
  )
}
