import type { Metadata } from "next"
import { componentPageMetadata } from "@/lib/docs-metadata"
import { ComponentDoc } from "@/components/component-doc"
import { DemoPricingOverview } from "@/components/registry-demos"

export const metadata: Metadata = componentPageMetadata(
  "Pricing Overview",
  "/docs/components/pricing-overview"
)

export default function Page() {
  return (
    <ComponentDoc
      title='Pricing Overview'
      description='Service pricing overview grid.'
      preview={<DemoPricingOverview />}
      code={'import { PricingOverview } from "atroui"\n\n<PricingOverview />'}
      fullBleed={true}
      installation='import { PricingOverview } from "atroui"'
    />
  )
}
