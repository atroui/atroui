import type { Metadata } from "next"
import { componentPageMetadata } from "@/lib/docs-metadata"
import { ComponentDoc } from "@/components/component-doc"
import { DemoScrollProgress } from "@/components/registry-demos"

export const metadata: Metadata = componentPageMetadata(
  "Scroll Progress",
  "/docs/components/motion-primitives-scroll-progress"
)

export default function Page() {
  return (
    <ComponentDoc
      href="/docs/components/motion-primitives-scroll-progress"
      title="Scroll Progress"
      description="Reading-progress bar. Production mounts it fixed on the viewport; the preview tracks a local scroll container."
      preview={<DemoScrollProgress />}
      code={
        'import { ScrollProgress } from "atroui"\n\n' +
        '{/* Production - document scroll */}\n' +
        '<ScrollProgress className="fixed inset-x-0 top-0 z-60 h-0.5 bg-brand" />\n\n' +
        '{/* Optional - scoped to a scroll parent */}\n' +
        '<ScrollProgress containerRef={ref} className="absolute inset-x-0 top-0 h-0.5 bg-brand" />'
      }
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
