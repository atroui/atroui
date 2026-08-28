import type { Metadata } from "next"
import { componentPageMetadata } from "@/lib/docs-metadata"
import { RegistryComponentDoc } from "@/components/registry-component-doc"

export const metadata: Metadata = componentPageMetadata(
  "FAQ",
  "/docs/components/faq-interactive-preview",
  "Interactive FAQ accordion. Install @atroui/faq for editable CONTENT / ITEMS in your repo."
)

export default async function Page() {
  return (
    <RegistryComponentDoc
      registryName="faq"
      href="/docs/components/faq-interactive-preview"
      title="FAQ"
      description="Interactive FAQ accordion. Install @atroui/faq for editable CONTENT / ITEMS in your repo."
      fullBleed
      code={`import { Faq } from "@/components/blocks/faq"\n\n<Faq />`}
    />
  )
}
