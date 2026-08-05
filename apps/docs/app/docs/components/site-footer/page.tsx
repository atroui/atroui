import type { Metadata } from "next"
import { componentPageMetadata } from "@/lib/docs-metadata"
import { ComponentDoc } from "@/components/component-doc"
import { DemoSiteFooter } from "@/components/registry-demos"

export const metadata: Metadata = componentPageMetadata(
  "Site Footer",
  "/docs/components/site-footer"
)

export default function Page() {
  return (
    <ComponentDoc
      title='Site Footer'
      description='Marketing footer alias of BoldFooter.'
      preview={<DemoSiteFooter />}
      code={'import { SiteFooter } from "atroui"\n\n<SiteFooter />'}
      fullBleed={true}
      installation='import { SiteFooter } from "atroui"'
    />
  )
}
