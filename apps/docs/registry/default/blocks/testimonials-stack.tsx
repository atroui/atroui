"use client"

import { useState } from "react"
import { ArrowLeft, ArrowRight, Quote } from "lucide-react"
import { AnimatePresence, motion, useReducedMotion } from "motion/react"

/**
 * Edit CONTENT / TESTIMONIALS for your social proof. Layered card stack
 * with prev/next controls and an aria-live region.
 * After install this file lives in your repo.
 */
const CONTENT = {
  stamp: "Loved by builders",
  headlineBefore: "Don't take",
  headlineAccent: "our word",
  headlineAfter: " for it.",
  lede: "Replace these with your own customer quotes.",
}

const TESTIMONIALS = [
  {
    quote:
      "We scoped on Monday and shipped the following Monday. The fixed price meant zero awkward budget calls.",
    name: "Maya Chen",
    role: "Founder, Northline",
    initials: "MC",
  },
  {
    quote:
      "It feels like a senior engineer joined for a week — PRs, docs, and opinions included.",
    name: "Jonas Weber",
    role: "CTO, Fieldwork",
    initials: "JW",
  },
  {
    quote:
      "The landing page paid for itself in the first month. Copy, design, and speed — all handled.",
    name: "Priya Nair",
    role: "CEO, Kiln",
    initials: "PN",
  },
  {
    quote:
      "Async updates every day, no meetings we didn't need. Easiest vendor experience we've had.",
    name: "Tom Okafor",
    role: "Product Lead, Harbor",
    initials: "TO",
  },
]

const EASE_SOFT = [0.32, 0.72, 0, 1] as const

export function TestimonialsStack() {
  const [index, setIndex] = useState(0)
  const [direction, setDirection] = useState(1)
  const reduce = useReducedMotion()
  const total = TESTIMONIALS.length
  const current = TESTIMONIALS[index % total]!

  const go = (dir: 1 | -1) => {
    setDirection(dir)
    setIndex((i) => (i + dir + total) % total)
  }

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

          <div className="relative mx-auto mt-10 max-w-xl">
            {/* Stacked cards behind */}
            <div
              aria-hidden
              className="absolute inset-x-6 -top-2.5 h-full rounded-[var(--atro-panel-radius)] border border-border-subtle bg-card/60"
            />
            <div
              aria-hidden
              className="absolute inset-x-3 -top-1.5 h-full rounded-[var(--atro-panel-radius)] border border-border-subtle bg-card/80"
            />

            <div
              aria-live="polite"
              aria-atomic="true"
              className="relative min-h-64 overflow-hidden rounded-[var(--atro-panel-radius)] border border-border-subtle bg-card p-6 sm:min-h-56 sm:p-8"
            >
              <Quote
                className="size-5 text-brand"
                aria-hidden
              />
              <AnimatePresence mode="wait" initial={false}>
                <motion.figure
                  key={index}
                  initial={reduce ? false : { opacity: 0, x: 24 * direction }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={reduce ? { opacity: 0 } : { opacity: 0, x: -24 * direction }}
                  transition={
                    reduce ? { duration: 0 } : { duration: 0.32, ease: EASE_SOFT }
                  }
                >
                  <blockquote className="mt-4 text-lg leading-relaxed font-medium tracking-tight text-foreground sm:text-xl">
                    “{current.quote}”
                  </blockquote>
                  <figcaption className="mt-6 flex items-center gap-3">
                    <span
                      aria-hidden
                      className="flex size-9 shrink-0 items-center justify-center rounded-full bg-muted text-[11px] font-semibold text-foreground"
                    >
                      {current.initials}
                    </span>
                    <span>
                      <span className="block text-sm font-medium text-foreground">
                        {current.name}
                      </span>
                      <span className="block text-sm text-muted-foreground">
                        {current.role}
                      </span>
                    </span>
                  </figcaption>
                </motion.figure>
              </AnimatePresence>
            </div>

            <div className="mt-5 flex items-center justify-between">
              <p
                className="font-mono text-[11px] tabular-nums text-muted-foreground"
                aria-hidden
              >
                {String(index + 1).padStart(2, "0")} /{" "}
                {String(total).padStart(2, "0")}
              </p>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => go(-1)}
                  aria-label="Previous testimonial"
                  className="inline-flex size-10 items-center justify-center rounded-[var(--atro-control-radius)] border border-border-subtle text-foreground transition-colors hover:bg-muted active:scale-[0.97]"
                >
                  <ArrowLeft className="size-4" aria-hidden />
                </button>
                <button
                  type="button"
                  onClick={() => go(1)}
                  aria-label="Next testimonial"
                  className="inline-flex size-10 items-center justify-center rounded-[var(--atro-control-radius)] border border-border-subtle text-foreground transition-colors hover:bg-muted active:scale-[0.97]"
                >
                  <ArrowRight className="size-4" aria-hidden />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
