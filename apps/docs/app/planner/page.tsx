import type { Metadata } from "next"
import Link from "next/link"
import { ProjectPlanner } from "atroui"
import { ProductPageHeader } from "@/components/product-page"
import { docsPageMetadata } from "@/lib/docs-metadata"

export const metadata: Metadata = docsPageMetadata({
  title: "Project planner",
  description:
    "Scope a build with the AtroUI project planner. Preview a social card from the estimate via the launch workflow.",
  path: "/planner",
})

export default function PlannerPage() {
  return (
    <main className="mx-auto w-full max-w-6xl space-y-6">
      <ProductPageHeader
        stamp="Tool"
        title="Project planner"
        lede={
          <>
            Part of{" "}
            <Link href="/docs/launch-workflow" className="bam-link">
              From scope to social card
            </Link>
            . Same launch workflow as the OG workspace on atroui.com.
          </>
        }
      />
      <div className="overflow-hidden rounded-xl border border-border-subtle">
        <ProjectPlanner />
      </div>
    </main>
  )
}
