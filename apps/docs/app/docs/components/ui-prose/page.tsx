import type { Metadata } from "next"
import { componentPageMetadata } from "@/lib/docs-metadata"
import { ComponentDoc } from "@/components/component-doc"
import { DemoProse } from "@/components/registry-demos"

export const metadata: Metadata = componentPageMetadata(
  "Prose",
  "/docs/components/ui-prose"
)

export default function Page() {
  return (
    <ComponentDoc
      title='Prose'
      description='Long-form typography wrapper.'
      preview={<DemoProse />}
      code={'import { Prose } from "atroui"\n\n<Prose><p>…</p></Prose>'}
      fullBleed={false}
      props={[
    { name: 'className', type: 'string', default: '-', description: 'Extra classes.' },
  ]}
    />
  )
}
