import type { Metadata } from "next"
import Link from "next/link"
import { componentPageMetadata } from "@/lib/docs-metadata"
import { ComponentDoc } from "@/components/component-doc"
import { DemoFadeIn, DemoFadeInDelayed } from "@/components/registry-demos"

export const metadata: Metadata = componentPageMetadata(
  "Fade In",
  "/docs/components/motion-fade-in",
  "Scroll-triggered fade + rise. Preview animates on mount."
)

export default function Page() {
  return (
    <ComponentDoc
      registryName="fade-in"
      href="/docs/components/motion-fade-in"
      title="Fade In"
      description="Scroll-triggered fade + rise. Preview animates on mount — use Replay to watch again."
      preview={<DemoFadeIn />}
      code={`import { FadeIn } from "@/components/motion/fade-in"

<FadeIn>Content</FadeIn>

{/* Docs preview (skips IntersectionObserver) */}
<FadeIn preview>Content</FadeIn>`}
      fullBleed={false}
      usage={
        <>
          Wrap page sections that should rise into place on scroll. Pass{" "}
          <code className="rounded-md bg-muted px-1.5 py-0.5 font-mono text-[12px] text-foreground">
            preview
          </code>{" "}
          in docs canvases so the stage is never stuck at opacity 0. Prefer{" "}
          <Link href="/docs/components/reveal" className="bam-link">
            Reveal
          </Link>{" "}
          when you want CSS-only IntersectionObserver with no motion dependency.
        </>
      }
      examples={[
        {
          title: "Delay and travel",
          tip: "delay is seconds (Motion), not ms. Raise y when the block should feel like it climbed farther.",
          preview: <DemoFadeInDelayed />,
          code: `import { FadeIn } from "@/components/motion/fade-in"

<FadeIn delay={0.35} y={24}>
  Content
</FadeIn>`,
        },
      ]}
      props={[
        {
          name: "y",
          type: "number",
          default: "14",
          description: "Initial translateY in px.",
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
          default: "0.28",
          description: "Tween duration in seconds.",
        },
        {
          name: "preview",
          type: "boolean",
          default: "false",
          description:
            "Animate on mount (docs stages) instead of waiting for scroll.",
        },
      ]}
    />
  )
}
