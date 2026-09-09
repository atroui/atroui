import { ComponentDoc } from "@/components/component-doc"
import { DemoSwitch } from "@/components/registry-demos"


export function UiSwitchDoc() {
  return (
    <ComponentDoc
      href="/docs/components/ui-switch"
      registryName="switch"
      title="Switch"
      description="Soft-rect switch — layout thumb + flex justify flip (Motion.dev Base UI)."
      preview={<DemoSwitch />}
      code={`import { Switch } from "@/components/ui/switch"

<Switch aria-label="Publish drafts" defaultChecked />`}
      fullBleed={false}
      usage="Switches flip an immediate setting. Always provide an accessible name; keep the thumb travel short and respect reduced motion."
    />
  )
}
