"use client"

/**
 * Install line that ships browsing theme axes with the component.
 * Tide + Paper + Serif body → `… add @atroui/button @atroui/theme-tide @atroui/surface-paper @atroui/type-body-serif`
 */

import {
  COLOR_THEMES,
  RADIUS_THEMES,
  SURFACE_THEMES,
  buildShadcnAddCommand,
  themeRegistryCompanions,
  type ColorThemeId,
  type RadiusThemeId,
  type SurfaceThemeId,
} from "atroui"
import {
  typeFaceMeta,
  type TypeFaceId,
} from "atroui/lib/type-themes"
import { InstallCommandChip } from "@/components/install-command-chip"
import { useLiveThemeInstallAxes } from "@/hooks/use-live-theme-install-axes"
import { cn } from "@/lib/utils"

function companionNote(
  accent: ColorThemeId,
  radius: RadiusThemeId,
  surface: SurfaceThemeId,
  typeDisplay: TypeFaceId,
  typeBody: TypeFaceId,
): string | null {
  const companions = themeRegistryCompanions({
    accent,
    radius,
    surface,
    typeDisplay,
    typeBody,
  })
  if (companions.length === 0) return null

  const bits: string[] = []
  if (accent !== "mira") {
    bits.push(
      `${COLOR_THEMES.find((t) => t.id === accent)?.label ?? accent} accent`,
    )
  }
  if (surface !== "mira") {
    bits.push(
      `${SURFACE_THEMES.find((t) => t.id === surface)?.label ?? surface} surface`,
    )
  }
  if (typeDisplay !== "serif") {
    bits.push(`${typeFaceMeta(typeDisplay).label} display`)
  }
  if (typeBody !== "sans") {
    bits.push(`${typeFaceMeta(typeBody).label} body`)
  }
  if (radius !== "mira") {
    bits.push(
      `${RADIUS_THEMES.find((t) => t.id === radius)?.label ?? radius} radius`,
    )
  }

  if (bits.length === 0) return null
  if (bits.length === 1) return `Includes ${bits[0]} tokens.`
  return `Includes ${bits.join(" · ")}.`
}

export function RegistryInstallCommand({
  items,
  className,
  showNote = true,
}: {
  items: string[]
  className?: string
  showNote?: boolean
}) {
  const { accent, radius, surface, typeDisplay, typeBody, mounted } =
    useLiveThemeInstallAxes()
  const command = buildShadcnAddCommand(items, {
    accent,
    radius,
    surface,
    typeDisplay,
    typeBody,
  })
  const note =
    showNote && mounted
      ? companionNote(accent, radius, surface, typeDisplay, typeBody)
      : null

  return (
    <div className={cn("space-y-1.5", className)}>
      <InstallCommandChip command={command} />
      {note ? (
        <p className="text-[12px] leading-relaxed text-muted-foreground">
          {note}
        </p>
      ) : null}
    </div>
  )
}
