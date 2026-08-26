"use client"

/**
 * Catalog Stage — Family Values on the landing catalog.
 * 1. Gradual revelation: one live block at a time.
 * 2. Fluidity: shared-layout tab indicator + soft crossfade (easeOutSoft).
 * 3. Careful delight: copy feedback on the install line only.
 *
 * Every preview is the real registry export users install — no mocks.
 * Proof section (not a second thesis restamp).
 */

import * as React from "react"
import Link from "next/link"
import { Check, Copy } from "lucide-react"
import { AnimatePresence, motion, useReducedMotion } from "motion/react"
import {
  ContactForm,
  DeadlineCountdown,
  HomeHero,
  WaitlistForm,
  type HomeHeroContent,
} from "atroui"
import { cn } from "@/lib/utils"
import { easeOutSoft, panelTween } from "@/lib/motion"
import {
  LandingModuleHeader,
  LandingPanel,
  LandingPanelToolbar,
  LandingSection,
} from "@/components/landing/module"

/** AtroUI.com product chrome — not the studio default CONTENT. */
const LANDING_HERO_CONTENT: Partial<HomeHeroContent> = {
  stamp: "Sample CONTENT · edit after install",
  headlineBefore: "Dark-first sections you",
  headlineAccent: "own",
  headlineAfter: ".",
  subhead:
    "Copy production blocks into your repo with the shadcn CLI. Host APIs for forms and tools — keys stay in your env.",
  primaryCta: { label: "Browse components", href: "/docs/components" },
  secondaryCta: { label: "Host APIs", href: "/docs/host-api" },
  founderName: "",
  founderRole: "",
  sprintTitle: "Install path",
  sprintDay: "2 steps",
  sprintDays: [
    { day: "01", label: "shadcn init", done: true },
    { day: "02", label: "add @atroui/…", done: true, active: false },
    { day: "03", label: "Edit CONTENT", done: false, active: true },
    { day: "04", label: "Ship", done: false },
  ],
  sprintCta: { label: "Open registry docs", href: "/docs/registry" },
  ogTitle: "Own the UI.\nBorrow the API.",
  ogSubtitle: "registry · Host APIs · MIT",
  ogHref: "/og",
  ogOpenLabel: "Open workspace",
  ogGenerateLabel: "Open OG",
  ogPreviewHint: "OG workspace UI — BYOK Host API",
}

type CatalogId = "hero" | "countdown" | "contact" | "waitlist"

type CatalogItem = {
  id: CatalogId
  label: string
  registry: string
  docs: string
  blurb: string
  command: string
}

const CATALOG: CatalogItem[] = [
  {
    id: "hero",
    label: "Hero",
    registry: "home-hero",
    docs: "/docs/components/home-hero",
    blurb: "Production hero — sample CONTENT for atroui.com.",
    command: "npx shadcn@latest add @atroui/home-hero",
  },
  {
    id: "countdown",
    label: "Countdown",
    registry: "deadline-countdown",
    docs: "/docs/components/deadline-countdown",
    blurb: "Personal kit block — edit CONTENT after install.",
    command: "npx shadcn@latest add @atroui/deadline-countdown",
  },
  {
    id: "contact",
    label: "Contact",
    registry: "contact-form",
    docs: "/docs/components/contact-contact-form",
    blurb: "Form UI + SMTP Host API (BYOK).",
    command: "npx shadcn@latest add @atroui/contact-form",
  },
  {
    id: "waitlist",
    label: "Waitlist",
    registry: "waitlist-form",
    docs: "/docs/components/brand-waitlist-form",
    blurb: "Waitlist UI + Host API route (BYOK).",
    command: "npx shadcn@latest add @atroui/waitlist-form",
  },
]

function StageCopyBtn({ text }: { text: string }) {
  const [copied, setCopied] = React.useState(false)

  async function copy() {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1600)
    } catch {
      /* ignore */
    }
  }

  return (
    <button
      type="button"
      onClick={copy}
      aria-label={copied ? "Copied" : "Copy install command"}
      className="inline-flex size-7 shrink-0 cursor-pointer items-center justify-center rounded-md text-[color:var(--ds-cyan,#92dbe0)] transition-colors hover:bg-[color:var(--ds-cyan,#92dbe0)]/15 hover:text-white"
    >
      {copied ? (
        <Check className="size-3.5" aria-hidden />
      ) : (
        <Copy className="size-3.5" aria-hidden />
      )}
    </button>
  )
}

function renderPreview(id: CatalogId) {
  switch (id) {
    case "hero":
      return <HomeHero content={LANDING_HERO_CONTENT} />
    case "countdown":
      return <DeadlineCountdown className="mx-auto w-full max-w-md" />
    case "contact":
      return (
        <div className="mx-auto w-full max-w-2xl space-y-3">
          <React.Suspense
            fallback={
              <p className="font-mono text-[12px] text-muted-foreground">
                Loading contact form…
              </p>
            }
          >
            <ContactForm />
          </React.Suspense>
          <p className="font-mono text-[11px] text-muted-foreground">
            Pair with{" "}
            <span className="text-foreground">@atroui/api-contact</span> — SMTP
            / Resend on your route. Keys stay in your env.
          </p>
        </div>
      )
    case "waitlist":
      return (
        <div className="mx-auto w-full max-w-sm space-y-3">
          <WaitlistForm />
          <p className="font-mono text-[11px] leading-relaxed text-muted-foreground">
            Pair with{" "}
            <span className="text-foreground">@atroui/api-waitlist</span> on
            your Next.js route (BYOK).
          </p>
        </div>
      )
    default:
      return null
  }
}

