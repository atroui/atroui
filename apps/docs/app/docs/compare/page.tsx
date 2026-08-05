import type { Metadata } from "next"
import Link from "next/link"
import { docsPageMetadata } from "@/lib/docs-metadata"

export const metadata: Metadata = docsPageMetadata({
  title: "AtroUI vs copy-paste kits",
  description:
    "How AtroUI differs from primitives-only copy-paste UI kits - production sections, brand chrome, dark-first tokens, and Host API tools.",
  path: "/docs/compare",
})

export default function ComparePage() {
  return (
    <article className="mx-auto max-w-3xl space-y-10">
      <header>
        <p className="ms-stamp mb-3">Compare</p>
        <h1 className="ds-display text-3xl text-foreground sm:text-4xl">
          AtroUI vs copy-paste kits
        </h1>
        <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-muted-foreground">
          Clear differences - not trash talk. Choose the tool that matches how
          you ship.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="ds-headline text-base text-foreground">
          What AtroUI is
        </h2>
        <p className="text-[15px] leading-relaxed text-muted-foreground">
          A{" "}
          <strong className="font-medium text-foreground">
            production component catalog
          </strong>{" "}
          for React / Next.js: dark-first tokens, site chrome, marketing
          sections, headless SEO helpers, and optional Host API tools (OG,
          thumbnails, scope) that expect your own backends.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="ds-headline text-base text-foreground">
          What copy-paste kits optimize for
        </h2>
        <p className="text-[15px] leading-relaxed text-muted-foreground">
          Many kits excel at{" "}
          <strong className="font-medium text-foreground">
            primitives you own in your repo
          </strong>{" "}
          - buttons, dialogs, forms - generated into your codebase. That is a
          strong workflow for greenfield design systems you maintain yourself.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="ds-headline text-base text-foreground">Where AtroUI differs</h2>
        <ul className="list-disc space-y-2 pl-5 text-[15px] text-muted-foreground">
          <li>
            <strong className="text-foreground">Sections, not only atoms</strong>{" "}
            - heroes, who bands, footers, CTAs shaped by shipped products.
          </li>
          <li>
            <strong className="text-foreground">Brand chrome</strong> -{" "}
            <code className="rounded-md bg-muted px-1.5 py-0.5 font-mono text-[12px]">
              getBrand()
            </code>{" "}
            + env overrides so logos, SEO, and mail defaults stay coherent.
          </li>
          <li>
            <strong className="text-foreground">Dark-first system</strong> -
            tokens and surfaces designed for black-canvas products.
          </li>
          <li>
            <strong className="text-foreground">Host API tools</strong> -
            workspaces that call your{" "}
            <code className="rounded-md bg-muted px-1.5 py-0.5 font-mono text-[12px]">
              /api/*
            </code>{" "}
            with BYOK; docs do not burn shared LLM keys.
          </li>
          <li>
            <strong className="text-foreground">npm package</strong> - consume{" "}
            <code className="rounded-md bg-muted px-1.5 py-0.5 font-mono text-[12px]">
              atroui
            </code>{" "}
            as a dependency; fork or copy when you need full ownership.
          </li>
        </ul>
      </section>

      <section className="space-y-4">
        <h2 className="ds-headline text-base text-foreground">When to pick which</h2>
        <p className="text-[15px] leading-relaxed text-muted-foreground">
          Prefer a kit if you want every file in your monorepo and a blank visual
          slate. Prefer AtroUI if you want a ready dark catalog, production
          sections, and brandable chrome with a clear home at{" "}
          <a href="https://atroui.com" className="bam-link">
            atroui.com
          </a>
          .
        </p>
      </section>

      <div className="flex flex-wrap gap-3 pt-2">
        <Link href="/docs/installation" className="ms-cta">
          Install AtroUI
        </Link>
        <Link href="/blog/what-is-atroui" className="ms-cta-ghost">
          What is AtroUI?
        </Link>
      </div>
    </article>
  )
}
