"use client"

import { Bot, Loader2, Send, User } from "lucide-react"
import { useState, type FormEvent } from "react"

import { cn } from "@/lib/utils"

/**
 * Scope chat UI shell. Wire CONTENT.endpoint to your AI host API.
 */
const CONTENT = {
  endpoint: "/api/scope",
  placeholder: "Describe the product you want to ship…",
  emptyHint: "Ask for a fixed-scope plan. Host API required for replies.",
  maxMessages: 40,
}

type Msg = { role: "user" | "assistant"; content: string }

export function ScopeChat() {
  const [messages, setMessages] = useState<Msg[]>([])
  const [input, setInput] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function onSubmit(e: FormEvent) {
    e.preventDefault()
    const text = input.trim()
    if (!text || loading) return
    setInput("")
    setError(null)
    const next: Msg[] = [...messages, { role: "user", content: text }].slice(
      -CONTENT.maxMessages
    )
    setMessages(next)
    setLoading(true)
    try {
      const res = await fetch(CONTENT.endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: next }),
      })
      if (!res.ok) throw new Error(`Request failed (${res.status})`)
      const data = (await res.json()) as { reply?: string }
      setMessages((m) =>
        [
          ...m,
          {
            role: "assistant" as const,
            content: data.reply ?? "No reply from host API.",
          },
        ].slice(-CONTENT.maxMessages)
      )
    } catch (err) {
      setError(err instanceof Error ? err.message : "Request failed")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-[420px] flex-col overflow-hidden rounded-2xl border border-border-subtle bg-card/40">
      <div className="border-b border-border-subtle px-4 py-3">
        <p className="ms-stamp">Scope chat</p>
        <p className="mt-1 text-xs text-muted-foreground">{CONTENT.emptyHint}</p>
      </div>
      <div className="flex-1 space-y-3 overflow-y-auto p-4">
        {messages.length === 0 ? (
          <p className="text-sm text-muted-foreground">{CONTENT.placeholder}</p>
        ) : (
          messages.map((m, i) => (
            <div
              key={`${m.role}-${i}`}
              className={cn(
                "flex gap-2 text-sm",
                m.role === "user" ? "justify-end" : "justify-start"
              )}
            >
              {m.role === "assistant" ? (
                <Bot className="mt-0.5 size-4 shrink-0 text-brand" />
              ) : null}
              <p
                className={cn(
                  "max-w-[85%] rounded-2xl px-3 py-2",
                  m.role === "user"
                    ? "bg-brand text-white"
                    : "border border-border-subtle bg-background"
                )}
              >
                {m.content}
              </p>
              {m.role === "user" ? (
                <User className="mt-0.5 size-4 shrink-0 text-muted-foreground" />
              ) : null}
            </div>
          ))
        )}
        {error ? <p className="text-sm text-destructive">{error}</p> : null}
      </div>
      <form
        onSubmit={onSubmit}
        className="flex gap-2 border-t border-border-subtle p-3"
      >
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={CONTENT.placeholder}
          className="min-w-0 flex-1 rounded-lg border border-border-subtle bg-background px-4 py-2 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
        />
        <button
          type="submit"
          disabled={loading}
          className="inline-flex size-10 items-center justify-center rounded-lg bg-brand text-white disabled:opacity-60"
          aria-label="Send"
        >
          {loading ? (
            <Loader2 className="size-4 animate-spin" />
          ) : (
            <Send className="size-4" />
          )}
        </button>
      </form>
    </div>
  )
}
