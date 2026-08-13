"use client"

/**
 * Interactive brief → OG prefill for the launch-workflow guide.
 * Family Values: one primary action (Open OG) after a short form.
 */

import * as React from "react"
import Link from "next/link"
import {
  EMPTY_PROJECT_BRIEF,
  buildOgHref,
  type ProjectBrief,
} from "atroui"
import { cn } from "@/lib/utils"

const field =
  "w-full rounded-lg border border-border-subtle bg-background px-3.5 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/60 focus:border-ring focus:outline-none focus:ring-2 focus:ring-ring/20"

export function LaunchBriefDemo() {
  const [brief, setBrief] = React.useState<ProjectBrief>({
    ...EMPTY_PROJECT_BRIEF,
    name: "LaunchKit",
    oneLiner: "Scope to social card without leaving your repo",
    audience: "indie founders",
    pages: ["home", "pricing"],
    tone: "direct",
    ogTitle: "Ship the social card",
    ogSubtitle: "Scope → planner → OG",
  })

  const href = buildOgHref(brief)

  return (
    <div className="overflow-hidden rounded-xl border border-border-subtle bg-card">
      <div className="border-b border-border-subtle px-4 py-3">
        <p className="font-mono text-[11px] tracking-[0.12em] text-brand/80 uppercase">
          Live brief
        </p>
        <p className="mt-1 text-[13px] text-muted-foreground">
          Edit fields, then open the OG workspace with Quick-mode prefills. No
          keys required for preview.
        </p>
      </div>
      <div className="grid gap-4 p-4 sm:grid-cols-2 sm:p-5">
        <label className="flex flex-col gap-1.5 text-[12px] font-medium text-foreground">
          Name
          <input
            className={field}
            value={brief.name}
            onChange={(e) =>
              setBrief((b) => ({ ...b, name: e.target.value }))
            }
          />
        </label>
        <label className="flex flex-col gap-1.5 text-[12px] font-medium text-foreground">
          One-liner
          <input
            className={field}
            value={brief.oneLiner}
            onChange={(e) =>
              setBrief((b) => ({ ...b, oneLiner: e.target.value }))
            }
          />
        </label>
        <label className="flex flex-col gap-1.5 text-[12px] font-medium text-foreground">
          OG title
          <input
            className={field}
            value={brief.ogTitle ?? ""}
            onChange={(e) =>
              setBrief((b) => ({ ...b, ogTitle: e.target.value }))
            }
          />
        </label>
        <label className="flex flex-col gap-1.5 text-[12px] font-medium text-foreground">
          OG subtitle
          <input
            className={field}
            value={brief.ogSubtitle ?? ""}
            onChange={(e) =>
              setBrief((b) => ({ ...b, ogSubtitle: e.target.value }))
            }
          />
        </label>
      </div>
      <div className="flex flex-col gap-3 border-t border-border-subtle bg-muted/30 px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:px-5">
        <code className="min-w-0 truncate font-mono text-[11px] text-muted-foreground">
          {href}
        </code>
        <Link
          href={href}
          className={cn("ms-cta shrink-0 justify-center text-sm")}
        >
          Open OG workspace
        </Link>
      </div>
    </div>
  )
}
