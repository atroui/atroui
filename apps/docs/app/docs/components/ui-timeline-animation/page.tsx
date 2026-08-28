import type { Metadata } from "next"
import { componentPageMetadata } from "@/lib/docs-metadata"
import { RegistryComponentDoc } from "@/components/registry-component-doc"

export const metadata: Metadata = componentPageMetadata(
  "Timeline Animation",
  "/docs/components/ui-timeline-animation",
  "Sequenced scroll-triggered timeline items."
)

export default async function Page() {
  return (
    <RegistryComponentDoc
      registryName="timeline-animation"
      href="/docs/components/ui-timeline-animation"
      title="Timeline Animation"
      description="Sequenced scroll-triggered timeline items."
      code={`import { TimelineAnimation } from "@/components/ui/timeline-animation"\n\n<TimelineAnimation animationNum={0} timelineRef={ref}>…</TimelineAnimation>`}
    />
  )
}
