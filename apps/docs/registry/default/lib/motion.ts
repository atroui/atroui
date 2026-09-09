/**
 * Shared motion tokens — Family Values fluidity + Zajno × Motion.dev taste.
 *
 * ## Taste brief (locked)
 *
 * Sources (principles as tokens/comments — not copy):
 * - https://motion.zajno.com/ — easing, offset/delay, fade, transform/morph
 * - https://motion.dev/docs/react-layout-animations — `layout` / `layoutId` / `LayoutGroup`
 * - https://motion.dev/docs/react-animate-presence — exit; `mode="wait"` | `"popLayout"`
 * - https://motion.dev/docs/react-transitions — tween duration/ease (no spring bounce on chrome)
 * - https://motion.dev/examples?category=base-ui — Base UI presence patterns
 *
 * Zajno → AtroUI:
 * 1. **Easing** — UI settle is ease-out, never linear chrome. `easeOutExpo` for arrive /
 *    focus moments; `easeOutSoft` for panels / drawers / page chrome.
 * 2. **Offset & delay** — `staggerChildren` / `delayChildren` for hierarchy; keep ≤40–50ms
 *    (`stagger()` / `STAGGER_MAX`). Prefer Motion's `stagger()` from `motion/react` with
 *    our clamped seconds: `delayChildren: motionStagger(stagger(0.04))`.
 * 3. **Fade-in/out** — always pair opacity with subtle y or scale on popups (not opacity
 *    alone). Backdrop fades are the opacity-only exception.
 * 4. **Transform & morph** — shared elements travel via `layout` / `layoutId` +
 *    `LayoutGroup`; remounts feel like teleport.
 * 5. **Skip fireworks on primitives** — no parallax / zoom / blur-orb soup on catalog chrome.
 *
 * Motion.dev notes:
 * - Tweens only on chrome (`type: "tween"`). No spring overshoot (Family Values).
 * - AnimatePresence: default crossfade when heights differ; `mode="wait"` only when the
 *    outgoing must finish first; `popLayout` when exiting siblings should free layout space.
 * - `MotionConfig` defaults: pass `{...atroMotionDefaults}` (docs playground).
 *
 * Rules:
 * - Opacity always present on exit so Base UI `getAnimations()` can await leave.
 * - `useReducedMotion` → duration 0 / skip scale (call sites pass `reduce`).
 * - Chrome ≤300ms; press ≤100ms. Exit can run slightly faster than enter.
 */

/** Sharp settle for dialogs / focus / arrive moments (Zajno ease-out arrive) */
export const easeOutExpo = [0.16, 1, 0.3, 1] as const

/** Soft settle for panels / drawers / page chrome (Zajno ease-out soft) */
export const easeOutSoft = [0.32, 0.72, 0, 1] as const

/**
 * Enter / exit ease pairing (Zajno: correct easing on both legs).
 * Enter = arrive (expo); exit = soft settle out, slightly quicker via `exitTween`.
 */
export const enterEase = easeOutExpo
export const exitEase = easeOutSoft

/** Exit durations ≈ 80% of enter (Zajno: leave a beat faster than arrive). */
export const EXIT_DURATION_SCALE = 0.8

/** Default / max stagger between children (seconds). Hierarchy soft — ≤40–50ms. */
export const STAGGER_DEFAULT = 0.04
export const STAGGER_MAX = 0.05

/**
 * Clamp a stagger delay (seconds) for `staggerChildren` or Motion's `stagger()`.
 * Caps at {@link STAGGER_MAX} so list hierarchy stays subtle.
 *
 * ```ts
 * import { stagger as motionStagger } from "motion/react"
 * import { stagger } from "atroui"
 * // variants: { show: { transition: { staggerChildren: stagger(0.04) } } }
 * // or:      { show: { transition: { delayChildren: motionStagger(stagger()) } } }
 * ```
 */
export function stagger(delay: number = STAGGER_DEFAULT): number {
  if (!Number.isFinite(delay) || delay < 0) return 0
  return Math.min(delay, STAGGER_MAX)
}

/** @deprecated Prefer {@link stagger} — same clamp. */
export const staggerDelay = stagger

/** Build an enter tween (ease-out arrive). */
export function enterTween(
  duration: number,
  ease: readonly [number, number, number, number] | "easeOut" = enterEase
) {
  return { type: "tween" as const, duration, ease }
}

/** Build an exit tween — slightly faster than the matching enter. */
export function exitTween(
  enterDuration: number,
  ease: readonly [number, number, number, number] | "easeOut" = exitEase
) {
  return {
    type: "tween" as const,
    duration: enterDuration * EXIT_DURATION_SCALE,
    ease,
  }
}

