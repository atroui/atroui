"use client"

import * as React from "react"
import {
  BeforeAfterSlider,
  BoldFooter,
  Breadcrumbs,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  ContextualCTA,
  ExitIntentPopup,
  FadeIn,
  FaqInteractivePreview,
  FormSelect,
  FounderAvatar,
  HeroAiValueProposition,
  HomeCrafts,
  HomeLab,
  HomePrinciple,
  HomeWho,
  HomeWork,
  LogoMark,
  LogoWordmark,
  MadeWithEmbed,
  NewsletterForm,
  OgExamples,
  OgLivePreview,
  OgWorkspace,
  PricingOverview,
  Prose,
  ProjectPlanner,
  ResourcesContent,
  ScopeChat,
  ScrollProgress,
  SiteFooter,
  SiteHeader,
  SocialShare,
  Stagger,
  StaggerChild,
  Textarea,
  ThemeToggle,
  ThumbnailLivePreview,
  ThumbnailWorkspace,
  TimelineAnimation,
  UiMockupFrame,
  VisualCaseStudy,
  WaitlistForm,
  ContactForm,
  CalendlyEmbed,
  ArPortfolio,
  JournalContent,
  LiveDashboard,
  SiteGraphJsonLd,
  TestimonialSchema,
  trackEvent,
} from "atroui"
import { TESTIMONIALS } from "atroui/content/testimonials"

/** Live canvas demos — one per documented component where a useful preview exists. */

export function DemoHomeHero() {
  return <HeroAiValueProposition />
}

export function DemoHomeCrafts() {
  return <HomeCrafts />
}

export function DemoHomeLab() {
  return <HomeLab />
}

export function DemoHomePrinciple() {
  return <HomePrinciple />
}

export function DemoHomeWho() {
  return <HomeWho />
}

export function DemoHomeWork() {
  return <HomeWork />
}

export function DemoPricingOverview() {
  return <PricingOverview />
}

export function DemoBoldFooter() {
  return <BoldFooter />
}

export function DemoSiteHeader() {
  return (
    <div className="w-full bg-background">
      <SiteHeader />
      <div className="mx-auto max-w-7xl border-x border-border-subtle px-6 py-10 text-sm text-muted-foreground">
        Sticky header — AtroUI logo via getBrand(), studio nav routes, theme
        toggle, and Hire CTA. Links use host paths like{" "}
        <code className="font-mono text-xs text-foreground">/work</code> and{" "}
        <code className="font-mono text-xs text-foreground">/contact</code>.
      </div>
    </div>
  )
}

export function DemoButton() {
  return (
    <div className="flex flex-col items-center gap-6">
      <div className="flex flex-wrap items-center justify-center gap-3">
        <Button>Default</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="outline">Outline</Button>
        <Button variant="ghost">Ghost</Button>
        <Button variant="destructive">Destructive</Button>
        <Button variant="link">Link</Button>
      </div>
      <div className="flex flex-wrap items-center justify-center gap-3">
        <Button size="xs">XS</Button>
        <Button size="sm">Small</Button>
        <Button size="default">Default</Button>
        <Button size="lg">Large</Button>
        <Button disabled>Disabled</Button>
      </div>
    </div>
  )
}

