import { ComponentDoc } from "@/components/component-doc"
import { DemoTestimonialsStack } from "@/components/registry-demos"

export function TestimonialsStackDoc() {
  return (
    <ComponentDoc
      href="/docs/components/testimonials-stack"
      registryName="testimonials-stack"
      title="Testimonials Stack"
      description="Layered testimonial card stack with prev/next controls. Install as @atroui/testimonials-stack."
      preview={<DemoTestimonialsStack />}
      code={`import { TestimonialsStack } from "@/components/blocks/testimonials-stack"

export function Example() {
  return <TestimonialsStack />
}`}
      fullBleed={false}
      usage="Drop mid-page as a social-proof section. After install, edit CONTENT and TESTIMONIALS at the top of the file with your own customer quotes."
    />
  )
}
