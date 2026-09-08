/**
 * Shared motion tokens — Family Values fluidity.
 * Use these instead of one-off springs that overshoot on web chrome.
 */

import type { Variants } from "motion/react"

export const easeOutExpo = [0.16, 1, 0.3, 1] as const
export const easeOutSoft = [0.32, 0.72, 0, 1] as const

/**
 * Landing hero / section reveal stagger (TimelineAnimation).
 * Opacity + y only — blur-in read as AI-slop atmosphere and cost a paint.
 */
export const revealBlur: Variants = {
  visible: (i: number) => ({
    y: 0,
    opacity: 1,
    transition: { delay: i * 0.12, duration: 0.5, ease: easeOutExpo },
  }),
  hidden: { y: 12, opacity: 0 },
}

/** Stagger step between sequential landing reveals (ms). */
export const landingStaggerMs = 120

/** Overlay / drawer panel slide */
export const panelTween = {
  duration: 0.28,
  ease: easeOutSoft,
} as const

/** Backdrop fade */
export const fadeTween = {
  duration: 0.2,
  ease: "easeOut" as const,
} as const

/** Dialog / command panel appear */
export const dialogTween = {
  duration: 0.22,
  ease: easeOutExpo,
} as const

/** Collapsible height (sidebar sections) */
export const revealTween = {
  duration: 0.24,
  ease: easeOutSoft,
} as const

/** Docs / blog page content continuity */
export const pageFade = {
  duration: 0.18,
  ease: easeOutSoft,
} as const
