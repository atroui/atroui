"use client";

import {
  AlertCircle,
  ArrowLeft,
  ArrowRight,
  Check,
  CheckCircle2,
  Loader2,
  Paperclip,
  Send,
  X,
} from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { FormEvent, Suspense, useEffect, useMemo, useState } from "react";

import { trackEvent } from "../../lib/analytics";
import { cn } from "../../lib/utils";

const PROJECT_TYPES = [
  {
    id: "mvp-sprint",
    label: "7-Day MVP Sprint",
    hint: "Ship one core workflow · from $4,800",
  },
  {
    id: "ai-integration",
    label: "AI Feature",
    hint: "Drop AI into an existing product · from $2,400",
  },
  {
    id: "design-system",
    label: "Design System",
    hint: "Tokens, components, docs · from $3,600",
  },
  {
    id: "full-stack-build",
    label: "Full-Stack Build",
    hint: "Longer engagement · scoped after a call",
  },
  {
    id: "other",
    label: "Something else",
    hint: "Describe it in the note below",
  },
] as const;

const BUDGETS = [
  { id: "<2k", label: "Under $2k" },
  { id: "2k-5k", label: "$2k – $5k" },
  { id: "5k-10k", label: "$5k – $10k" },
  { id: "10k+", label: "$10k+" },
  { id: "unsure", label: "Not sure yet" },
] as const;

const TIMELINES = [
  { id: "asap", label: "ASAP · 1–2 weeks" },
  { id: "1-month", label: "Within a month" },
  { id: "flexible", label: "Flexible" },
  { id: "unsure", label: "Not sure yet" },
] as const;

/** Editorial step labels — short, not CRM-speak */
const STEPS = [
  { id: "who", label: "Who", title: "Who should we reply to?" },
  { id: "what", label: "What", title: "What are we scoping?" },
  { id: "when", label: "When", title: "Timing & extras" },
  { id: "send", label: "Send", title: "Look right?" },
] as const;

const MAX_FILE_BYTES = 5 * 1024 * 1024;
const ACCEPTED_TYPES = ".pdf,.doc,.docx,.txt,.png,.jpg,.jpeg,.md";

type Status =
  | { kind: "idle" }
  | { kind: "submitting" }
  | { kind: "success" }
  | { kind: "error"; message: string };

type Attachment = {
  name: string;
  mime: string;
  data: string;
};

function labelOf(
  options: readonly { id: string; label: string }[],
  id: string,
) {
  return options.find((o) => o.id === id)?.label ?? id;
}

function ChoiceChip({
  pressed,
  onClick,
  disabled,
  children,
  className,
}: {
  pressed: boolean;
  onClick: () => void;
  disabled?: boolean;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={pressed}
      disabled={disabled}
      className={cn(
        "border px-3.5 py-2.5 text-left text-sm transition-[border-color,background-color,color,transform] duration-200",
        "active:scale-[0.99] disabled:pointer-events-none disabled:opacity-50",
        pressed
          ? "border-brand bg-brand/8 text-foreground"
          : "border-border-subtle bg-background text-muted-foreground hover:border-border hover:text-foreground",
        className,
      )}
    >
      {children}
    </button>
  );
}

