import { ComponentDoc } from "@/components/component-doc"
import { DemoScrollProgress } from "@/components/registry-demos"


export function MotionPrimitivesScrollProgressDoc() {
  return (
    <ComponentDoc
      registryName="scroll-progress"
      href="/docs/components/motion-primitives-scroll-progress"
      title="Scroll Progress"
      description="Reading-progress bar. Direct scrollYProgress → scaleX by default; optional soft spring. Reduced motion hides the bar."
      preview={<DemoScrollProgress />}
      code={'import { ScrollProgress } from "@/components/motion-primitives/scroll-progress"\n\n{/* Production: fixed on viewport — direct scaleX */}\n<ScrollProgress className="fixed inset-x-0 top-0 h-0.5 bg-brand" />\n\n{/* Opt-in soft spring */}\n<ScrollProgress springOptions={{ stiffness: 120, damping: 28 }} />\n\n{/* Docs: tracks a local scroll container */}\n<ScrollProgress containerRef={ref} />'}
      fullBleed={false}
      usage="Usually fixed to the top of the viewport with bg-brand. Default is compositor-only (no spring)."
      props={[
    { name: 'className', type: 'string', default: '-', description: 'Positioning + color classes (e.g. fixed, bg-brand).' },
    { name: 'containerRef', type: 'RefObject<HTMLDivElement>', default: '-', description: 'Scroll container. Defaults to the document.' },
    { name: 'springOptions', type: 'SpringOptions', default: '-', description: 'Opt-in soft spring on scaleX. Omit for direct scroll binding.' },
  ]}
    />
  )
}
