import type { Metadata } from "next"
import { componentPageMetadata } from "@/lib/docs-metadata"
import { RegistryComponentDoc } from "@/components/registry-component-doc"

export const metadata: Metadata = componentPageMetadata(
  "Testimonial Schema",
  "/docs/components/seo-testimonial-schema",
  "Emits individual schema.org Review nodes from studio testimonials. Headless - no AggregateRating by design."
)

export default async function Page() {
  return (
    <RegistryComponentDoc
      registryName="testimonial-schema"
      href="/docs/components/seo-testimonial-schema"
      title="Testimonial Schema"
      description="Emits individual schema.org Review nodes from studio testimonials. Headless - no AggregateRating by design."
      usage="Place on pages where reviews should be eligible for rich results. Skips AggregateRating to avoid self-published star spam signals."
      props={[
        {
          name: "pageUrl",
          type: "string",
          default: "site URL",
          description: "Canonical URL for itemReviewed.",
        },
      ]}
      code={`import { TestimonialSchema } from "@/components/blocks/testimonial-schema"\n\n<TestimonialSchema />`}
    />
  )
}
