import type { Metadata } from "next"
import { ComponentDoc } from "@/components/component-doc"
import { DemoSiteFooter } from "@/components/registry-demos"

export const metadata: Metadata = {
  title: 'Site Footer',
}

export default function Page() {
  return (
    <ComponentDoc
      title='Site Footer'
      description='Marketing footer alias of BoldFooter.'
      preview={<DemoSiteFooter />}
      code={'import { SiteFooter } from "@meridian/ui"\n\n<SiteFooter />'}
      fullBleed={true}
      installation='import { SiteFooter } from "@meridian/ui"'
    />
  )
}
