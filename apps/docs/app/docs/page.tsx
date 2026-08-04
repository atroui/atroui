import type { Metadata } from "next"
import Link from "next/link"
import { CodeBlock } from "@/components/code-block"

export const metadata: Metadata = {
  title: "Introduction",
}

export default function DocsIntroPage() {
  return (
    <article className="mx-auto max-w-3xl space-y-10">
      <header>
        <p className="ms-stamp mb-3">Getting started</p>
        <h1 className="ds-display text-3xl text-foreground sm:text-4xl">
          Introduction
        </h1>
        <p className="mt-3 max-w-2xl text-[15px] font-light leading-relaxed text-muted-foreground">
          AtroUI is a personal component catalog — production UI packaged as{" "}
          <code className="rounded-md bg-muted px-1.5 py-0.5 font-mono text-[12px] text-foreground">
            atroui
          </code>
          . The design system is dark-first: black canvas, electric blue brand,
          glass surfaces, and rounded CTAs.
        </p>
      </header>

      <section className="md-glass space-y-3 p-5">
        <h2 className="ds-headline text-base text-foreground">Design base</h2>
        <p className="text-[15px] font-light leading-relaxed text-muted-foreground">
          Product chrome follows the Digital Success hero language — cyan/blue
          shader accents, white primary pills, and blur panels. Catalog demos
          may still show the apps they shipped in; that&rsquo;s intentional
          portfolio context.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="ds-headline text-base text-foreground">Quick start</h2>
        <CodeBlock language="bash" code={`pnpm install\npnpm dev`} />
      </section>

      <div className="flex flex-wrap gap-3 pt-1">
        <Link href="/docs/installation" className="ms-cta">
          Installation
        </Link>
        <Link href="/docs/components" className="ms-cta-ghost">
          Browse components
        </Link>
      </div>
    </article>
  )
}
