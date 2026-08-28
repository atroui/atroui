import type { Metadata } from "next"
import { componentPageMetadata } from "@/lib/docs-metadata"
import { RegistryComponentDoc } from "@/components/registry-component-doc"

export const metadata: Metadata = componentPageMetadata(
  "Site Header",
  "/docs/components/site-header",
  "Sticky product header with logo, Docs/Components nav, theme toggle, search, and Own the UI CTA. Defaults match atroui.com."
)

export default async function Page() {
  return (
    <RegistryComponentDoc
      registryName="site-header"
      href="/docs/components/site-header"
      title="Site Header"
      description="Sticky product header with logo, primary nav, ⌘K search, theme toggle, and Own the UI CTA. Logo text comes from getBrand()."
      fullBleed
      usage="Mount once in the root layout. Defaults point at /docs, /docs/components, /docs/registry, and /blog — edit NAV and CTA at the top of the block after install. For a 640px personal chrome variant, use @atroui/site-header-narrow."
      code={`import { SiteHeader } from "@/components/blocks/site-header"\n\n<SiteHeader />`}
    />
  )
}
