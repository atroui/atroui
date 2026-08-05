import type { Metadata } from "next"
import { SiteGraphJsonLd, SoftwareAppJsonLd } from "atroui"
import { LandingHero } from "@/components/landing-hero"

export const metadata: Metadata = {
  title: "AtroUI - React Component Library & Dark Design System",
  description:
    "AtroUI is the official React and Next.js component library at atroui.com. Dark-first design system, production UI sections, and docs. Install with npm i atroui.",
  alternates: { canonical: "/" },
}

export default function HomePage() {
  return (
    <>
      <SiteGraphJsonLd />
      <SoftwareAppJsonLd />
      <LandingHero />
    </>
  )
}
