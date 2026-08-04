import type { Metadata } from "next"
import { ComponentDoc } from "@/components/component-doc"
import { DemoTimelineAnimation } from "@/components/registry-demos"

export const metadata: Metadata = {
  title: 'Timeline Animation',
}

export default function Page() {
  return (
    <ComponentDoc
      title='Timeline Animation'
      description='Sequenced scroll-triggered timeline items.'
      preview={<DemoTimelineAnimation />}
      code={'import { TimelineAnimation } from "@meridian/ui"\n\n<TimelineAnimation animationNum={0} timelineRef={ref}>…</TimelineAnimation>'}
      fullBleed={false}
      installation='import { TimelineAnimation } from "@meridian/ui"'
    />
  )
}
