import { ComponentDoc } from "@/components/component-doc"
import { DemoLiveDashboard } from "@/components/registry-demos"


export function StudioLiveDashboardDoc() {
  return (
    <ComponentDoc
      registryName="live-dashboard"
      href="/docs/components/studio-live-dashboard"
      title="Live Dashboard"
      description="Studio live dashboard driven by package content modules - not a host API tool."
      preview={<DemoLiveDashboard />}
      code={'import { LiveDashboard } from "@/components/blocks/live-dashboard"\n\n<LiveDashboard />'}
      fullBleed={true}
      usage="Reads from atroui content (studio projects, etc.). No /api/* required for the default demo."
    />
  )
}
