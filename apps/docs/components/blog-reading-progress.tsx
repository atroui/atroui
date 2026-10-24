"use client"

import { ScrollProgress } from "atroui"

/**
 * Thin reading bar for long essays — careful delight, not chrome fireworks.
 * Tracks document scroll; fixed at the viewport top edge under the sticky header.
 */
export function BlogReadingProgress() {
  return (
    <ScrollProgress className="pointer-events-none fixed inset-x-0 top-0 z-[45] h-0.5 bg-brand" />
  )
}
