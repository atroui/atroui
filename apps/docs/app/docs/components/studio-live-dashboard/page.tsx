import type { Metadata } from "next"
import { ComponentDoc } from "@/components/component-doc"
import { DemoLiveDashboard } from "@/components/registry-demos"

export const metadata: Metadata = {
  title: "Live Dashboard",
}

export default function Page() {
  return (
    <ComponentDoc
      title="Live Dashboard"
      description="Studio live dashboard driven by package content modules — not a host API tool."
      preview={<DemoLiveDashboard />}
      code={'import { LiveDashboard } from "atroui"\n\n<LiveDashboard />'}
      fullBleed={true}
      installation='import { LiveDashboard } from "atroui"'
      usage="Reads from atroui content (studio projects, etc.). No /api/* required for the default demo."
    />
  )
}
