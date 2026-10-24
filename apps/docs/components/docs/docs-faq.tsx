"use client"

/**
 * Guide FAQ appendix — quiet mono stamp + per-question disclosures.
 * Gradual revelation + fluidity: answers tween open (height/opacity), not snap.
 */

import * as React from "react"
import { AnimatePresence, motion, useReducedMotion } from "motion/react"
import { FaqJsonLd } from "atroui"
import { panelTween } from "@/lib/motion"
import { cn } from "@/lib/utils"

export type DocsFaqItem = {
  q: string
  a: string
}

function FaqItem({
  item,
  defaultOpen,
}: {
  item: DocsFaqItem
  defaultOpen: boolean
}) {
  const reduce = useReducedMotion()
  const [open, setOpen] = React.useState(defaultOpen)
  const panelId = React.useId()

  return (
    <div
      className={cn("docs-faq-item", open && "docs-faq-item--open")}
      data-open={open ? "" : undefined}
    >
      <button
        type="button"
        className="docs-faq-summary"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((v) => !v)}
      >
        <span className="docs-faq-chevron" aria-hidden />
        <span className="docs-faq-q">{item.q}</span>
      </button>

      <AnimatePresence initial={false}>
        {open ? (
          <motion.div
            id={panelId}
            key="panel"
            role="region"
            initial={reduce ? false : { height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={reduce ? undefined : { height: 0, opacity: 0 }}
            transition={
              reduce
                ? { duration: 0 }
                : { height: panelTween, opacity: { duration: 0.2, ease: "easeOut" } }
            }
            className="docs-faq-panel"
          >
            <p className="docs-faq-a">{item.a}</p>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  )
}

/**
 * Guide FAQ appendix — quiet mono stamp + per-question disclosures.
 * Gradual revelation: answers stay closed until asked. JSON-LD stays whole.
 */
export function DocsFaq({
  items,
  pagePath,
  className,
  /** Open the first item so the section isn't a dead stamp. */
  defaultOpenFirst = true,
}: {
  items: DocsFaqItem[]
  pagePath: string
  className?: string
  defaultOpenFirst?: boolean
}) {
  if (!items.length) return null

  return (
    <section
      className={cn("docs-faq", className)}
      aria-labelledby="docs-faq-heading"
      data-toc-skip
    >
      <h2 id="docs-faq-heading" className="docs-faq-heading">
        FAQ
        <span className="docs-faq-count">{items.length}</span>
      </h2>

      <div className="docs-faq-list">
        {items.map((item, i) => (
          <FaqItem
            key={item.q}
            item={item}
            defaultOpen={defaultOpenFirst && i === 0}
          />
        ))}
      </div>

      <FaqJsonLd
        pagePath={pagePath}
        items={items.map((item) => ({
          question: item.q,
          answer: item.a,
        }))}
      />
    </section>
  )
}
