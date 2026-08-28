import type { Metadata } from "next"
import { componentPageMetadata } from "@/lib/docs-metadata"
import { RegistryComponentDoc } from "@/components/registry-component-doc"

export const metadata: Metadata = componentPageMetadata(
  "Waitlist Form",
  "/docs/components/brand-waitlist-form",
  "Brand waitlist signup."
)

export default async function Page() {
  return (
    <RegistryComponentDoc
      registryName="waitlist-form"
      href="/docs/components/brand-waitlist-form"
      title="Waitlist Form"
      description="Brand waitlist signup."
      usage="Posts to /api/waitlist. Install @atroui/api-waitlist (Resend audience or SMTP). See Installation."
      code={`import { WaitlistForm } from "@/components/blocks/waitlist-form"\n\n<WaitlistForm />`}
    />
  )
}
