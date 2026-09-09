import Link from "next/link"
import { ComponentDoc } from "@/components/component-doc"
import { DemoColorThemePicker } from "@/components/registry-demos"

export function UiColorThemePickerDoc() {
  return (
    <ComponentDoc
      href="/docs/components/ui-color-theme-picker"
      registryName="color-theme-picker"
      title="Color Theme Picker"
      description="Live accent theme list — click a swatch to recolor the site. Orthogonal to light / dark."
      preview={<DemoColorThemePicker />}
      code={
        'import { ColorThemePicker } from "@/components/ui/color-theme-picker"\n\n<ColorThemePicker />'
      }
      fullBleed={false}
      usage={
        <>
          Mount beside{" "}
          <Link href="/docs/components/ui-theme-toggle" className="bam-link">
            Theme Toggle
          </Link>
          ; this control only sets{" "}
          <code className="rounded-md bg-muted px-1.5 py-0.5 font-mono text-[12px] text-foreground">
            data-color-theme
          </code>
          . Paste{" "}
          <code className="rounded-md bg-muted px-1.5 py-0.5 font-mono text-[12px] text-foreground">
            COLOR_THEME_BOOT_SCRIPT
          </code>{" "}
          from{" "}
          <code className="rounded-md bg-muted px-1.5 py-0.5 font-mono text-[12px] text-foreground">
            @/lib/color-themes
          </code>{" "}
          into a blocking root{" "}
          <code className="rounded-md bg-muted px-1.5 py-0.5 font-mono text-[12px] text-foreground">
            {"<script>"}
          </code>{" "}
          so the stored accent applies before paint, and ship matching{" "}
          <code className="rounded-md bg-muted px-1.5 py-0.5 font-mono text-[12px] text-foreground">
            html[data-color-theme]
          </code>{" "}
          presets in globals (AtroUI{" "}
          <code className="rounded-md bg-muted px-1.5 py-0.5 font-mono text-[12px] text-foreground">
            globals.css
          </code>{" "}
          already has Mira / Tide / Ember / Bloom / Graphite).
        </>
      }
      props={[
        {
          name: "className",
          type: "string",
          default: "-",
          description: "Extra classes on the trigger button.",
        },
      ]}
    />
  )
}
