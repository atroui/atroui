import { ComponentDoc } from "@/components/component-doc"
import { DemoBoldFooter } from "@/components/registry-demos"


export function FooterBoldDoc() {
  return (
    <ComponentDoc
      href="/docs/components/footer-bold"
      registryName="footer-bold"
      title="Footer Bold"
      description="Bold marketing footer with links and brand mark."
      preview={<DemoBoldFooter />}
      code={'import { BoldFooter } from "@/components/blocks/footer-bold"\n\n<BoldFooter />'}
      fullBleed={true}
      usage="Loud marketing footer with CTA mailto and oversized brand wordmark. For quieter chrome, use @atroui/site-footer."
    />
  )
}
