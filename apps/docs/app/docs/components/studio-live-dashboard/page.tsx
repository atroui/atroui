import type { Metadata } from "next"
import { ComponentDoc } from "@/components/component-doc"
import { DemoLiveDashboard } from "@/components/registry-demos"

export const metadata: Metadata = {
  title: 'Live Dashboard',
}

export default function Page() {
  return (
    <ComponentDoc
      title='Live Dashboard'
      description='Studio live dashboard.'
      preview={<DemoLiveDashboard />}
      code={'import { LiveDashboard } from "@meridian/ui"\n\n<LiveDashboard />'}
      fullBleed={true}
      installation='import { LiveDashboard } from "@meridian/ui"'
    />
  )
}
