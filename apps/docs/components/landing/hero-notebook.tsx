"use client"

/**
 * Landing artifact pair (sketch concept):
 * 1) Install scrap — init → registry → add (three lines) + click-to-copy
 * 2) Claim scrap — Host APIs + BYOK, hanging below on a chalk fork
 */

import * as React from "react"
import { Check, Copy } from "lucide-react"

const installLines = [
  {
    label: "1 · init",
    cmd: "npx shadcn@latest init",
    accent: null,
  },
  {
    label: "2 · registry",
    cmd: "npx shadcn@latest registry add @atroui=https://www.atroui.com/r/{name}.json",
    accent: "@atroui=https://www.atroui.com/r/{name}.json",
  },
  {
    label: "3 · add",
    cmd: "npx shadcn@latest add @atroui/home-hero",
    accent: "@atroui/home-hero",
  },
] as const

const allInstallCmds = installLines.map((l) => l.cmd).join("\n")

function InstallCmd({
  cmd,
  accent,
}: {
  cmd: string
  accent: string | null
}) {
  if (!accent || !cmd.includes(accent)) {
    return <>{cmd}</>
  }
  const [before, after] = cmd.split(accent)
  return (
    <>
      {before}
      <span className="text-sky-100">{accent}</span>
      {after}
    </>
  )
}

function CopyButton({
  text,
  label,
  compact,
}: {
  text: string
  label: string
  compact?: boolean
}) {
  const [copied, setCopied] = React.useState(false)

  async function copy() {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 2000)
    } catch {
      /* ignore */
    }
  }

  return (
    <button
      type="button"
      onClick={copy}
      aria-label={copied ? "Copied" : label}
      className={
        compact
          ? "inline-flex size-7 shrink-0 items-center justify-center rounded-md border border-sky-300/30 bg-sky-500/10 text-sky-100/80 transition-colors hover:border-sky-300/50 hover:bg-sky-500/20 hover:text-white"
          : "inline-flex h-7 items-center gap-1.5 rounded-full border border-sky-300/30 bg-sky-500/10 px-2.5 font-mono text-[10px] tracking-[0.08em] text-sky-100/80 uppercase transition-colors hover:border-sky-300/50 hover:bg-sky-500/20 hover:text-white"
      }
    >
      {copied ? (
        <Check className="size-3.5" aria-hidden />
      ) : (
        <Copy className="size-3.5" aria-hidden />
      )}
      {compact ? null : copied ? "Copied" : "Copy all"}
    </button>
  )
}