/** Fixed stage height so tab switches don’t resize the chrome (Family Values: fluidity). */
const STAGE_VIEWPORT =
  "h-[min(70dvh,36rem)] sm:h-[min(72dvh,40rem)]"

export function CatalogStage() {
  const reduce = useReducedMotion()
  const [activeId, setActiveId] = React.useState<CatalogId>("hero")
  const active = CATALOG.find((item) => item.id === activeId) ?? CATALOG[0]!
  const tablistRef = React.useRef<HTMLDivElement>(null)
  const viewportRef = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    viewportRef.current?.scrollTo({ top: 0 })
  }, [activeId])

  function onTabListKeyDown(event: React.KeyboardEvent<HTMLDivElement>) {
    const index = CATALOG.findIndex((item) => item.id === activeId)
    if (index < 0) return

    let next = index
    if (event.key === "ArrowRight" || event.key === "ArrowDown") {
      next = (index + 1) % CATALOG.length
    } else if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
      next = (index - 1 + CATALOG.length) % CATALOG.length
    } else if (event.key === "Home") {
      next = 0
    } else if (event.key === "End") {
      next = CATALOG.length - 1
    } else {
      return
    }

    event.preventDefault()
    const nextId = CATALOG[next]!.id
    setActiveId(nextId)
    tablistRef.current
      ?.querySelector<HTMLButtonElement>(`#catalog-tab-${nextId}`)
      ?.focus()
  }

  return (
    <LandingSection labelledBy="catalog-stage-title">
      <div className="flex flex-col gap-8 sm:gap-10">
        <LandingModuleHeader
          stamp="Live"
          titleId="catalog-stage-title"
          title={
            <>
              From the <span className="ds-sketch-accent">registry</span>
            </>
          }
          lede={
            <>
              Real exports{" "}
              <code className="rounded bg-white/10 px-1.5 py-0.5 font-mono text-[12px] text-neutral-200">
                shadcn add @atroui/…
              </code>{" "}
              writes into your repo. Host APIs stay on your keys.
            </>
          }
          action={
            <Link href="/docs/components" className="ds-hero-nav-link">
              View all components →
            </Link>
          }
        />

        <div
          ref={tablistRef}
          role="tablist"
          aria-label="Component previews"
          onKeyDown={onTabListKeyDown}
          className="flex gap-1 overflow-x-auto overscroll-x-contain pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {CATALOG.map((item) => {
            const selected = item.id === activeId
            return (
              <button
                key={item.id}
                type="button"
                role="tab"
                id={`catalog-tab-${item.id}`}
                aria-selected={selected}
                aria-controls="catalog-stage-panel"
                tabIndex={selected ? 0 : -1}
                onClick={() => setActiveId(item.id)}
                className={cn(
                  "relative shrink-0 rounded-lg px-3.5 py-2 text-[13px] font-medium transition-colors",
                  selected
                    ? "text-white"
                    : "text-white/45 hover:text-white/80"
                )}
              >
                {selected && !reduce ? (
                  <motion.span
                    layoutId="catalog-tab-pill"
                    className="absolute inset-0 rounded-lg border border-white/12 bg-white/6"
                    transition={panelTween}
                  />
                ) : selected ? (
                  <span className="absolute inset-0 rounded-lg border border-white/12 bg-white/6" />
                ) : null}
                <span className="relative z-10">{item.label}</span>
              </button>
            )
          })}
        </div>

        <LandingPanel>
          <div
            id="catalog-stage-panel"
            role="tabpanel"
            aria-labelledby={`catalog-tab-${active.id}`}
          >
            <LandingPanelToolbar>
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
                  <span className="font-mono text-[12px] text-[color:var(--ds-cyan,#92dbe0)]">
                    {active.registry}
                  </span>
                  <span className="text-[12px] text-white/35">·</span>
                  <span className="text-[12px] text-white/50">{active.blurb}</span>
                </div>
              </div>
              <div className="flex min-w-0 items-center gap-2 sm:ml-auto sm:max-w-[min(100%,28rem)]">
                <div className="flex min-w-0 flex-1 items-center gap-1.5 rounded-lg border border-[color:var(--ds-cyan,#92dbe0)]/25 bg-[color:var(--ds-cyan,#92dbe0)]/10 py-1 pr-1 pl-2.5 sm:gap-2 sm:pl-3">
                  <span
                    className="hidden shrink-0 font-mono text-[12px] font-medium text-[color:var(--ds-cyan,#92dbe0)] sm:inline"
                    aria-hidden
                  >
                    $
                  </span>
                  <code className="min-w-0 flex-1 truncate font-mono text-[11px] text-white sm:text-[12px]">
                    {active.command}
                  </code>
                  <StageCopyBtn text={active.command} />
                </div>
                <Link
                  href={active.docs}
                  className="shrink-0 font-mono text-[11px] uppercase tracking-[0.12em] text-white/45 transition-colors hover:text-white"
                >
                  Docs
                </Link>
              </div>
            </LandingPanelToolbar>

            <div
              ref={viewportRef}
              className={cn(
                "relative overflow-y-auto overscroll-contain",
                STAGE_VIEWPORT,
                active.id === "hero"
                  ? "px-0 py-0"
                  : "flex items-center justify-center px-4 py-8 sm:px-8 sm:py-12"
              )}
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={active.id}
                  initial={reduce ? false : { opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reduce ? undefined : { opacity: 0, y: -6 }}
                  transition={
                    reduce
                      ? { duration: 0 }
                      : { duration: 0.22, ease: easeOutSoft }
                  }
                  className={cn(
                    "w-full",
                    active.id === "hero" ? undefined : "flex justify-center"
                  )}
                >
                  {renderPreview(active.id)}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </LandingPanel>
      </div>
    </LandingSection>
  )
}
