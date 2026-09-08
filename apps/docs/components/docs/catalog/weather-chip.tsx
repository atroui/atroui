import { ComponentDoc } from "@/components/component-doc"
import {
  DemoWeatherChip,
  DemoWeatherChipLondon,
} from "@/components/registry-demos"


export function WeatherChipDoc() {
  return (
    <ComponentDoc
      href="/docs/components/weather-chip"
      registryName="weather-chip"
      title="Weather Chip"
      description="Open-Meteo weather chip — no API key required."
      preview={<DemoWeatherChip />}
      code={`import { WeatherChip } from "@/components/blocks/weather-chip"

<WeatherChip lat={40.7128} lon={-74.006} label="NYC" />`}
      fullBleed={false}
      usage="Pass lat/lon (and an optional short label). Uses Open-Meteo; soft-fails to an em dash when offline."
      examples={[
        {
          title: "Another city",
          tip: "label is aria + tooltip chrome only — the fetch is pure lat/lon.",
          preview: <DemoWeatherChipLondon />,
          code: `import { WeatherChip } from "@/components/blocks/weather-chip"

<WeatherChip lat={51.5074} lon={-0.1278} label="LON" />`,
        },
      ]}
      props={[
        {
          name: "lat",
          type: "number",
          default: "-",
          description: "Latitude for the Open-Meteo request.",
        },
        {
          name: "lon",
          type: "number",
          default: "-",
          description: "Longitude for the Open-Meteo request.",
        },
        {
          name: "label",
          type: "string",
          default: '"Local"',
          description: "Place name in aria-label and title tooltip.",
        },
        {
          name: "className",
          type: "string",
          default: "-",
          description: "Optional class on the chip root.",
        },
      ]}
    />
  )
}
