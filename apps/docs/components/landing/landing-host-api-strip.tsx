"use client"

/**
 * Host API BYOK strip — one idea: keys stay in your env.
 * Family Values 1: toggle reveals 200 vs 503; fundamentals stay visible.
 * Family Values 2: panel swap morphs, no teleport.
 */

import * as React from "react"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { useReducedMotion } from "motion/react"
import { TransitionPanel } from "atroui"
import { InstallCommandChip } from "@/components/install-command-chip"
import { LandingSectionHeader } from "@/components/landing/landing-section-header"
import { captureHostApiViewed } from "@/lib/analytics-capture"
import { cn } from "@/lib/utils"

const WAITLIST_INSTALL = "npx shadcn@latest add @atroui/waitlist-form"

type KeyMode = "with" | "without"

const BEATS = [
  {
    label: "Own the UI",
    body: "Registry copies waitlist UI + route into your repo.",
  },
  {
    label: "Borrow the security",
    body: "Rate limits, honeypot, size caps — already in the handler.",
  },
  {
    label: "Bring your keys",
    body: "Resend / SMTP / AI stay in your .env. We never hold them.",
  },
] as const

export function LandingHostApiStrip() {
  const reduce = useReducedMotion()
  const [mode, setMode] = React.useState<KeyMode>("with")

  React.useEffect(() => {
    captureHostApiViewed("homepage_strip")
  }, [])

  return (
    <section className="atro-section" aria-labelledby="host-api-strip-title">
      <div className="atro-section-inner">
        <LandingSectionHeader
          variant="product"
          align="left"
          eyebrow="Host APIs"
          title={
            <span id="host-api-strip-title">
              Keys in your env. Not ours.
            </span>
          }
          lede="Own the UI in your repo. Borrow the boring API security. Bring your own keys. Missing keys return 503 — we do not run paid AI or mail on atroui.com."
          action={
            <Link href="/docs/host-api" className="atro-btn">
              Host API docs
              <ArrowRight className="size-3.5" aria-hidden />
            </Link>
          }
        />

        <ul className="host-api-beats" role="list">
          {BEATS.map((beat) => (
            <li key={beat.label} className="host-api-beat">
              <p className="host-api-beat-label">{beat.label}</p>
              <p className="host-api-beat-body">{beat.body}</p>
            </li>
          ))}
        </ul>

        <div className="host-api-stage">
          <div className="host-api-stage-copy">
            <p className="ds-eyebrow">Proof</p>
            <h3 className="ds-headline text-foreground mt-2">
              Flip the keys
            </h3>
            <p className="ds-body mt-3 max-w-prose">
              Same route. Your project. With{" "}
              <code className="host-api-code">RESEND_API_KEY</code> it sends.
              Without it, the handler fails closed.
            </p>

            <div
              role="radiogroup"
              aria-label="API keys present"
              className="host-api-toggle"
            >
              {(
                [
                  { id: "with", label: "Keys set" },
                  { id: "without", label: "Keys missing" },
                ] as const
              ).map((option) => {
                const selected = mode === option.id
                return (
                  <button
                    key={option.id}
                    type="button"
                    role="radio"
                    aria-checked={selected}
                    onClick={() => setMode(option.id)}
                    className={cn(
                      "host-api-toggle-btn",
                      selected && "host-api-toggle-btn--active"
                    )}
                  >
                    {option.label}
                  </button>
                )
              })}
            </div>

            <div className="mt-5 max-w-md">
              <InstallCommandChip
                command={WAITLIST_INSTALL}
                source="homepage_host_api_strip"
              />
            </div>
            <Link href="/docs/host-api" className="atro-btn-ghost mt-4">
              Wire Host APIs
              <ArrowRight className="size-3.5" aria-hidden />
            </Link>
          </div>

          <div className="host-api-stage-proof">
            {reduce ? (
              <ProofPanel mode={mode} />
            ) : (
              <TransitionPanel activeKey={mode} className="host-api-swap">
                {(key) => <ProofPanel mode={key as KeyMode} />}
              </TransitionPanel>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

function ProofPanel({ mode }: { mode: KeyMode }) {
  const withKeys = mode === "with"

  return (
    <div className="jw-proof" aria-live="polite">
      <div className="jw-proof-bar">
        <span className="jw-proof-label">
          {withKeys ? ".env.local · keys set" : ".env.local · keys missing"}
        </span>
      </div>
      <div className="jw-proof-body jw-proof-mono">
        {withKeys ? (
          <>
            <p>
              <span className="jw-proof-key">RESEND_API_KEY</span>
              <span className="jw-proof-dim">=</span>
              <span className="jw-proof-mask">re_••••••••</span>
            </p>
            <p className="mt-3">
              <span className="jw-proof-dim">POST</span>{" "}
              <span className="jw-proof-val">/api/waitlist</span>
            </p>
            <p className="jw-proof-ok mt-2">→ 200 · mailed via your Resend</p>
          </>
        ) : (
          <>
            <p>
              <span className="jw-proof-key">RESEND_API_KEY</span>
              <span className="jw-proof-dim">=</span>
              <span className="jw-proof-dim">{"<unset>"}</span>
            </p>
            <p className="mt-3">
              <span className="jw-proof-dim">POST</span>{" "}
              <span className="jw-proof-val">/api/waitlist</span>
            </p>
            <p className="jw-proof-fail mt-2">
              → 503 · Service Unavailable
            </p>
            <p className="jw-proof-dim mt-2 text-[0.6875rem]">
              Fail closed. No AtroUI-hosted send.
            </p>
          </>
        )}
      </div>
    </div>
  )
}
