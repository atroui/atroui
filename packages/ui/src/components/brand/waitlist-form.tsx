"use client";

import { useState } from "react";
import { ArrowRight, Loader2, CheckCircle2 } from "lucide-react";
import { cn } from "../../lib/utils";

export function WaitlistForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;

    setStatus("loading");

    try {
      const response = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, source: "og-pro-pricing" }),
      });

      const data = await response.json();

      if (!response.ok) throw new Error(data.error || "Something went wrong");

      setStatus("success");
      setMessage("You're on the list. We'll reach out soon.");
      setEmail("");
    } catch (err) {
      setStatus("error");
      setMessage(
        err instanceof Error ? err.message : "Failed to join waitlist",
      );
    }
  }

  if (status === "success") {
    return (
      <div className="flex items-start gap-3 border border-emerald-500/25 bg-emerald-500/5 px-4 py-3 text-sm font-medium text-emerald-700 dark:text-emerald-400">
        <CheckCircle2 className="mt-0.5 size-4 shrink-0" />
        <p>{message}</p>
      </div>
    );
  }

  return (
    <div>
      <form onSubmit={handleSubmit} className="space-y-3">
        <label htmlFor="pro-waitlist-email" className="ds-mono-label">
          Email
        </label>
        <input
          id="pro-waitlist-email"
          type="email"
          required
          placeholder="you@company.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={status === "loading"}
          className={cn(
            "w-full border border-border-subtle bg-background px-3.5 py-2.5 text-base text-foreground sm:text-sm",
            "placeholder:text-muted-foreground/60",
            "focus:border-ring focus:outline-none focus:ring-2 focus:ring-ring/20",
            "disabled:cursor-not-allowed disabled:opacity-60",
            status === "error" &&
              "border-destructive/50 focus:border-destructive/50 focus:ring-destructive/10",
          )}
        />
        <button
          type="submit"
          disabled={status === "loading"}
          className="ms-cta w-full justify-center disabled:opacity-50"
        >
          {status === "loading" ? (
            <Loader2 className="size-4 animate-spin" />
          ) : (
            <>
              Join waitlist
              <ArrowRight className="size-4" aria-hidden />
            </>
          )}
        </button>
      </form>
      {status === "error" ? (
        <p className="mt-3 text-xs font-medium text-destructive">{message}</p>
      ) : null}
      <p className="mt-3 text-[11px] text-muted-foreground">
        Zero spam. Early-bird invite + discount when Pro opens.
      </p>
    </div>
  );
}
