import { ComponentDoc } from "@/components/component-doc"
import { DemoNewsletterForm } from "@/components/registry-demos"


export function NewsletterNewsletterFormDoc() {
  return (
    <ComponentDoc
      href="/docs/components/newsletter-newsletter-form"
      registryName="newsletter-form"
      title="Newsletter Form"
      description="Email capture form."
      preview={<DemoNewsletterForm />}
      code={'import { NewsletterForm } from "@/components/blocks/newsletter-form"\n\n<NewsletterForm />'}
      fullBleed={false}
      usage="Posts to /api/newsletter. Install @atroui/api-newsletter (Resend audience or SMTP). See Installation."
      props={[
    { name: 'className', type: 'string', default: '-', description: 'Extra classes.' },
  ]}
    />
  )
}
