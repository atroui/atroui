"use client";

import { Bot, Loader2, Send, User } from "lucide-react";
import Link from "next/link";
import { useRef, useState, type FormEvent } from "react";

import { trackEvent } from "../../lib/analytics";
import type { ScopeMessage } from "../../lib/scope-chat";
import { cn } from "../../lib/utils";

const STARTER: ScopeMessage = {
  role: "assistant",
  content:
    "Hi! I'm the scoping assistant. Tell me what you're building — MVP, AI feature, design system, or full product — and I'll recommend the right package and ballpark.",
};

function renderContent(text: string) {
  const parts = text.split(/(\[[^\]]+\]\([^)]+\))/g);
  return parts.map((part, i) => {
    const linkMatch = part.match(/\[([^\]]+)\]\(([^)]+)\)/);
    if (linkMatch) {
      const label = linkMatch[1]!;
      const href = linkMatch[2]!;
      return (
        <Link key={i} href={href} className="text-brand underline underline-offset-2">
          {label}
        </Link>
      );
    }
    return <span key={i}>{part}</span>;
  });
}

export function ScopeChat() {
  const [messages, setMessages] = useState<ScopeMessage[]>([STARTER]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  const send = async (text: string) => {
    if (!text.trim() || loading) return;
    const userMsg: ScopeMessage = { role: "user", content: text.trim() };
    const next = [...messages, userMsg];
    setMessages(next);
    setInput("");
    setLoading(true);
    trackEvent("scope_chat_message", { length: text.length });

    try {
      const res = await fetch("/api/scope", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: next }),
      });
      const data = (await res.json()) as { reply?: string; source?: string };
      setMessages((m) => [
        ...m,
        { role: "assistant", content: data.reply ?? "Sorry, I couldn't process that. Try the project planner instead." },
      ]);
      trackEvent("scope_chat_reply", { source: data.source ?? "unknown" });
    } catch {
      setMessages((m) => [
        ...m,
        { role: "assistant", content: "Something went wrong. Try the project planner or contact form instead." },
      ]);
    } finally {
      setLoading(false);
      setTimeout(() => bottomRef.current?.scrollIntoView({ behavior: "smooth" }), 100);
    }
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    send(input);
  };

  return (
    <div className="flex h-[min(560px,70vh)] flex-col border border-border-subtle bg-surface">
      <div className="flex-1 space-y-4 overflow-y-auto p-5">
        {messages.map((m, i) => (
          <div
            key={i}
            className={cn("flex gap-3", m.role === "user" ? "flex-row-reverse" : "")}
          >
            <div
              className={cn(
                "flex size-8 shrink-0 items-center justify-center border border-border-subtle",
                m.role === "user" ? "bg-foreground text-background" : "bg-brand/10 text-brand"
              )}
            >
              {m.role === "user" ? <User className="size-4" /> : <Bot className="size-4" />}
            </div>
            <div
              className={cn(
                "max-w-[85%] border border-border-subtle px-4 py-3 text-sm leading-relaxed",
                m.role === "user"
                  ? "bg-foreground text-background"
                  : "bg-background text-foreground/90"
              )}
            >
              {renderContent(m.content)}
            </div>
          </div>
        ))}
        {loading ? (
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Loader2 className="size-3.5 animate-spin" />
            Thinking…
          </div>
        ) : null}
        <div ref={bottomRef} />
      </div>

      <form onSubmit={onSubmit} className="border-t border-border-subtle p-4">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Describe your project…"
            disabled={loading}
            className="min-w-0 flex-1 border border-border bg-background px-4 py-2.5 text-sm focus:border-ring focus:outline-none focus:ring-2 focus:ring-ring/25 disabled:opacity-60"
            aria-label="Message"
          />
          <button
            type="submit"
            disabled={loading || !input.trim()}
            className="ms-cta size-10 shrink-0 !rounded-none !px-0 disabled:opacity-50"
            aria-label="Send"
          >
            <Send className="size-4" />
          </button>
        </div>
        <p className="mt-2 text-center text-[10px] text-muted-foreground">
          AI-assisted when configured · rule-based fallback always available
        </p>
      </form>
    </div>
  );
}
