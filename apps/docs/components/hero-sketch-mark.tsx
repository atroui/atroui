/**
 * Sketch-style hero mark: AtroUI ----> { Own the UI. / Borrow the API. }
 * Canonical AtroUI brand voice — Caveat + imperfect braces.
 */
export function HeroSketchMark({ className }: { className?: string }) {
  return (
    <h1
      className={["ds-sketch text-neutral-100", className]
        .filter(Boolean)
        .join(" ")}
    >
      <span className="flex flex-col items-start gap-6 sm:gap-8 lg:flex-row lg:items-center lg:gap-5 xl:gap-7">
        <span className="rotate-[-1.5deg] text-[clamp(3.25rem,11vw,6.5rem)] font-medium leading-none tracking-tight">
          AtroUI
        </span>

        <span
          className="hidden text-neutral-400 lg:inline-flex"
          aria-hidden
        >
          <SketchArrow />
        </span>
        <span
          className="inline-flex rotate-90 text-neutral-400 lg:hidden"
          aria-hidden
        >
          <SketchArrow />
        </span>

        <span className="flex items-center gap-2 sm:gap-3">
          <SketchBrace side="left" className="h-[4.5rem] w-7 shrink-0 text-neutral-200 sm:h-[5.5rem] sm:w-9 md:h-[6.5rem] md:w-10" />
          <span className="flex rotate-[0.8deg] flex-col gap-0.5 text-[clamp(1.75rem,4.5vw,3rem)] font-medium leading-[1.05] tracking-tight">
            <span>Own the UI.</span>
            <span>Borrow the API.</span>
          </span>
          <SketchBrace side="right" className="h-[4.5rem] w-7 shrink-0 text-neutral-200 sm:h-[5.5rem] sm:w-9 md:h-[6.5rem] md:w-10" />
        </span>
      </span>
    </h1>
  )
}

function SketchArrow() {
  return (
    <svg
      viewBox="0 0 88 24"
      className="h-6 w-[4.5rem] sm:h-7 sm:w-24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      {/* Dashed shaft — slightly uneven gaps */}
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
  // Intentionally imperfect paths — marker / chalkboard feel
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
