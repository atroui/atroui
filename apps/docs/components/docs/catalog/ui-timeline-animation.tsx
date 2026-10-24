import { ComponentDoc } from "@/components/component-doc"
import { DemoTimelineAnimation } from "@/components/registry-demos"


export function UiTimelineAnimationDoc() {
  return (
    <ComponentDoc
      registryName="timeline-animation"
      href="/docs/components/ui-timeline-animation"
      title="Timeline Animation"
      description="Sequential in-view reveal for heroes — opacity + y only (no blur). Pass customVariants only when you need a different recipe."
      preview={<DemoTimelineAnimation />}
      code={'import { TimelineAnimation } from "@/components/ui/timeline-animation"\n\n<TimelineAnimation animationNum={0} timelineRef={ref}>…</TimelineAnimation>'}
      fullBleed={false}
    />
  )
}
