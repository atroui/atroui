/**
 * Combined early-paint boot for accent + radius themes.
 * Prefer this over separate color/radius scripts in the root layout.
 */

import {
  COLOR_THEME_ATTR,
  COLOR_THEME_STORAGE_KEY,
} from "./color-themes"
import {
  RADIUS_THEME_ATTR,
  RADIUS_THEME_STORAGE_KEY,
} from "./radius-themes"

/** Inline before paint — one IIFE for both `data-color-theme` and `data-radius`. */
export const THEME_BOOT_SCRIPT = `(function(){try{var ck=${JSON.stringify(COLOR_THEME_STORAGE_KEY)},ca=${JSON.stringify(COLOR_THEME_ATTR)},ct=localStorage.getItem(ck);if(ct&&ct!=="mira")document.documentElement.setAttribute(ca,ct);var rk=${JSON.stringify(RADIUS_THEME_STORAGE_KEY)},ra=${JSON.stringify(RADIUS_THEME_ATTR)},rt=localStorage.getItem(rk);if(rt&&rt!=="mira")document.documentElement.setAttribute(ra,rt);}catch(e){}})();`
