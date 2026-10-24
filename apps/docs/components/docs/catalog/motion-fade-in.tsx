import Link from "next/link"
import { ComponentDoc } from "@/components/component-doc"
import { DemoFadeIn, DemoFadeInDelayed, DemoFadeInSection } from "@/components/registry-demos"

export function MotionFadeInDoc() {
  return (
    <ComponentDoc
      registryName="fade-in"
      href="/docs/components/motion-fade-in"
      title="Fade In"
      description="The scroll reveal — opacity + rise on the section beat. Optional blur settle."
      preview={<DemoFadeIn />}
      code={`import { FadeIn } from "@/components/ui/fade-in"

<FadeIn>Content</FadeIn>

{/* Docs preview (skips IntersectionObserver) */}
<FadeIn preview>Content</FadeIn>`}
      fullBleed={false}
      usage={
        <>
          Use this for any scroll enter. Pass{" "}
          <code className="rounded-md bg-muted px-1.5 py-0.5 font-mono text-[12px] text-foreground">
            preview
          </code>{" "}
          in docs canvases. For landing sections, use earlier trigger defaults (
          <code className="rounded-md bg-muted px-1.5 py-0.5 font-mono text-[12px]">
            margin=&quot;-40px&quot;
          </code>
          ,{" "}
          <code className="rounded-md bg-muted px-1.5 py-0.5 font-mono text-[12px]">
            amount=0.2
          </code>
          ) or spread{" "}
          <code className="rounded-md bg-muted px-1.5 py-0.5 font-mono text-[12px]">
            fadeInSection
          </code>
          . Prefer{" "}
          <Link href="/docs/components/motion-stagger" className="bam-link">
            Stagger
          </Link>{" "}
          when siblings enter in sequence,{" "}
          <Link href="/docs/components/motion-line-reveal" className="bam-link">
            Line Reveal
          </Link>{" "}
          for headlines.
        </>
      }
      examples={[
        {
          title: "Delay and travel",
          tip: "delay is seconds (Motion), not ms. Raise y when the block should feel like it climbed farther.",
          preview: <DemoFadeInDelayed />,
          code: `import { FadeIn } from "@/components/ui/fade-in"

<FadeIn delay={0.35} y={24}>
  Content
</FadeIn>`,
        },
        {
          title: "Section (landing) trigger",
          tip: "Earlier viewport trigger — same motion language, not a second component.",
          preview: <DemoFadeInSection />,
          code: `import { FadeIn, fadeInSection } from "@/components/ui/fade-in"

<FadeIn {...fadeInSection}>
  Section
</FadeIn>`,
        },
      ]}
      props={[
        {
          name: "y",
          type: "number",
          default: "14",
          description: "Starting translateY in px.",
        },
        {
          name: "delay",
          type: "number",
          default: "0",
          description: "Delay in seconds.",
        },
        {
          name: "duration",
          type: "number",
          default: "0.45",
          description: "Tween duration (easeOutExpo section beat).",
        },
        {
          name: "blur",
          type: "number | false",
          default: "false",
          description:
            "Opt-in enter blur in px (e.g. SCROLL_REVEAL_BLUR). Off by default.",
        },
        {
          name: "once",
          type: "boolean",
          default: "true",
          description: "Play only the first time it enters view.",
        },
        {
          name: "amount",
          type: 'number | "some" | "all"',
          default: "0.15",
          description: "How much must be visible to trigger.",
        },
        {
          name: "margin",
          type: "string",
          default: '"0px"',
          description: 'Viewport root margin. "-40px" triggers earlier (landing).',
        },
        {
          name: "preview",
          type: "boolean",
          default: "false",
          description: "Animate on mount (docs canvases).",
        },
      ]}
    />
  )
}
