import { ComponentDoc } from "@/components/component-doc"
import { DemoTextMorph } from "@/components/registry-demos"

export function MotionTextMorphDoc() {
  return (
    <ComponentDoc
      registryName="text-morph"
      href="/docs/components/motion-text-morph"
      title="Text Morph"
      description="Shared letters travel between label strings. Opt-in for Idle → Loading → Done."
      preview={<DemoTextMorph />}
      code={`import { TextMorph } from "@/components/ui/text-morph"

<TextMorph>{label}</TextMorph>`}
      fullBleed={false}
      usage={
        <>
          Wire into button loading states when earned — not default on every CTA. Scramble /
          typewriter stay rare-path demos, not product chrome.
        </>
      }
    />
  )
}