export function HeroNotebook({ className }: { className?: string }) {
  return (
    <div
      className={[
        "landing-hero-artifact relative flex w-full max-w-md shrink-0 flex-col",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {/* ── 1. Install scrap ── */}
      <aside
        className="landing-hero-notebook relative w-full"
        aria-label="Install · three lines"
      >
        <div className="relative flex flex-col gap-3 px-4 py-4 sm:gap-3.5 sm:px-5 sm:py-5">
          <div className="flex items-center justify-between gap-3">
            <p className="ds-sketch rotate-[-1deg] text-base text-[color:var(--ds-cyan,#92dbe0)]">
              install · three lines
            </p>
            <CopyButton
              text={allInstallCmds}
              label="Copy all install commands"
            />
          </div>

          <div className="flex flex-col gap-2.5">
            {installLines.map((item) => (
              <div key={item.label} className="landing-hero-altitude">
                <div className="flex items-center justify-between gap-2">
                  <p className="font-mono text-[10px] tracking-[0.14em] text-sky-200/70 uppercase">
                    {item.label}
                  </p>
                  <CopyButton
                    text={item.cmd}
                    label={`Copy ${item.label} command`}
                    compact
                  />
                </div>
                <p className="mt-1.5 break-all font-mono text-[11.5px] leading-relaxed text-white sm:text-[12.5px]">
                  <span className="text-[color:var(--ds-cyan,#92dbe0)]">$</span>{" "}
                  <InstallCmd cmd={item.cmd} accent={item.accent} />
                </p>
              </div>
            ))}
          </div>

          <p className="font-mono text-[11px] text-sky-100/70">
            <span className="text-sky-200/80">#</span> edit{" "}
            <code className="rounded-full border border-sky-300/35 bg-sky-500/20 px-1.5 py-0.5 text-sky-50">
              CONTENT
            </code>{" "}
            · own the files
          </p>
        </div>

        <PencilMark />
      </aside>

      {/* Chalk fork — install hangs down into the claim */}
      <svg
        className="landing-hero-fork mx-auto -my-0.5 h-12 w-20 shrink-0"
        viewBox="0 0 80 48"
        fill="none"
        aria-hidden
      >
        <path
          d="M40 2 V18"
          stroke="currentColor"
          strokeWidth="2.4"
          strokeLinecap="round"
          strokeDasharray="4 5"
        />
        <path
          d="M40 18 C30 28, 16 34, 10 46"
          stroke="currentColor"
          strokeWidth="2.4"
          strokeLinecap="round"
          strokeDasharray="4 5"
        />
        <path
          d="M40 18 C50 28, 64 34, 70 46"
          stroke="currentColor"
          strokeWidth="2.4"
          strokeLinecap="round"
          strokeDasharray="4 5"
        />
        <circle cx="40" cy="18" r="2.5" fill="currentColor" opacity="0.9" />
        <circle cx="10" cy="46" r="2.2" fill="currentColor" opacity="0.85" />
        <circle cx="70" cy="46" r="2.2" fill="currentColor" opacity="0.85" />
      </svg>

      {/* ── 2. Claim scrap — Host APIs + BYOK ── */}
      <aside
        className="landing-hero-claim relative w-full"
        aria-label="Host APIs and bring your own keys"
      >
        <div className="relative px-4 py-4 sm:px-5 sm:py-5">
          <p className="font-mono text-[10px] tracking-[0.14em] text-sky-200/75 uppercase">
            Host APIs · BYOK
          </p>
          <p className="ds-sketch mt-2 rotate-[0.5deg] text-[1.2rem] leading-[1.2] text-white sm:text-[1.35rem]">
            Borrow the boring security.
            <br />
            <span className="ds-sketch-accent">Bring your own keys.</span>
          </p>
          <p className="mt-3 max-w-[34ch] font-mono text-[11px] leading-snug text-sky-100/75">
            Forms + AI on <span className="text-white">your</span> Next.js host.
            AtroUI never holds Resend, SMTP, or model keys.
          </p>
        </div>
      </aside>
    </div>
  )
}

function PencilMark() {
  return (
    <svg
      className="landing-hero-pencil pointer-events-none absolute -top-3 -right-2 h-10 w-10 text-neutral-300 sm:-top-4 sm:-right-3 sm:h-12 sm:w-12"
      viewBox="0 0 48 48"
      fill="none"
      aria-hidden
    >
      <path
        d="M8 40 L28 8 C30 5, 34 6, 35 9 L40 28"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M28 8 L34 11"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <path d="M8 40 L14 38 L12 34 Z" fill="currentColor" opacity="0.85" />
      <path
        d="M36 22 L42 36"
        stroke="#92dbe0"
        strokeWidth="1.6"
        strokeLinecap="round"
        opacity="0.7"
      />
    </svg>
  )
}

/** Dashed chalk path — stamp → couplet → notebook. Decorative only. */
export function HeroChalkConnector() {
  return (
    <svg
      className="landing-hero-connector pointer-events-none absolute inset-0 hidden h-full w-full lg:block"
      viewBox="0 0 1000 420"
      preserveAspectRatio="none"
      fill="none"
      aria-hidden
    >
      <path
        className="landing-hero-connector-path"
        pathLength={1}
        d="M120 48 C200 40, 280 90, 340 70 S480 30, 560 90 S720 200, 820 160 S900 140, 880 220"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle
        className="landing-hero-connector-end"
        cx="880"
        cy="220"
        r="5"
        stroke="currentColor"
        strokeWidth="1.5"
        fill="none"
      />
    </svg>
  )
}
