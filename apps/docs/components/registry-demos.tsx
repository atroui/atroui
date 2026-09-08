"use client"

import * as React from "react"
import {
  BoldFooter,
  Breadcrumbs,
  Button,
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Changelog,
  CommandMenu,
  ContextualCTA,
  CountUp,
  CalendlyEmbed,
  DeadlineCountdown,
  ExitIntentPopup,
  FadeIn,
  FaqInteractivePreview,
  FeatureGrid,
  FormSelect,
  FounderAvatar,
  HomeCrafts,
  HomeLab,
  HomePrinciple,
  HomeWho,
  HomeWork,
  LocalClock,
  LogoCloud,
  LogoMark,
  LogoWordmark,
  MadeWithEmbed,
  NewsletterForm,
  PersonalHero,
  ProjectList,
  Prose,
  ResourcesContent,
  Resume,
  ScopeChat,
  ScrollProgress,
  SocialShare,
  Stagger,
  StaggerChild,
  Textarea,
  ThemeToggle,
  ThumbnailLivePreview,
  ThumbnailWorkspace,
  TimelineAnimation,
  WeatherChip,
  ArPortfolio,
  JournalContent,
  LiveDashboard,
  trackEvent,
  MEDIA,
  mediaSrc,
} from "atroui"
import {
  ArrowRight,
  MoreHorizontal,
  Plus,
  Settings2,
  Trash2,
} from "lucide-react"
import { WaitlistStagePreview } from "@/components/registry/waitlist-stage-preview"
import { HomeHero } from "../registry/default/blocks/home-hero"
import { OgExamples } from "../registry/default/blocks/og-examples"
import { OgLivePreview } from "../registry/default/blocks/og-live-preview"
import { OgWorkspace } from "../registry/default/blocks/og-workspace"
import { PricingOverview } from "../registry/default/blocks/pricing-overview"
import { ProjectPlanner } from "../registry/default/blocks/project-planner"
import { SiteFooter } from "../registry/default/blocks/site-footer"
import { SiteHeader } from "../registry/default/blocks/site-header"

/** Live canvas demos - one per documented component where a useful preview exists. */

export function DemoHomeHero() {
  // Same `@atroui/home-hero` source users install — not the npm `HomeHero` alias.
  return <HomeHero />
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
  // Same `@atroui/pricing-overview` source users install — not npm.
  return <PricingOverview />
}

export function DemoFeatureGrid() {
  return <FeatureGrid />
}

export function DemoLogoCloud() {
  return <LogoCloud />
}

export function DemoBoldFooter() {
  return <BoldFooter />
}

export function DemoSiteHeader() {
  // Same `@atroui/site-header` source users install — not npm.
  return (
    <div className="w-full bg-background">
      <SiteHeader />
      <div className="mx-auto max-w-7xl border-x border-border-subtle px-6 py-10 text-sm text-muted-foreground">
        Sticky header - AtroUI logo via getBrand(), studio nav routes, theme
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

export function DemoButtonWithIcon() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-3">
      <Button>
        <Plus data-icon="inline-start" />
        New project
      </Button>
      <Button variant="outline">
        Continue
        <ArrowRight data-icon="inline-end" />
      </Button>
      <Button variant="destructive">
        <Trash2 data-icon="inline-start" />
        Delete
      </Button>
    </div>
  )
}

export function DemoButtonIconOnly() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-3">
      <Button size="icon-xs" variant="ghost" aria-label="Settings">
        <Settings2 />
      </Button>
      <Button size="icon-sm" variant="outline" aria-label="Settings">
        <Settings2 />
      </Button>
      <Button size="icon" variant="secondary" aria-label="Settings">
        <Settings2 />
      </Button>
      <Button size="icon-lg" aria-label="Add item">
        <Plus />
      </Button>
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
            Same primitives - compose with tokens, not one-off styles.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}

