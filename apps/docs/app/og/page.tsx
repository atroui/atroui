import type { Metadata } from "next"
import Link from "next/link"
import { Suspense } from "react"
import { OgWorkspace } from "atroui"
import { InstallCommandChip } from "@/components/install-command-chip"
import { SiteFooter } from "@/components/site-footer"
import { SiteHeader } from "@/components/site-header"
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
    <>
      <SiteHeader />
      <main className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
      <header className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between sm:gap-6">
        <div className="max-w-2xl space-y-2">
          <p className="ms-stamp">Tool</p>
          <h1 className="ds-display text-2xl text-foreground sm:text-3xl">
            OG workspace
          </h1>
          <p className="text-[14px] leading-relaxed text-muted-foreground sm:text-[15px]">
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
        <div className="flex min-w-0 flex-col gap-1.5 sm:items-end">
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
        </div>
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
      <SiteFooter />
    </>
  )
}
