import type { Metadata } from "next"
import { componentPageMetadata } from "@/lib/docs-metadata"
import { RegistryComponentDoc } from "@/components/registry-component-doc"

export const metadata: Metadata = componentPageMetadata(
  "Newsletter Form",
  "/docs/components/newsletter-newsletter-form",
  "Email capture form."
)

export default async function Page() {
  return (
    <RegistryComponentDoc
      registryName="newsletter-form"
      href="/docs/components/newsletter-newsletter-form"
      title="Newsletter Form"
      description="Email capture form."
      usage="Posts to /api/newsletter. Install @atroui/api-newsletter (Resend audience or SMTP). See Installation."
      props={[
    { name: 'className', type: 'string', default: '-', description: 'Extra classes.' },
  ]}
      code={`import { NewsletterForm } from "@/components/blocks/newsletter-form"\n\n<NewsletterForm />`}
    />
  )
}
