"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Lock } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";

import { getBrand } from "../lib/brand";
import { TimelineAnimation } from "./ui/timeline-animation";
import { FounderAvatar } from "./ui/founder-avatar";
import { OgLivePreview } from "./og/og-live-preview";
import { STYLE_PRESETS, type StyleKey } from "../lib/og/presets";
import { cn } from "../lib/utils";

const SPRINT_DAYS = [
  { day: "01", label: "Scope + stack", done: true },
  { day: "02", label: "Auth + data", done: true },
  { day: "03", label: "Core flow", done: true },
  { day: "04", label: "AI feature", done: false, active: true },
  { day: "05", label: "Polish UI", done: false },
  { day: "06", label: "Deploy", done: false },
  { day: "07", label: "Handoff", done: false },
] as const;

function getHeroStyles(): {
  key: StyleKey;
  label: string;
  title: string;
  subtitle: string;
}[] {
  const studioLine = `${getBrand().name} - studio + free AI tools`;
  return [
    {
      key: "paperQuote",
      label: "Paper",
      title: "Ship in days,\nnot quarters.",
      subtitle: studioLine,
    },
    {
      key: "techMinimal",
      label: "Tech",
      title: "Ship in days,\nnot quarters.",
      subtitle: studioLine,
    },
    {
      key: "darkDev",
      label: "Dark",
      title: "v1.0 is live.",
      subtitle: "Changelog · shipped this week",
    },
    {
      key: "editorial",
      label: "Editorial",
      title: "Build what\nmatters.",
      subtitle: "Notes from a one-person studio",
    },
  ];
}

function HeroOgCanvas() {
  const [styleKey, setStyleKey] = useState<StyleKey>("paperQuote");
  const heroStyles = getHeroStyles();
  const active = heroStyles.find((s) => s.key === styleKey) ?? heroStyles[0]!;
  const preset = STYLE_PRESETS[styleKey];
  const isLight = styleKey === "paperQuote";

  return (
    <>
      <div className="border-b border-border-subtle p-3 sm:p-4">
        <Link
          href={`/og?style=${styleKey}`}
          className="group relative block overflow-hidden rounded-xl ring-1 ring-border-subtle"
          aria-label={`Open OG Image Generator - ${preset.label}`}
        >
          <div className="relative aspect-1200/630">
            <AnimatePresence mode="wait">
              <motion.div
                key={styleKey}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="absolute inset-0"
              >
                <OgLivePreview
                  title={active.title}
                  subtitle={active.subtitle}
                  styleKey={styleKey}
                />
              </motion.div>
            </AnimatePresence>
            <div
              className={cn(
                "pointer-events-none absolute inset-x-0 bottom-0 flex items-end justify-between p-3 sm:p-4",
                isLight
                  ? "bg-linear-to-t from-black/20 to-transparent"
                  : "bg-linear-to-t from-black/50 to-transparent",
              )}
            >
              <span
                className={cn(
                  "rounded px-2 py-0.5 font-mono text-[10px] tracking-wider uppercase backdrop-blur-sm",
                  isLight
                    ? "bg-foreground/80 text-background"
                    : "bg-black/55 text-white/90",
                )}
              >
                1200 × 630 · {preset.label}
              </span>
              <span
                className={cn(
                  "text-[11px] font-medium opacity-100 transition-opacity sm:opacity-0 sm:group-hover:opacity-100",
                  isLight ? "text-foreground/80" : "text-white/80",
                )}
              >
                Open in tool →
              </span>
            </div>
          </div>
        </Link>
      </div>

      <div className="flex flex-col gap-3 border-b border-border-subtle p-3 sm:flex-row sm:items-center sm:justify-between sm:p-4 lg:border-b-0">
        <div
          className="flex flex-wrap gap-1.5"
          role="tablist"
          aria-label="OG style presets"
        >
          {heroStyles.map((chip) => {
            const selected = chip.key === styleKey;
            return (
              <button
                key={chip.key}
                type="button"
                role="tab"
                aria-selected={selected}
                onClick={() => setStyleKey(chip.key)}
                className={cn(
                  "min-h-10 rounded-md px-3 py-2 text-[11px] font-medium transition-colors active:scale-[0.97]",
                  selected
                    ? "bg-foreground text-background"
                    : "border border-border-subtle text-muted-foreground hover:text-foreground",
                )}
              >
                {chip.label}
              </button>
            );
          })}
        </div>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <p className="hidden text-xs text-muted-foreground md:block">
            Live CSS preview of the OG tool
          </p>
          <Link
            href={`/og?style=${styleKey}`}
            className="ms-cta h-10 px-4 text-xs"
          >
            Generate
          </Link>
        </div>
      </div>
    </>
  );
}

/**
 * Landing hero - bordered editorial frame + live OG workspace mock.
 */
