"use client"

import { ArrowRight, ChevronDown } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

/**
 * Edit CONTENT / ITEMS to match your FAQ. Accordion on all breakpoints
 * (no motion deps).
 */
const CONTENT = {
  stamp: "FAQ",
  headlineBefore: "Questions we get",
  headlineAccent: "a lot",
  headlineAfter: ".",
  ctaLabel: "Read Host APIs",
  ctaHref: "/docs/host-api",
}

const ITEMS = [
  {
    id: "fixed-price",
    category: "Engagement",
    question: "Why fixed-price instead of hourly?",
    answer:
      "Hourly aligns incentives against you. Fixed price means we scope carefully up-front and ship on time - if we go over, that's our problem, not yours.",
  },
  {
    id: "stack",
    category: "Technical",
    question: "What stack do you use?",
    answer:
      "Next.js (App Router), TypeScript, Tailwind, Postgres / Supabase, and Vercel. Happy to work in other stacks, but we ship fastest here.",
  },
  {
    id: "team",
    category: "Engagement",
    question: "Can you work with my existing team?",
    answer:
      "Yes. We slot in like a senior engineer: PR reviews, shared boards, and we adopt your conventions.",
  },
  {
    id: "timeline",
    category: "Process",
    question: "How fast can we start?",
    answer:
      "Usually within a week of scope lock. Two project slots open per quarter - ask early if timing is tight.",
  },
]

export function Faq() {
  const [openId, setOpenId] = useState(ITEMS[0]?.id ?? "")

  return (
    <section className="border-t border-border-subtle">
      <div className="border-b border-border-subtle">
        <div className="mx-auto max-w-7xl border-x border-border-subtle px-6 py-12 text-center sm:px-10 sm:py-16">
          <p className="text-[11px] font-semibold tracking-[0.14em] text-muted-foreground uppercase">
            {CONTENT.stamp}
          </p>
          <h2 className="mt-4 text-3xl font-medium tracking-tight text-foreground sm:text-5xl">
            {CONTENT.headlineBefore}{" "}
            <span className="italic text-[var(--color-brand,#0b7bff)]">
              {CONTENT.headlineAccent}
            </span>
            {CONTENT.headlineAfter}
          </h2>
        </div>
      </div>

      <div className="border-b border-border-subtle">
        <div className="mx-auto max-w-7xl border-x border-border-subtle">
          <ul className="divide-y divide-border-subtle">
            {ITEMS.map((item) => {
              const open = openId === item.id
              return (
                <li key={item.id}>
                  <button
                    type="button"
                    aria-expanded={open}
                    onClick={() => setOpenId(open ? "" : item.id)}
                    className="flex min-h-14 w-full items-start justify-between gap-4 px-6 py-4 text-left sm:px-8"
                  >
                    <span className="text-base font-medium text-foreground sm:text-lg">
                      {item.question}
                    </span>
                    <ChevronDown
                      className={`mt-1 size-4 shrink-0 text-muted-foreground transition-transform ${
                        open
                          ? "rotate-180 text-[var(--color-brand,#0b7bff)]"
                          : ""
                      }`}
                      aria-hidden
                    />
                  </button>
                  {open ? (
                    <div className="px-6 pb-5 sm:px-8">
                      <p className="text-[11px] font-semibold tracking-[0.14em] text-muted-foreground uppercase">
                        {item.category}
                      </p>
                      <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">
                        {item.answer}
                      </p>
                    </div>
                  ) : null}
                </li>
              )
            })}
          </ul>
          <div className="border-t border-border-subtle px-6 py-5 sm:px-8">
            <Link
              href={CONTENT.ctaHref}
              className="inline-flex h-10 items-center gap-1.5 text-sm font-medium"
            >
              {CONTENT.ctaLabel}
              <ArrowRight className="size-3.5" aria-hidden />
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
