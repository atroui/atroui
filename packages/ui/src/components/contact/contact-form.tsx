"use client"

import { ArrowUpRight, Check, Loader2 } from "lucide-react"
import { useId, useState, type FormEvent } from "react"

/**
 * Letter-sheet contact form — keep in sync with registry
 * `apps/docs/registry/default/blocks/contact-form.tsx` (`@atroui/contact-form`).
 * Install surface is the registry copy; this npm export mirrors it for Host API demos.
 *
 * Payload: name, email, company?, message, honeypot → `handleContactPost`.
 */
const CONTENT = {
  stamp: "Contact",
  headline: "Write us.",
  lede: "One note. We answer within a business day.",
  labelName: "Name",
  labelEmail: "Email",
  labelCompany: "Company",
  labelMessage: "Message",
  companyHint: "optional",
  placeholderMessage: "What are you building?",
  submitLabel: "Send",
  sendingLabel: "Sending",
  successTitle: "Sent.",
  successBody: "We'll reply within one business day.",
  footnote: "Posts to your /api/contact · keys stay on your host",
  endpoint: "/api/contact",
}

type Field = "name" | "email" | "company" | "message"

const fieldClass =
  "w-full border-0 bg-transparent px-0 py-2.5 text-[0.9375rem] leading-snug text-foreground outline-none placeholder:text-muted-foreground/55 disabled:opacity-60"
const labelClass =
  "font-mono text-[10.5px] font-medium tracking-[0.14em] text-muted-foreground uppercase"

