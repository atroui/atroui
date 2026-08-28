import type { Metadata } from "next"
import { componentPageMetadata } from "@/lib/docs-metadata"
import { RegistryComponentDoc } from "@/components/registry-component-doc"

export const metadata: Metadata = componentPageMetadata(
  "Adaptive Theme Switch",
  "/docs/components/ui-theme-adapt",
  "A light/dark switch that retunes muted type so vital copy stays readable when a custom light palette goes dark."
)

export default async function Page() {
  return (
    <RegistryComponentDoc
      registryName="theme-adapt"
      href="/docs/components/ui-theme-adapt"
      title="Adaptive Theme Switch"
      description="A light/dark switch that retunes muted type so vital copy stays readable when a custom light palette goes dark."
      fullBleed
      usage="Requires next-themes ThemeProvider. The three-way Light / System / Dark pill is still @atroui/theme-toggle. Use this when a naive invert would hide body copy or flatten a designed light canvas."
      props={[
        {
          name: "className",
          type: "string",
          default: "-",
          description: "Extra classes on the control stack.",
        },
        {
          name: "adapt",
          type: "boolean",
          default: "true",
          description: "When true, night mode applies a generated companion from light tokens.",
        },
        {
          name: "minContrast",
          type: "number",
          default: "4.5",
          description: "WCAG contrast target for body and muted text.",
        },
      ]}
      code={`import { ThemeAdapt } from "@/components/ui/theme-adapt"\n\n<ThemeAdapt />`}
    />
  )
}
