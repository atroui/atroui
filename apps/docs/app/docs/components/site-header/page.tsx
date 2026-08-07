import type { Metadata } from "next"
import { componentPageMetadata } from "@/lib/docs-metadata"
import { ComponentDoc } from "@/components/component-doc"
import { DemoSiteHeader } from "@/components/registry-demos"

export const metadata: Metadata = componentPageMetadata(
  "Site Header",
  "/docs/components/site-header",
  "Sticky editorial header with logo, primary nav, theme toggle, and hire CTA. Logo text comes from getBrand()."
)

export default function Page() {
  return (
    <ComponentDoc
      href="/docs/components/site-header"
      registryName="site-header"
      title="Site Header"
      description="Sticky editorial header with logo, primary nav, theme toggle, and hire CTA. Logo text comes from getBrand()."
      preview={<DemoSiteHeader />}
      code={'import { SiteHeader } from "@/components/blocks/site-header"\n\n<SiteHeader />'}
      fullBleed={true}
      usage="Mount once in the root layout. Nav links target studio host paths (/work, /tools, /services, /journal, /about, /contact). Fork or parameterize before reuse on another IA. For a 640px personal chrome variant, use @atroui/site-header-narrow."
    />
  )
}
