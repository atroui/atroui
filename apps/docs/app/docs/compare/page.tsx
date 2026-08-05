import type { Metadata } from "next"
import Link from "next/link"
import { docsPageMetadata } from "@/lib/docs-metadata"

export const metadata: Metadata = docsPageMetadata({
  title: "AtroUI vs copy-paste kits",
  description:
    "How AtroUI differs from primitives-only kits - production sections via the shadcn registry, brand chrome, and dark-first tokens.",
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
          for React / Next.js, delivered the shadcn way: dark-first sections,
          site chrome, and optional Host API tools that expect your own
          backends. You add components with the CLI; source lives in your repo.
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
            <strong className="text-foreground">Same ownership model</strong> -{" "}
            <code className="rounded-md bg-muted px-1.5 py-0.5 font-mono text-[12px]">
              npx shadcn add @atroui/…
            </code>{" "}
            copies source into your project. Edit{" "}
            <code className="rounded-md bg-muted px-1.5 py-0.5 font-mono text-[12px]">
              CONTENT
            </code>{" "}
            at the top of each file. See the{" "}
            <Link href="/docs/registry" className="bam-link">
              Registry
            </Link>{" "}
            guide.
          </li>
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
        </ul>
      </section>

      <section className="space-y-4">
        <h2 className="ds-headline text-base text-foreground">When to pick which</h2>
        <p className="text-[15px] leading-relaxed text-muted-foreground">
          Prefer a blank-slate kit if you want every primitive from scratch.
          Prefer AtroUI when you want a ready dark catalog with the same
          copy-into-repo workflow. Start at the{" "}
          <Link href="/docs/registry" className="bam-link">
            registry
          </Link>
          . Home:{" "}
          <a href="https://www.atroui.com" className="bam-link">
            www.atroui.com
          </a>
          .
        </p>
      </section>

      <div className="flex flex-wrap gap-3 pt-2">
        <Link href="/docs/registry" className="ms-cta">
          Own the UI
        </Link>
        <Link href="/docs/installation" className="ms-cta-ghost">
          Installation
        </Link>
        <Link href="/blog/atroui-vs-shadcn" className="ms-cta-ghost">
          AtroUI vs shadcn/ui
        </Link>
      </div>
    </article>
  )
}
