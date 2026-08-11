"use client"

/**
 * Signature — presence-typed install (Honkish presence + Family gradual reveal).
 * One thing breathing. Reduced-motion: all lines instantly.
 */

import * as React from "react"
import { Check, Copy } from "lucide-react"
import { useReducedMotion } from "motion/react"

export const INSTALL_LINES = [
  "npx shadcn@latest init",
  "npx shadcn@latest add @atroui/home-hero",
] as const

const CHAR_MS = 22
const LINE_PAUSE_MS = 420
const START_DELAY_MS = 480

function CopyBtn({
  text,
  label,
  ready,
}: {
  text: string
  label: string
  ready: boolean
}) {
  const [copied, setCopied] = React.useState(false)

  async function copy() {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1800)
    } catch {
      /* ignore */
    }
  }

  if (!ready) {
    return <span className="inline-block size-7" aria-hidden />
  }

  return (
    <button
      type="button"
      onClick={copy}
      aria-label={copied ? "Copied" : label}
      className="inline-flex size-7 shrink-0 cursor-pointer items-center justify-center rounded-md text-white/45 transition-colors hover:bg-white/10 hover:text-white"
    >
      {copied ? (
        <Check className="size-3.5 text-[color:var(--ds-cyan,#92dbe0)]" aria-hidden />
      ) : (
        <Copy className="size-3.5" aria-hidden />
      )}
    </button>
  )
}

export function LiveInstall({ className }: { className?: string }) {
  const reduce = useReducedMotion()
  const [typed, setTyped] = React.useState<string[]>(() =>
    reduce ? [...INSTALL_LINES] : INSTALL_LINES.map(() => "")
  )
  const [activeLine, setActiveLine] = React.useState(0)
  const [done, setDone] = React.useState(() => Boolean(reduce))
  const [copiedAll, setCopiedAll] = React.useState(false)

  React.useEffect(() => {
    if (reduce) {
      setTyped([...INSTALL_LINES])
      setDone(true)
      return
    }

    let cancelled = false
    let timeoutId: ReturnType<typeof setTimeout> | undefined

    const typeLine = (lineIndex: number, charIndex: number) => {
      if (cancelled) return
      const full = INSTALL_LINES[lineIndex]!
      if (charIndex <= full.length) {
        setActiveLine(lineIndex)
        setTyped((prev) => {
          const next = [...prev]
          next[lineIndex] = full.slice(0, charIndex)
          return next
        })
        timeoutId = setTimeout(
          () => typeLine(lineIndex, charIndex + 1),
          CHAR_MS
        )
        return
      }
      if (lineIndex < INSTALL_LINES.length - 1) {
        timeoutId = setTimeout(() => typeLine(lineIndex + 1, 0), LINE_PAUSE_MS)
      } else {
        setDone(true)
      }
    }

    timeoutId = setTimeout(() => typeLine(0, 0), START_DELAY_MS)

    return () => {
      cancelled = true
      if (timeoutId) clearTimeout(timeoutId)
    }
  }, [reduce])

  async function copyAll() {
    try {
      await navigator.clipboard.writeText(INSTALL_LINES.join("\n"))
      setCopiedAll(true)
      window.setTimeout(() => setCopiedAll(false), 1800)
    } catch {
      /* ignore */
    }
  }

  return (
    <div
      className={[
        "presence-install relative w-full overflow-hidden rounded-xl border border-white/12 bg-black/70",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      aria-label="Install AtroUI"
    >
      <div className="flex items-center justify-between gap-3 border-b border-white/10 px-3.5 py-2.5 sm:px-4">
        <p className="font-mono text-[10px] tracking-[0.14em] text-white/40 uppercase">
          install · live
        </p>
        <button
          type="button"
          onClick={copyAll}
          disabled={!done}
          className="inline-flex h-7 cursor-pointer items-center gap-1.5 rounded-md px-2 font-mono text-[10px] tracking-[0.08em] text-white/50 uppercase transition-colors enabled:hover:bg-white/10 enabled:hover:text-white disabled:cursor-not-allowed disabled:opacity-30"
        >
          {copiedAll ? (
            <>
              <Check className="size-3" aria-hidden />
              Copied
            </>
          ) : (
            <>
              <Copy className="size-3" aria-hidden />
              Copy all
            </>
          )}
        </button>
      </div>

      <div className="space-y-2.5 px-3.5 py-4 font-mono text-[12px] leading-relaxed sm:px-4 sm:text-[13px]">
        {INSTALL_LINES.map((full, i) => {
          const text = typed[i] ?? ""
          const lineDone = text.length >= full.length
          const showCursor = !done && activeLine === i
          return (
            <div
              key={full}
              className="flex items-start gap-2"
              aria-live={i === activeLine ? "polite" : undefined}
            >
              <span className="shrink-0 select-none text-[color:var(--ds-cyan,#92dbe0)]">
                $
              </span>
              <p className="min-w-0 flex-1 break-all text-white/90">
                {text}
                {showCursor ? (
                  <span
                    className="presence-install-caret ml-px inline-block h-[1.05em] w-[0.55ch] translate-y-[0.12em] bg-[color:var(--ds-cyan,#92dbe0)] align-baseline"
                    aria-hidden
                  />
                ) : null}
              </p>
              <CopyBtn
                text={full}
                label={`Copy line ${i + 1}`}
                ready={lineDone}
              />
            </div>
          )
        })}
      </div>
    </div>
  )
}
