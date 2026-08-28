"use client"

/**
 * Registry name → live demo. Single lookup for RegistryComponentDoc / RegistryPreview
 * (shadcn ComponentPreview pattern).
 */
import * as React from "react"
import {
  DemoAnalyticsProvider,
  DemoArPortfolio,
  DemoBeforeAfterSlider,
  DemoBoldFooter,
  DemoBreadcrumbs,
  DemoButton,
  DemoCalendlyEmbed,
  DemoCard,
  DemoChangelog,
  DemoCommandMenu,
  DemoContactForm,
  DemoContextualCta,
  DemoCountUp,
  DemoCurrently,
  DemoDeadlineCountdown,
  DemoExitIntentPopup,
  DemoFadeIn,
  DemoFaqInteractivePreview,
  DemoFeatureGrid,
  DemoFormSelect,
  DemoFounderAvatar,
  DemoHomeCrafts,
  DemoHomeHero,
  DemoHomeLab,
  DemoHomePrinciple,
  DemoHomeWho,
  DemoHomeWork,
  DemoJournalContent,
  DemoJsonLd,
  DemoLiveDashboard,
  DemoLocalClock,
  DemoLogPreview,
  DemoLogo,
  DemoLogoCloud,
  DemoMadeWithEmbed,
  DemoNewsletterForm,
  DemoOgExamples,
  DemoOgLivePreview,
  DemoOgWorkspace,
  DemoPersonalHero,
  DemoPricingOverview,
  DemoProjectList,
  DemoProjectPlanner,
  DemoProse,
  DemoReadingShelf,
  DemoResourcesContent,
  DemoResume,
  DemoReveal,
  DemoScopeChat,
  DemoScrollProgress,
  DemoSiteFooter,
  DemoSiteFooterNarrow,
  DemoSiteHeader,
  DemoSiteHeaderNarrow,
  DemoSocialFloat,
  DemoSocialShare,
  DemoStackList,
  DemoStagger,
  DemoTestimonialSchema,
  DemoTextarea,
  DemoThemeAdapt,
  DemoThemeProviderNote,
  DemoThemeToggle,
  DemoThemeToggleIcon,
  DemoThumbnailLivePreview,
  DemoThumbnailWorkspace,
  DemoTimelineAnimation,
  DemoUiMockupFrame,
  DemoVisualCaseStudy,
  DemoWaitlistForm,
  DemoWeatherChip,
} from "@/components/registry-demos"

export const REGISTRY_DEMOS: Record<
  string,
  React.ComponentType
> = {
  "analytics-provider": DemoAnalyticsProvider,
  "ar-portfolio": DemoArPortfolio,
  "before-after-slider": DemoBeforeAfterSlider,
  "breadcrumbs": DemoBreadcrumbs,
  "button": DemoButton,
  "calendly-embed": DemoCalendlyEmbed,
  "card": DemoCard,
  "changelog": DemoChangelog,
  "command-menu": DemoCommandMenu,
  "contact-form": DemoContactForm,
  "contextual-cta": DemoContextualCta,
  "count-up": DemoCountUp,
  "currently": DemoCurrently,
  "deadline-countdown": DemoDeadlineCountdown,
  "exit-intent-popup": DemoExitIntentPopup,
  "fade-in": DemoFadeIn,
  "faq": DemoFaqInteractivePreview,
  "feature-grid": DemoFeatureGrid,
  "footer-bold": DemoBoldFooter,
  "form-select": DemoFormSelect,
  "founder-avatar": DemoFounderAvatar,
  "home-crafts": DemoHomeCrafts,
  "home-hero": DemoHomeHero,
  "home-lab": DemoHomeLab,
  "home-principle": DemoHomePrinciple,
  "home-who": DemoHomeWho,
  "home-work": DemoHomeWork,
  "journal-content": DemoJournalContent,
  "json-ld": DemoJsonLd,
  "live-dashboard": DemoLiveDashboard,
  "local-clock": DemoLocalClock,
  "log-preview": DemoLogPreview,
  "logo": DemoLogo,
  "logo-cloud": DemoLogoCloud,
  "made-with-embed": DemoMadeWithEmbed,
  "mockup-frame": DemoUiMockupFrame,
  "newsletter-form": DemoNewsletterForm,
  "og-examples": DemoOgExamples,
  "og-live-preview": DemoOgLivePreview,
  "og-workspace": DemoOgWorkspace,
  "personal-hero": DemoPersonalHero,
  "pricing-overview": DemoPricingOverview,
  "project-list": DemoProjectList,
  "project-planner": DemoProjectPlanner,
  "prose": DemoProse,
  "reading-shelf": DemoReadingShelf,
  "resources-content": DemoResourcesContent,
  "resume": DemoResume,
  "reveal": DemoReveal,
  "scope-chat": DemoScopeChat,
  "scroll-progress": DemoScrollProgress,
  "site-footer": DemoSiteFooter,
  "site-footer-narrow": DemoSiteFooterNarrow,
  "site-header": DemoSiteHeader,
  "site-header-narrow": DemoSiteHeaderNarrow,
  "social-float": DemoSocialFloat,
  "social-share": DemoSocialShare,
  "stack-list": DemoStackList,
  "stagger": DemoStagger,
  "testimonial-schema": DemoTestimonialSchema,
  "textarea": DemoTextarea,
  "theme-adapt": DemoThemeAdapt,
  "theme-provider": DemoThemeProviderNote,
  "theme-toggle": DemoThemeToggle,
  "theme-toggle-icon": DemoThemeToggleIcon,
  "thumbnail-live-preview": DemoThumbnailLivePreview,
  "thumbnail-workspace": DemoThumbnailWorkspace,
  "timeline-animation": DemoTimelineAnimation,
  "visual-case-study": DemoVisualCaseStudy,
  "waitlist-form": DemoWaitlistForm,
  "weather-chip": DemoWeatherChip,
}

export function RegistryPreview({
  name,
  className,
}: {
  name: string
  className?: string
}) {
  const Demo = REGISTRY_DEMOS[name]
  if (!Demo) {
    return (
      <p className="text-sm text-muted-foreground">
        No live demo registered for 
        <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-[12px]">
          @atroui/{name}
        </code>
        .
      </p>
    )
  }
  return (
    <div className={className}>
      <Demo />
    </div>
  )
}

export function hasRegistryDemo(name: string) {
  return Boolean(REGISTRY_DEMOS[name])
}
