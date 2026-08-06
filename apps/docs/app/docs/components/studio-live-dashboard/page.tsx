import type { Metadata } from "next"
import { componentPageMetadata } from "@/lib/docs-metadata"
import { ComponentDoc } from "@/components/component-doc"
import { DemoLiveDashboard } from "@/components/registry-demos"

export const metadata: Metadata = componentPageMetadata(
  "Live Dashboard",
  "/docs/components/studio-live-dashboard"
)

export default function Page() {
  return (
    <ComponentDoc
      href="/docs/components/studio-live-dashboard"
      title="Live Dashboard"
      description="Studio live dashboard driven by package content modules - not a host API tool."
      preview={<DemoLiveDashboard />}
      code={'import { LiveDashboard } from "atroui"\n\n<LiveDashboard />'}
      fullBleed={true}
      usage="Reads from atroui content (studio projects, etc.). No /api/* required for the default demo."
    />
  )
}
