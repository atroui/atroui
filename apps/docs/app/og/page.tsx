import type { Metadata } from "next"
import Link from "next/link"
import { Suspense } from "react"
import { OgWorkspace } from "atroui"
import { InstallCommandChip } from "@/components/install-command-chip"
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
    <main className="spec-shell w-full py-12">
      <header className="mb-8 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <div className="max-w-2xl">
          <p className="ms-stamp">Tool</p>
          <h1 className="spec-title mt-3 text-foreground">OG workspace</h1>
          <p className="spec-lede mt-3">
            Prefill from the{" "}
            <Link href="/docs/guides/launch-workflow" className="bam-link">
              launch workflow
            </Link>
            . Preview downloads work without AI keys. Want only this maker?{" "}
            <Link
              href="/docs/components/og-og-workspace"
              className="bam-link"
            >
              Docs
            </Link>
            .
          </p>
        </div>
        <div className="flex min-w-0 flex-col gap-2 sm:items-end">
          <InstallCommandChip command={OG_INSTALL} />
          <p className="max-w-sm text-[12px] leading-relaxed text-muted-foreground sm:text-right">
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
        </div>
      </header>
      <div
        id="og-workspace"
        className="overflow-hidden rounded-[var(--radius)] border border-[var(--line)]"
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
