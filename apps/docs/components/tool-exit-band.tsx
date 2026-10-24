import Link from "next/link"
import { ArrowRight } from "lucide-react"

const DEFAULT_LINKS = [
  { href: "/docs/host-api", label: "Host APIs" },
  { href: "/docs/guides/launch-workflow", label: "Launch workflow" },
  { href: "/docs/components", label: "Browse components" },
] as const

/**
 * Quiet exit band for /og and /planner — one next step after the tool.
 */
export function ToolExitBand({
  primaryHref,
  primaryLabel,
  links = DEFAULT_LINKS,
}: {
  primaryHref: string
  primaryLabel: string
  links?: readonly { href: string; label: string }[]
}) {
  return (
    <aside className="mt-10 border-t border-border-subtle pt-8">
      <p className="ds-mono-label mb-3">Next</p>
      <Link
        href={primaryHref}
        className="group inline-flex items-center gap-2 text-[15px] font-medium tracking-[-0.01em] text-foreground"
      >
        {primaryLabel}
        <ArrowRight
          className="size-4 transition-transform group-hover:translate-x-0.5"
          aria-hidden
        />
      </Link>
      <p className="mt-4 flex flex-wrap gap-x-3 gap-y-1 text-[13px] text-muted-foreground">
        {links.map((link, i) => (
          <span key={link.href} className="inline-flex items-center gap-3">
            {i > 0 ? <span aria-hidden>·</span> : null}
            <Link href={link.href} className="bam-link">
              {link.label}
            </Link>
          </span>
        ))}
      </p>
    </aside>
  )
}
