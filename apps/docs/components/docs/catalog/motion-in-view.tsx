import Link from "next/link"
import { ComponentDoc } from "@/components/component-doc"
import { DemoFadeInSection } from "@/components/registry-demos"

export function MotionInViewDoc() {
  return (
    <ComponentDoc
      registryName="in-view"
      href="/docs/components/motion-in-view"
      title="In View"
      description="Deprecated alias — same motion as Fade In. Use Fade In instead."
      preview={<DemoFadeInSection />}
      code={`import { FadeIn, fadeInSection } from "@/components/ui/fade-in"

<FadeIn {...fadeInSection}>Section</FadeIn>`}
      fullBleed={false}
      usage={
        <>
          InView and FadeIn felt identical because they were the same recipe.
          Reach for{" "}
          <Link href="/docs/components/motion-fade-in" className="bam-link">
            Fade In
          </Link>
          — one scroll-reveal primitive. InView remains a thin deprecated alias
          with landing defaults so old installs keep compiling.
        </>
      }
    />
  )
}
