import type { Metadata } from "next"
import Link from "next/link"
import { Suspense } from "react"
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
          . Preview downloads work without AI keys. Want only this maker?{" "}
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
