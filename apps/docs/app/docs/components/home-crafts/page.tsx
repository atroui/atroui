import type { Metadata } from "next"
import { componentPageMetadata } from "@/lib/docs-metadata"
import { ComponentDoc } from "@/components/component-doc"
import { DemoHomeCrafts } from "@/components/registry-demos"

export const metadata: Metadata = componentPageMetadata(
  "Crafts",
  "/docs/components/home-crafts",
  "Capabilities band for what you ship — distinct from the Pricing overview rate card."
)

export default function Page() {
  return (
    <ComponentDoc
      registryName="home-crafts"
      href="/docs/components/home-crafts"
      title="Crafts"
      description="Capabilities band for what you ship — distinct from the Pricing overview rate card."
      preview={<DemoHomeCrafts />}
      code={'import { HomeCrafts } from "@/components/blocks/home-crafts"\n\n<HomeCrafts />'}
      fullBleed={true}
      usage="Homepage section for offerings without prices. Pair with @atroui/pricing-overview when you need a rate card."
    />
  )
}
