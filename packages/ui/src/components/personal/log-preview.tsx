import Link from "next/link";

/** Edit entries and labels after install. */
const CONTENT = {
  stamp: "Log",
  viewAllHref: "/log",
  viewAllLabel: "view all →",
};

const ENTRIES = [
  {
    date: "2026-08-01",
    content: "Shipped a narrow personal site kit for the registry.",
    tags: ["ship"],
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
];

function formatDate(iso: string) {
  const d = new Date(iso.length <= 10 ? `${iso}T00:00:00Z` : iso);
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "2-digit",
    timeZone: "UTC",
  }).format(d);
}

export type LogPreviewEntry = {
  date: string;
  content: string;
  tags?: string[];
};

export type LogPreviewProps = {
  stamp?: string;
  viewAllHref?: string;
  viewAllLabel?: string;
  entries?: LogPreviewEntry[];
  limit?: number;
  className?: string;
};

export function LogPreview({
  stamp = CONTENT.stamp,
  viewAllHref = CONTENT.viewAllHref,
  viewAllLabel = CONTENT.viewAllLabel,
  entries = ENTRIES,
  limit = 5,
  className,
}: LogPreviewProps = {}) {
  const shown = entries.slice(0, limit);
  if (shown.length === 0) return null;

  return (
    <section className={className ?? "mx-auto max-w-[640px]"}>
      <div className="mb-3 flex items-baseline justify-between">
        <h2 className="font-mono text-[10.5px] tracking-[0.12em] text-muted-foreground uppercase">
          {stamp}
        </h2>
        <Link
          href={viewAllHref}
          className="font-mono text-[11px] text-muted-foreground hover:text-foreground"
        >
          {viewAllLabel}
        </Link>
      </div>

      <ul className="divide-y divide-border-subtle">
        {shown.map((entry, i) => (
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
                  {entry.tags.map((t) => (
                    <span
                      key={t}
                      className="inline-flex items-center rounded-[3px] bg-muted px-1.5 py-[1px] font-mono text-[10.5px] text-muted-foreground"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              ) : null}
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
