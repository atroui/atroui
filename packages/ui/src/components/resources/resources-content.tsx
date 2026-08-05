"use client";

import { ArrowRight, Download, FileText, Search, Video } from "lucide-react";
import Link from "next/link";
import { useMemo, useState } from "react";

import { FadeIn } from "../motion/fade-in";
import {
  RESOURCES,
  RESOURCE_CATEGORIES,
  RESOURCE_TYPES,
  type ResourceType,
} from "../../content/resources";
import type { ResourceWithDownload } from "../../lib/resource-downloads";
import { cn } from "../../lib/utils";

const TYPE_ICONS: Record<ResourceType, React.ReactNode> = {
  guide: <FileText className="size-4" />,
  template: <Download className="size-4" />,
  checklist: <FileText className="size-4" />,
  video: <Video className="size-4" />,
};

const chipBase =
  "border px-3 py-1.5 text-xs font-medium transition-colors";
const chipActive = "border-brand bg-brand/10 text-brand";
const chipIdle =
  "border-border-subtle text-muted-foreground hover:border-border hover:text-foreground";

export function ResourcesContent({
  resources = RESOURCES.map((r) => ({ ...r, directDownloadUrl: null })),
}: {
  resources?: ResourceWithDownload[];
}) {
  const [typeFilter, setTypeFilter] = useState<ResourceType | "all">("all");
  const [categoryFilter, setCategoryFilter] = useState<string | "all">("all");
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    return resources.filter((r) => {
      if (typeFilter !== "all" && r.type !== typeFilter) return false;
      if (categoryFilter !== "all" && r.category !== categoryFilter)
        return false;
      if (query.trim()) {
        const q = query.toLowerCase();
        if (
          !r.title.toLowerCase().includes(q) &&
          !r.description.toLowerCase().includes(q)
        )
          return false;
      }
      return true;
    });
  }, [typeFilter, categoryFilter, query, resources]);

  return (
    <>
      <section className="border-b border-border-subtle">
        <div className="mx-auto max-w-7xl border-x border-border-subtle ms-shell-pad py-12 sm:py-16">
          <FadeIn className="max-w-3xl">
            <p className="ms-stamp">Resource library</p>
            <h1 className="ds-display mt-4 text-4xl tracking-tight text-foreground sm:text-6xl">
              Templates, guides &{" "}
              <span className="ds-display-italic text-brand">checklists</span>.
            </h1>
            <p className="ds-lede mt-5 max-w-xl">
              Practical resources from the studio - scoping templates, launch
              checklists, and playbooks you can use today.
            </p>
          </FadeIn>
        </div>
      </section>

      <section className="border-b border-border-subtle">
        <div className="mx-auto max-w-7xl border-x border-border-subtle">
          <div className="border-b border-border-subtle ms-shell-pad py-5">
            <div className="flex flex-col gap-4">
              <div className="relative max-w-md">
                <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="search"
                  placeholder="Search resources…"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="w-full border border-border-subtle bg-background py-2 pr-4 pl-9 text-sm focus:border-ring focus:outline-none focus:ring-2 focus:ring-ring/25"
                  aria-label="Search resources"
                />
              </div>
              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => setTypeFilter("all")}
                  aria-pressed={typeFilter === "all"}
                  className={cn(
                    chipBase,
                    typeFilter === "all" ? chipActive : chipIdle
                  )}
                >
                  All types
                </button>
                {RESOURCE_TYPES.map((t) => (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => setTypeFilter(t.id)}
                    aria-pressed={typeFilter === t.id}
                    className={cn(
                      chipBase,
                      typeFilter === t.id ? chipActive : chipIdle
                    )}
                  >
                    {t.label}
                  </button>
                ))}
              </div>
              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => setCategoryFilter("all")}
                  aria-pressed={categoryFilter === "all"}
                  className={cn(
                    chipBase,
                    categoryFilter === "all" ? chipActive : chipIdle
                  )}
                >
                  All categories
                </button>
                {RESOURCE_CATEGORIES.map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setCategoryFilter(cat)}
                    aria-pressed={categoryFilter === cat}
                    className={cn(
                      chipBase,
                      categoryFilter === cat ? chipActive : chipIdle
                    )}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="border-b border-border-subtle ms-shell-pad py-4">
            <p className="ds-mono-label">
              {filtered.length} resource{filtered.length === 1 ? "" : "s"}
            </p>
          </div>

          {filtered.length === 0 ? (
            <p className="ms-shell-pad py-12 text-sm text-muted-foreground">
              No resources match your filters.{" "}
              <Link href="/contact" className="bam-link">
                Request a resource
              </Link>
            </p>
          ) : (
            <ul className="divide-y divide-border-subtle">
              {filtered.map((r, i) => (
                <li key={r.id}>
                  <FadeIn delay={0.03 * i}>
                    <ResourceRow resource={r} index={i} />
                  </FadeIn>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>
    </>
  );
}

function ResourceRow({
  resource: r,
  index,
}: {
  resource: ResourceWithDownload;
  index: number;
}) {
  const directUrl = r.directDownloadUrl;
  const isDirectDownload = !!directUrl;

  const meta = (
    <>
      <span className="font-mono text-[11px] tabular-nums text-muted-foreground md:col-span-1">
        {String(index + 1).padStart(2, "0")}
      </span>
      <div className="flex items-start gap-3 md:col-span-6">
        <span className="mt-0.5 inline-flex size-8 shrink-0 items-center justify-center border border-border-subtle text-brand">
          {TYPE_ICONS[r.type]}
        </span>
        <div className="min-w-0">
          <p className="ds-headline text-base text-foreground sm:text-lg">
            {r.title}
            {r.premium ? (
              <span className="ml-2 border border-brand/40 px-1.5 py-0.5 text-[10px] font-medium text-brand uppercase">
                Email gate
              </span>
            ) : null}
          </p>
          <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
            {r.description}
          </p>
        </div>
      </div>
      <p className="hidden capitalize text-sm text-muted-foreground md:col-span-2 md:block">
        {r.type}
        {r.readTime ? ` · ${r.readTime}` : ""}
      </p>
    </>
  );

  const rowClass = cn(
    "group grid grid-cols-1 items-baseline gap-3 px-6 py-5 transition-colors md:grid-cols-12 md:gap-4 md:px-8 md:py-6",
    "hover:bg-muted/40 active:scale-[0.998]"
  );

  if (r.externalUrl) {
    return (
      <Link href={r.externalUrl} className={rowClass}>
        {meta}
        <div className="flex items-center justify-between gap-3 md:col-span-3 md:justify-end">
          <span className="text-xs text-muted-foreground md:hidden capitalize">
            {r.type}
            {r.readTime ? ` · ${r.readTime}` : ""}
          </span>
          <span className="inline-flex items-center gap-1.5 text-sm font-medium text-foreground group-hover:text-brand">
            Open
            <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
          </span>
        </div>
      </Link>
    );
  }

  if (isDirectDownload && directUrl) {
    return (
      <a href={directUrl} download className={rowClass}>
        {meta}
        <div className="flex items-center justify-between gap-3 md:col-span-3 md:justify-end">
          <span className="text-xs text-muted-foreground md:hidden capitalize">
            {r.type}
            {r.readTime ? ` · ${r.readTime}` : ""}
          </span>
          <span className="inline-flex items-center gap-1.5 text-sm font-medium text-brand">
            Download free
            <Download className="size-3.5" aria-hidden />
          </span>
        </div>
      </a>
    );
  }

  return (
    <Link href="/contact" className={rowClass}>
      {meta}
      <div className="flex items-center justify-between gap-3 md:col-span-3 md:justify-end">
        <span className="text-xs text-muted-foreground md:hidden capitalize">
          {r.type}
          {r.readTime ? ` · ${r.readTime}` : ""}
        </span>
        <span className="inline-flex items-center gap-1.5 text-sm font-medium text-brand">
          {r.premium ? "Request download" : "Get this resource"}
          <Download className="size-3.5" aria-hidden />
        </span>
      </div>
    </Link>
  );
}
