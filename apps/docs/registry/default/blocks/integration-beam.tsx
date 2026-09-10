"use client"

import {
  Calendar,
  CreditCard,
  Database,
  GitBranch,
  Mail,
  MessageSquare,
} from "lucide-react"
import { motion, useReducedMotion } from "motion/react"

/**
 * Edit CONTENT / NODES to match your integrations. Center node with
 * orbiting satellites and SVG beams. Mobile uses a wrap grid; orbit
 * layout from md up. Static under reduced motion.
 * After install this file lives in your repo.
 */
const CONTENT = {
  stamp: "Integrations",
  headlineBefore: "Plays well with",
  headlineAccent: "your stack",
  headlineAfter: ".",
  lede: "Swap NODES for your real integrations. Beams are pure SVG.",
  centerLabel: "Your app",
  centerNote: "One API key",
}

const NODES = [
  { icon: Database, label: "Postgres" },
  { icon: CreditCard, label: "Stripe" },
  { icon: Mail, label: "Resend" },
  { icon: MessageSquare, label: "Slack" },
  { icon: Calendar, label: "Calendar" },
  { icon: GitBranch, label: "GitHub" },
]

/** Satellite positions around the center (percent coords in the orbit box). */
const SLOTS = [
  { left: "8%", top: "12%" },
  { left: "72%", top: "6%" },
  { left: "4%", top: "62%" },
  { left: "78%", top: "58%" },
  { left: "30%", top: "82%" },
  { left: "60%", top: "84%" },
]

function NodeChip({
  icon: Icon,
  label,
}: {
  icon: (typeof NODES)[number]["icon"]
  label: string
}) {
  return (
    <div className="flex items-center gap-2 rounded-[var(--atro-control-radius,var(--radius))] border border-border-subtle bg-card px-3 py-2 shadow-sm">
      <Icon className="size-3.5 text-brand" aria-hidden />
      <span className="text-xs font-medium whitespace-nowrap text-foreground">
        {label}
      </span>
    </div>
  )
}

function CenterNode() {
  return (
    <div className="flex flex-col items-center rounded-[var(--atro-panel-radius,var(--radius))] border border-[color-mix(in_oklch,var(--brand)_45%,var(--border-subtle))] bg-card px-6 py-5 shadow-[0_0_60px_-12px_color-mix(in_oklch,var(--brand)_45%,transparent)]">
      <span
        className="size-2.5 animate-pulse rounded-full bg-brand motion-reduce:animate-none"
        aria-hidden
      />
      <p className="mt-2 text-sm font-medium whitespace-nowrap text-foreground">
        {CONTENT.centerLabel}
      </p>
      <p className="mt-0.5 text-xs whitespace-nowrap text-muted-foreground">
        {CONTENT.centerNote}
      </p>
    </div>
  )
}

export function IntegrationBeam() {
  const reduce = useReducedMotion()

  return (
    <section className="border-t border-border-subtle bg-background text-foreground">
      <div className="border-b border-border-subtle">
        <div className="mx-auto max-w-7xl border-x border-border-subtle px-6 py-12 sm:px-10 sm:py-16">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-[11px] font-semibold tracking-[0.14em] text-muted-foreground uppercase">
              {CONTENT.stamp}
            </p>
            <h2 className="mt-4 text-3xl font-medium tracking-tight text-foreground sm:text-5xl">
              {CONTENT.headlineBefore}{" "}
              <span className="italic text-brand">{CONTENT.headlineAccent}</span>
              {CONTENT.headlineAfter}
            </h2>
            <p className="mt-4 text-[15px] leading-relaxed text-muted-foreground">
              {CONTENT.lede}
            </p>
          </div>

          {/* Mobile — wrap grid, no absolute overflow */}
          <div className="mt-10 flex flex-col items-center gap-6 md:hidden">
            <CenterNode />
            <ul className="flex max-w-md flex-wrap items-center justify-center gap-2">
              {NODES.map((node) => (
                <li key={node.label}>
                  <NodeChip icon={node.icon} label={node.label} />
                </li>
              ))}
            </ul>
          </div>

          {/* md+ — orbit diagram */}
          <div className="relative mx-auto mt-10 hidden aspect-[4/3] max-h-[28rem] w-full max-w-3xl md:block">
            <svg
              aria-hidden
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
              className="absolute inset-0 h-full w-full text-muted-foreground/60"
            >
              {SLOTS.map((slot) => {
                const x = parseFloat(slot.left)
                const y = parseFloat(slot.top)
                return (
                  <line
                    key={`${slot.left}-${slot.top}`}
                    x1="50"
                    y1="48"
                    x2={x + 6}
                    y2={y + 4}
                    stroke="currentColor"
                    strokeWidth="0.35"
                    strokeDasharray="1.5 1.2"
                    vectorEffect="non-scaling-stroke"
                  />
                )
              })}
            </svg>

            <motion.div
              aria-hidden
              className="absolute inset-x-10 top-6 bottom-10 rounded-[50%] border border-dashed border-border-subtle sm:inset-x-16"
              animate={reduce ? undefined : { rotate: 360 }}
              transition={
                reduce
                  ? undefined
                  : { duration: 60, repeat: Infinity, ease: "linear" }
              }
            >
              <span className="absolute -top-1.5 left-1/2 size-3 -translate-x-1/2 rounded-full border border-border-subtle bg-[color-mix(in_oklch,var(--brand)_55%,var(--card))]" />
              <span className="absolute top-1/2 -right-1.5 size-2 -translate-y-1/2 rounded-full bg-muted" />
              <span className="absolute -bottom-1 left-1/4 size-2 rounded-full bg-muted" />
            </motion.div>

            <div className="absolute top-[48%] left-1/2 -translate-x-1/2 -translate-y-1/2">
              <CenterNode />
            </div>

            {NODES.map((node, i) => {
              const slot = SLOTS[i % SLOTS.length]!
              return (
                <div
                  key={node.label}
                  className="absolute -translate-x-1/2 -translate-y-1/2"
                  style={{ left: slot.left, top: slot.top }}
                >
                  <NodeChip icon={node.icon} label={node.label} />
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
