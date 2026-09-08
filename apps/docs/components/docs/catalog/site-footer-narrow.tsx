import { ComponentDoc } from "@/components/component-doc"
import { DemoSiteFooterNarrow } from "@/components/registry-demos"


export function SiteFooterNarrowDoc() {
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
