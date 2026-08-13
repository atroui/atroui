import type { Metadata } from "next"
import Link from "next/link"
import { ProjectPlanner } from "atroui"
import { docsPageMetadata } from "@/lib/docs-metadata"

export const metadata: Metadata = docsPageMetadata({
  title: "Project planner",
  description:
    "Scope a build with the AtroUI project planner. Preview a social card from the estimate via the launch workflow.",
  path: "/planner",
})

export default function PlannerPage() {
  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
      <header className="mb-6 max-w-2xl space-y-2">
        <p className="ms-stamp">Tool</p>
        <h1 className="ds-display text-2xl text-foreground sm:text-3xl">
          Project planner
        </h1>
        <p className="text-[14px] leading-relaxed text-muted-foreground sm:text-[15px]">
          Part of{" "}
          <Link href="/docs/guides/launch-workflow" className="bam-link">
            From scope to social card
          </Link>
          .
        </p>
      </header>
      <div className="overflow-hidden rounded-xl border border-border-subtle">
        <ProjectPlanner />
      </div>
    </main>
  )
}
