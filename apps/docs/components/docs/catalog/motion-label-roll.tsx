import { ComponentDoc } from "@/components/component-doc"
import { DemoLabelRoll } from "@/components/registry-demos"

export function MotionLabelRollDoc() {
  return (
    <ComponentDoc
      registryName="label-roll"
      href="/docs/components/motion-label-roll"
      title="Label Roll"
      description="Letter-staggered label swap on hover and focus — CSS only, easeOutExpo."
      preview={<DemoLabelRoll />}
      code={`import { LabelRoll } from "@/components/ui/label-roll"

<LabelRoll secondary="Install">Get started</LabelRoll>`}
      fullBleed={false}
      usage={
        <>
          Use on nav links and secondary CTAs. Plain strings get a cascading letter
          swap; other nodes fall back to a whole-line roll. Put{" "}
          <code className="rounded-md bg-muted px-1.5 py-0.5 font-mono text-[12px]">
            group
          </code>{" "}
          on the wrapping link so sibling icons trigger the roll. Pass{" "}
          <code className="rounded-md bg-muted px-1.5 py-0.5 font-mono text-[12px]">
            interactive
          </code>{" "}
          when the roll itself is the control. Reduced motion stays static.
        </>
      }
    />
  )
}
