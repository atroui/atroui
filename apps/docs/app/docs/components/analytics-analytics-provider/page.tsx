import type { Metadata } from "next"
import { ComponentDoc } from "@/components/component-doc"
import { DemoAnalyticsProvider } from "@/components/registry-demos"

export const metadata: Metadata = {
  title: "Analytics Provider",
}

export default function Page() {
  return (
    <ComponentDoc
      title="Analytics Provider"
      description="Headless analytics + experiment helper. Loads Plausible/GA when env is set; no visible UI."
      preview={<DemoAnalyticsProvider />}
      code={
        'import { AnalyticsProvider, trackEvent, useExperiment } from "atroui"\n\n' +
        "<AnalyticsProvider>\n  {children}\n</AnalyticsProvider>\n\n" +
        'trackEvent("cta_click", { placement: "hero" })'
      }
      installation='import { AnalyticsProvider, trackEvent } from "atroui"'
      usage="Mount once in the root layout. Set NEXT_PUBLIC_PLAUSIBLE_DOMAIN and/or NEXT_PUBLIC_GA_ID. Marked Headless in the catalog — pair with ThemeProvider, not a visual section."
      props={[
        {
          name: "children",
          type: "ReactNode",
          default: "—",
          description: "App tree to wrap.",
        },
      ]}
    />
  )
}
