"use client"

import { useRef } from "react"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "motion/react"

/**
 * Edit CONTENT / ROWS to match your product. Rows drift horizontally on
 * scroll (scrubbed) and render static under reduced motion.
 * After install this file lives in your repo.
 */
const CONTENT = {
  stamp: "Why teams switch",
  headlineBefore: "Scroll through",
  headlineAccent: "the proof",
  headlineAfter: ".",
  lede: "Real workflows, shipped by real teams. Replace these cards with your own customer stories.",
  primaryCta: { label: "Start your project", href: "/contact" },
  secondaryCta: { label: "See the work", href: "/work" },
}

const ROWS = [
  [
    { title: "Checkout in 6 days", detail: "Stripe + inventory, live before launch." },
    { title: "AI support triage", detail: "Grounded answers, human escalation." },
    { title: "Design system v2", detail: "Tokens, docs, and 40 components." },
    { title: "Onboarding revamp", detail: "Activation up without a rewrite." },
  ],
  [
    { title: "Docs that convert", detail: "Search, examples, and copy that sells." },
    { title: "Internal admin", detail: "Ops tooling the team actually uses." },
    { title: "Mobile PWA", detail: "Offline-first field app for crews." },
    { title: "Analytics rollout", detail: "Events, dashboards, and decisions." },
  ],
  [
    { title: "Migration rescue", detail: "Off legacy hosting with zero downtime." },
    { title: "Brand refresh", detail: "New voice, same customers — louder." },
    { title: "API platform", detail: "Versioned, documented, dependable." },
    { title: "Launch week", detail: "Scoped Monday, shipped Friday." },
  ],
]

const EASE_EXPO = [0.16, 1, 0.3, 1] as const

function ParallaxRow({
  cards,
  x,
  staticRow,
  label,
}: {
  cards: { title: string; detail: string }[]
  x: MotionValue<number>
  staticRow: boolean
  label: string
}) {
  const list = [...cards, ...cards]
  return (
    <div className="overflow-hidden" aria-label={label}>
      <motion.ul
        className="flex w-max gap-4 pr-4"
        style={staticRow ? undefined : { x }}
      >
        {list.map((card, i) => (
          <li
            key={`${card.title}-${i}`}
            aria-hidden={i >= cards.length}
            className="w-64 shrink-0 rounded-[var(--atro-panel-radius)] border border-border-subtle bg-card p-5 sm:w-72"
          >
            <p className="font-mono text-[11px] tabular-nums text-muted-foreground">
              {String((i % cards.length) + 1).padStart(2, "0")}
            </p>
            <p className="mt-3 text-[15px] font-medium tracking-tight text-foreground">
              {card.title}
            </p>
            <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
              {card.detail}
            </p>
          </li>
        ))}
      </motion.ul>
    </div>
  )
}

export function HeroParallax() {
  const ref = useRef<HTMLElement>(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })
  const xSlow = useTransform(scrollYProgress, [0, 1], [24, -24])
  const xMid = useTransform(scrollYProgress, [0, 1], [-32, 32])
  const xFast = useTransform(scrollYProgress, [0, 1], [48, -48])
  const xs = [xSlow, xMid, xFast] as const

  return (
    <section
      ref={ref}
      className="relative overflow-hidden border-t border-border-subtle bg-background text-foreground"
    >
      <div className="border-b border-border-subtle">
        <div className="mx-auto max-w-7xl border-x border-border-subtle px-6 py-12 text-center sm:px-10 sm:py-16">
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, ease: EASE_EXPO }}
            className="mx-auto flex max-w-2xl flex-col items-center"
          >
            <p className="atro-chip">
              <span className="size-1.5 rounded-full bg-brand" aria-hidden />
              {CONTENT.stamp}
            </p>
            <h2 className="mt-4 text-3xl font-medium tracking-tight text-foreground sm:text-5xl">
              {CONTENT.headlineBefore}{" "}
              <span className="italic text-brand">{CONTENT.headlineAccent}</span>
              {CONTENT.headlineAfter}
            </h2>
            <p className="mt-4 max-w-lg text-[15px] leading-relaxed text-muted-foreground">
              {CONTENT.lede}
            </p>
            <div className="mt-6">
              <Link
                href={CONTENT.primaryCta.href}
                className="atro-btn justify-center"
              >
                {CONTENT.primaryCta.label}
                <ArrowRight className="size-4" aria-hidden />
              </Link>
            </div>
            <p className="mt-4 text-sm text-muted-foreground">
              <Link
                href={CONTENT.secondaryCta.href}
                className="font-medium text-foreground underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
              >
                {CONTENT.secondaryCta.label}
              </Link>
            </p>
          </motion.div>
        </div>
      </div>

      <div className="border-b border-border-subtle">
        <div className="mx-auto max-w-7xl space-y-4 border-x border-border-subtle py-8 sm:py-10">
          {ROWS.map((cards, i) => (
            <ParallaxRow
              key={i}
              cards={cards}
              x={xs[i % xs.length]!}
              staticRow={reduce ?? false}
              label={`Highlight row ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
