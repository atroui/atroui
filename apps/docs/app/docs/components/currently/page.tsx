import type { Metadata } from "next"
import { componentPageMetadata } from "@/lib/docs-metadata"
import { ComponentDoc } from "@/components/component-doc"
import { DemoCurrently } from "@/components/registry-demos"

export const metadata: Metadata = componentPageMetadata(
  "Currently",
  "/docs/components/currently",
  "Narrow “now” list with editable stamp and items."
)

export default function Page() {
  return (
    <ComponentDoc
      href="/docs/components/currently"
      registryName="currently"
      title="Currently"
      description="Narrow “now” list with editable stamp and items."
      preview={<DemoCurrently />}
      code={'import { Currently } from "@/components/blocks/currently"\n\n<Currently />'}
      fullBleed={true}
      usage="Swap CONTENT.items for focus / build / read lines."
    />
  )
}
