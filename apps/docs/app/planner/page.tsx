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
    <main className="spec-shell w-full py-12">
      <header className="mb-8 max-w-2xl">
        <p className="ms-stamp">Tool</p>
        <h1 className="spec-title mt-3 text-foreground">Project planner</h1>
        <p className="spec-lede mt-3">
          Part of{" "}
          <Link href="/docs/guides/launch-workflow" className="bam-link">
            From scope to social card
          </Link>
          .
        </p>
      </header>
      <div className="overflow-hidden rounded-[var(--radius)] border border-[var(--line)]">
        <ProjectPlanner />
      </div>
    </main>
  )
}
