import type { Metadata } from "next"
import Link from "next/link"
import { ProjectPlanner } from "atroui"
import { InstallCommandChip } from "@/components/install-command-chip"
import { ToolExitBand } from "@/components/tool-exit-band"
import { ToolRoom } from "@/components/tool-room"
import { docsPageMetadata } from "@/lib/docs-metadata"

const PLANNER_INSTALL = "npx shadcn@latest add @atroui/project-planner"

export const metadata: Metadata = docsPageMetadata({
  title: "Project planner",
  description:
    "Scope a build with the AtroUI project planner. Preview a social card from the estimate via the launch workflow.",
  path: "/planner",
})

export default function PlannerPage() {
  return (
    <ToolRoom
      title="Project planner"
      lede={
        <>
          Scope a build, then hand the brief to the{" "}
          <Link href="/og" className="bam-link">
            OG workspace
          </Link>
          . Part of{" "}
          <Link href="/docs/guides/launch-workflow" className="bam-link">
            From scope to social card
          </Link>
          .{" "}
          <Link
            href="/docs/components/planner-project-planner"
            className="bam-link"
          >
            Docs
          </Link>
          .
        </>
      }
      meta={
        <>
          <InstallCommandChip command={PLANNER_INSTALL} />
          <p className="max-w-sm text-[11px] leading-relaxed text-muted-foreground sm:text-right">
            Copied source you own — edit CONTENT after install.
          </p>
        </>
      }
      exit={
        <ToolExitBand
          primaryHref="/og"
          primaryLabel="Continue to OG workspace"
          links={[
            { href: "/docs/guides/launch-workflow", label: "Launch workflow" },
            { href: "/docs/host-api", label: "Host APIs" },
            {
              href: "/docs/components/planner-project-planner",
              label: "Component docs",
            },
          ]}
        />
      }
    >
      <ProjectPlanner />
    </ToolRoom>
  )
}
