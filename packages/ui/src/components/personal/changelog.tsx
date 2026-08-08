"use client";

import * as React from "react";

export type ChangelogEntry = {
  date: string;
  content: string;
  tags?: string[];
};

const ENTRIES: ChangelogEntry[] = [
  {
    date: "2026-08-01",
    content: "Shipped a narrow personal site kit for the registry.",
    tags: ["ship", "registry"],
  },
  {
    date: "2026-07-18",
    content: "Tightened token mapping for hairline lists and mono stamps.",
    tags: ["design"],
  },
  {
    date: "2026-07-04",
    content: "Added command menu and countdown building blocks.",
    tags: ["build"],
  },
  {
    date: "2026-06-20",
    content: "Documented Open-Meteo weather chip and local clock.",
    tags: ["docs"],
  },
];

function formatDate(iso: string) {
  const d = new Date(iso.length <= 10 ? `${iso}T00:00:00Z` : iso);
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "2-digit",
    timeZone: "UTC",
  }).format(d);
}

function monthKey(iso: string) {
  const d = new Date(iso.length <= 10 ? `${iso}T00:00:00Z` : iso);
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    timeZone: "UTC",
  }).format(d);
}

function defaultTags(entries: ChangelogEntry[]) {
  const set = new Set<string>();
  for (const e of entries) {
    for (const t of e.tags ?? []) set.add(t);
  }
  return Array.from(set).sort();
}

export type ChangelogProps = {
  entries?: ChangelogEntry[];
  tags?: string[];
  className?: string;
};

export function Changelog({
  entries = ENTRIES,
  tags,
  className,
}: ChangelogProps = {}) {
  const allTags = tags ?? defaultTags(entries);
  const [activeTag, setActiveTag] = React.useState("");

  const filtered = React.useMemo(() => {
    if (!activeTag) return entries;
    return entries.filter((e) => e.tags?.includes(activeTag));
  }, [entries, activeTag]);

  const grouped = React.useMemo(() => {
    const map = new Map<string, ChangelogEntry[]>();
    for (const e of filtered) {
      const k = monthKey(e.date);
      const arr = map.get(k) ?? [];
      arr.push(e);
      map.set(k, arr);
    }
    return Array.from(map.entries());
  }, [filtered]);

  const toggleTag = (tag: string) => {
    setActiveTag((prev) => (prev === tag ? "" : tag));
  };

  return (
    <div className={className ?? "mx-auto max-w-[640px]"}>
      {allTags.length > 0 ? (
        <div className="mb-10 flex flex-wrap items-center gap-1.5">
          <span className="mr-1.5 font-mono text-[10.5px] tracking-[0.12em] text-muted-foreground uppercase">
            Filter
          </span>
          <TagButton
            label="all"
            active={activeTag === ""}
            onClick={() => setActiveTag("")}
          />
          {allTags.map((t) => (
            <TagButton
              key={t}
              label={t}
              active={activeTag === t}
              onClick={() => toggleTag(t)}
            />
          ))}
        </div>
      ) : null}

      {grouped.length === 0 ? (
        <p className="text-[14px] text-muted-foreground">
          Nothing tagged{" "}
          <span className="font-mono">{activeTag}</span>. Try another filter.
        </p>
      ) : null}

      {grouped.map(([month, items]) => (
        <section key={month} className="mb-12">
          <h2 className="mb-3 font-mono text-[10.5px] tracking-[0.12em] text-muted-foreground uppercase">
            {month}
          </h2>
          <ul className="divide-y divide-border-subtle border-y border-border-subtle">
            {items.map((entry, i) => (
              <li
                key={`${entry.date}-${i}`}
                className="flex gap-4 py-[11px] sm:gap-5"
              >
                <time
                  dateTime={entry.date}
                  className="w-[56px] shrink-0 pt-[3px] font-mono text-[11px] text-muted-foreground"
                >
                  {formatDate(entry.date)}
                </time>
                <div className="min-w-0 flex-1">
                  <p className="text-[14.5px] leading-[1.6] text-foreground">
                    {entry.content}
                  </p>
                  {entry.tags && entry.tags.length > 0 ? (
                    <div className="mt-1.5 flex flex-wrap gap-1">
                      {entry.tags.map((tag) => (
                        <button
                          key={tag}
                          type="button"
                          onClick={() => toggleTag(tag)}
                          className={
                            "inline-flex items-center rounded-[3px] px-1.5 py-[1px] font-mono text-[10.5px] transition-colors " +
                            (activeTag === tag
                              ? "bg-[color-mix(in_oklab,var(--color-brand,#0b7bff)_16%,transparent)] text-[var(--color-brand,#0b7bff)]"
                              : "bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground")
                          }
                        >
                          {tag}
                        </button>
                      ))}
                    </div>
                  ) : null}
                </div>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}

function TagButton({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={
        "inline-flex items-center rounded-md px-2.5 py-1 font-mono text-[11px] transition-colors " +
        (active
          ? "bg-[color-mix(in_oklab,var(--color-brand,#0b7bff)_16%,transparent)] text-[var(--color-brand,#0b7bff)]"
          : "bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground")
      }
    >
      {label}
    </button>
  );
}
