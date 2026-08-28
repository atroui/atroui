import type { Metadata } from "next"
import Content from "@/content/docs/brand.mdx"
import { DocsMdxPage } from "@/components/docs-mdx"
import { docsPageMetadata } from "@/lib/docs-metadata"

export const metadata: Metadata = docsPageMetadata({
  title: "Brand kit",
  description:
    "AtroUI brand kit - logo mark, Made with badge, colors, and voice guidelines for atroui.com.",
  path: "/docs/brand",
})

export default function BrandKitPage() {
  return (
    <DocsMdxPage href="/docs/brand" tocRootId="brand-doc">
      <Content />
    </DocsMdxPage>
  )
}
