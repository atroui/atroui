"use client"

/**
 * Live accent + radius axes for install commands.
 * Syncs from storage + data-color-theme / data-radius on <html>.
 */

import * as React from "react"
import {
  COLOR_THEME_ATTR,
  COLOR_THEME_STORAGE_KEY,
  RADIUS_THEME_ATTR,
  RADIUS_THEME_STORAGE_KEY,
  readStoredColorTheme,
  readStoredRadiusTheme,
  type ColorThemeId,
  type RadiusThemeId,
} from "atroui"

export function useLiveThemeInstallAxes(): {
  accent: ColorThemeId
  radius: RadiusThemeId
  mounted: boolean
} {
  const [accent, setAccent] = React.useState<ColorThemeId>("mira")
  const [radius, setRadius] = React.useState<RadiusThemeId>("mira")
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    const sync = () => {
      setAccent(readStoredColorTheme())
      setRadius(readStoredRadiusTheme())
    }
    sync()
    setMounted(true)

    const onStorage = (event: StorageEvent) => {
      if (
        event.key === null ||
        event.key === COLOR_THEME_STORAGE_KEY ||
        event.key === RADIUS_THEME_STORAGE_KEY
      ) {
        sync()
      }
    }
    window.addEventListener("storage", onStorage)

    const root = document.documentElement
    const mo = new MutationObserver(sync)
    mo.observe(root, {
      attributes: true,
      attributeFilter: [COLOR_THEME_ATTR, RADIUS_THEME_ATTR],
    })

    return () => {
      window.removeEventListener("storage", onStorage)
      mo.disconnect()
    }
  }, [])

  return { accent, radius, mounted }
}
