import type { Metadata } from "next"
import { componentPageMetadata } from "@/lib/docs-metadata"
import Link from "next/link"
import { ComponentDoc } from "@/components/component-doc"
import { DemoOgWorkspace } from "@/components/registry-demos"

export const metadata: Metadata = componentPageMetadata(
  "OG Workspace",
  "/docs/components/og-og-workspace",
  "Client-side Open Graph card workspace (Satori + optional AI). Live at /og."
)

export default function Page() {
  return (
    <ComponentDoc
      registryName="og-workspace"
      href="/docs/components/og-og-workspace"
      title="OG Workspace"
      description="Client-side Open Graph card workspace (Satori + optional AI). Live on this site at /og."
      preview={<DemoOgWorkspace />}
      code={`import { OgWorkspace } from "@/components/blocks/og-workspace"

<OgWorkspace />`}
      fullBleed={true}
      usage={
        <>
          Try the live room at{" "}
          <Link href="/og" className="bam-link">
            /og
          </Link>{" "}
          before installing. For AI generation in your app, also add{" "}
          <code className="rounded-md bg-muted px-1.5 py-0.5 font-mono text-[12px] text-foreground">
            @atroui/api-generate
          </code>{" "}
          and set keys in{" "}
          <strong className="font-medium text-foreground">your</strong> env
          (see{" "}
          <Link href="/docs/host-api" className="bam-link">
            Host APIs
          </Link>
          ). Preview-only downloads work without AI.
        </>
      }
      extra={
        <section className="md-glass space-y-2 p-5">
          <h2 className="docs-section-title">
            Try it before you install
          </h2>
          <p className="text-[15px] leading-relaxed text-muted-foreground">
            Generate a card on this site, download it, then run the install
            command above to own the same source in your repo.
          </p>
          <Link href="/og" className="atro-btn mt-2 inline-flex w-fit">
            Open the OG workspace
          </Link>
        </section>
      }
    />
  )
}
