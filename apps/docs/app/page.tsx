import type { Metadata } from "next"
import { SiteGraphJsonLd, SoftwareAppJsonLd } from "atroui"
import { LandingHero } from "@/components/landing-hero"

export const metadata: Metadata = {
  title: "AtroUI - React Component Library & Dark Design System",
  description:
    "AtroUI is the React and Next.js component catalog at atroui.com. Own UI via the shadcn registry; use npm for tokens and tools. Dark-first design system.",
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
