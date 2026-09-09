"use client"

/**
 * Registry workspace v6 — fixed-height scrollable preview + code glimpse.
 * Preview never shrinks to fit; overflow scrolls. Code shows 3 lines with
 * blur + expand (abstraction), not the whole file.
 */

import * as React from "react"
import Link from "next/link"
import { Braces, ChevronDown, ChevronUp } from "lucide-react"
import { AnimatePresence, motion, useReducedMotion } from "motion/react"
import { CopyButton, buildShadcnAddCommand } from "atroui"
import type {
  PreviewStrategy,
  RegistryWorkspaceBlock,
  RegistryWorkspaceBlockId,
} from "@/lib/registry-workspace-server"
import { extractSourceExcerpt } from "@/lib/registry-workspace-utils"
import { useLiveThemeInstallAxes } from "@/hooks/use-live-theme-install-axes"
import { cn } from "@/lib/utils"
import { easeOutExpo, easeOutSoft } from "@/lib/motion"

const GLIMPSE_LINES = 3
const EXPANDED_LINES = 22

type PreviewChild = React.ReactElement<{ blockId?: RegistryWorkspaceBlockId }>

function PreviewCanvas({
  strategy,
  designWidth,
  active = true,
  children,
}: {
  strategy: PreviewStrategy
  designWidth: number
  /** Remeasure when a keep-alive panel becomes visible. */
  active?: boolean
  children: React.ReactNode
}) {
  const outerRef = React.useRef<HTMLDivElement>(null)
  const innerRef = React.useRef<HTMLDivElement>(null)
  const [layout, setLayout] = React.useState({
    scale: 1,
    innerHeight: 0,
    innerWidth: designWidth,
  })

  React.useLayoutEffect(() => {
    const outer = outerRef.current
    const inner = innerRef.current
    if (!outer || !inner || !active) return

    const measure = () => {
      const ow = Math.max(outer.clientWidth, 1)
      const oh = Math.max(outer.clientHeight, 1)
      const ih = Math.max(inner.offsetHeight, 1)
      const iw = Math.max(inner.scrollWidth, designWidth, 1)

      if (strategy === "contain") {
        setLayout({ scale: 1, innerHeight: ih, innerWidth: iw })
        return
      }

      if (strategy === "fit") {
        // Lay out at designWidth, then scale into the stage.
        const scale = Math.min(ow / designWidth, oh / ih, 1)
        setLayout({
          scale,
          innerHeight: ih,
          innerWidth: designWidth,
        })
        return
      }

      // fold: shrink only when the stage is narrower than designWidth;
      // otherwise fill the viewport so full-bleed blocks aren't letterboxed.
      const scale = Math.min(ow / designWidth, 1)
      setLayout({
        scale,
        innerHeight: ih,
        innerWidth: scale < 1 ? designWidth : ow,
      })
    }

    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(outer)
    ro.observe(inner)
    return () => ro.disconnect()
  }, [strategy, designWidth, children, active])

  if (strategy === "contain") {
    return (
      <div ref={outerRef} className="rw-viewport rw-viewport--hug">
        <div
          ref={innerRef}
          className="rw-stage-content rw-stage-content--hug"
        >
          {children}
        </div>
      </div>
    )
  }

  const { scale, innerHeight, innerWidth } = layout
  const collapse = scale < 1 ? (1 - scale) * innerHeight : 0
  const baseWidth = strategy === "fit" ? designWidth : innerWidth

  return (
    <div
      ref={outerRef}
      className={cn(
        "rw-viewport",
        strategy === "fit" && "rw-viewport--fit"
      )}
    >
      <div
        className="rw-viewport-track"
        style={{
          width: baseWidth * scale,
          marginInline: "auto",
          height: innerHeight ? innerHeight * scale : undefined,
        }}
      >
        <div
          ref={innerRef}
          className="rw-stage-scaler"
          style={{
            width: baseWidth,
            transform: `scale(${scale})`,
            transformOrigin: "top left",
            marginBottom: collapse ? -collapse : undefined,
          }}
        >
          {children}
        </div>
      </div>
    </div>
  )
}

