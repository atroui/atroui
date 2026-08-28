import type { Metadata } from "next"
import { componentPageMetadata } from "@/lib/docs-metadata"
import { RegistryComponentDoc } from "@/components/registry-component-doc"

export const metadata: Metadata = componentPageMetadata(
  "Pricing Overview",
  "/docs/components/pricing-overview",
  "Service pricing overview grid."
)

export default async function Page() {
  return (
    <RegistryComponentDoc
      registryName="pricing-overview"
      href="/docs/components/pricing-overview"
      title="Pricing Overview"
      description="Service pricing overview grid."
      fullBleed
      code={`import { PricingOverview } from "@/components/blocks/pricing-overview"\n\n<PricingOverview />`}
    />
  )
}
