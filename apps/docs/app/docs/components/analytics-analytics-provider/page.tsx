import type { Metadata } from "next"
import { ComponentDoc } from "@/components/component-doc"
import { DemoSchemaNote } from "@/components/registry-demos"

export const metadata: Metadata = {
  title: 'Analytics Provider',
}

export default function Page() {
  return (
    <ComponentDoc
      title='Analytics Provider'
      description='Analytics + experiment provider.'
      preview={<DemoSchemaNote name='Analytics Provider' />}
      code={`import { /* see source */ } from "@meridian/ui"`}
      usage="Headless / schema component — no visual UI. Import in a page or layout to emit structured data or analytics context."
    />
  )
}
