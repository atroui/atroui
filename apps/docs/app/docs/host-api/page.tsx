import type { Metadata } from "next"
import Link from "next/link"
import { FaqJsonLd } from "atroui"
import { DocsBreadcrumb } from "@/components/docs-breadcrumb"
import { DocsPageHeader } from "@/components/docs-page-header"
import { HostApiGuide } from "@/components/host-api-guide"
import { docsPageMetadata } from "@/lib/docs-metadata"

const HOST_API_FAQS = [
  {
    question: "What is an AtroUI Host API?",
    answer:
      "A Host API is a thin Next.js App Router API route running on your own server that delegates processing to secure, pre-hardened validation and security handlers inside the local atroui npm package.",
  },
  {
    question: "Does AtroUI host any of my AI or SMTP keys?",
    answer:
      "No. AtroUI operates under a strict Bring Your Own Keys (BYOK) model. All secret tokens, API keys, and SMTP server passwords remain in your local environment variables and are never transmitted to AtroUI's documentation hosts.",
  },
  {
    question: "How are Host APIs secured against spam and abuse?",
    answer:
      "Every handler includes out-of-the-box production-ready safeguards: sliding-window rate limits (in-memory or Upstash Redis REST/Vercel KV), automatic honeypot spam fields, payload size capping (8 MB request size limit), and attachment filters.",
  },
] as const

export const metadata: Metadata = docsPageMetadata({
  title: "Host APIs",
  description:
    "Own the UI in your repo. Borrow the boring API security. Bring your own keys. AtroUI Host APIs for forms, OG, thumbnail, and scope.",
  path: "/docs/host-api",
})

export default function HostApiPage() {
  return (
    <article className="mx-auto max-w-3xl space-y-8">
      <DocsBreadcrumb
        items={[
          { label: "Docs", href: "/docs" },
          { label: "Host APIs" },
        ]}
      />
      <DocsPageHeader
        eyebrow="Getting started"
        title="Host APIs"
        description={
          <>
            Own the UI in your repo. Borrow the boring API security. Bring your
            own keys. Walk the trays below — one idea at a time. Related:{" "}
            <Link href="/docs/collections/nextjs-forms" className="bam-link">
              Next.js forms
            </Link>
            {" · "}
            <Link href="/docs/glossary/host-api" className="bam-link">
              Host API glossary
            </Link>
            {" · "}
            <Link
              href="/blog/host-apis-own-the-ui-bring-your-keys"
              className="bam-link"
            >
              Host APIs blog post
            </Link>
            .
          </>
        }
      />

      <HostApiGuide />

      <div className="flex flex-wrap gap-3 border-t border-border-subtle pt-6">
        <Link href="/docs/installation" className="ms-cta">
          Installation
        </Link>
        <Link href="/docs/registry" className="ms-cta-ghost">
          Registry
        </Link>
        <Link
          href="/docs/guides/launch-workflow"
          className="ms-cta-ghost"
        >
          Launch workflow
        </Link>
        <Link
          href="/docs/components/contact-contact-form"
          className="ms-cta-ghost"
        >
          Contact form
        </Link>
      </div>

      <section className="space-y-4 border-t border-border-subtle pt-8">
        <h2 className="ds-headline text-base text-foreground">FAQ</h2>
        <dl className="space-y-5">
          {HOST_API_FAQS.map((item) => (
            <div key={item.question}>
              <dt className="text-[15px] font-medium text-foreground">
                {item.question}
              </dt>
              <dd className="mt-1.5 text-[15px] leading-relaxed text-muted-foreground">
                {item.answer}
              </dd>
            </div>
          ))}
        </dl>
        <FaqJsonLd pagePath="/docs/host-api" items={[...HOST_API_FAQS]} />
      </section>
    </article>
  )
}
