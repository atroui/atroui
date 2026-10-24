/**
 * Docs motion surface — cubic-bezier / tween tokens live in `atroui`.
 * Landing Variants that need `motion/react` stay here.
 */

import type { Variants } from "motion/react"

export {
  STAGGER_DEFAULT,
  STAGGER_MAX,
  LANDING_STAGGER,
  EXIT_DURATION_SCALE,
  atroMotionDefaults,
  avatarFallbackMotion,
  avatarImageMotion,
  avatarTween,
  backdropMotion,
  controlGestures,
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
  focusAsHover,
  hoverLift,
  hoverTween,
  inViewTween,
  SCROLL_REVEAL_BLUR,
  layoutTween,
  menuItemVariants,
  menuPopupMotion,
  menuPopupVariants,
  pageFade,
  pageEnterTween,
  PAGE_ENTER_Y,
  PAGE_ENTER_BLUR,
  panelTween,
  popupMotion,
  popupTween,
  presenceTweens,
  pressInto,
  pressTween,
  revealTween,
  SCROLL_HIDE_OFFSET,
  scrollHideTween,
  stagger,
  staggerContainer,
  staggerDelay,
  staggerItem,
  switchLayoutTween,
  timelineRevealVariants,
  toastMotion,
  toastTween,
  tooltipMotion,
  tooltipTween,
} from "atroui"
export type { DrawerPanelSide } from "atroui"

import { LANDING_STAGGER, timelineRevealVariants } from "atroui"

/**
 * Landing hero / section reveal stagger (TimelineAnimation).
 * Opacity + y only — blur-in read as AI-slop atmosphere and cost a paint.
 * Prefer {@link timelineRevealVariants} from atroui; this alias keeps docs call sites.
 */
export const reveal: Variants = timelineRevealVariants

/** @deprecated Use {@link reveal} — name kept so older MDX/demos keep compiling. */
export const revealBlur = reveal

/** Stagger step between sequential landing reveals (ms). */
export const landingStaggerMs = LANDING_STAGGER * 1000
