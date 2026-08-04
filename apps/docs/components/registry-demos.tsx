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
    <div className="relative min-h-[72px] w-full overflow-hidden rounded-xl border border-border-subtle bg-background">
      <SiteHeader />
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
  return (
    <FadeIn className="rounded-xl border border-border-subtle bg-card px-6 py-4 text-sm">
      Scroll-reveal motion — fades in as it enters view.
    </FadeIn>
  )
}

export function DemoStagger() {
  return (
    <Stagger className="flex flex-col gap-2 text-left">
      {["First", "Second", "Third"].map((item) => (
        <StaggerChild key={item}>
          <div className="rounded-lg border border-border-subtle bg-card px-4 py-2 text-sm">
            {item}
          </div>
        </StaggerChild>
      ))}
    </Stagger>
  )
}

export function DemoScrollProgress() {
  return (
    <div className="relative h-24 w-full max-w-md overflow-hidden rounded-xl border border-border-subtle bg-card">
      <ScrollProgress className="absolute inset-x-0 top-0" />
      <p className="p-4 text-sm text-muted-foreground">Scroll progress bar (page scroll).</p>
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
    <div className="relative min-h-[200px] w-full">
      <p className="mb-4 text-center text-sm text-muted-foreground">
        Exit-intent popup mounts globally — move the cursor out of the viewport to trigger it.
      </p>
      <ExitIntentPopup />
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
    <div className="max-w-md rounded-xl border border-border-subtle bg-card px-5 py-4 text-left text-sm text-muted-foreground">
      <p className="font-medium text-foreground">ThemeProvider</p>
      <p className="mt-1">
        Wrap your app root once. Enables ThemeToggle and dark-mode tokens via{" "}
        <code className="font-mono text-xs">next-themes</code>.
      </p>
    </div>
  )
}
