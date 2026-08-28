import type { Metadata } from "next"
import { componentPageMetadata } from "@/lib/docs-metadata"
import { RegistryComponentDoc } from "@/components/registry-component-doc"

export const metadata: Metadata = componentPageMetadata(
  "Fade In",
  "/docs/components/motion-fade-in",
  "Scroll-triggered fade + rise. Preview animates on mount."
)

export default async function Page() {
  return (
    <RegistryComponentDoc
      registryName="fade-in"
      href="/docs/components/motion-fade-in"
      title="Fade In"
      description="Scroll-triggered fade + rise. Preview animates on mount - use Replay to watch again."
      usage="Motion-based scroll fade. For a CSS IntersectionObserver reveal (no motion dependency), use @atroui/reveal."
      props={[
    { name: 'y', type: 'number', default: '14', description: 'Initial translateY.' },
    { name: 'delay', type: 'number', default: '0', description: 'Delay in seconds.' },
    { name: 'duration', type: 'number', default: '0.28', description: 'Spring duration.' },
  ]}
      code={`import { FadeIn } from "@/components/motion/fade-in"\n\n<FadeIn>Content</FadeIn>\n\n{/* Docs */}\n<FadeIn preview>Content</FadeIn>`}
    />
  )
}
