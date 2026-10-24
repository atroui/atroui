import { ComponentDoc } from "@/components/component-doc"
import { DemoPopover } from "@/components/registry-demos"


export function UiPopoverDoc() {
  return (
    <ComponentDoc
      href="/docs/components/ui-popover"
      registryName="popover"
      title="Popover"
      description="Anchored popover surface for progressive disclosure."
      preview={<DemoPopover />}
      code={`import { Button } from "@/components/ui/button"
import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "@/components/ui/popover"

<Popover>
  <PopoverTrigger render={<Button variant="outline" />}>Details</PopoverTrigger>
  <PopoverContent>
    <PopoverHeader>
      <PopoverTitle>Deploy preview</PopoverTitle>
      <PopoverDescription>Stay on the page; reveal options in place.</PopoverDescription>
    </PopoverHeader>
  </PopoverContent>
</Popover>`}
      fullBleed={false}
      usage="Use for options that belong beside the current task. Prefer popover over a full dialog when the page context should stay visible."
    />
  )
}
