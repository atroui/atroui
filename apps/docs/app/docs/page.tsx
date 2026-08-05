import type { Metadata } from "next"
import Link from "next/link"
import { CodeBlock } from "@/components/code-block"
import { docsPageMetadata } from "@/lib/docs-metadata"

export const metadata: Metadata = docsPageMetadata({
  title: "Introduction",
  description:
    "AtroUI is a dark-first React / Next.js component catalog at atroui.com. Add components with the shadcn CLI and own the source in your repo.",
  path: "/docs",
})

export default function DocsIntroPage() {
  return (
    <article className="mx-auto max-w-3xl space-y-10">
      <header>
        <p className="ms-stamp mb-3">Getting started</p>
        <h1 className="ds-display text-3xl text-foreground sm:text-4xl">
          Introduction
        </h1>
        <p className="mt-3 max-w-2xl text-[15px] font-light leading-relaxed text-muted-foreground">
          AtroUI is the React / Next.js component catalog at{" "}
          <strong className="font-medium text-foreground">atroui.com</strong>.
          Dark-first design system: black canvas, electric blue brand, glass
          surfaces, and rounded CTAs. You install it like shadcn/ui - the CLI
          copies source into your project.
        </p>
      </header>

      <section className="md-glass space-y-3 p-5">
        <h2 className="ds-headline text-base text-foreground">Design base</h2>
        <p className="text-[15px] font-light leading-relaxed text-muted-foreground">
          Product chrome follows the Digital Success hero language - cyan/blue
          shader accents, white primary pills, and blur panels. Catalog demos
          may still show the apps they shipped in; that&rsquo;s intentional
          portfolio context.
        </p>
      </section>

      <section className="md-glass space-y-3 p-5">
        <h2 className="ds-headline text-base text-foreground">Own the files</h2>
        <p className="text-[15px] font-light leading-relaxed text-muted-foreground">
          Add sections from the{" "}
          <Link href="/docs/registry" className="bam-link">
            Registry
          </Link>
          . Edit{" "}
          <code className="rounded-md bg-muted px-1.5 py-0.5 font-mono text-[12px] text-foreground">
            CONTENT
          </code>{" "}
          /{" "}
          <code className="rounded-md bg-muted px-1.5 py-0.5 font-mono text-[12px] text-foreground">
            DEFAULT_BRAND
          </code>{" "}
          in the installed files, or set{" "}
          <code className="rounded-md bg-muted px-1.5 py-0.5 font-mono text-[12px] text-foreground">
            NEXT_PUBLIC_SITE_*
          </code>
          . Logo, headers, footers, and mail defaults stay coherent through{" "}
          <code className="rounded-md bg-muted px-1.5 py-0.5 font-mono text-[12px] text-foreground">
            getBrand()
          </code>
          .
        </p>
      </section>

      <section className="md-glass space-y-3 p-5">
        <h2 className="ds-headline text-base text-foreground">
          Host APIs &amp; AI tools
        </h2>
        <p className="text-[15px] font-light leading-relaxed text-muted-foreground">
          Tools tagged Host API (OG workspace, thumbnails, scope chat, forms)
          expect you to wire{" "}
          <code className="rounded-md bg-muted px-1.5 py-0.5 font-mono text-[12px] text-foreground">
            /api/*
          </code>{" "}
          and your own keys. This docs site does not burn shared LLM / image
          API tokens. Want sample OG output without setup? Try the live tool at{" "}
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
        <h2 className="ds-headline text-base text-foreground">Quick start</h2>
        <CodeBlock
          language="bash"
          code={`npx shadcn@latest init
npx shadcn@latest registry add @atroui=https://www.atroui.com/r/{name}.json
npx shadcn@latest add @atroui/home-hero`}
        />
        <p className="text-[15px] leading-relaxed text-muted-foreground">
          Full steps:{" "}
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

      <div className="flex flex-wrap gap-3 pt-1">
        <Link href="/docs/registry" className="ms-cta">
          Own the UI
        </Link>
        <Link href="/docs/installation" className="ms-cta-ghost">
          Installation
        </Link>
        <Link href="/docs/components" className="ms-cta-ghost">
          Browse components
        </Link>
        <Link href="/blog" className="ms-cta-ghost">
          Blog
        </Link>
      </div>
    </article>
  )
}