export function DemoCardFooterActions() {
  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Deploy preview</CardTitle>
        <CardDescription>atroui-docs · main</CardDescription>
        <CardAction>
          <Button size="icon-sm" variant="ghost" aria-label="Deploy options">
            <MoreHorizontal />
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">
          Build finished in 42s. No checks failed.
        </p>
      </CardContent>
      <CardFooter className="justify-between">
        <span className="text-xs text-muted-foreground">2 minutes ago</span>
        <div className="flex gap-2">
          <Button size="sm" variant="ghost">
            Logs
          </Button>
          <Button size="sm">Visit</Button>
        </div>
      </CardFooter>
    </Card>
  )
}

export function DemoCardCompactMedia() {
  return (
    <div className="flex flex-wrap items-start justify-center gap-4">
      <Card size="sm" className="w-full max-w-[240px]">
        <img
          src="/examples/product-launch.png"
          alt=""
          width={1200}
          height={630}
          className="aspect-2/1 w-full object-cover"
        />
        <CardHeader>
          <CardTitle>Product launch</CardTitle>
          <CardDescription>Shipped Sep 2</CardDescription>
        </CardHeader>
      </Card>
      <Card size="sm" className="w-full max-w-[240px]">
        <img
          src="/examples/changelog-release.png"
          alt=""
          width={1200}
          height={630}
          className="aspect-2/1 w-full object-cover"
        />
        <CardHeader>
          <CardTitle>Changelog 0.4</CardTitle>
          <CardDescription>Shipped Aug 28</CardDescription>
        </CardHeader>
      </Card>
    </div>
  )
}

export function DemoTextarea() {
  return <Textarea placeholder="Write a message…" className="max-w-md" />
}

export function DemoTextareaInvalid() {
  return (
    <div className="w-full max-w-md space-y-1.5 text-left">
      <label htmlFor="demo-textarea-notes" className="text-sm font-medium">
        Release notes
      </label>
      <Textarea
        id="demo-textarea-notes"
        aria-invalid
        aria-describedby="demo-textarea-notes-error"
        defaultValue="Ship it"
      />
      <p id="demo-textarea-notes-error" className="text-sm text-destructive">
        Add at least 20 characters.
      </p>
    </div>
  )
}

