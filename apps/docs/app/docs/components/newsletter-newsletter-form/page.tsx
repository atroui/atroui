import type { Metadata } from "next"
import { componentPageMetadata } from "@/lib/docs-metadata"
import { ComponentDoc } from "@/components/component-doc"
import { DemoNewsletterForm } from "@/components/registry-demos"

export const metadata: Metadata = componentPageMetadata(
  "Newsletter Form",
  "/docs/components/newsletter-newsletter-form"
)

export default function Page() {
  return (
    <ComponentDoc
      registryName="newsletter-form"
      title='Newsletter Form'
      description='Email capture form.'
      preview={<DemoNewsletterForm />}
      code={'import { NewsletterForm } from "@/components/blocks/newsletter-form"\n\n<NewsletterForm />'}
      fullBleed={false}
      usage='Posts to CONTENT.endpoint (default /api/newsletter). Host API.'
      props={[
    { name: 'className', type: 'string', default: '-', description: 'Extra classes.' },
  ]}
    />
  )
}
