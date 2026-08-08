/**
 * Dark notebook scrap — tangible "own the UI" object for the landing hero.
 * Two altitudes: studio registry + indie kit. Server-rendered (not LCP).
 */
export function HeroNotebook({ className }: { className?: string }) {
  return (
    <aside
      className={[
        "landing-hero-notebook relative w-full max-w-md shrink-0",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      aria-label="Install examples"
    >
      {/* Imperfect chalk frame */}
      <svg
        className="landing-hero-notebook-frame pointer-events-none absolute inset-0 h-full w-full"
        viewBox="0 0 400 220"
        preserveAspectRatio="none"
        fill="none"
        aria-hidden
      >
        <path
          d="M14 18 C18 10, 380 8, 386 16 C394 28, 392 190, 384 202 C372 214, 22 216, 12 204 C4 190, 6 28, 14 18 Z"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          vectorEffect="non-scaling-stroke"
        />
        {/* Corner ticks */}
        <path d="M22 28h14 M22 28v12" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        <path d="M378 28h-14 M378 28v12" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        <path d="M22 194h14 M22 194v-12" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        <path d="M378 194h-14 M378 194v-12" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      </svg>

      <div className="relative px-5 py-5 sm:px-6 sm:py-6">
        <p className="ds-sketch mb-3 text-base text-sky-200/90 rotate-[-1deg]">
          install · two altitudes
        </p>

        <div className="space-y-3 font-mono text-[11.5px] leading-relaxed sm:text-[12.5px]">
          <div>
            <p className="mb-0.5 text-[10px] tracking-[0.12em] text-neutral-500 uppercase">
              Studio
            </p>
            <p className="break-all text-neutral-200">
              <span className="text-sky-300/90">$</span>{" "}
              npx shadcn@latest add @atroui/home-hero
            </p>
          </div>
          <div>
            <p className="mb-0.5 text-[10px] tracking-[0.12em] text-neutral-500 uppercase">
              Indie
            </p>
            <p className="break-all text-neutral-200">
              <span className="text-sky-300/90">$</span>{" "}
              npx shadcn@latest add @atroui/personal-hero
            </p>
          </div>
        </div>

        <p className="mt-4 font-mono text-[11px] text-neutral-500">
          <span className="text-neutral-400">#</span> edit{" "}
          <code className="rounded bg-white/10 px-1 py-0.5 text-neutral-200">
            CONTENT
          </code>{" "}
          · own the files
        </p>
      </div>

      {/* Tiny pencil tip pointing at the scrap */}
      <svg
        className="landing-hero-pencil pointer-events-none absolute -top-3 -right-2 h-10 w-10 text-neutral-300 sm:-top-4 sm:-right-3 sm:h-12 sm:w-12"
        viewBox="0 0 48 48"
        fill="none"
        aria-hidden
      >
        <path
          d="M8 40 L28 8 C30 5, 34 6, 35 9 L40 28"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M28 8 L34 11"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
        <path
          d="M8 40 L14 38 L12 34 Z"
          fill="currentColor"
          opacity="0.85"
        />
        <path
          d="M36 22 L42 36"
          stroke="#92dbe0"
          strokeWidth="1.6"
          strokeLinecap="round"
          opacity="0.7"
        />
      </svg>
    </aside>
  )
}

/** Dashed chalk path — stamp → couplet → notebook. Decorative only. */
export function HeroChalkConnector() {
  return (
    <svg
      className="landing-hero-connector pointer-events-none absolute inset-0 hidden h-full w-full lg:block"
      viewBox="0 0 1000 420"
      preserveAspectRatio="none"
      fill="none"
      aria-hidden
    >
      <path
        className="landing-hero-connector-path"
        pathLength={1}
        d="M120 48 C200 40, 280 90, 340 70 S480 30, 560 90 S720 200, 820 160 S900 140, 880 220"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle
        className="landing-hero-connector-end"
        cx="880"
        cy="220"
        r="5"
        stroke="currentColor"
        strokeWidth="1.5"
        fill="none"
      />
    </svg>
  )
}
