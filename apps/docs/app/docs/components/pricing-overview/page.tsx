import type { Metadata } from "next"
import { componentPageMetadata } from "@/lib/docs-metadata"
import { ComponentDoc } from "@/components/component-doc"
import { DemoPricingOverview } from "@/components/registry-demos"

export const metadata: Metadata = componentPageMetadata(
  "Pricing Overview",
  "/docs/components/pricing-overview",
  "Service pricing overview grid."
)

export default function Page() {
  return (
    <ComponentDoc
      href="/docs/components/pricing-overview"
      registryName="pricing-overview"
      title="Pricing Overview"
      description="Service pricing overview grid."
      preview={<DemoPricingOverview />}
      code={'import { PricingOverview } from "@/components/blocks/pricing-overview"\n\n<PricingOverview />'}
      fullBleed={true}
    />
  )
}
