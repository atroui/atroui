import Link from "next/link"
import { CodeBlock } from "@/components/code-block"
import { DocsArticleHeader } from "@/components/docs/docs-article-header"
import { DocsPager } from "@/components/docs-pager"


export function MigrateGuide() {
  return (
    <article className="space-y-10">
      <DocsArticleHeader
        eyebrow="Getting started"
        title="Coming from…"
        lede={
          <>
            What to <em>do</em> if you already have a stack. For positioning vs
            other kits, see{" "}
            <Link href="/docs/compare" className="bam-link">
              Compare
            </Link>
            .
          </>
        }
      />

      <section className="space-y-4">
        <h2
          className="docs-section-title"
          id="from-shadcn"
        >
          From plain shadcn/ui
        </h2>
        <p className="leading-relaxed">
          Keep your existing components. Add AtroUI blocks beside them — same
          CLI, same ownership model.
        </p>
        <ol className="list-decimal space-y-2 pl-5 text-[15px] leading-relaxed">
          <li>
            Confirm Tailwind v4 and a working{" "}
            <code className="rounded-md bg-muted px-1.5 py-0.5 font-mono text-[12px] text-foreground">
              components.json
            </code>
            .
          </li>
          <li>
            Run{" "}
            <code className="rounded-md bg-muted px-1.5 py-0.5 font-mono text-[12px] text-foreground">
              npx shadcn@latest add @atroui/home-hero
            </code>{" "}
            (or any{" "}
            <code className="rounded-md bg-muted px-1.5 py-0.5 font-mono text-[12px] text-foreground">
              @atroui/…
            </code>{" "}
            name from the{" "}
            <Link href="/docs/components" className="bam-link">
              catalog
            </Link>
            ).
          </li>
          <li>
            Edit{" "}
            <code className="rounded-md bg-muted px-1.5 py-0.5 font-mono text-[12px] text-foreground">
              CONTENT
            </code>{" "}
            at the top of the copied file. Align tokens with{" "}
            <Link href="/docs/theming" className="bam-link">
              Theming
            </Link>{" "}
            if brand colors diverge.
          </li>
        </ol>
        <CodeBlock
          language="bash"
          code={`npx shadcn@latest add @atroui/button
npx shadcn@latest add @atroui/home-hero`}
        />
      </section>

      <section className="space-y-4">
        <h2 className="docs-section-title" id="from-npm">
          From the npm <code>atroui</code> package
        </h2>
        <p className="leading-relaxed">
          You already depend on{" "}
          <code className="rounded-md bg-muted px-1.5 py-0.5 font-mono text-[12px] text-foreground">
            atroui
          </code>{" "}
          for Host API handlers or shared tokens. Prefer the registry for UI:
          copy source into the app, keep the package for{" "}
          <code className="rounded-md bg-muted px-1.5 py-0.5 font-mono text-[12px] text-foreground">
            atroui/api/*
          </code>
          .
        </p>
        <ol className="list-decimal space-y-2 pl-5 text-[15px] leading-relaxed">
          <li>
            Keep{" "}
            <code className="rounded-md bg-muted px-1.5 py-0.5 font-mono text-[12px] text-foreground">
              transpilePackages: [&quot;atroui&quot;]
            </code>{" "}
            in Next config.
          </li>
          <li>
            Add UI with the CLI (
            <code className="rounded-md bg-muted px-1.5 py-0.5 font-mono text-[12px] text-foreground">
              @atroui/contact-form
            </code>
            , etc.) instead of importing large blocks from the package when a
            registry item exists.
          </li>
          <li>
            Add matching{" "}
            <code className="rounded-md bg-muted px-1.5 py-0.5 font-mono text-[12px] text-foreground">
              @atroui/api-*
            </code>{" "}
            routes; leave keys in{" "}
            <strong className="text-foreground">your</strong> env. Details:{" "}
            <Link href="/docs/host-api" className="bam-link">
              Host APIs
            </Link>
            .
          </li>
        </ol>
        <p className="leading-relaxed">
          Background on the split:{" "}
          <Link href="/blog/npm-to-shadcn-registry" className="bam-link">
            npm → shadcn registry
          </Link>
          .
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="docs-section-title" id="from-kits">
          From copy-paste / animation kits
        </h2>
        <p className="leading-relaxed">
          If you are used to Magic UI / Aceternity-style packs: AtroUI optimizes
          for production sections and site chrome on a dark-first token sheet —
          not for a pile of one-off demos. Positioning:{" "}
          <Link href="/docs/compare" className="bam-link">
            Compare
          </Link>
          .
        </p>
        <ol className="list-decimal space-y-2 pl-5 text-[15px] leading-relaxed">
          <li>
            Start from{" "}
            <Link href="/docs" className="bam-link">
              Getting Started
            </Link>{" "}
            and install one block end-to-end (
            <code className="rounded-md bg-muted px-1.5 py-0.5 font-mono text-[12px] text-foreground">
              @atroui/home-hero
            </code>
            ).
          </li>
          <li>
            Prefer job hubs over random browsing:{" "}
            <Link href="/docs/collections" className="bam-link">
              Collections
            </Link>{" "}
            (forms, OG, launch).
          </li>
          <li>
            For social cards, try the live room at{" "}
            <Link href="/og" className="bam-link">
              /og
            </Link>{" "}
            before installing{" "}
            <code className="rounded-md bg-muted px-1.5 py-0.5 font-mono text-[12px] text-foreground">
              @atroui/og-workspace
            </code>
            .
          </li>
        </ol>
      </section>

      <DocsPager href="/docs/migrate" kind="guides" />
    </article>
  )
}
