import { ComponentDoc } from "@/components/component-doc"
import { DemoPricingOverview } from "@/components/registry-demos"


export function PricingOverviewDoc() {
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
