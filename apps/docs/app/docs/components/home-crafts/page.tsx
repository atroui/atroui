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
      href="/docs/components/home-crafts"
      title="Crafts"
      description="Pricing crafts band from the homepage. Prefer @atroui/pricing-overview from the registry for owned source."
      preview={<DemoHomeCrafts />}
      code={'import { HomeCrafts } from "@/components/home/crafts"\n\n<HomeCrafts />'}
      fullBleed={true}
      usage="Homepage section - place below the hero. For CLI install, use pricing-overview instead."
    />
  )
}
