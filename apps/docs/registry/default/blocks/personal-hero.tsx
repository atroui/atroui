import type { ReactNode } from "react"

const CONTENT = {
  name: "Your Name",
  tagline: "Designer-engineer building calm software.",
  location: "Somewhere on Earth",
  status: "shipping" as StatusKind,
  ledeLinks: [
    { label: "studio", href: "https://example.com" },
    { label: "writing", href: "/writing" },
  ],
  ledeBefore: "Shipping at ",
  ledeBetween: ", writing at ",
  ledeAfter: ".",
}

type StatusKind = "shipping" | "working" | "dormant"

const statusCopy: Record<StatusKind, string> = {
  shipping: "shipping",
  working: "working",
  dormant: "dormant",
}

const statusDot: Record<StatusKind, string> = {
  shipping: "bg-emerald-500",
  working: "bg-muted-foreground",
  dormant: "bg-muted-foreground/50",
}

export function PersonalHero({
  name = CONTENT.name,
  tagline = CONTENT.tagline,
  location = CONTENT.location,
  status = CONTENT.status,
  lede,
  ledeLinks = CONTENT.ledeLinks,
  ledeBefore = CONTENT.ledeBefore,
  ledeBetween = CONTENT.ledeBetween,
  ledeAfter = CONTENT.ledeAfter,
  meta,
  className,
}: {
  name?: string
  tagline?: string
  location?: string
  status?: StatusKind | null
  lede?: ReactNode
  ledeLinks?: Array<{ label: string; href: string; external?: boolean }>
  ledeBefore?: string
  ledeBetween?: string
  ledeAfter?: string
  meta?: ReactNode
  className?: string
} = {}) {
  return (
    <section className={className ?? "mx-auto max-w-[640px] pt-14 sm:pt-20"}>
      <div className="flex items-start justify-between gap-4">
        <h1 className="min-w-0 pt-1 text-[2rem] font-medium tracking-tight text-foreground sm:text-[2.5rem]">
          {name}
        </h1>
        {status ? <StatusDot status={status} /> : null}
      </div>

      <p className="mt-5 max-w-[36ch] text-[15px] leading-[1.65] text-foreground">
        {tagline}
      </p>

      {lede ? (
        <div className="mt-1.5 max-w-[42ch] text-[14px] leading-[1.65] text-muted-foreground">
          {lede}
        </div>
      ) : ledeLinks.length > 0 ? (
        <p className="mt-1.5 max-w-[42ch] text-[14px] leading-[1.65] text-muted-foreground">
          {ledeBefore}
          {ledeLinks.map((link, i) => {
            const external = link.external ?? /^https?:\/\//.test(link.href)
            return (
              <span key={link.href}>
                {i > 0 ? ledeBetween : null}
                <a
                  href={link.href}
                  {...(external
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                  className="text-foreground underline decoration-border-subtle underline-offset-[3px] transition-colors hover:decoration-foreground"
                >
                  {link.label}
                </a>
              </span>
            )
          })}
          {ledeAfter}
        </p>
      ) : null}

      <div className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[11.5px] text-muted-foreground">
        <span>{location}</span>
        {meta ? (
          <>
            <span aria-hidden>·</span>
            {meta}
          </>
        ) : null}
      </div>
    </section>
  )
}

function StatusDot({ status }: { status: StatusKind }) {
  return (
    <span
      className="inline-flex items-center gap-1.5 pt-2 font-mono text-[11px] text-muted-foreground"
      aria-label={`Status: ${statusCopy[status]}`}
    >
      <span className="relative inline-flex h-[7px] w-[7px] shrink-0">
        <span
          className={`absolute inset-0 rounded-full ${statusDot[status]} ${
            status === "shipping" ? "animate-ping opacity-60" : "opacity-0"
          }`}
          aria-hidden
        />
        <span
          className={`relative h-[7px] w-[7px] rounded-full ${statusDot[status]}`}
          aria-hidden
        />
      </span>
      {statusCopy[status]}
    </span>
  )
}
