import type { Metadata } from "next"
import Link from "next/link"
import { Suspense } from "react"
// Live tool: npm Host API OgWorkspace (full generate/download UI).
// Registry `@atroui/og-workspace` is a CSS-only preview shell — see DemoOgWorkspace.
import { OgWorkspace } from "atroui"
import { InstallCommandChip } from "@/components/install-command-chip"
import { ToolExitBand } from "@/components/tool-exit-band"
import { ToolRoom } from "@/components/tool-room"
import { docsPageMetadata } from "@/lib/docs-metadata"

const OG_INSTALL = "npx shadcn@latest add @atroui/og-workspace"

export const metadata: Metadata = docsPageMetadata({
  title: "OG workspace",
  description:
    "Generate Open Graph social cards with AtroUI. Quick mode prefills from the launch workflow brief. Preview without keys; AI needs your Host API env.",
  path: "/og",
})

export default function OgPage() {
  return (
    <ToolRoom
      title="OG workspace"
      lede={
        <>
          Prefill from the{" "}
          <Link href="/docs/guides/launch-workflow" className="bam-link">
            launch workflow
          </Link>
          . This hosted tool is the npm Host API demo (full generate UI). The
          registry install below is the CSS preview shell you own in your repo.
          Want only that maker?{" "}
          <Link href="/docs/components/og-og-workspace" className="bam-link">
            Docs
          </Link>
          .
        </>
      }
      meta={
        <>
          <InstallCommandChip command={OG_INSTALL} />
          <p className="max-w-sm text-[11px] leading-relaxed text-muted-foreground sm:text-right">
            Registry copy is CSS-only. This page runs the npm Host API workspace.
            AI Generate needs{" "}
            <code className="font-mono text-[10px] text-foreground">
              @atroui/api-generate
            </code>{" "}
            + your keys.{" "}
            <Link href="/docs/host-api" className="bam-link">
              Host APIs
            </Link>
            .
          </p>
        </>
      }
      exit={
        <ToolExitBand
          primaryHref="/docs/host-api"
          primaryLabel="Wire Host APIs for AI generate"
          links={[
            { href: "/planner", label: "Project planner" },
            { href: "/docs/guides/launch-workflow", label: "Launch workflow" },
            {
              href: "/docs/components/og-og-workspace",
              label: "Component docs",
            },
          ]}
        />
      }
    >
      <div id="og-workspace">
        <Suspense
          fallback={
            <p className="p-6 font-mono text-[12px] text-muted-foreground">
              Loading workspace…
            </p>
          }
        >
          <OgWorkspace />
        </Suspense>
      </div>
    </ToolRoom>
  )
}
