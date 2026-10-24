import { ComponentDoc } from "@/components/component-doc"
import { DemoTooltip } from "@/components/registry-demos"


export function UiTooltipDoc() {
  return (
    <ComponentDoc
      href="/docs/components/ui-tooltip"
      registryName="tooltip"
      title="Tooltip"
      description="Fast tooltip with micro appear motion and reduced-motion respect."
      preview={<DemoTooltip />}
      code={`import { Button } from "@/components/ui/button"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

<TooltipProvider>
  <Tooltip>
    <TooltipTrigger render={<Button variant="outline" size="sm" />}>Hover</TooltipTrigger>
    <TooltipContent>Short hint</TooltipContent>
  </Tooltip>
</TooltipProvider>`}
      fullBleed={false}
      usage="Tooltips carry a short label or hint — never critical instructions. Wrap a tree in TooltipProvider once."
    />
  )
}
