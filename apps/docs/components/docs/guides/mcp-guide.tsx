import { CodeBlock } from "@/components/code-block"
import { DocsArticleHeader } from "@/components/docs/docs-article-header"
import { DocsPager } from "@/components/docs-pager"
import Link from "next/link"

export function McpGuide() {
  return (
    <article className="space-y-10">
      <DocsArticleHeader
        eyebrow="Getting started"
        title="MCP server"
        lede={
          <>
            Agents search the AtroUI registry and copy an install command. The
            server does not write files — you still own the install. Same
            registry as{" "}
            <Link href="/docs/installation" className="bam-link">
              Installation
            </Link>
            : shadcn or{" "}
            <code className="rounded-md bg-muted px-1.5 py-0.5 font-mono text-[12px] text-foreground">
              @atroui/cli
            </code>
            .
          </>
        }
      />

      <section className="space-y-4">
        <h2 className="docs-section-title" id="install-paths">
          Install paths agents should use
        </h2>
        <CodeBlock
          language="bash"
          code={`# Prefer when the project already uses shadcn
npx shadcn@latest add @atroui/home-hero

# Prefer when the project does not use shadcn
npx @atroui/cli@latest add home-hero`}
        />
        <p className="leading-relaxed">
          Never import UI from the npm package{" "}
          <code className="rounded-md bg-muted px-1.5 py-0.5 font-mono text-[12px] text-foreground">
            atroui
          </code>
          . Host APIs only:{" "}
          <code className="rounded-md bg-muted px-1.5 py-0.5 font-mono text-[12px] text-foreground">
            atroui/api/*
          </code>
          .
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="docs-section-title" id="cursor">
          Cursor
        </h2>
        <p className="leading-relaxed">
          Add to{" "}
          <code className="rounded-md bg-muted px-1.5 py-0.5 font-mono text-[12px] text-foreground">
            .cursor/mcp.json
          </code>
          :
        </p>
        <CodeBlock
          language="json"
          code={`{
  "mcpServers": {
    "atroui": {
      "command": "npx",
      "args": ["-y", "@atroui/mcp"]
    }
  }
}`}
        />
        <p className="leading-relaxed">
          Local monorepo (before publish): point{" "}
          <code className="rounded-md bg-muted px-1.5 py-0.5 font-mono text-[12px] text-foreground">
            command
          </code>{" "}
          at{" "}
          <code className="rounded-md bg-muted px-1.5 py-0.5 font-mono text-[12px] text-foreground">
            node
          </code>{" "}
          and{" "}
          <code className="rounded-md bg-muted px-1.5 py-0.5 font-mono text-[12px] text-foreground">
            packages/mcp/dist/index.js
          </code>
          .
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="docs-section-title" id="claude">
          Claude Code
        </h2>
        <p className="leading-relaxed">
          Same JSON block in{" "}
          <code className="rounded-md bg-muted px-1.5 py-0.5 font-mono text-[12px] text-foreground">
            .mcp.json
          </code>
          .
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="docs-section-title" id="tools">
          Tools
        </h2>
        <ul className="list-disc space-y-2 pl-5">
          <li>
            <strong className="text-foreground">search_components</strong> —
            search name / title / description
          </li>
          <li>
            <strong className="text-foreground">get_item</strong> — one item +
            both install commands + docs link
          </li>
          <li>
            <strong className="text-foreground">get_skill</strong> —{" "}
            <code className="rounded-md bg-muted px-1.5 py-0.5 font-mono text-[12px] text-foreground">
              design
            </code>{" "}
            (Family Values) or{" "}
            <code className="rounded-md bg-muted px-1.5 py-0.5 font-mono text-[12px] text-foreground">
              host-api
            </code>{" "}
            (BYOK)
          </li>
        </ul>
      </section>

      <section className="space-y-4">
        <h2 className="docs-section-title" id="shadcn-mcp">
          Already on shadcn MCP
        </h2>
        <p className="leading-relaxed">
          If{" "}
          <code className="rounded-md bg-muted px-1.5 py-0.5 font-mono text-[12px] text-foreground">
            @atroui
          </code>{" "}
          is in{" "}
          <code className="rounded-md bg-muted px-1.5 py-0.5 font-mono text-[12px] text-foreground">
            components.json
          </code>
          ,{" "}
          <code className="rounded-md bg-muted px-1.5 py-0.5 font-mono text-[12px] text-foreground">
            npx shadcn@latest mcp
          </code>{" "}
          can browse this registry too. Use{" "}
          <code className="rounded-md bg-muted px-1.5 py-0.5 font-mono text-[12px] text-foreground">
            @atroui/mcp
          </code>{" "}
          when you want AtroUI skills + dual install commands in one place.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="docs-section-title" id="agents">
          Agent playbook
        </h2>
        <p className="leading-relaxed">
          Paste rules and recipes:{" "}
          <Link href="/docs/guides/for-agents" className="bam-link">
            For agents
          </Link>
          .
        </p>
      </section>

      <DocsPager href="/docs/mcp" kind="guides" />
    </article>
  )
}
