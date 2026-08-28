import type { Metadata } from "next"
import { DocsMdxPage } from "@/components/docs-mdx"
import Link from "next/link"
import { CodeBlock } from "@/components/code-block"
import { LaunchBriefDemo } from "@/components/launch-brief-demo"
import { docsPageMetadata } from "@/lib/docs-metadata"

export const metadata: Metadata = docsPageMetadata({
  title: "From scope to social card",
  description:
    "AtroUI launch workflow: Scope Chat → Project Planner → OG / Thumbnail with a shared ProjectBrief. BYOK Host APIs; preview works without keys.",
  path: "/docs/guides/launch-workflow",
})

export default function LaunchWorkflowGuidePage() {
  return (
    <DocsMdxPage href="/docs/guides/launch-workflow" tocRootId="guides-launch-workflow-doc">
      <header>
        <p className="ms-stamp mb-3">Guide</p>
        <h1 className="ds-display text-3xl text-foreground sm:text-4xl">
          From scope to social card
        </h1>
        <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-muted-foreground">
          One intake conversation becomes a structured brief, which seeds your
          OG (and thumbnail) workspace — without AtroUI hosting the AI. Own the
          UI. Borrow the API. Bring your own keys.
        </p>
      </header>

      <section className="space-y-3">
        <h2 className="ds-headline text-base text-foreground">The path</h2>
        <ol className="list-decimal space-y-2 pl-5 text-[15px] leading-relaxed text-muted-foreground">
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

      <section className="space-y-3">
        <h2 className="ds-headline text-base text-foreground">
          Shared brief
        </h2>
        <p className="text-[15px] leading-relaxed text-muted-foreground">
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

      <section className="space-y-3">
        <h2 className="ds-headline text-base text-foreground">Try it</h2>
        <LaunchBriefDemo />
      </section>

      <section className="space-y-3">
        <h2 className="ds-headline text-base text-foreground">Install checklist</h2>
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
        <Link href="/docs/host-api" className="ms-cta">
          Host APIs
        </Link>
        <Link href="/docs/registry" className="ms-cta-ghost">
          Registry
        </Link>
        <Link href="/og" className="ms-cta-ghost">
          Open /og
        </Link>
      </div>
    </DocsMdxPage>
  )
}
