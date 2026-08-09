"use client"

import * as React from "react"
import Link from "next/link"
import { AnimatePresence, motion, useReducedMotion } from "motion/react"
import { cn } from "@/lib/utils"
import { panelTween } from "@/lib/motion"

const code = (text: string) => (
  <code className="rounded-md bg-muted px-1.5 py-0.5 font-mono text-[12px] text-foreground">
    {text}
  </code>
)

const MODES = [
  {
    id: "registry",
    title: "Registry UI only",
    summary: "Owned source files. No npm package.",
    body: (
      <p className="text-[15px] leading-relaxed text-muted-foreground">
        Install with {code("npx @atroui/cli add …")} or{" "}
        {code("npx shadcn add @atroui/…")}. Source lands in your repo. No{" "}
        {code("atroui")} package required.
      </p>
    ),
  },
  {
    id: "forms",
    title: "Forms",
    summary: "UI + hardened Host API routes.",
    body: (
      <p className="text-[15px] leading-relaxed text-muted-foreground">
        {code("npm i atroui")}, {code('transpilePackages: ["atroui"]')}, then{" "}
        {code("@atroui/contact-form")} + {code("@atroui/api-contact")} (same
        pattern for waitlist / newsletter). Your keys stay in your env.
      </p>
    ),
  },
  {
    id: "ai",
    title: "AI tools",
    summary: "OG, thumbnail, scope + matching APIs.",
    body: (
      <p className="text-[15px] leading-relaxed text-muted-foreground">
        Same package setup + {code("@atroui/og-workspace")} /{" "}
        {code("thumbnail-workspace")} / {code("scope-chat")} +{" "}
        {code("@atroui/api-*")}.
      </p>
    ),
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
  const mode = MODES[active]!

  return (
    <div className="space-y-3">
      <p className="text-[15px] leading-relaxed text-muted-foreground">
        Never lead with {code("npm i atroui")} for pure UI. Use a registry CLI
        first ({code("npx @atroui/cli add")} or {code("npx shadcn add @atroui/…")});
        add the package only when {code("/api")} handlers appear.
      </p>

      <div className="overflow-hidden rounded-lg border border-border-subtle">
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
                onClick={() => setActive(i)}
                className={cn(
                  "relative px-2 py-3 text-center transition-colors sm:px-3 sm:py-3.5",
                  selected
                    ? "bg-white/[0.04] text-foreground"
                    : "text-muted-foreground hover:bg-white/[0.02] hover:text-foreground"
                )}
              >
                <span className="block text-[12px] font-medium tracking-tight sm:text-[13px]">
                  {m.title}
                </span>
                {selected ? (
                  <span
                    aria-hidden
                    className="absolute inset-x-3 bottom-0 h-0.5 rounded-full bg-brand sm:inset-x-4"
                  />
                ) : null}
              </button>
            )
          })}
        </div>

        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={mode.id}
            role="tabpanel"
            id={`install-mode-panel-${mode.id}`}
            aria-labelledby={`install-mode-tab-${mode.id}`}
            initial={reduce ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? undefined : { opacity: 0, y: -6 }}
            transition={panelTween}
            className="space-y-2 px-4 py-4 sm:px-5"
          >
            <p className="font-mono text-[11px] tracking-[0.1em] text-muted-foreground uppercase">
              {mode.summary}
            </p>
            {mode.body}
          </motion.div>
        </AnimatePresence>
      </div>

      {showCanonicalLink ? (
        <p className="text-[15px] leading-relaxed text-muted-foreground">
          Full Host API guide (env, security, rate limits):{" "}
          <Link href="/docs/host-api" className="bam-link">
            Host APIs
          </Link>
          .
        </p>
      ) : null}
    </div>
  )
}
