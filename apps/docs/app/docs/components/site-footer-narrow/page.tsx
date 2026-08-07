import type { Metadata } from "next"
import { componentPageMetadata } from "@/lib/docs-metadata"
import { ComponentDoc } from "@/components/component-doc"
import { DemoSiteFooterNarrow } from "@/components/registry-demos"

export const metadata: Metadata = componentPageMetadata(
  "Site Footer Narrow",
  "/docs/components/site-footer-narrow",
  "Quiet personal footer with tagline and link grid."
)

export default function Page() {
  return (
    <ComponentDoc
      href="/docs/components/site-footer-narrow"
      registryName="site-footer-narrow"
      title="Site Footer Narrow"
      description="Quiet personal footer with tagline and link grid."
      preview={<DemoSiteFooterNarrow />}
      code={'import { SiteFooterNarrow } from "@/components/blocks/site-footer-narrow"\n\n<SiteFooterNarrow />'}
      fullBleed={true}
      usage="Pair with SiteHeaderNarrow. For marketing footers, see @atroui/site-footer or @atroui/footer-bold."
    />
  )
}
