import type { Metadata } from "next"
import Content from "@/content/docs/identity.mdx"
import { DocsMdxPage } from "@/components/docs-mdx"
import { docsPageMetadata } from "@/lib/docs-metadata"

export const metadata: Metadata = docsPageMetadata({
  title: "Identity kit - Brand & SEO",
  description:
    "AtroUI Brand & SEO Identity Kit - unified getBrand() configuration, Schema.org structured data helpers, Next.js sitemaps, favicons, and search snippet optimization.",
  path: "/docs/identity",
})

export default function IdentityPage() {
  return (
    <DocsMdxPage href="/docs/identity" tocRootId="identity-doc">
      <Content />
    </DocsMdxPage>
  )
}
