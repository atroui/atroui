"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowRight, ChevronDown } from "lucide-react"

/**
 * Edit CONTENT / ITEMS to match your FAQ. Accessible accordion —
 * aria-expanded + region wiring, no motion deps.
 * After install this file lives in your repo.
 */
const CONTENT = {
  stamp: "FAQ",
  headlineBefore: "Answers,",
  headlineAccent: "up front",
  headlineAfter: ".",
  lede: "The questions every trial asks before upgrading.",
  ctaLabel: "Still unsure? Talk to us",
  ctaHref: "/contact",
}

const ITEMS = [
  {
    id: "trial",
    category: "Getting started",
    question: "Is there a free trial?",
    answer:
      "Yes — every paid plan starts with a 14-day trial. No card required, and you keep your data if you downgrade.",
  },
  {
    id: "cancel",
    category: "Billing",
    question: "Can I cancel anytime?",
    answer:
      "Anytime, in two clicks, from settings. Yearly plans are refunded pro-rata within the first 60 days.",
  },
  {
    id: "limits",
    category: "Billing",
    question: "What counts toward my project limit?",
    answer:
      "Only active projects. Archive finished work and it stops counting — nothing is ever deleted without your say.",
  },
  {
    id: "security",
    category: "Technical",
    question: "How is my data handled?",
    answer:
      "Encrypted in transit and at rest, hosted in your choice of region, with SSO and audit logs on Scale.",
  },
  {
    id: "support",
    category: "Technical",
    question: "What support do I get?",
    answer:
      "Pro gets priority support with same-day responses on business days. Scale adds a dedicated manager and a shared Slack channel.",
  },
]

export function FaqAccordion() {
  const [openId, setOpenId] = useState(ITEMS[0]?.id ?? "")

  return (
    <section className="border-t border-border-subtle bg-background text-foreground">
      <div className="border-b border-border-subtle">
        <div className="mx-auto max-w-7xl border-x border-border-subtle px-6 py-12 sm:px-10 sm:py-16">
          <div className="max-w-2xl">
            <p className="text-[11px] font-semibold tracking-[0.14em] text-muted-foreground uppercase">
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
          </div>
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
                    aria-controls={`faq-panel-${item.id}`}
                    id={`faq-button-${item.id}`}
                    data-open={open ? "true" : undefined}
                    onClick={() => setOpenId(open ? "" : item.id)}
                    className="flex min-h-14 w-full items-start justify-between gap-4 px-6 py-4 text-left transition-colors hover:bg-muted/40 data-[open]:bg-muted/30 sm:px-8"
                  >
                    <span className="text-base font-medium text-foreground sm:text-lg">
                      {item.question}
                    </span>
                    <ChevronDown
                      className={`mt-1 size-4 shrink-0 transition-transform duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none ${
                        open ? "rotate-180 text-brand" : "text-muted-foreground"
                      }`}
                      aria-hidden
                    />
                  </button>
                  <div
                    id={`faq-panel-${item.id}`}
                    role="region"
                    aria-labelledby={`faq-button-${item.id}`}
                    className={`grid transition-[grid-template-rows,opacity] duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none ${
                      open
                        ? "[grid-template-rows:1fr] opacity-100"
                        : "[grid-template-rows:0fr] opacity-0"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <div className="px-6 pb-5 sm:px-8">
                        <p className="text-[11px] font-semibold tracking-[0.14em] text-muted-foreground uppercase">
                          {item.category}
                        </p>
                        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">
                          {item.answer}
                        </p>
                      </div>
                    </div>
                  </div>
                </li>
              )
            })}
          </ul>
          <div className="border-t border-border-subtle px-6 py-5 sm:px-8">
            <Link href={CONTENT.ctaHref} className="atro-btn-ghost">
              {CONTENT.ctaLabel}
              <ArrowRight className="size-3.5" aria-hidden />
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
