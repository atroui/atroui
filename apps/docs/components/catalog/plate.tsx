"use client"

import * as React from "react"
import Link from "next/link"
import type { CatalogEntry } from "@/lib/catalog"
import { badgeLabel } from "@/lib/navigation"
import { getSpecimen, hasSpecimen } from "@/components/catalog/specimens"
import { cn } from "@/lib/utils"

/**
 * Width a full-bleed section lays out against before being scaled into the
 * tile, so the composition is the real desktop one rather than a squashed
 * mobile view.
 */
const VIRTUAL_WIDTH = 1280

/**
 * How far a specimen may be shrunk before its own type stops being readable.
 * Past this, cropping to a fade beats scaling — a legible top half says more
 * about a component than an illegible whole.
 */
const MIN_SCALE = 0.62

/**
 * Sizes a specimen to its plate.
 *
 * `bleed` lays the section out at {@link VIRTUAL_WIDTH} and scales it to fill
 * the plate exactly; everything else renders at its natural size and is scaled
 * down only when it would otherwise be clipped. Both factors have to be
 * measured — plate width changes with the column count and a specimen's height
 * is whatever its content happens to be, so any fixed number leaves some
 * component either overflowing or stranded in a corner.
 *
 * Transforms don't affect layout size, so reading `offsetHeight` back after
 * scaling can't feed the observer its own output.
 */
function FitFrame({
  bleed,
  children,
}: {
  bleed: boolean
  children: React.ReactNode
}) {
  const hostRef = React.useRef<HTMLDivElement | null>(null)
  const frameRef = React.useRef<HTMLDivElement | null>(null)
  const [scale, setScale] = React.useState(bleed ? 0 : 1)
  const [cropped, setCropped] = React.useState(false)

  React.useEffect(() => {
    const host = hostRef.current
    const frame = frameRef.current
    if (!host || !frame) return

    function measure() {
      if (!host || !frame) return
      const box = host.getBoundingClientRect()
      if (!box.width || !box.height) return

      const natural = frame.offsetHeight

      if (bleed) {
        // Fill the width so the section's real composition reads. A page
        // section is often still taller than the tile at that scale, so it
        // crops from the top rather than shrinking away from both edges.
        const fill = box.width / VIRTUAL_WIDTH
        setScale(fill)
        setCropped(natural * fill > box.height + 1)
        return
      }

      const needed = natural > box.height ? box.height / natural : 1
      setScale(Math.max(needed, MIN_SCALE))
      setCropped(needed < MIN_SCALE)
    }

    const observer = new ResizeObserver(measure)
    observer.observe(host)
    observer.observe(frame)
    return () => observer.disconnect()
  }, [bleed])

  return (
    <div
      ref={hostRef}
      className={cn("plate-fit", cropped && "plate-fit-cropped")}
      aria-hidden
    >
      <div
        ref={frameRef}
        className="plate-fit-frame"
        style={{
          width: bleed ? VIRTUAL_WIDTH : "100%",
          transform: `scale(${scale})`,
        }}
      >
        {children}
      </div>
    </div>
  )
}

/**
 * Mounts children only once the plate approaches the viewport. Seventy-one live
 * React trees on one page is the whole reason a catalog-as-landing usually
 * isn't attempted; deferring the mount is what makes it viable.
 */
function useNearViewport<T extends HTMLElement>(enabled: boolean) {
  const ref = React.useRef<T | null>(null)
  const [near, setNear] = React.useState(!enabled)

  React.useEffect(() => {
    if (!enabled || near) return
    const node = ref.current
    if (!node) return

    if (typeof IntersectionObserver === "undefined") {
      setNear(true)
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setNear(true)
          observer.disconnect()
        }
      },
      { rootMargin: "400px 0px" }
    )
    observer.observe(node)
    return () => observer.disconnect()
  }, [enabled, near])

  return { ref, near }
}

/**
 * The authored face for specimens that cannot render inside a tile — overlays
 * that own the viewport, fixed chrome, headless modules, and BYOK tools.
 * Saying why is more useful than showing an empty box.
 */
function StaticFace({ entry }: { entry: CatalogEntry }) {
  const reason = entry.tags.includes("overlay")
    ? "Opens over the page"
    : entry.tags.includes("fixed")
      ? "Fixed to the viewport"
      : entry.tags.includes("byok")
        ? "Runs on your keys"
        : entry.tags.includes("3d")
          ? "Renders in 3D"
          : "No visual output"

  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-2 px-6 text-center">
      <span className="text-[15px] font-medium tracking-[-0.02em] text-foreground">
        {entry.title}
      </span>
      <span className="spec-label">{reason}</span>
    </div>
  )
}

export function Plate({
  entry,
  priority = false,
  caption = true,
}: {
  entry: CatalogEntry
  priority?: boolean
  /** Family tiles embed the stage only so the outer card can own the link. */
  caption?: boolean
}) {
  const isLive = entry.preview === "live" && hasSpecimen(entry.slug)
  const { ref, near } = useNearViewport<HTMLDivElement>(isLive && !priority)
  // Resolved only once the plate is near the viewport, so the demo chunk is
  // never requested for a component you scrolled past.
  const Specimen = isLive && near ? getSpecimen(entry.slug) : undefined

  return (
    <article className="plate group h-full">
      <div
        ref={ref}
        // Headings inside belong to the specimen, not to the page outline.
        data-preview=""
        className={cn(
          "plate-stage",
          entry.fit === "bleed" && "plate-stage-bleed"
        )}
      >
        {Specimen ? (
          <React.Suspense fallback={<div className="h-full w-full" aria-hidden />}>
            <FitFrame bleed={entry.fit === "bleed"}>
              <Specimen />
            </FitFrame>
          </React.Suspense>
        ) : isLive ? (
          // Reserve the exact height so the grid never reflows on mount.
          <div className="h-full w-full" aria-hidden />
        ) : (
          <StaticFace entry={entry} />
        )}
        {caption ? <span className="plate-preview">Preview</span> : null}
      </div>

      {caption ? (
        <h3 className="plate-caption">
          <Link href={entry.href} className="outline-none after:absolute after:inset-0">
            {entry.title}
          </Link>
          {entry.badge ? (
            <span className="spec-label shrink-0">{badgeLabel[entry.badge]}</span>
          ) : null}
        </h3>
      ) : null}
    </article>
  )
}
