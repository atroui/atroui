import Link from "next/link"
import { DocsArticleHeader } from "@/components/docs/docs-article-header"
import { DocsFaq } from "@/components/docs/docs-faq"
import { DocsPager } from "@/components/docs-pager"
import { HostApiGuide } from "@/components/host-api-guide"

const HOST_API_FAQS = [
  {
    q: "What is an AtroUI Host API?",
    a: "A Host API is a thin Next.js App Router API route running on your own server that delegates processing to secure, pre-hardened validation and security handlers inside the local atroui npm package.",
  },
  {
    q: "Does AtroUI host any of my AI or SMTP keys?",
    a: "No. AtroUI operates under a strict Bring Your Own Keys (BYOK) model. All secret tokens, API keys, and SMTP server passwords remain in your local environment variables and are never transmitted to AtroUI's documentation hosts.",
  },
  {
    q: "How are Host APIs secured against spam and abuse?",
    a: "Every handler includes out-of-the-box production-ready safeguards: sliding-window rate limits (in-memory or Upstash Redis REST/Vercel KV), automatic honeypot spam fields, payload size capping (8 MB request size limit), and attachment filters.",
  },
] as const


export function HostApiGuidePage() {
  return (
    <article className="space-y-10">
      <DocsArticleHeader
        eyebrow="Getting started"
        title="Host APIs"
        lede={
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
        <Link href="/docs/installation" className="atro-btn">
          Installation
        </Link>
        <Link href="/docs/registry" className="atro-btn-ghost">
          Registry
        </Link>
        <Link
          href="/docs/guides/launch-workflow"
          className="atro-btn-ghost"
        >
          Launch workflow
        </Link>
        <Link
          href="/docs/components/contact-contact-form"
          className="atro-btn-ghost"
        >
          Contact form
        </Link>
      </div>

      <DocsFaq pagePath="/docs/host-api" items={[...HOST_API_FAQS]} />
      <DocsPager href="/docs/host-api" kind="guides" />
    </article>
  )
}
