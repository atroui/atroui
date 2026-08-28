import type { Metadata } from "next"
import Content from "@/content/docs/index.mdx"
import { DocsMdxPage } from "@/components/docs-mdx"
import { docsPageMetadata } from "@/lib/docs-metadata"

export const metadata: Metadata = docsPageMetadata({
  title: "Introduction",
  description:
    "AtroUI is a dark-first React / Next.js component catalog at atroui.com. Add components with the shadcn CLI and own the source in your repo.",
  path: "/docs",
})

export default function DocsIntroPage() {
  return (
    <DocsMdxPage href="/docs" tocRootId="docs-intro">
      <Content />
    </DocsMdxPage>
  )
}
