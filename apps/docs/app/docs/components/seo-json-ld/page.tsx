import type { Metadata } from "next"
import { ComponentDoc } from "@/components/component-doc"
import { DemoSchemaNote } from "@/components/registry-demos"

export const metadata: Metadata = {
  title: 'Json Ld',
}

export default function Page() {
  return (
    <ComponentDoc
      title='Json Ld'
      description='JSON-LD helpers (org, article, FAQ, breadcrumbs, offers).'
      preview={<DemoSchemaNote name='Json Ld' />}
      code={`import { /* see source */ } from "@meridian/ui"`}
      usage="Headless / schema component — no visual UI. Import in a page or layout to emit structured data or analytics context."
    />
  )
}
