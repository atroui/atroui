"use client"

import * as React from "react"
import { getSpecimen, hasSpecimen } from "@/components/catalog/specimens"
import { cn } from "@/lib/utils"

/**
 * Renders a registry demo at its real size. No tile, no scale — the point of
 * the workbench is that you see the component the way it ships, not a postage
 * stamp of it.
 */
export function Stage({
  slug,
  className,
}: {
  slug: string
  className?: string
}) {
  const Specimen = hasSpecimen(slug) ? getSpecimen(slug) : undefined

  if (!Specimen) {
    return (
      <p className="text-sm text-muted-foreground">No live preview for this one.</p>
    )
  }

  return (
    <div data-preview="" className={cn("min-w-0", className)}>
      <React.Suspense fallback={<div className="h-24" aria-hidden />}>
        <Specimen />
      </React.Suspense>
    </div>
  )
}
