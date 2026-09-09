"use client"

/**
 * Live accent + surface + type (display/body) + radius axes for install commands.
 * Syncs from storage + data-* attrs on <html>.
 *
 * Type-face helpers import from `atroui/lib/type-themes` — not the package barrel —
 * so Next optimizePackageImports cannot leave new exports as undefined.
 */

import * as React from "react"
import {
  COLOR_THEME_ATTR,
  COLOR_THEME_STORAGE_KEY,
  RADIUS_THEME_ATTR,
  RADIUS_THEME_STORAGE_KEY,
  SURFACE_THEME_ATTR,
  SURFACE_THEME_STORAGE_KEY,
  readStoredColorTheme,
  readStoredRadiusTheme,
  readStoredSurfaceTheme,
  type ColorThemeId,
  type RadiusThemeId,
  type SurfaceThemeId,
} from "atroui"
import {
  TYPE_BODY_ATTR,
  TYPE_BODY_STORAGE_KEY,
  TYPE_DISPLAY_ATTR,
  TYPE_DISPLAY_STORAGE_KEY,
  TYPE_THEME_STORAGE_KEY,
  readStoredTypeBody,
  readStoredTypeDisplay,
  readStoredTypeTheme,
  type TypeFaceId,
  type TypeThemeId,
} from "atroui/lib/type-themes"

export function useLiveThemeInstallAxes(): {
  accent: ColorThemeId
  radius: RadiusThemeId
  surface: SurfaceThemeId
  typeDisplay: TypeFaceId
  typeBody: TypeFaceId
  /** Nearest pair preset when Display+Body match one (else mira). */
  type: TypeThemeId
  mounted: boolean
} {
  const [accent, setAccent] = React.useState<ColorThemeId>("mira")
  const [radius, setRadius] = React.useState<RadiusThemeId>("mira")
  const [surface, setSurface] = React.useState<SurfaceThemeId>("mira")
  const [typeDisplay, setTypeDisplay] = React.useState<TypeFaceId>("serif")
  const [typeBody, setTypeBody] = React.useState<TypeFaceId>("sans")
  const [type, setType] = React.useState<TypeThemeId>("mira")
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    const sync = () => {
      setAccent(readStoredColorTheme())
      setRadius(readStoredRadiusTheme())
      setSurface(readStoredSurfaceTheme())
      setTypeDisplay(readStoredTypeDisplay())
      setTypeBody(readStoredTypeBody())
      setType(readStoredTypeTheme())
    }
    sync()
    setMounted(true)

    const onStorage = (event: StorageEvent) => {
      if (
        event.key === null ||
        event.key === COLOR_THEME_STORAGE_KEY ||
        event.key === RADIUS_THEME_STORAGE_KEY ||
        event.key === SURFACE_THEME_STORAGE_KEY ||
        event.key === TYPE_DISPLAY_STORAGE_KEY ||
        event.key === TYPE_BODY_STORAGE_KEY ||
        event.key === TYPE_THEME_STORAGE_KEY
      ) {
        sync()
      }
    }
    window.addEventListener("storage", onStorage)

    const root = document.documentElement
    const mo = new MutationObserver(sync)
    mo.observe(root, {
      attributes: true,
      attributeFilter: [
        COLOR_THEME_ATTR,
        RADIUS_THEME_ATTR,
        SURFACE_THEME_ATTR,
        TYPE_DISPLAY_ATTR,
        TYPE_BODY_ATTR,
      ],
    })

    return () => {
      window.removeEventListener("storage", onStorage)
      mo.disconnect()
    }
  }, [])

  return { accent, radius, surface, typeDisplay, typeBody, type, mounted }
}
