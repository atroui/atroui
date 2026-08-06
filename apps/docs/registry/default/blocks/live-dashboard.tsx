"use client"

import { Activity, Circle } from "lucide-react"
import { useEffect, useState } from "react"

import { FadeIn } from "@/components/ui/fade-in"
import { cn } from "@/lib/utils"

type Status = "active" | "shipping" | "paused"

/** Edit CONTENT.projects for your studio board. */
const CONTENT = {
  footerNote:
    "Anonymized snapshots shared with client permission. Slots: 2 of 3 filled.",
  projects: [
    {
      id: "p1",
      name: "Billing dashboard",
      client: "Acme",
      status: "active" as Status,
      milestone: "Checkout polish",
      progress: 72,
      lastUpdate: "Shipped invoice PDF export",
      service: "MVP sprint",
      public: true,
    },
    {
      id: "p2",
      name: "Ops AI inbox",
      client: "Northwind",
      status: "shipping" as Status,
      milestone: "Prompt evals",
      progress: 88,
      lastUpdate: "Cut false positives 30%",
      service: "AI feature",
      public: true,
    },
  ],
}

const STATUS_COLORS: Record<Status, string> = {
  active: "border-emerald-500/40 text-emerald-400",
  shipping: "border-sky-500/40 text-sky-400",
  paused: "border-amber-500/40 text-amber-400",
}

const STATUS_LABELS: Record<Status, string> = {
  active: "Active",
  shipping: "Shipping",
  paused: "Paused",
}

export function LiveDashboard() {
  const [now, setNow] = useState<Date | null>(null)

  useEffect(() => {
    setNow(new Date())
    const id = setInterval(() => setNow(new Date()), 60_000)
    return () => clearInterval(id)
  }, [])

  const publicProjects = CONTENT.projects.filter((p) => p.public)

  return (
    <div>
      <div className="ms-shell-pad flex items-center justify-between border-b border-border-subtle py-4">
        <div className="flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
          </span>
          <span className="text-xs font-medium text-muted-foreground">
            Studio live · {publicProjects.length} active project
            {publicProjects.length === 1 ? "" : "s"}
          </span>
        </div>
        {now ? (
          <span className="ds-mono-label flex items-center gap-1.5">
            <Activity className="size-3" />
            Updated{" "}
            {now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
          </span>
        ) : null}
      </div>

      <ul className="divide-y divide-border-subtle">
        {publicProjects.map((project, i) => (
          <li key={project.id}>
            <FadeIn delay={i * 0.05}>
              <article className="grid grid-cols-1 items-start gap-3 px-6 py-5 md:grid-cols-12 md:gap-4 md:px-8 md:py-6">
                <span className="font-mono text-[11px] tabular-nums text-muted-foreground md:col-span-1">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="md:col-span-4">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="text-sm font-medium text-foreground">
                      {project.name}
                    </h3>
                    <span
                      className={cn(
                        "shrink-0 border px-2 py-0.5 text-[10px] font-medium",
                        STATUS_COLORS[project.status]
                      )}
                    >
                      {STATUS_LABELS[project.status]}
                    </span>
                  </div>
                  <p className="mt-0.5 text-xs text-muted-foreground">
                    {project.client}
                  </p>
                </div>
                <div className="md:col-span-4">
                  <div className="flex items-center justify-between text-[10px] text-muted-foreground">
                    <span>{project.milestone}</span>
                    <span>{project.progress}%</span>
                  </div>
                  <div className="mt-1.5 h-1 overflow-hidden border border-border-subtle bg-muted">
                    <div
                      className="h-full bg-brand transition-all duration-700"
                      style={{ width: `${project.progress}%` }}
                    />
                  </div>
                  <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                    <Circle className="mr-1 inline size-2 fill-emerald-500 text-emerald-500" />
                    {project.lastUpdate}
                  </p>
                </div>
                <p className="text-[11px] text-muted-foreground md:col-span-3 md:text-right">
                  {project.service}
                </p>
              </article>
            </FadeIn>
          </li>
        ))}
      </ul>

      <p className="ms-shell-pad py-4 text-[11px] text-muted-foreground">
        {CONTENT.footerNote}
      </p>
    </div>
  )
}
