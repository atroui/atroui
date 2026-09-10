import { ComponentDoc } from "@/components/component-doc"
import { DemoPricingTiers } from "@/components/registry-demos"

export function PricingTiersDoc() {
  return (
    <ComponentDoc
      href="/docs/components/pricing-tiers"
      registryName="pricing-tiers"
      title="Pricing Tiers"
      description="Monthly/yearly pricing tiers with one highlighted plan. Install as @atroui/pricing-tiers."
      preview={<DemoPricingTiers />}
      code={`import { PricingTiers } from "@/components/blocks/pricing-tiers"

export function Example() {
  return <PricingTiers />
}`}
      fullBleed={false}
      usage="Use as the pricing section. After install, edit CONTENT and TIERS at the top of the file — monthly/yearly toggle included, one tier highlighted."
    />
  )
}
