import { ComponentDoc } from "@/components/component-doc"
import { DemoSiteFooter } from "@/components/registry-demos"


export function SiteFooterDoc() {
  return (
    <ComponentDoc
      href="/docs/components/site-footer"
      registryName="site-footer"
      title="Site Footer"
      description="Lighter marketing footer with brand blurb, link columns, and legal row."
      preview={<DemoSiteFooter />}
      code={'import { SiteFooter } from "@/components/blocks/site-footer"\n\n<SiteFooter />'}
      fullBleed={true}
      usage="Quiet chrome for docs and product pages. For a loud CTA + giant wordmark footer, use @atroui/footer-bold instead. For narrow personal chrome, use @atroui/site-footer-narrow."
    />
  )
}
