/**
 * Sketch-style hero mark: AtroUI → { Own the UI. / Borrow the API. }
 * Stacked for clear hierarchy (brand, then couplet) — avoids crushed side-by-side.
 * Kept paint-ready (no client gates) so it can be the LCP element.
 */
export function HeroSketchMark({ className }: { className?: string }) {
  return (
    <h1
      className={["ds-sketch text-neutral-100", className]
        .filter(Boolean)
        .join(" ")}
    >
      <span className="flex flex-col items-start gap-4 sm:gap-5">
        <span className="landing-hero-brand-word rotate-[-1.5deg] text-[clamp(3.25rem,10vw,5.75rem)] font-medium leading-none tracking-tight">
          AtroUI
        </span>

        <span className="flex items-center gap-3 sm:gap-4">
          <span className="text-neutral-500" aria-hidden>
            <SketchArrow />
          </span>

          <span className="flex items-center gap-2 sm:gap-2.5">
            <SketchBrace
              side="left"
              className="h-11 w-5 shrink-0 text-sky-200/75 sm:h-14 sm:w-6 md:h-16 md:w-7"
            />
            <span className="flex rotate-[0.6deg] flex-col gap-0 text-[clamp(1.5rem,3.8vw,2.35rem)] font-medium leading-[1.12] tracking-tight">
              <span>
                Own the <span className="ds-sketch-accent">UI.</span>
              </span>
              <span>
                Borrow the <span className="text-neutral-300">API.</span>
              </span>
            </span>
            <SketchBrace
              side="right"
              className="h-11 w-5 shrink-0 text-sky-200/75 sm:h-14 sm:w-6 md:h-16 md:w-7"
            />
          </span>
        </span>
      </span>
    </h1>
  )
}

function SketchArrow() {
  return (
    <svg
      viewBox="0 0 88 24"
      className="h-5 w-14 sm:h-6 sm:w-18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path
        d="M2 12.2h9 M16 11.6h9 M30 12.5h9 M44 11.8h10"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
      />
      <path
        d="M58 5.5 L78 12 L58 18.8"
        stroke="currentColor"
        strokeWidth="2.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function SketchBrace({
  side,
  className,
}: {
  side: "left" | "right"
  className?: string
}) {
  const d =
    side === "left"
      ? "M28 4 C18 10, 14 22, 16 36 C12 48, 6 54, 4 58 C8 64, 14 70, 16 82 C14 96, 18 108, 28 116"
      : "M4 4 C14 10, 18 22, 16 36 C20 48, 26 54, 28 58 C24 64, 18 70, 16 82 C18 96, 14 108, 4 116"

  return (
    <svg
      viewBox="0 0 32 120"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path
        d={d}
        stroke="currentColor"
        strokeWidth="5.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
