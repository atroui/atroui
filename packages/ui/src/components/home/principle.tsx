import { FadeIn } from "../motion/fade-in";
import { cn } from "../../lib/utils";

const PRINCIPLES = [
  {
    title: "Fixed scope",
    status: "Locked",
    detail: "Agreed before day one — no creep theatre.",
    tone: "ok" as const,
  },
  {
    title: "Fixed price",
    status: "Guaranteed",
    detail: "$4,800 MVP · from $2,400 AI feature.",
    tone: "brand" as const,
  },
  {
    title: "No handoffs",
    status: "Direct",
    detail: "One senior engineer. Not your 14th channel.",
    tone: "warm" as const,
  },
];

const toneText = {
  ok: "text-emerald-700 dark:text-emerald-400",
  brand: "text-brand",
  warm: "text-amber-800 dark:text-amber-400",
} as const;

const toneDot = {
  ok: "bg-emerald-700 dark:bg-emerald-400",
  brand: "bg-brand",
  warm: "bg-amber-800 dark:bg-amber-400",
} as const;

/**
 * How we work — editorial process band matching hero / work frames.
 */
export function HomePrinciple() {
  return (
    <section className="border-t border-border-subtle">
      <div className="border-b border-border-subtle">
        <div className="mx-auto max-w-7xl border-x border-border-subtle ms-shell-pad py-12 sm:py-16">
          <FadeIn className="max-w-2xl">
            <p className="ms-stamp">How we work</p>
            <h2 className="ds-display mt-4 text-3xl tracking-tight text-foreground sm:text-5xl">
              You talk to the person who{" "}
              <span className="ds-display-italic text-brand">builds it</span>.
            </h2>
          </FadeIn>
        </div>
      </div>

      <div className="border-b border-border-subtle">
        <div className="mx-auto max-w-7xl border-x border-border-subtle">
          <ol className="grid grid-cols-1 divide-y divide-border-subtle md:grid-cols-3 md:divide-x md:divide-y-0">
            {PRINCIPLES.map((item, i) => (
              <li key={item.title} className="p-6 sm:p-8">
                <FadeIn delay={0.04 * i}>
                  <p className="font-mono text-[11px] tabular-nums text-muted-foreground">
                    {String(i + 1).padStart(2, "0")}
                  </p>
                  <h3 className="ds-headline mt-3 text-lg text-foreground">
                    {item.title}
                  </h3>
                  <p
                    className={cn(
                      "mt-2 flex items-center gap-1.5 text-sm font-medium",
                      toneText[item.tone],
                    )}
                  >
                    <span
                      className={cn(
                        "size-1.5 shrink-0 rounded-full",
                        toneDot[item.tone],
                      )}
                      aria-hidden
                    />
                    {item.status}
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {item.detail}
                  </p>
                </FadeIn>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
