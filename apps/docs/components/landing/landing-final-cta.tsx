"use client"

import { useRef } from "react"
import { ArrowRight } from "lucide-react"
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react"
import { LandingSectionHeader } from "@/components/landing/landing-section-header"
import { TransitionLink } from "@/components/view-transitions"

/**
 * Closing band — careful delight, one sticky scrub moment.
 * Opacity + slight y travel via useScroll target+offset (no parallax / blur).
 * Reduced motion: static, fully opaque.
 */
export function LandingFinalCta() {
  const ref = useRef<HTMLElement>(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end end"],
  })

  const opacity = useTransform(
    scrollYProgress,
    [0, 0.35, 0.75, 1],
    reduce ? [1, 1, 1, 1] : [0.28, 1, 1, 1]
  )
  const y = useTransform(
    scrollYProgress,
    [0, 0.35, 1],
    reduce ? [0, 0, 0] : [14, 0, 0]
  )

  return (
    <section
      ref={ref}
      className="atro-section atro-final-cta relative min-h-[72vh]"
      aria-label="Get started"
    >
      <motion.div
        className="atro-section-inner atro-final-cta-inner sticky top-[28vh]"
        style={{ opacity, y }}
      >
        <LandingSectionHeader
          align="center"
          eyebrow="Get started"
          title={
            <>
              Your next ship starts{" "}
              <span className="ds-display-italic text-brand">right now</span>
            </>
          }
          lede="Copy a block. Edit CONTENT. Wire Host APIs only when you need them."
        />

        <TransitionLink href="/docs" transitionTypes={[]} className="atro-btn">
          Get started
          <ArrowRight className="size-3.5" aria-hidden />
        </TransitionLink>
      </motion.div>
    </section>
  )
}
