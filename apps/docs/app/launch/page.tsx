import type { Metadata } from "next"
import Link from "next/link"
import { DocsHeader } from "@/components/docs/docs-header"
import { SiteFooter } from "@/components/site-footer"
import { ToolExitBand } from "@/components/tool-exit-band"
import { InstallCommandChip } from "@/components/install-command-chip"
import { docsPageMetadata } from "@/lib/docs-metadata"
import { LaunchRoom } from "../../registry/default/blocks/launch-room"

const LAUNCH_INSTALL = "npx shadcn@latest add @atroui/launch-workflow"

export const metadata: Metadata = docsPageMetadata({
  title: "Launch room — scope to social",
  description:
    "One live path: Scope Chat → Project Planner → OG preview. Shared ProjectBrief. Preview without keys.",
  path: "/launch",
})

/**
 * Docs-host Launch Room — the pause demo for the launch workflow.
 */
export default function LaunchPage() {
  return (
    <>
      <DocsHeader showChapterNav={false} />
      <main className="mx-auto max-w-5xl px-4 py-6 @min-[40rem]:px-6 @min-[40rem]:py-8">
        <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
          <p className="max-w-xl text-[13px] leading-relaxed text-muted-foreground">
            Part of{" "}
            <Link href="/docs/guides/launch-workflow" className="bam-link">
              From scope to social card
            </Link>
            . Own the files after install.
          </p>
          <InstallCommandChip command={LAUNCH_INSTALL} />
        </div>

        <LaunchRoom />

        <ToolExitBand
          primaryHref="/og"
          primaryLabel="Open full OG workspace"
          links={[
            { href: "/docs/guides/launch-workflow", label: "Launch guide" },
            { href: "/planner", label: "Planner room" },
            { href: "/docs/host-api", label: "Host APIs" },
          ]}
        />
      </main>
      <SiteFooter />
    </>
  )
}
