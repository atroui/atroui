/**
 * Docs motion surface — cubic-bezier / tween tokens live in `atroui`.
 * Landing Variants that need `motion/react` stay here.
 */

import type { Variants } from "motion/react"

export {
  STAGGER_DEFAULT,
  STAGGER_MAX,
  EXIT_DURATION_SCALE,
  atroMotionDefaults,
  avatarFallbackMotion,
  avatarImageMotion,
  avatarTween,
  backdropMotion,
  dialogContentMotion,
  dialogTween,
  drawerPanelMotion,
  easeOutExpo,
  easeOutSoft,
  enterEase,
  enterTween,
  exitEase,
  exitTween,
  fadeTween,
  fillTween,
  layoutTween,
  menuItemVariants,
  menuPopupMotion,
  menuPopupVariants,
  pageFade,
  panelTween,
  popupMotion,
  popupTween,
  presenceTweens,
  pressTween,
  revealTween,
  stagger,
  staggerContainer,
  staggerDelay,
  staggerItem,
  switchLayoutTween,
  toastMotion,
  toastTween,
  tooltipMotion,
  tooltipTween,
} from "atroui"
export type { DrawerPanelSide } from "atroui"

import { easeOutExpo } from "atroui"

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
