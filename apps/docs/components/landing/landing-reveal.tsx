"use client"

import { FadeIn, fadeInSection } from "atroui"

/** Landing scroll reveal — FadeIn with section defaults (one primitive). */
export function LandingReveal({
  children,
  delay = 0,
  className,
}: {
  children: React.ReactNode
  delay?: number
  className?: string
}) {
  return (
    <FadeIn delay={delay} className={className} {...fadeInSection}>
      {children}
    </FadeIn>
  )
}
