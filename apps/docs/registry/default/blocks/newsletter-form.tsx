"use client"

import { CheckCircle2, Loader2, Mail } from "lucide-react"
import { useState, type FormEvent } from "react"

/**
 * Edit CONTENT to change copy and API endpoint.
 * Wire CONTENT.endpoint to your own route (Host API).
 */
const CONTENT = {
  placeholder: "you@company.com",
  submitLabel: "Subscribe",
  successMessage: "You're on the list - thanks!",
  endpoint: "/api/newsletter",
}

export type NewsletterFormProps = {
  className?: string
}

export function NewsletterForm({ className }: NewsletterFormProps) {
  const [email, setEmail] = useState("")
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle",
  )
  const [error, setError] = useState("")

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setStatus("loading")
    setError("")
    try {
      const res = await fetch(CONTENT.endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      })
      const data = (await res.json().catch(() => ({}))) as { error?: string }
      if (!res.ok) throw new Error(data.error ?? "Failed to subscribe")
      setStatus("success")
      setEmail("")
    } catch (err) {
      setStatus("error")
      setError(err instanceof Error ? err.message : "Something went wrong")
    }
  }

  if (status === "success") {
    return (
      <div
        className={`flex items-center gap-2 text-sm text-emerald-600 dark:text-emerald-400 ${className ?? ""}`}
      >
        <CheckCircle2 className="size-4" aria-hidden />
        <span>{CONTENT.successMessage}</span>
      </div>
    )
  }

  return (
    <form
      onSubmit={onSubmit}
      className={`flex flex-col gap-2 sm:flex-row ${className ?? ""}`}
    >
      <div className="relative min-w-0 flex-1">
        <Mail
          className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground"
          aria-hidden
        />
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={CONTENT.placeholder}
          disabled={status === "loading"}
          className="w-full border border-border-subtle bg-background py-2.5 pr-4 pl-9 text-sm text-foreground outline-none focus:border-foreground disabled:opacity-60"
          aria-label="Email for newsletter"
        />
      </div>
      <button
        type="submit"
        disabled={status === "loading"}
        className="inline-flex h-11 shrink-0 items-center justify-center gap-2 rounded-lg bg-foreground px-5 text-sm font-medium text-background disabled:opacity-60"
      >
        {status === "loading" ? (
          <Loader2 className="size-4 animate-spin" aria-hidden />
        ) : null}
        {CONTENT.submitLabel}
      </button>
      {status === "error" ? (
        <p className="text-xs text-red-600 sm:basis-full dark:text-red-400">
          {error}
        </p>
      ) : null}
    </form>
  )
}
