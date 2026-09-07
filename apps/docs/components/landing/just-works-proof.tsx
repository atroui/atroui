import { cn } from "@/lib/utils"

export type JustWorksProofId = "registry" | "host-api" | "blocks" | "identity"

/** Static proof UI per Just Works tab — demonstrates, does not decorate. */
export function JustWorksProof({
  id,
  className,
}: {
  id: JustWorksProofId
  className?: string
}) {
  return (
    <div className={cn("jw-proof", className)} aria-hidden>
      {id === "registry" ? <RegistryProof /> : null}
      {id === "host-api" ? <HostApiProof /> : null}
      {id === "blocks" ? <BlocksProof /> : null}
      {id === "identity" ? <IdentityProof /> : null}
    </div>
  )
}

function RegistryProof() {
  return (
    <>
      <div className="jw-proof-bar">
        <span className="jw-proof-label">Terminal</span>
      </div>
      <div className="jw-proof-body jw-proof-mono">
        <p>
          <span className="jw-proof-dim">$</span> npx shadcn@latest add @atroui/waitlist-form
        </p>
        <p className="jw-proof-ok">✓ Copied components/waitlist-form.tsx</p>
        <p className="jw-proof-ok">✓ Copied app/api/waitlist/route.ts</p>
      </div>
    </>
  )
}

function HostApiProof() {
  return (
    <>
      <div className="jw-proof-bar">
        <span className="jw-proof-label">.env.local</span>
      </div>
      <div className="jw-proof-body jw-proof-mono">
        <p>
          <span className="jw-proof-key">RESEND_API_KEY</span>
          <span className="jw-proof-dim">=</span>
          <span className="jw-proof-mask">re_••••••••</span>
        </p>
        <p className="mt-3">
          <span className="jw-proof-dim">POST</span>{" "}
          <span className="jw-proof-val">/api/waitlist</span>
        </p>
        <p className="jw-proof-dim mt-2 text-[0.6875rem]">→ 200 · sent via your Resend project</p>
      </div>
    </>
  )
}

function BlocksProof() {
  return (
    <>
      <div className="jw-proof-bar">
        <span className="jw-proof-label">home-hero.tsx</span>
      </div>
      <div className="jw-proof-body jw-proof-mono">
        <p>
          <span className="jw-proof-hl">const CONTENT</span> = {"{"}
        </p>
        <p className="pl-3">
          title: <span className="jw-proof-str">"Ship faster."</span>,
        </p>
        <p className="pl-3">
          lede: <span className="jw-proof-str">"Own every line."</span>,
        </p>
        <p>{"}"}</p>
        <p className="jw-proof-dim mt-2 text-[0.6875rem]">Edit CONTENT — structure stays production-shaped.</p>
      </div>
    </>
  )
}

function IdentityProof() {
  return (
    <>
      <div className="jw-proof-bar">
        <span className="jw-proof-label">brand.ts</span>
      </div>
      <div className="jw-proof-body jw-proof-mono">
        <p>
          <span className="jw-proof-key">export const brand</span> = {"{"}
        </p>
        <p className="pl-3">
          name: <span className="jw-proof-str">"Acme"</span>,
        </p>
        <p className="pl-3">
          url: <span className="jw-proof-str">"https://acme.dev"</span>,
        </p>
        <p>{"}"}</p>
        <p className="mt-3 jw-proof-dim text-[0.6875rem]">+ JSON-LD · sitemap · OG defaults</p>
      </div>
    </>
  )
}
