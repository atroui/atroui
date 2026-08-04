import type { Metadata } from "next"
import { ComponentDoc } from "@/components/component-doc"
import { DemoContactForm } from "@/components/registry-demos"

export const metadata: Metadata = {
  title: 'Contact Form',
}

export default function Page() {
  return (
    <ComponentDoc
      title='Contact Form'
      description='Full contact / briefing form.'
      preview={<DemoContactForm />}
      code={'import { ContactForm } from "@meridian/ui"\n\n<ContactForm />'}
      fullBleed={true}
      installation='import { ContactForm } from "@meridian/ui"'
    />
  )
}
