import type { Metadata } from "next"
import { ComponentDoc } from "@/components/component-doc"
import { TooltipDemo } from "@/components/demos"

export const metadata: Metadata = {
  title: "Tooltip",
}

export default function Page() {
  return (
    <ComponentDoc
      title="Tooltip"
      description="Short contextual hint shown on hover or focus."
      preview={<TooltipDemo />}
      code={"import {\n  Tooltip, TooltipTrigger, TooltipContent, TooltipProvider, Button\n} from \"@meridian/ui\"\n\nexport function Example() {\n  return (\n    <TooltipProvider>\n      <Tooltip>\n        <TooltipTrigger asChild>\n          <Button variant=\"outline\">Hover</Button>\n        </TooltipTrigger>\n        <TooltipContent>Hint</TooltipContent>\n      </Tooltip>\n    </TooltipProvider>\n  )\n}"}
      usage="Keep tooltips brief. Never put essential information only in a tooltip."
      props={[
    { name: "delayDuration", type: "number", default: "700", description: "Open delay in ms (TooltipProvider)." },
    { name: "side", type: "'top' | 'right' | 'bottom' | 'left'", default: "'top'", description: "Preferred side of the trigger." },
      ]}
    />
  )
}
