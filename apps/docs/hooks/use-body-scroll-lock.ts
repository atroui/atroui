"use client"

import { useEffect } from "react"

/**
 * iOS-safe body scroll lock for fluid overlays.
 * Compensates scrollbar width so locking doesn't shift the layout under the drawer.
 */
export function useBodyScrollLock(locked: boolean) {
  useEffect(() => {
    if (!locked) return

    const scrollY = window.scrollY
    const { style } = document.body
    const html = document.documentElement
    const scrollbar = window.innerWidth - html.clientWidth
    const prev = {
      overflow: style.overflow,
      position: style.position,
      top: style.top,
      left: style.left,
      right: style.right,
      width: style.width,
      paddingRight: style.paddingRight,
      htmlOverflow: html.style.overflow,
    }

    // Fixed lock — avoid overflow:hidden-only (iOS jump + drawer fight)
    style.overflow = "hidden"
    style.position = "fixed"
    style.top = `-${scrollY}px`
    style.left = "0"
    style.right = "0"
    style.width = "100%"
    if (scrollbar > 0) {
      style.paddingRight = `${scrollbar}px`
    }
    html.style.overflow = "hidden"

    return () => {
      style.overflow = prev.overflow
      style.position = prev.position
      style.top = prev.top
      style.left = prev.left
      style.right = prev.right
      style.width = prev.width
      style.paddingRight = prev.paddingRight
      html.style.overflow = prev.htmlOverflow
      window.scrollTo(0, scrollY)
    }
  }, [locked])
}
