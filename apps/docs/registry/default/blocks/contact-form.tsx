"use client"

import { ArrowLeft, ArrowRight, Check, Loader2, Send } from "lucide-react"
import { AnimatePresence, motion, useReducedMotion } from "motion/react"
import { useState, type FormEvent } from "react"

/**
 * Edit CONTENT / PROJECT_TYPES to match your studio intake.
 * Posts JSON to CONTENT.endpoint (wire your own API route).
 * Steps reveal one at a time (Family: gradual revelation + fluid travel).
 */
const CONTENT = {
  stamp: "Contact",
  headline: "Tell us what you want to ship.",
  lede: "Four short steps. We reply within one business day.",
  endpoint: "/api/contact",
  successTitle: "Got it.",
  successBody: "We'll reply within one business day.",
  submitLabel: "Send",
}

const PROJECT_TYPES = [
  { id: "mvp-sprint", label: "7-Day MVP Sprint", hint: "from $4,800" },
  { id: "ai-integration", label: "AI Feature", hint: "from $2,400" },
  { id: "design-system", label: "Design System", hint: "from $3,600" },
  { id: "other", label: "Something else", hint: "Describe it below" },
] as const

const BUDGETS = [
  { id: "<2k", label: "Under $2k" },
  { id: "2k-5k", label: "$2k - $5k" },
  { id: "5k-10k", label: "$5k - $10k" },
  { id: "10k+", label: "$10k+" },
  { id: "unsure", label: "Not sure yet" },
] as const

const TIMELINES = [
  { id: "asap", label: "ASAP · 1-2 weeks" },
  { id: "1-month", label: "Within a month" },
  { id: "flexible", label: "Flexible" },
  { id: "unsure", label: "Not sure yet" },
] as const

const STEPS = [
  { id: "who", label: "Who", title: "Who should we reply to?" },
  { id: "what", label: "What", title: "What are we scoping?" },
  { id: "when", label: "When", title: "Timing & budget" },
  { id: "send", label: "Send", title: "Look right?" },
] as const

type Status =
  | { kind: "idle" }
  | { kind: "submitting" }
  | { kind: "success" }
  | { kind: "error"; message: string }

function Chip({
  pressed,
  onClick,
  disabled,
  children,
}: {
  pressed: boolean
  onClick: () => void
  disabled?: boolean
  children: React.ReactNode
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={pressed}
      disabled={disabled}
      className={
        pressed
          ? "border border-[var(--color-brand,#0b7bff)] bg-[var(--color-brand,#0b7bff)]/10 px-3.5 py-2.5 text-left text-sm text-foreground"
          : "border border-border-subtle bg-background px-3.5 py-2.5 text-left text-sm text-muted-foreground hover:border-border hover:text-foreground"
      }
    >
      {children}
    </button>
  )
}

