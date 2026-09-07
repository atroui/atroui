"use client"

/**
 * Legacy product demo — docs embeds live atroui package previews.
 * Landing hero uses RegistryWorkspaceDemo (real registry source + blocks).
 */

import * as React from "react"
import Link from "next/link"
import { Check, Copy } from "lucide-react"
import { AnimatePresence, motion, useReducedMotion } from "motion/react"
import {
  FeatureGrid,
  HomeHero,
  PricingOverview,
  WaitlistForm,
} from "atroui"
import { cn } from "@/lib/utils"
import { easeOutSoft } from "@/lib/motion"

type ShowcaseId = "hero" | "pricing" | "features" | "waitlist"

type ShowcaseItem = {
  id: ShowcaseId
  label: string
  registry: string
  docs: string
  contain: boolean
}

const ITEMS: ShowcaseItem[] = [
  {
    id: "waitlist",
    label: "Waitlist",
    registry: "waitlist-form",
    docs: "/docs/components/brand-waitlist-form",
    contain: true,
  },
  {
    id: "pricing",
    label: "Pricing",
    registry: "pricing-overview",
    docs: "/docs/components/pricing-overview",
    contain: false,
  },
  {
    id: "features",
    label: "Features",
    registry: "feature-grid",
    docs: "/docs/components/feature-grid",
    contain: false,
  },
  {
    id: "hero",
    label: "Hero",
    registry: "home-hero",
    docs: "/docs/components/home-hero",
    contain: false,
  },
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

export function HeroShowcase({
  prominent = false,
}: {
  prominent?: boolean
}) {
  const reduce = useReducedMotion()
  const [activeId, setActiveId] = React.useState<ShowcaseId>("waitlist")
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
    <div className={cn("atro-frame w-full")}>
      <div
        role="tablist"
        aria-label="Component previews"
        className="flex gap-0 overflow-x-auto gap-1 border-b border-border-subtle px-2 py-2 px-4 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
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
              {selected ? (
                <span className="absolute inset-0 rounded-md border border-border-subtle bg-foreground/[0.04]" />
              ) : null}
              <span className="relative z-10">{item.label}</span>
            </button>
          )
        })}
      </div>

      <div
        ref={viewportRef}
        className={cn(
          "relative overflow-y-auto overscroll-contain bg-background",
          prominent
            ? "h-[24rem] sm:h-[30rem] lg:h-[34rem]"
            : "h-[22rem] sm:h-[26rem]",
          active.contain && "flex items-center justify-center"
        )}
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={active.id}
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={reduce ? undefined : { opacity: 0 }}
            transition={reduce ? { duration: 0 } : { duration: 0.2, ease: easeOutSoft }}
            className={cn(
              "w-full",
              active.contain && "max-w-md px-6 py-8"
            )}
          >
            {renderPreview(active.id)}
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="flex items-center gap-2 border-t border-border-subtle px-4 py-3">
        <code className="min-w-0 flex-1 truncate font-mono text-[12px] text-muted-foreground">
          {command}
        </code>
        <button
          type="button"
          onClick={copyCommand}
          aria-label={copied ? "Copied" : "Copy install command"}
          className="inline-flex size-7 shrink-0 cursor-pointer items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-foreground/[0.05] hover:text-foreground"
        >
          {copied ? (
            <Check className="size-3.5 text-foreground" aria-hidden />
          ) : (
            <Copy className="size-3.5" aria-hidden />
          )}
        </button>
        <Link
          href={active.docs}
          className="shrink-0 text-[12px] text-muted-foreground transition-colors hover:text-foreground"
        >
          Docs →
        </Link>
      </div>
    </div>
  )
}
