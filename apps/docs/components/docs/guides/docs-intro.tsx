import Link from "next/link"
import { CodeBlock } from "@/components/code-block"
import { DocsArticleHeader } from "@/components/docs/docs-article-header"
import { DocsPager } from "@/components/docs-pager"

/**
 * Docs home — Zed Getting Started calm: two sentences, Quick Start, verbs, Coming from.
 */
export function DocsIntroPage() {
  return (
    <article className="space-y-10">
      <DocsArticleHeader
        eyebrow="Getting started"
        title="Getting Started"
        lede={
          <>
            AtroUI is a dark-first React / Next.js catalog on the official shadcn
            registry. This guide covers the essential commands, your first block,
            and where to go next.
          </>
        }
      />

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
        <table>
          <thead>
            <tr>
              <th>Action</th>
              <th>How</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Customize copy</td>
              <td>
                <code>Edit CONTENT at top of file</code>
              </td>
            </tr>
            <tr>
              <td>Try OG cards</td>
              <td>
                Open{" "}
                <Link href="/og" className="bam-link">
                  /og
                </Link>
              </td>
            </tr>
            <tr>
              <td>Theme tokens</td>
              <td>
                <Link href="/docs/theming" className="bam-link">
                  Theming
                </Link>
              </td>
            </tr>
            <tr>
              <td>Forms / AI routes</td>
              <td>
                <Link href="/docs/host-api" className="bam-link">
                  Host APIs
                </Link>{" "}
                (<code>npm i atroui</code>)
              </td>
            </tr>
          </tbody>
        </table>
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
