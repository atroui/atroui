import type { Metadata } from "next"
import Link from "next/link"
import { Suspense } from "react"
import { OgWorkspace } from "atroui"
import { InstallCommandChip } from "@/components/install-command-chip"
import { ProductPageHeader } from "@/components/product-page"
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
    <main className="mx-auto w-full max-w-6xl space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between sm:gap-6">
        <ProductPageHeader
          stamp="Tool"
          title="OG workspace"
          lede={
            <>
              Prefill from the{" "}
              <Link href="/docs/launch-workflow" className="bam-link">
                launch workflow
              </Link>
              . Preview downloads work without AI keys. Component docs:{" "}
              <Link href="/docs/components/og-og-workspace" className="bam-link">
                og-workspace
              </Link>
              .
            </>
          }
          className="max-w-2xl"
        />
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
      </div>
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
