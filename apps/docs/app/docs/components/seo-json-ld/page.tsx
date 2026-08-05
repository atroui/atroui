import type { Metadata } from "next"
import { componentPageMetadata } from "@/lib/docs-metadata"
import { ComponentDoc } from "@/components/component-doc"
import { DemoJsonLd } from "@/components/registry-demos"

export const metadata: Metadata = componentPageMetadata(
  "JSON-LD",
  "/docs/components/seo-json-ld"
)

export default function Page() {
  return (
    <ComponentDoc
      title="JSON-LD"
      description="schema.org helpers for Organization/WebSite, articles, FAQ, breadcrumbs, offers, and tool pages. Headless - emits JSON-LD scripts only."
      preview={<DemoJsonLd />}
      code={
        'import {\n  SiteGraphJsonLd,\n  ArticleJsonLd,\n  FaqJsonLd,\n  BreadcrumbJsonLd,\n} from "atroui"\n\n' +
        "<SiteGraphJsonLd />\n" +
        "<ArticleJsonLd title={…} description={…} slug={…} date={…} />"
      }
      installation='import { SiteGraphJsonLd, ArticleJsonLd } from "atroui"'
      usage="Render in the page (often the root layout or a template). Verify with View Source or Google’s Rich Results Test. Organization name defaults to getBrand().name - pass name to override."
      props={[
        {
          name: "SiteGraphJsonLd.name",
          type: "string",
          default: "getBrand().name",
          description: "Organization / WebSite name.",
        },
        {
          name: "ArticleJsonLd",
          type: "title, description, slug, date…",
          default: "-",
          description: "Blog/journal article graph.",
        },
      ]}
    />
  )
}
