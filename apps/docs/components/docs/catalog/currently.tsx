import { ComponentDoc } from "@/components/component-doc"
import { DemoCurrently } from "@/components/registry-demos"


export function CurrentlyDoc() {
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
