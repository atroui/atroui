import type { Metadata } from "next"
import Link from "next/link"
import { HostApiGuide } from "@/components/host-api-guide"
import { docsPageMetadata } from "@/lib/docs-metadata"

export const metadata: Metadata = docsPageMetadata({
  title: "Host APIs",
  description:
    "Own the UI in your repo. Borrow the boring API security. Bring your own keys. AtroUI Host APIs for forms, OG, thumbnail, and scope.",
  path: "/docs/host-api",
})

export default function HostApiPage() {
  return (
    <article className="mx-auto max-w-3xl space-y-8">
      <header>
        <p className="ms-stamp mb-3">Getting started</p>
        <h1 className="ds-display text-3xl text-foreground sm:text-4xl">
          Host APIs
        </h1>
        <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-muted-foreground">
          Own the UI in your repo. Borrow the boring API security. Bring your
          own keys. Walk the trays below — one idea at a time. Essay:{" "}
          <Link
            href="/blog/host-apis-own-the-ui-bring-your-keys"
            className="bam-link"
          >
            Host APIs blog post
          </Link>
          .
        </p>
      </header>

      <HostApiGuide />

      <div className="flex flex-wrap gap-3 border-t border-border-subtle pt-6">
        <Link href="/docs/installation" className="ms-cta">
          Installation
        </Link>
        <Link href="/docs/registry" className="ms-cta-ghost">
          Registry
        </Link>
        <Link
          href="/docs/components/contact-contact-form"
          className="ms-cta-ghost"
        >
          Contact form
        </Link>
      </div>
    </article>
  )
}
