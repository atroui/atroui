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
} from "@meridian/ui"

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

export function DemoHeroAiValueProposition() {
  return <HeroAiValueProposition />
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
      <div className="border-x border-border-subtle mx-auto max-w-7xl px-6 py-10 text-sm text-muted-foreground">
        Sticky editorial header — logo, primary nav, theme toggle, and hire CTA.
      </div>
    </div>
  )
}

export function DemoButton() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-3">
      <Button>Default</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="destructive">Destructive</Button>
    </div>
  )
}

export function DemoCard() {
  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Project Alpha</CardTitle>
        <CardDescription>Shipped this week</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">A calm surface with clear hierarchy.</p>
      </CardContent>
      <CardFooter>
        <Button size="sm">Open</Button>
      </CardFooter>
    </Card>
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
    <div className="flex flex-col items-center gap-6">
      <LogoMark className="size-10" />
      <LogoWordmark className="text-xl" />
    </div>
  )
}

export function DemoFounderAvatar() {
  return (
    <div className="flex items-center gap-4">
      <FounderAvatar size="sm" />
      <FounderAvatar size="md" />
      <FounderAvatar size="lg" />
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
        subtitle="Meridian — your component catalog"
        styleKey="paperQuote"
      />
    </div>
  )
}

export function DemoOgExamples() {
  return <OgExamples className="w-full" />
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

export function DemoSchemaNote({ name }: { name: string }) {
  return (
    <div className="max-w-md rounded-xl border border-border-subtle bg-card px-5 py-4 text-left text-sm text-muted-foreground">
      <p className="font-medium text-foreground">{name}</p>
      <p className="mt-1">
        Injects JSON-LD into the document head. No visible UI — verify in View Source or Rich Results.
      </p>
    </div>
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
  return <CalendlyEmbed />
}

export function DemoArPortfolio() {
  return <ArPortfolio />
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
  // Inline minimal study so we don't depend on content module resolution in docs
  const study = {
    id: "demo",
    title: "Demo case study",
    client: { name: "Acme", industry: "SaaS" },
    projectType: "MVP",
    challenge: "Ship a polished v1 without a design team.",
    solution: "Component-driven UI with shared tokens and reusable sections.",
    results: [{ metric: "Time", value: "7 days" }],
    technologies: ["Next.js", "TypeScript"],
    timeline: "1 week",
    budget: "Sprint",
    image: "/og",
    mockupVariant: "saas" as const,
    relatedServices: [],
  }
  return <VisualCaseStudy study={study as never} />
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
