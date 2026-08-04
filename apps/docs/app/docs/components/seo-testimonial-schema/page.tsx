import type { Metadata } from "next"
import { ComponentDoc } from "@/components/component-doc"
import { DemoTestimonialSchema } from "@/components/registry-demos"

export const metadata: Metadata = {
  title: "Testimonial Schema",
}

export default function Page() {
  return (
    <ComponentDoc
      title="Testimonial Schema"
      description="Emits individual schema.org Review nodes from studio testimonials. Headless — no AggregateRating by design."
      preview={<DemoTestimonialSchema />}
      code={
        'import { TestimonialSchema } from "atroui"\n\n' +
        "<TestimonialSchema />\n" +
        '<TestimonialSchema pageUrl="https://www.makershot.tech/about" />'
      }
      installation='import { TestimonialSchema } from "atroui"'
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
