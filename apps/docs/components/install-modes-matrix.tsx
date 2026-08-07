import Link from "next/link"

/** Canonical three-row install matrix — keep identical across Host API + Installation. */
export function InstallModesMatrix({
  showCanonicalLink = false,
}: {
  showCanonicalLink?: boolean
}) {
  return (
    <div className="space-y-3">
      <p className="text-[15px] leading-relaxed text-muted-foreground">
        Never lead with{" "}
        <code className="rounded-md bg-muted px-1.5 py-0.5 font-mono text-[12px] text-foreground">
          npm i atroui
        </code>{" "}
        for pure UI. Use the CLI first; add the package only when{" "}
        <code className="rounded-md bg-muted px-1.5 py-0.5 font-mono text-[12px] text-foreground">
          /api
        </code>{" "}
        handlers appear.
      </p>
      <div className="overflow-x-auto rounded-2xl border border-border-subtle bg-card/40">
        <table className="w-full min-w-[36rem] text-left text-sm">
          <thead className="border-b border-border-subtle bg-white/[0.03]">
            <tr>
              {["Mode", "What you get", "Install"].map((label) => (
                <th
                  key={label}
                  className="px-4 py-3 text-[11px] font-semibold uppercase tracking-[0.06em] text-muted-foreground"
                >
                  {label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-border-subtle">
              <td className="px-4 py-3 align-top font-medium text-foreground">
                Registry UI only
              </td>
              <td className="px-4 py-3 align-top text-muted-foreground">
                Heroes, chrome, form UI — owned source files
              </td>
              <td className="px-4 py-3 align-top text-muted-foreground">
                <code className="font-mono text-[12px] text-foreground">
                  npx shadcn add @atroui/…
                </code>
                . No{" "}
                <code className="font-mono text-[12px] text-foreground">
                  atroui
                </code>{" "}
                package.
              </td>
            </tr>
            <tr className="border-b border-border-subtle">
              <td className="px-4 py-3 align-top font-medium text-foreground">
                Forms
              </td>
              <td className="px-4 py-3 align-top text-muted-foreground">
                Contact / waitlist / newsletter UI + hardened routes
              </td>
              <td className="px-4 py-3 align-top text-muted-foreground">
                <code className="font-mono text-[12px] text-foreground">
                  npm i atroui
                </code>
                ,{" "}
                <code className="font-mono text-[12px] text-foreground">
                  transpilePackages: [&quot;atroui&quot;]
                </code>
                , then{" "}
                <code className="font-mono text-[12px] text-foreground">
                  @atroui/contact-form
                </code>{" "}
                +{" "}
                <code className="font-mono text-[12px] text-foreground">
                  @atroui/api-contact
                </code>{" "}
                (same pattern for waitlist / newsletter).
              </td>
            </tr>
            <tr>
              <td className="px-4 py-3 align-top font-medium text-foreground">
                AI tools
              </td>
              <td className="px-4 py-3 align-top text-muted-foreground">
                OG, thumbnail, scope chat + matching APIs
              </td>
              <td className="px-4 py-3 align-top text-muted-foreground">
                Same package setup +{" "}
                <code className="font-mono text-[12px] text-foreground">
                  @atroui/og-workspace
                </code>{" "}
                /{" "}
                <code className="font-mono text-[12px] text-foreground">
                  thumbnail-workspace
                </code>{" "}
                /{" "}
                <code className="font-mono text-[12px] text-foreground">
                  scope-chat
                </code>{" "}
                +{" "}
                <code className="font-mono text-[12px] text-foreground">
                  @atroui/api-*
                </code>
                .
              </td>
            </tr>
          </tbody>
        </table>
      </div>
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
