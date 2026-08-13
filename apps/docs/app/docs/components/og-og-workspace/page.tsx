import type { Metadata } from "next"
import { componentPageMetadata } from "@/lib/docs-metadata"
import Link from "next/link"
import { ComponentDoc } from "@/components/component-doc"
import { DemoOgWorkspace } from "@/components/registry-demos"

export const metadata: Metadata = componentPageMetadata(
  "Next.js OG Image Workspace (Satori + BYOK)",
  "/docs/components/og-og-workspace",
  "An interactive, client-side Open Graph social card workspace UI for Next.js powered by Satori, tailwindcss, and AI prompt overrides."
)

export default function Page() {
  return (
    <ComponentDoc
      registryName="og-workspace"
      href="/docs/components/og-og-workspace"
      title="Next.js OG Image Workspace (Satori + BYOK)"
      description="An interactive, client-side Open Graph social card workspace UI for Next.js powered by Satori, tailwindcss, and AI prompt overrides."
      preview={<DemoOgWorkspace />}
      code={'import { OgWorkspace } from "@/components/blocks/og-workspace"\n\n<OgWorkspace />'}
      fullBleed={true}
      usage={
        <>
          Install{" "}
          <code className="rounded-md bg-muted px-1.5 py-0.5 font-mono text-[12px] text-foreground">
            @atroui/api-generate
          </code>{" "}
          and set{" "}
          <code className="rounded-md bg-muted px-1.5 py-0.5 font-mono text-[12px] text-foreground">
            HUGGINGFACE_API_KEY
          </code>{" "}
          (or Google AI keys for freeform prompts) in{" "}
          <strong className="font-medium text-foreground">your</strong> env.
          AtroUI never ships keys. Preview-only downloads work without AI.
          Hosted workspace on this site:{" "}
          <Link href="/og" className="text-brand underline underline-offset-2">
            /og
          </Link>
          . Live sample elsewhere:{" "}
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
