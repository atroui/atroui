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
      title='Newsletter Form'
      description='Email capture form.'
      preview={<DemoNewsletterForm />}
      code={'import { NewsletterForm } from "atroui"\n\n<NewsletterForm />'}
      fullBleed={false}
      installation='import { NewsletterForm } from "atroui"'
      usage='Posts to your /api/newsletter route.'
      props={[
    { name: 'className', type: 'string', default: '-', description: 'Extra classes.' },
  ]}
    />
  )
}
