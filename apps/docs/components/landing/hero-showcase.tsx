"use client"

/**
 * Hero showcase — one live block at a time inside a product frame.
 * Family Values: gradual revelation (tabs), fluidity (shared pill + crossfade),
 * careful delight (copy feedback on the install line). Every preview is the
 * real registry export a developer installs — no mockups.
 */

import * as React from "react"
import Link from "next/link"
import { ArrowUpRight, Check, Copy } from "lucide-react"
import { AnimatePresence, motion, useReducedMotion } from "motion/react"
import {
  FeatureGrid,
  HomeHero,
  PricingOverview,
  WaitlistForm,
} from "atroui"
import { cn } from "@/lib/utils"
import { easeOutSoft, panelTween } from "@/lib/motion"

type ShowcaseId = "hero" | "pricing" | "features" | "waitlist"

type ShowcaseItem = {
  id: ShowcaseId
  label: string
  registry: string
  docs: string
  contain: boolean
}

const ITEMS: ShowcaseItem[] = [
  { id: "hero", label: "Hero", registry: "home-hero", docs: "/docs/components/home-hero", contain: false },
  { id: "pricing", label: "Pricing", registry: "pricing-overview", docs: "/docs/components/pricing-overview", contain: false },
  { id: "features", label: "Features", registry: "feature-grid", docs: "/docs/components/feature-grid", contain: false },
  { id: "waitlist", label: "Waitlist", registry: "waitlist-form", docs: "/docs/components/brand-waitlist-form", contain: true },
]

function renderPreview(id: ShowcaseId) {
  switch (id) {
    case "hero":
      return <HomeHero />
    case "pricing":
      return <PricingOverview />
    case "features":
      return <FeatureGrid />
    case "waitlist":
      return <WaitlistForm />
    default:
      return null
  }
}

export function HeroShowcase() {
  const reduce = useReducedMotion()
  const [activeId, setActiveId] = React.useState<ShowcaseId>("hero")
  const active = ITEMS.find((item) => item.id === activeId) ?? ITEMS[0]!
  const command = `npx shadcn@latest add @atroui/${active.registry}`
  const [copied, setCopied] = React.useState(false)
  const viewportRef = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    viewportRef.current?.scrollTo({ top: 0 })
    setCopied(false)
  }, [activeId])

  async function copyCommand() {
    try {
      await navigator.clipboard.writeText(command)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1600)
    } catch {
      /* ignore */
    }
  }

  return (
    <div className="atro-frame w-full">
      {/* Frame chrome */}
      <div className="flex items-center gap-3 border-b border-border-subtle px-4 py-3">
        <div className="flex items-center gap-1.5" aria-hidden>
          <span className="size-2.5 rounded-full bg-foreground/15" />
          <span className="size-2.5 rounded-full bg-foreground/15" />
          <span className="size-2.5 rounded-full bg-foreground/15" />
        </div>
        <div className="mx-auto hidden items-center gap-2 rounded-md border border-border-subtle bg-background/50 px-3 py-1 sm:flex">
          <span className="size-1.5 rounded-full bg-brand" aria-hidden />
          <span className="font-mono text-[11px] text-muted-foreground">
            atroui.com/preview
          </span>
        </div>
        <span className="atro-chip-brand atro-chip ml-auto sm:ml-0">Live</span>
      </div>

      {/* Tabs */}
      <div
        role="tablist"
        aria-label="Component previews"
        className="flex gap-1 overflow-x-auto border-b border-border-subtle px-2 py-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {ITEMS.map((item) => {
          const selected = item.id === activeId
          return (
            <button
              key={item.id}
              type="button"
              role="tab"
              aria-selected={selected}
              onClick={() => setActiveId(item.id)}
              className={cn(
                "relative shrink-0 cursor-pointer rounded-md px-3 py-1.5 text-[13px] font-medium transition-colors",
                selected
                  ? "text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {selected && !reduce ? (
                <motion.span
                  layoutId="hero-showcase-pill"
                  className="absolute inset-0 rounded-md border border-border-subtle bg-white/[0.06]"
                  transition={panelTween}
                />
              ) : selected ? (
                <span className="absolute inset-0 rounded-md border border-border-subtle bg-white/[0.06]" />
              ) : null}
              <span className="relative z-10">{item.label}</span>
            </button>
          )
        })}
      </div>

      {/* Live viewport */}
      <div
        ref={viewportRef}
        className={cn(
          "relative h-[22rem] overflow-y-auto overscroll-contain bg-background sm:h-[26rem]",
          active.contain && "flex items-center justify-center p-6"
        )}
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={active.id}
            initial={reduce ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? undefined : { opacity: 0, y: -8 }}
            transition={reduce ? { duration: 0 } : { duration: 0.24, ease: easeOutSoft }}
            className={cn("w-full", active.contain && "max-w-sm")}
          >
            {renderPreview(active.id)}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Install strip */}
      <div className="flex items-center gap-2 border-t border-border-subtle px-3 py-2.5">
        <span className="shrink-0 font-mono text-[12px] text-brand" aria-hidden>
          $
        </span>
        <code className="min-w-0 flex-1 truncate font-mono text-[11px] text-foreground sm:text-[12px]">
          {command}
        </code>
        <button
          type="button"
          onClick={copyCommand}
          aria-label={copied ? "Copied" : "Copy install command"}
          className="inline-flex size-7 shrink-0 cursor-pointer items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-white/10 hover:text-foreground"
        >
          {copied ? (
            <Check className="size-3.5 text-brand" aria-hidden />
          ) : (
            <Copy className="size-3.5" aria-hidden />
          )}
        </button>
        <Link
          href={active.docs}
          className="inline-flex shrink-0 items-center gap-1 font-mono text-[11px] uppercase tracking-[0.12em] text-muted-foreground transition-colors hover:text-foreground"
        >
          Docs
          <ArrowUpRight className="size-3" aria-hidden />
        </Link>
      </div>
    </div>
  )
}
