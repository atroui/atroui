import type { Metadata } from "next"
import Content from "@/content/docs/theming.mdx"
import { DocsMdxPage } from "@/components/docs-mdx"
import { docsPageMetadata } from "@/lib/docs-metadata"

export const metadata: Metadata = docsPageMetadata({
  title: "Theming",
  description:
    "AtroUI dark-first design tokens - black canvas, brand #0b7bff, glass surfaces, Caveat sketch display + Outfit UI. Customize host CSS and @atroui/brand.",
  path: "/docs/theming",
})

export default function ThemingPage() {
  return (
    <DocsMdxPage href="/docs/theming" tocRootId="theming-doc">
      <Content />
    </DocsMdxPage>
  )
}
