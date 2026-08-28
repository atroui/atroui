import type { Metadata } from "next"
import { componentPageMetadata } from "@/lib/docs-metadata"
import { RegistryComponentDoc } from "@/components/registry-component-doc"

export const metadata: Metadata = componentPageMetadata(
  "Prose",
  "/docs/components/ui-prose",
  "Long-form typography container for articles and MDX."
)

export default async function Page() {
  return (
    <RegistryComponentDoc
      registryName="prose"
      href="/docs/components/ui-prose"
      title="Prose"
      description="Long-form typography wrapper."
      props={[
    { name: 'className', type: 'string', default: '-', description: 'Extra classes.' },
  ]}
      code={`import { Prose } from "@/components/ui/prose"\n\n<Prose><p>…</p></Prose>`}
    />
  )
}
