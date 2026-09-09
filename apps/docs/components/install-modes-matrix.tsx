"use client"

/**
 * Install modes — one path open at a time.
 * Panels stay mounted (Shiki once) and crossfade in place (fluidity).
 */

import * as React from "react"
import Link from "next/link"
import { LayoutGroup, motion, useReducedMotion } from "motion/react"
import { CodeBlock } from "@/components/code-block"
import { cn } from "@/lib/utils"
import { panelTween } from "@/lib/motion"

const MODES = [
  {
    id: "registry",
    title: "Registry UI only",
    summary: "Owned source files. No npm package.",
    lede: "Pure UI stops at the CLI. Source lands in your repo — no atroui package.",
    language: "bash" as const,
    code: `npx shadcn@latest add @atroui/home-hero
npx shadcn@latest add @atroui/site-header`,
  },
  {
    id: "forms",
    title: "Forms",
    summary: "UI + hardened Host API routes.",
    lede: "Package + transpile when forms post to /api/*. Your keys stay in your env.",
    language: "bash" as const,
    code: `npm i atroui
# next.config.ts → transpilePackages: ["atroui"]

npx shadcn@latest add @atroui/waitlist-form @atroui/api-waitlist`,
  },
  {
    id: "ai",
    title: "AI tools",
    summary: "OG, thumbnail, scope + matching APIs.",
    lede: "Same package setup, then the workspace UI plus its Host API route.",
    language: "bash" as const,
    code: `npx shadcn@latest add @atroui/og-workspace @atroui/api-generate
npx shadcn@latest add @atroui/thumbnail-workspace @atroui/api-thumbnail
npx shadcn@latest add @atroui/scope-chat @atroui/api-scope`,
  },
] as const

/**
 * Install modes: one mode open at a time (soft-rect tabs).
 * Not a nested DocsTrayStack — that felt like a wizard inside a wizard.
 */
export function InstallModesMatrix({
  showCanonicalLink = false,
}: {
  showCanonicalLink?: boolean
}) {
  const reduce = useReducedMotion()
  const [active, setActive] = React.useState(0)
  const layoutGroupId = React.useId()

  return (
    <div className="space-y-4">
      <p className="leading-relaxed">
        Never lead with{" "}
        <code className="rounded-md bg-muted px-1.5 py-0.5 font-mono text-[12px] text-foreground">
          npm i atroui
        </code>{" "}
        for pure UI. Add a registry block first; install the package only when{" "}
        <code className="rounded-md bg-muted px-1.5 py-0.5 font-mono text-[12px] text-foreground">
          /api/*
        </code>{" "}
        handlers show up.
      </p>

      <div className="overflow-hidden rounded-[var(--atro-panel-radius)] border border-border-subtle">
        <LayoutGroup id={layoutGroupId}>
          <div
            role="tablist"
            aria-label="Install modes"
            className="grid grid-cols-3 border-b border-border-subtle"
          >
            {MODES.map((m, i) => {
              const selected = i === active
              return (
                <button
                  key={m.id}
                  type="button"
                  role="tab"
                  aria-selected={selected}
                  id={`install-mode-tab-${m.id}`}
                  aria-controls={`install-mode-panel-${m.id}`}
                  tabIndex={selected ? 0 : -1}
                  onClick={() => setActive(i)}
                  onKeyDown={(e) => {
                    if (e.key === "ArrowRight") {
                      e.preventDefault()
                      setActive((v) => (v + 1) % MODES.length)
                    } else if (e.key === "ArrowLeft") {
                      e.preventDefault()
                      setActive((v) => (v - 1 + MODES.length) % MODES.length)
                    } else if (e.key === "Home") {
                      e.preventDefault()
                      setActive(0)
                    } else if (e.key === "End") {
                      e.preventDefault()
                      setActive(MODES.length - 1)
                    }
                  }}
                  className={cn(
                    "relative px-2 py-3 text-center transition-colors sm:px-3 sm:py-3.5",
                    selected
                      ? "bg-muted text-foreground"
                      : "text-muted-foreground hover:bg-muted/80 hover:text-foreground",
                  )}
                >
                  <span className="block text-[12px] font-medium tracking-tight sm:text-[13px]">
                    {m.title}
                  </span>
                  {selected ? (
                    reduce ? (
                      <span
                        aria-hidden
                        className="absolute inset-x-3 bottom-0 h-0.5 rounded-full bg-brand sm:inset-x-4"
                      />
                    ) : (
                      <motion.span
                        layoutId="install-mode-ink"
                        aria-hidden
                        className="absolute inset-x-3 bottom-0 h-0.5 rounded-full bg-brand sm:inset-x-4"
                        transition={panelTween}
                      />
                    )
                  ) : null}
                </button>
              )
            })}
          </div>
        </LayoutGroup>

        {/*
          Grid stack: every panel stays mounted (highlight once) and shares one
          cell so height holds to the tallest — crossfade in place, no teleport.
        */}
        <div className="grid">
          {MODES.map((m, i) => {
            const selected = i === active
            return (
              <motion.div
                key={m.id}
                role="tabpanel"
                id={`install-mode-panel-${m.id}`}
                aria-labelledby={`install-mode-tab-${m.id}`}
                aria-hidden={!selected}
                inert={!selected}
                initial={false}
                animate={
                  reduce
                    ? { opacity: selected ? 1 : 0 }
                    : {
                        opacity: selected ? 1 : 0,
                        y: selected ? 0 : 8,
                      }
                }
                transition={panelTween}
                style={{
                  gridArea: "1 / 1",
                  pointerEvents: selected ? "auto" : "none",
                }}
                className="space-y-3 px-4 py-4 sm:px-5"
              >
                <p className="font-mono text-[11px] tracking-[0.1em] text-muted-foreground uppercase">
                  {m.summary}
                </p>
                <p className="text-[14px] leading-relaxed text-[color:var(--docs-fg)]">
                  {m.lede}
                </p>
                <CodeBlock
                  language={m.language}
                  code={m.code}
                  embedded
                  className="!rounded-lg border border-border-subtle"
                />
              </motion.div>
            )
          })}
        </div>
      </div>

      {showCanonicalLink ? (
        <p className="leading-relaxed">
          Env, security, rate limits:{" "}
          <Link href="/docs/host-api" className="bam-link">
            Host APIs
          </Link>
          .
        </p>
      ) : null}
    </div>
  )
}
