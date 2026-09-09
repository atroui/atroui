import { ComponentDoc } from "@/components/component-doc"
import { DemoRadio } from "@/components/registry-demos"

export function UiRadioDoc() {
  return (
    <ComponentDoc
      href="/docs/components/ui-radio"
      registryName="radio"
      title="Radio"
      description="Radio group with Motion fill-scale indicator on Base UI."
      preview={<DemoRadio />}
      code={`import { Radio, RadioGroup } from "@/components/ui/radio"

<RadioGroup defaultValue="draft" className="gap-2">
  <label className="flex items-center gap-2 text-sm">
    <Radio value="draft" />
    Draft
  </label>
  <label className="flex items-center gap-2 text-sm">
    <Radio value="live" />
    Live
  </label>
</RadioGroup>`}
      fullBleed={false}
      usage="One choice in a set. Wrap options in RadioGroup; the fill scales in, no bounce."
    />
  )
}