function ContactFormInner() {
  const search = useSearchParams();
  const serviceParam = search.get("service");
  const configParam = search.get("config");

  const initialProjectType = useMemo(() => {
    if (!serviceParam) return "";
    return PROJECT_TYPES.find((p) => p.id === serviceParam)?.id ?? "";
  }, [serviceParam]);

  const [step, setStep] = useState(0);
  const [form, setForm] = useState({
    name: "",
    email: "",
    company: "",
    projectType: initialProjectType,
    budget: "",
    timeline: "",
    message: "",
    config: configParam ?? "",
    honeypot: "",
  });
  const [attachment, setAttachment] = useState<Attachment | null>(null);
  const [fileError, setFileError] = useState("");
  const [status, setStatus] = useState<Status>({ kind: "idle" });

  useEffect(() => {
    if (initialProjectType && !form.projectType) {
      setForm((f) => ({ ...f, projectType: initialProjectType }));
    }
    if (configParam && !form.config) {
      setForm((f) => ({ ...f, config: configParam }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialProjectType, configParam]);

  const onFile = async (file: File | null) => {
    setFileError("");
    if (!file) {
      setAttachment(null);
      return;
    }
    if (file.size > MAX_FILE_BYTES) {
      setFileError("File too large (max 5 MB).");
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      const base64 = result.split(",")[1] ?? "";
      setAttachment({ name: file.name, mime: file.type, data: base64 });
      trackEvent("contact_attachment_added", { name: file.name });
    };
    reader.readAsDataURL(file);
  };

  const canNext = () => {
    if (step === 0) return !!form.name.trim() && !!form.email.trim();
    if (step === 1) return !!form.message.trim();
    return true;
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (step < STEPS.length - 1) {
      if (!canNext()) return;
      setStep((s) => s + 1);
      return;
    }

    setStatus({ kind: "submitting" });
    trackEvent("contact_form_submit", {
      project_type: form.projectType || "unknown",
    });

    try {
      const resp = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          attachmentName: attachment?.name,
          attachmentMime: attachment?.mime,
          attachmentData: attachment?.data,
        }),
      });
      const data = (await resp.json().catch(() => ({}))) as {
        ok?: boolean;
        error?: string;
      };
      if (!resp.ok || data.error)
        throw new Error(data.error || `Request failed (${resp.status})`);
      setStatus({ kind: "success" });
      trackEvent("contact_form_success");
    } catch (err) {
      setStatus({
        kind: "error",
        message:
          err instanceof Error
            ? err.message
            : "Something went wrong. Please try again.",
      });
    }
  };

  if (status.kind === "success") {
    return (
      <div className="flex flex-col gap-6" role="status">
        <div className="flex size-10 items-center justify-center border border-border-subtle bg-background text-brand">
          <CheckCircle2 className="size-5" aria-hidden />
        </div>
        <div>
          <p className="ms-stamp">Sent</p>
          <h3 className="ds-headline mt-3 text-xl text-foreground sm:text-2xl">
            Got it — talk soon.
          </h3>
          <p className="mt-2 max-w-md text-sm leading-relaxed text-muted-foreground">
            Koustav reads every brief himself and replies within one business
            day. Prefer live?{" "}
            <Link href="#book" className="bam-link">
              Book 15 minutes
            </Link>
            .
          </p>
        </div>
        <a
          href="mailto:hello@makershot.tech"
          className="ms-cta-ghost w-fit text-sm"
        >
          Or email hello@makershot.tech
        </a>
      </div>
    );
  }

  const disabled = status.kind === "submitting";
  const current = STEPS[step]!;

  return (
    <form
      onSubmit={onSubmit}
      className="relative flex flex-col gap-8"
      noValidate
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -left-[9999px] h-0 w-0 overflow-hidden opacity-0"
      >
        <input
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={form.honeypot}
          onChange={(e) => setForm({ ...form, honeypot: e.target.value })}
        />
      </div>

      {/* Editorial step index */}
      <nav aria-label="Brief steps">
        <ol className="flex flex-wrap items-center gap-x-1 gap-y-2">
          {STEPS.map((s, i) => {
            const done = i < step;
            const active = i === step;
            return (
              <li key={s.id} className="flex items-center gap-1">
                {i > 0 ? (
                  <span
                    aria-hidden
                    className="mx-1.5 h-px w-4 bg-border-subtle sm:w-6"
                  />
                ) : null}
                <span
                  className={cn(
                    "inline-flex items-center gap-2 font-mono text-[11px] tracking-wide uppercase",
                    active && "text-foreground",
                    done && "text-brand",
                    !active && !done && "text-muted-foreground",
                  )}
                >
                  <span
                    className={cn(
                      "inline-flex size-5 items-center justify-center border text-[10px] tabular-nums",
                      active && "border-brand bg-brand/10 text-brand",
                      done && "border-brand/40 text-brand",
                      !active && !done && "border-border-subtle",
                    )}
                    aria-hidden
                  >
                    {done ? <Check className="size-3" /> : String(i + 1)}
                  </span>
                  <span className={cn(!active && "hidden sm:inline")}>
                    {s.label}
                  </span>
                </span>
              </li>
            );
          })}
        </ol>
        <div className="mt-5 border-t border-border-subtle pt-5">
          <p className="ds-mono-label">
            {String(step + 1).padStart(2, "0")} /{" "}
            {String(STEPS.length).padStart(2, "0")}
          </p>
          <h3 className="ds-headline mt-2 text-lg text-foreground sm:text-xl">
            {current.title}
          </h3>
        </div>
      </nav>

      {step === 0 ? (
        <fieldset className="grid grid-cols-1 gap-5 border-0 p-0 sm:grid-cols-2">
          <legend className="sr-only">About you</legend>
          <Field
            label="Name"
            required
            htmlFor="contact-name"
            hint="First name is fine."
          >
            <input
              id="contact-name"
              type="text"
              required
              autoComplete="name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              disabled={disabled}
              className={fieldInput}
              placeholder="Koustav"
            />
          </Field>
          <Field
            label="Email"
            required
            htmlFor="contact-email"
            hint="Reply lands here within one business day."
          >
            <input
              id="contact-email"
              type="email"
              required
              autoComplete="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              disabled={disabled}
              className={fieldInput}
              placeholder="you@company.com"
            />
          </Field>
          <Field
            label="Company"
            htmlFor="contact-company"
            className="sm:col-span-2"
            hint="Optional — solo founders usually skip this."
          >
            <input
              id="contact-company"
              type="text"
              autoComplete="organization"
              value={form.company}
              onChange={(e) => setForm({ ...form, company: e.target.value })}
              disabled={disabled}
              className={fieldInput}
              placeholder="Studio or company"
            />
          </Field>
        </fieldset>
      ) : null}

      {step === 1 ? (
        <fieldset className="flex flex-col gap-7 border-0 p-0">
          <legend className="sr-only">Project</legend>

          <div className="flex flex-col gap-3">
            <p className="text-xs font-medium text-foreground">
              Engagement{" "}
              <span className="font-normal text-muted-foreground">
                — pick closest, or skip
              </span>
            </p>
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
              {PROJECT_TYPES.map((p) => (
                <ChoiceChip
                  key={p.id}
                  pressed={form.projectType === p.id}
                  disabled={disabled}
                  onClick={() =>
                    setForm((f) => ({
                      ...f,
                      projectType: f.projectType === p.id ? "" : p.id,
                    }))
                  }
                  className="flex flex-col gap-1"
                >
                  <span className="font-medium text-foreground">{p.label}</span>
                  <span className="text-[11px] leading-snug text-muted-foreground">
                    {p.hint}
                  </span>
                </ChoiceChip>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <p className="text-xs font-medium text-foreground">
              Budget ballpark{" "}
              <span className="font-normal text-muted-foreground">
                — honest range helps scope
              </span>
            </p>
            <div className="flex flex-wrap gap-2">
              {BUDGETS.map((b) => (
                <ChoiceChip
                  key={b.id}
                  pressed={form.budget === b.id}
                  disabled={disabled}
                  onClick={() =>
                    setForm((f) => ({
                      ...f,
                      budget: f.budget === b.id ? "" : b.id,
                    }))
                  }
                >
                  {b.label}
                </ChoiceChip>
              ))}
            </div>
          </div>

          <Field
            label="The brief"
            required
            htmlFor="contact-message"
            hint="What success looks like, hard constraints, and what we should not assume."
          >
            <textarea
              id="contact-message"
              required
              rows={6}
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              disabled={disabled}
              className={cn(fieldInput, "min-h-32 resize-y leading-relaxed")}
              placeholder="e.g. Need auth + one AI workflow shipped in a week for a waitlist of indie founders…"
            />
          </Field>
        </fieldset>
      ) : null}

      {step === 2 ? (
        <fieldset className="flex flex-col gap-7 border-0 p-0">
          <legend className="sr-only">Timing and extras</legend>

          <div className="flex flex-col gap-3">
            <p className="text-xs font-medium text-foreground">
              When do you want to start?
            </p>
            <div className="flex flex-wrap gap-2">
              {TIMELINES.map((t) => (
                <ChoiceChip
                  key={t.id}
                  pressed={form.timeline === t.id}
                  disabled={disabled}
                  onClick={() =>
                    setForm((f) => ({
                      ...f,
                      timeline: f.timeline === t.id ? "" : t.id,
                    }))
                  }
                >
                  {t.label}
                </ChoiceChip>
              ))}
            </div>
          </div>

          <Field
            label="Attach a brief"
            htmlFor="contact-file"
            hint="Optional. PDF, DOC, TXT, or image — max 5 MB."
          >
            <div className="flex flex-col gap-2">
              <label
                htmlFor="contact-file"
                className={cn(
                  "flex cursor-pointer items-center gap-3 border border-dashed border-border-subtle bg-background px-4 py-5 transition-colors",
                  "hover:border-border hover:bg-muted/20 active:scale-[0.99]",
                  disabled && "pointer-events-none opacity-60",
                )}
              >
                <Paperclip
                  className="size-4 shrink-0 text-muted-foreground"
                  aria-hidden
                />
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-sm text-foreground">
                    {attachment ? attachment.name : "Drop or choose a file"}
                  </span>
                  {!attachment ? (
                    <span className="mt-0.5 block text-[11px] text-muted-foreground">
                      Specs, Loom notes, Figma export — whatever clarifies.
                    </span>
                  ) : null}
                </span>
                <input
                  id="contact-file"
                  type="file"
                  accept={ACCEPTED_TYPES}
                  className="sr-only"
                  disabled={disabled}
                  onChange={(e) => onFile(e.target.files?.[0] ?? null)}
                />
              </label>
              {attachment ? (
                <button
                  type="button"
                  onClick={() => setAttachment(null)}
                  className="inline-flex w-fit items-center gap-1 text-xs text-muted-foreground transition-colors hover:text-foreground"
                >
                  <X className="size-3" aria-hidden />
                  Remove file
                </button>
              ) : null}
              {fileError ? (
                <p className="text-xs text-destructive" role="alert">
                  {fileError}
                </p>
              ) : null}
            </div>
          </Field>
        </fieldset>
      ) : null}

      {step === 3 ? (
        <div className="divide-y divide-border-subtle border-y border-border-subtle">
          <ReviewRow
            label="Name"
            value={form.name}
            onEdit={() => setStep(0)}
          />
          <ReviewRow
            label="Email"
            value={form.email}
            onEdit={() => setStep(0)}
          />
          {form.company ? (
            <ReviewRow
              label="Company"
              value={form.company}
              onEdit={() => setStep(0)}
            />
          ) : null}
          <ReviewRow
            label="Engagement"
            value={
              form.projectType
                ? labelOf(PROJECT_TYPES, form.projectType)
                : "Not specified"
            }
            onEdit={() => setStep(1)}
          />
          <ReviewRow
            label="Budget"
            value={
              form.budget ? labelOf(BUDGETS, form.budget) : "Not specified"
            }
            onEdit={() => setStep(1)}
          />
          <ReviewRow
            label="Timeline"
            value={
              form.timeline
                ? labelOf(TIMELINES, form.timeline)
                : "Not specified"
            }
            onEdit={() => setStep(2)}
          />
          <ReviewRow
            label="Brief"
            value={form.message}
            onEdit={() => setStep(1)}
          />
          {attachment ? (
            <ReviewRow
              label="File"
              value={attachment.name}
              onEdit={() => setStep(2)}
            />
          ) : null}
        </div>
      ) : null}

      {status.kind === "error" ? (
        <div
          role="alert"
          className="flex items-start gap-3 border border-destructive/25 bg-destructive/5 px-4 py-3 text-sm text-destructive"
        >
          <AlertCircle className="mt-0.5 size-4 shrink-0" aria-hidden />
          <div>
            <p className="font-medium">Couldn&rsquo;t send</p>
            <p className="mt-0.5 opacity-90">{status.message}</p>
            <a
              href="mailto:hello@makershot.tech"
              className="mt-2 inline-block underline underline-offset-2"
            >
              Email us instead
            </a>
          </div>
        </div>
      ) : null}

      <div className="flex flex-col gap-3 border-t border-border-subtle pt-5 sm:flex-row sm:items-center sm:justify-between">
        {step > 0 ? (
          <button
            type="button"
            onClick={() => setStep((s) => s - 1)}
            className="inline-flex min-h-10 items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground active:scale-[0.98]"
          >
            <ArrowLeft className="size-3.5" aria-hidden />
            Back
          </button>
        ) : (
          <p className="text-xs text-muted-foreground">
            No pitch deck. Honest fit check.
          </p>
        )}
        <button
          type="submit"
          disabled={disabled || (step < STEPS.length - 1 && !canNext())}
          className="ms-cta ml-auto disabled:pointer-events-none disabled:opacity-50"
        >
          {disabled ? (
            <Loader2 className="size-4 animate-spin" aria-hidden />
          ) : step < STEPS.length - 1 ? (
            <ArrowRight className="size-4" aria-hidden />
          ) : (
            <Send className="size-4" aria-hidden />
          )}
          {disabled
            ? "Sending…"
            : step < STEPS.length - 1
              ? "Continue"
              : "Send brief"}
        </button>
      </div>
    </form>
  );
}

function ReviewRow({
  label,
  value,
  onEdit,
}: {
  label: string;
  value: string;
  onEdit: () => void;
}) {
  return (
    <div className="grid grid-cols-1 gap-2 py-4 sm:grid-cols-12 sm:gap-4">
      <span className="font-mono text-[11px] tracking-wide text-muted-foreground uppercase sm:col-span-3">
        {label}
      </span>
      <span className="whitespace-pre-wrap text-sm text-foreground sm:col-span-7">
        {value}
      </span>
      <button
        type="button"
        onClick={onEdit}
        className="justify-self-start text-xs font-medium text-muted-foreground underline-offset-2 transition-colors hover:text-brand hover:underline sm:col-span-2 sm:justify-self-end"
      >
        Edit
      </button>
    </div>
  );
}

const fieldInput = cn(
  "w-full border border-border-subtle bg-background px-3.5 py-2.5 text-base text-foreground sm:text-sm",
  "placeholder:text-muted-foreground/60",
  "transition-[border-color,box-shadow] duration-200",
  "focus:border-ring focus:outline-none focus:ring-2 focus:ring-ring/20",
  "disabled:cursor-not-allowed disabled:opacity-60",
);

function Field({
  label,
  required = false,
  htmlFor,
  hint,
  className,
  children,
}: {
  label: string;
  required?: boolean;
  htmlFor?: string;
  hint?: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <label htmlFor={htmlFor} className="text-xs font-medium text-foreground">
        {label}
        {required ? (
          <span className="ml-1 text-muted-foreground" aria-hidden>
            *
          </span>
        ) : null}
      </label>
      {children}
      {hint ? <p className="text-[11px] text-muted-foreground">{hint}</p> : null}
    </div>
  );
}

function FormSkeleton() {
  return (
    <div className="flex flex-col gap-5" aria-hidden>
      <div className="h-5 w-48 bg-muted/60" />
      <div className="h-px bg-border-subtle" />
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div className="h-16 bg-muted/60" />
        <div className="h-16 bg-muted/60" />
      </div>
      <div className="h-32 bg-muted/60" />
      <div className="h-10 w-36 self-end bg-muted/60" />
    </div>
  );
}

export function ContactForm() {
  return (
    <Suspense fallback={<FormSkeleton />}>
      <ContactFormInner />
    </Suspense>
  );
}
