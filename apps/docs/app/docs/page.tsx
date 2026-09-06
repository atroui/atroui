import type { Metadata } from "next"
import Link from "next/link"
import { ArrowUpRight, Info } from "lucide-react"
import { CodeBlock } from "@/components/code-block"
import { docsPageMetadata } from "@/lib/docs-metadata"

export const metadata: Metadata = docsPageMetadata({
  title: "Introduction",
  description:
    "AtroUI is a dark-first React / Next.js component catalog at atroui.com. Add components with the shadcn CLI and own the source in your repo.",
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

export default function DocsIntroPage() {
  return (
    <article className="mx-auto max-w-3xl">
      <header className="border-b border-border-subtle pb-8">
        <p className="ds-mono-label mb-3">Getting Started</p>
        <h1 className="ds-headline text-3xl text-foreground sm:text-4xl">
          Introduction
        </h1>
        <p className="ds-lede mt-4 max-w-2xl">
          AtroUI is a dark-first React &amp; Next.js component catalog on the
          official shadcn registry. Add components with the CLI and own the
          source in your repo — no dependency to wrap, no lock-in.
        </p>
      </header>

      <div className="docs-prose mt-8">
        <h2 id="what-is-atroui">What is AtroUI?</h2>
        <p>
          AtroUI is a curated catalog of production-ready sections and
          primitives, published to the official{" "}
          <Link href="/docs/registry" className="bam-link">
            shadcn registry
          </Link>{" "}
          under the <code>@atroui</code> namespace. It ships a coherent
          dark-first design system — a black canvas, an electric-blue brand,
          glass surfaces, and soft-rect CTAs — tuned for{" "}
          <strong>Tailwind CSS v4</strong>.
        </p>
        <p>
          Unlike a component <em>library</em> you install as a dependency, the
          CLI copies real source files into your project. You read them, edit
          them, and ship them. AtroUI never sits between your app and the
          runtime.
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
          <Info className="mt-0.5 size-4 shrink-0 text-brand" aria-hidden />
          <p className="m-0">
            AtroUI is best with Tailwind v4. If you are on a fresh Next.js app,
            run <code>init</code> first so tokens and aliases resolve. Full
            steps live in the{" "}
            <Link href="/docs/installation" className="bam-link">
              Installation
            </Link>{" "}
            guide.
          </p>
        </div>

        <h2 id="how-the-catalog-is-organized">How the catalog is organized</h2>
        <p>
          The catalog is grouped into four families so you always know where to
          look:
        </p>
        <ul>
          <li>
            <strong>Primitives</strong> — buttons, forms, motion, logo. Small
            reusable pieces.
          </li>
          <li>
            <strong>Blocks</strong> — heroes, footers, pricing, FAQ, forms.
            Production-shaped page sections; prefer items tagged{" "}
            <code>CLI</code> in the sidebar.
          </li>
          <li>
            <strong>Tools</strong> — OG images, thumbnails, planners. These
            often pair with your own Host API routes.
          </li>
          <li>
            <strong>Headless</strong> — analytics and structured data with no
            visible UI.
          </li>
        </ul>

        <h2 id="own-the-files">Own the files</h2>
        <p>
          Every installed block exposes a <code>CONTENT</code> /{" "}
          <code>DEFAULT_BRAND</code> object at the top of the file — edit those,
          or set <code>NEXT_PUBLIC_SITE_*</code> env vars. Logos, headers,
          footers, and mail defaults stay coherent through a single{" "}
          <code>getBrand()</code> helper, so rebranding is one change, not
          fifty.
        </p>

        <h2 id="host-apis">Host APIs &amp; AI tools</h2>
        <p>
          Blocks tagged <strong>Host API</strong> (OG workspace, thumbnails,
          scope chat, contact and waitlist forms) expect you to wire{" "}
          <code>/api/*</code> routes with your own keys. This documentation site
          never spends shared LLM or image tokens. See the{" "}
          <Link href="/docs/host-api" className="bam-link">
            Host APIs
          </Link>{" "}
          guide for the BYOK setup.
        </p>

        <h2 id="next-steps">Next steps</h2>
        <p>Pick your path:</p>
      </div>

      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        {nextSteps.map((step) => (
          <Link
            key={step.href}
            href={step.href}
            className="atro-tile group flex-col p-5"
          >
            <div className="flex items-center justify-between">
              <span className="ds-sketch text-lg text-foreground">
                {step.title}
              </span>
              <ArrowUpRight
                className="atro-tile-arrow size-4 text-muted-foreground"
                aria-hidden
              />
            </div>
            <p className="ds-meta mt-1">{step.body}</p>
          </Link>
        ))}
      </div>
    </article>
  )
}
