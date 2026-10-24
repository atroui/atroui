"use client"

import {
  Slider,
  SliderControl,
  SliderIndicator,
  SliderLabel,
  SliderThumb,
  SliderTrack,
  SliderValue,
} from "atroui/components/ui/slider"

import { ComponentDoc } from "@/components/component-doc"

function DemoSlider() {
  return (
    <Slider defaultValue={42} className="w-full max-w-xs text-left">
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
    </Slider>
  )
}

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
      usage="SliderControl must be `relative` so the absolute thumb % positions against the control — not a parent like ResizablePreview. Thumb press is CSS scale only; track fill stays 1:1 with the pointer."
    />
  )
}
