import type { Metadata } from "next"
import { ComponentDoc } from "@/components/component-doc"
import { DemoSiteHeader } from "@/components/registry-demos"

export const metadata: Metadata = {
  title: "Site Header",
}

export default function Page() {
  return (
    <ComponentDoc
      title="Site Header"
      description="Sticky editorial header with logo, primary nav, theme toggle, and hire CTA."
      preview={<DemoSiteHeader />}
      code={'import { SiteHeader } from "@meridian/ui"\n\n<SiteHeader />'}
      fullBleed={true}
      installation='import { SiteHeader } from "@meridian/ui"'
      usage="Mount once in the root layout. Nav, logo, and Hire CTA are hardwired to Makershot routes (/work, /tools, /services, /journal, /about, /contact) — fork or parameterize before reuse on another host."
    />
  )
}
