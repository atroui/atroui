import type { Metadata } from "next"
import { CodeBlock } from "@/components/code-block"
import Link from "next/link"
import { docsPageMetadata } from "@/lib/docs-metadata"

export const metadata: Metadata = docsPageMetadata({
  title: "Installation",
  description:
    "Add AtroUI with the shadcn CLI. Components copy into your repo so you own the source - same model as shadcn/ui.",
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
            shadcn-compatible registry
          </strong>
          . Run the CLI, components land in your project, and you edit{" "}
          <code className="rounded-md bg-muted px-1.5 py-0.5 font-mono text-[12px] text-foreground">
            CONTENT
          </code>{" "}
          at the top of each file. Works best with Next.js, Tailwind CSS v4, and
          a dark-friendly token sheet.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="ds-headline text-base text-foreground">
          1. Init shadcn (if needed)
        </h2>
        <CodeBlock language="bash" code={`npx shadcn@latest init`} />
        <p className="text-[15px] leading-relaxed text-muted-foreground">
          You need a{" "}
          <code className="rounded-md bg-muted px-1.5 py-0.5 font-mono text-[12px] text-foreground">
            components.json
          </code>{" "}
          in the app. See the{" "}
          <Link href="/docs/theming" className="bam-link">
            Theming
          </Link>{" "}
          guide for dark-first tokens that match the catalog.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="ds-headline text-base text-foreground">
          2. Add the AtroUI registry
        </h2>
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
      </section>

      <section className="space-y-4">
        <h2 className="ds-headline text-base text-foreground">
          3. Add a component
        </h2>
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
          ). Open the file and edit the constants at the top. Dependencies
          resolve as{" "}
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
          4. Forms + Host APIs
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
npx shadcn@latest add @atroui/contact-form @atroui/api-contact
npx shadcn@latest add @atroui/waitlist-form @atroui/api-waitlist
npx shadcn@latest add @atroui/newsletter-form @atroui/api-newsletter`}
        />
        <p className="text-[15px] leading-relaxed text-muted-foreground">
          Then set mail env (SMTP and/or Resend). See{" "}
          <code className="rounded-md bg-muted px-1.5 py-0.5 font-mono text-[12px] text-foreground">
            .env.example
          </code>{" "}
          in the repo. Multi-instance production should replace the in-memory
          rate limiter with Upstash / Vercel KV.
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
            @atroui/brand
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
        <h2 className="ds-headline text-base text-foreground">Host-bound tools</h2>
        <p className="text-[15px] leading-relaxed text-muted-foreground">
          Forms ship with optional API routes (step 4). OG workspace, thumbnail
          workspace, and scope chat still expect your own{" "}
          <code className="rounded-md bg-muted px-1.5 py-0.5 font-mono text-[12px] text-foreground">
            /api/generate
          </code>
          ,{" "}
          <code className="rounded-md bg-muted px-1.5 py-0.5 font-mono text-[12px] text-foreground">
            /api/thumbnail
          </code>
          , and{" "}
          <code className="rounded-md bg-muted px-1.5 py-0.5 font-mono text-[12px] text-foreground">
            /api/scope
          </code>{" "}
          until wave-2 handlers land. Marked{" "}
          <span className="font-medium text-foreground">Host API</span> in the
          sidebar. Live OG sample without wiring keys here:{" "}
          <a
            href="https://www.makershot.tech/og"
            target="_blank"
            rel="noopener noreferrer"
            className="text-brand underline underline-offset-2"
          >
            makershot.tech/og
          </a>
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
