import type { Metadata } from "next"
import { componentPageMetadata } from "@/lib/docs-metadata"
import { RegistryComponentDoc } from "@/components/registry-component-doc"

export const metadata: Metadata = componentPageMetadata(
  "Weather Chip",
  "/docs/components/weather-chip",
  "Open-Meteo weather chip — no API key required."
)

export default async function Page() {
  return (
    <RegistryComponentDoc
      registryName="weather-chip"
      href="/docs/components/weather-chip"
      title="Weather Chip"
      description="Open-Meteo weather chip — no API key required."
      usage="Pass lat/lon. Uses Open-Meteo; fails soft when offline."
      code={`import { WeatherChip } from "@/components/blocks/weather-chip"\n\n<WeatherChip lat={40.7128} lon={-74.006} label="NYC" />`}
    />
  )
}
