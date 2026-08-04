import type { Metadata } from "next"
import { ComponentDoc } from "@/components/component-doc"
import { DemoSchemaNote } from "@/components/registry-demos"

export const metadata: Metadata = {
  title: 'Testimonial Schema',
}

export default function Page() {
  return (
    <ComponentDoc
      title='Testimonial Schema'
      description='Testimonial schema.org JSON-LD.'
      preview={<DemoSchemaNote name='Testimonial Schema' />}
      code={`import { /* see source */ } from "@meridian/ui"`}
      usage="Headless / schema component — no visual UI. Import in a page or layout to emit structured data or analytics context."
    />
  )
}
