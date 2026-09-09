import { ComponentDoc } from "@/components/component-doc"
import { DemoCollapsible } from "@/components/registry-demos"

export function UiCollapsibleDoc() {
  return (
    <ComponentDoc
      href="/docs/components/ui-collapsible"
      registryName="collapsible"
      title="Collapsible"
      description="Single disclosure with height:auto settle and chevron rotate."
      preview={<DemoCollapsible />}
      code={`import {
  Collapsible,
  CollapsiblePanel,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"

<Collapsible defaultOpen>
  <CollapsibleTrigger>Advanced options</CollapsibleTrigger>
  <CollapsiblePanel>
    Reveal depth only when it is relevant — one focused section at a time.
  </CollapsiblePanel>
</Collapsible>`}
      fullBleed={false}
      usage="Use for a single optional section. Panel height settles with revealTween; Accordion is for multi-item FAQs."
    />
  )
}
