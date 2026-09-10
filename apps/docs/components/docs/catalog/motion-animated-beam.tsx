import { ComponentDoc } from "@/components/component-doc"
import { DemoAnimatedBeam } from "@/components/registry-demos"

export function MotionAnimatedBeamDoc() {
  return (
    <ComponentDoc
      registryName="animated-beam"
      href="/docs/components/motion-animated-beam"
      title="Animated Beam"
      description="Light travelling an SVG path between nodes — one-to-one or one hub fanning to many."
      preview={<DemoAnimatedBeam />}
      code={`import { useRef } from "react"
import { AnimatedBeam, AnimatedBeamFan } from "@/components/ui/animated-beam"

const containerRef = useRef<HTMLDivElement>(null)
const fromRef = useRef<HTMLDivElement>(null)
const toRef = useRef<HTMLDivElement>(null)

<div ref={containerRef} className="relative flex justify-between">
  <div ref={fromRef}>Source</div>
  <div ref={toRef}>Target</div>
  <AnimatedBeam
    containerRef={containerRef}
    fromRef={fromRef}
    toRef={toRef}
  />
</div>

// One hub → many targets, staggered loops:
<AnimatedBeamFan
  containerRef={containerRef}
  fromRef={hubRef}
  toRefs={[toolA, toolB, toolC]}
/>`}
      fullBleed={false}
      usage="Wire containerRef / fromRef / toRef to laid-out nodes; the path recomputes on resize. Use AnimatedBeamFan for one hub → N targets. Reduced motion renders static brand tracks."
      props={[
        {
          name: "containerRef",
          type: "RefObject<HTMLElement | null>",
          default: "—",
          description: "Measuring container for the SVG overlay.",
        },
        {
          name: "fromRef",
          type: "RefObject<HTMLElement | null>",
          default: "—",
          description: "Beam start node.",
        },
        {
          name: "toRef",
          type: "RefObject<HTMLElement | null>",
          default: "—",
          description: "Beam end node.",
        },
        {
          name: "curvature",
          type: "number",
          default: "0",
          description: "Beam curvature in px.",
        },
        {
          name: "duration",
          type: "number",
          default: "5",
          description: "Loop duration in seconds.",
        },
        {
          name: "delay",
          type: "number",
          default: "0",
          description: "Start delay in seconds.",
        },
        {
          name: "reverse",
          type: "boolean",
          default: "false",
          description: "Reverse travel direction.",
        },
        {
          name: "AnimatedBeamFan.toRefs",
          type: "RefObject<HTMLElement | null>[]",
          default: "—",
          description: "Target nodes — one staggered beam each.",
        },
        {
          name: "AnimatedBeamFan.stagger",
          type: "number",
          default: "0.8",
          description: "Delay between beams in seconds.",
        },
      ]}
    />
  )
}
