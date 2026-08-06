import type { Metadata } from "next"
import { componentPageMetadata } from "@/lib/docs-metadata"
import { ComponentDoc } from "@/components/component-doc"
import { DemoScrollProgress } from "@/components/registry-demos"

export const metadata: Metadata = componentPageMetadata(
  "Scroll Progress",
  "/docs/components/motion-primitives-scroll-progress",
  "Reading-progress bar driven by scroll position."
)

export default function Page() {
  return (
    <ComponentDoc
      registryName="scroll-progress"
      href="/docs/components/motion-primitives-scroll-progress"
      title="Scroll Progress"
      description="Reading-progress bar. Production mounts it fixed on the viewport; the preview tracks a local scroll container."
      preview={<DemoScrollProgress />}
      code={'import { ScrollProgress } from "@/components/motion-primitives/scroll-progress"\n\n{/* Production: fixed on viewport */}\n<ScrollProgress />\n\n{/* Docs: tracks a local scroll container */}\n<ScrollProgress preview />'}
      fullBleed={false}
      usage="Usually fixed to the top of the viewport with bg-brand."
      props={[
    { name: 'className', type: 'string', default: '-', description: 'Positioning + color classes (e.g. fixed, bg-brand).' },
    { name: 'containerRef', type: 'RefObject<HTMLDivElement>', default: '-', description: 'Scroll container. Defaults to the document.' },
    { name: 'springOptions', type: 'SpringOptions', default: 'stiffness 200', description: 'Motion spring for scaleX.' },
  ]}
    />
  )
}
