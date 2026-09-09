"use client"

/**
 * Install line that ships the browsing accent/radius with the component.
 * Tide selected → `npx shadcn@latest add @atroui/button @atroui/theme-tide`
 */

import {
  COLOR_THEMES,
  RADIUS_THEMES,
  buildShadcnAddCommand,
  themeRegistryCompanions,
  type ColorThemeId,
  type RadiusThemeId,
} from "atroui"
import { InstallCommandChip } from "@/components/install-command-chip"
import { useLiveThemeInstallAxes } from "@/hooks/use-live-theme-install-axes"
import { cn } from "@/lib/utils"

function companionNote(accent: ColorThemeId, radius: RadiusThemeId): string | null {
  const companions = themeRegistryCompanions({ accent, radius })
  if (companions.length === 0) return null

  const accentLabel =
    COLOR_THEMES.find((t) => t.id === accent)?.label ?? accent
  const radiusLabel =
    RADIUS_THEMES.find((t) => t.id === radius)?.label ?? radius

  const hasAccent = accent !== "mira"
  const hasRadius = radius !== "mira"

  if (hasAccent && hasRadius) {
    return `Includes ${accentLabel} accent · ${radiusLabel} radius.`
  }
  if (hasAccent) return `Includes ${accentLabel} accent tokens.`
  return `Includes ${radiusLabel} radius.`
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
  const { accent, radius, mounted } = useLiveThemeInstallAxes()
  const command = buildShadcnAddCommand(items, { accent, radius })
  const note =
    showNote && mounted ? companionNote(accent, radius) : null

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