/** Pair enter + exit tweens from one enter duration (presence helpers). */
export function presenceTweens(
  enterDuration: number,
  ease: readonly [number, number, number, number] | "easeOut" = enterEase,
  exitEaseOverride: readonly [number, number, number, number] | "easeOut" = exitEase
) {
  return {
    enter: enterTween(enterDuration, ease),
    exit: exitTween(enterDuration, exitEaseOverride),
  }
}

/**
 * Defaults for `<MotionConfig {...atroMotionDefaults}>` (docs playground).
 * Tween-only chrome — consumers override per-surface with dialog/popup/panel tokens.
 */
export const atroMotionDefaults = {
  transition: {
    type: "tween" as const,
    duration: 0.2,
    ease: easeOutSoft,
  },
  reducedMotion: "user" as const,
} as const

/** Overlay / drawer panel slide */
export const panelTween = {
  type: "tween" as const,
  duration: 0.28,
  ease: easeOutSoft,
} as const

/** Backdrop fade */
export const fadeTween = {
  type: "tween" as const,
  duration: 0.2,
  ease: "easeOut" as const,
} as const

/** Dialog / command panel appear */
export const dialogTween = {
  type: "tween" as const,
  duration: 0.22,
  ease: easeOutExpo,
} as const

/** Anchored popup (menu / popover) settle */
export const popupTween = {
  type: "tween" as const,
  duration: 0.2,
  ease: easeOutSoft,
} as const

/** Collapsible height (sidebar sections, accordion) */
export const revealTween = {
  type: "tween" as const,
  duration: 0.24,
  ease: easeOutSoft,
} as const

/** Docs / blog page content continuity */
export const pageFade = {
  type: "tween" as const,
  duration: 0.18,
  ease: easeOutSoft,
} as const

/**
 * Marketing chrome hide-on-scroll (Motion scroll-direction pattern).
 * Docs book headers stay fixed — never pass this tween there.
 * Call sites: `useReducedMotion` → skip hide (stay visible, no travel).
 */
export const SCROLL_HIDE_OFFSET = 150

export const scrollHideTween = {
  type: "tween" as const,
  duration: 0.28,
  ease: easeOutSoft,
} as const

/** Button / control press feedback (scale / translate) — ≤100ms */
export const pressTween = {
  type: "tween" as const,
  duration: 0.1,
  ease: easeOutExpo,
} as const

/**
 * Signature hover language (soft-rect Mira chrome):
 * Material brightens (CSS); geometry barely lifts; ink travels; never grow.
 * Hover ≤1px y; press into surface; focus mirrors hover.
 */
export const hoverLift = { y: -1 } as const
export const pressInto = { scale: 0.98, y: 1 } as const
/** Alias — keyboard focus uses the same target as hover. */
export const focusAsHover = hoverLift

/** Hover / focus settle — slightly longer Soft than press. */
export const hoverTween = {
  type: "tween" as const,
  duration: 0.14,
  ease: easeOutSoft,
} as const

/**
 * Gesture targets for soft-rect controls.
 * Prefer per-gesture transitions so press stays ≤100ms Expo while hover Soft.
 */
export function controlGestures(reduce?: boolean | null) {
  if (reduce) {
    return {
      whileHover: undefined,
      whileFocus: undefined,
      whileTap: undefined,
    }
  }
  return {
    whileHover: { ...hoverLift, transition: hoverTween },
    whileFocus: { ...focusAsHover, transition: hoverTween },
    whileTap: { ...pressInto, transition: pressTween },
  }
}

/**
 * Scroll / timeline sequence reveal — opacity + y only (never blur).
 * Delay step is landing-scale (~120ms), not list {@link stagger} (≤50ms).
 */
export const LANDING_STAGGER = 0.12

export const timelineRevealVariants = {
  visible: (i: number) => ({
    y: 0,
    opacity: 1,
    transition: {
      delay: i * LANDING_STAGGER,
      ...enterTween(0.28, easeOutExpo),
    },
  }),
  hidden: { y: 12, opacity: 0 },
} as const

/** In-view / section reveal enter (FadeIn / LineReveal). */
export const inViewTween = {
  type: "tween" as const,
  duration: 0.28,
  ease: easeOutSoft,
} as const

/** Tooltip appear / dismiss */
export const tooltipTween = {
  type: "tween" as const,
  duration: 0.12,
  ease: easeOutExpo,
} as const

/** Toast edge enter / exit (opacity + y) — keep ≤220ms; stack via CSS vars */
export const toastTween = {
  type: "tween" as const,
  duration: 0.2,
  ease: easeOutSoft,
} as const

/**
 * Progress / meter fill width tween.
 * Never use on a slider while `dragging` — drag must stay 1:1.
 */
