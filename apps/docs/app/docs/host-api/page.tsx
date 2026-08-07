import type { Metadata } from "next"
import Link from "next/link"
import { CodeBlock } from "@/components/code-block"
import { InstallModesMatrix } from "@/components/install-modes-matrix"
import { docsPageMetadata } from "@/lib/docs-metadata"

export const metadata: Metadata = docsPageMetadata({
  title: "Host APIs",
  description:
    "Own the UI in your repo. Borrow the boring API security. Bring your own keys. AtroUI Host APIs for forms, OG, thumbnail, and scope.",
  path: "/docs/host-api",
})

export default function HostApiPage() {
  return (
    <article className="mx-auto max-w-3xl space-y-10">
      <header>
        <p className="ms-stamp mb-3">Getting started</p>
        <h1 className="ds-display text-3xl text-foreground sm:text-4xl">
          Host APIs
        </h1>
        <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-muted-foreground">
          Own the UI in your repo. Borrow the boring API security. Bring your
          own keys. AtroUI never stores secrets and does not run paid AI on
          atroui.com. Essay-length walkthrough:{" "}
          <Link
            href="/blog/host-apis-own-the-ui-bring-your-keys"
            className="bam-link"
          >
            Host APIs blog post
          </Link>
          .
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="ds-headline text-base text-foreground">
          What Host APIs are
        </h2>
        <p className="text-[15px] leading-relaxed text-muted-foreground">
          Registry form and tool UIs post to{" "}
          <code className="rounded-md bg-muted px-1.5 py-0.5 font-mono text-[12px] text-foreground">
            /api/*
          </code>{" "}
          on <strong className="font-medium text-foreground">your</strong>{" "}
          Next.js app. Each route is a thin stub that calls a published handler:
        </p>
        <CodeBlock
          language="ts"
          code={`import { handleContactPost } from "atroui/api/contact"

export const runtime = "nodejs"

export async function POST(req: Request) {
  return handleContactPost(req)
}`}
        />
        <p className="text-[15px] leading-relaxed text-muted-foreground">
          Handlers live in the{" "}
          <code className="rounded-md bg-muted px-1.5 py-0.5 font-mono text-[12px] text-foreground">
            atroui
          </code>{" "}
          package (
          <code className="rounded-md bg-muted px-1.5 py-0.5 font-mono text-[12px] text-foreground">
            atroui/api/contact
          </code>
          ,{" "}
          <code className="rounded-md bg-muted px-1.5 py-0.5 font-mono text-[12px] text-foreground">
            waitlist
          </code>
          ,{" "}
          <code className="rounded-md bg-muted px-1.5 py-0.5 font-mono text-[12px] text-foreground">
            newsletter
          </code>
          ,{" "}
          <code className="rounded-md bg-muted px-1.5 py-0.5 font-mono text-[12px] text-foreground">
            generate
          </code>
          ,{" "}
          <code className="rounded-md bg-muted px-1.5 py-0.5 font-mono text-[12px] text-foreground">
            thumbnail
          </code>
          ,{" "}
          <code className="rounded-md bg-muted px-1.5 py-0.5 font-mono text-[12px] text-foreground">
            scope
          </code>
          ). They already include validation, honeypot checks, body caps, and
          rate limits. You bring SMTP/Resend or HF/Gemini/xAI keys in{" "}
          <strong className="font-medium text-foreground">your</strong> env.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="ds-headline text-base text-foreground">Install modes</h2>
        <InstallModesMatrix />
        <CodeBlock
          language="bash"
          code={`# Forms example
npm i atroui
# next.config.ts → transpilePackages: ["atroui"]

npx shadcn@latest add @atroui/contact-form @atroui/api-contact

# AI tools example
npx shadcn@latest add @atroui/og-workspace @atroui/api-generate
npx shadcn@latest add @atroui/thumbnail-workspace @atroui/api-thumbnail
npx shadcn@latest add @atroui/scope-chat @atroui/api-scope`}
        />
        <p className="text-[15px] leading-relaxed text-muted-foreground">
          Full CLI setup:{" "}
          <Link href="/docs/installation" className="bam-link">
            Installation
          </Link>
          . Catalog:{" "}
          <Link href="/docs/registry" className="bam-link">
            Registry
          </Link>
          .
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="ds-headline text-base text-foreground">Env reference</h2>
        <p className="text-[15px] leading-relaxed text-muted-foreground">
          Copy{" "}
          <code className="rounded-md bg-muted px-1.5 py-0.5 font-mono text-[12px] text-foreground">
            .env.example
          </code>{" "}
          into your host app. Grouped by concern:
        </p>

        <h3 className="text-[14px] font-semibold text-foreground">Mail</h3>
        <p className="text-[15px] leading-relaxed text-muted-foreground">
          Contact, waitlist, and newsletter need SMTP and/or Resend. Without
          them, handlers return{" "}
          <code className="rounded-md bg-muted px-1.5 py-0.5 font-mono text-[12px] text-foreground">
            503
          </code>
          .
        </p>
        <CodeBlock
          language="bash"
          code={`CONTACT_EMAIL_TO=hello@acme.test
CONTACT_EMAIL_FROM=noreply@acme.test
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=…
SMTP_PASSWORD=…
# or
RESEND_API_KEY=…
RESEND_AUDIENCE_ID=…   # newsletter audience subscribe`}
        />

        <h3 className="text-[14px] font-semibold text-foreground">
          AI / image
        </h3>
        <p className="text-[15px] leading-relaxed text-muted-foreground">
          Set these only in{" "}
          <strong className="font-medium text-foreground">your</strong> app.
          Never commit keys. Preview and rule-based paths work without them.
        </p>
        <CodeBlock
          language="bash"
          code={`HUGGINGFACE_API_KEY=…   # OG / thumbnail AI
GEMINI_API_KEY=…          # optional freeform / Pro image
XAI_API_KEY=…             # optional scope LLM + thumbnail Pro`}
        />

        <h3 className="text-[14px] font-semibold text-foreground">
          Works without keys
        </h3>
        <ul className="list-disc space-y-2 pl-5 text-[15px] text-muted-foreground">
          <li>
            OG / thumbnail{" "}
            <strong className="font-medium text-foreground">preview-only</strong>{" "}
            downloads (no provider call)
          </li>
          <li>
            Scope chat{" "}
            <strong className="font-medium text-foreground">
              rule-based
            </strong>{" "}
            replies when{" "}
            <code className="rounded-md bg-muted px-1.5 py-0.5 font-mono text-[12px] text-foreground">
              XAI_API_KEY
            </code>{" "}
            is unset
          </li>
        </ul>
        <p className="text-[15px] leading-relaxed text-muted-foreground">
          Full AI generation returns{" "}
          <code className="rounded-md bg-muted px-1.5 py-0.5 font-mono text-[12px] text-foreground">
            503
          </code>{" "}
          until providers are configured, including on atroui.com demos.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="ds-headline text-base text-foreground">
          Security defaults
        </h2>
        <div className="overflow-x-auto rounded-2xl border border-border-subtle bg-card/40">
          <table className="w-full min-w-[36rem] text-left text-sm">
            <thead className="border-b border-border-subtle bg-white/[0.03]">
              <tr>
                {["Control", "Default"].map((label) => (
                  <th
                    key={label}
                    className="px-4 py-3 text-[11px] font-semibold uppercase tracking-[0.06em] text-muted-foreground"
                  >
                    {label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-border-subtle">
                <td className="px-4 py-3 font-medium text-foreground">
                  Honeypot JSON field
                </td>
                <td className="px-4 py-3 text-muted-foreground">
                  <code className="font-mono text-[12px] text-foreground">
                    honeypot
                  </code>
                  : filled bots get a fake{" "}
                  <code className="font-mono text-[12px] text-foreground">
                    200
                  </code>{" "}
                  (no send)
                </td>
              </tr>
              <tr className="border-b border-border-subtle">
                <td className="px-4 py-3 font-medium text-foreground">
                  Body cap
                </td>
                <td className="px-4 py-3 text-muted-foreground">8 MB JSON</td>
              </tr>
              <tr className="border-b border-border-subtle">
                <td className="px-4 py-3 font-medium text-foreground">
                  Attachment cap
                </td>
                <td className="px-4 py-3 text-muted-foreground">
                  5 MB decoded (contact)
                </td>
              </tr>
              <tr className="border-b border-border-subtle">
                <td className="px-4 py-3 font-medium text-foreground">
                  Rate limits (15 min window)
                </td>
                <td className="px-4 py-3 text-muted-foreground">
                  Contact 5 · waitlist/newsletter 10 · scope 30 · generate /
                  thumbnail preview 30 · AI 5 (per IP)
                </td>
              </tr>
              <tr className="border-b border-border-subtle">
                <td className="px-4 py-3 font-medium text-foreground">429</td>
                <td className="px-4 py-3 text-muted-foreground">
                  Rate limit exceeded (
                  <code className="font-mono text-[12px] text-foreground">
                    retryAfterSec
                  </code>
                  )
                </td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-medium text-foreground">503</td>
                <td className="px-4 py-3 text-muted-foreground">
                  Missing mail / AI provider config (not a client bug)
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="ds-headline text-base text-foreground">
          Production rate limiting
        </h2>
        <p className="text-[15px] leading-relaxed text-muted-foreground">
          The default limiter is an{" "}
          <strong className="font-medium text-foreground">
            in-memory sliding window
          </strong>{" "}
          per Node process. Fine for local demos and a single instance. On
          multi-region Vercel (or any multi-instance host), each instance has
          its own map, so effective limits multiply.
        </p>
        <p className="text-[15px] leading-relaxed text-muted-foreground">
          Paste Upstash Redis REST (or Vercel KV) env vars into the host. The
          same{" "}
          <code className="rounded-md bg-muted px-1.5 py-0.5 font-mono text-[12px] text-foreground">
            checkRateLimit
          </code>{" "}
          API switches to a shared backend automatically. You do not fork
          handlers. Redis is never required for open-source consumers; memory
          remains the default. On Vercel production without a store, handlers
          log a one-time console warning.
        </p>
        <CodeBlock
          language="bash"
          code={`# Upstash Redis REST (recommended)
UPSTASH_REDIS_REST_URL=https://….upstash.io
UPSTASH_REDIS_REST_TOKEN=…

# or Vercel KV (same REST protocol)
KV_REST_API_URL=…
KV_REST_API_TOKEN=…`}
        />
        <p className="text-[15px] leading-relaxed text-muted-foreground">
          If Redis is unreachable, handlers fall back to in-memory limits so
          forms stay available. See{" "}
          <code className="rounded-md bg-muted px-1.5 py-0.5 font-mono text-[12px] text-foreground">
            .env.example
          </code>{" "}
          in the repo.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="ds-headline text-base text-foreground">Threat model</h2>
        <p className="text-[15px] leading-relaxed text-muted-foreground">
          Host APIs mitigate common copy-paste route mistakes. The host still
          owns the rest of production security.
        </p>
        <ul className="list-disc space-y-2 pl-5 text-[15px] text-muted-foreground">
          <li>
            <strong className="text-foreground">Handlers cover</strong>: body
            size caps, basic validation, honeypot bots, per-IP rate windows,
            clear 503 when secrets are missing (BYOK), no AtroUI-held keys.
          </li>
          <li>
            <strong className="text-foreground">You still own</strong>:
            authentication / authorization, CDN or WAF abuse controls, email
            deliverability and spam reputation, provider spend, and shared
            rate-limit storage across instances.
          </li>
        </ul>
      </section>

      <div className="flex flex-wrap gap-3 pt-1">
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
