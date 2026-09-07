import type { Metadata } from "next"
import Link from "next/link"
import { ProjectPlanner } from "atroui"
import { InstallCommandChip } from "@/components/install-command-chip"
import { SiteFooter } from "@/components/site-footer"
import { SiteHeader } from "@/components/site-header"
import { ToolExitBand } from "@/components/tool-exit-band"
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
    <>
      <SiteHeader />
      <main className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
        <header className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between sm:gap-6">
          <div className="max-w-2xl space-y-2">
            <p className="ds-mono-label">Tool</p>
            <h1 className="ds-headline text-2xl tracking-tight text-foreground sm:text-3xl">
              Project planner
            </h1>
            <p className="text-[14px] leading-relaxed text-muted-foreground sm:text-[15px]">
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
            </p>
          </div>
          <div className="flex min-w-0 flex-col gap-1.5 sm:items-end">
            <InstallCommandChip command={PLANNER_INSTALL} />
            <p className="max-w-sm text-[11px] leading-relaxed text-muted-foreground sm:text-right">
              Copied source you own — edit CONTENT after install.
            </p>
          </div>
        </header>
        <div className="overflow-hidden rounded-xl border border-border-subtle">
          <ProjectPlanner />
        </div>
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
      </main>
      <SiteFooter />
    </>
  )
}
