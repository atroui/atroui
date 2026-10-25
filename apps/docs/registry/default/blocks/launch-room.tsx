"use client"

/**
 * Launch Room — Scope → Planner → Social in one frame.
 * Family Values: one step at a time; brief travels; handoff CTA is the primary.
 *
 * Install: npx shadcn@latest add @atroui/launch-workflow
 */

import { useEffect, useState } from "react"
import Link from "next/link"
import { AnimatePresence, motion, useReducedMotion } from "motion/react"
import { ArrowRight, Check } from "lucide-react"

import {
  PROJECT_BRIEF_STORAGE_KEY,
  briefOgSubtitle,
  briefOgTitle,
  buildOgHref,
  isProjectBrief,
  parseProjectBrief,
  type ProjectBrief,
  EMPTY_PROJECT_BRIEF,
} from "@/lib/project-brief"
import { cn } from "@/lib/utils"
import { ScopeChat } from "./scope-chat"
import { ProjectPlanner } from "./project-planner"
import { OgWorkspace } from "./og-workspace"

const CONTENT = {
  ogPath: "/og",
  install: "npx shadcn@latest add @atroui/launch-workflow",
}

type StepId = "scope" | "planner" | "social"

const STEPS: { id: StepId; label: string }[] = [
  { id: "scope", label: "Scope" },
  { id: "planner", label: "Planner" },
  { id: "social", label: "Social" },
]

const layoutTween = {
  type: "tween" as const,
  duration: 0.22,
  ease: [0.16, 1, 0.3, 1] as const,
}

const switchLayoutTween = {
  type: "tween" as const,
  duration: 0.28,
  ease: [0.16, 1, 0.3, 1] as const,
}

function readStoredBrief(): ProjectBrief | null {
  if (typeof window === "undefined") return null
  try {
    const raw = window.localStorage.getItem(PROJECT_BRIEF_STORAGE_KEY)
    if (!raw) return null
    return parseProjectBrief(raw)
  } catch {
    return null
  }
}

function writeStoredBrief(brief: ProjectBrief) {
  if (typeof window === "undefined") return
  try {
    window.localStorage.setItem(
      PROJECT_BRIEF_STORAGE_KEY,
      JSON.stringify(brief),
    )
  } catch {
    /* ignore quota */
  }
}

