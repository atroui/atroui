"use client";

import { useRef } from "react";
import { ArrowRight, Check } from "lucide-react";
import Link from "next/link";

import { TimelineAnimation } from "./ui/timeline-animation";
import { SERVICES } from "../content/services";
import { cn } from "../lib/utils";

/**
 * Home pricing - editorial package index matching /services.
 */
export function PricingOverview() {
  const timelineRef = useRef<HTMLDivElement>(null);

  const featured =
    SERVICES.find((s) => s.highlight) ?? SERVICES[0]!;
  const rest = SERVICES.filter((s) => s.id !== featured.id);

  return (
    <section ref={timelineRef} className="border-t border-border-subtle">
      <div className="border-b border-border-subtle">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 border-x border-border-subtle ms-shell-pad py-12 sm:flex-row sm:items-end sm:justify-between sm:py-16">
          <div className="max-w-2xl">
            <TimelineAnimation
              once
              animationNum={1}
              timelineRef={timelineRef}
              as="p"
              className="ms-stamp"
            >
              Pricing
            </TimelineAnimation>
            <TimelineAnimation
              once
              animationNum={2}
              timelineRef={timelineRef}
              as="h2"
              className="ds-display mt-4 text-3xl tracking-tight text-foreground sm:text-5xl"
            >
              Fixed packages.{" "}
              <span className="ds-display-italic text-brand">
                No hourly theater.
              </span>
            </TimelineAnimation>
            <TimelineAnimation
              once
              animationNum={3}
              timelineRef={timelineRef}
              as="p"
              className="ds-lede mt-4 max-w-lg"
            >
              Scope once, price once, ship once. You know the number before we
              write a line of code.
            </TimelineAnimation>
          </div>
          <TimelineAnimation
            once
            animationNum={4}
            timelineRef={timelineRef}
          >
            <Link href="/services" className="ms-cta-ghost shrink-0">
              All packages
              <ArrowRight className="size-3.5" aria-hidden />
            </Link>
          </TimelineAnimation>
        </div>
      </div>

      {/* Featured */}
      <div className="border-b border-border-subtle">
        <div className="mx-auto max-w-7xl border-x border-border-subtle">
          <TimelineAnimation
            once
            animationNum={5}
            timelineRef={timelineRef}
            className="grid grid-cols-1 lg:grid-cols-12"
          >
            <div className="flex flex-col justify-between gap-8 border-b border-border-subtle p-6 sm:p-8 lg:col-span-7 lg:border-r lg:border-b-0 lg:p-10">
              <div>
                {featured.badge ? (
                  <span className="ms-stamp mb-3 inline-block">
                    {featured.badge}
                  </span>
                ) : null}
                <h3 className="ds-headline text-2xl text-foreground sm:text-3xl">
                  {featured.name}
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  {featured.tagline} · {featured.timeline}
                </p>
                <ul className="mt-6 space-y-2.5">
                  {featured.features.slice(0, 4).map((f) => (
                    <li
                      key={f}
                      className="flex items-start gap-2 text-sm text-foreground/90"
                    >
                      <Check
                        className="mt-0.5 size-3.5 shrink-0 text-brand"
                        strokeWidth={2.5}
                        aria-hidden
                      />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <Link
                href={featured.ctaHref}
                className="ms-cta w-full justify-center sm:w-auto"
              >
                {featured.ctaLabel}
                <ArrowRight className="size-4" aria-hidden />
              </Link>
            </div>

            <div className="flex flex-col justify-between gap-8 bg-muted/30 p-6 sm:p-8 lg:col-span-5 lg:p-10">
              <div>
                <p className="ds-mono-label">Investment</p>
                <p className="ds-display mt-3 text-4xl tracking-tight text-foreground sm:text-5xl md:text-6xl">
                  {featured.price}
                </p>
                {featured.priceSuffix ? (
                  <p className="mt-2 text-sm text-muted-foreground">
                    {featured.priceSuffix} · {featured.timeline}
                  </p>
                ) : null}
              </div>
              <p className="text-sm leading-relaxed text-muted-foreground">
                Scope once. Price once. Ship once. If we go over, that&rsquo;s
                our problem - not yours.
              </p>
            </div>
          </TimelineAnimation>
        </div>
      </div>

      {/* Rest */}
      <div className="border-b border-border-subtle">
        <div className="mx-auto max-w-7xl border-x border-border-subtle">
          <ul className="divide-y divide-border-subtle">
            {rest.map((s, i) => (
              <li key={s.id}>
                <TimelineAnimation
                  once
                  animationNum={8 + i}
                  timelineRef={timelineRef}
                >
                  <div
                    className={cn(
                      "grid grid-cols-1 gap-3 px-6 py-5 md:grid-cols-12 md:items-center md:gap-4 md:px-8 md:py-6",
                    )}
                  >
                    <span className="font-mono text-[11px] tabular-nums text-muted-foreground md:col-span-1">
                      {String(i + 2).padStart(2, "0")}
                    </span>
                    <div className="md:col-span-4">
                      <p className="ds-headline text-base text-foreground sm:text-lg">
                        {s.name}
                      </p>
                      <p className="mt-1 text-xs text-muted-foreground">
                        {s.tagline} · {s.timeline}
                      </p>
                    </div>
                    <p className="hidden text-sm text-muted-foreground md:col-span-3 md:block md:line-clamp-2">
                      {s.description}
                    </p>
                    <div className="flex flex-wrap items-center gap-4 md:col-span-4 md:justify-end">
                      <span className="text-lg font-semibold tabular-nums text-foreground">
                        {s.price}
                        {s.priceSuffix ? (
                          <span className="ml-1.5 text-sm font-normal text-muted-foreground">
                            {s.priceSuffix}
                          </span>
                        ) : null}
                      </span>
                      <Link
                        href={`/services/${s.id}`}
                        className="inline-flex min-h-10 items-center text-sm font-medium text-muted-foreground hover:text-foreground"
                      >
                        Details
                      </Link>
                    </div>
                  </div>
                </TimelineAnimation>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
