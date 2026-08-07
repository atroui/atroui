import type { Metadata } from "next"
import { componentPageMetadata } from "@/lib/docs-metadata"
import { ComponentDoc } from "@/components/component-doc"
import { DemoWeatherChip } from "@/components/registry-demos"

export const metadata: Metadata = componentPageMetadata(
  "Weather Chip",
  "/docs/components/weather-chip",
  "Open-Meteo weather chip — no API key required."
)

export default function Page() {
  return (
    <ComponentDoc
      href="/docs/components/weather-chip"
      registryName="weather-chip"
      title="Weather Chip"
      description="Open-Meteo weather chip — no API key required."
      preview={<DemoWeatherChip />}
      code={'import { WeatherChip } from "@/components/blocks/weather-chip"\n\n<WeatherChip lat={40.7128} lon={-74.006} label="NYC" />'}
      fullBleed={false}
      usage="Pass lat/lon. Uses Open-Meteo; fails soft when offline."
    />
  )
}
