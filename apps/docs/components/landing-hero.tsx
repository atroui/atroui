import { AtroHero } from "@/components/landing/hero"
import { LandingAnnouncement } from "@/components/landing/landing-announcement"
import { LandingBlog } from "@/components/landing/landing-blog"
import { LandingCatalogEcosystem } from "@/components/landing/landing-catalog-ecosystem"
import { LandingJustWorks } from "@/components/landing/landing-just-works"
import { LandingReveal } from "@/components/landing/landing-reveal"
import { SiteFooter } from "@/components/site-footer"

/**
 * Landing — Zed spine (compact):
 * announce → hero(+pillars) → just works → catalog → blog → footer
 * Cut Trust/Care/Letter/Final CTA — they restated the same three ideas.
 */
export function LandingHero() {
  return (
    <>
      <LandingAnnouncement />
      <AtroHero />

      <LandingReveal>
        <LandingJustWorks />
      </LandingReveal>

      <LandingReveal>
        <LandingCatalogEcosystem />
      </LandingReveal>

      <LandingReveal>
        <LandingBlog />
      </LandingReveal>

      <SiteFooter />
    </>
  )
}
