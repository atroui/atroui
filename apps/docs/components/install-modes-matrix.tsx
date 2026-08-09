"use client"

import Link from "next/link"
import { DocsTrayStack } from "@/components/docs-tray"

const code = (text: string) => (
  <code className="rounded-md bg-muted px-1.5 py-0.5 font-mono text-[12px] text-foreground">
    {text}
  </code>
)

/**
 * Install modes: gradual revelation (one mode at a time) instead of a dense table.
 * Same three modes as before: Registry UI → Forms → AI tools.
 */
export function InstallModesMatrix({
  showCanonicalLink = false,
}: {
  showCanonicalLink?: boolean
}) {
  return (
    <div className="space-y-3">
      <p className="text-[15px] leading-relaxed text-muted-foreground">
        Never lead with {code("npm i atroui")} for pure UI. Use a registry CLI
        first ({code("npx @atroui/cli add")} or {code("npx shadcn add @atroui/…")});
        add the package only when {code("/api")} handlers appear.
      </p>

      <DocsTrayStack
        steps={[
          {
            title: "Registry UI only",
            summary: "Heroes, chrome, form UI. Owned source files. No npm package.",
            children: (
              <p className="text-[15px] leading-relaxed text-muted-foreground">
                Install with {code("npx @atroui/cli add …")} or{" "}
                {code("npx shadcn add @atroui/…")}. Source lands in your repo. No{" "}
                {code("atroui")} package required.
              </p>
            ),
          },
          {
            title: "Forms",
            summary: "Contact / waitlist / newsletter UI + hardened Host API routes.",
            children: (
              <p className="text-[15px] leading-relaxed text-muted-foreground">
                {code("npm i atroui")},{" "}
                {code('transpilePackages: ["atroui"]')}, then{" "}
                {code("@atroui/contact-form")} + {code("@atroui/api-contact")}{" "}
                (same pattern for waitlist / newsletter). Your keys stay in your
                env.
              </p>
            ),
          },
          {
            title: "AI tools",
            summary: "OG, thumbnail, scope chat + matching APIs.",
            children: (
              <p className="text-[15px] leading-relaxed text-muted-foreground">
                Same package setup + {code("@atroui/og-workspace")} /{" "}
                {code("thumbnail-workspace")} / {code("scope-chat")} +{" "}
                {code("@atroui/api-*")}.
              </p>
            ),
          },
        ]}
      />

      {showCanonicalLink ? (
        <p className="text-[15px] leading-relaxed text-muted-foreground">
          Full Host API guide (env, security, rate limits):{" "}
          <Link href="/docs/host-api" className="bam-link">
            Host APIs
          </Link>
          .
        </p>
      ) : null}
    </div>
  )
}
