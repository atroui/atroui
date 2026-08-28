import type { Metadata } from "next"
import { componentPageMetadata } from "@/lib/docs-metadata"
import { RegistryComponentDoc } from "@/components/registry-component-doc"

export const metadata: Metadata = componentPageMetadata(
  "Ui Mockup Frame",
  "/docs/components/ui-ui-mockup-frame",
  "Device / product mockup frame."
)

export default async function Page() {
  return (
    <RegistryComponentDoc
      registryName="mockup-frame"
      href="/docs/components/ui-ui-mockup-frame"
      title="Ui Mockup Frame"
      description="Device / product mockup frame."
      props={[
    { name: 'variant', type: 'MockupVariant', default: "'saas'", description: 'Mockup style.' },
  ]}
      code={`import { UiMockupFrame } from "@/components/ui/mockup-frame"\n\n<UiMockupFrame variant="saas" />`}
    />
  )
}
