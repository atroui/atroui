import type { Metadata } from "next"
import { componentPageMetadata } from "@/lib/docs-metadata"
import { ComponentDoc } from "@/components/component-doc"
import { DemoTextarea } from "@/components/registry-demos"

export const metadata: Metadata = componentPageMetadata(
  "Textarea",
  "/docs/components/ui-textarea",
  "Multi-line text input styled for AtroUI forms."
)

export default function Page() {
  return (
    <ComponentDoc
      registryName="textarea"
      href="/docs/components/ui-textarea"
      title="Textarea"
      description="Multi-line text input."
      preview={<DemoTextarea />}
      code={'import { Textarea } from "@/components/ui/textarea"\n\n<Textarea placeholder="Message" />'}
      fullBleed={false}
      props={[
    { name: 'placeholder', type: 'string', default: '-', description: 'Hint text.' },
    { name: 'disabled', type: 'boolean', default: 'false', description: 'Disables input.' },
  ]}
    />
  )
}
