"use client"

import * as React from "react"
import Link from "next/link"
import { ArrowUpRight, MousePointerClick } from "lucide-react"
import { badgeLabel, type NavItem } from "@/lib/navigation"
import { previewRegistry } from "@/components/gallery/preview-registry"

/** Isolates a single live demo so one failure never blanks the gallery. */
class PreviewBoundary extends React.Component<
  { children: React.ReactNode; fallback: React.ReactNode },
  { failed: boolean }
> {
  state = { failed: false }
  static getDerivedStateFromError() {
    return { failed: true }
  }
  render() {
    if (this.state.failed) return this.props.fallback
    return this.props.children
  }
}

function useInView<T extends Element>(rootMargin = "300px") {
  const ref = React.useRef<T>(null)
  const [inView, setInView] = React.useState(false)

  React.useEffect(() => {
    const node = ref.current
    if (!node || inView) return
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setInView(true)
            observer.disconnect()
          }
        }
      },
      { rootMargin }
    )
    observer.observe(node)
    return () => observer.disconnect()
  }, [inView, rootMargin])

  return { ref, inView }
}

function Placeholder({ label }: { label: string }) {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-2 text-muted-foreground">
      <MousePointerClick className="size-5 opacity-70" aria-hidden />
      <span className="font-mono text-[11px] uppercase tracking-[0.14em]">
        {label}
      </span>
    </div>
  )
}

export function PreviewCard({ item }: { item: NavItem }) {
  const Demo = previewRegistry[item.href]
  const { ref, inView } = useInView<HTMLDivElement>()

  return (
    // Stretched-link pattern: the demo previews contain their own <a> tags, so
    // the card must NOT be an <a> ancestor. The overlay link is a sibling that
    // covers the card and captures the click.
    <div className="atro-tile group relative flex-col">
      <div
        ref={ref}
        className="atro-preview-canvas relative h-56 w-full overflow-hidden border-b border-border-subtle"
        aria-hidden
      >
        {Demo ? (
          inView ? (
            <div className="pointer-events-none absolute left-0 top-0 flex w-[200%] origin-top-left scale-50 justify-center p-6">
              <div className="w-full">
                <PreviewBoundary fallback={<Placeholder label="Preview" />}>
                  <Demo />
                </PreviewBoundary>
              </div>
            </div>
          ) : (
            <div className="atro-preview-skeleton absolute inset-0" />
          )
        ) : (
          <Placeholder label="Interactive" />
        )}
        <div className="atro-preview-veil pointer-events-none absolute inset-0" />
      </div>

      <div className="flex items-center justify-between gap-3 p-4">
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold tracking-tight text-foreground">
            {item.title}
          </p>
          {item.description ? (
            <p className="mt-0.5 truncate text-[12px] text-muted-foreground">
              {item.description}
            </p>
          ) : null}
        </div>
        <div className="flex shrink-0 items-center gap-2">
          {item.badge ? (
            <span
              className={
                item.badge === "registry"
                  ? "atro-chip"
                  : "atro-chip-brand atro-chip"
              }
            >
              {badgeLabel[item.badge]}
            </span>
          ) : null}
          <ArrowUpRight
            className="atro-tile-arrow size-4 text-muted-foreground"
            aria-hidden
          />
        </div>
      </div>

      <Link
        href={item.href}
        className="absolute inset-0 z-20 rounded-[inherit] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
      >
        <span className="sr-only">{item.title}</span>
      </Link>
    </div>
  )
}
