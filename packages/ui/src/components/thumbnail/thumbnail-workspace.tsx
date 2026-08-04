"use client";

import {
  AlertCircle,
  ArrowRight,
  CheckCircle2,
  Download,
  Loader2,
  Monitor,
  Sparkles,
  Tag,
} from "lucide-react";
import Link from "next/link";
import {
  useCallback,
  useMemo,
  useRef,
  useState,
} from "react";
import type { FormEvent } from "react";

import { FadeIn } from "../motion/fade-in";
import { ThumbnailLivePreview } from "./thumbnail-live-preview";
import {
  THUMBNAIL_INPUT_LIMITS,
  THUMBNAIL_STYLE_KEYS,
  THUMBNAIL_STYLE_PRESETS,
  type ThumbnailStyleKey,
} from "../../lib/thumbnail/presets";
import type { ThumbnailFormat, ThumbnailLayout } from "../../lib/thumbnail/compose";
import { cn } from "../../lib/utils";

// ─────────────────────────────────────────────────────────────────────────────
// Types & constants
// ─────────────────────────────────────────────────────────────────────────────

const FORMATS: {
  key: ThumbnailFormat;
  label: string;
  dims: string;
  aspect: string;
}[] = [
  {
    key: "youtube",
    label: "YouTube",
    dims: "1280 × 720",
    aspect: "aspect-video",
  },
  {
    key: "linkedin",
    label: "LinkedIn",
    dims: "1200 × 627",
    aspect: "aspect-[1200/627]",
  },
];

const LAYOUTS: {
  key: ThumbnailLayout;
  label: string;
  desc: string;
}[] = [
  {
    key: "bold-center",
    label: "Bold Center",
    desc: "Massive centered text with outline",
  },
  {
    key: "split",
    label: "Split",
    desc: "Text left, visual right",
  },
  {
    key: "lower-bar",
    label: "Lower Bar",
    desc: "News banner over full bleed",
  },
];

type Status =
  | { kind: "idle" }
  | { kind: "loading" }
  | { kind: "success"; imageUrl: string; filename: string; label: string }
  | { kind: "error"; message: string; isLimit?: boolean };

function downloadDataUrl(dataUrl: string, filename: string) {
  const a = document.createElement("a");
  a.href = dataUrl;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
}

function slugify(input: string, fallback = "thumb"): string {
  const slug = input
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .slice(0, 60);
  return slug || fallback;
}

// ─────────────────────────────────────────────────────────────────────────────
// Layout preview icons (mini SVG representations)
// ─────────────────────────────────────────────────────────────────────────────

