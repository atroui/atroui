"use client"

import Link from "next/link"
import { CodeBlock } from "@/components/code-block"
import { InstallModesMatrix } from "@/components/install-modes-matrix"
import { DocsTrayStack } from "@/components/docs-tray"

export function HostApiGuide() {
  return (
    <DocsTrayStack
      steps={[
        {
          title: "What Host APIs are",
          summary: "UI posts to your /api — handlers live in atroui",
          children: (
            <>
              <p className="text-[15px] leading-relaxed text-muted-foreground">
                Registry form and tool UIs post to{" "}
                <code className="rounded-md bg-muted px-1.5 py-0.5 font-mono text-[12px] text-foreground">
                  /api/*
                </code>{" "}
                on <strong className="font-medium text-foreground">your</strong>{" "}
                Next.js app. Each route is a thin stub that calls a published
                handler:
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
                Handlers in{" "}
                <code className="rounded-md bg-muted px-1.5 py-0.5 font-mono text-[12px] text-foreground">
                  atroui/api/*
                </code>{" "}
                already include validation, honeypot checks, body caps, and rate
                limits. You bring SMTP/Resend or HF/Gemini/xAI keys in{" "}
                <strong className="font-medium text-foreground">your</strong>{" "}
                env.
              </p>
            </>
          ),
        },
        {
          title: "Install modes",
          summary: "Add UI + route stubs with the shadcn CLI",
          children: (
            <>
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
            </>
          ),
        },
        {
          title: "Env · mail",
          summary: "Contact, waitlist, newsletter — your SMTP or Resend",
          children: (
            <>
              <p className="text-[15px] leading-relaxed text-muted-foreground">
                Without mail config, handlers return{" "}
                <code className="rounded-md bg-muted px-1.5 py-0.5 font-mono text-[12px] text-foreground">
                  503
                </code>
                . Copy from{" "}
                <code className="rounded-md bg-muted px-1.5 py-0.5 font-mono text-[12px] text-foreground">
                  .env.example
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
            </>
          ),
        },
        {
          title: "Env · AI / image",
          summary: "BYOK only — never in AtroUI's cloud",
          children: (
            <>
              <p className="text-[15px] leading-relaxed text-muted-foreground">
                Set these only in{" "}
                <strong className="font-medium text-foreground">your</strong>{" "}
                app. Preview and rule-based paths work without them.
              </p>
              <CodeBlock
                language="bash"
                code={`HUGGINGFACE_API_KEY=…   # OG / thumbnail AI
GEMINI_API_KEY=…          # optional freeform / Pro image
XAI_API_KEY=…             # optional scope LLM + thumbnail Pro`}
              />
              <ul className="list-disc space-y-2 pl-5 text-[15px] text-muted-foreground">
                <li>
                  OG / thumbnail{" "}
                  <strong className="font-medium text-foreground">
                    preview-only
                  </strong>{" "}
                  downloads (no provider call)
                </li>
                <li>
                  Scope chat{" "}
                  <strong className="font-medium text-foreground">
                    rule-based
                  </strong>{" "}
                  when{" "}
                  <code className="rounded-md bg-muted px-1.5 py-0.5 font-mono text-[12px] text-foreground">
                    XAI_API_KEY
                  </code>{" "}
                  is unset
                </li>
                <li>
                  Full AI generation returns{" "}
                  <code className="rounded-md bg-muted px-1.5 py-0.5 font-mono text-[12px] text-foreground">
                    503
                  </code>{" "}
                  until providers are configured
                </li>
              </ul>
            </>
          ),
        },
        {
          title: "Security defaults",
          summary: "What handlers already enforce",
          children: (
            <div className="overflow-x-auto rounded-xl border border-border-subtle bg-background/40">
              <table className="w-full min-w-[28rem] text-left text-sm">
                <thead className="border-b border-border-subtle bg-white/[0.03]">
                  <tr>
                    {["Control", "Default"].map((label) => (
                      <th
                        key={label}
                        className="px-3 py-2.5 text-[11px] font-semibold tracking-[0.06em] text-muted-foreground uppercase"
                      >
                        {label}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {(
                    [
                      [
                        "Honeypot",
                        "honeypot field → fake 200 for bots",
                      ],
                      ["Body cap", "8 MB JSON"],
                      ["Attachment", "5 MB decoded (contact)"],
                      [
                        "Rate limits",
                        "Contact 5 · waitlist 10 · AI 5 / 15 min / IP",
                      ],
                      ["429", "retryAfterSec"],
                      ["503", "Missing mail / AI config (BYOK)"],
                    ] as const
                  ).map(([control, def]) => (
                    <tr
                      key={control}
                      className="border-b border-border-subtle last:border-0"
                    >
                      <td className="px-3 py-2.5 font-medium text-foreground">
                        {control}
                      </td>
                      <td className="px-3 py-2.5 text-muted-foreground">
                        {def}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ),
        },
        {
          title: "Production rate limits",
          summary: "Memory locally · Redis when you scale",
          children: (
            <>
              <p className="text-[15px] leading-relaxed text-muted-foreground">
                Default limiter is{" "}
                <strong className="font-medium text-foreground">
                  in-memory
                </strong>{" "}
                per Node process. Fine for local and single instance. Multi-region
                hosts need a shared store or limits multiply.
              </p>
              <CodeBlock
                language="bash"
                code={`# Upstash Redis REST (recommended)
UPSTASH_REDIS_REST_URL=https://….upstash.io
UPSTASH_REDIS_REST_TOKEN=…

# or Vercel KV
KV_REST_API_URL=…
KV_REST_API_TOKEN=…`}
              />
              <p className="text-[15px] leading-relaxed text-muted-foreground">
                Same{" "}
                <code className="rounded-md bg-muted px-1.5 py-0.5 font-mono text-[12px] text-foreground">
                  checkRateLimit
                </code>{" "}
                API — no handler fork. Redis unreachable → memory fallback.
              </p>
            </>
          ),
        },
        {
          title: "Threat model",
          summary: "What we cover vs what you still own",
          children: (
            <ul className="list-disc space-y-2 pl-5 text-[15px] text-muted-foreground">
              <li>
                <strong className="text-foreground">Handlers cover</strong>:
                body caps, validation, honeypot, per-IP windows, clear 503 when
                secrets missing, no AtroUI-held keys.
              </li>
              <li>
                <strong className="text-foreground">You still own</strong>:
                authZ, CDN/WAF, deliverability, provider spend, shared rate-limit
                storage across instances.
              </li>
            </ul>
          ),
        },
      ]}
    />
  )
}
