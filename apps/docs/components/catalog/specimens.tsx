"use client"

import * as React from "react"

/**
 * Slug → export name in `registry-demos`. Deliberately plain strings: keeping
 * this map free of imports is what lets the whole demo bundle stay out of the
 * landing page's initial JS.
 *
 * Only entries marked `preview: "live"` in `lib/catalog.ts` are listed —
 * overlay, fixed-position and key-dependent demos are absent by design.
 */
const DEMO_EXPORT: Record<string, string> = {
  // Primitives
  "ui-button": "DemoButton",
  "ui-card": "DemoCard",
  "ui-form-select": "DemoFormSelect",
  "ui-textarea": "DemoTextarea",
  "ui-breadcrumbs": "DemoBreadcrumbs",
  "ui-prose": "DemoProse",
  "ui-founder-avatar": "DemoFounderAvatar",
  "ui-theme-toggle": "DemoThemeToggle",
  "ui-theme-adapt": "DemoThemeAdapt",
  "brand-logo": "DemoLogo",
  "ui-ui-mockup-frame": "DemoUiMockupFrame",
  "ui-timeline-animation": "DemoTimelineAnimation",
  "motion-fade-in": "DemoFadeIn",
  "motion-stagger": "DemoStagger",

  // Blocks
  "site-header": "DemoSiteHeader",
  "site-footer": "DemoSiteFooter",
  "footer-bold": "DemoBoldFooter",
  "home-hero": "DemoHomeHero",
  "home-principle": "DemoHomePrinciple",
  "home-work": "DemoHomeWork",
  "home-crafts": "DemoHomeCrafts",
  "home-lab": "DemoHomeLab",
  "home-who": "DemoHomeWho",
  "pricing-overview": "DemoPricingOverview",
  "feature-grid": "DemoFeatureGrid",
  "logo-cloud": "DemoLogoCloud",
  "faq-interactive-preview": "DemoFaqInteractivePreview",
  "cta-contextual-cta": "DemoContextualCta",
  "contact-contact-form": "DemoContactForm",
  "contact-calendly-embed": "DemoCalendlyEmbed",
  "brand-waitlist-form": "DemoWaitlistForm",
  "newsletter-newsletter-form": "DemoNewsletterForm",
  "journal-journal-content": "DemoJournalContent",
  "journal-social-share": "DemoSocialShare",
  "resources-resources-content": "DemoResourcesContent",
  "case-studies-before-after-slider": "DemoBeforeAfterSlider",
  "case-studies-visual-case-study": "DemoVisualCaseStudy",
  "seo-made-with-embed": "DemoMadeWithEmbed",

  // Indie
  "count-up": "DemoCountUp",
  "deadline-countdown": "DemoDeadlineCountdown",
  currently: "DemoCurrently",
  "project-list": "DemoProjectList",
  "log-preview": "DemoLogPreview",
  changelog: "DemoChangelog",
  reveal: "DemoReveal",
  "theme-toggle-icon": "DemoThemeToggleIcon",
  "site-header-narrow": "DemoSiteHeaderNarrow",
  "site-footer-narrow": "DemoSiteFooterNarrow",
  "reading-shelf": "DemoReadingShelf",
  "personal-hero": "DemoPersonalHero",
  resume: "DemoResume",
  "local-clock": "DemoLocalClock",
  "weather-chip": "DemoWeatherChip",
  "stack-list": "DemoStackList",

  // Tools
  "og-og-examples": "DemoOgExamples",
  "og-og-live-preview": "DemoOgLivePreview",
  "thumbnail-thumbnail-live-preview": "DemoThumbnailLivePreview",
  "planner-project-planner": "DemoProjectPlanner",
  "studio-live-dashboard": "DemoLiveDashboard",
}

type DemoModule = Record<string, React.ComponentType>

const cache = new Map<string, React.LazyExoticComponent<React.ComponentType>>()

/**
 * All demos live in one module, so the first plate to scroll into view pulls a
 * single shared chunk and every later plate resolves from cache.
 */
export function getSpecimen(slug: string) {
  const exportName = DEMO_EXPORT[slug]
  if (!exportName) return undefined

  const cached = cache.get(slug)
  if (cached) return cached

  const lazy = React.lazy(async () => {
    const mod = (await import("@/components/registry-demos")) as DemoModule
    const Component = mod[exportName]
    return { default: Component ?? (() => null) }
  })
  cache.set(slug, lazy)
  return lazy
}

export function hasSpecimen(slug: string) {
  return slug in DEMO_EXPORT
}
