import type { Metadata } from "next"
import Content from "@/content/docs/registry.mdx"
import { DocsMdxPage } from "@/components/docs-mdx"
import { getSiteUrl } from "atroui/lib/site-url"
import { docsPageMetadata } from "@/lib/docs-metadata"

export const metadata: Metadata = docsPageMetadata({
  title: "Registry",
  description:
    "Install AtroUI components into your repo with the shadcn CLI. Own the source - edit code, content, and design freely.",
  path: "/docs/registry",
})

export default function RegistryPage() {
  const siteUrl = getSiteUrl()

  return (
    <DocsMdxPage href="/docs/registry" tocRootId="registry-doc">
      <Content siteUrl={siteUrl} />
    </DocsMdxPage>
  )
}
