"use client"

import { useRef } from "react"
import { ArrowRight } from "lucide-react"
import { WordRevealScroll } from "atroui"
import { TransitionLink } from "@/components/view-transitions"

/**
 * Closing band — careful delight, one sticky word-reveal scrub.
 * Opacity-only word progress via WordRevealScroll (no parallax / blur).
 * Reduced motion: static, fully opaque (handled inside the primitive).
 */
export function LandingFinalCta() {
  const ref = useRef<HTMLElement>(null)

  return (
    <section
      ref={ref}
      className="atro-section atro-final-cta relative min-h-[140vh]"
      aria-label="Get started"
    >
      <div className="atro-section-inner atro-final-cta-inner sticky top-[28vh]">
        <div className="mx-auto max-w-2xl text-center">
          <p className="ds-eyebrow mx-auto w-fit">Get started</p>
          <WordRevealScroll
            targetRef={ref}
            as="h2"
            className="atro-section-title mt-3"
            offset={["start end", "end end"]}
          >
            Your next ship starts right now
          </WordRevealScroll>
          <p className="ds-lede mt-2 mx-auto max-w-xl !text-[0.9375rem] leading-relaxed">
            Copy a block. Edit CONTENT. Wire Host APIs only when you need them.
          </p>
        </div>

        <TransitionLink href="/docs" transitionTypes={[]} className="atro-btn">
          Get started
          <ArrowRight className="size-3.5" aria-hidden />
        </TransitionLink>
      </div>
    </section>
  )
}
