import type { Metadata } from "next"
import Link from "next/link"
import { ToolExitBand } from "@/components/tool-exit-band"
import { InstallCommandChip } from "@/components/install-command-chip"
import { docsPageMetadata } from "@/lib/docs-metadata"
import { LandingPage } from "../../registry/default/blocks/landing-page"

const LANDING_INSTALL = "npx shadcn@latest add @atroui/landing-kit"

export const metadata: Metadata = docsPageMetadata({
  title: "Landing kit — Vibrant soft-rect stack",
  description:
    "One live marketing page from soft-rect registry sections. Install @atroui/landing-kit.",
  path: "/landing",
})

/**
 * Docs-host landing kit demo — Vibrant order, owned files after install.
 */
export default function LandingDemoPage() {
  return (
    <>
      <div className="border-b border-border-subtle bg-background px-4 py-3 @min-[40rem]:px-6">
        <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-3">
          <p className="max-w-xl text-[13px] leading-relaxed text-muted-foreground">
            Live room for{" "}
            <Link
              href="/docs/components/landing-landing-kit"
              className="bam-link"
            >
              Landing kit
            </Link>
            . Soft-rect stack — edit each section&apos;s CONTENT after install.
          </p>
          <InstallCommandChip command={LANDING_INSTALL} />
        </div>
      </div>

      <LandingPage />

      <div className="mx-auto max-w-5xl px-4 pb-10 @min-[40rem]:px-6">
        <ToolExitBand
          primaryHref="/docs/components/landing-landing-kit"
          primaryLabel="Landing kit docs"
          links={[
            { href: "/docs/collections/dark-marketing", label: "Collection" },
            { href: "/docs/installation", label: "Installation" },
            { href: "/launch", label: "Launch room" },
          ]}
        />
      </div>
    </>
  )
}
