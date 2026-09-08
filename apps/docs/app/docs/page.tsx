import type { Metadata } from "next"
import Link from "next/link"
import { CodeBlock } from "@/components/code-block"
import { DocsPager } from "@/components/docs-pager"
import { docsPageMetadata } from "@/lib/docs-metadata"

export const metadata: Metadata = docsPageMetadata({
  title: "Getting Started",
  description:
    "Add AtroUI with the shadcn CLI. Essential commands, first block, and where to go next.",
  path: "/docs",
})

/**
 * Docs home — Zed Getting Started calm: two sentences, Quick Start, verbs, Coming from.
 */
export default function DocsIntroPage() {
  return (
    <article className="docs-book-article">
      <header className="docs-book-header">
        <h1 className="docs-book-title">Getting Started</h1>
        <p className="docs-book-lede">
          AtroUI is a dark-first React / Next.js catalog on the official shadcn
          registry. This guide covers the essential commands, your first block,
          and where to go next.
        </p>
      </header>

      <div className="docs-prose">
        <h2 id="quick-start">Quick Start</h2>

        <h3 id="init">1. Init shadcn</h3>
        <p>
          You need a Next.js app with Tailwind CSS v4. On a fresh app:
        </p>
        <CodeBlock language="bash" code={`npx shadcn@latest init`} />
        <p>
          Prerequisites and troubleshooting:{" "}
          <Link href="/docs/installation" className="bam-link">
            Installation
          </Link>
          .
        </p>

        <h3 id="add-first-block">2. Add your first block</h3>
        <p>
          <code>@atroui</code> is in the official shadcn directory — no manual
          registry URL. Add the homepage hero:
        </p>
        <CodeBlock
          language="bash"
          code={`npx shadcn@latest add @atroui/home-hero`}
        />
        <p>
          Source lands under your aliases (for example{" "}
          <code>components/blocks/home-hero.tsx</code>). Edit the{" "}
          <code>CONTENT</code> object at the top of the file. Browse the rest
          of the catalog:{" "}
          <Link href="/docs/components" className="bam-link">
            Components
          </Link>
          .
        </p>

        <h3 id="essential-commands">3. Learn the essential commands</h3>
        <div className="not-prose my-4 overflow-x-auto">
          <table className="w-full min-w-[28rem] border-collapse text-left text-[13px]">
            <thead>
              <tr className="border-b border-border-subtle text-muted-foreground">
                <th className="py-2 pr-4 font-medium">Action</th>
                <th className="py-2 font-medium">How</th>
              </tr>
            </thead>
            <tbody className="text-foreground">
              <tr className="border-b border-border-subtle/80">
                <td className="py-2.5 pr-4">Customize copy</td>
                <td className="py-2.5 font-mono text-[12px]">
                  Edit CONTENT at top of file
                </td>
              </tr>
              <tr className="border-b border-border-subtle/80">
                <td className="py-2.5 pr-4">Try OG cards</td>
                <td className="py-2.5">
                  Open{" "}
                  <Link href="/og" className="bam-link font-mono text-[12px]">
                    /og
                  </Link>
                </td>
              </tr>
              <tr className="border-b border-border-subtle/80">
                <td className="py-2.5 pr-4">Theme tokens</td>
                <td className="py-2.5">
                  <Link href="/docs/theming" className="bam-link">
                    Theming
                  </Link>
                </td>
              </tr>
              <tr>
                <td className="py-2.5 pr-4">Forms / AI routes</td>
                <td className="py-2.5">
                  <Link href="/docs/host-api" className="bam-link">
                    Host APIs
                  </Link>{" "}
                  <span className="text-muted-foreground">
                    (<code className="font-mono text-[12px]">npm i atroui</code>)
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <p>
          If you forget a registry name, search{" "}
          <Link href="/docs/components" className="bam-link">
            Components
          </Link>{" "}
          or the{" "}
          <Link href="/docs/registry" className="bam-link">
            Registry
          </Link>{" "}
          guide.
        </p>

        <h2 id="coming-from">Coming from…?</h2>
        <p>Dedicated paths if you already have a stack:</p>
        <ul>
          <li>
            <Link href="/docs/migrate#from-shadcn" className="bam-link">
              Plain shadcn/ui
            </Link>{" "}
            — add <code>@atroui/…</code> beside your existing components
          </li>
          <li>
            <Link href="/docs/migrate#from-npm" className="bam-link">
              npm <code>atroui</code> package
            </Link>{" "}
            — Host API consumers and transpile setup
          </li>
          <li>
            <Link href="/docs/migrate#from-kits" className="bam-link">
              Copy-paste / animation kits
            </Link>{" "}
            — what to do differently; positioning in{" "}
            <Link href="/docs/compare" className="bam-link">
              Compare
            </Link>
          </li>
        </ul>
      </div>

      <DocsPager href="/docs" kind="guides" />
    </article>
  )
}
