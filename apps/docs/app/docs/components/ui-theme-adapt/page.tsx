import type { Metadata } from "next"
import { componentPageMetadata } from "@/lib/docs-metadata"
import { ComponentDoc } from "@/components/component-doc"
import { DemoThemeAdapt } from "@/components/registry-demos"

export const metadata: Metadata = componentPageMetadata(
  "Adaptive Theme Switch",
  "/docs/components/ui-theme-adapt",
  "A light/dark switch that retunes muted type so vital copy stays readable when a custom light palette goes dark."
)

export default function Page() {
  return (
    <ComponentDoc
      href="/docs/components/ui-theme-adapt"
      registryName="theme-adapt"
      title="Adaptive Theme Switch"
      description="A light/dark switch that retunes muted type so vital copy stays readable when a custom light palette goes dark."
      preview={<DemoThemeAdapt />}
      code={
        'import { ThemeAdapt } from "@/components/ui/theme-adapt"\n\n<ThemeAdapt />'
      }
      fullBleed
      usage="Requires next-themes ThemeProvider. The three-way Light / System / Dark pill is still @atroui/theme-toggle. Use this when a naive invert would hide body copy or flatten a designed light canvas."
      extra={
        <div className="space-y-3 text-[15px] leading-relaxed text-muted-foreground">
          <p>
            DAY/NIGHT samples your light{" "}
            <code className="rounded bg-muted px-1 py-0.5 font-mono text-[12px] text-foreground">
              :root
            </code>{" "}
            tokens, builds an OKLCH companion (same hue, darker canvas, type to
            AA), and writes it onto the page. The three columns still show
            Light / Naive crush / Adapt for Kiln, Uptime, Dusk, and Edition.
            shadcn/ui ships a class toggle and two token sheets you write by
            hand — not a runtime companion from light tokens.
          </p>
        </div>
      }
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
    />
  )
}
