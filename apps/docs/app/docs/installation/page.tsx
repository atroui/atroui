import type { Metadata } from "next"
import { FaqJsonLd } from "atroui"
import { CodeBlock } from "@/components/code-block"
import { DocsArticleHeader } from "@/components/docs/docs-article-header"
import { DocsPager } from "@/components/docs-pager"
import { InstallModesMatrix } from "@/components/install-modes-matrix"
import Link from "next/link"
import { docsPageMetadata } from "@/lib/docs-metadata"
import { getPseoPage } from "@/lib/pseo"

export const metadata: Metadata = docsPageMetadata({
  title: "Installation",
  description:
    "Init shadcn, add @atroui blocks, and troubleshoot Tailwind / Host API setup.",
  path: "/docs/installation",
})

export default function InstallationPage() {
  const pseo = getPseoPage("/docs/installation")

  return (
    <article className="space-y-10">
      <DocsArticleHeader
        eyebrow="Getting started"
        title="Installation"
        lede={
          <>
            Prerequisites, the happy path (<code>init</code> →{" "}
            <code>add @atroui/…</code>), what lands in your repo, and how to fix
            the usual failures. Best with Next.js and Tailwind CSS v4.
          </>
        }
      />

      <section className="space-y-4">
        <h2 className="docs-section-title" id="prerequisites">
          1. Prerequisites
        </h2>
        <ul className="list-disc space-y-2 pl-5 text-[15px] text-muted-foreground">
          <li>
            <strong className="text-foreground">Next.js</strong> app (App Router
            preferred)
          </li>
          <li>
            <strong className="text-foreground">Tailwind CSS v4</strong> — not
            v3 <code className="rounded-md bg-muted px-1.5 py-0.5 font-mono text-[12px] text-foreground">@apply</code>{" "}
            / opacity syntax
          </li>
          <li>
            A{" "}
            <code className="rounded-md bg-muted px-1.5 py-0.5 font-mono text-[12px] text-foreground">
              components.json
            </code>{" "}
            from shadcn init (next step if missing)
          </li>
        </ul>
      </section>

      <section className="space-y-4">
        <h2 className="docs-section-title" id="init">
          2. Init shadcn
        </h2>
        <CodeBlock language="bash" code={`npx shadcn@latest init`} />
        <p className="text-[15px] leading-relaxed text-muted-foreground">
          Dark-first tokens that match the catalog:{" "}
          <Link href="/docs/theming" className="bam-link">
            Theming
          </Link>
          .
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="docs-section-title" id="add">
          3. Add a component
        </h2>
        <p className="text-[15px] leading-relaxed text-muted-foreground">
          <code className="rounded-md bg-muted px-1.5 py-0.5 font-mono text-[12px] text-foreground">
            @atroui
          </code>{" "}
          is in the{" "}
          <a
            href="https://ui.shadcn.com/docs/directory?q=atroui"
            className="bam-link"
            target="_blank"
            rel="noopener noreferrer"
          >
            official shadcn registry directory
          </a>
          . No manual{" "}
          <code className="rounded-md bg-muted px-1.5 py-0.5 font-mono text-[12px] text-foreground">
            registry add
          </code>{" "}
          URL step.
        </p>
        <CodeBlock
          language="bash"
          code={`npx shadcn@latest add @atroui/home-hero`}
        />
        <p className="text-[15px] leading-relaxed text-muted-foreground">
          Add more when you need them:
        </p>
        <CodeBlock
          language="bash"
          code={`npx shadcn@latest add @atroui/site-header
npx shadcn@latest add @atroui/faq
npx shadcn@latest add @atroui/site-footer`}
        />
      </section>

      <section className="space-y-4">
        <h2 className="docs-section-title" id="what-landed">
          4. What landed in the repo
        </h2>
        <p className="text-[15px] leading-relaxed text-muted-foreground">
          The CLI copies source into{" "}
          <strong className="font-medium text-foreground">your</strong> project
          (for example{" "}
          <code className="rounded-md bg-muted px-1.5 py-0.5 font-mono text-[12px] text-foreground">
            components/blocks/home-hero.tsx
          </code>
          ). Edit the{" "}
          <code className="rounded-md bg-muted px-1.5 py-0.5 font-mono text-[12px] text-foreground">
            CONTENT
          </code>{" "}
          object at the top. Dependencies resolve as{" "}
          <code className="rounded-md bg-muted px-1.5 py-0.5 font-mono text-[12px] text-foreground">
            @atroui/brand
          </code>
          ,{" "}
          <code className="rounded-md bg-muted px-1.5 py-0.5 font-mono text-[12px] text-foreground">
            @atroui/utils
          </code>
          , and so on. Full map:{" "}
          <Link href="/docs/registry" className="bam-link">
            Registry
          </Link>
          .
        </p>
        <CodeBlock
          language="bash"
          code={`NEXT_PUBLIC_SITE_NAME=Acme
NEXT_PUBLIC_SITE_DOMAIN=acme.test
NEXT_PUBLIC_SITE_EMAIL=hello@acme.test
NEXT_PUBLIC_SITE_URL=https://acme.test`}
        />
        <p className="text-[15px] leading-relaxed text-muted-foreground">
          Optional brand env after adding{" "}
          <code className="rounded-md bg-muted px-1.5 py-0.5 font-mono text-[12px] text-foreground">
            @atroui/brand
          </code>
          . Or edit{" "}
          <code className="rounded-md bg-muted px-1.5 py-0.5 font-mono text-[12px] text-foreground">
            DEFAULT_BRAND
          </code>{" "}
          in the copied file.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="docs-section-title" id="host-api">
          5. When you also need <code>npm i atroui</code>
        </h2>
        <p className="text-[15px] leading-relaxed text-muted-foreground">
          Pure UI stops at step 3. Forms and AI tools that post to{" "}
          <code className="rounded-md bg-muted px-1.5 py-0.5 font-mono text-[12px] text-foreground">
            /api/*
          </code>{" "}
          need the package,{" "}
          <code className="rounded-md bg-muted px-1.5 py-0.5 font-mono text-[12px] text-foreground">
            transpilePackages: [&quot;atroui&quot;]
          </code>
          , matching route handlers, and your keys:
        </p>
        <CodeBlock
          language="bash"
          code={`npm i atroui
# next.config.ts → transpilePackages: ["atroui"]

npx shadcn@latest add @atroui/contact-form @atroui/api-contact`}
        />
        <p className="text-[15px] leading-relaxed text-muted-foreground">
          Env, security defaults, rate limits:{" "}
          <Link href="/docs/host-api" className="bam-link">
            Host APIs
          </Link>
          . Example mail vars:
        </p>
        <CodeBlock
          language="bash"
          code={`CONTACT_EMAIL_TO=hello@acme.test
SMTP_USER=…
SMTP_PASSWORD=…
# or
RESEND_API_KEY=…
RESEND_AUDIENCE_ID=…`}
        />
      </section>

      <section className="space-y-4">
        <h2 className="docs-section-title" id="troubleshooting">
          6. Troubleshooting
        </h2>
        <ul className="list-disc space-y-3 pl-5 text-[15px] text-muted-foreground">
          <li>
            <strong className="text-foreground">Utilities missing after add</strong>{" "}
            — Tailwind cannot see the copied files. Check{" "}
            <code className="rounded-md bg-muted px-1.5 py-0.5 font-mono text-[12px] text-foreground">
              @source
            </code>{" "}
            / content paths. This is host config, not a Host API failure.
          </li>
          <li>
            <strong className="text-foreground">
              <code className="font-mono text-[12px]">503</code> on form or AI
              routes
            </strong>{" "}
            — missing keys in{" "}
            <strong className="text-foreground">your</strong> env. Preview-only
            OG downloads and rule-based scope replies work without keys; full
            generation does not. See{" "}
            <Link href="/docs/host-api" className="bam-link">
              Host APIs
            </Link>
            .
          </li>
          <li>
            <strong className="text-foreground">Wrong Tailwind major</strong> —
            AtroUI targets v4. Do not mix v3 opacity /{" "}
            <code className="rounded-md bg-muted px-1.5 py-0.5 font-mono text-[12px] text-foreground">
              @apply
            </code>{" "}
            habits into the copied files.
          </li>
        </ul>
      </section>

      <section className="space-y-4">
        <h2 className="docs-section-title" id="install-modes">
          Install modes
        </h2>
        <p className="text-[15px] leading-relaxed text-muted-foreground">
          Registry UI vs package Host APIs — when each path applies:
        </p>
        <InstallModesMatrix showCanonicalLink />
        <p className="text-[15px] leading-relaxed text-muted-foreground">
          Why we split them:{" "}
          <Link href="/blog/npm-to-shadcn-registry" className="bam-link">
            npm → shadcn registry
          </Link>
          .
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="docs-section-title" id="host-bound-tools">
          Host-bound tools (optional)
        </h2>
        <p className="text-[15px] leading-relaxed text-muted-foreground">
          OG, thumbnail, and scope chat ship as thin{" "}
          <code className="rounded-md bg-muted px-1.5 py-0.5 font-mono text-[12px] text-foreground">
            app/api/*/route.ts
          </code>{" "}
          files that call{" "}
          <code className="rounded-md bg-muted px-1.5 py-0.5 font-mono text-[12px] text-foreground">
            atroui/api/*
          </code>
          . AtroUI never ships keys.
        </p>
        <CodeBlock
          language="bash"
          code={`npx shadcn@latest add @atroui/og-workspace @atroui/api-generate
npx shadcn@latest add @atroui/thumbnail-workspace @atroui/api-thumbnail
npx shadcn@latest add @atroui/scope-chat @atroui/api-scope

# Your keys only (examples):
HUGGINGFACE_API_KEY=…`}
        />
      </section>

      <section className="space-y-4">
        <h2 className="docs-section-title" id="clone">
          Clone the monorepo
        </h2>
        <p className="text-[15px] leading-relaxed text-muted-foreground">
          Contributing to AtroUI itself:
        </p>
        <CodeBlock
          language="bash"
          code={`git clone https://github.com/atroui/atroui.git
cd atroui
pnpm install
pnpm dev`}
        />
      </section>

      {pseo?.faqs?.length ? (
        <section className="space-y-4 border-t border-border-subtle pt-8">
          <h2 className="docs-section-title">FAQ</h2>
          <dl className="space-y-5">
            {pseo.faqs.map((item) => (
              <div key={item.q}>
                <dt className="text-[15px] font-medium text-foreground">
                  {item.q}
                </dt>
                <dd className="mt-1.5 text-[15px] leading-relaxed text-muted-foreground">
                  {item.a}
                </dd>
              </div>
            ))}
          </dl>
          <FaqJsonLd
            pagePath="/docs/installation"
            items={pseo.faqs.map((item) => ({
              question: item.q,
              answer: item.a,
            }))}
          />
        </section>
      ) : null}
      <DocsPager href="/docs/installation" kind="guides" />
    </article>
  )
}
