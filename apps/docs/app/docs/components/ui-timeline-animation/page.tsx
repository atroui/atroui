import type { Metadata } from "next"
import { componentPageMetadata } from "@/lib/docs-metadata"
import { ComponentDoc } from "@/components/component-doc"
import { DemoTimelineAnimation } from "@/components/registry-demos"

export const metadata: Metadata = componentPageMetadata(
  "Timeline Animation",
  "/docs/components/ui-timeline-animation"
)

export default function Page() {
  return (
    <ComponentDoc
      href="/docs/components/ui-timeline-animation"
      title="Timeline Animation"
      description="Sequenced scroll-triggered timeline items."
      preview={<DemoTimelineAnimation />}
      code={'import { TimelineAnimation } from "@/components/ui/timeline-animation"\n\n<TimelineAnimation animationNum={0} timelineRef={ref}>…</TimelineAnimation>'}
      fullBleed={false}
    />
  )
}
