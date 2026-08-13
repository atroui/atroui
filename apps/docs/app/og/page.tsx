import type { Metadata } from "next"
import Link from "next/link"
import { Suspense } from "react"
import { OgWorkspace } from "atroui"
import { docsPageMetadata } from "@/lib/docs-metadata"

export const metadata: Metadata = docsPageMetadata({
  title: "OG workspace",
  description:
    "Generate Open Graph social cards with AtroUI. Quick mode prefills from the launch workflow brief. Preview without keys; AI needs your Host API env.",
  path: "/og",
})

export default function OgPage() {
  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
      <header className="mb-6 max-w-2xl space-y-2">
        <p className="ms-stamp">Tool</p>
        <h1 className="ds-display text-2xl text-foreground sm:text-3xl">
          OG workspace
        </h1>
        <p className="text-[14px] leading-relaxed text-muted-foreground sm:text-[15px]">
          Prefill from the{" "}
          <Link href="/docs/guides/launch-workflow" className="bam-link">
            launch workflow
          </Link>
          . Preview downloads work without AI keys.
        </p>
      </header>
      <div
        id="og-workspace"
        className="overflow-hidden rounded-xl border border-border-subtle"
      >
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
    </main>
  )
}
