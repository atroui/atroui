"use client"

import { FadeIn, fadeInSection, type FadeInProps } from "@/components/ui/fade-in"

export type InViewProps = Omit<FadeInProps, "preview" | "duration">

/**
 * @deprecated Use FadeIn — same motion. Thin alias with landing section defaults.
 */
export function InView({
  y = fadeInSection.y,
  amount = fadeInSection.amount,
  margin = fadeInSection.margin,
  ...props
}: InViewProps) {
  return <FadeIn y={y} amount={amount} margin={margin} {...props} />
}
