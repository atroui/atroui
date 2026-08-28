import type { Metadata } from "next"
import { componentPageMetadata } from "@/lib/docs-metadata"
import { RegistryComponentDoc } from "@/components/registry-component-doc"

export const metadata: Metadata = componentPageMetadata(
  "Crafts",
  "/docs/components/home-crafts",
  "Capabilities band for what you ship — distinct from the Pricing overview rate card."
)

export default async function Page() {
  return (
    <RegistryComponentDoc
      registryName="home-crafts"
      href="/docs/components/home-crafts"
      title="Crafts"
      description="Capabilities band for what you ship — distinct from the Pricing overview rate card."
      fullBleed
      usage="Homepage section for offerings without prices. Pair with @atroui/pricing-overview when you need a rate card."
      code={`import { HomeCrafts } from "@/components/blocks/home-crafts"\n\n<HomeCrafts />`}
    />
  )
}