export function DemoTextareaAutoSize() {
  return (
    <Textarea
      className="max-h-40 max-w-md overflow-y-auto"
      defaultValue={
        "Review notes\n\n- Tighten the empty state copy\n- Keep the caret blink on search\n- Drop the second CTA in the tray"
      }
    />
  )
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

export function DemoFormSelectLabelled() {
  const [plan, setPlan] = React.useState("pro")
  return (
    <div className="flex w-full max-w-xs flex-col gap-4 text-left">
      <div className="space-y-1.5">
        <label htmlFor="demo-select-plan" className="text-sm font-medium">
          Plan
        </label>
        <FormSelect
          id="demo-select-plan"
          value={plan}
          onValueChange={setPlan}
          options={[
            { value: "free", label: "Free" },
            { value: "pro", label: "Pro" },
            { value: "team", label: "Team" },
          ]}
        />
      </div>
      <div className="space-y-1.5">
        <label htmlFor="demo-select-region" className="text-sm font-medium">
          Region
        </label>
        <FormSelect
          id="demo-select-region"
          disabled
          value=""
          onValueChange={() => {}}
          placeholder="Chosen by your plan"
          options={[{ value: "iad", label: "Washington, D.C." }]}
        />
      </div>
    </div>
  )
}

export { DemoThemeAdapt } from "@/components/theme-adapt-demo"

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
        Interrupted A - open letterform + floating brand bar. Label from{" "}
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
          Bundled with the package. No{" "}
          <code className="font-mono text-[11px] text-foreground">/public</code>{" "}
          copy required.
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

export function DemoBreadcrumbsPlain() {
  return (
    <Breadcrumbs
      items={[
        { label: "Docs", href: "/docs" },
        { label: "Primitives" },
        { label: "Breadcrumbs", href: "/docs/components/ui-breadcrumbs" },
      ]}
    />
  )
}

export function DemoProse() {
  return (
    <Prose className="max-w-md text-left">
      <h3>Readable by default</h3>
      <p>
        Prose styles long-form content with comfortable measure, spacing, and contrast -
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
        className="atro-btn-ghost self-center"
      >
        Replay
      </button>
    </div>
  )
}

export function DemoFadeInDelayed() {
  const [key, setKey] = React.useState(0)

  return (
    <div className="flex w-full max-w-md flex-col items-stretch gap-4">
      <FadeIn
        key={key}
        preview
        delay={0.35}
        y={24}
        className="rounded-xl border border-border-subtle bg-card px-6 py-5 text-sm text-foreground shadow-sm"
      >
        <p className="ms-stamp mb-2">delay · y</p>
        <p className="font-medium">Arrives later, from farther</p>
        <p className="mt-1 text-muted-foreground">
          delay is seconds; y is the starting translateY in px.
        </p>
      </FadeIn>
      <button
        type="button"
        onClick={() => setKey((k) => k + 1)}
        className="atro-btn-ghost self-center"
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
        className="atro-btn-ghost self-center"
      >
        Replay
      </button>
    </div>
  )
}

export function DemoStaggerSlow() {
  const [key, setKey] = React.useState(0)

  return (
    <div className="flex w-full max-w-md flex-col items-stretch gap-4">
      <Stagger
        key={key}
        preview
        delay={0.15}
        stagger={0.18}
        className="flex flex-col gap-2 text-left"
      >
        {["Hold", "Then", "Cascade"].map((item) => (
          <StaggerChild key={item} y={22}>
            <div className="rounded-lg border border-border-subtle bg-card px-4 py-2.5 text-sm text-foreground">
              {item}
            </div>
          </StaggerChild>
        ))}
      </Stagger>
      <button
        type="button"
        onClick={() => setKey((k) => k + 1)}
        className="atro-btn-ghost self-center"
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
          Scroll the panel - the brand bar tracks local progress.
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

export function DemoOgLivePreview() {
  // Same `@atroui/og-live-preview` source users install — CSS-only card.
  return (
    <div className="relative aspect-[1200/630] w-full max-w-xl overflow-hidden rounded-xl ring-1 ring-border-subtle">
      <OgLivePreview
        title={"Ship in days,\nnot quarters."}
        subtitle="AtroUI - your component catalog"
        styleKey="paperQuote"
      />
    </div>
  )
}

export function DemoOgExamples() {
  // Same `@atroui/og-examples` source users install — not npm.
  return (
    <div className="w-full border-y border-border-subtle bg-background">
      <OgExamples preview className="w-full" />
    </div>
  )
}

export function DemoOgWorkspace() {
  // Same `@atroui/og-workspace` install (CSS preview shell). Live /og tool is npm Host API.
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
  return (
    <div className="mx-auto w-full max-w-md">
      <WaitlistStagePreview />
    </div>
  )
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
      title="AnalyticsProvider - scripts + experiments, no chrome"
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
        className="atro-btn-ghost"
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

export function DemoSiteFooter() {
  // Same `@atroui/site-footer` source users install — not npm.
  return <SiteFooter />
}

export function DemoCalendlyEmbed() {
  return (
    <div className="w-full max-w-lg overflow-hidden rounded-[var(--atro-panel-radius)] border border-border-subtle bg-card/40">
      <CalendlyEmbed />
    </div>
  )
}

export function DemoArPortfolio() {
  return (
    <div className="w-full max-h-[640px] overflow-auto rounded-[var(--atro-panel-radius)] border border-border-subtle bg-background p-5 sm:p-8">
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
  // Same `@atroui/project-planner` source users install — not npm.
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

/** Indie site kit demos — center the 640px column in the wide docs preview. */
function IndieKitFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto w-full max-w-[640px] px-4 py-6 sm:px-5 sm:py-8">
      {children}
    </div>
  )
}

export function DemoCountUp() {
  return (
    <div className="flex items-baseline justify-center gap-2 font-mono tabular-nums">
      <CountUp
        value={128}
        className="text-5xl font-medium tracking-tight text-foreground"
        ariaLabel="128"
      />
      <span className="text-sm text-muted-foreground">ships</span>
    </div>
  )
}

export function DemoCountUpSlow() {
  return (
    <div className="flex items-baseline justify-center gap-2 font-mono tabular-nums">
      <CountUp
        value={42}
        duration={2400}
        className="text-5xl font-medium tracking-tight text-foreground"
        ariaLabel="42"
      />
      <span className="text-sm text-muted-foreground">blocks</span>
    </div>
  )
}

export function DemoDeadlineCountdown() {
  return (
    <IndieKitFrame>
      <DeadlineCountdown className="w-full" />
    </IndieKitFrame>
  )
}

export function DemoProjectList() {
  return (
    <IndieKitFrame>
      <ProjectList className="w-full" />
    </IndieKitFrame>
  )
}

export function DemoChangelog() {
  return (
    <IndieKitFrame>
      <Changelog className="w-full" />
    </IndieKitFrame>
  )
}

export function DemoCommandMenu() {
  return (
    <div className="relative mx-auto w-full max-w-md rounded-xl border border-border-subtle bg-background px-6 py-10 text-center">
      <p className="text-sm text-muted-foreground">
        Press{" "}
        <kbd className="rounded border border-border-subtle bg-muted px-1.5 py-0.5 font-mono text-[11px] text-foreground">
          ⌘K
        </kbd>{" "}
        (or Ctrl+K) to open the command menu.
      </p>
      <CommandMenu />
    </div>
  )
}

/** Contained gallery thumb — no portal (⌘K is for the live docs page). */
export function DemoCommandMenuGallery() {
  return (
    <div className="flex h-full items-center justify-center bg-background p-4">
      <div className="w-full max-w-[14rem] overflow-hidden rounded-lg border border-border-subtle bg-card shadow-sm">
        <div className="flex items-center gap-2 border-b border-border-subtle px-2.5 py-2">
          <span className="flex-1 truncate font-mono text-[10px] text-muted-foreground">
            Search docs…
          </span>
          <kbd className="rounded border border-border-subtle px-1 font-mono text-[9px] text-muted-foreground">
            ⌘K
          </kbd>
        </div>
        <ul className="space-y-0.5 p-1.5 font-mono text-[10px] text-foreground">
          <li className="rounded-md bg-white/[0.06] px-2 py-1.5">Home</li>
          <li className="rounded-md px-2 py-1.5 text-muted-foreground">
            Components
          </li>
          <li className="rounded-md px-2 py-1.5 text-muted-foreground">Blog</li>
        </ul>
      </div>
    </div>
  )
}

export function DemoPersonalHero() {
  return (
    <IndieKitFrame>
      <PersonalHero
        name="Your Name"
        imageSrc={mediaSrc(MEDIA.founderPortrait)}
        imageAlt="Portrait"
        className="w-full px-0 pt-2 sm:pt-4"
      />
    </IndieKitFrame>
  )
}

export function DemoResume() {
  return (
    <div className="mx-auto max-h-[560px] w-full max-w-[720px] overflow-auto">
      <Resume />
    </div>
  )
}

export function DemoLocalClock() {
  return (
    <div className="flex justify-center py-6">
      <LocalClock timezone="America/New_York" timezoneLabel="NYC" />
    </div>
  )
}

export function DemoLocalClockLondon() {
  return (
    <div className="flex justify-center py-6">
      <LocalClock timezone="Europe/London" timezoneLabel="LON" />
    </div>
  )
}

export function DemoWeatherChip() {
  return (
    <div className="flex justify-center py-6">
      <WeatherChip lat={40.7128} lon={-74.006} label="NYC" />
    </div>
  )
}

export function DemoWeatherChipLondon() {
  return (
    <div className="flex justify-center py-6">
      <WeatherChip lat={51.5074} lon={-0.1278} label="LON" />
    </div>
  )
}
