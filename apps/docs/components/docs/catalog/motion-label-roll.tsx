import { ComponentDoc } from "@/components/component-doc"
import { DemoLabelRoll } from "@/components/registry-demos"

export function MotionLabelRollDoc() {
  return (
    <ComponentDoc
      registryName="label-roll"
      href="/docs/components/motion-label-roll"
      title="Label Roll"
      description="Clipped dual-copy roll on hover and focus — CSS ≤100ms, not Motion variants."
      preview={<DemoLabelRoll />}
      code={`import { LabelRoll } from "@/components/ui/label-roll"

<LabelRoll secondary="Install">Get started</LabelRoll>`}
      fullBleed={false}
      usage={
        <>
          Use on nav links and secondary CTAs. CSS transform keeps the frequent path
          snappy. Wrap in an {" "}
          <code className="rounded-md bg-muted px-1.5 py-0.5 font-mono text-[12px]">
            a
          </code>
          {" "}
          or button for hover; pass{" "}
          <code className="rounded-md bg-muted px-1.5 py-0.5 font-mono text-[12px]">
            interactive
          </code>{" "}
          when the roll itself is the control. Reduced motion stays static.
        </>
      }
    />
  )
}
