import type { Metadata } from "next"
import {
  ProductPageHeader,
  ProductPanelLink,
  productArticle,
  ProductPanel,
} from "@/components/product-page"
import { docsPageMetadata } from "@/lib/docs-metadata"
import { pseoCollections } from "@/lib/pseo"

export const metadata: Metadata = docsPageMetadata({
  title: "Component collections",
  description:
    "AtroUI grouped by job: Next.js forms with Host APIs, OG images, indie launch workflow, dark marketing sections. Not a dump of every registry item.",
  path: "/docs/collections",
})

export default function CollectionsIndexPage() {
  return (
    <article className={productArticle}>
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
    </article>
  )
}
