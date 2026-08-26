import Link from "next/link"
import { catalogSectionCounts, FAMILY_PARAM } from "@/lib/catalog"

/**
 * Destination cards — the landing's job is to route you into a family, not to
 * be the family. Count is the proof of depth, the way ui-layouts stamps
 * "Hero Section · 7 Blocks" on each tile.
 */
export function Families() {
  return (
    <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
      {catalogSectionCounts.map(({ name, count }) => (
        <li key={name}>
          <Link
            href={`/docs/components?${FAMILY_PARAM}=${encodeURIComponent(name)}`}
            className="plate group flex h-full flex-col justify-between gap-6 p-4 transition-[border-color] hover:border-[var(--line-strong)]"
          >
            <span className="spec-num tabular-nums">{count}</span>
            <span className="spec-heading text-foreground">{name}</span>
          </Link>
        </li>
      ))}
    </ul>
  )
}