function GlimpseLines({
  lines,
}: {
  lines: { lineNumber: number; text: string; highlight: boolean }[]
}) {
  return (
    <pre className="rw-glimpse-code">
      <code>
        {lines.map((line) => (
          <div
            key={line.lineNumber}
            className={cn(
              "rw-source-line",
              line.highlight && "rw-source-line--hl"
            )}
          >
            <span className="rw-source-gutter">{line.lineNumber}</span>
            <span>{line.text || " "}</span>
          </div>
        ))}
      </code>
    </pre>
  )
}

function collectPreviews(
  explicit: Partial<Record<RegistryWorkspaceBlockId, React.ReactNode>> | undefined,
  children: React.ReactNode
): Map<RegistryWorkspaceBlockId, React.ReactNode> {
  const nodes = new Map<RegistryWorkspaceBlockId, React.ReactNode>()
  if (explicit) {
    for (const [id, node] of Object.entries(explicit) as [
      RegistryWorkspaceBlockId,
      React.ReactNode,
    ][]) {
      if (node != null) nodes.set(id, node)
    }
  }
  React.Children.forEach(children, (child) => {
    if (!React.isValidElement(child)) return
    const el = child as PreviewChild
    const id = el.props.blockId
    if (!id || nodes.has(id)) return
    // Prefer inner children so RegistryWorkspace owns the preview slot chrome
    const inner = (el.props as { children?: React.ReactNode }).children
    nodes.set(id, inner ?? child)
  })
  return nodes
}

