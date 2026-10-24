/**
 * Theme facade — one deep import for live theming axes.
 *
 * Prefer: `import { … } from "atroui/lib/theme"`
 * HTML axes stay orthogonal (`data-color-theme`, `data-surface`, …);
 * TypeScript callers use this single seam instead of six axis files.
 */

export {
  COLOR_THEMES,
  COLOR_THEME_ATTR,
  COLOR_THEME_BOOT_SCRIPT,
  COLOR_THEME_STORAGE_KEY,
  COLOR_THEME_TOKENS,
  applyColorTheme,
  isColorThemeId,
  readStoredColorTheme,
  type AccentTokens,
  type ColorThemeId,
} from "./color-themes"

export {
  RADIUS_THEMES,
  RADIUS_THEME_ATTR,
  RADIUS_THEME_BOOT_SCRIPT,
  RADIUS_THEME_STORAGE_KEY,
  applyRadiusTheme,
  isRadiusThemeId,
  radiusThemeValue,
  readStoredRadiusTheme,
  type RadiusThemeId,
} from "./radius-themes"

export {
  SURFACE_THEMES,
  SURFACE_THEME_ATTR,
  SURFACE_THEME_BOOT_SCRIPT,
  SURFACE_THEME_STORAGE_KEY,
  SURFACE_THEME_TOKENS,
  applySurfaceTheme,
  isSurfaceThemeId,
  readStoredSurfaceTheme,
  type SurfaceRoomId,
  type SurfaceThemeId,
  type SurfaceTokens,
} from "./surface-themes"

export {
  TYPE_FACES,
  TYPE_THEMES,
  TYPE_BODY_ATTR,
  TYPE_BODY_DEFAULT,
  TYPE_BODY_STORAGE_KEY,
  TYPE_DISPLAY_ATTR,
  TYPE_DISPLAY_DEFAULT,
  TYPE_DISPLAY_STORAGE_KEY,
  TYPE_THEME_ATTR,
  TYPE_THEME_BOOT_SCRIPT,
  TYPE_THEME_LITERAL_REMAPS,
  TYPE_THEME_LITERAL_STACKS,
  TYPE_THEME_STORAGE_KEY,
  applyTypeBody,
  applyTypeDisplay,
  applyTypeTheme,
  isTypeFaceId,
  isTypeThemeId,
  readStoredTypeBody,
  readStoredTypeDisplay,
  readStoredTypeTheme,
  resolveTypePreset,
  typeBodyRemaps,
  typeDisplayRemaps,
  typeFaceMeta,
  type TypeBodyRemaps,
  type TypeDisplayRemaps,
  type TypeFaceId,
  type TypeFontRemaps,
  type TypeThemeId,
} from "./type-themes"

export { THEME_BOOT_SCRIPT } from "./theme-boot"

export {
  THEME_EXPORT_INSTALL,
  buildShadcnAddCommand,
  buildThemeExportCss,
  themeRegistryCompanions,
} from "./theme-export"
