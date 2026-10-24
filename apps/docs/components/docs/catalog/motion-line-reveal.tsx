import { ComponentDoc } from "@/components/component-doc"
import { DemoLineReveal } from "@/components/registry-demos"

export function MotionLineRevealDoc() {
  return (
    <ComponentDoc
      registryName="line-reveal"
      href="/docs/components/motion-line-reveal"
      title="Line Reveal"
      description="Word/line stagger enter — opacity + y + clip. The marketing text enter."
      preview={<DemoLineReveal />}
      code={`import { LineReveal } from "@/components/ui/line-reveal"

<LineReveal>
  Show the fundamental first.
</LineReveal>`}
      fullBleed={false}
      usage={
        <>
          Default for landing and essay section titles. No blur-in, scramble, or per-character
          fireworks. Pass{" "}
          <code className="rounded-md bg-muted px-1.5 py-0.5 font-mono text-[12px]">
            preview
          </code>{" "}
          in docs canvases.
        </>
      }
    />
  )
}
