import type { Metadata } from "next"
import { componentPageMetadata } from "@/lib/docs-metadata"
import { ComponentDoc } from "@/components/component-doc"
import { DemoContactForm } from "@/components/registry-demos"

export const metadata: Metadata = componentPageMetadata(
  "Hardened Next.js Contact Form with SMTP API",
  "/docs/components/contact-contact-form",
  "A secure, production-ready React contact form component for Next.js with a matching SMTP and Resend backend API route."
)

export default function Page() {
  return (
    <ComponentDoc
      href="/docs/components/contact-contact-form"
      registryName="contact-form"
      title="Hardened Next.js Contact Form with SMTP API"
      description="A secure, production-ready React contact form component for Next.js with a matching SMTP and Resend backend API route."
      preview={<DemoContactForm />}
      code={'import { ContactForm } from "@/components/blocks/contact-form"\n\n<ContactForm />'}
      fullBleed={true}
      usage="Posts to /api/contact. Install @atroui/api-contact for the route, or import handleContactPost from atroui/api/contact. Set SMTP_* and CONTACT_EMAIL_TO (see .env.example)."
    />
  )
}
