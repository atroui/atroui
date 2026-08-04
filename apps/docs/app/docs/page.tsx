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
        <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-muted-foreground">
          Meridian is the personal catalog of components Koustav ships across
          projects — starting with Makershot / ogsaas. Not a generic UI kit.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="ds-headline text-base text-foreground">Source of truth</h2>
        <p className="text-[15px] leading-relaxed text-muted-foreground">
          Components live in{" "}
          <code className="rounded-md bg-muted px-1.5 py-0.5 font-mono text-[12px] text-foreground">
            packages/ui
          </code>
          , copied from the ogsaas / Makershot codebase. That source repo is
          never modified by this library.
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
        <Link href="/docs/components" className="ms-cta-ghost border border-border-subtle px-5">
          Browse components
        </Link>
      </div>
    </article>
  )
}
