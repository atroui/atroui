import type { Metadata } from "next"
import { componentPageMetadata } from "@/lib/docs-metadata"
import { RegistryComponentDoc } from "@/components/registry-component-doc"

export const metadata: Metadata = componentPageMetadata(
  "Footer Bold",
  "/docs/components/footer-bold",
  "Bold marketing footer with links and brand mark."
)

export default async function Page() {
  return (
    <RegistryComponentDoc
      registryName="footer-bold"
      href="/docs/components/footer-bold"
      title="Footer Bold"
      description="Bold marketing footer with links and brand mark."
      fullBleed
      usage="Loud marketing footer with CTA mailto and oversized brand wordmark. For quieter chrome, use @atroui/site-footer."
      code={`import { BoldFooter } from "@/components/blocks/footer-bold"\n\n<BoldFooter />`}
    />
  )
}
