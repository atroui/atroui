import type { Metadata } from "next"
import { componentPageMetadata } from "@/lib/docs-metadata"
import Link from "next/link"
import { ComponentDoc } from "@/components/component-doc"
import { DemoContactForm } from "@/components/registry-demos"

export const metadata: Metadata = componentPageMetadata(
  "Contact Form",
  "/docs/components/contact-contact-form",
  "Production contact form with honeypot and a matching /api/contact Host route."
)

export default function Page() {
  return (
    <ComponentDoc
      href="/docs/components/contact-contact-form"
      registryName="contact-form"
      title="Contact Form"
      description="Production contact form with honeypot, validation, and a matching /api/contact Host route (SMTP or Resend)."
      preview={<DemoContactForm />}
      code={`import { ContactForm } from "@/components/blocks/contact-form"

<ContactForm />`}
      fullBleed={true}
      usage={
        <>
          Posts to{" "}
          <code className="rounded-md bg-muted px-1.5 py-0.5 font-mono text-[12px] text-foreground">
            /api/contact
          </code>
          . Install{" "}
          <code className="rounded-md bg-muted px-1.5 py-0.5 font-mono text-[12px] text-foreground">
            @atroui/api-contact
          </code>{" "}
          with the form (or call{" "}
          <code className="rounded-md bg-muted px-1.5 py-0.5 font-mono text-[12px] text-foreground">
            handleContactPost
          </code>{" "}
          from{" "}
          <code className="rounded-md bg-muted px-1.5 py-0.5 font-mono text-[12px] text-foreground">
            atroui/api/contact
          </code>
          ). Set{" "}
          <code className="rounded-md bg-muted px-1.5 py-0.5 font-mono text-[12px] text-foreground">
            SMTP_*
          </code>{" "}
          and{" "}
          <code className="rounded-md bg-muted px-1.5 py-0.5 font-mono text-[12px] text-foreground">
            CONTACT_EMAIL_TO
          </code>{" "}
          — details in{" "}
          <Link href="/docs/host-api" className="bam-link">
            Host APIs
          </Link>
          .
        </>
      }
    />
  )
}
