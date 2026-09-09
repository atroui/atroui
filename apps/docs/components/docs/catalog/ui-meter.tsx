import { ComponentDoc } from "@/components/component-doc"
import { DemoMeter } from "@/components/registry-demos"

export function UiMeterDoc() {
  return (
    <ComponentDoc
      href="/docs/components/ui-meter"
      registryName="meter"
      title="Meter"
      description="Read-only meter gauge with soft-rect value fill tween."
      preview={<DemoMeter />}
      code={`import {
  Meter,
  MeterIndicator,
  MeterLabel,
  MeterTrack,
  MeterValue,
} from "@/components/ui/meter"

<Meter value={72}>
  <div className="flex items-center justify-between gap-2">
    <MeterLabel>Storage</MeterLabel>
    <MeterValue />
  </div>
  <MeterTrack>
    <MeterIndicator />
  </MeterTrack>
</Meter>`}
      fullBleed={false}
      usage="Meters report a bounded level (capacity, score), not task progress. Value changes tween with fillTween; no spring."
    />
  )
}
