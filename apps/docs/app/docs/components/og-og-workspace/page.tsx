import type { Metadata } from "next"
import { componentPageMetadata } from "@/lib/docs-metadata"
import Link from "next/link"
import { ComponentDoc } from "@/components/component-doc"
import { DemoOgWorkspace } from "@/components/registry-demos"

export const metadata: Metadata = componentPageMetadata(
  "OG Workspace",
  "/docs/components/og-og-workspace"
)

export default function Page() {
  return (
    <ComponentDoc
      href="/docs/components/og-og-workspace"
      title="OG Workspace"
      description="Full OG image generator workspace UI. Catalog demos do not call paid image APIs."
      preview={<DemoOgWorkspace />}
      code={'import { OgWorkspace } from "@/components/og/og-workspace"\n\n<OgWorkspace />'}
      fullBleed={true}
      usage={
        <>
          AtroUI docs do not ship generation backends - bring your own{" "}
          <code className="rounded-md bg-muted px-1.5 py-0.5 font-mono text-[12px] text-foreground">
            POST /api/generate
          </code>{" "}
          (and keys such as{" "}
          <code className="rounded-md bg-muted px-1.5 py-0.5 font-mono text-[12px] text-foreground">
            HUGGINGFACE_API_KEY
          </code>
          ) in the host app. To try a live generator without wiring keys here,
          use{" "}
          <a
            href="https://www.makershot.tech/og"
            target="_blank"
            rel="noopener noreferrer"
            className="text-brand underline underline-offset-2"
          >
            makershot.tech/og
          </a>
          .
        </>
      }
      extra={
        <section className="md-glass space-y-2 p-5">
          <h2 className="ds-headline text-base text-foreground">
            Live demo elsewhere
          </h2>
          <p className="text-[15px] leading-relaxed text-muted-foreground">
            Sample outputs and the hybrid FLUX + Satori pipeline are running in
            production at{" "}
            <a
              href="https://www.makershot.tech/og"
              target="_blank"
              rel="noopener noreferrer"
              className="text-brand underline underline-offset-2"
            >
              https://www.makershot.tech/og
            </a>
            . This page is UI + integration docs only.
          </p>
          <Link
            href="https://www.makershot.tech/og"
            className="ms-cta mt-2 inline-flex w-fit"
            target="_blank"
            rel="noopener noreferrer"
          >
            Open live OG tool
          </Link>
        </section>
      }
    />
  )
}
