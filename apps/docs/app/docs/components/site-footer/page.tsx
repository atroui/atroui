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
      registryName="site-footer"
      title='Site Footer'
      description='Lighter marketing footer with editable CONTENT and link columns. (Docs demo still shows BoldFooter.)'
      preview={<DemoSiteFooter />}
      code={'import { SiteFooter } from "@/components/blocks/site-footer"\n\n<SiteFooter />'}
      fullBleed={true}
    />
  )
}
