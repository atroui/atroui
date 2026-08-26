import type { Metadata } from "next"
import Link from "next/link"
import { CodeBlock } from "@/components/code-block"
import { DocsPageHeader } from "@/components/docs-page-header"
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
      <DocsPageHeader
        eyebrow="Getting started"
        title="Introduction"
        description={
          <>
            AtroUI is a dark-first catalog of{" "}
            <strong className="font-medium text-foreground">
              production landing sections
            </strong>{" "}
            and optional Host APIs for indie Next.js — delivered on the shadcn
            registry at{" "}
            <strong className="font-medium text-foreground">atroui.com</strong>.
            Not a 50-primitive peer to shadcn/ui. The CLI copies source into your
            project; you own the files.
          </>
        }
      />

      <section className="space-y-4">
        <h2 className="ds-headline text-base text-foreground">Quick start</h2>
        <CodeBlock
          language="bash"
          code={`npx shadcn@latest init
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

      <section className="md-glass space-y-3 p-5">
        <h2 className="ds-headline text-base text-foreground">How the catalog is organized</h2>
        <ul className="space-y-2 text-[15px] font-light leading-relaxed text-muted-foreground">
          <li>
            <span className="font-medium text-foreground">Primitives</span> -
            buttons, forms, motion, logo. Small reusable pieces.
          </li>
          <li>
            <span className="font-medium text-foreground">Blocks</span> - heroes,
            footers, pricing, FAQ, forms. Production-shaped page sections. Prefer
            items tagged CLI in the sidebar.
          </li>
          <li>
            <span className="font-medium text-foreground">Tools</span> - OG,
            thumbnails, planners. Often need your own host APIs.
          </li>
          <li>
            <span className="font-medium text-foreground">Headless</span> -
            analytics and structured data with no visible UI.
          </li>
        </ul>
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
          API tokens. Guide:{" "}
          <Link href="/docs/host-api" className="bam-link">
            Host APIs
          </Link>
          . Want sample OG output without setup? Try the live tool at{" "}
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

      <div className="flex flex-wrap gap-3 pt-1">
        <Link href="/docs/installation" className="ms-cta">
          Installation
        </Link>
        <Link href="/docs/host-api" className="ms-cta-ghost">
          Host APIs
        </Link>
        <Link href="/docs/registry" className="ms-cta-ghost">
          Own the UI
        </Link>
        <Link href="/docs/components" className="ms-cta-ghost">
          Browse components
        </Link>
        <Link href="/updates" className="ms-cta-ghost">
          Updates by email
        </Link>
        <Link href="/blog" className="ms-cta-ghost">
          Blog
        </Link>
      </div>
    </article>
  )
}