export function HeroAiValueProposition() {
  const timelineRef = useRef<HTMLDivElement>(null);

  return (
    <section
      ref={timelineRef}
      className="relative flex flex-col overflow-hidden bg-background text-foreground"
    >
      <div className="relative z-10">
        <article className="w-full border-y border-border-subtle">
          <div className="mx-auto flex max-w-7xl flex-col items-center space-y-5 border-x border-border-subtle ms-shell-pad py-10 text-center sm:py-14">
            <TimelineAnimation
              once
              as="p"
              animationNum={1}
              timelineRef={timelineRef}
              className="ms-stamp"
            >
              One-person studio · May sprints open
            </TimelineAnimation>

            <TimelineAnimation
              once
              as="h1"
              animationNum={2}
              timelineRef={timelineRef}
              className="ds-display max-w-4xl text-[2.125rem] leading-[1.05] tracking-tight text-foreground sm:text-6xl md:text-7xl"
            >
              Stop losing weeks to{" "}
              <span className="ds-display-italic text-brand">boilerplate</span>.
            </TimelineAnimation>

            <TimelineAnimation
              once
              as="p"
              animationNum={3}
              timelineRef={timelineRef}
              className="ds-lede max-w-2xl"
            >
              We ship the product you were going to build next month - this
              week. Fixed scope. Fixed price. No PMs. No handoffs.
            </TimelineAnimation>
          </div>
        </article>

        <div className="border-b border-border-subtle">
          <div className="mx-auto flex max-w-7xl flex-col items-center justify-center gap-5 border-x border-border-subtle ms-shell-pad py-8 sm:py-10">
            <TimelineAnimation
              once
              animationNum={4}
              timelineRef={timelineRef}
              className="flex w-full max-w-xl flex-col items-stretch gap-3 sm:max-w-none sm:flex-row sm:items-center sm:justify-center"
            >
              <Link href="/contact" className="ms-cta w-full justify-center sm:w-auto">
                Start a 7-day MVP sprint
                <ArrowRight className="size-4" aria-hidden />
              </Link>
              <Link href="/og" className="ms-cta-ghost w-full justify-center sm:w-auto">
                Try the free OG tool
                <ArrowRight className="size-3.5 opacity-60" aria-hidden />
              </Link>
            </TimelineAnimation>

            <TimelineAnimation
              once
              animationNum={5}
              timelineRef={timelineRef}
              className="flex w-full max-w-xl items-center justify-center gap-3 sm:max-w-none"
            >
              <FounderAvatar size="sm" />
              <div className="text-left text-sm leading-tight">
                <p className="font-medium text-foreground">Koustav</p>
                <p className="text-muted-foreground">
                  Founder · every line of code
                </p>
              </div>
            </TimelineAnimation>
          </div>
        </div>
      </div>

      <div className="relative z-10 w-full border-b border-border-subtle">
        <div className="mx-auto max-w-7xl border-x border-border-subtle ms-shell-pad py-8 sm:py-10">
          <TimelineAnimation
            once
            animationNum={6}
            timelineRef={timelineRef}
            className="overflow-hidden rounded-2xl border border-border-subtle bg-surface shadow-[0_32px_80px_-40px_rgba(0,0,0,0.45)]"
          >
            <div className="flex items-center gap-3 border-b border-border-subtle bg-muted/40 px-3 py-2.5 sm:px-4">
              <div className="flex gap-1.5" aria-hidden>
                <span className="size-2.5 rounded-full bg-foreground/15" />
                <span className="size-2.5 rounded-full bg-foreground/15" />
                <span className="size-2.5 rounded-full bg-foreground/15" />
              </div>
              <div className="flex min-w-0 flex-1 items-center justify-center">
                <div className="flex max-w-md items-center gap-2 truncate rounded-md border border-border-subtle bg-background px-3 py-1 text-[11px] text-muted-foreground sm:text-xs">
                  <Lock className="size-3 shrink-0 opacity-60" aria-hidden />
                  <span className="truncate">{`${getBrand().domain}/og`}</span>
                </div>
              </div>
              <Link
                href="/og"
                className="hidden items-center gap-1 text-[11px] font-medium text-brand sm:inline-flex"
              >
                Open live
                <ArrowUpRight className="size-3" aria-hidden />
              </Link>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-[1fr_240px]">
              <div className="min-w-0">
                <TimelineAnimation
                  once
                  animationNum={7}
                  timelineRef={timelineRef}
                >
                  <HeroOgCanvas />
                </TimelineAnimation>
              </div>

              <TimelineAnimation
                once
                animationNum={9}
                timelineRef={timelineRef}
                className="border-t border-border-subtle lg:border-t-0 lg:border-l"
              >
                <div className="flex items-center justify-between border-b border-border-subtle px-4 py-3">
                  <p className="ds-mono-label">7-day sprint</p>
                  <span className="text-[11px] tabular-nums text-brand">
                    Day 4 / 7
                  </span>
                </div>
                <ol className="divide-y divide-border-subtle">
                  {SPRINT_DAYS.map((row, idx) => (
                    <TimelineAnimation
                      key={row.day}
                      once
                      animationNum={10 + idx}
                      timelineRef={timelineRef}
                      as="li"
                      className={
                        "active" in row && row.active
                          ? "flex items-center gap-3 bg-brand/8 px-4 py-3"
                          : "flex items-center gap-3 px-4 py-3"
                      }
                    >
                      <span
                        className={
                          row.done
                            ? "font-mono text-[11px] tabular-nums text-brand"
                            : "active" in row && row.active
                              ? "font-mono text-[11px] tabular-nums text-foreground"
                              : "font-mono text-[11px] tabular-nums text-muted-foreground/50"
                        }
                      >
                        {row.day}
                      </span>
                      <span
                        className={
                          row.done || ("active" in row && row.active)
                            ? "text-sm text-foreground"
                            : "text-sm text-muted-foreground/60"
                        }
                      >
                        {row.label}
                      </span>
                      {row.done ? (
                        <span
                          className="ml-auto size-1.5 rounded-full bg-brand"
                          aria-hidden
                        />
                      ) : "active" in row && row.active ? (
                        <span
                          className="ml-auto size-1.5 animate-pulse rounded-full bg-brand"
                          aria-hidden
                        />
                      ) : null}
                    </TimelineAnimation>
                  ))}
                </ol>
                <div className="border-t border-border-subtle px-4 py-3">
                  <Link
                    href="/contact?service=mvp-sprint"
                    className="group flex items-center justify-between text-sm font-medium text-foreground"
                  >
                    Book this sprint
                    <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
                  </Link>
                </div>
              </TimelineAnimation>
            </div>
          </TimelineAnimation>
        </div>
      </div>
    </section>
  );
}
