import Link from "next/link"
import { Box, Code2, LayoutPanelLeft, Sparkles, Wrench } from "lucide-react"
import { catalogSectionCounts, FAMILY_PARAM } from "@/lib/catalog"

const FAMILY_META: Record<
  string,
  { copy: string; Icon: typeof Box; tone: string }
> = {
  Primitives: { copy: "Buttons, forms, motion", Icon: Box, tone: "cyan" },
  Blocks: { copy: "Heroes, pricing, page sections", Icon: LayoutPanelLeft, tone: "blue" },
  Indie: { copy: "Personal site kit", Icon: Sparkles, tone: "orange" },
  Tools: { copy: "OG, planner, dashboards", Icon: Wrench, tone: "pink" },
  Headless: { copy: "Analytics and schema", Icon: Code2, tone: "purple" },
}

function familyHref(name: string) {
  return `/library?${FAMILY_PARAM}=${encodeURIComponent(name)}`
}

/**
 * Career-row family list — mark, name + role, count.
 */
export function FamilyCards() {
  return (
    <div>
      {catalogSectionCounts.map(({ name, count }) => {
        const meta = FAMILY_META[name]
        const Icon = meta?.Icon ?? Box
        return (
          <Link key={name} href={familyHref(name)} className="wf-row">
            <span className="wf-row-mark" data-tone={meta?.tone ?? "cyan"} aria-hidden>
              <Icon className="size-3.5" strokeWidth={1.75} />
            </span>
            <span>
              <span className="wf-row-title">{name}</span>
              <span className="wf-row-sub">{meta?.copy ?? "On the registry"}</span>
            </span>
            <span className="wf-row-meta">{count}</span>
          </Link>
        )
      })}
    </div>
  )
}
