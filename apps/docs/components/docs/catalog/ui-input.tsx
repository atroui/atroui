import { ComponentDoc } from "@/components/component-doc"
import { DemoInput } from "@/components/registry-demos"


export function UiInputDoc() {
  return (
    <ComponentDoc
      href="/docs/components/ui-input"
      registryName="input"
      title="Input"
      description="Single-line input aligned to Atro control height and soft-rect."
      preview={<DemoInput />}
      code={`import { Input } from "@/components/ui/input"

<Input type="email" placeholder="you@studio.dev" />`}
      fullBleed={false}
      usage="Use for single-line values. Pair with Field for labels and validation; match control height to Button and Select."
    />
  )
}
