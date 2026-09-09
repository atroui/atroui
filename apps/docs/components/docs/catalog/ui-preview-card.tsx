import { ComponentDoc } from "@/components/component-doc"
import { DemoPreviewCard } from "@/components/registry-demos"

export function UiPreviewCardDoc() {
  return (
    <ComponentDoc
      href="/docs/components/ui-preview-card"
      registryName="preview-card"
      title="Preview Card"
      description="Hover/focus link preview — soft popover settle, no fireworks."
      preview={<DemoPreviewCard />}
      code={`import {
  PreviewCard,
  PreviewCardContent,
  PreviewCardDescription,
  PreviewCardHeader,
  PreviewCardTitle,
  PreviewCardTrigger,
} from "@/components/ui/preview-card"

<PreviewCard>
  <PreviewCardTrigger
    href="https://www.atroui.com"
    className="font-medium text-foreground underline decoration-border-subtle underline-offset-4"
  >
    AtroUI
  </PreviewCardTrigger>
  <PreviewCardContent>
    <PreviewCardHeader>
      <PreviewCardTitle>AtroUI</PreviewCardTitle>
      <PreviewCardDescription>
        Own the files after install — soft open, stay on the page.
      </PreviewCardDescription>
    </PreviewCardHeader>
  </PreviewCardContent>
</PreviewCard>`}
      fullBleed={false}
      usage="Use for link previews that belong beside the sentence. Soft popupMotion settle only — never spring or blur."
    />
  )
}
