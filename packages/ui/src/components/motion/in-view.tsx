"use client"

import { FadeIn, fadeInSection, type FadeInProps } from "./fade-in"

export type InViewProps = Omit<FadeInProps, "preview" | "duration">

/**
 * @deprecated Use {@link FadeIn} — same motion. Kept as a thin alias with
 * landing section defaults (`y={10}`, earlier trigger). Prefer `FadeIn` +
 * `fadeInSection` (or pass `margin` / `amount` yourself).
 */
export function InView({
  y = fadeInSection.y,
  amount = fadeInSection.amount,
  margin = fadeInSection.margin,
  ...props
}: InViewProps) {
  return <FadeIn y={y} amount={amount} margin={margin} {...props} />
}
