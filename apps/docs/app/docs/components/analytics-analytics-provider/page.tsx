import type { Metadata } from "next"
import { componentPageMetadata } from "@/lib/docs-metadata"
import { RegistryComponentDoc } from "@/components/registry-component-doc"

export const metadata: Metadata = componentPageMetadata(
  "Analytics Provider",
  "/docs/components/analytics-analytics-provider",
  "Headless analytics + experiment helper. Loads Plausible/GA when env is set; no visible UI."
)

export default async function Page() {
  return (
    <RegistryComponentDoc
      registryName="analytics-provider"
      href="/docs/components/analytics-analytics-provider"
      title="Analytics Provider"
      description="Headless analytics + experiment helper. Loads Plausible/GA when env is set; no visible UI."
      usage="Mount once in the root layout. Set NEXT_PUBLIC_PLAUSIBLE_DOMAIN and/or NEXT_PUBLIC_GA_ID. Marked Headless in the catalog - pair with ThemeProvider, not a visual section."
      props={[
        {
          name: "children",
          type: "ReactNode",
          default: "-",
          description: "App tree to wrap.",
        },
      ]}
      code={`import {\n  AnalyticsProvider,\n  trackEvent,\n} from "@/components/blocks/analytics-provider"\n\n<AnalyticsProvider>{children}</AnalyticsProvider>`}
    />
  )
}
