import { ComponentDoc } from "@/components/component-doc"
import { DemoDeadlineCountdown } from "@/components/registry-demos"


export function DeadlineCountdownDoc() {
  return (
    <ComponentDoc
      href="/docs/components/deadline-countdown"
      registryName="deadline-countdown"
      title="Deadline Countdown"
      description="Days-to-deadline band with segmented progress."
      preview={<DemoDeadlineCountdown />}
      code={'import { DeadlineCountdown } from "@/components/blocks/deadline-countdown"\n\n<DeadlineCountdown />'}
      fullBleed={true}
      usage="Edit CONTENT dates after install, or pass title / targetDate / startDate as props for a one-off band. Days count via AnimateNumber (CountUp in-view gate) — reduced-motion jumps to the final day count."
    />
  )
}
