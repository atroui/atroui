"use client";

import { X } from "lucide-react";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";

import { cn } from "../../lib/utils";

const STORAGE_KEY = "makershot_exit_intent_v1";
const SESSION_KEY = "makershot_exit_intent_session";

function shouldShowPopup(): boolean {
  if (typeof window === "undefined") return false;
  if (localStorage.getItem(STORAGE_KEY)) return false;
  if (sessionStorage.getItem(SESSION_KEY)) return false;
  return true;
}

function markShown() {
  sessionStorage.setItem(SESSION_KEY, "1");
}

function markDismissed() {
  localStorage.setItem(STORAGE_KEY, "dismissed");
  sessionStorage.setItem(SESSION_KEY, "1");
}

export function ExitIntentPopup() {
  const [open, setOpen] = useState(false);
  const dialogRef = useRef<HTMLDivElement>(null);
  const triggered = useRef(false);

  const close = useCallback(() => {
    setOpen(false);
    markDismissed();
  }, []);

  useEffect(() => {
    if (!shouldShowPopup()) return;

    const onMouseLeave = (e: MouseEvent) => {
      if (triggered.current) return;
      if (e.clientY > 12) return;
      if (!shouldShowPopup()) return;
      triggered.current = true;
      markShown();
      setOpen(true);
    };

    document.documentElement.addEventListener("mouseleave", onMouseLeave);
    return () =>
      document.documentElement.removeEventListener("mouseleave", onMouseLeave);
  }, []);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };

    document.addEventListener("keydown", onKeyDown);
    dialogRef.current?.focus();

    const focusable = dialogRef.current?.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
    );
    const first = focusable?.[0];
    const last = focusable?.[focusable.length - 1];

    const trapFocus = (e: KeyboardEvent) => {
      if (e.key !== "Tab" || !first || !last) return;
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", trapFocus);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("keydown", trapFocus);
    };
  }, [open, close]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-90 flex items-center justify-center p-4"
      role="presentation"
    >
      <button
        type="button"
        aria-label="Close dialog"
        className="absolute inset-0 bg-background/70 backdrop-blur-sm"
        onClick={close}
      />
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="exit-intent-title"
        tabIndex={-1}
        className={cn(
          "relative z-10 w-full max-w-md border border-border-subtle bg-background p-6 shadow-[0_24px_64px_-28px_color-mix(in_oklch,var(--foreground)_40%,transparent)] sm:p-7",
          "motion-safe:animate-in motion-safe:fade-in motion-safe:zoom-in-95 motion-safe:duration-200",
        )}
      >
        <button
          type="button"
          onClick={close}
          aria-label="Dismiss"
          className="absolute top-4 right-4 inline-flex size-9 items-center justify-center border border-border-subtle text-muted-foreground hover:bg-muted hover:text-foreground"
        >
          <X className="size-4" />
        </button>
        <p className="ms-stamp">Before you go</p>
        <h2
          id="exit-intent-title"
          className="ds-headline mt-4 text-2xl text-foreground"
        >
          Free 7-day MVP scoping
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
          Not sure what to build first? Book a no-pressure scoping call —
          we&apos;ll map scope, timeline, and budget in one session.
        </p>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <Link
            href="/scope"
            onClick={() => {
              localStorage.setItem(STORAGE_KEY, "converted");
              sessionStorage.setItem(SESSION_KEY, "1");
            }}
            className="ms-cta flex-1 justify-center"
          >
            Start free scoping
          </Link>
          <button
            type="button"
            onClick={close}
            className="ms-cta-ghost flex-1 justify-center border border-border-subtle px-4 py-2.5"
          >
            Maybe later
          </button>
        </div>
      </div>
    </div>
  );
}
