import Link from "next/link"
import { ComponentDoc } from "@/components/component-doc"
import { DemoLandingKit } from "@/components/registry-demos"

export function LandingLandingKitDoc() {
  return (
    <ComponentDoc
      registryName="landing-kit"
      href="/docs/components/landing-landing-kit"
      title="Landing Kit"
      description="One add for the Vibrant soft-rect marketing stack. Each section stays an owned file with CONTENT at the top."
      preview={<DemoLandingKit />}
      code={`import { LandingPage } from "@/components/blocks/landing-page"

<LandingPage />`}
      fullBleed={true}
      usage={
        <>
          <p className="mb-4 flex flex-wrap items-center gap-3">
            <Link href="/landing" className="atro-btn">
              Open live landing
            </Link>
            <Link href="/docs/collections/dark-marketing" className="bam-link">
              Dark marketing collection
            </Link>
          </p>
          <p>
            Live room{" "}
            <Link href="/landing" className="bam-link">
              /landing
            </Link>{" "}
            is the full-page try-it (same composition you install). This docs
            page is install truth. Prefer the meta when you want the full stack;
            use{" "}
            <code className="rounded bg-muted px-1 py-0.5 font-mono text-[12px]">
              @atroui/saas-starter
            </code>{" "}
            for a single-file composite, or add sections à la carte. Optional
            motion heroes{" "}
            <code className="rounded bg-muted px-1 py-0.5 font-mono text-[12px]">
              @atroui/hero-lamp
            </code>{" "}
            /{" "}
            <code className="rounded bg-muted px-1 py-0.5 font-mono text-[12px]">
              @atroui/hero-parallax
            </code>{" "}
            stay outside this kit on purpose.
          </p>
        </>
      }
    />
  )
}
