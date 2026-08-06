import type { Metadata } from "next"
import { componentPageMetadata } from "@/lib/docs-metadata"
import { ComponentDoc } from "@/components/component-doc"
import { DemoHomeCrafts } from "@/components/registry-demos"

export const metadata: Metadata = componentPageMetadata(
  "Crafts",
  "/docs/components/home-crafts",
  "Pricing crafts band from the homepage. Prefer @atroui/pricing-overview from the registry for owned source."
)

export default function Page() {
  return (
    <ComponentDoc
      registryName="pricing-overview"
      href="/docs/components/home-crafts"
      title="Crafts"
      description="Pricing crafts band from the homepage. Prefer @atroui/pricing-overview from the registry for owned source."
      preview={<DemoHomeCrafts />}
      code={'import { PricingOverview } from "@/components/blocks/pricing-overview"\n\n<PricingOverview />'}
      fullBleed={true}
      usage="Homepage section - place below the hero. For CLI install, use pricing-overview instead."
    />
  )
}