export const fillTween = {
  type: "tween" as const,
  duration: 0.24,
  ease: easeOutSoft,
} as const

/** Avatar image / fallback crossfade */
export const avatarTween = {
  type: "tween" as const,
  duration: 0.18,
  ease: easeOutSoft,
} as const

/**
 * Shared-element / layoutId morph (tabs pill, toolbar expand, TextMorph chrome).
 * ~0.2–0.24s easeOutSoft — never spring bounce on chrome.
 * Wrap siblings in `LayoutGroup` when multiple layoutIds share a tree.
 */
export const layoutTween = {
  type: "tween" as const,
  duration: 0.22,
  ease: easeOutSoft,
} as const

/**
 * Switch thumb / track via Motion `layout` + flex justify flip
 * (Motion.dev Base UI Switch pattern). Slightly snappier than layoutTween.
 */
export const switchLayoutTween = {
  type: "tween" as const,
  duration: 0.16,
  ease: easeOutExpo,
} as const

/**
 * AnimatedGroup-style list container variants.
 * Use: `<motion.ul variants={staggerContainer} initial="hidden" animate="show">`
 * Pair with `staggerItem` children. Cap subtle — {@link stagger} ≤50ms.
 */
export const staggerContainer = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: stagger(),
    },
  },
} as const

/** AnimatedGroup-style list item — opacity + y (never opacity alone). */
export const staggerItem = {
  hidden: { opacity: 0, y: 4 },
  show: {
    opacity: 1,
    y: 0,
    transition: enterTween(0.16, easeOutSoft),
  },
} as const

/**
 * Menu popup variants — popup settle + staggerChildren ≤40ms.
 * Pair with `menuItemVariants` on MenuItem / SubTrigger / check/radio rows.
 * Closed path keeps opacity + scale for AnimatePresence exit.
 */
export const menuPopupVariants = {
  closed: {
    opacity: 0,
    scale: 0.98,
    transition: exitTween(popupTween.duration, popupTween.ease),
  },
  open: {
    opacity: 1,
    scale: 1,
    transition: {
      ...enterTween(popupTween.duration, popupTween.ease),
      staggerChildren: stagger(),
      delayChildren: 0.02,
    },
  },
} as const

/** Menu row enter — matches menuPopupVariants open/closed names. */
export const menuItemVariants = {
  closed: {
    opacity: 0,
    y: 4,
    transition: exitTween(0.16, easeOutSoft),
  },
  open: {
    opacity: 1,
    y: 0,
    transition: enterTween(0.16, easeOutSoft),
  },
} as const

/**
 * Menu / Select item highlight (Motion.dev origin settle + layoutId morph):
 * Prefer a single shared `layoutId` highlight sibling that morphs between
 * active items (LayoutGroup), not remounting per-row backgrounds.
 * Transition: `layoutTween`. Reduced motion → no layout animation / duration 0.
 * Do not spring-overshoot the highlight — easeOutSoft only.
 */

const instant = { type: "tween" as const, duration: 0 } as const

/** Backdrop fade for Dialog / Alert Dialog overlays (opacity-only exception). */
export function backdropMotion(reduce?: boolean | null) {
  const { enter, exit } = presenceTweens(fadeTween.duration, fadeTween.ease)
  return {
    initial: { opacity: 0 },
    animate: {
      opacity: 1,
      transition: reduce ? instant : enter,
    },
    exit: {
      opacity: 0,
      transition: reduce ? instant : exit,
    },
  }
}

/**
 * Centered dialog / alert popup.
 * Keeps translate(-50%, -50%) so Motion `transform` does not fight centering.
 * Opacity + y/scale settle (Zajno fade paired with travel). Exit slightly faster.
 */
export function dialogContentMotion(reduce?: boolean | null) {
  const closed = reduce
    ? "translate(-50%, -50%) scale(1)"
    : "translate(-50%, calc(-50% + 8px)) scale(0.98)"
  const open = "translate(-50%, -50%) scale(1)"
  const { enter, exit } = presenceTweens(dialogTween.duration, dialogTween.ease)
  return {
    initial: { opacity: 0, transform: closed },
    animate: {
      opacity: 1,
      transform: open,
      transition: reduce ? instant : enter,
    },
    exit: {
      opacity: 0,
      transform: closed,
      transition: reduce ? instant : exit,
    },
  }
}

/**
 * Anchored menu / popover popup (Positioner owns placement; origin CSS var).
 * Opacity + scale — never opacity alone on popups.
 */
