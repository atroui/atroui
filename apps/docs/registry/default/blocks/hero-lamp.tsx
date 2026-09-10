"use client"

import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { motion, useReducedMotion } from "motion/react"

/**
 * Edit CONTENT to match your product. Conic lamp glow behind a
 * staggered text reveal. Static glow + text under reduced motion.
 * After install this file lives in your repo.
 */
const CONTENT = {
  stamp: "New · v2 templates",
  headlineBefore: "Ship pages that feel",
  headlineAccent: "lit from within",
  headlineAfter: ".",
  lede: "A landing kit with taste built in — tokens, sections, and motion you can actually edit.",
  primaryCta: { label: "Browse the blocks", href: "/blocks" },
  secondaryCta: { label: "Read the docs", href: "/docs" },
}

const EASE_EXPO = [0.16, 1, 0.3, 1] as const

export function HeroLamp() {
  const reduce = useReducedMotion()

  return (
    <section className="relative overflow-hidden border-t border-border-subtle bg-background text-foreground">
      {/* Lamp — conic wash + hairline bar (no blur orbs) */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div
          className="absolute inset-x-0 top-0 mx-auto h-[28rem] w-[min(60rem,120%)]"
          style={{
            background:
              "conic-gradient(from 180deg at 50% 0%, color-mix(in oklch, var(--brand) 22%, transparent), transparent 32%, transparent 68%, color-mix(in oklch, var(--brand) 22%, transparent))",
            maskImage:
              "linear-gradient(to bottom, black 0%, transparent 78%)",
            WebkitMaskImage:
              "linear-gradient(to bottom, black 0%, transparent 78%)",
          }}
        />
        <div className="absolute top-0 left-1/2 h-px w-[min(28rem,70%)] -translate-x-1/2 bg-[color-mix(in_oklch,var(--brand)_60%,transparent)]" />
      </div>

      <div className="relative border-b border-border-subtle">
        <div className="mx-auto flex max-w-7xl flex-col items-center border-x border-border-subtle px-6 py-16 text-center sm:px-10 sm:py-24">
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.55, ease: EASE_EXPO }}
            className="flex flex-col items-center"
          >
            <p className="atro-chip">
              <span className="size-1.5 rounded-full bg-brand" aria-hidden />
              {CONTENT.stamp}
            </p>
          </motion.div>

          <motion.h2
            initial={reduce ? false : { opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: reduce ? 0 : 0.08, ease: EASE_EXPO }}
            className="mt-5 max-w-3xl text-4xl leading-[1.05] font-medium tracking-tight text-foreground sm:text-6xl"
          >
            {CONTENT.headlineBefore}{" "}
            <span className="italic text-brand">{CONTENT.headlineAccent}</span>
            {CONTENT.headlineAfter}
          </motion.h2>

          <motion.p
            initial={reduce ? false : { opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.55, delay: reduce ? 0 : 0.16, ease: EASE_EXPO }}
            className="mt-4 max-w-xl text-[15px] leading-relaxed text-muted-foreground sm:text-base"
          >
            {CONTENT.lede}
          </motion.p>

          <motion.div
            initial={reduce ? false : { opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, delay: reduce ? 0 : 0.24, ease: EASE_EXPO }}
            className="mt-8 flex w-full flex-col items-stretch justify-center gap-3 sm:w-auto sm:flex-row sm:items-center"
          >
            <Link
              href={CONTENT.primaryCta.href}
              className="atro-btn justify-center"
            >
              {CONTENT.primaryCta.label}
              <ArrowRight className="size-4" aria-hidden />
            </Link>
            <Link
              href={CONTENT.secondaryCta.href}
              className="atro-btn-ghost justify-center"
            >
              {CONTENT.secondaryCta.label}
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
