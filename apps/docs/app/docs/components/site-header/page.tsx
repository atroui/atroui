import type { Metadata } from "next"
import { componentPageMetadata } from "@/lib/docs-metadata"
import { ComponentDoc } from "@/components/component-doc"
import { DemoSiteHeader } from "@/components/registry-demos"

export const metadata: Metadata = componentPageMetadata(
  "Site Header",
  "/docs/components/site-header"
)

export default function Page() {
  return (
    <ComponentDoc
      title="Site Header"
      description="Sticky editorial header with logo, primary nav, theme toggle, and hire CTA. Logo text comes from getBrand()."
      preview={<DemoSiteHeader />}
      code={'import { SiteHeader } from "atroui"\n\n<SiteHeader />'}
      fullBleed={true}
      installation='import { SiteHeader } from "atroui"'
      usage="Mount once in the root layout. Nav links target studio host paths (/work, /tools, /services, /journal, /about, /contact). Fork or parameterize before reuse on another IA."
    />
  )
}
