import type { Metadata } from "next"
import { componentPageMetadata } from "@/lib/docs-metadata"
import { ComponentDoc } from "@/components/component-doc"
import { DemoHomeCrafts } from "@/components/registry-demos"

export const metadata: Metadata = componentPageMetadata(
  "Crafts",
  "/docs/components/home-crafts"
)

export default function Page() {
  return (
    <ComponentDoc
      registryName="pricing-overview"
      title='Crafts'
      description='Pricing / crafts overview section from the homepage.'
      preview={<DemoHomeCrafts />}
      code={'import { HomeCrafts } from "atroui"\n\n<HomeCrafts />'}
      fullBleed={true}
      usage='Homepage section - place below the hero.'
    />
  )
}
