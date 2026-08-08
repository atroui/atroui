"use client"

import { ArrowRight, CheckCircle2, Loader2 } from "lucide-react"
import { useState, type FormEvent } from "react"

/**
 * Edit CONTENT to change copy and API endpoint.
 * Wire CONTENT.endpoint to your own route (Host API).
 */
const CONTENT = {
  label: "Email",
  placeholder: "you@company.com",
  submitLabel: "Join waitlist",
  successMessage: "You're on the list. We'll reach out soon.",
  footnote: "Zero spam. Early-bird invite when seats open.",
  endpoint: "/api/waitlist",
  source: "waitlist",
}

export function WaitlistForm() {
  const [email, setEmail] = useState("")
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle")
  const [message, setMessage] = useState("")

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    if (!email) return
    setStatus("loading")
    try {
      const response = await fetch(CONTENT.endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, source: CONTENT.source }),
      })
      const data = (await response.json().catch(() => ({}))) as {
        error?: string
      }
      if (!response.ok) throw new Error(data.error || "Something went wrong")
      setStatus("success")
      setMessage(CONTENT.successMessage)
      setEmail("")
    } catch (err) {
      setStatus("error")
      setMessage(err instanceof Error ? err.message : "Failed to join waitlist")
    }
  }

  if (status === "success") {
    return (
      <div className="flex items-start gap-3 border border-emerald-500/25 bg-emerald-500/5 px-4 py-3 text-sm font-medium text-emerald-700 dark:text-emerald-400">
        <CheckCircle2 className="mt-0.5 size-4 shrink-0" aria-hidden />
        <p>{message}</p>
      </div>
    )
  }

  return (
    <div>
      <form onSubmit={handleSubmit} className="space-y-3">
        <label
          htmlFor="waitlist-email"
          className="block font-mono text-[11px] tracking-wide text-muted-foreground uppercase"
        >
          {CONTENT.label}
        </label>
        <input
          id="waitlist-email"
          type="email"
          required
          placeholder={CONTENT.placeholder}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={status === "loading"}
          className="w-full border border-border-subtle bg-background px-3.5 py-2.5 text-sm text-foreground outline-none focus:border-foreground disabled:opacity-60"
        />
        <button
          type="submit"
          disabled={status === "loading"}
          className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-foreground px-5 text-sm font-medium text-background disabled:opacity-50"
        >
          {status === "loading" ? (
            <Loader2 className="size-4 animate-spin" aria-hidden />
          ) : (
            <>
              {CONTENT.submitLabel}
              <ArrowRight className="size-4" aria-hidden />
            </>
          )}
        </button>
      </form>
      {status === "error" ? (
        <p className="mt-3 text-xs font-medium text-red-600 dark:text-red-400">
          {message}
        </p>
      ) : null}
      <p className="mt-3 text-[11px] text-muted-foreground">{CONTENT.footnote}</p>
    </div>
  )
}
