/**
 * Landing artifact pair (sketch concept):
 * 1) Install scrap — three install lines (Studio / Indie / Host APIs)
 * 2) Claim scrap — Host APIs + BYOK, hanging below on a chalk fork
 */

const altitudes = [
  {
    label: "Studio",
    pkgs: ["@atroui/home-hero"],
  },
  {
    label: "Indie",
    pkgs: ["@atroui/personal-hero"],
  },
  {
    label: "Host APIs",
    pkgs: ["@atroui/contact-form", "@atroui/api-contact"],
  },
] as const

export function HeroNotebook({ className }: { className?: string }) {
  return (
    <div
      className={[
        "landing-hero-artifact relative flex w-full max-w-md shrink-0 flex-col",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {/* ── 1. Install scrap ── */}
      <aside
        className="landing-hero-notebook relative w-full"
        aria-label="Install · three lines"
      >
        <div className="relative flex flex-col gap-3 px-4 py-4 sm:gap-3.5 sm:px-5 sm:py-5">
          <p className="ds-sketch rotate-[-1deg] text-base text-[color:var(--ds-cyan,#92dbe0)]">
            install · three lines
          </p>

          <div className="flex flex-col gap-2.5">
            {altitudes.map((item) => (
              <div key={item.label} className="landing-hero-altitude">
                <p className="font-mono text-[10px] tracking-[0.14em] text-sky-200/50 uppercase">
                  {item.label}
                </p>
                <p className="mt-1.5 break-all font-mono text-[11.5px] leading-relaxed text-neutral-100 sm:text-[12.5px]">
                  <span className="text-[color:var(--ds-cyan,#92dbe0)]">$</span>{" "}
                  npx shadcn@latest add{" "}
                  {item.pkgs.map((pkg, i) => (
                    <span key={pkg}>
                      {i > 0 ? " " : null}
                      <span className="text-sky-200">{pkg}</span>
                    </span>
                  ))}
                </p>
              </div>
            ))}
          </div>

          <p className="font-mono text-[11px] text-sky-100/45">
            <span className="text-sky-200/60">#</span> edit{" "}
            <code className="rounded-full border border-sky-300/25 bg-sky-500/15 px-1.5 py-0.5 text-sky-100">
              CONTENT
            </code>{" "}
            · own the files
          </p>
        </div>

        <PencilMark />
      </aside>

      {/* Chalk fork — install hangs down into the claim */}
      <svg
        className="landing-hero-fork mx-auto -my-0.5 h-12 w-20 shrink-0"
        viewBox="0 0 80 48"
        fill="none"
        aria-hidden
      >
        <path
          d="M40 2 V18"
          stroke="currentColor"
          strokeWidth="2.4"
          strokeLinecap="round"
          strokeDasharray="4 5"
        />
        <path
          d="M40 18 C30 28, 16 34, 10 46"
          stroke="currentColor"
          strokeWidth="2.4"
          strokeLinecap="round"
          strokeDasharray="4 5"
        />
        <path
          d="M40 18 C50 28, 64 34, 70 46"
          stroke="currentColor"
          strokeWidth="2.4"
          strokeLinecap="round"
          strokeDasharray="4 5"
        />
        <circle cx="40" cy="18" r="2.5" fill="currentColor" opacity="0.9" />
        <circle cx="10" cy="46" r="2.2" fill="currentColor" opacity="0.85" />
        <circle cx="70" cy="46" r="2.2" fill="currentColor" opacity="0.85" />
      </svg>

      {/* ── 2. Claim scrap — Host APIs + BYOK ── */}
      <aside
        className="landing-hero-claim relative w-full"
        aria-label="Host APIs and bring your own keys"
      >
        <div className="relative px-4 py-4 sm:px-5 sm:py-5">
          <p className="font-mono text-[10px] tracking-[0.14em] text-sky-200/55 uppercase">
            Host APIs · BYOK
          </p>
          <p className="ds-sketch mt-2 rotate-[0.5deg] text-[1.2rem] leading-[1.2] text-neutral-50 sm:text-[1.35rem]">
            Borrow the boring security.
            <br />
            <span className="ds-sketch-accent">Bring your own keys.</span>
          </p>
          <p className="mt-3 max-w-[34ch] font-mono text-[11px] leading-snug text-sky-100/50">
            Forms + AI on <span className="text-sky-100/85">your</span> Next.js
            host. AtroUI never holds Resend, SMTP, or model keys.
          </p>
        </div>
      </aside>
    </div>
  )
}

function PencilMark() {
  return (
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
      <path d="M8 40 L14 38 L12 34 Z" fill="currentColor" opacity="0.85" />
      <path
        d="M36 22 L42 36"
        stroke="#92dbe0"
        strokeWidth="1.6"
        strokeLinecap="round"
        opacity="0.7"
      />
    </svg>
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
