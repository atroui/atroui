import { ArrowRight, ArrowUpRight } from "lucide-react";
import Link from "next/link";

import { FadeIn } from "../motion/fade-in";
import { OgLivePreview } from "../og/og-live-preview";
import { TOOLS, type Tool } from "../../content/tools";
import { cn } from "../../lib/utils";

function statusLabel(status: Tool["status"]) {
  if (status === "live") return "Live";
  if (status === "beta") return "Beta";
  return "Soon";
}

/**
 * Free tools lab - bordered editorial frame matching hero / work.
 */
export function HomeLab() {
  const live = TOOLS.filter((t) => t.status === "live");
  const soon = TOOLS.filter((t) => t.status !== "live");
  const featured = live[0];

  return (
    <section className="@container border-t border-border-subtle">
      <div className="border-b border-border-subtle">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 border-x border-border-subtle ms-shell-pad py-12 @min-[40rem]:flex-row @min-[40rem]:items-end @min-[40rem]:justify-between @min-[40rem]:py-16">
          <FadeIn className="max-w-2xl">
            <p className="ms-stamp">Free tools</p>
            <h2 className="ds-display mt-4 text-3xl tracking-tight text-foreground @min-[40rem]:text-5xl">
              Proof between{" "}
              <span className="ds-display-italic text-brand">client sprints</span>
              .
            </h2>
            <p className="ds-lede mt-4 max-w-lg">
              No signup. No watermark. Feel the craft before you hire it.
            </p>
          </FadeIn>
          <FadeIn delay={0.06}>
            <Link href="/tools" className="ms-cta-ghost shrink-0">
              All tools
              <ArrowRight className="size-3.5" aria-hidden />
            </Link>
          </FadeIn>
        </div>
      </div>

      {/* Featured live tool + OG preview */}
      {featured ? (
        <div className="border-b border-border-subtle">
          <div className="mx-auto max-w-7xl border-x border-border-subtle">
            <FadeIn>
              <Link
                href={featured.href}
                className="group grid grid-cols-1 @min-[64rem]:grid-cols-12"
              >
                <div className="flex flex-col justify-between gap-8 border-b border-border-subtle p-6 @min-[40rem]:p-8 @min-[64rem]:col-span-5 @min-[64rem]:border-r @min-[64rem]:border-b-0">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="inline-flex items-center gap-1.5 text-sm font-medium text-brand">
                        <span className="size-1.5 animate-pulse rounded-full bg-brand motion-reduce:animate-none" />
                        {statusLabel(featured.status)}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        · {featured.category}
                      </span>
                    </div>
                    <h3 className="ds-headline mt-4 text-2xl text-foreground @min-[40rem]:text-3xl">
                      {featured.name}
                    </h3>
                    <p className="mt-3 max-w-sm text-[15px] leading-relaxed text-muted-foreground">
                      {featured.description}
                    </p>
                    <ul className="mt-5 flex flex-wrap gap-1.5">
                      {featured.highlights.map((h) => (
                        <li
                          key={h}
                          className="rounded-md border border-border-subtle bg-muted/40 px-2 py-1 text-[11px] text-muted-foreground"
                        >
                          {h}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <span className="inline-flex items-center gap-1.5 text-sm font-medium text-foreground transition-colors group-hover:text-brand">
                    Open tool
                    <ArrowUpRight className="size-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </span>
                </div>

                <div className="bg-muted p-4 @min-[40rem]:p-6 @min-[64rem]:col-span-7">
                  <div className="overflow-hidden rounded-xl ring-1 ring-border-subtle">
                    <div className="relative aspect-1200/630">
                      <OgLivePreview
                        title={"Your launch\nlands here."}
                        subtitle="Generate · download · ship"
                        styleKey="paperQuote"
                      />
                    </div>
                  </div>
                </div>
              </Link>
            </FadeIn>
          </div>
        </div>
      ) : null}

      {/* Other tools - index */}
      <div className="border-b border-border-subtle">
        <div className="mx-auto max-w-7xl border-x border-border-subtle">
          <ul className="divide-y divide-border-subtle">
            {[...live.slice(1), ...soon].map((tool, i) => (
              <li key={tool.id}>
                <FadeIn delay={0.04 * (i + 1)}>
                  <Link
                    href={tool.href}
                    className={cn(
                      "group grid grid-cols-1 items-center gap-2 px-6 py-5 transition-colors @min-[48rem]:grid-cols-12 @min-[48rem]:gap-4 @min-[48rem]:px-8 @min-[48rem]:py-6",
                      "hover:bg-muted/40 active:scale-[0.998]",
                      tool.status === "soon" && "opacity-80",
                    )}
                  >
                    <span className="font-mono text-[11px] tabular-nums text-muted-foreground @min-[48rem]:col-span-1">
                      {String(i + 2).padStart(2, "0")}
                    </span>
                    <div className="@min-[48rem]:col-span-4">
                      <p className="ds-headline text-base text-foreground @min-[40rem]:text-lg">
                        {tool.name}
                      </p>
                      <p className="mt-1 text-xs text-muted-foreground @min-[48rem]:hidden">
                        {tool.tagline}
                      </p>
                    </div>
                    <p className="hidden text-sm text-muted-foreground @min-[48rem]:col-span-4 @min-[48rem]:block">
                      {tool.tagline}
                    </p>
                    <div className="flex items-center justify-between gap-3 @min-[48rem]:col-span-3 @min-[48rem]:justify-end">
                      <span
                        className={cn(
                          "text-xs font-medium tracking-wide uppercase",
                          tool.status === "live"
                            ? "text-brand"
                            : "text-muted-foreground",
                        )}
                      >
                        {statusLabel(tool.status)}
                      </span>
                      <ArrowRight className="size-3.5 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-brand" />
                    </div>
                  </Link>
                </FadeIn>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
