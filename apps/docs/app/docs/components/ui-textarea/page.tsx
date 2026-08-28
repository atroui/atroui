import type { Metadata } from "next"
import { componentPageMetadata } from "@/lib/docs-metadata"
import { RegistryComponentDoc } from "@/components/registry-component-doc"

export const metadata: Metadata = componentPageMetadata(
  "Textarea",
  "/docs/components/ui-textarea",
  "Multi-line text input styled for AtroUI forms."
)

export default async function Page() {
  return (
    <RegistryComponentDoc
      registryName="textarea"
      href="/docs/components/ui-textarea"
      title="Textarea"
      description="Multi-line text input."
      props={[
    { name: 'placeholder', type: 'string', default: '-', description: 'Hint text.' },
    { name: 'disabled', type: 'boolean', default: 'false', description: 'Disables input.' },
  ]}
      code={`import { Textarea } from "@/components/ui/textarea"\n\n<Textarea placeholder="Message" />`}
    />
  )
}
