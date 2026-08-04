import type { Metadata } from "next"
import { ComponentDoc } from "@/components/component-doc"
import { DemoNewsletterForm } from "@/components/registry-demos"

export const metadata: Metadata = {
  title: 'Newsletter Form',
}

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
    { name: 'className', type: 'string', default: '—', description: 'Extra classes.' },
  ]}
    />
  )
}
