import type { Metadata } from "next"
import { componentPageMetadata } from "@/lib/docs-metadata"
import { ComponentDoc } from "@/components/component-doc"
import { DemoTestimonialSchema } from "@/components/registry-demos"

export const metadata: Metadata = componentPageMetadata(
  "Testimonial Schema",
  "/docs/components/seo-testimonial-schema",
  "Emits individual schema.org Review nodes from studio testimonials. Headless - no AggregateRating by design."
)

export default function Page() {
  return (
    <ComponentDoc
      href="/docs/components/seo-testimonial-schema"
      title="Testimonial Schema"
      description="Emits individual schema.org Review nodes from studio testimonials. Headless - no AggregateRating by design."
      preview={<DemoTestimonialSchema />}
      code={'import { TestimonialSchema } from "@/components/seo/testimonial-schema"\n\n<TestimonialSchema testimonials={[…]} />'}
      usage="Place on pages where reviews should be eligible for rich results. Skips AggregateRating to avoid self-published star spam signals."
      props={[
        {
          name: "pageUrl",
          type: "string",
          default: "site URL",
          description: "Canonical URL for itemReviewed.",
        },
      ]}
    />
  )
}
