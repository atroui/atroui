"use client"

/**
 * Landing Page — Vibrant soft-rect stack in one frame.
 * Family Values: opinionated section order; each block stays an owned file.
 *
 * Install: npx shadcn@latest add @atroui/landing-kit
 * (or: npx @atroui/cli@latest add landing-kit)
 */

import { SiteHeader } from "./site-header"
import { HomeHero } from "./home-hero"
import { LogoMarquee } from "./logo-marquee"
import { FeatureBento } from "./feature-bento"
import { StatsBand } from "./stats-band"
import { TestimonialsStack } from "./testimonials-stack"
import { PricingTiers } from "./pricing-tiers"
import { Faq } from "./faq"
import { CtaBand } from "./cta-band"
import { SiteFooter } from "./site-footer"

export function LandingPage() {
  return (
    <div className="min-h-svh bg-background text-foreground">
      <SiteHeader />
      <HomeHero />
      <LogoMarquee />
      <FeatureBento />
      <StatsBand />
      <TestimonialsStack />
      <PricingTiers />
      <Faq />
      <CtaBand />
      <SiteFooter />
    </div>
  )
}
