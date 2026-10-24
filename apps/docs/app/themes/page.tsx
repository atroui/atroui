import type { Metadata } from "next"
import Link from "next/link"
import { LiveInstall } from "@/components/landing/live-install"
import { ThemeStudio } from "@/components/theme-studio"
import { ToolExitBand } from "@/components/tool-exit-band"
import { ToolRoom } from "@/components/tool-room"
import { docsPageMetadata } from "@/lib/docs-metadata"

export const metadata: Metadata = docsPageMetadata({
  title: "Theme Studio — the Atro room",
  description:
    "Live accent, surface, type, and radius for AtroUI. Flip an axis, watch the room change, copy CSS or install companions with the section you want.",
  path: "/themes",
})

export default function ThemesPage() {
  return (
    <ToolRoom
      title="Theme Studio"
      lede={
        <>
          One room. Four orthogonal axes. Tune until it feels like Atro — then
          take the CSS or the companion packages into your app.{" "}
          <Link href="/docs/theming" className="bam-link">
            Theming guide
          </Link>
          .
        </>
      }
      meta={
        <>
          <div className="w-full max-w-md sm:max-w-sm">
            <LiveInstall />
          </div>
          <p className="max-w-sm text-[11px] leading-relaxed text-muted-foreground sm:text-right">
            Install line tracks the room you&rsquo;re browsing (Tide →
            @atroui/theme-tide). Copy CSS from the studio rail when you want the
            tokens without a package.
          </p>
        </>
      }
      exit={
        <ToolExitBand
          primaryHref="/docs/components/home-hero"
          primaryLabel="Install Home Hero"
          links={[
            { href: "/docs/theming", label: "Theming guide" },
            { href: "/docs/components", label: "All sections" },
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