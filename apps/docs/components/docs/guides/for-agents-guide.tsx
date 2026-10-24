import Link from "next/link"
import { CodeBlock } from "@/components/code-block"
import { DocsArticleHeader } from "@/components/docs/docs-article-header"
import { DocsPager } from "@/components/docs-pager"

const AGENT_PASTE_PROMPT = `You are installing AtroUI into a Next.js (App Router) + Tailwind v4 app.

Rules:
- UI (shadcn projects): npx shadcn@latest add @atroui/<name> — copied files the user owns.
- UI (no shadcn): npx @atroui/cli@latest add <name> — same registry JSON.
- Never import UI from the npm package atroui (no \`import { Button } from "atroui"\`).
- Host APIs only: npm i atroui + transpilePackages + app/api stubs; BYOK; 503 without keys.
- Themes: orthogonal axes + companion SKUs (@atroui/theme-tide, …), not mega-themes.
- Catalog truth: https://www.atroui.com/llms-full.txt and https://www.atroui.com/r/registry.json
- Optional MCP: https://www.atroui.com/docs/mcp (@atroui/mcp returns both install commands).

Jobs (pick one unless asked for more):
1) Landing: npx shadcn@latest add @atroui/landing-kit (demo https://www.atroui.com/landing) — or à la carte from https://www.atroui.com/docs/collections/dark-marketing / @atroui/saas-starter.
2) Launch: add @atroui/launch-workflow; demo path https://www.atroui.com/launch .
3) Themes: use https://www.atroui.com/themes ; export CSS / companion installs from Theme Studio.

Prefer @atroui items that exist in the registry JSON. Do not invent SKUs.`

export function ForAgentsGuide() {
  return (
    <article className="space-y-10">
      <DocsArticleHeader
        eyebrow="Kits"
        title="For agents"
        lede={
          <>
            Paste the prompt into Cursor, Claude, or Codex. Install truth lives
            in the registry — not in guessed npm imports.
          </>
        }
      />

      <section className="space-y-4">
        <h2 className="docs-section-title" id="rules">
          Hard rules
        </h2>
        <ol className="list-decimal space-y-2 pl-5 leading-relaxed">
          <li>
            UI via{" "}
            <code className="rounded bg-muted px-1 py-0.5 font-mono text-[12px]">
              npx shadcn@latest add @atroui/…
            </code>{" "}
            or{" "}
            <code className="rounded bg-muted px-1 py-0.5 font-mono text-[12px]">
              npx @atroui/cli@latest add …
            </code>{" "}
            — same registry; the user owns the copied files.{" "}
            <Link href="/docs/mcp" className="bam-link">
              MCP
            </Link>{" "}
            returns both.
          </li>
          <li>
            Never teach{" "}
            <code className="rounded bg-muted px-1 py-0.5 font-mono text-[12px]">
              {"import { Button } from \"atroui\""}
            </code>{" "}
            for UI. The npm package is for Host APIs (
            <code className="rounded bg-muted px-1 py-0.5 font-mono text-[12px]">
              atroui/api/*
            </code>
            ) only.
          </li>
          <li>
            Themes = axes + companion SKUs. Tools = Launch room / OG / Host APIs
            with BYOK.
          </li>
        </ol>
      </section>

      <section className="space-y-4">
        <h2 className="docs-section-title" id="paste-prompt">
          Give this to Cursor
        </h2>
        <p className="leading-relaxed text-muted-foreground">
          Copy the block below into your agent chat, then name the job (landing,
          launch, or themes).
        </p>
        <CodeBlock language="text" code={AGENT_PASTE_PROMPT} />
      </section>

      <section className="space-y-4">
        <h2 className="docs-section-title" id="recipes">
          Job recipes
        </h2>
        <ul className="list-disc space-y-3 pl-5 leading-relaxed">
          <li>
            <strong className="font-medium text-foreground">Landing</strong> —{" "}
            <code className="rounded bg-muted px-1 py-0.5 font-mono text-[12px]">
              npx shadcn@latest add @atroui/landing-kit
            </code>
            . Live:{" "}
            <Link href="/landing" className="bam-link">
              /landing
            </Link>
            . Or{" "}
            <Link href="/docs/collections/dark-marketing" className="bam-link">
              à la carte
            </Link>{" "}
            /{" "}
            <code className="rounded bg-muted px-1 py-0.5 font-mono text-[12px]">
              @atroui/saas-starter
            </code>
            .
          </li>
          <li>
            <strong className="font-medium text-foreground">Launch</strong> —{" "}
            <code className="rounded bg-muted px-1 py-0.5 font-mono text-[12px]">
              npx shadcn@latest add @atroui/launch-workflow
            </code>
            . Live demo:{" "}
            <Link href="/launch" className="bam-link">
              /launch
            </Link>
            .
          </li>
          <li>
            <strong className="font-medium text-foreground">Themes</strong> —{" "}
            <Link href="/themes" className="bam-link">
              Theme Studio
            </Link>
            ; copy CSS / companion installs from the tray.
          </li>
        </ul>
      </section>

      <section className="space-y-4">
        <h2 className="docs-section-title" id="catalog">
          Catalog for agents
        </h2>
        <ul className="list-disc space-y-2 pl-5 leading-relaxed">
          <li>
            Short index:{" "}
            <a href="/llms.txt" className="bam-link">
              /llms.txt
            </a>
          </li>
          <li>
            Full dump:{" "}
            <a href="/llms-full.txt" className="bam-link">
              /llms-full.txt
            </a>
          </li>
          <li>
            Registry JSON:{" "}
            <a href="/r/registry.json" className="bam-link">
              /r/registry.json
            </a>
          </li>
          <li>
            <Link href="/docs/installation" className="bam-link">
              Installation
            </Link>{" "}
            ·{" "}
            <Link href="/docs/host-api" className="bam-link">
              Host APIs
            </Link>
          </li>
        </ul>
      </section>

      <DocsPager href="/docs/guides/for-agents" kind="guides" />
    </article>
  )
}
