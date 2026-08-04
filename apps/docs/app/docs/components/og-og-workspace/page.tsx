import type { Metadata } from "next"
import { ComponentDoc } from "@/components/component-doc"
import { DemoOgWorkspace } from "@/components/registry-demos"

export const metadata: Metadata = {
  title: 'Og Workspace',
}

export default function Page() {
  return (
    <ComponentDoc
      title='Og Workspace'
      description='Full OG image generator workspace.'
      preview={<DemoOgWorkspace />}
      code={'import { OgWorkspace } from "@meridian/ui"\n\n<OgWorkspace />'}
      fullBleed={true}
      installation='import { OgWorkspace } from "@meridian/ui"'
      usage='Needs host API routes for generation.'
    />
  )
}
