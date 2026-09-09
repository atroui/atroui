"use client"

/**
 * Live accent + surface + type + radius axes for install commands.
 * Syncs from storage + data-* attrs on <html>.
 */

import * as React from "react"
import {
  COLOR_THEME_ATTR,
  COLOR_THEME_STORAGE_KEY,
  RADIUS_THEME_ATTR,
  RADIUS_THEME_STORAGE_KEY,
  SURFACE_THEME_ATTR,
  SURFACE_THEME_STORAGE_KEY,
  TYPE_THEME_ATTR,
  TYPE_THEME_STORAGE_KEY,
  readStoredColorTheme,
  readStoredRadiusTheme,
  readStoredSurfaceTheme,
  readStoredTypeTheme,
  type ColorThemeId,
  type RadiusThemeId,
  type SurfaceThemeId,
  type TypeThemeId,
} from "atroui"

export function useLiveThemeInstallAxes(): {
  accent: ColorThemeId
  radius: RadiusThemeId
  surface: SurfaceThemeId
  type: TypeThemeId
  mounted: boolean
} {
  const [accent, setAccent] = React.useState<ColorThemeId>("mira")
  const [radius, setRadius] = React.useState<RadiusThemeId>("mira")
  const [surface, setSurface] = React.useState<SurfaceThemeId>("mira")
  const [type, setType] = React.useState<TypeThemeId>("mira")
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    const sync = () => {
      setAccent(readStoredColorTheme())
      setRadius(readStoredRadiusTheme())
      setSurface(readStoredSurfaceTheme())
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
        TYPE_THEME_ATTR,
      ],
    })

    return () => {
      window.removeEventListener("storage", onStorage)
      mo.disconnect()
    }
  }, [])

  return { accent, radius, surface, type, mounted }
}
