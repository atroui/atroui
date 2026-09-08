import Link from "next/link"
import { CodeBlock } from "@/components/code-block"
import { DocsArticleHeader } from "@/components/docs/docs-article-header"
import { DocsPager } from "@/components/docs-pager"
import { LaunchBriefDemo } from "@/components/launch-brief-demo"


export function LaunchWorkflowGuide() {
  return (
    <article className="space-y-10">
      <DocsArticleHeader
        eyebrow="Kits"
        title="From scope to social card"
        lede={
          <>
            One intake conversation becomes a structured brief, which seeds your
            OG (and thumbnail) workspace — without AtroUI hosting the AI. Own the
            UI. Borrow the API. Bring your own keys.
          </>
        }
      />

      <section className="space-y-4">
        <h2 className="docs-section-title">The path</h2>
        <ol className="list-decimal space-y-2 pl-5 leading-relaxed">
          <li>
            <Link
              href="/docs/components/scope-scope-chat"
              className="bam-link"
            >
              Scope Chat
            </Link>{" "}
            (+ optional{" "}
            <code className="rounded bg-muted px-1 py-0.5 font-mono text-[12px] text-foreground">
              @atroui/api-scope
            </code>
            ) — describe the project; draft an OG card from the last message.
          </li>
          <li>
            <Link
              href="/docs/components/planner-project-planner"
              className="bam-link"
            >
              Project Planner
            </Link>{" "}
            — confirm type, features, budget;{" "}
            <strong className="font-medium text-foreground">
              Preview social card
            </strong>{" "}
            opens OG with the estimate prefilled.
          </li>
          <li>
            <Link href="/docs/components/og-og-workspace" className="bam-link">
              OG Workspace
            </Link>{" "}
            /{" "}
            <Link
              href="/docs/components/thumbnail-thumbnail-workspace"
              className="bam-link"
            >
              Thumbnail
            </Link>{" "}
            — Quick mode accepts{" "}
            <code className="rounded bg-muted px-1 py-0.5 font-mono text-[12px] text-foreground">
              ?mode=quick&title=&subtitle=
            </code>
            . Preview without keys; AI needs your Host API env.
          </li>
        </ol>
      </section>

      <section className="space-y-4">
        <h2 className="docs-section-title">
          Shared brief
        </h2>
        <p className="leading-relaxed">
          Install the type + helpers into your repo:
        </p>
        <CodeBlock
          language="bash"
          code={`npx shadcn@latest add @atroui/project-brief`}
        />
        <CodeBlock
          language="ts"
          code={`import {
  type ProjectBrief,
  buildOgHref,
  briefFromScopeMessage,
} from "@/lib/project-brief"

const brief: ProjectBrief = {
  name: "LaunchKit",
  oneLiner: "Scope to social card in one loop",
  audience: "indie founders",
  pages: ["home", "pricing"],
  tone: "direct",
  constraints: ["7-day sprint"],
  ogTitle: "Ship the social card",
  ogSubtitle: "Scope → planner → OG",
}

// Prefill the OG workspace (docs host: /og)
window.location.href = buildOgHref(brief)`}
        />
        <p className="text-[13px] text-muted-foreground">
          Package export:{" "}
          <code className="rounded bg-muted px-1 py-0.5 font-mono text-[12px] text-foreground">
            import {"{ buildOgHref }"} from &quot;atroui&quot;
          </code>{" "}
          when you already depend on the npm package for Host APIs.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="docs-section-title">Try it</h2>
        <LaunchBriefDemo />
      </section>

      <section className="space-y-4">
        <h2 className="docs-section-title">Install checklist</h2>
        <CodeBlock
          language="bash"
          code={`# Brief helpers (always)
npx shadcn@latest add @atroui/project-brief

# Scope (UI + optional Host API)
npx shadcn@latest add @atroui/scope-chat
npx shadcn@latest add @atroui/api-scope

# Planner
npx shadcn@latest add @atroui/project-planner

# Social cards (UI + Host APIs when you want AI)
npx shadcn@latest add @atroui/og-workspace
npx shadcn@latest add @atroui/api-generate
# optional:
npx shadcn@latest add @atroui/thumbnail-workspace
npx shadcn@latest add @atroui/api-thumbnail`}
        />
        <p className="text-[13px] text-muted-foreground">
          Forms / AI Host APIs need{" "}
          <code className="rounded bg-muted px-1 py-0.5 font-mono text-[12px] text-foreground">
            npm i atroui
          </code>{" "}
          +{" "}
          <code className="rounded bg-muted px-1 py-0.5 font-mono text-[12px] text-foreground">
            transpilePackages
          </code>
          . See{" "}
          <Link href="/docs/host-api" className="bam-link">
            Host APIs
          </Link>
          .
        </p>
      </section>

      <div className="flex flex-wrap gap-3 border-t border-border-subtle pt-6">
        <Link href="/docs/host-api" className="atro-btn">
          Host APIs
        </Link>
        <Link href="/docs/registry" className="atro-btn-ghost">
          Registry
        </Link>
        <Link href="/og" className="atro-btn-ghost">
          Open /og
        </Link>
      </div>
      <DocsPager href="/docs/guides/launch-workflow" kind="guides" />
    </article>
  )
}
