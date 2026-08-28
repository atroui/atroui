import type { Metadata } from "next"
import { componentPageMetadata } from "@/lib/docs-metadata"
import { RegistryComponentDoc } from "@/components/registry-component-doc"

export const metadata: Metadata = componentPageMetadata(
  "Live Dashboard",
  "/docs/components/studio-live-dashboard",
  "Studio live dashboard driven by package content modules - not a host API tool."
)

export default async function Page() {
  return (
    <RegistryComponentDoc
      registryName="live-dashboard"
      href="/docs/components/studio-live-dashboard"
      title="Live Dashboard"
      description="Studio live dashboard driven by package content modules - not a host API tool."
      fullBleed
      usage="Reads from atroui content (studio projects, etc.). No /api/* required for the default demo."
      code={`import { LiveDashboard } from "@/components/blocks/live-dashboard"\n\n<LiveDashboard />`}
    />
  )
}