export function ContactForm() {
  const reduce = useReducedMotion()
  const [step, setStep] = useState(0)
  const [status, setStatus] = useState<Status>({ kind: "idle" })
  const [form, setForm] = useState({
    name: "",
    email: "",
    company: "",
    projectType: "",
    budget: "",
    timeline: "",
    message: "",
    honeypot: "",
  })

  const canNext = () => {
    if (step === 0) return !!form.name.trim() && !!form.email.trim()
    if (step === 1) return !!form.message.trim()
    return true
  }

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (step < STEPS.length - 1) {
      if (!canNext()) return
      setStep((s) => s + 1)
      return
    }

    setStatus({ kind: "submitting" })
    try {
      const res = await fetch(CONTENT.endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      })
      if (!res.ok) {
        const data = (await res.json().catch(() => null)) as {
          error?: string
        } | null
        throw new Error(data?.error ?? "Something went wrong. Try again.")
      }
      setStatus({ kind: "success" })
    } catch (err) {
      setStatus({
        kind: "error",
        message: err instanceof Error ? err.message : "Request failed.",
      })
    }
  }

  if (status.kind === "success") {
    return (
      <motion.section
        className="border border-border-subtle p-6 sm:p-8"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.28, ease: [0.32, 0.72, 0, 1] }}
      >
        <div className="flex size-10 items-center justify-center rounded-full bg-[var(--color-brand,#0b7bff)]/15 text-[var(--color-brand,#0b7bff)]">
          <Check className="size-5" aria-hidden />
        </div>
        <h2 className="mt-4 text-2xl font-medium text-foreground">
          {CONTENT.successTitle}
        </h2>
        <p className="mt-2 text-sm text-muted-foreground">{CONTENT.successBody}</p>
      </motion.section>
    )
  }

  const current = STEPS[step]!

  return (
    <section className="border border-border-subtle">
      <div className="border-b border-border-subtle px-6 py-6 sm:px-8">
        <p className="text-[11px] font-semibold tracking-[0.14em] text-muted-foreground uppercase">
          {CONTENT.stamp}
        </p>
        <h2 className="mt-3 text-2xl font-medium tracking-tight text-foreground sm:text-3xl">
          {CONTENT.headline}
        </h2>
        <p className="mt-2 text-sm text-muted-foreground">{CONTENT.lede}</p>
        <ol className="mt-6 flex flex-wrap gap-2" aria-label="Form progress">
          {STEPS.map((s, i) => (
            <li
              key={s.id}
              className={
                i === step
                  ? "text-xs font-medium text-foreground"
                  : i < step
                    ? "text-xs text-[var(--color-brand,#0b7bff)]"
                    : "text-xs text-muted-foreground"
              }
            >
              {String(i + 1).padStart(2, "0")} {s.label}
              {i < STEPS.length - 1 ? (
                <span className="mx-2 text-border-subtle" aria-hidden>
                  /
                </span>
              ) : null}
            </li>
          ))}
        </ol>
      </div>

      <form onSubmit={onSubmit} className="space-y-6 p-6 sm:p-8">
        <input
          type="text"
          name="company_website"
          value={form.honeypot}
          onChange={(e) => setForm((f) => ({ ...f, honeypot: e.target.value }))}
          className="hidden"
          tabIndex={-1}
          autoComplete="off"
          aria-hidden
        />

        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={current.id}
            initial={reduce ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? undefined : { opacity: 0, y: -8 }}
            transition={{ duration: 0.22, ease: [0.32, 0.72, 0, 1] }}
            className="space-y-6"
            style={{ minHeight: 160 + step * 24 }}
          >
            <div>
              <h3 className="text-lg font-medium text-foreground">
                {current.title}
              </h3>
            </div>

            {step === 0 ? (
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block space-y-1.5 sm:col-span-1">
              <span className="text-xs font-medium text-muted-foreground">
                Name
              </span>
              <input
                required
                value={form.name}
                onChange={(e) =>
                  setForm((f) => ({ ...f, name: e.target.value }))
                }
                className="h-11 w-full border border-border-subtle bg-background px-3 text-sm outline-none focus:border-foreground"
              />
            </label>
            <label className="block space-y-1.5 sm:col-span-1">
              <span className="text-xs font-medium text-muted-foreground">
                Email
              </span>
              <input
                required
                type="email"
                value={form.email}
                onChange={(e) =>
                  setForm((f) => ({ ...f, email: e.target.value }))
                }
                className="h-11 w-full border border-border-subtle bg-background px-3 text-sm outline-none focus:border-foreground"
              />
            </label>
            <label className="block space-y-1.5 sm:col-span-2">
              <span className="text-xs font-medium text-muted-foreground">
                Company (optional)
              </span>
              <input
                value={form.company}
                onChange={(e) =>
                  setForm((f) => ({ ...f, company: e.target.value }))
                }
                className="h-11 w-full border border-border-subtle bg-background px-3 text-sm outline-none focus:border-foreground"
              />
            </label>
          </div>
            ) : null}

            {step === 1 ? (
          <div className="space-y-4">
            <div>
              <p className="mb-2 text-xs font-medium text-muted-foreground">
                Project type
              </p>
              <div className="grid gap-2 sm:grid-cols-2">
                {PROJECT_TYPES.map((p) => (
                  <Chip
                    key={p.id}
                    pressed={form.projectType === p.id}
                    onClick={() =>
                      setForm((f) => ({ ...f, projectType: p.id }))
                    }
                  >
                    <span className="block font-medium text-foreground">
                      {p.label}
                    </span>
                    <span className="mt-0.5 block text-xs text-muted-foreground">
                      {p.hint}
                    </span>
                  </Chip>
                ))}
              </div>
            </div>
            <label className="block space-y-1.5">
              <span className="text-xs font-medium text-muted-foreground">
                What do you want to ship?
              </span>
              <textarea
                required
                rows={4}
                value={form.message}
                onChange={(e) =>
                  setForm((f) => ({ ...f, message: e.target.value }))
                }
                className="w-full border border-border-subtle bg-background px-3 py-2.5 text-sm outline-none focus:border-foreground"
              />
            </label>
          </div>
            ) : null}

            {step === 2 ? (
          <div className="space-y-4">
            <div>
              <p className="mb-2 text-xs font-medium text-muted-foreground">
                Budget
              </p>
              <div className="flex flex-wrap gap-2">
                {BUDGETS.map((b) => (
                  <Chip
                    key={b.id}
                    pressed={form.budget === b.id}
                    onClick={() => setForm((f) => ({ ...f, budget: b.id }))}
                  >
                    {b.label}
                  </Chip>
                ))}
              </div>
            </div>
            <div>
              <p className="mb-2 text-xs font-medium text-muted-foreground">
                Timeline
              </p>
              <div className="flex flex-wrap gap-2">
                {TIMELINES.map((t) => (
                  <Chip
                    key={t.id}
                    pressed={form.timeline === t.id}
                    onClick={() => setForm((f) => ({ ...f, timeline: t.id }))}
                  >
                    {t.label}
                  </Chip>
                ))}
              </div>
            </div>
          </div>
            ) : null}

            {step === 3 ? (
          <dl className="space-y-3 text-sm">
            <div className="flex justify-between gap-4 border-b border-border-subtle pb-2">
              <dt className="text-muted-foreground">Name</dt>
              <dd className="font-medium text-foreground">{form.name}</dd>
            </div>
            <div className="flex justify-between gap-4 border-b border-border-subtle pb-2">
              <dt className="text-muted-foreground">Email</dt>
              <dd className="font-medium text-foreground">{form.email}</dd>
            </div>
            <div className="flex justify-between gap-4 border-b border-border-subtle pb-2">
              <dt className="text-muted-foreground">Project</dt>
              <dd className="font-medium text-foreground">
                {PROJECT_TYPES.find((p) => p.id === form.projectType)?.label ??
                  "Not set"}
              </dd>
            </div>
            <div className="border-b border-border-subtle pb-2">
              <dt className="text-muted-foreground">Note</dt>
              <dd className="mt-1 text-foreground">{form.message}</dd>
            </div>
          </dl>
            ) : null}
          </motion.div>
        </AnimatePresence>

        {status.kind === "error" ? (
          <p className="text-sm text-red-600 dark:text-red-400" role="alert">
            {status.message}
          </p>
        ) : null}

        <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
          <button
            type="button"
            disabled={step === 0 || status.kind === "submitting"}
            onClick={() => setStep((s) => Math.max(0, s - 1))}
            className="inline-flex h-10 items-center gap-1.5 px-3 text-sm font-medium text-muted-foreground disabled:opacity-40"
          >
            <ArrowLeft className="size-3.5" aria-hidden />
            Back
          </button>
          <button
            type="submit"
            disabled={
              status.kind === "submitting" || (step < 3 && !canNext())
            }
            className="inline-flex h-11 min-w-[7.5rem] items-center justify-center gap-2 rounded-full bg-foreground px-5 text-sm font-medium text-background disabled:opacity-50"
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={
                  status.kind === "submitting"
                    ? "submitting"
                    : step === 3
                      ? "send"
                      : "continue"
                }
                className="inline-flex items-center gap-2"
                initial={reduce ? false : { opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduce ? undefined : { opacity: 0, y: -4 }}
                transition={{ duration: 0.16 }}
              >
                {status.kind === "submitting" ? (
                  <>
                    <Loader2 className="size-4 animate-spin" aria-hidden />
                    Sending…
                  </>
                ) : step === 3 ? (
                  <>
                    {CONTENT.submitLabel}
                    <Send className="size-3.5" aria-hidden />
                  </>
                ) : (
                  <>
                    Continue
                    <ArrowRight className="size-3.5" aria-hidden />
                  </>
                )}
              </motion.span>
            </AnimatePresence>
          </button>
        </div>
      </form>
    </section>
  )
}
