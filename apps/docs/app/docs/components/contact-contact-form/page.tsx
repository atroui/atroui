import type { Metadata } from "next"
import { componentPageMetadata } from "@/lib/docs-metadata"
import { RegistryComponentDoc } from "@/components/registry-component-doc"

export const metadata: Metadata = componentPageMetadata(
  "Hardened Next.js Contact Form with SMTP API",
  "/docs/components/contact-contact-form",
  "A secure, production-ready React contact form component for Next.js with a matching SMTP and Resend backend API route."
)

export default async function Page() {
  return (
    <RegistryComponentDoc
      registryName="contact-form"
      href="/docs/components/contact-contact-form"
      title="Hardened Next.js Contact Form with SMTP API"
      description="A secure, production-ready React contact form component for Next.js with a matching SMTP and Resend backend API route."
      fullBleed
      usage="Pair with npx shadcn add @atroui/api-contact (or import handleContactPost from atroui/api/contact). Set SMTP_* / CONTACT_EMAIL_TO (see .env.example)."
      code={`import { ContactForm } from "@/components/blocks/contact-form"\n\n<ContactForm />`}
    />
  )
}
