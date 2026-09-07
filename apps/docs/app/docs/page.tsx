import type { Metadata } from "next"
import Link from "next/link"
import { Info } from "lucide-react"
import { CodeBlock } from "@/components/code-block"
import { DocsPager } from "@/components/docs-pager"
import { docsPageMetadata } from "@/lib/docs-metadata"

export const metadata: Metadata = docsPageMetadata({
  title: "Getting Started",
  description:
    "AtroUI is a dark-first React / Next.js component catalog. Add components with the shadcn CLI and own the source in your repo.",
  path: "/docs",
})

const nextSteps = [
  {
    title: "Installation",
    body: "Set up the shadcn CLI and add your first block.",
    href: "/docs/installation",
  },
  {
    title: "Components",
    body: "Browse the catalog with live previews.",
    href: "/docs/components",
  },
  {
    title: "Host APIs",
    body: "Wire forms and AI routes with your own keys.",
    href: "/docs/host-api",
  },
  {
    title: "Theming",
    body: "Tokens, dark-first palette, and brand overrides.",
    href: "/docs/theming",
  },
]

/**
 * Docs home — Zed Getting Started shape: title, lede, numbered quick start, calm next links.
 */
export default function DocsIntroPage() {
  return (
    <article className="docs-book-article">
      <header className="docs-book-header">
        <h1 className="docs-book-title">Getting Started</h1>
        <p className="docs-book-lede">
          AtroUI is a dark-first React &amp; Next.js component catalog on the
          official shadcn registry. Add components with the CLI and own the
          source in your repo — no dependency to wrap, no lock-in.
        </p>
      </header>

      <div className="docs-prose">
        <h2 id="what-is-atroui">What is AtroUI?</h2>
        <p>
          AtroUI is a curated catalog of production-ready sections and
          primitives, published under the <code>@atroui</code> namespace. Unlike
          a component library you install as a dependency, the CLI copies real
          source files into your project. You read them, edit them, and ship
          them.
        </p>

        <h2 id="quick-start">Quick start</h2>
        <p>
          Initialize shadcn in your project, then add any block by its registry
          name:
        </p>
        <CodeBlock
          language="bash"
          code={`npx shadcn@latest init
npx shadcn@latest add @atroui/home-hero`}
        />
        <div className="docs-callout">
          <Info
            className="mt-0.5 size-4 shrink-0 text-muted-foreground"
            aria-hidden
          />
          <p className="m-0">
            Best with Tailwind v4. On a fresh Next.js app, run <code>init</code>{" "}
            first so tokens and aliases resolve. Full steps:{" "}
            <Link href="/docs/installation" className="bam-link">
              Installation
            </Link>
            .
          </p>
        </div>

        <h2 id="catalog">How the catalog is organized</h2>
        <ul>
          <li>
            <strong>Primitives</strong> — buttons, forms, motion, logo.
          </li>
          <li>
            <strong>Blocks</strong> — heroes, footers, pricing, FAQ, forms.
            Prefer items tagged <code>CLI</code>.
          </li>
          <li>
            <strong>Tools</strong> — OG images, thumbnails, planners. Often pair
            with Host API routes.
          </li>
          <li>
            <strong>Headless</strong> — analytics and structured data with no
            visible UI.
          </li>
        </ul>

        <h2 id="own-the-files">Own the files</h2>
        <p>
          Every installed block exposes a <code>CONTENT</code> /{" "}
          <code>DEFAULT_BRAND</code> object at the top of the file. Logos,
          headers, footers, and mail defaults stay coherent through{" "}
          <code>getBrand()</code> — one change, not fifty.
        </p>

        <h2 id="host-apis">Host APIs &amp; AI tools</h2>
        <p>
          Blocks tagged <strong>Host API</strong> expect thin{" "}
          <code>/api/*</code> routes with your own keys. This site never spends
          shared LLM or image tokens. See{" "}
          <Link href="/docs/host-api" className="bam-link">
            Host APIs
          </Link>
          .
        </p>

        <h2 id="next-steps">Next steps</h2>
        <p>Pick your path:</p>
      </div>

      <ul className="mt-4 divide-y divide-border-subtle border-y border-border-subtle">
        {nextSteps.map((step) => (
          <li key={step.href}>
            <Link
              href={step.href}
              className="group flex flex-col gap-0.5 py-3.5 sm:flex-row sm:items-baseline sm:justify-between sm:gap-8"
            >
              <span className="text-[15px] font-medium text-foreground">
                {step.title}
              </span>
              <span className="text-[13px] text-muted-foreground sm:text-right">
                {step.body}
              </span>
            </Link>
          </li>
        ))}
      </ul>

      <DocsPager href="/docs" kind="guides" />
    </article>
  )
}
