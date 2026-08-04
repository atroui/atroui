import type { Metadata } from "next"
import { ComponentDoc } from "@/components/component-doc"
import { DemoSiteHeader } from "@/components/registry-demos"

export const metadata: Metadata = {
  title: 'Site Header',
}

export default function Page() {
  return (
    <ComponentDoc
      title='Site Header'
      description='Sticky site header with nav and theme toggle.'
      preview={<DemoSiteHeader />}
      code={'import { SiteHeader } from "@meridian/ui"\n\n<SiteHeader />'}
      fullBleed={false}
      installation='import { SiteHeader } from "@meridian/ui"'
      usage='Mount once in the root layout.'
    />
  )
}
