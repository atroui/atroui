import type { Metadata } from "next"
import { componentPageMetadata } from "@/lib/docs-metadata"
import { RegistryComponentDoc } from "@/components/registry-component-doc"

export const metadata: Metadata = componentPageMetadata(
  "Currently",
  "/docs/components/currently",
  "Narrow “now” list with editable stamp and items."
)

export default async function Page() {
  return (
    <RegistryComponentDoc
      registryName="currently"
      href="/docs/components/currently"
      title="Currently"
      description="Narrow “now” list with editable stamp and items."
      fullBleed
      usage="Swap CONTENT.items for focus / build / read lines."
      code={`import { Currently } from "@/components/blocks/currently"\n\n<Currently />`}
    />
  )
}