function LayoutIcon({
  layout,
  active,
}: {
  layout: ThumbnailLayout;
  active: boolean;
}) {
  const fill = active ? "currentColor" : "currentColor";
  const opacity = active ? 0.9 : 0.4;

  if (layout === "bold-center") {
    return (
      <svg
        width="40"
        height="24"
        viewBox="0 0 40 24"
        fill="none"
        style={{ opacity }}
      >
        <rect
          x="0.5"
          y="0.5"
          width="39"
          height="23"
          rx="2"
          stroke={fill}
          strokeWidth="1"
        />
        <rect x="10" y="8" width="20" height="3" rx="1" fill={fill} />
        <rect x="14" y="13" width="12" height="2" rx="1" fill={fill} opacity={0.5} />
      </svg>
    );
  }
  if (layout === "split") {
    return (
      <svg
        width="40"
        height="24"
        viewBox="0 0 40 24"
        fill="none"
        style={{ opacity }}
      >
        <rect
          x="0.5"
          y="0.5"
          width="39"
          height="23"
          rx="2"
          stroke={fill}
          strokeWidth="1"
        />
        <rect x="4" y="7" width="16" height="3" rx="1" fill={fill} />
        <rect x="4" y="12" width="12" height="2" rx="1" fill={fill} opacity={0.5} />
        <line x1="22" y1="1" x2="22" y2="23" stroke={fill} strokeWidth="0.5" strokeDasharray="2 2" opacity={0.3} />
      </svg>
    );
  }
  // lower-bar
  return (
    <svg
      width="40"
      height="24"
      viewBox="0 0 40 24"
      fill="none"
      style={{ opacity }}
    >
      <rect
        x="0.5"
        y="0.5"
        width="39"
        height="23"
        rx="2"
        stroke={fill}
        strokeWidth="1"
      />
      <rect x="1" y="15" width="38" height="8" rx="1" fill={fill} opacity={0.2} />
      <rect x="4" y="17" width="18" height="2.5" rx="1" fill={fill} />
      <rect x="4" y="20.5" width="12" height="1.5" rx="0.75" fill={fill} opacity={0.5} />
    </svg>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Main workspace
// ─────────────────────────────────────────────────────────────────────────────

export function ThumbnailWorkspace() {
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [badge, setBadge] = useState("");
  const [style, setStyle] = useState<ThumbnailStyleKey>("creatorNight");
  const [format, setFormat] = useState<ThumbnailFormat>("youtube");
  const [layout, setLayout] = useState<ThumbnailLayout>("bold-center");
  const [usePro, setUsePro] = useState(false);
  const [status, setStatus] = useState<Status>({ kind: "idle" });
  const [downloadingPreview, setDownloadingPreview] = useState(false);
  const titleRef = useRef<HTMLInputElement>(null);

  const isLoading = status.kind === "loading";
  const activeFormat = FORMATS.find((f) => f.key === format)!;

  const generate = useCallback(async () => {
    setStatus({ kind: "loading" });
    try {
      const t = title.trim();
      if (!t) {
        setStatus({
          kind: "error",
          message: "Add a title — it's the hero of every thumbnail.",
        });
        return;
      }

      const payload = {
        mode: "quick",
        title: t,
        subtitle: subtitle.trim() || undefined,
        style,
        format,
        layout,
        badge: badge.trim() || undefined,
        usePro,
      };

      const filename = `atroui-${format}-${slugify(t)}.jpg`;

      const resp = await fetch("/api/thumbnail", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = (await resp.json().catch(() => ({}))) as {
        imageUrl?: string;
        error?: string;
        message?: string;
        isLimit?: boolean;
      };
      if (!resp.ok) {
        if (data.isLimit) {
          setStatus({
            kind: "error",
            message:
              data.message ||
              "AI limit reached. Try the 'Download Preview' button!",
            isLimit: true,
          });
          return;
        }
        throw new Error(data.error || `Request failed (${resp.status})`);
      }
      if (!data.imageUrl) throw new Error("No image returned");

      setStatus({
        kind: "success",
        imageUrl: data.imageUrl,
        filename,
        label: t,
      });
    } catch (e) {
      setStatus({
        kind: "error",
        message:
          e instanceof Error ? e.message : "Something went wrong. Try again.",
      });
    }
  }, [title, subtitle, style, format, layout, badge, usePro]);

  const onSubmit = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      void generate();
    },
    [generate],
  );

  const canGenerate = useMemo(() => {
    if (isLoading) return false;
    return title.trim().length > 0;
  }, [isLoading, title]);

  const canDownloadPreview = title.trim().length > 0;

  const downloadQuickPreview = useCallback(async () => {
    if (!canDownloadPreview || downloadingPreview) return;
    setDownloadingPreview(true);
    try {
      const resp = await fetch("/api/thumbnail", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          mode: "quick",
          title,
          subtitle,
          style,
          format,
          layout,
          badge: badge.trim() || undefined,
          previewOnly: true,
        }),
      });
      const data = (await resp.json().catch(() => ({}))) as {
        imageUrl?: string;
        error?: string;
      };
      if (!resp.ok || !data.imageUrl) {
        throw new Error(
          data.error || `Preview download failed (${resp.status})`,
        );
      }
      downloadDataUrl(
        data.imageUrl,
        `${slugify(title, "thumb")}-preview.jpg`,
      );
    } catch (e) {
      setStatus({
        kind: "error",
        message: e instanceof Error ? e.message : "Preview download failed",
      });
    } finally {
      setDownloadingPreview(false);
    }
  }, [canDownloadPreview, downloadingPreview, style, subtitle, title, format, layout, badge]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12">
      {/* Controls */}
      <div className="flex flex-col border-b border-border-subtle lg:col-span-5 lg:border-r lg:border-b-0">
        <div className="border-b border-border-subtle px-6 py-4 sm:px-8">
          <div className="flex items-center justify-between gap-3">
            <div className="min-w-0">
              <p className="text-sm font-medium text-foreground">
                Pro Mode · Imagen 3
              </p>
              <p className="mt-0.5 text-[11px] text-muted-foreground">
                Full-scene AI with cinematic people & props
              </p>
            </div>
            <button
              type="button"
              role="switch"
              aria-checked={usePro}
              onClick={() => setUsePro(!usePro)}
              className={cn(
                "relative h-6 w-11 shrink-0 border border-border-subtle transition-colors",
                usePro ? "bg-brand" : "bg-muted",
              )}
            >
              <span
                className={cn(
                  "pointer-events-none block size-5 bg-background shadow transition-transform",
                  usePro ? "translate-x-5" : "translate-x-0",
                )}
              />
            </button>
          </div>
        </div>

        <div className="flex flex-1 flex-col gap-5 p-6 sm:p-8">
        {/* Format selector */}
        <div>
          <p className="ds-mono-label">Format</p>
          <div className="mt-2 flex flex-wrap gap-2">
            {FORMATS.map((f) => (
              <button
                key={f.key}
                type="button"
                onClick={() => setFormat(f.key)}
                disabled={isLoading}
                className={cn(
                  "inline-flex min-h-10 items-center gap-2 border px-3.5 py-2 text-sm font-medium transition-colors disabled:opacity-50",
                  f.key === format
                    ? "border-foreground bg-foreground text-background"
                    : "border-border-subtle text-muted-foreground hover:text-foreground",
                )}
              >
                <Monitor className="size-4" />
                <span>{f.label}</span>
                <span
                  className={cn(
                    "text-[10px]",
                    f.key === format
                      ? "text-background/60"
                      : "text-muted-foreground",
                  )}
                >
                  {f.dims}
                </span>
              </button>
            ))}
          </div>
        </div>

        {!usePro && (
          <FadeIn>
            <div>
              <p className="ds-mono-label">Layout</p>
              <div className="mt-2 flex flex-wrap gap-2">
                {LAYOUTS.map((l) => (
                  <button
                    key={l.key}
                    type="button"
                    onClick={() => setLayout(l.key)}
                    disabled={isLoading}
                    className={cn(
                      "inline-flex min-h-10 items-center gap-2 border px-3 py-2 text-xs font-medium transition-colors disabled:opacity-50",
                      l.key === layout
                        ? "border-foreground bg-foreground text-background"
                        : "border-border-subtle text-muted-foreground hover:text-foreground",
                    )}
                  >
                    <LayoutIcon layout={l.key} active={l.key === layout} />
                    {l.label}
                  </button>
                ))}
              </div>
            </div>
          </FadeIn>
        )}

        <form onSubmit={onSubmit} className="flex flex-col gap-4">
          <div>
            <label htmlFor="thumb-title" className="ds-mono-label">
              Title
            </label>
            <input
              id="thumb-title"
              ref={titleRef}
              value={title}
              onChange={(e) =>
                setTitle(e.target.value.slice(0, THUMBNAIL_INPUT_LIMITS.titleMax))
              }
              placeholder="I BUILT THIS IN 7 DAYS"
              disabled={isLoading}
              className={cn(
                "mt-2 w-full border border-border-subtle bg-background px-3.5 py-2.5 text-base font-bold uppercase tracking-wide text-foreground sm:text-sm",
                "placeholder:text-muted-foreground/60 placeholder:normal-case placeholder:font-medium placeholder:tracking-normal",
                "focus:border-ring focus:outline-none focus:ring-2 focus:ring-ring/20",
                "disabled:opacity-60",
              )}
            />
          </div>

          <div>
            <label htmlFor="thumb-subtitle" className="ds-mono-label">
              Subtitle{" "}
              <span className="normal-case tracking-normal text-muted-foreground/70">
                (optional)
              </span>
            </label>
            <input
              id="thumb-subtitle"
              value={subtitle}
              onChange={(e) =>
                setSubtitle(
                  e.target.value.slice(0, THUMBNAIL_INPUT_LIMITS.subtitleMax),
                )
              }
              placeholder="The story behind the $4K launch weekend."
              disabled={isLoading}
              className={cn(
                "mt-2 w-full border border-border-subtle bg-background px-3.5 py-2.5 text-base text-foreground sm:text-sm",
                "placeholder:text-muted-foreground/60",
                "focus:border-ring focus:outline-none focus:ring-2 focus:ring-ring/20",
                "disabled:opacity-60",
              )}
            />
          </div>

          <div>
            <label htmlFor="thumb-badge" className="ds-mono-label">
              <span className="inline-flex items-center gap-1.5">
                <Tag className="size-3" />
                Badge
              </span>{" "}
              <span className="normal-case tracking-normal text-muted-foreground/70">
                (optional)
              </span>
            </label>
            <input
              id="thumb-badge"
              value={badge}
              onChange={(e) => setBadge(e.target.value.slice(0, 20))}
              placeholder="NEW"
              disabled={isLoading}
              className={cn(
                "mt-2 w-full border border-border-subtle bg-background px-3.5 py-2.5 text-sm font-bold text-foreground",
                "placeholder:text-muted-foreground/60 placeholder:font-medium",
                "focus:border-ring focus:outline-none focus:ring-2 focus:ring-ring/20",
                "disabled:opacity-60",
              )}
            />
          </div>

          <div>
            <p className="ds-mono-label">Style</p>
            <div className="mt-2 flex flex-wrap gap-2">
              {THUMBNAIL_STYLE_KEYS.map((key) => {
                const p = THUMBNAIL_STYLE_PRESETS[key];
                const active = key === style;
                return (
                  <button
                    key={key}
                    type="button"
                    onClick={() => setStyle(key)}
                    disabled={isLoading}
                    aria-pressed={active}
                    title={p.description}
                    className={cn(
                      "inline-flex min-h-10 items-center gap-2 border px-3 text-[12.5px] font-medium transition-colors disabled:opacity-50",
                      active
                        ? "border-foreground bg-foreground text-background"
                        : "border-border-subtle text-muted-foreground hover:text-foreground",
                    )}
                  >
                    <span
                      aria-hidden
                      className="size-2.5 rounded-full border border-black/10 dark:border-white/10"
                      style={{ background: p.previewGradient }}
                    />
                    {p.label}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="mt-auto space-y-4 border-t border-border-subtle pt-5">
            <p className="text-xs text-muted-foreground">
              {title.length}/{THUMBNAIL_INPUT_LIMITS.titleMax} ·{" "}
              {activeFormat.dims} · {usePro ? "Pro Mode" : layout}
            </p>
            <button
              type="submit"
              disabled={!canGenerate}
              className="ms-cta w-full justify-center disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isLoading ? (
                <Loader2 className="size-4 animate-spin" />
              ) : (
                <Sparkles className="size-4" />
              )}
              {isLoading ? "Compositing…" : "Generate"}
            </button>
          </div>
        </form>

        {status.kind === "error" ? (
          <div
            role="alert"
            className="flex flex-col gap-3 border border-destructive/25 bg-destructive/5 px-4 py-3 text-sm"
          >
            <div className="flex items-start gap-3 text-destructive">
              <AlertCircle className="mt-0.5 size-4 shrink-0" />
              <span>{status.message}</span>
            </div>
            {"isLimit" in status && status.isLimit ? (
              <Link
                href="/og#pricing"
                className="ml-7 self-start text-sm font-medium text-brand underline decoration-brand/30 underline-offset-4 hover:decoration-brand"
              >
                Join Pro waitlist →
              </Link>
            ) : null}
          </div>
        ) : null}

        {status.kind === "success" ? (
          <div className="flex items-start gap-3 border border-emerald-500/25 bg-emerald-500/5 px-4 py-3 text-sm text-emerald-700 dark:text-emerald-400">
            <CheckCircle2 className="mt-0.5 size-4 shrink-0" />
            <span>
              Thumbnail ready — download at {activeFormat.dims} from the
              preview.
            </span>
          </div>
        ) : null}
        </div>
      </div>

      {/* Preview */}
      <div className="flex flex-col bg-muted/20 lg:col-span-7">
        <div className="flex flex-col gap-3 border-b border-border-subtle px-6 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <p className="ds-mono-label">Preview · {activeFormat.dims}</p>
          {status.kind === "idle" || status.kind === "error" ? (
            <button
              type="button"
              onClick={downloadQuickPreview}
              disabled={!canDownloadPreview || downloadingPreview}
              className={cn(
                "inline-flex min-h-10 items-center justify-center gap-1.5 border px-3.5 text-xs font-medium transition-colors",
                status.kind === "error"
                  ? "border-brand/40 bg-brand/10 text-brand"
                  : "border-border-subtle bg-background text-foreground hover:bg-muted",
                "disabled:cursor-not-allowed disabled:opacity-50",
              )}
            >
              {downloadingPreview ? (
                <Loader2 className="size-3.5 animate-spin" />
              ) : (
                <Download className="size-3.5" />
              )}
              {downloadingPreview ? "Preparing…" : "Download text preview"}
            </button>
          ) : status.kind === "success" ? (
            <button
              type="button"
              onClick={() =>
                downloadDataUrl(status.imageUrl, status.filename)
              }
              className="inline-flex min-h-10 items-center justify-center gap-1.5 border border-border-subtle bg-background px-3.5 text-xs font-medium text-foreground hover:bg-muted"
            >
              <Download className="size-3.5" />
              Download JPG
            </button>
          ) : null}
        </div>

        <div className="flex flex-1 flex-col p-4 sm:p-6 lg:p-8">
          <div
            className={cn(
              "relative overflow-hidden ring-1 ring-border-subtle",
              activeFormat.aspect,
            )}
          >
            {status.kind === "loading" ? (
              <div className="og-preview-shimmer absolute inset-0" aria-hidden />
            ) : null}

            {status.kind === "success" ? (
              <img
                src={status.imageUrl}
                alt="Generated thumbnail preview"
                className="absolute inset-0 h-full w-full object-cover"
              />
            ) : null}

            {(status.kind === "idle" || status.kind === "error") && (
              <div className="relative h-full w-full">
                {usePro ? (
                  <div className="absolute inset-0 z-10 flex items-center justify-center bg-background/80 backdrop-blur-[2px]">
                    <div className="flex flex-col items-center gap-3 p-6 text-center">
                      <Sparkles className="size-7 text-brand" />
                      <div className="space-y-1">
                        <p className="text-sm font-medium text-foreground">
                          Pro Mode active
                        </p>
                        <p className="max-w-[28ch] text-[11px] text-muted-foreground">
                          Imagen 3 generates the whole scene. Layout previews
                          are disabled.
                        </p>
                      </div>
                    </div>
                  </div>
                ) : null}
                <ThumbnailLivePreview
                  title={title}
                  subtitle={subtitle}
                  styleKey={style}
                  format={format}
                  layout={layout}
                  badge={badge}
                />
              </div>
            )}
          </div>

          {status.kind === "idle" ? (
            <p className="mt-4 text-xs leading-relaxed text-muted-foreground">
              {usePro
                ? "Pro Mode uses Google Imagen 3 for a full cinematic scene (~5–10s)."
                : "Live layout above. Generate drops AI imagery behind your text (~3–6s)."}
            </p>
          ) : null}

          {status.kind === "success" ? (
            <div className="mt-4 space-y-4">
              <details className="border border-border-subtle bg-background px-4 py-3">
                <summary className="cursor-pointer text-xs font-medium text-muted-foreground">
                  Generated from title
                </summary>
                <p className="mt-2 text-[13px] leading-relaxed text-foreground/80">
                  {status.label}
                </p>
              </details>

              <FadeIn y={8} delay={0.15}>
                <div className="flex flex-col gap-4 border border-border-subtle bg-background p-4 sm:flex-row sm:items-center sm:justify-between sm:p-5">
                  <div>
                    <p className="text-sm font-medium text-foreground">
                      Need a custom AI tool or MVP?
                    </p>
                    <p className="mt-0.5 text-xs text-muted-foreground">
                      Same stack, 7-day client sprints.
                    </p>
                  </div>
                  <div className="flex flex-wrap items-center gap-4">
                    <Link href="/services" className="bam-link text-sm">
                      How we work
                    </Link>
                    <Link href="/contact" className="ms-cta h-9 px-3.5 text-sm">
                      Book a sprint
                      <ArrowRight className="size-3.5" aria-hidden />
                    </Link>
                  </div>
                </div>
              </FadeIn>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
