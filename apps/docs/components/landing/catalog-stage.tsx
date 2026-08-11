"use client"

/**
 * Catalog Stage — Family Values on the landing catalog.
 * 1. Gradual revelation: one live component at a time.
 * 2. Fluidity: shared-layout tab indicator + soft crossfade (easeOutSoft).
 * 3. Careful delight: copy feedback on the install line only.
 */

import * as React from "react"
import Link from "next/link"
import { Check, Copy } from "lucide-react"
import { AnimatePresence, motion, useReducedMotion } from "motion/react"
import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  DeadlineCountdown,
  LocalClock,
  ThemeToggle,
} from "atroui"
import { cn } from "@/lib/utils"
import { easeOutSoft, panelTween } from "@/lib/motion"

const shell =
  "mx-auto w-full max-w-7xl px-4 py-12 sm:px-8 sm:py-16 md:px-12 lg:px-20 lg:py-20 xl:px-24"

type CatalogId = "theme" | "button" | "card" | "countdown" | "clock"

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
    id: "theme",
    label: "Theme",
    registry: "theme-toggle",
    docs: "/docs/components/ui-theme-toggle",
    blurb: "Soft-rect chrome. Dark, light, system.",
    command: "npx shadcn@latest add @atroui/theme-toggle",
  },
  {
    id: "button",
    label: "Button",
    registry: "button",
    docs: "/docs/components/ui-button",
    blurb: "Primary actions with quiet variants.",
    command: "npx shadcn@latest add @atroui/button",
  },
  {
    id: "card",
    label: "Card",
    registry: "card",
    docs: "/docs/components/ui-card",
    blurb: "Elevated surface for focused content.",
    command: "npx shadcn@latest add @atroui/card",
  },
  {
    id: "countdown",
    label: "Countdown",
    registry: "deadline-countdown",
    docs: "/docs/components/deadline-countdown",
    blurb: "Personal kit — days to a date you own.",
    command: "npx shadcn@latest add @atroui/deadline-countdown",
  },
  {
    id: "clock",
    label: "Clock",
    registry: "local-clock",
    docs: "/docs/components/local-clock",
    blurb: "Monospace local time for indie chrome.",
    command: "npx shadcn@latest add @atroui/local-clock",
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
      className="inline-flex size-8 shrink-0 items-center justify-center rounded-lg text-white/45 transition-colors hover:bg-white/10 hover:text-white"
    >
      {copied ? (
        <Check
          className="size-3.5 text-(--ds-cyan,#92dbe0)"
          aria-hidden
        />
      ) : (
        <Copy className="size-3.5" aria-hidden />
      )}
    </button>
  )
}

function PreviewTheme() {
  return (
    <div className="flex flex-col items-center gap-5">
      <ThemeToggle />
      <p className="max-w-xs text-center font-mono text-[11px] leading-relaxed text-white/45">
        Switches the site theme. Soft-rect, not a capsule.
      </p>
    </div>
  )
}

function PreviewButton() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-3">
      <Button>Get started</Button>
      <Button variant="outline">Docs</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="ghost">Ghost</Button>
    </div>
  )
}

function PreviewCard() {
  return (
    <Card className="w-full max-w-sm border border-white/10 bg-white/3 shadow-none ring-0">
      <CardHeader>
        <CardTitle className="text-white">Own the UI</CardTitle>
        <CardDescription className="text-white/50">
          Files land in your repo. Edit CONTENT at the top.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex gap-2">
        <Button size="sm">Install</Button>
        <Button size="sm" variant="outline">
          Registry
        </Button>
      </CardContent>
    </Card>
  )
}

function PreviewCountdown() {
  return (
    <div className="w-full max-w-md">
      <DeadlineCountdown className="mx-auto max-w-md" />
    </div>
  )
}

function PreviewClock() {
  return (
    <div className="flex flex-col items-center gap-3">
      <LocalClock
        timezone="Asia/Kolkata"
        timezoneLabel="IST"
        className="text-base text-white/80"
      />
      <p className="font-mono text-[11px] text-white/40">
        LocalClock · Asia/Kolkata
      </p>
    </div>
  )
}

const PREVIEWS: Record<CatalogId, React.ReactNode> = {
  theme: <PreviewTheme />,
  button: <PreviewButton />,
  card: <PreviewCard />,
  countdown: <PreviewCountdown />,
  clock: <PreviewClock />,
}

export function CatalogStage() {
  const reduce = useReducedMotion()
  const [activeId, setActiveId] = React.useState<CatalogId>("theme")
  const active = CATALOG.find((item) => item.id === activeId) ?? CATALOG[0]!
  const tablistRef = React.useRef<HTMLDivElement>(null)

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
    const btn = tablistRef.current?.querySelector<HTMLButtonElement>(
      `#catalog-tab-${nextId}`
    )
    btn?.focus()
  }

  return (
    <section className="border-t border-white/10" aria-labelledby="catalog-stage-title">
      <div className={shell}>
        <div className="flex flex-col gap-8 sm:gap-10">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div className="max-w-xl">
              <p className="ms-stamp">Catalog</p>
              <h2
                id="catalog-stage-title"
                className="ds-display mt-4 text-2xl leading-snug sm:mt-5 sm:text-3xl md:text-4xl"
              >
                See it before you{" "}
                <span className="ds-sketch-accent">install</span>
              </h2>
              <p className="ds-lede mt-3 max-w-md text-neutral-400 sm:mt-4">
                Live pieces from the registry. One at a time — the same source
                that lands in your repo.
              </p>
            </div>
            <Link
              href="/docs/components"
              className="ds-hero-nav-link shrink-0 self-start sm:self-auto"
            >
              View all components →
            </Link>
          </div>

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
                      transition={{ ...panelTween }}
                      style={{ transitionTimingFunction: easeOutSoft.join(",") }}
                    />
                  ) : selected ? (
                    <span className="absolute inset-0 rounded-lg border border-white/12 bg-white/6" />
                  ) : null}
                  <span className="relative z-10">{item.label}</span>
                </button>
              )
            })}
          </div>

          <div
            id="catalog-stage-panel"
            role="tabpanel"
            aria-labelledby={`catalog-tab-${active.id}`}
            className="overflow-hidden rounded-xl border border-white/10 bg-white/2"
          >
            <div className="flex flex-col gap-3 border-b border-white/10 px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:px-5">
              <div className="min-w-0">
                <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
                  <span className="font-mono text-[12px] text-(--ds-cyan,#92dbe0)">
                    {active.registry}
                  </span>
                  <span className="text-[12px] text-white/35">·</span>
                  <span className="text-[12px] text-white/50">{active.blurb}</span>
                </div>
              </div>
              <Link
                href={active.docs}
                className="shrink-0 font-mono text-[11px] uppercase tracking-[0.12em] text-white/45 transition-colors hover:text-white"
              >
                Docs
              </Link>
            </div>

            <div className="relative flex min-h-70 items-center justify-center px-4 py-10 sm:min-h-80 sm:px-8 sm:py-14">
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
                  className="flex w-full items-center justify-center"
                >
                  {PREVIEWS[active.id]}
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="flex items-center gap-2 border-t border-white/10 bg-black/40 px-3 py-2.5 sm:px-4">
              <span
                className="font-mono text-[12px] text-(--ds-cyan,#92dbe0)"
                aria-hidden
              >
                $
              </span>
              <code className="min-w-0 flex-1 truncate font-mono text-[12px] text-white/80 sm:text-[13px]">
                {active.command}
              </code>
              <StageCopyBtn text={active.command} />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