export function popupMotion(reduce?: boolean | null) {
  const scale = reduce ? 1 : 0.96
  const { enter, exit } = presenceTweens(
    popupTween.duration,
    popupTween.ease,
    popupTween.ease
  )
  return {
    initial: { opacity: 0, scale },
    animate: {
      opacity: 1,
      scale: 1,
      transition: reduce ? instant : enter,
    },
    exit: {
      opacity: 0,
      scale,
      transition: reduce ? instant : exit,
    },
  }
}

/**
 * Menu surface — opacity + scale settle with staggerChildren for rows.
 * Reduced motion → flat fade, no stagger / scale.
 */
export function menuPopupMotion(reduce?: boolean | null) {
  if (reduce) {
    return {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      exit: { opacity: 0 },
      transition: instant,
    }
  }
  return {
    initial: "closed" as const,
    animate: "open" as const,
    exit: "closed" as const,
    variants: menuPopupVariants,
  }
}

/**
 * Tooltip — opacity + y from the side (Motion.dev Base UI Tooltip).
 * Skip scale; reduced motion → duration 0 / no y travel.
 */
export function tooltipMotion(reduce?: boolean | null) {
  const y = reduce ? 0 : 4
  const { enter, exit } = presenceTweens(tooltipTween.duration, tooltipTween.ease)
  return {
    initial: { opacity: 0, y },
    animate: {
      opacity: 1,
      y: 0,
      transition: reduce ? instant : enter,
    },
    exit: {
      opacity: 0,
      y,
      transition: reduce ? instant : exit,
    },
  }
}

export type DrawerPanelSide = "top" | "right" | "bottom" | "left"

/**
 * Drawer / sheet panel — slide from edge via `panelTween` (easeOutSoft).
 * Opacity stays 1 so Base UI `getAnimations()` still awaits leave.
 * Reduced motion → duration 0 / no travel.
 */
export function drawerPanelMotion(
  side: DrawerPanelSide = "right",
  reduce?: boolean | null
) {
  const closed =
    reduce
      ? { x: 0, y: 0 }
      : side === "right"
        ? { x: "100%", y: 0 }
        : side === "left"
          ? { x: "-100%", y: 0 }
          : side === "bottom"
            ? { x: 0, y: "100%" }
            : { x: 0, y: "-100%" }
  const { enter, exit } = presenceTweens(
    panelTween.duration,
    panelTween.ease,
    panelTween.ease
  )
  return {
    initial: { opacity: 1, ...closed },
    animate: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: reduce ? instant : enter,
    },
    exit: {
      opacity: 1,
      ...closed,
      transition: reduce ? instant : exit,
    },
  }
}

/**
 * Toast root — edge enter/exit opacity + y.
 * Stack offset / scale stay on CSS vars (`--toast-offset-y`, `--toast-index`)
 * so Motion transform does not fight the stack. Ending keeps opacity on the
 * exit path for Base UI `getAnimations()`.
 */
export function toastMotion(
  reduce?: boolean | null,
  ending?: boolean
) {
  const y = reduce ? 0 : 10
  const visible = { opacity: 1, y: 0 }
  const hidden = { opacity: 0, y }
  const { enter, exit } = presenceTweens(
    toastTween.duration,
    toastTween.ease,
    toastTween.ease
  )
  return {
    initial: hidden,
    animate: ending
      ? { ...hidden, transition: reduce ? instant : exit }
      : { ...visible, transition: reduce ? instant : enter },
  }
}

/** Avatar image fade-in once loaded (opacity + scale — Zajno fade+transform). */
export function avatarImageMotion(reduce?: boolean | null) {
  const { enter, exit } = presenceTweens(
    avatarTween.duration,
    avatarTween.ease,
    avatarTween.ease
  )
  const scaleIn = reduce ? 1 : 0.96
  const scaleOut = reduce ? 1 : 0.98
  return {
    initial: { opacity: 0, scale: scaleIn },
    animate: {
      opacity: 1,
      scale: 1,
      transition: reduce ? instant : enter,
    },
    exit: {
      opacity: 0,
      scale: scaleOut,
      transition: reduce ? instant : exit,
    },
  }
}

/** Avatar fallback — crossfades under / over the image (opacity + scale). */
export function avatarFallbackMotion(reduce?: boolean | null) {
  const { enter, exit } = presenceTweens(
    avatarTween.duration,
    avatarTween.ease,
    avatarTween.ease
  )
  const scaleIn = reduce ? 1 : 0.96
  const scaleOut = reduce ? 1 : 0.98
  return {
    initial: { opacity: 0, scale: scaleIn },
    animate: {
      opacity: 1,
      scale: 1,
      transition: reduce ? instant : enter,
    },
    exit: {
      opacity: 0,
      scale: scaleOut,
      transition: reduce ? instant : exit,
    },
  }
}
