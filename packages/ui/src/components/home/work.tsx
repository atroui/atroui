import { ArrowRight, ArrowUpRight } from "lucide-react";
import Link from "next/link";

import { FadeIn } from "../motion/fade-in";
import { CASE_STUDIES, getCaseStudyHref } from "../../content/case-studies";
import { cn } from "../../lib/utils";

/**
 * Selected work - editorial index matching the hero's bordered frame.
 */
export function HomeWork() {
  const studies = [
    ...CASE_STUDIES.filter((c) => c.featured),
    ...CASE_STUDIES.filter((c) => !c.featured),
  ].slice(0, 4);

  const [featured, ...rest] = studies;
  if (!featured) return null;

  const topResult = featured.results[0];

  return (
    <section className="border-t border-border-subtle">
      {/* Header band */}
      <div className="border-b border-border-subtle">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 border-x border-border-subtle ms-shell-pad py-12 sm:flex-row sm:items-end sm:justify-between sm:py-16">
          <FadeIn className="max-w-2xl">
            <p className="ms-stamp">Selected work</p>
            <h2 className="ds-display mt-4 text-3xl tracking-tight text-foreground sm:text-5xl">
              Projects that{" "}
              <span className="ds-display-italic text-brand">shipped</span>.
            </h2>
          </FadeIn>
          <FadeIn delay={0.06}>
            <Link href="/work" className="ms-cta-ghost shrink-0">
              All case studies
              <ArrowRight className="size-3.5" aria-hidden />
            </Link>
          </FadeIn>
        </div>
      </div>

      {/* Featured project */}
      <div className="border-b border-border-subtle">
        <div className="mx-auto max-w-7xl border-x border-border-subtle">
          <FadeIn>
            <Link
              href={getCaseStudyHref(featured)}
              className="group grid grid-cols-1 gap-0 lg:grid-cols-12"
            >
              <div className="flex flex-col justify-between gap-8 border-b border-border-subtle p-6 sm:p-8 lg:col-span-7 lg:border-r lg:border-b-0">
                <div>
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground">
                    <span className="font-medium tracking-wide text-foreground uppercase">
                      {featured.client.industry}
                    </span>
                    <span aria-hidden>·</span>
                    <span>{featured.projectType}</span>
                    <span aria-hidden>·</span>
                    <span>
                      {featured.timeline} · {featured.budget}
                    </span>
                  </div>
                  <h3 className="ds-headline mt-4 text-2xl leading-tight text-foreground sm:text-3xl">
                    {featured.title}
                  </h3>
                  <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-muted-foreground">
                    {featured.challenge}
                  </p>
                </div>
                  <span className="inline-flex items-center gap-1.5 text-sm font-medium text-foreground transition-colors group-hover:text-brand">
                    {featured.href ? "Open tool" : "Read case study"}
                    <ArrowUpRight className="size-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </span>
              </div>

              <div className="flex flex-col justify-between gap-8 bg-muted/30 p-6 sm:p-8 lg:col-span-5">
                {topResult ? (
                  <div>
                    <p className="ds-mono-label">Outcome</p>
                    <p className="ds-display mt-3 text-4xl tracking-tight text-foreground sm:text-5xl md:text-6xl">
                      {topResult.value}
                    </p>
                    <p className="mt-2 text-sm text-muted-foreground">
                      {topResult.metric}
                      {topResult.description ? ` - ${topResult.description}` : ""}
                    </p>
                  </div>
                ) : null}
                <ul className="flex flex-wrap gap-1.5">
                  {featured.technologies.slice(0, 5).map((tech) => (
                    <li
                      key={tech}
                      className="rounded-md border border-border-subtle bg-background px-2 py-1 text-[11px] text-muted-foreground"
                    >
                      {tech}
                    </li>
                  ))}
                </ul>
              </div>
            </Link>
          </FadeIn>
        </div>
      </div>

      {/* Remaining projects - index rows */}
      <div className="border-b border-border-subtle">
        <div className="mx-auto max-w-7xl border-x border-border-subtle">
          <ul className="divide-y divide-border-subtle">
            {rest.map((study, i) => {
              const result = study.results[0];
              return (
                <li key={study.id}>
                  <FadeIn delay={0.04 * (i + 1)}>
                    <Link
                      href={getCaseStudyHref(study)}
                      className={cn(
                        "group grid grid-cols-1 items-baseline gap-2 px-6 py-5 transition-colors md:grid-cols-12 md:gap-4 md:px-8 md:py-6",
                        "hover:bg-muted/40 active:scale-[0.998]",
                      )}
                    >
                      <span className="font-mono text-[11px] tabular-nums text-muted-foreground md:col-span-1">
                        {String(i + 2).padStart(2, "0")}
                      </span>
                      <div className="md:col-span-5">
                        <p className="ds-headline text-base text-foreground sm:text-lg">
                          {study.title}
                        </p>
                        <p className="mt-1 text-xs text-muted-foreground">
                          {study.client.industry} · {study.projectType}
                        </p>
                      </div>
                      <p className="hidden text-sm text-muted-foreground md:col-span-3 md:block">
                        {study.timeline} · {study.budget}
                      </p>
                      <div className="flex items-center justify-between gap-3 md:col-span-3 md:justify-end">
                        {result ? (
                          <span className="text-sm font-medium tabular-nums text-foreground">
                            {result.value}
                            <span className="ml-1.5 font-normal text-muted-foreground">
                              {result.metric}
                            </span>
                          </span>
                        ) : null}
                        <ArrowRight className="size-3.5 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-brand" />
                      </div>
                    </Link>
                  </FadeIn>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
