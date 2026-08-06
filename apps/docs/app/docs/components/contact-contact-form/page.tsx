import type { Metadata } from "next"
import { componentPageMetadata } from "@/lib/docs-metadata"
import { ComponentDoc } from "@/components/component-doc"
import { DemoContactForm } from "@/components/registry-demos"

export const metadata: Metadata = componentPageMetadata(
  "Contact Form",
  "/docs/components/contact-contact-form",
  "Full contact / briefing form. Posts to /api/contact - install @atroui/api-contact or use atroui/api/contact."
)

export default function Page() {
  return (
    <ComponentDoc
      href="/docs/components/contact-contact-form"
      registryName="contact-form"
      title="Contact Form"
      description="Full contact / briefing form. Posts to /api/contact - install @atroui/api-contact or use atroui/api/contact."
      preview={<DemoContactForm />}
      code={'import { ContactForm } from "@/components/blocks/contact-form"\n\n<ContactForm />'}
      fullBleed={true}
      usage="Pair with npx shadcn add @atroui/api-contact (or import handleContactPost from atroui/api/contact). Set SMTP_* / CONTACT_EMAIL_TO (see .env.example)."
    />
  )
}
