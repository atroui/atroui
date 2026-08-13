"use client";

import {
  AlertCircle,
  ArrowRight,
  CheckCircle2,
  Download,
  Image as ImageIcon,
  Loader2,
  Shuffle,
  Sparkles,
  Type,
  Wand2,
} from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  Suspense,
} from "react";
import type { FormEvent } from "react";

import { FadeIn } from "../motion/fade-in";
import { OgLivePreview } from "./og-live-preview";
import {
  isStyleKey,
  QUICK_INPUT_LIMITS,
  STYLE_KEYS,
  STYLE_PRESETS,
  type StyleKey,
} from "../../lib/og/presets";
import { cn } from "../../lib/utils";

/**
 * OG generator workspace - two modes:
 *
 *   Quick mode (default): title + subtitle + style → AI background with
 *   a crisp Satori-rendered text overlay.
 *
 *   Prompt mode: raw prompt → image. Legacy power-user flow.
 */

const QUICK_PROMPT_STARTERS: { label: string; prompt: string }[] = [
  {
    label: "Blog cover",
    prompt:
      "Editorial tech blog cover background, soft gradient from ink-blue to violet, abstract geometric shapes, subtle dotted grid, premium muted palette, left-safe zone for headline overlay, no text, no letters, no typography, no logos, 1200x630",
  },
  {
    label: "Product launch",
    prompt:
      "Product launch announcement background, warm coral-to-pink sunset gradient, floating 3D abstract shapes with soft bloom, energetic premium feel, center-safe zone for product name, no text, no letters, no typography, no logos, 1200x630",
  },
  {
    label: "Newsletter issue",
    prompt:
      "Weekly newsletter cover background, classic editorial style, deep navy and cream palette, paper grain texture, minimal envelope motif upper right, left-safe zone for issue title, no text, no letters, no typography, no logos, 1200x630",
  },
  {
    label: "Revenue update",
    prompt:
      "Build-in-public revenue update background, confident dark mode, deep navy with bold cyan gradient sweep, abstract upward trend line, indie-hacker energy, center-safe zone for revenue number, no text, no letters, no typography, no logos, 1200x630",
  },
];

type Mode = "quick" | "prompt";

type Status =
  | { kind: "idle" }
  | { kind: "loading" }
  | {
      kind: "success";
      imageUrl: string;
      filename: string;
      mode: Mode;
      label: string;
    }
  | { kind: "error"; message: string; isLimit?: boolean };

const fieldInput = cn(
  "w-full border border-border-subtle bg-background px-3.5 py-2.5 text-base text-foreground sm:text-sm",
  "placeholder:text-muted-foreground/60",
  "transition-[border-color,box-shadow] duration-200",
  "focus:border-ring focus:outline-none focus:ring-2 focus:ring-ring/20",
  "disabled:cursor-not-allowed disabled:opacity-60",
);

function downloadDataUrl(dataUrl: string, filename: string) {
  const a = document.createElement("a");
  a.href = dataUrl;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
}

function slugify(input: string, fallback = "card"): string {
  const slug = input
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .slice(0, 60);
  return slug || fallback;
}

