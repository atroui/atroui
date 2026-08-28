import type { Metadata } from "next"
import Content from "@/content/docs/compare.mdx"
import { DocsMdxPage } from "@/components/docs-mdx"
import { docsPageMetadata } from "@/lib/docs-metadata"

export const metadata: Metadata = docsPageMetadata({
  title: "AtroUI vs copy-paste kits",
  description:
    "How AtroUI differs from primitives-only kits - production sections via the shadcn registry, brand chrome, and dark-first tokens.",
  path: "/docs/compare",
})

export default function ComparePage() {
  return (
    <DocsMdxPage href="/docs/compare" tocRootId="compare-doc">
      <Content />
    </DocsMdxPage>
  )
}