export function RegistryWorkspace({
  blocks,
  previews,
  hero,
  pricing,
  principle,
  children,
  className,
}: {
  blocks: RegistryWorkspaceBlock[]
  /** Optional overrides for hero/pricing/principle (or tests). */
  previews?: Partial<Record<RegistryWorkspaceBlockId, React.ReactNode>>
  /** RSC slots for server-rendered registry sections. */
  hero?: React.ReactNode
  pricing?: React.ReactNode
  principle?: React.ReactNode
  children?: React.ReactNode
  className?: string
}) {
  const reduce = useReducedMotion()
  const { accent, radius, surface, type } = useLiveThemeInstallAxes()
  const slotMap = React.useMemo(() => {
    const fromSlots: Partial<Record<RegistryWorkspaceBlockId, React.ReactNode>> =
      {
        ...(principle != null ? { principle } : {}),
        ...(hero != null ? { hero } : {}),
        ...(pricing != null ? { pricing } : {}),
        ...previews,
      }
    return collectPreviews(fromSlots, children)
  }, [previews, principle, hero, pricing, children])

  // Stable RSC/client slots — one mount per block for the workspace lifetime.
  const [activeId, setActiveId] =
    React.useState<RegistryWorkspaceBlockId>("hero")
  const [expanded, setExpanded] = React.useState(false)
  const block = blocks.find((b) => b.id === activeId) ?? blocks[0]!
  const glimpse = extractSourceExcerpt(block.source, GLIMPSE_LINES)
  const fullExcerpt = extractSourceExcerpt(block.source, EXPANDED_LINES)
  const command = buildShadcnAddCommand([block.registry], {
    accent,
    radius,
    surface,
    type,
  })

  React.useEffect(() => {
    setExpanded(false)
  }, [activeId])

  function panelPreview(id: RegistryWorkspaceBlockId): React.ReactNode {
    return slotMap.get(id) ?? null
  }

  return (
    <div
      className={cn("rw-shell landing-demo-frame", className)}
      aria-label="AtroUI registry workspace"
    >
      <div className="rw-chrome">
        <div className="rw-tabs" role="tablist" aria-label="Registry blocks">
          {blocks.map((item) => (
            <button
              key={item.id}
              type="button"
              role="tab"
              aria-selected={item.id === activeId}
              aria-controls={`rw-panel-${item.id}`}
              id={`rw-tab-${item.id}`}
              onClick={() => setActiveId(item.id)}
              className={cn(
                "rw-tab",
                item.id === activeId && "rw-tab--active"
              )}
            >
              {item.label}
              {item.id === activeId && !reduce ? (
                <motion.span
                  layoutId="rw-tab-ink"
                  className="rw-tab-ink"
                  transition={{ duration: 0.28, ease: easeOutExpo }}
                />
              ) : item.id === activeId ? (
                <span className="rw-tab-ink" />
              ) : null}
            </button>
          ))}
        </div>
        <Link href={block.docs} className="rw-tab-docs">
          Docs →
        </Link>
      </div>

      <div className="rw-body">
        {/* Keep-alive panels — forms stay mounted; no AnimatePresence remount gap. */}
        <div className="rw-preview-stack">
          {blocks.map((item) => {
            const node = panelPreview(item.id)
            const active = item.id === activeId
            return (
              <div
                key={item.id}
                id={`rw-panel-${item.id}`}
                role="tabpanel"
                aria-labelledby={`rw-tab-${item.id}`}
                hidden={!active}
                className={cn(
                  "rw-preview-pane",
                  active && "rw-preview-pane--active"
                )}
              >
                <PreviewCanvas
                  strategy={item.preview.strategy}
                  designWidth={item.preview.designWidth}
                  active={active}
                >
                  <div
                    className="rw-preview-slot"
                    data-registry-preview={item.registry}
                    data-registry-source={item.target}
                  >
                    {node ?? (
                      <p className="rw-preview-missing">
                        Missing live preview for{" "}
                        <code>@atroui/{item.registry}</code>
                      </p>
                    )}
                  </div>
                </PreviewCanvas>
              </div>
            )
          })}
        </div>

        <div className={cn("rw-code-pane", expanded && "rw-code-pane--open")}>
          <div className="rw-code-head">
            <div className="rw-code-meta">
              <Braces className="rw-code-glyph" aria-hidden />
              <span className="rw-code-file">{block.target}</span>
            </div>
            <button
              type="button"
              className="rw-code-expand"
              aria-expanded={expanded}
              onClick={() => setExpanded((v) => !v)}
            >
              {expanded ? (
                <>
                  <ChevronUp className="size-3.5" aria-hidden />
                  <span>Collapse</span>
                </>
              ) : (
                <>
                  <ChevronDown className="size-3.5" aria-hidden />
                  <span>Expand code</span>
                </>
              )}
            </button>
          </div>

          <AnimatePresence mode="wait" initial={false}>
            {expanded ? (
              <motion.div
                key="full"
                className="rw-code-full"
                initial={reduce ? false : { opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={reduce ? undefined : { opacity: 0, height: 0 }}
                transition={{ duration: reduce ? 0 : 0.28, ease: easeOutExpo }}
              >
                <GlimpseLines lines={fullExcerpt.lines} />
                {fullExcerpt.truncated ? (
                  <p className="rw-code-more">
                    Full source copies into your repo via CLI
                  </p>
                ) : null}
              </motion.div>
            ) : (
              <motion.div
                key="glimpse"
                className="rw-glimpse"
                initial={reduce ? false : { opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={reduce ? undefined : { opacity: 0 }}
                transition={{ duration: reduce ? 0 : 0.18 }}
              >
                <GlimpseLines lines={glimpse.lines} />
                <div className="rw-glimpse-veil" aria-hidden />
                <button
                  type="button"
                  className="rw-glimpse-cta"
                  onClick={() => setExpanded(true)}
                >
                  <Braces className="size-3.5" aria-hidden />
                  <span>Expand code</span>
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <div className="rw-foot">
        <div className="rw-terminal">
          <span className="rw-term-prompt" aria-hidden>
            $
          </span>
          <AnimatePresence mode="wait" initial={false}>
            <motion.code
              key={command}
              className="rw-term-cmd"
              initial={reduce ? false : { opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduce ? undefined : { opacity: 0, y: -4 }}
              transition={{ duration: reduce ? 0 : 0.2, ease: easeOutSoft }}
            >
              {command}
            </motion.code>
          </AnimatePresence>
          <CopyButton
            key={command}
            value={command}
            size="icon-sm"
            variant="ghost"
            timeout={1600}
            className="rw-term-copy text-inherit hover:bg-foreground/[0.06] hover:text-foreground"
          />
        </div>
        {block.host ? (
          <div className="rw-host-chips" aria-label="Host API">
            <span className="rw-host-chip">{block.host.env}</span>
            <span className="rw-host-chip">{block.host.route}</span>
          </div>
        ) : null}
      </div>
    </div>
  )
}

export function RegistryWorkspacePreview({
  blockId: _blockId,
  children,
}: {
  blockId: RegistryWorkspaceBlockId
  children: React.ReactNode
}) {
  // Slot marker for RegistryWorkspace — parent reads blockId + children.
  void _blockId
  return <>{children}</>
}

RegistryWorkspacePreview.displayName = "RegistryWorkspacePreview"
