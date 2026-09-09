import Link from "next/link"
import { ComponentDoc } from "@/components/component-doc"
import { DemoWordRevealScroll } from "@/components/registry-demos"

export function MotionWordRevealScrollDoc() {
  return (
    <ComponentDoc
      registryName="word-reveal-scroll"
      href="/docs/components/motion-word-reveal-scroll"
      title="Word Reveal Scroll"
      description="Progress-driven word opacity — scroll scrub, no blur. One pull line."
      preview={<DemoWordRevealScroll />}
      code={`import { WordRevealScroll } from "@/components/ui/word-reveal-scroll"

<WordRevealScroll>
  Your next ship starts right now
</WordRevealScroll>`}
      fullBleed={false}
      usage={
        <>
          Careful delight — one earned pull line (landing close or essay quote), not
          every paragraph. Opacity only. Pass{" "}
          <code className="rounded-md bg-muted px-1.5 py-0.5 font-mono text-[12px]">
            preview
          </code>{" "}
          in docs canvases. For sticky stages, pass{" "}
          <code className="rounded-md bg-muted px-1.5 py-0.5 font-mono text-[12px]">
            targetRef
          </code>{" "}
          to the tall section. Prefer{" "}
          <Link href="/docs/components/motion-line-reveal" className="bam-link">
            Line Reveal
          </Link>{" "}
          for time-based enter.
        </>
      }
      props={[
        {
          name: "restingOpacity",
          type: "number",
          default: "0.15",
          description: "Opacity before a word’s scroll slice is reached.",
        },
        {
          name: "wordWindow",
          type: "number",
          default: "0.2",
          description: "Progress fraction each word fades across.",
        },
        {
          name: "offset",
          type: "UseScrollOptions['offset']",
          default: '["start 0.85", "start 0.25"]',
          description: "useScroll offset for in-flow pull lines.",
        },
        {
          name: "targetRef",
          type: "RefObject<HTMLElement | null>",
          default: "—",
          description: "External scroll target (sticky / tall section).",
        },
        {
          name: "as",
          type: '"p" | "h1" | "h2" | "h3" | "h4" | "span" | "div" | "blockquote"',
          default: '"p"',
          description: "Rendered element.",
        },
        {
          name: "preview",
          type: "boolean",
          default: "false",
          description: "Scrub 0→1 on mount (docs canvases).",
        },
      ]}
    />
  )
}