export function ContactForm() {
  const uid = useId()
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle")
  const [error, setError] = useState("")
  const [focused, setFocused] = useState<Field | null>(null)
  const [form, setForm] = useState({
    name: "",
    email: "",
    company: "",
    body: "",
    honeypot: "",
  })

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    if (!form.name.trim() || !form.email.trim() || !form.body.trim()) return

    setStatus("loading")
    setError("")
    try {
      const response = await fetch(CONTENT.endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name.trim(),
          email: form.email.trim(),
          company: form.company.trim(),
          message: form.body.trim(),
          honeypot: form.honeypot,
        }),
      })
      const data = (await response.json().catch(() => ({}))) as {
        error?: string
      }
      if (!response.ok) throw new Error(data.error || "Something went wrong")
      setStatus("success")
      setForm({ name: "", email: "", company: "", body: "", honeypot: "" })
      setFocused(null)
    } catch (err) {
      setStatus("error")
      setError(err instanceof Error ? err.message : "Failed to send message")
    }
  }

  if (status === "success") {
    return (
      <section
        className="relative overflow-hidden rounded-[var(--atro-panel-radius,0.5rem)] border border-border-subtle bg-background px-5 py-8 sm:px-7 sm:py-9"
        aria-live="polite"
      >
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[color:var(--brand)] to-transparent opacity-70"
          aria-hidden
        />
        <div className="flex size-9 items-center justify-center rounded-full border border-border-subtle text-foreground">
          <Check className="size-4" aria-hidden />
        </div>
        <h2 className="mt-5 text-2xl font-medium tracking-tight text-foreground">
          {CONTENT.successTitle}
        </h2>
        <p className="mt-2 max-w-[28ch] text-sm leading-relaxed text-muted-foreground">
          {CONTENT.successBody}
        </p>
      </section>
    )
  }

  const toLine = form.email.trim() || form.name.trim() || "—"

  return (
    <section className="relative overflow-hidden rounded-[var(--atro-panel-radius,0.5rem)] border border-border-subtle bg-background">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[color:var(--brand)] to-transparent opacity-60"
        aria-hidden
      />

      <header className="border-b border-border-subtle px-5 pt-5 pb-4 sm:px-7 sm:pt-6 sm:pb-5">
        <div className="flex items-baseline justify-between gap-3">
          <p className={labelClass}>{CONTENT.stamp}</p>
          <p
            className="min-w-0 truncate font-mono text-[10.5px] tracking-[0.06em] text-muted-foreground"
            aria-hidden={toLine === "—"}
          >
            <span className="text-muted-foreground/70">To</span>{" "}
            <span className="text-foreground/80">{toLine}</span>
          </p>
        </div>
        <h2 className="mt-3 text-[1.65rem] leading-[1.15] font-medium tracking-tight text-foreground sm:text-[1.85rem]">
          {CONTENT.headline}
        </h2>
        <p className="mt-1.5 max-w-[36ch] text-sm leading-relaxed text-muted-foreground">
          {CONTENT.lede}
        </p>
      </header>

      <form onSubmit={handleSubmit} className="px-5 pt-5 pb-5 sm:px-7 sm:pb-6">
        <input
          type="text"
          name="company_website"
          value={form.honeypot}
          onChange={(e) =>
            setForm((f) => ({ ...f, honeypot: e.target.value }))
          }
          className="hidden"
          tabIndex={-1}
          autoComplete="off"
          aria-hidden
        />

        <div className="grid gap-0 sm:grid-cols-2">
          <label
            htmlFor={`${uid}-name`}
            className="group block border-b border-border-subtle py-1 sm:pr-4"
            data-focused={focused === "name" ? "" : undefined}
          >
            <span
              className={`${labelClass} transition-colors duration-150 group-data-[focused]:text-foreground`}
            >
              {CONTENT.labelName}
            </span>
            <input
              id={`${uid}-name`}
              required
              name="name"
              autoComplete="name"
              value={form.name}
              onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
              onFocus={() => setFocused("name")}
              onBlur={() => setFocused((f) => (f === "name" ? null : f))}
              disabled={status === "loading"}
              className={fieldClass}
            />
            <span
              className="block h-px origin-left scale-x-0 bg-[var(--brand)] transition-transform duration-200 ease-out group-data-[focused]:scale-x-100 motion-reduce:transition-none"
              aria-hidden
            />
          </label>

          <label
            htmlFor={`${uid}-email`}
            className="group block border-b border-border-subtle py-1 sm:border-l sm:border-l-border-subtle sm:pl-4"
            data-focused={focused === "email" ? "" : undefined}
          >
            <span
              className={`${labelClass} transition-colors duration-150 group-data-[focused]:text-foreground`}
            >
              {CONTENT.labelEmail}
            </span>
            <input
              id={`${uid}-email`}
              required
              type="email"
              name="email"
              autoComplete="email"
              value={form.email}
              onChange={(e) =>
                setForm((f) => ({ ...f, email: e.target.value }))
              }
              onFocus={() => setFocused("email")}
              onBlur={() => setFocused((f) => (f === "email" ? null : f))}
              disabled={status === "loading"}
              className={fieldClass}
            />
            <span
              className="block h-px origin-left scale-x-0 bg-[var(--brand)] transition-transform duration-200 ease-out group-data-[focused]:scale-x-100 motion-reduce:transition-none"
              aria-hidden
            />
          </label>
        </div>

        <label
          htmlFor={`${uid}-company`}
          className="group block border-b border-border-subtle py-1"
          data-focused={focused === "company" ? "" : undefined}
        >
          <span
            className={`${labelClass} transition-colors duration-150 group-data-[focused]:text-foreground`}
          >
            {CONTENT.labelCompany}{" "}
            <span className="tracking-normal text-muted-foreground/60 normal-case">
              · {CONTENT.companyHint}
            </span>
          </span>
          <input
            id={`${uid}-company`}
            name="company"
            autoComplete="organization"
            value={form.company}
            onChange={(e) =>
              setForm((f) => ({ ...f, company: e.target.value }))
            }
            onFocus={() => setFocused("company")}
            onBlur={() => setFocused((f) => (f === "company" ? null : f))}
            disabled={status === "loading"}
            className={fieldClass}
          />
          <span
            className="block h-px origin-left scale-x-0 bg-[var(--brand)] transition-transform duration-200 ease-out group-data-[focused]:scale-x-100 motion-reduce:transition-none"
            aria-hidden
          />
        </label>

        <label
          htmlFor={`${uid}-message`}
          className="group block border-b border-border-subtle py-1"
          data-focused={focused === "message" ? "" : undefined}
        >
          <span
            className={`${labelClass} transition-colors duration-150 group-data-[focused]:text-foreground`}
          >
            {CONTENT.labelMessage}
          </span>
          <textarea
            id={`${uid}-message`}
            required
            name="message"
            rows={4}
            placeholder={CONTENT.placeholderMessage}
            value={form.body}
            onChange={(e) => setForm((f) => ({ ...f, body: e.target.value }))}
            onFocus={() => setFocused("message")}
            onBlur={() => setFocused((f) => (f === "message" ? null : f))}
            disabled={status === "loading"}
            className={`${fieldClass} min-h-[6.5rem] resize-y text-[1.02rem] leading-relaxed`}
          />
          <span
            className="block h-px origin-left scale-x-0 bg-[var(--brand)] transition-transform duration-200 ease-out group-data-[focused]:scale-x-100 motion-reduce:transition-none"
            aria-hidden
          />
        </label>

        {status === "error" ? (
          <p
            className="mt-4 text-sm text-red-600 dark:text-red-400"
            role="alert"
          >
            {error}
          </p>
        ) : null}

        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <p className="max-w-[28ch] font-mono text-[10.5px] leading-relaxed tracking-[0.04em] text-muted-foreground">
            {CONTENT.footnote}
          </p>
          <button
            type="submit"
            disabled={status === "loading"}
            className="atro-btn shrink-0 disabled:opacity-55"
          >
            {status === "loading" ? (
              <>
                <Loader2 className="size-3.5 animate-spin" aria-hidden />
                {CONTENT.sendingLabel}
              </>
            ) : (
              <>
                {CONTENT.submitLabel}
                <ArrowUpRight className="size-3.5" aria-hidden />
              </>
            )}
          </button>
        </div>
      </form>
    </section>
  )
}
