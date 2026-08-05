"use client";

import { CheckCircle2, Loader2, Mail } from "lucide-react";
import { useState, type FormEvent } from "react";

import { trackEvent } from "../../lib/analytics";
import { cn } from "../../lib/utils";

type Status = "idle" | "loading" | "success" | "error";

export function NewsletterForm({ className }: { className?: string }) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setError("");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = (await res.json()) as { error?: string };
      if (!res.ok) throw new Error(data.error ?? "Failed to subscribe");
      setStatus("success");
      setEmail("");
      trackEvent("newsletter_subscribe", { source: "form" });
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Something went wrong");
    }
  };

  if (status === "success") {
    return (
      <div
        className={cn(
          "flex items-center gap-2 text-sm text-emerald-600 dark:text-emerald-400",
          className,
        )}
      >
        <CheckCircle2 className="size-4" />
        <span>You&rsquo;re on the list - thanks!</span>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      className={cn("flex flex-col gap-2 sm:flex-row", className)}
    >
      <div className="relative min-w-0 flex-1">
        <Mail className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@company.com"
          disabled={status === "loading"}
          className={cn(
            "w-full border border-border-subtle bg-background py-2.5 pr-4 pl-9 text-base text-foreground sm:text-sm",
            "placeholder:text-muted-foreground/60",
            "focus:border-ring focus:outline-none focus:ring-2 focus:ring-ring/20",
            "disabled:opacity-60",
          )}
          aria-label="Email for newsletter"
        />
      </div>
      <button
        type="submit"
        disabled={status === "loading"}
        className="ms-cta shrink-0 disabled:opacity-60"
      >
        {status === "loading" ? (
          <Loader2 className="size-4 animate-spin" />
        ) : null}
        Subscribe
      </button>
      {status === "error" ? (
        <p className="text-xs text-destructive sm:basis-full">{error}</p>
      ) : null}
    </form>
  );
}
