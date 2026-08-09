import type { Metadata } from "next"
import { CodeBlock } from "@/components/code-block"
import { InstallModesMatrix } from "@/components/install-modes-matrix"
import Link from "next/link"
import { docsPageMetadata } from "@/lib/docs-metadata"

export const metadata: Metadata = docsPageMetadata({
  title: "Installation",
  description:
    "Add AtroUI with the AtroUI CLI or the shadcn CLI. Components copy into your repo so you own the source.",
  path: "/docs/installation",
})

export default function InstallationPage() {
  return (
    <article className="mx-auto max-w-3xl space-y-10">
      <header>
        <p className="ms-stamp mb-3">Getting started</p>
        <h1 className="ds-display text-3xl text-foreground sm:text-4xl">
          Installation
        </h1>
        <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-muted-foreground">
          AtroUI ships as a{" "}
          <strong className="font-medium text-foreground">
            public registry
          </strong>{" "}
          at{" "}
          <code className="rounded-md bg-muted px-1.5 py-0.5 font-mono text-[12px] text-foreground">
            www.atroui.com/r
          </code>
          . Install with the{" "}
          <strong className="font-medium text-foreground">AtroUI CLI</strong>{" "}
          or the{" "}
          <strong className="font-medium text-foreground">shadcn CLI</strong>.
          Either way, source lands in your project and you edit{" "}
          <code className="rounded-md bg-muted px-1.5 py-0.5 font-mono text-[12px] text-foreground">
            CONTENT
          </code>{" "}
          at the top of each file. Works best with Next.js, Tailwind CSS v4, and
          a dark-friendly token sheet.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="ds-headline text-base text-foreground">
          Mode A: AtroUI CLI (no shadcn required)
        </h2>
        <p className="text-[15px] leading-relaxed text-muted-foreground">
          First-party installer. Same registry JSON. No{" "}
          <code className="rounded-md bg-muted px-1.5 py-0.5 font-mono text-[12px] text-foreground">
            components.json
          </code>{" "}
          required.
        </p>
        <CodeBlock
          language="bash"
          code={`# Add one or more items (resolves @atroui/* registry deps)
npx @atroui/cli@latest add home-hero

# Interactive picker
npx @atroui/cli@latest add

# Browse the catalog
npx @atroui/cli@latest list`}
        />
        <p className="text-[15px] leading-relaxed text-muted-foreground">
          Files write under{" "}
          <code className="rounded-md bg-muted px-1.5 py-0.5 font-mono text-[12px] text-foreground">
            src/
          </code>{" "}
          when your app uses a{" "}
          <code className="rounded-md bg-muted px-1.5 py-0.5 font-mono text-[12px] text-foreground">
            src
          </code>{" "}
          layout (or{" "}
          <code className="rounded-md bg-muted px-1.5 py-0.5 font-mono text-[12px] text-foreground">
            @/*
          </code>{" "}
          maps there). Missing npm dependencies are installed with your package
          manager. See{" "}
          <Link href="/docs/theming" className="bam-link">
            Theming
          </Link>{" "}
          for dark-first tokens that match the catalog.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="ds-headline text-base text-foreground">
          Mode B: shadcn CLI
        </h2>
        <p className="text-[15px] leading-relaxed text-muted-foreground">
          Same registry, via the shadcn toolchain. Useful if you already use
          shadcn or want{" "}
          <code className="rounded-md bg-muted px-1.5 py-0.5 font-mono text-[12px] text-foreground">
            components.json
          </code>
          .
        </p>
        <CodeBlock language="bash" code={`npx shadcn@latest init`} />
        <CodeBlock
          language="bash"
          code={`npx shadcn@latest registry add @atroui=https://www.atroui.com/r/{name}.json`}
        />
        <p className="text-[15px] leading-relaxed text-muted-foreground">
          Or add this to{" "}
          <code className="rounded-md bg-muted px-1.5 py-0.5 font-mono text-[12px] text-foreground">
            components.json
          </code>
          :
        </p>
        <CodeBlock
          language="json"
          code={`{
  "registries": {
    "@atroui": "https://www.atroui.com/r/{name}.json"
  }
}`}
        />
        <CodeBlock
          language="bash"
          code={`npx shadcn@latest add @atroui/home-hero
npx shadcn@latest add @atroui/site-header
npx shadcn@latest add @atroui/faq
npx shadcn@latest add @atroui/site-footer`}
        />
        <p className="text-[15px] leading-relaxed text-muted-foreground">
          Source files land under your aliases (for example{" "}
          <code className="rounded-md bg-muted px-1.5 py-0.5 font-mono text-[12px] text-foreground">
            components/blocks/home-hero.tsx
          </code>
          ). Dependencies resolve as{" "}
          <code className="rounded-md bg-muted px-1.5 py-0.5 font-mono text-[12px] text-foreground">
            @atroui/brand
          </code>
          ,{" "}
          <code className="rounded-md bg-muted px-1.5 py-0.5 font-mono text-[12px] text-foreground">
            @atroui/utils
          </code>
          , and so on. Full catalog:{" "}
          <Link href="/docs/registry" className="bam-link">
            Registry
          </Link>
          .
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="ds-headline text-base text-foreground">
          Forms + Host APIs
        </h2>
        <p className="text-[15px] leading-relaxed text-muted-foreground">
          Contact, waitlist, and newsletter UIs post to{" "}
          <code className="rounded-md bg-muted px-1.5 py-0.5 font-mono text-[12px] text-foreground">
            /api/*
          </code>
          . Install the matching route handlers (they call{" "}
          <code className="rounded-md bg-muted px-1.5 py-0.5 font-mono text-[12px] text-foreground">
            atroui/api/*
          </code>{" "}
          with honeypot checks, body caps, and in-memory rate limits):
        </p>
        <CodeBlock
          language="bash"
          code={`npm i atroui
# next.config.ts → transpilePackages: ["atroui"]

# AtroUI CLI
npx @atroui/cli@latest add contact-form api-contact

# or shadcn CLI
npx shadcn@latest add @atroui/contact-form @atroui/api-contact`}
        />
        <p className="text-[15px] leading-relaxed text-muted-foreground">
          Then set mail env (SMTP and/or Resend). Full Host API guide (env,
          security defaults, rate limits):{" "}
          <Link href="/docs/host-api" className="bam-link">
            Host APIs
          </Link>
          . See also{" "}
          <code className="rounded-md bg-muted px-1.5 py-0.5 font-mono text-[12px] text-foreground">
            .env.example
          </code>{" "}
          in the repo.
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
        <h2 className="ds-headline text-base text-foreground">Brand overrides</h2>
        <p className="text-[15px] leading-relaxed text-muted-foreground">
          After adding{" "}
          <code className="rounded-md bg-muted px-1.5 py-0.5 font-mono text-[12px] text-foreground">
            brand
          </code>
          , edit{" "}
          <code className="rounded-md bg-muted px-1.5 py-0.5 font-mono text-[12px] text-foreground">
            DEFAULT_BRAND
          </code>{" "}
          or set{" "}
          <code className="rounded-md bg-muted px-1.5 py-0.5 font-mono text-[12px] text-foreground">
            NEXT_PUBLIC_SITE_*
          </code>{" "}
          in the host:
        </p>
        <CodeBlock
          language="bash"
          code={`NEXT_PUBLIC_SITE_NAME=Acme
NEXT_PUBLIC_SITE_DOMAIN=acme.test
NEXT_PUBLIC_SITE_EMAIL=hello@acme.test
NEXT_PUBLIC_SITE_URL=https://acme.test`}
        />
      </section>

      <section className="space-y-4">
        <h2 className="ds-headline text-base text-foreground">
          Install modes
        </h2>
        <InstallModesMatrix showCanonicalLink />
        <p className="text-[15px] leading-relaxed text-muted-foreground">
          Why we split registry UI from the package:{" "}
          <Link href="/blog/npm-to-shadcn-registry" className="bam-link">
            npm → shadcn registry migration
          </Link>
          .
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="ds-headline text-base text-foreground">Host-bound tools</h2>
        <p className="text-[15px] leading-relaxed text-muted-foreground">
          Forms and AI tool routes ship as thin{" "}
          <code className="rounded-md bg-muted px-1.5 py-0.5 font-mono text-[12px] text-foreground">
            app/api/*/route.ts
          </code>{" "}
          files that call{" "}
          <code className="rounded-md bg-muted px-1.5 py-0.5 font-mono text-[12px] text-foreground">
            atroui/api/*
          </code>
          . AtroUI never ships API keys and does not run paid AI on atroui.com -
          you set keys in{" "}
          <strong className="font-medium text-foreground">your</strong> env.
        </p>
        <CodeBlock
          language="bash"
          code={`npm i atroui
# next.config.ts → transpilePackages: ["atroui"]

npx @atroui/cli@latest add og-workspace api-generate
# or: npx shadcn@latest add @atroui/og-workspace @atroui/api-generate

# Your keys only (examples):
HUGGINGFACE_API_KEY=…
# GEMINI_API_KEY=…          # optional freeform / Pro image
# XAI_API_KEY=…             # optional scope LLM + thumbnail Pro pipeline`}
        />
        <p className="text-[15px] leading-relaxed text-muted-foreground">
          Preview-only OG/thumbnail downloads and rule-based scope replies work
          without keys. Full AI generation returns{" "}
          <code className="rounded-md bg-muted px-1.5 py-0.5 font-mono text-[12px] text-foreground">
            503
          </code>{" "}
          until you configure providers. Marked{" "}
          <span className="font-medium text-foreground">Host API</span> in the
          sidebar. Details on{" "}
          <Link href="/docs/host-api" className="bam-link">
            Host APIs
          </Link>
          .
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="ds-headline text-base text-foreground">
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
    </article>
  )
}
