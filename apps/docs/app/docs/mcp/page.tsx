import type { Metadata } from "next"
import Link from "next/link"
import { CodeBlock } from "@/components/code-block"
import { docsPageMetadata } from "@/lib/docs-metadata"

export const metadata: Metadata = docsPageMetadata({
  title: "MCP server",
  description:
    "Let agents search the AtroUI registry and follow Family Values / BYOK skills via the AtroUI MCP server.",
  path: "/docs/mcp",
})

export default function McpDocsPage() {
  return (
    <article className="mx-auto max-w-3xl space-y-10">
      <header>
        <p className="ms-stamp mb-3">Getting started</p>
        <h1 className="ds-display text-3xl text-foreground sm:text-4xl">
          MCP server
        </h1>
        <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-muted-foreground">
          Agents can search the catalog, copy an install command, and load
          AtroUI design skills. The server does not write files into the
          project. You still own the install. Public path today is the{" "}
          <a
            href="https://ui.shadcn.com/docs/directory?q=atroui"
            className="bam-link"
            target="_blank"
            rel="noopener noreferrer"
          >
            shadcn registry directory
          </a>
          . A first-party{" "}
          <code className="rounded-md bg-muted px-1.5 py-0.5 font-mono text-[12px] text-foreground">
            atroui add
          </code>{" "}
          CLI is separate work and is not required to finish this MCP package.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="ds-headline text-base text-foreground">Cursor</h2>
        <p className="text-[15px] leading-relaxed text-muted-foreground">
          Add this to{" "}
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
        <p className="text-[15px] leading-relaxed text-muted-foreground">
          Or, after the package is on npm:{" "}
          <code className="rounded-md bg-muted px-1.5 py-0.5 font-mono text-[12px] text-foreground">
            npx @atroui/mcp init --client cursor
          </code>
          .
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="ds-headline text-base text-foreground">Claude Code</h2>
        <p className="text-[15px] leading-relaxed text-muted-foreground">
          Same block in{" "}
          <code className="rounded-md bg-muted px-1.5 py-0.5 font-mono text-[12px] text-foreground">
            .mcp.json
          </code>
          .
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="ds-headline text-base text-foreground">
          Already on shadcn MCP
        </h2>
        <p className="text-[15px] leading-relaxed text-muted-foreground">
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
          when the agent should prefer AtroUI (Family Values, Host APIs, BYOK)
          without that config.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="ds-headline text-base text-foreground">Tools</h2>
        <ul className="list-disc space-y-2 pl-5 text-[15px] leading-relaxed text-muted-foreground">
          <li>
            <code className="rounded bg-muted px-1 py-0.5 font-mono text-[12px] text-foreground">
              search_components
            </code>{" "}
            — catalog search
          </li>
          <li>
            <code className="rounded bg-muted px-1 py-0.5 font-mono text-[12px] text-foreground">
              get_item
            </code>{" "}
            — one item and{" "}
            <code className="rounded bg-muted px-1 py-0.5 font-mono text-[12px] text-foreground">
              npx shadcn@latest add @atroui/{"{name}"}
            </code>{" "}
            (and a reserved{" "}
            <code className="rounded bg-muted px-1 py-0.5 font-mono text-[12px] text-foreground">
              npx atroui add {"{name}"}
            </code>
            {" "}
            line for when the first-party CLI is live)
            </code>
          </li>
          <li>
            <code className="rounded bg-muted px-1 py-0.5 font-mono text-[12px] text-foreground">
              get_skill
            </code>{" "}
            —{" "}
            <code className="rounded bg-muted px-1 py-0.5 font-mono text-[12px] text-foreground">
              design
            </code>{" "}
            or{" "}
            <code className="rounded bg-muted px-1 py-0.5 font-mono text-[12px] text-foreground">
              host-api
            </code>
          </li>
        </ul>
        <p className="text-[15px] leading-relaxed text-muted-foreground">
          Try: “Add the AtroUI home hero, then follow the design skill.”
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="ds-headline text-base text-foreground">
          Icon + Connect in Cursor
        </h2>
        <p className="text-[15px] leading-relaxed text-muted-foreground">
          Plugin files are in the repo (
          <code className="rounded-md bg-muted px-1.5 py-0.5 font-mono text-[12px] text-foreground">
            .cursor-plugin/plugin.json
          </code>
          ). Submit to the Cursor Marketplace only after{" "}
          <code className="rounded-md bg-muted px-1.5 py-0.5 font-mono text-[12px] text-foreground">
            @atroui/mcp
          </code>{" "}
          is on npm. Until then, Connect from a local{" "}
          <code className="rounded-md bg-muted px-1.5 py-0.5 font-mono text-[12px] text-foreground">
            .cursor/mcp.json
          </code>
          .
        </p>
      </section>

      <div className="flex flex-wrap gap-3 border-t border-border-subtle pt-6">
        <Link href="/docs/installation" className="ms-cta">
          Installation
        </Link>
        <Link href="/docs/host-api" className="ms-cta-ghost">
          Host APIs
        </Link>
        <Link href="/docs/registry" className="ms-cta-ghost">
          Registry
        </Link>
      </div>
    </article>
  )
}
