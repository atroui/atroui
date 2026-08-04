import type { Metadata } from "next"
import { ComponentDoc } from "@/components/component-doc"
import { DemoJsonLd } from "@/components/registry-demos"

export const metadata: Metadata = {
  title: "JSON-LD",
}

export default function Page() {
  return (
    <ComponentDoc
      title="JSON-LD"
      description="schema.org helpers for Organization/WebSite, articles, FAQ, breadcrumbs, offers, and tool pages. Headless — emits JSON-LD scripts only."
      preview={<DemoJsonLd />}
      code={
        'import {\n  SiteGraphJsonLd,\n  ArticleJsonLd,\n  FaqJsonLd,\n  BreadcrumbJsonLd,\n} from "atroui"\n\n' +
        "<SiteGraphJsonLd />\n" +
        "<ArticleJsonLd title={…} description={…} slug={…} date={…} />"
      }
      installation='import { SiteGraphJsonLd, ArticleJsonLd } from "atroui"'
      usage="Render in the page (often the root layout or a template). Verify with View Source or Google’s Rich Results Test. Defaults brand to Makershot — override name where needed."
      props={[
        {
          name: "SiteGraphJsonLd.name",
          type: "string",
          default: '"Makershot"',
          description: "Organization / WebSite name.",
        },
        {
          name: "ArticleJsonLd",
          type: "title, description, slug, date…",
          default: "—",
          description: "Blog/journal article graph.",
        },
      ]}
    />
  )
}
