import Link from "next/link"
import { ArrowRight } from "lucide-react"

export function LandingAnnouncement() {
  return (
    <div className="atro-announce">
      <div className="atro-shell">
        <p className="atro-announce-inner text-[13px]">
          <span className="text-muted-foreground">Introducing:</span>
          <Link href="/docs/registry" className="inline-flex items-center gap-1">
            shadcn directory entry
            <ArrowRight className="size-3.5" aria-hidden />
          </Link>
        </p>
      </div>
    </div>
  )
}