export function LaunchRoom() {
  const reduce = useReducedMotion()
  const [step, setStep] = useState<StepId>("scope")
  const [brief, setBrief] = useState<ProjectBrief>(EMPTY_PROJECT_BRIEF)
  const [mounted, setMounted] = useState(false)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    const stored = readStoredBrief()
    if (stored) setBrief(stored)
    setMounted(true)
  }, [])

  const persistBrief = (next: ProjectBrief) => {
    setBrief(next)
    writeStoredBrief(next)
  }

  const hasBrief =
    mounted &&
    isProjectBrief(brief) &&
    Boolean(brief.name.trim() || brief.oneLiner.trim())

  const reading = hasBrief
    ? `${brief.name || "Untitled"}${brief.oneLiner ? ` · ${brief.oneLiner.slice(0, 48)}` : ""}`
    : "Describe a project to start"

  const stepIndex = STEPS.findIndex((s) => s.id === step)

  const goPlanner = () => {
    if (!hasBrief) return
    setStep("planner")
  }

  const goSocial = () => {
    if (!hasBrief) return
    setStep("social")
  }

  const copyInstall = async () => {
    try {
      await navigator.clipboard.writeText(CONTENT.install)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1600)
    } catch {
      /* ignore */
    }
  }

  const ogHref = buildOgHref(brief, { path: CONTENT.ogPath })

  return (
    <div className="overflow-hidden rounded-[var(--atro-panel-radius)] border border-border-subtle bg-background">
      <header className="flex flex-wrap items-end justify-between gap-3 border-b border-border-subtle px-4 py-3.5 @min-[40rem]:px-5">
        <div className="min-w-0">
          <p className="font-mono text-[10px] tracking-[0.16em] text-muted-foreground uppercase">
            Launch room
          </p>
          <h1 className="mt-1 text-[1.45rem] font-medium tracking-[-0.035em] text-foreground @min-[40rem]:text-[1.75rem]">
            Scope to{" "}
            <em className="font-normal italic text-brand">social</em>
          </h1>
        </div>
        <p
          className="max-w-sm font-mono text-[10px] leading-snug tracking-[0.04em] text-muted-foreground @min-[40rem]:text-right"
          aria-live="polite"
        >
          {reading}
        </p>
      </header>

      <div
        role="tablist"
        aria-label="Launch steps"
        className="sticky top-0 z-10 flex gap-0.5 border-b border-border-subtle bg-background/95 px-2 py-1.5 backdrop-blur-sm"
      >
        {STEPS.map((item, i) => {
          const selected = step === item.id
          const done = i < stepIndex
          return (
            <button
              key={item.id}
              type="button"
              role="tab"
              aria-selected={selected}
              onClick={() => {
                if (i === 0 || hasBrief) setStep(item.id)
              }}
              disabled={i > 0 && !hasBrief}
              className={cn(
                "relative flex flex-1 items-center justify-center gap-1 rounded-[calc(var(--atro-control-radius)-1px)] px-1 py-1.5 text-[11px] font-medium tracking-tight outline-none transition-colors focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-40",
                selected
                  ? "text-foreground"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              {selected && !reduce ? (
                <motion.span
                  layoutId="launch-room-step-pill"
                  className="absolute inset-0 rounded-[calc(var(--atro-control-radius)-1px)] bg-muted/80 ring-1 ring-border-subtle"
                  transition={switchLayoutTween}
                  aria-hidden
                />
              ) : null}
              {selected && reduce ? (
                <span
                  className="absolute inset-0 rounded-[calc(var(--atro-control-radius)-1px)] bg-muted/80 ring-1 ring-border-subtle"
                  aria-hidden
                />
              ) : null}
              <span className="relative z-[1] inline-flex items-center gap-1">
                {done ? (
                  <Check className="size-3 text-brand" strokeWidth={2.5} aria-hidden />
                ) : null}
                {item.label}
              </span>
            </button>
          )
        })}
      </div>

      <div className="relative min-h-[28rem] bg-[radial-gradient(90%_60%_at_50%_0%,color-mix(in_oklch,var(--brand)_10%,transparent),transparent_55%)]">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={step}
            role="tabpanel"
            className="p-3 @min-[40rem]:p-4"
            initial={reduce ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? undefined : { opacity: 0, y: -6 }}
            transition={layoutTween}
          >
            {step === "scope" ? (
              <ScopeChat onBriefChange={persistBrief} />
            ) : null}
            {step === "planner" ? (
              <ProjectPlanner onBriefChange={persistBrief} />
            ) : null}
            {step === "social" ? (
              <OgWorkspace
                title={briefOgTitle(brief) || undefined}
                subtitle={briefOgSubtitle(brief) || undefined}
              />
            ) : null}
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="sticky bottom-0 z-10 flex flex-col gap-2 border-t border-border-subtle bg-background/95 px-3 py-3 backdrop-blur-sm @min-[40rem]:flex-row @min-[40rem]:items-center @min-[40rem]:justify-between @min-[40rem]:px-4">
        <p className="font-mono text-[10px] tracking-[0.08em] text-muted-foreground">
          {step === "scope"
            ? "Send a message, then continue"
            : step === "planner"
              ? "Reach estimate, then continue — or skip to social"
              : "Preview without keys · AI needs Host API env"}
        </p>
        <div className="flex flex-wrap items-center gap-2">
          {step === "scope" ? (
            <button
              type="button"
              className="atro-btn"
              disabled={!hasBrief}
              onClick={goPlanner}
            >
              Continue to planner
              <ArrowRight className="size-4" aria-hidden />
            </button>
          ) : null}
          {step === "planner" ? (
            <>
              <button
                type="button"
                className="atro-btn"
                disabled={!hasBrief}
                onClick={goSocial}
              >
                Continue to social
                <ArrowRight className="size-4" aria-hidden />
              </button>
              <Link href={ogHref} className="atro-btn-ghost">
                Open full OG
              </Link>
            </>
          ) : null}
          {step === "social" ? (
            <>
              <Link href={ogHref} className="atro-btn">
                Open full OG
                <ArrowRight className="size-4" aria-hidden />
              </Link>
              <button type="button" className="atro-btn-ghost" onClick={copyInstall}>
                {copied ? "Copied" : "Copy install"}
              </button>
            </>
          ) : null}
        </div>
      </div>
    </div>
  )
}
