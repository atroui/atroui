import type { Metadata } from "next"
import { ComponentDoc } from "@/components/component-doc"
import { DemoContactForm } from "@/components/registry-demos"

export const metadata: Metadata = {
  title: "Contact Form",
}

export default function Page() {
  return (
    <ComponentDoc
      title="Contact Form"
      description="Full contact / briefing form. Posts to the host /api/contact route."
      preview={<DemoContactForm />}
      code={'import { ContactForm } from "atroui"\n\n<ContactForm />'}
      fullBleed={true}
      installation='import { ContactForm } from "atroui"'
      usage="Requires a host POST /api/contact handler (and usually mail env). Without it, submit will fail in the docs preview."
    />
  )
}
