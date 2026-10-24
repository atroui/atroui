/**
 * Combined early-paint boot for accent + surface + radius + type themes.
 * Prefer this over separate axis scripts in the root layout.
 */

import {
  COLOR_THEME_ATTR,
  COLOR_THEME_STORAGE_KEY,
} from "./color-themes"
import {
  RADIUS_THEME_ATTR,
  RADIUS_THEME_STORAGE_KEY,
} from "./radius-themes"
import {
  SURFACE_THEME_ATTR,
  SURFACE_THEME_STORAGE_KEY,
} from "./surface-themes"
import { TYPE_THEME_BOOT_SCRIPT } from "./type-themes"

/**
 * Inline before paint — color, surface, radius, then type Display/Body
 * (type boot includes legacy pair migration).
 */
export const THEME_BOOT_SCRIPT = `(function(){try{var ck=${JSON.stringify(COLOR_THEME_STORAGE_KEY)},ca=${JSON.stringify(COLOR_THEME_ATTR)},ct=localStorage.getItem(ck);if(ct&&ct!=="mira")document.documentElement.setAttribute(ca,ct);var sk=${JSON.stringify(SURFACE_THEME_STORAGE_KEY)},sa=${JSON.stringify(SURFACE_THEME_ATTR)},st=localStorage.getItem(sk);if(st&&st!=="mira")document.documentElement.setAttribute(sa,st);var rk=${JSON.stringify(RADIUS_THEME_STORAGE_KEY)},ra=${JSON.stringify(RADIUS_THEME_ATTR)},rt=localStorage.getItem(rk);if(rt&&rt!=="mira")document.documentElement.setAttribute(ra,rt);}catch(e){}})();` +
  TYPE_THEME_BOOT_SCRIPT
