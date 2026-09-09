import { ComponentDoc } from "@/components/component-doc"
import { DemoProgress } from "@/components/registry-demos"

export function UiProgressDoc() {
  return (
    <ComponentDoc
      href="/docs/components/ui-progress"
      registryName="progress"
      title="Progress"
      description="Task progress with soft-rect fill width tween on Base UI Progress."
      preview={<DemoProgress />}
      code={`import {
  Progress,
  ProgressIndicator,
  ProgressLabel,
  ProgressTrack,
  ProgressValue,
} from "@/components/ui/progress"

<Progress value={64}>
  <div className="flex items-center justify-between gap-2">
    <ProgressLabel>Uploading</ProgressLabel>
    <ProgressValue />
  </div>
  <ProgressTrack>
    <ProgressIndicator />
  </ProgressTrack>
</Progress>`}
      fullBleed={false}
      usage="Use for task completion toward a known end. Pass value={null} for indeterminate. Fill width tweens with fillTween; reduced motion snaps."
    />
  )
}
