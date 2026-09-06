"use client"

/**
 * Live-component marquee — the landing's signature "everything is real" moment.
 * Each tile renders an actual registry component (scaled, non-interactive) and
 * links to its docs. Two rows drift in opposite directions; hover pauses;
 * reduced-motion turns it into a plain horizontal scroller.
 */

import * as React from "react"
import Link from "next/link"
import { allNavItems, type NavItem } from "@/lib/navigation"
import { previewRegistry } from "@/components/gallery/preview-registry"

class TileBoundary extends React.Component<
  { children: React.ReactNode },
  { failed: boolean }
> {
  state = { failed: false }
  static getDerivedStateFromError() {
    return { failed: true }
  }
  render() {
    if (this.state.failed) return null
    return this.props.children
  }
}

const ROW_A = [
  "/docs/components/ui-button",
  "/docs/components/ui-card",
  "/docs/components/pricing-overview",
  "/docs/components/feature-grid",
  "/docs/components/faq-interactive-preview",
  "/docs/components/deadline-countdown",
  "/docs/components/count-up",
]

const ROW_B = [
  "/docs/components/brand-waitlist-form",
  "/docs/components/ui-form-select",
  "/docs/components/currently",
  "/docs/components/stack-list",
  "/docs/components/logo-cloud",
  "/docs/components/changelog",
  "/docs/components/project-list",
]

const byHref = new Map(allNavItems.map((item) => [item.href, item]))

function Tile({ href }: { href: string }) {
  const item = byHref.get(href) as NavItem | undefined
  const Demo = previewRegistry[href]
  if (!item || !Demo) return null

  return (
    <div className="atro-marquee-tile atro-tile flex-col">
      <div
        className="atro-preview-canvas relative flex-1 overflow-hidden"
        aria-hidden
      >
        <div className="pointer-events-none absolute left-0 top-0 flex w-[250%] origin-top-left scale-[0.4] justify-center p-5">
          <div className="w-full">
            <TileBoundary>
              <Demo />
            </TileBoundary>
          </div>
        </div>
        <div className="atro-preview-veil pointer-events-none absolute inset-0" />
      </div>
      <div className="flex items-center justify-between gap-2 border-t border-border-subtle px-3 py-2">
        <span className="ds-sketch text-sm text-foreground">{item.title}</span>
        <span className="ds-mono-label">{item.badge === "host-api" ? "API" : "CLI"}</span>
      </div>
      <Link
        href={href}
        className="absolute inset-0 z-20 rounded-[inherit]"
        tabIndex={-1}
        aria-label={item.title}
      />
    </div>
  )
}

function Row({ hrefs, reverse }: { hrefs: string[]; reverse?: boolean }) {
  // Duplicate the set so the -50% keyframe loops seamlessly.
  const tiles = [...hrefs, ...hrefs]
  return (
    <div className="atro-marquee-viewport">
      <div
        className={`atro-marquee-track${reverse ? " atro-marquee-track--reverse" : ""}`}
      >
        {tiles.map((href, i) => (
          <Tile key={`${href}-${i}`} href={href} />
        ))}
      </div>
    </div>
  )
}

export function LiveMarquee() {
  return (
    <div
      className="atro-marquee flex flex-col gap-4"
      style={{ ["--marquee-duration" as string]: "68s" }}
      aria-label="A selection of live AtroUI components"
    >
      <Row hrefs={ROW_A} />
      <Row hrefs={ROW_B} reverse />
    </div>
  )
}
