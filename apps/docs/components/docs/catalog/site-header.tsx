import { ComponentDoc } from "@/components/component-doc"
import { DemoSiteHeader } from "@/components/registry-demos"


export function SiteHeaderDoc() {
  return (
    <ComponentDoc
      href="/docs/components/site-header"
      registryName="site-header"
      title="Site Header"
      description="Sticky editorial header with logo, primary nav, theme toggle, and hire CTA. Logo text comes from getBrand()."
      preview={<DemoSiteHeader />}
      code={'import { SiteHeader } from "@/components/blocks/site-header"\n\n<SiteHeader />'}
      fullBleed={true}
      usage="Mount once in the root layout. Nav links target studio host paths (/work, /tools, /services, /journal, /about, /contact). Fork or parameterize before reuse on another IA."
    />
  )
}
