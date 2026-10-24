import type { Metadata } from "next"
import Link from "next/link"
import { RegistryInstallCommand } from "@/components/registry-install-command"
import { ThemeStudio } from "@/components/theme-studio"
import { ToolExitBand } from "@/components/tool-exit-band"
import { ToolRoom } from "@/components/tool-room"
import { docsPageMetadata } from "@/lib/docs-metadata"

export const metadata: Metadata = docsPageMetadata({
  title: "Theme Studio",
  description:
    "Live accents and radius for AtroUI. Export CSS for your app — Mira, Tide, Ember, Bloom, Graphite plus Soft / Mira / Sharp corners.",
  path: "/themes",
})

export default function ThemesPage() {
  return (
    <ToolRoom
      title="Theme Studio"
      lede={
        <>
          Live accents and radius. Export CSS for your app. See{" "}
          <Link href="/docs/theming" className="bam-link">
            Theming
          </Link>{" "}
          and{" "}
          <Link
            href="/docs/components/ui-color-theme-picker"
            className="bam-link"
          >
            Color theme picker
          </Link>
          .
        </>
      }
      meta={
        <>
          <RegistryInstallCommand items={["button"]} />
          <p className="max-w-sm text-[11px] leading-relaxed text-muted-foreground sm:text-right">
            Example: button ships with the accent you&rsquo;re browsing (Tide →
            @atroui/theme-tide). Picker + export CSS live in this room.
          </p>
        </>
      }
      exit={
        <ToolExitBand
          primaryHref="/docs/theming"
          primaryLabel="Read the theming guide"
          links={[
            { href: "/planner", label: "Project planner" },
            { href: "/og", label: "OG workspace" },
            {
              href: "/docs/components/ui-color-theme-picker",
              label: "Color theme picker",
            },
          ]}
        />
      }
    >
      <ThemeStudio />
    </ToolRoom>
  )
}