function OgWorkspaceInner() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [mode, setMode] = useState<Mode>("quick");
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [style, setStyle] = useState<StyleKey>("techMinimal");
  const [prompt, setPrompt] = useState("");

  const [status, setStatus] = useState<Status>({ kind: "idle" });
  const [downloadingPreview, setDownloadingPreview] = useState(false);
  const promptRef = useRef<HTMLTextAreaElement>(null);
  const titleRef = useRef<HTMLInputElement>(null);

  const urlMode = searchParams.get("mode");
  const urlPrompt = searchParams.get("prompt");
  const urlTitle = searchParams.get("title");
  const urlSubtitle = searchParams.get("subtitle");
  const urlStyle = searchParams.get("style");

  useEffect(() => {
    let hydrated = false;

    if (urlMode === "quick" || urlTitle || (urlStyle && isStyleKey(urlStyle))) {
      setMode("quick");
      if (urlTitle) setTitle(urlTitle);
      if (urlSubtitle) setSubtitle(urlSubtitle);
      if (urlStyle && isStyleKey(urlStyle)) setStyle(urlStyle);
      requestAnimationFrame(() => titleRef.current?.focus());
      hydrated = true;
    } else if (urlPrompt) {
      setMode("prompt");
      setPrompt(urlPrompt);
      requestAnimationFrame(() => {
        promptRef.current?.focus();
        promptRef.current?.setSelectionRange(
          urlPrompt.length,
          urlPrompt.length,
        );
      });
      hydrated = true;
    }

    if (hydrated) {
      router.replace("/og#og-workspace", { scroll: false });
    }
  }, [urlMode, urlPrompt, urlTitle, urlSubtitle, urlStyle, router]);

  const isLoading = status.kind === "loading";

  const generate = useCallback(async () => {
    setStatus({ kind: "loading" });
    try {
      let payload: Record<string, unknown>;
      let label: string;
      let filename: string;
      if (mode === "quick") {
        const t = title.trim();
        if (!t) {
          setStatus({
            kind: "error",
            message: "Add a title - it's what lands on your social card.",
          });
          return;
        }
        payload = {
          mode: "quick",
          title: t,
          subtitle: subtitle.trim() || undefined,
          style,
        };
        label = t;
        filename = `atroui-og-${slugify(t)}.jpg`;
      } else {
        const p = prompt.trim();
        if (!p) {
          setStatus({
            kind: "error",
            message: "Add a prompt to get started.",
          });
          return;
        }
        payload = { prompt: p };
        label = p;
        filename = `atroui-og-${slugify(p, "prompt")}.jpg`;
      }

      const resp = await fetch("/api/generate", {
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
              "AI limit reached. Try Download text preview for a crisp text-only card.",
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
        mode,
        label,
      });
    } catch (e) {
      setStatus({
        kind: "error",
        message:
          e instanceof Error ? e.message : "Something went wrong. Try again.",
      });
    }
  }, [mode, title, subtitle, style, prompt]);

  const onSubmit = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      void generate();
    },
    [generate],
  );

  const tryQuickPrompt = useCallback((q: string) => {
    setPrompt(q);
    requestAnimationFrame(() => promptRef.current?.focus());
  }, []);

  const canGenerate = useMemo(() => {
    if (isLoading) return false;
    return mode === "quick"
      ? title.trim().length > 0
      : prompt.trim().length > 0;
  }, [isLoading, mode, title, prompt]);

  const canDownloadPreview = mode === "quick" && title.trim().length > 0;

  const downloadQuickPreview = useCallback(async () => {
    if (!canDownloadPreview || downloadingPreview) return;
    setDownloadingPreview(true);
    try {
      const resp = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          mode: "quick",
          title,
          subtitle,
          style,
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
      downloadDataUrl(data.imageUrl, `${slugify(title, "og")}-preview.jpg`);
    } catch (e) {
      setStatus({
        kind: "error",
        message: e instanceof Error ? e.message : "Preview download failed",
      });
    } finally {
      setDownloadingPreview(false);
    }
  }, [canDownloadPreview, downloadingPreview, style, subtitle, title]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12">
      {/* Controls */}
      <div className="flex flex-col border-b border-border-subtle lg:col-span-5 lg:border-r lg:border-b-0">
        <div className="border-b border-border-subtle px-6 py-4 sm:px-8">
          <div
            role="tablist"
            aria-label="Generation mode"
            className="flex gap-1"
          >
            <ModeTab
              active={mode === "quick"}
              onClick={() => setMode("quick")}
              icon={<Type className="size-3.5" />}
              label="Quick"
              hint="Title + style"
            />
            <ModeTab
              active={mode === "prompt"}
              onClick={() => setMode("prompt")}
              icon={<Wand2 className="size-3.5" />}
              label="Prompt"
              hint="Free-form"
            />
          </div>
        </div>

        <form
          onSubmit={onSubmit}
          className="flex flex-1 flex-col gap-5 p-6 sm:p-8"
        >
          {mode === "quick" ? (
            <QuickModeFields
              title={title}
              setTitle={setTitle}
              subtitle={subtitle}
              setSubtitle={setSubtitle}
              style={style}
              setStyle={setStyle}
              isLoading={isLoading}
              titleRef={titleRef}
            />
          ) : (
            <PromptModeFields
              prompt={prompt}
              setPrompt={setPrompt}
              isLoading={isLoading}
              promptRef={promptRef}
              onQuickPick={tryQuickPrompt}
              starters={QUICK_PROMPT_STARTERS}
            />
          )}

          <div className="mt-auto space-y-4 border-t border-border-subtle pt-5">
            <p className="text-xs text-muted-foreground">
              {mode === "quick"
                ? `${title.length}/${QUICK_INPUT_LIMITS.titleMax} · 1200×630 · crisp text server-side`
                : `${prompt.length} characters · 1200×630 · free-form`}
            </p>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              {mode === "prompt" ? (
                <button
                  type="button"
                  onClick={() => {
                    const pick =
                      QUICK_PROMPT_STARTERS[
                        Math.floor(
                          Math.random() * QUICK_PROMPT_STARTERS.length,
                        )
                      ];
                    if (pick) tryQuickPrompt(pick.prompt);
                  }}
                  disabled={isLoading}
                  className="inline-flex min-h-10 items-center justify-center gap-1.5 border border-border-subtle bg-background px-4 text-xs font-medium text-foreground transition-colors hover:bg-muted disabled:opacity-50 active:scale-[0.98]"
                >
                  <Shuffle className="size-3.5" />
                  Surprise me
                </button>
              ) : null}
              <button
                type="submit"
                disabled={!canGenerate}
                className="ms-cta w-full justify-center sm:ml-auto sm:w-auto disabled:cursor-not-allowed disabled:opacity-50"
              >
                {isLoading ? (
                  <Loader2 className="size-4 animate-spin" />
                ) : (
                  <Sparkles className="size-4" />
                )}
                {isLoading ? "Compositing…" : "Generate"}
              </button>
            </div>
          </div>
        </form>

        {status.kind === "error" ? (
          <div
            role="alert"
            className="mx-6 mb-6 flex flex-col gap-3 border border-destructive/25 bg-destructive/5 px-4 py-3 text-sm sm:mx-8"
          >
            <div className="flex items-start gap-3 text-destructive">
              <AlertCircle className="mt-0.5 size-4 shrink-0" />
              <span>{status.message}</span>
            </div>
            {"isLimit" in status && status.isLimit ? (
              <Link
                href="#pricing"
                className="ml-7 self-start text-sm font-medium text-brand underline decoration-brand/30 underline-offset-4 hover:decoration-brand"
              >
                Join Pro waitlist →
              </Link>
            ) : null}
          </div>
        ) : null}

        {status.kind === "success" ? (
          <div className="mx-6 mb-6 flex items-start gap-3 border border-emerald-500/25 bg-emerald-500/5 px-4 py-3 text-sm text-emerald-700 dark:text-emerald-400 sm:mx-8">
            <CheckCircle2 className="mt-0.5 size-4 shrink-0" />
            <span>Image ready - download at 1200×630 from the preview.</span>
          </div>
        ) : null}
      </div>

      {/* Preview */}
      <div className="flex flex-col bg-muted/20 lg:col-span-7">
        <div className="flex flex-col gap-3 border-b border-border-subtle px-6 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <p className="ds-mono-label">Preview · 1200 × 630</p>
          {mode === "quick" &&
          (status.kind === "idle" || status.kind === "error") ? (
            <button
              type="button"
              onClick={downloadQuickPreview}
              disabled={!canDownloadPreview || downloadingPreview}
              className={cn(
                "inline-flex min-h-10 items-center justify-center gap-1.5 border px-3.5 text-xs font-medium transition-colors active:scale-[0.98]",
                status.kind === "error"
                  ? "border-brand/40 bg-brand/10 text-brand hover:bg-brand/15"
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
              className="inline-flex min-h-10 items-center justify-center gap-1.5 border border-border-subtle bg-background px-3.5 text-xs font-medium text-foreground transition-colors hover:bg-muted active:scale-[0.98]"
            >
              <Download className="size-3.5" />
              Download JPG
            </button>
          ) : null}
        </div>

        <div className="flex flex-1 flex-col p-4 sm:p-6 lg:p-8">
          <div className="relative aspect-1200/630 overflow-hidden ring-1 ring-border-subtle">
            {status.kind === "loading" ? (
              <div className="og-preview-shimmer absolute inset-0" aria-hidden />
            ) : null}

            {status.kind === "success" ? (
              <img
                src={status.imageUrl}
                alt="Generated OG image preview"
                className="absolute inset-0 h-full w-full object-cover"
              />
            ) : null}

            {status.kind === "idle" || status.kind === "error" ? (
              <>
                {mode === "quick" ? (
                  <OgLivePreview
                    title={title}
                    subtitle={subtitle}
                    styleKey={style}
                  />
                ) : (
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-background px-6 text-center">
                    <div
                      aria-hidden
                      className="bg-grid-soft absolute inset-0 opacity-50"
                    />
                    <div className="relative flex size-11 items-center justify-center border border-border-subtle bg-muted text-brand">
                      <ImageIcon className="size-5" />
                    </div>
                    <p className="relative ds-headline max-w-[22ch] text-foreground">
                      Preview shows up here
                    </p>
                    <p className="relative max-w-[32ch] text-xs text-muted-foreground">
                      Write a prompt and hit Generate - polished 1200×630 in a
                      few seconds.
                    </p>
                  </div>
                )}
              </>
            ) : null}
          </div>

          {mode === "quick" && status.kind === "idle" ? (
            <p className="mt-4 text-xs leading-relaxed text-muted-foreground">
              Live layout above.{" "}
              <span className="text-foreground">Generate</span> drops AI imagery
              behind your text (~3-6s). Text preview downloads without burning
              AI capacity.
            </p>
          ) : null}

          {status.kind === "success" ? (
            <div className="mt-4 space-y-4">
              <details className="border border-border-subtle bg-background px-4 py-3">
                <summary className="cursor-pointer text-xs font-medium text-muted-foreground">
                  Generated from{" "}
                  {status.mode === "quick" ? "title" : "prompt"}
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
                    <Link
                      href="/contact"
                      className="ms-cta h-9 px-3.5 text-sm"
                    >
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

export function OgWorkspace() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-[320px] items-center justify-center text-sm text-muted-foreground">
          Loading workspace…
        </div>
      }
    >
      <OgWorkspaceInner />
    </Suspense>
  );
}

function ModeTab({
  active,
  onClick,
  icon,
  label,
  hint,
}: {
  active: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
  hint: string;
}) {
  return (
    <button
      type="button"
      role="tab"
      aria-selected={active}
      onClick={onClick}
      className={cn(
        "inline-flex min-h-10 flex-1 items-center justify-center gap-1.5 border px-3 text-xs font-medium transition-colors active:scale-[0.98] sm:flex-none sm:justify-start",
        active
          ? "border-foreground bg-foreground text-background"
          : "border-border-subtle text-muted-foreground hover:text-foreground",
      )}
    >
      {icon}
      {label}
      <span
        className={cn(
          "hidden text-[11px] sm:inline",
          active ? "text-background/70" : "text-muted-foreground/70",
        )}
      >
        · {hint}
      </span>
    </button>
  );
}

function QuickModeFields({
  title,
  setTitle,
  subtitle,
  setSubtitle,
  style,
  setStyle,
  isLoading,
  titleRef,
}: {
  title: string;
  setTitle: (v: string) => void;
  subtitle: string;
  setSubtitle: (v: string) => void;
  style: StyleKey;
  setStyle: (v: StyleKey) => void;
  isLoading: boolean;
  titleRef: React.RefObject<HTMLInputElement | null>;
}) {
  return (
    <div className="flex flex-col gap-5">
      <div>
        <label htmlFor="og-title" className="ds-mono-label">
          Title
        </label>
        <input
          id="og-title"
          ref={titleRef}
          value={title}
          onChange={(e) =>
            setTitle(e.target.value.slice(0, QUICK_INPUT_LIMITS.titleMax))
          }
          placeholder="Ship Fast. Ship Real. Ship Now."
          disabled={isLoading}
          className={cn(fieldInput, "mt-2 font-medium")}
        />
      </div>

      <div>
        <label htmlFor="og-subtitle" className="ds-mono-label">
          Subtitle{" "}
          <span className="normal-case tracking-normal text-muted-foreground/70">
            (optional)
          </span>
        </label>
        <input
          id="og-subtitle"
          value={subtitle}
          onChange={(e) =>
            setSubtitle(e.target.value.slice(0, QUICK_INPUT_LIMITS.subtitleMax))
          }
          placeholder="A newsletter about building AI tools without the nonsense."
          disabled={isLoading}
          className={cn(fieldInput, "mt-2")}
        />
      </div>

      <div>
        <p className="ds-mono-label">Style</p>
        <div className="mt-2 flex flex-wrap gap-2" role="listbox" aria-label="OG style">
          {STYLE_KEYS.map((key) => {
            const p = STYLE_PRESETS[key];
            const active = key === style;
            return (
              <button
                key={key}
                type="button"
                role="option"
                aria-selected={active}
                onClick={() => setStyle(key)}
                disabled={isLoading}
                title={p.description}
                className={cn(
                  "inline-flex min-h-10 items-center gap-2 border px-3 text-[12.5px] font-medium transition-colors active:scale-[0.97] disabled:opacity-50",
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
    </div>
  );
}

function PromptModeFields({
  prompt,
  setPrompt,
  isLoading,
  promptRef,
  onQuickPick,
  starters,
}: {
  prompt: string;
  setPrompt: (v: string) => void;
  isLoading: boolean;
  promptRef: React.RefObject<HTMLTextAreaElement | null>;
  onQuickPick: (v: string) => void;
  starters: { label: string; prompt: string }[];
}) {
  return (
    <div className="flex flex-col gap-5">
      <div>
        <label htmlFor="og-prompt" className="ds-mono-label">
          Your prompt
        </label>
        <textarea
          id="og-prompt"
          ref={promptRef}
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="A launch announcement card for my indie SaaS, clean dark neon style, bold headline…"
          rows={5}
          disabled={isLoading}
          className={cn(fieldInput, "mt-2 min-h-32 resize-y leading-relaxed")}
        />
      </div>

      <div>
        <p className="ds-mono-label mb-2">Quick starts</p>
        <div className="flex flex-wrap gap-2">
          {starters.map((q) => (
            <button
              key={q.label}
              type="button"
              onClick={() => onQuickPick(q.prompt)}
              disabled={isLoading}
              className="inline-flex min-h-10 items-center border border-border-subtle bg-background px-3 text-[12.5px] text-foreground transition-colors hover:bg-muted disabled:opacity-50 active:scale-[0.98]"
            >
              {q.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
