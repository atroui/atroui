"use client";

import { CountUp } from "./count-up";

const TOTAL_SEGMENTS = 24;
const DAY_MS = 24 * 60 * 60 * 1000;

/** Edit dates and labels after install. */
const CONTENT = {
  title: "Deadline",
  targetDate: "2026-12-31",
  startDate: "2026-01-01",
  unitLabel: "days",
  progressLabel: "to deadline",
};

function parseIso(iso: string) {
  return new Date(iso.length <= 10 ? `${iso}T00:00:00Z` : iso);
}

function daysBetween(fromIso: string, toIso: string) {
  return Math.round(
    (parseIso(toIso).getTime() - parseIso(fromIso).getTime()) / DAY_MS,
  );
}

function daysFromNow(iso: string) {
  const now = new Date();
  const target = parseIso(iso);
  return Math.max(0, Math.ceil((target.getTime() - now.getTime()) / DAY_MS));
}

function formatFullDate(iso: string) {
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  }).format(parseIso(iso));
}

export type DeadlineCountdownProps = {
  title?: string;
  targetDate?: string;
  startDate?: string;
  unitLabel?: string;
  progressLabel?: string;
  className?: string;
};

export function DeadlineCountdown({
  title = CONTENT.title,
  targetDate = CONTENT.targetDate,
  startDate = CONTENT.startDate,
  unitLabel = CONTENT.unitLabel,
  progressLabel = CONTENT.progressLabel,
  className,
}: DeadlineCountdownProps = {}) {
  const daysRemaining = daysFromNow(targetDate);
  const totalDays = Math.max(1, daysBetween(startDate, targetDate));
  const elapsed = Math.max(0, totalDays - daysRemaining);
  const percent = Math.min(100, Math.round((elapsed / totalDays) * 100));
  const filledSegments = Math.min(
    TOTAL_SEGMENTS,
    Math.round((elapsed / totalDays) * TOTAL_SEGMENTS),
  );

  return (
    <section className={className ?? "mx-auto max-w-[640px]"}>
      <div className="relative overflow-hidden rounded-[10px] border border-border-subtle bg-muted/40 p-6 sm:p-8">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div className="flex items-baseline gap-3">
            <CountUp
              value={daysRemaining}
              className="text-5xl font-medium tracking-tight tabular-nums text-[var(--color-brand,#0b7bff)] sm:text-6xl"
            />
            <div className="pb-1 sm:pb-2">
              <div className="text-[13px] font-medium text-foreground">
                {unitLabel}
              </div>
              <div className="text-[12px] text-muted-foreground">remaining</div>
            </div>
          </div>

          <div className="sm:text-right">
            <div className="font-mono text-[10.5px] tracking-[0.12em] text-muted-foreground uppercase">
              {title}
            </div>
            <div className="mt-1.5 text-[15px] font-medium tabular-nums text-foreground">
              {formatFullDate(targetDate)}
            </div>
          </div>
        </div>

        <div className="mt-6">
          <div
            className="flex items-center gap-[3px]"
            role="progressbar"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={percent}
            aria-label={`${title} progress`}
          >
            {Array.from({ length: TOTAL_SEGMENTS }).map((_, i) => {
              const filled = i < filledSegments;
              return (
                <span
                  key={i}
                  className={
                    "h-[6px] flex-1 rounded-[1px] transition-colors duration-300 " +
                    (filled
                      ? "bg-[var(--color-brand,#0b7bff)]"
                      : "bg-border-subtle")
                  }
                />
              );
            })}
          </div>
          <div className="mt-2.5 flex items-center justify-between font-mono text-[11px] text-muted-foreground">
            <span>
              {elapsed} / {totalDays} days
            </span>
            <span>
              {percent}% {progressLabel}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
