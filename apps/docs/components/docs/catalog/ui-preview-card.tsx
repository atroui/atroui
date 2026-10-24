import { ComponentDoc } from "@/components/component-doc"
import { DemoPreviewCard } from "@/components/registry-demos"

export function UiPreviewCardDoc() {
  return (
    <ComponentDoc
      href="/docs/components/ui-preview-card"
      registryName="preview-card"
      title="Preview Card"
      description="Hover/focus link preview — soft settle; opt-in tilt / magnetic / spotlight for media."
      preview={<DemoPreviewCard />}
      code={`import {
  PreviewCard,
  PreviewCardContent,
  PreviewCardDescription,
  PreviewCardHeader,
  PreviewCardTitle,
  PreviewCardTrigger,
} from "@/components/ui/preview-card"
import { IMAGEORY } from "@/lib/imageory"

<PreviewCard>
  <PreviewCardTrigger href="https://www.atroui.com">AtroUI</PreviewCardTrigger>
  <PreviewCardContent tilt spotlight className="w-80 overflow-hidden p-0">
    <img src={IMAGEORY.cosmos} alt="" className="aspect-video w-full object-cover" />
    <PreviewCardHeader className="p-3.5">
      <PreviewCardTitle>AtroUI</PreviewCardTitle>
      <PreviewCardDescription>Media preview with mild tilt.</PreviewCardDescription>
    </PreviewCardHeader>
  </PreviewCardContent>
</PreviewCard>`}
      fullBleed={false}
      usage="Default is soft popupMotion only. Pass tilt, magnetic, and/or spotlight on PreviewCardContent for media surfaces — never on Button or Menu chrome."
      props={[
        {
          name: "tilt",
          type: "boolean | { rotationFactor?, perspective? }",
          default: "false",
          description: "Mild 3D tilt (≤6–8°). Media only.",
        },
        {
          name: "magnetic",
          type: "boolean | { intensity?, range? }",
          default: "false",
          description: "Pointer pull (≤0.35 / ≤80px). Media only.",
        },
        {
          name: "spotlight",
          type: "boolean | { size?, opacity?, color? }",
          default: "false",
          description: "Low-opacity cursor wash for dark Mira cards.",
        },
      ]}
    />
  )
}
