import { ComponentDoc } from "@/components/component-doc"
import { DemoSlider } from "@/components/registry-demos"

export function UiSliderDoc() {
  return (
    <ComponentDoc
      href="/docs/components/ui-slider"
      registryName="slider"
      title="Slider"
      description="Range slider with thumb press; track fill stays 1:1 while dragging."
      preview={<DemoSlider />}
      code={`import {
  Slider,
  SliderControl,
  SliderIndicator,
  SliderLabel,
  SliderThumb,
  SliderTrack,
  SliderValue,
} from "@/components/ui/slider"

<Slider defaultValue={40}>
  <div className="flex items-center justify-between gap-2">
    <SliderLabel>Intensity</SliderLabel>
    <SliderValue />
  </div>
  <SliderControl>
    <SliderTrack>
      <SliderIndicator />
    </SliderTrack>
    <SliderThumb />
  </SliderControl>
</Slider>`}
      fullBleed={false}
      usage="Thumb gets pressTween scale only. Never ease the track fill while dragging — Base UI CSS vars stay 1:1 with the pointer."
    />
  )
}
