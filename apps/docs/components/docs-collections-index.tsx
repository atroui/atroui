import {
  ProductPageHeader,
  ProductPanel,
  ProductPanelLink,
} from "@/components/product-page"
import { pseoCollections } from "@/lib/pseo"

export function DocsCollectionsIndexView() {
  return (
    <>
      <ProductPageHeader
        stamp="Programmatic catalog"
        title="Collections"
        lede="Four jobs people actually search for. Each hub links to owned registry blocks — not a thousand thin keyword pages."
      />
      <ProductPanel>
        {pseoCollections.map((collection) => (
          <ProductPanelLink
            key={collection.slug}
            href={`/docs/collections/${collection.slug}`}
            title={collection.title}
            description={collection.description}
          />
        ))}
      </ProductPanel>
    </>
  )
}