export function DemoCard() {
  return (
    <div className="flex flex-wrap items-start justify-center gap-4">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Project Alpha</CardTitle>
          <CardDescription>Shipped this week</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            A calm surface with clear hierarchy.
          </p>
        </CardContent>
        <CardFooter className="gap-2">
          <Button size="sm">Open</Button>
          <Button size="sm" variant="ghost">
            Dismiss
          </Button>
        </CardFooter>
      </Card>
      <Card className="w-full max-w-sm border-brand/30">
        <CardHeader>
          <CardTitle>Accent edge</CardTitle>
          <CardDescription>Optional brand border</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Same primitives — compose with tokens, not one-off styles.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}

export function DemoTextarea() {
  return <Textarea placeholder="Write a message…" className="max-w-md" />
}

export function DemoFormSelect() {
  const [value, setValue] = React.useState("")
  return (
    <FormSelect
      className="max-w-xs"
      value={value}
      onValueChange={setValue}
      placeholder="Pick a stack"
      options={[
        { value: "next", label: "Next.js" },
        { value: "remix", label: "Remix" },
        { value: "astro", label: "Astro" },
      ]}
    />
  )
}

export function DemoThemeToggle() {
  return <ThemeToggle />
}

export function DemoLogo() {
  return (
    <div className="flex flex-col items-center gap-6 text-center">
      <div className="flex items-end gap-5">
        <LogoMark className="size-8" />
        <LogoMark className="size-12" />
        <LogoMark className="size-16" />
      </div>
      <LogoWordmark className="text-xl" />
      <p className="max-w-xs text-xs text-muted-foreground">
        Interrupted A — open letterform + floating brand bar. Label from{" "}
        getBrand(); override with{" "}
        <code className="font-mono text-[11px]">title</code> /{" "}
        <code className="font-mono text-[11px]">name</code>.
      </p>
    </div>
  )
}

export function DemoFounderAvatar() {
  return (
    <div className="flex items-center gap-5">
      <div className="flex items-center gap-3">
        <FounderAvatar size="sm" />
        <FounderAvatar size="md" />
        <FounderAvatar size="lg" />
      </div>
      <div className="text-left">
        <p className="text-sm font-medium text-foreground">Founder avatar</p>
        <p className="text-xs text-muted-foreground">
          Needs{" "}
          <code className="font-mono text-[11px] text-foreground">
            /images/founder-portrait.png
          </code>
        </p>
      </div>
    </div>
  )
}

export function DemoBreadcrumbs() {
  return (
    <Breadcrumbs
      items={[
        { label: "Docs", href: "/docs" },
        { label: "Components", href: "/docs/components" },
        { label: "Breadcrumbs" },
      ]}
    />
  )
}

export function DemoProse() {
  return (
    <Prose className="max-w-md text-left">
      <h3>Readable by default</h3>
      <p>
        Prose styles long-form content with comfortable measure, spacing, and contrast —
        ready for journal posts and docs.
      </p>
    </Prose>
  )
}

export function DemoFadeIn() {
  const [key, setKey] = React.useState(0)

  return (
    <div className="flex w-full max-w-md flex-col items-stretch gap-4">
      <FadeIn
        key={key}
        preview
        className="rounded-xl border border-border-subtle bg-card px-6 py-5 text-sm text-foreground shadow-sm"
      >
        <p className="ms-stamp mb-2">FadeIn</p>
        <p className="font-medium">Scroll-reveal motion</p>
        <p className="mt-1 text-muted-foreground">
          Fades and rises as it enters view. Replay to see it again.
        </p>
      </FadeIn>
      <button
        type="button"
        onClick={() => setKey((k) => k + 1)}
        className="ms-cta-ghost self-center border border-border-subtle px-3 py-1.5 text-sm"
      >
        Replay
      </button>
    </div>
  )
}

export function DemoStagger() {
  const [key, setKey] = React.useState(0)

  return (
    <div className="flex w-full max-w-md flex-col items-stretch gap-4">
      <Stagger key={key} preview className="flex flex-col gap-2 text-left">
        {["First", "Second", "Third"].map((item) => (
          <StaggerChild key={item}>
            <div className="rounded-lg border border-border-subtle bg-card px-4 py-2.5 text-sm text-foreground">
              {item}
            </div>
          </StaggerChild>
        ))}
      </Stagger>
      <button
        type="button"
        onClick={() => setKey((k) => k + 1)}
        className="ms-cta-ghost self-center border border-border-subtle px-3 py-1.5 text-sm"
      >
        Replay
      </button>
    </div>
  )
}

export function DemoScrollProgress() {
  const containerRef = React.useRef<HTMLDivElement>(null)

  return (
    <div className="w-full max-w-md overflow-hidden rounded-xl border border-border-subtle bg-background shadow-sm">
      <div className="relative border-b border-border-subtle bg-muted/40 px-4 py-2.5">
        <p className="ms-stamp">ScrollProgress</p>
        <p className="mt-1 text-sm text-muted-foreground">
          Scroll the panel — the brand bar tracks local progress.
        </p>
        <ScrollProgress
          containerRef={containerRef}
          className="absolute inset-x-0 bottom-0 h-0.5 bg-brand"
        />
      </div>
      <div
        ref={containerRef}
        className="h-48 overflow-y-auto overscroll-contain px-4 py-3 text-sm leading-relaxed text-muted-foreground"
      >
        <p className="font-medium text-foreground">Reading pane</p>
        {Array.from({ length: 12 }, (_, i) => (
          <p key={i} className="mt-3">
            Section {i + 1}. In production this mounts fixed at the top of the
            viewport and tracks document scroll. Here it uses{" "}
            <code className="font-mono text-xs text-foreground">containerRef</code>{" "}
            so the preview is self-contained.
          </p>
        ))}
      </div>
    </div>
  )
}

export function DemoBeforeAfterSlider() {
  return <BeforeAfterSlider className="w-full max-w-lg" />
}

export function DemoUiMockupFrame() {
  return <UiMockupFrame variant="saas" className="w-full max-w-lg" />
}

export function DemoOgLivePreview() {
  return (
    <div className="relative aspect-[1200/630] w-full max-w-xl overflow-hidden rounded-xl ring-1 ring-border-subtle">
      <OgLivePreview
        title={"Ship in days,\nnot quarters."}
        subtitle="AtroUI — your component catalog"
        styleKey="paperQuote"
      />
    </div>
  )
}

export function DemoOgExamples() {
  return (
    <div className="w-full border-y border-border-subtle bg-background">
      <OgExamples preview className="w-full" />
    </div>
  )
}

export function DemoOgWorkspace() {
  return (
    <div className="w-full max-h-[520px] overflow-auto rounded-xl border border-border-subtle">
      <OgWorkspace />
    </div>
  )
}

export function DemoThumbnailLivePreview() {
  return (
    <div className="relative aspect-video w-full max-w-xl overflow-hidden rounded-xl ring-1 ring-border-subtle">
      <ThumbnailLivePreview
        title="Build in public"
        subtitle="Episode 12"
        styleKey="youtubePop"
        format="youtube"
      />
    </div>
  )
}

export function DemoNewsletterForm() {
  return <NewsletterForm className="w-full max-w-md" />
}

export function DemoWaitlistForm() {
  return <WaitlistForm />
}

export function DemoSocialShare() {
  return (
    <SocialShare
      url="https://example.com/article"
      title="How we ship calm interfaces"
    />
  )
}

export function DemoFaqInteractivePreview() {
  return <FaqInteractivePreview />
}

export function DemoContextualCta() {
  return (
    <div className="w-full max-w-xl">
      <ContextualCTA preview />
    </div>
  )
}

export function DemoExitIntentPopup() {
  return (
    <div className="w-full max-w-lg">
      <ExitIntentPopup preview />
    </div>
  )
}

export function DemoMadeWithEmbed() {
  return <MadeWithEmbed />
}

function HeadlessShell({
  stamp,
  title,
  children,
}: {
  stamp: string
  title: string
  children: React.ReactNode
}) {
  return (
    <div className="w-full max-w-2xl overflow-hidden border border-border-subtle bg-background text-left">
      <div className="border-b border-border-subtle bg-muted/40 px-4 py-3">
        <p className="ms-stamp">{stamp}</p>
        <p className="mt-2 text-sm font-medium text-foreground">{title}</p>
      </div>
      <div className="space-y-4 p-4 text-sm text-muted-foreground">{children}</div>
    </div>
  )
}

export function DemoAnalyticsProvider() {
  const plausible = Boolean(process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN)
  const ga = Boolean(process.env.NEXT_PUBLIC_GA_ID)

  return (
    <HeadlessShell
      stamp="Headless"
      title="AnalyticsProvider — scripts + experiments, no chrome"
    >
      <p>
        Mount once near the root. Loads Plausible / GA when env is set, fires{" "}
        <code className="font-mono text-xs text-foreground">page_view</code>, and
        exposes sticky A/B variants via{" "}
        <code className="font-mono text-xs text-foreground">useExperiment</code>.
      </p>
      <ul className="divide-y divide-border-subtle border border-border-subtle">
        <li className="flex items-center justify-between gap-3 px-3 py-2.5">
          <span>NEXT_PUBLIC_PLAUSIBLE_DOMAIN</span>
          <span className={plausible ? "text-brand" : "text-muted-foreground"}>
            {plausible ? "configured" : "not set"}
          </span>
        </li>
        <li className="flex items-center justify-between gap-3 px-3 py-2.5">
          <span>NEXT_PUBLIC_GA_ID</span>
          <span className={ga ? "text-brand" : "text-muted-foreground"}>
            {ga ? "configured" : "not set"}
          </span>
        </li>
      </ul>
      <button
        type="button"
        className="ms-cta-ghost border border-border-subtle px-3 py-1.5 text-sm"
        onClick={() =>
          trackEvent("docs_demo_click", { source: "analytics-provider-docs" })
        }
      >
        Fire demo trackEvent
      </button>
      <p className="text-xs">
        In development, events log to the browser console as{" "}
        <code className="font-mono text-foreground">[analytics]</code>.
      </p>
    </HeadlessShell>
  )
}

export function DemoJsonLd() {
  return (
    <HeadlessShell
      stamp="Headless"
      title="JSON-LD helpers — emit schema.org in the document"
    >
      <p>
        Helpers like{" "}
        <code className="font-mono text-xs text-foreground">SiteGraphJsonLd</code>,{" "}
        <code className="font-mono text-xs text-foreground">ArticleJsonLd</code>,{" "}
        <code className="font-mono text-xs text-foreground">FaqJsonLd</code>, and
        more inject{" "}
        <code className="font-mono text-xs text-foreground">
          &lt;script type=&quot;application/ld+json&quot;&gt;
        </code>
        . No visible UI — check View Source or Rich Results Test.
      </p>
      {/* Live inject for this preview mount */}
      <SiteGraphJsonLd />
      <pre className="overflow-x-auto border border-border-subtle bg-muted/30 p-3 font-mono text-[11px] leading-relaxed text-foreground">
        {`import { SiteGraphJsonLd, ArticleJsonLd } from "atroui"

// Homepage
<SiteGraphJsonLd />

// Journal post
<ArticleJsonLd
  title="…"
  description="…"
  slug="shipping-mvps"
  date="2026-01-01"
/>`}
      </pre>
      <p className="text-xs">
        This preview mounts <span className="text-foreground">SiteGraphJsonLd</span>{" "}
        once — inspect the page source for the graph.
      </p>
    </HeadlessShell>
  )
}

export function DemoTestimonialSchema() {
  const sample = {
    "@context": "https://schema.org",
    "@graph": TESTIMONIALS.slice(0, 2).map((t) => ({
      "@type": "Review",
      author: {
        "@type": "Person",
        name: t.name,
        jobTitle: t.title,
        worksFor: { "@type": "Organization", name: t.company },
      },
      reviewRating: {
        "@type": "Rating",
        ratingValue: String(t.rating),
        bestRating: "5",
      },
      reviewBody: t.quote.slice(0, 96) + (t.quote.length > 96 ? "…" : ""),
      itemReviewed: {
        "@type": "ProfessionalService",
        name: "Makershot",
      },
    })),
  }

  return (
    <HeadlessShell
      stamp="Headless"
      title="TestimonialSchema — Review JSON-LD (no AggregateRating)"
    >
      <p>
        Emits individual{" "}
        <code className="font-mono text-xs text-foreground">Review</code> nodes
        from studio testimonials. Intentionally skips AggregateRating (spam risk
        for self-published stars).
      </p>
      <TestimonialSchema />
      <pre className="max-h-56 overflow-auto border border-border-subtle bg-muted/30 p-3 font-mono text-[11px] leading-relaxed text-foreground">
        {JSON.stringify(sample, null, 2)}
      </pre>
      <p className="text-xs">
        Full graph is injected on this page — sample above shows the shape.
      </p>
    </HeadlessShell>
  )
}

export function DemoSiteFooter() {
  return <SiteFooter />
}

export function DemoContactForm() {
  return (
    <div className="w-full max-h-[560px] overflow-auto rounded-xl border border-border-subtle bg-background p-4">
      <ContactForm />
    </div>
  )
}

export function DemoCalendlyEmbed() {
  return (
    <div className="w-full max-w-lg overflow-hidden rounded-2xl border border-border-subtle bg-card/40">
      <CalendlyEmbed />
    </div>
  )
}

export function DemoArPortfolio() {
  return (
    <div className="w-full max-h-[640px] overflow-auto rounded-2xl border border-border-subtle bg-background p-5 sm:p-8">
      <ArPortfolio />
    </div>
  )
}

export function DemoScopeChat() {
  return (
    <div className="w-full max-h-[520px] overflow-auto rounded-xl border border-border-subtle">
      <ScopeChat />
    </div>
  )
}

export function DemoProjectPlanner() {
  return (
    <div className="w-full max-h-[520px] overflow-auto rounded-xl border border-border-subtle">
      <ProjectPlanner />
    </div>
  )
}

export function DemoResourcesContent() {
  return <ResourcesContent />
}

export function DemoJournalContent() {
  return <JournalContent />
}

export function DemoLiveDashboard() {
  return <LiveDashboard />
}

export function DemoThumbnailWorkspace() {
  return (
    <div className="w-full max-h-[520px] overflow-auto rounded-xl border border-border-subtle">
      <ThumbnailWorkspace />
    </div>
  )
}

export function DemoVisualCaseStudy() {
  const study = {
    id: "demo",
    title: "B2B SaaS MVP shipped in 7 days",
    client: { name: "Stealth SaaS founder", industry: "Developer tools" },
    projectType: "MVP Sprint",
    challenge:
      "A solo founder had validated demand through waitlist signups but needed a working product — auth, billing, and core workflow — before a deadline.",
    solution:
      "A 7-day MVP sprint: one core workflow, auth, checkout, and a Postgres-backed dashboard with daily async updates and a live preview.",
    results: [
      {
        metric: "Time to launch",
        value: "7 days",
        description: "From kickoff to production deploy",
      },
      {
        metric: "Waitlist conversion",
        value: "34%",
        description: "Signups who activated in week one",
      },
      {
        metric: "Lighthouse",
        value: "96",
        description: "Performance on launch day",
      },
    ],
    technologies: ["Next.js", "TypeScript", "Clerk", "Stripe", "Supabase"],
    timeline: "7 days",
    budget: "Sprint",
    testimonial: "We went from waitlist to paying users in a week.",
    testimonialAuthor: "Founder",
    image: "/og",
    mockupVariant: "saas" as const,
    relatedServices: [],
  }
  return (
    <div className="w-full max-h-[720px] overflow-auto rounded-2xl border border-border-subtle">
      <VisualCaseStudy study={study as never} />
    </div>
  )
}

export function DemoTimelineAnimation() {
  const ref = React.useRef<HTMLDivElement>(null)
  return (
    <div ref={ref} className="w-full max-w-sm space-y-2 text-left">
      {["Scope", "Build", "Ship"].map((label, i) => (
        <TimelineAnimation
          key={label}
          animationNum={i}
          timelineRef={ref}
          className="rounded-lg border border-border-subtle bg-card px-4 py-3 text-sm"
        >
          {label}
        </TimelineAnimation>
      ))}
    </div>
  )
}

export function DemoThemeProviderNote() {
  return (
    <div className="w-full max-w-lg overflow-hidden rounded-xl border border-border-subtle bg-background text-left shadow-sm">
      <div className="flex items-center justify-between gap-3 border-b border-border-subtle bg-muted/40 px-4 py-3">
        <div>
          <p className="ms-stamp">Provider</p>
          <p className="mt-1 text-sm font-medium text-foreground">
            ThemeProvider is active
          </p>
        </div>
        <ThemeToggle />
      </div>
      <div className="grid gap-3 p-4 sm:grid-cols-2">
        <div className="rounded-lg border border-border-subtle bg-card p-4 text-card-foreground">
          <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
            Card
          </p>
          <p className="mt-2 text-sm text-foreground">
            Surfaces use design tokens that flip with light / dark.
          </p>
        </div>
        <div className="rounded-lg border border-border-subtle bg-muted p-4">
          <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
            Muted
          </p>
          <p className="mt-2 text-sm text-foreground">
            Try Light / System / Dark with the toggle.
          </p>
          <span className="mt-3 inline-flex h-8 items-center bg-brand px-2.5 text-xs font-medium text-[oklch(0.22_0.02_55)]">
            Brand
          </span>
        </div>
      </div>
    </div>
  )
}
