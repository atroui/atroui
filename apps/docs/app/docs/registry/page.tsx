import type { Metadata } from "next"
import Link from "next/link"
import { CodeBlock } from "@/components/code-block"
import { docsPageMetadata } from "@/lib/docs-metadata"

export const metadata: Metadata = docsPageMetadata({
  title: "Registry",
  description:
    "Install AtroUI components into your repo with the shadcn CLI. Own the source - edit code, content, and design freely.",
  path: "/docs/registry",
})

export default function RegistryPage() {
  return (
    <article className="mx-auto max-w-3xl space-y-10">
      <header>
        <p className="ms-stamp mb-3">Getting started</p>
        <h1 className="ds-display text-3xl text-foreground sm:text-4xl">
          Registry
        </h1>
        <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-muted-foreground">
          AtroUI ships a shadcn-compatible registry. Components are copied into
          your project so you can edit code, content, and design - the same
          ownership model as shadcn/ui. Registry items match the docs catalog
          look; change{" "}
          <code className="rounded-md bg-muted px-1.5 py-0.5 font-mono text-[12px] text-foreground">
            CONTENT
          </code>{" "}
          /{" "}
          <code className="rounded-md bg-muted px-1.5 py-0.5 font-mono text-[12px] text-foreground">
            DEFAULT_BRAND
          </code>{" "}
          in the installed files to make them yours.
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
          in the app. Tailwind CSS v4 and a dark-friendly token sheet (AtroUI{" "}
          <code className="rounded-md bg-muted px-1.5 py-0.5 font-mono text-[12px] text-foreground">
            globals.css
          </code>{" "}
          or your own) work best.
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
npx shadcn@latest add @atroui/home-principle
npx shadcn@latest add @atroui/pricing-overview
npx shadcn@latest add @atroui/contact-form`}
        />
        <p className="text-[15px] leading-relaxed text-muted-foreground">
          Source files land under your aliases (for example{" "}
          <code className="rounded-md bg-muted px-1.5 py-0.5 font-mono text-[12px] text-foreground">
            components/blocks/home-hero.tsx
          </code>
          ). Open the file and edit the{" "}
          <code className="rounded-md bg-muted px-1.5 py-0.5 font-mono text-[12px] text-foreground">
            CONTENT
          </code>{" "}
          /{" "}
          <code className="rounded-md bg-muted px-1.5 py-0.5 font-mono text-[12px] text-foreground">
            NAV
          </code>{" "}
          constants at the top - that is the point. Dependencies resolve as{" "}
          <code className="rounded-md bg-muted px-1.5 py-0.5 font-mono text-[12px] text-foreground">
            @atroui/brand
          </code>
          ,{" "}
          <code className="rounded-md bg-muted px-1.5 py-0.5 font-mono text-[12px] text-foreground">
            @atroui/utils
          </code>
          , etc. (not bare names on the default shadcn registry).
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="ds-headline text-base text-foreground">Catalog</h2>
        <ul className="list-disc space-y-2 pl-5 text-[15px] text-muted-foreground">
          <li>
            Libs:{" "}
            <code className="font-mono text-[12px] text-foreground">
              @atroui/utils
            </code>
            ,{" "}
            <code className="font-mono text-[12px] text-foreground">
              @atroui/brand
            </code>
          </li>
          <li>
            UI:{" "}
            <code className="font-mono text-[12px] text-foreground">
              @atroui/button
            </code>
            ,{" "}
            <code className="font-mono text-[12px] text-foreground">
              @atroui/theme-toggle
            </code>
            ,{" "}
            <code className="font-mono text-[12px] text-foreground">
              @atroui/logo
            </code>
          </li>
          <li>
            Chrome:{" "}
            <code className="font-mono text-[12px] text-foreground">
              @atroui/site-header
            </code>
            ,{" "}
            <code className="font-mono text-[12px] text-foreground">
              @atroui/footer-bold
            </code>
          </li>
          <li>
            Home:{" "}
            <code className="font-mono text-[12px] text-foreground">
              @atroui/home-hero
            </code>
            ,{" "}
            <code className="font-mono text-[12px] text-foreground">
              @atroui/home-who
            </code>
            ,{" "}
            <code className="font-mono text-[12px] text-foreground">
              @atroui/home-principle
            </code>
            ,{" "}
            <code className="font-mono text-[12px] text-foreground">
              @atroui/home-work
            </code>
            ,{" "}
            <code className="font-mono text-[12px] text-foreground">
              @atroui/home-lab
            </code>
          </li>
          <li>
            Convert:{" "}
            <code className="font-mono text-[12px] text-foreground">
              @atroui/pricing-overview
            </code>
            ,{" "}
            <code className="font-mono text-[12px] text-foreground">
              @atroui/contextual-cta
            </code>
            ,{" "}
            <code className="font-mono text-[12px] text-foreground">
              @atroui/exit-intent-popup
            </code>
            ,{" "}
            <code className="font-mono text-[12px] text-foreground">
              @atroui/contact-form
            </code>
          </li>
        </ul>
        <p className="text-[15px] leading-relaxed text-muted-foreground">
          Browse the catalog JSON at{" "}
          <a
            href="/r/registry.json"
            className="bam-link"
            target="_blank"
            rel="noreferrer"
          >
            /r/registry.json
          </a>
          .
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="ds-headline text-base text-foreground">
          npm package vs registry
        </h2>
        <p className="text-[15px] leading-relaxed text-muted-foreground">
          <code className="rounded-md bg-muted px-1.5 py-0.5 font-mono text-[12px] text-foreground">
            npm i atroui
          </code>{" "}
          is still useful for tokens (
          <code className="rounded-md bg-muted px-1.5 py-0.5 font-mono text-[12px] text-foreground">
            atroui/globals.css
          </code>
          ), ThemeProvider, and tools you do not need to fork. Prefer the
          registry when you want to own and edit a section&apos;s source. See{" "}
          <Link href="/docs/compare" className="bam-link">
            Compare
          </Link>{" "}
          and{" "}
          <Link href="/docs/installation" className="bam-link">
            Installation
          </Link>
          .
        </p>
      </section>
    </article>
  )
}
