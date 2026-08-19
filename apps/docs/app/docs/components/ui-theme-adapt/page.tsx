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
            Read the three columns together. Light is the designed canvas.
            Naive dark is the usual crush. Adapt keeps brand and lifts muted
            type to AA. Pick Kiln, Uptime, Dusk, or Edition to see a different
            light mix take the same path.
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
          description: "Lift type tokens after the mode change.",
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
