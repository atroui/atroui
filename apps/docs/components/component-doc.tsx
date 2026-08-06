import Link from "next/link"
import { CodeBlock } from "@/components/code-block"
import { DocsExample } from "@/components/docs-example"
import { DocsPager } from "@/components/docs-pager"
import { PropsTable, type PropRow } from "@/components/props-table"
import {
  findNavContext,
  type DocKind,
} from "@/lib/navigation"

interface ComponentDocProps {
  title: string
  description: string
  preview: React.ReactNode
  code: string
  props?: PropRow[]
  usage?: React.ReactNode
  extra?: React.ReactNode
  fullBleed?: boolean
  /** Current docs path - drives kind stamp + prev/next pager */
  href?: string
  /** Override stamp when href is omitted */
  kind?: DocKind
  /** Registry item name, e.g. "home-hero" → npx shadcn add @atroui/home-hero */
  registryName?: string
  /** Override the install command block entirely */
  installation?: string
}

export function ComponentDoc({
  title,
  description,
  preview,
  code,
  props,
  usage,
  extra,
  fullBleed,
  href,
  kind: kindProp,
  registryName,
  installation,
}: ComponentDocProps) {
  const nav = href ? findNavContext(href) : null
  const kind = kindProp ?? nav?.kind ?? "Primitive"
  const inRegistry = Boolean(registryName)
  const installCmd =
    installation ??
    (registryName ? `npx shadcn@latest add @atroui/${registryName}` : null)

  return (
    <article
      className={
        fullBleed
          ? "mx-auto w-full max-w-6xl space-y-6 sm:space-y-8"
          : "mx-auto w-full max-w-3xl space-y-6 sm:space-y-8"
      }
    >
      <header className="space-y-2 sm:space-y-3">
        <div className="flex flex-wrap items-center gap-2">
          <p className="ms-stamp">{kind}</p>
          {inRegistry ? (
            <span className="rounded-full border border-brand/30 bg-brand/10 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-[0.06em] text-brand">
              CLI registry
            </span>
          ) : null}
        </div>
        <h1 className="ds-display text-2xl text-foreground sm:text-3xl md:text-4xl">
          {title}
        </h1>
        <p className="max-w-2xl text-[14px] leading-relaxed text-muted-foreground sm:text-[15px]">
          {description}
        </p>
      </header>

      <DocsExample preview={preview} code={code} fullBleed={fullBleed} />

      <section className="space-y-3">
        <h2 className="ds-headline text-base text-foreground">Installation</h2>
        {installCmd ? (
          <>
            <CodeBlock language="bash" code={installCmd} />
            <p className="text-[13px] text-muted-foreground">
              Source lands in your repo. Setup:{" "}
              <Link href="/docs/installation" className="bam-link">
                Installation
              </Link>
              {" · "}
              <Link href="/docs/registry" className="bam-link">
                Registry catalog
              </Link>
              .
            </p>
          </>
        ) : (
          <div className="space-y-2 rounded-2xl border border-border-subtle bg-muted/30 px-4 py-3">
            <p className="text-[14px] leading-relaxed text-muted-foreground">
              Not in the CLI registry yet. This page documents the live catalog
              component. Prefer registry blocks when you want owned source via{" "}
              <Link href="/docs/registry" className="bam-link">
                shadcn add @atroui/…
              </Link>
              .
            </p>
          </div>
        )}
      </section>

      {usage ? (
        <section className="space-y-3">
          <h2 className="ds-headline text-base text-foreground">Usage</h2>
          <div className="text-[15px] leading-relaxed text-muted-foreground">
            {usage}
          </div>
        </section>
      ) : null}

      {props && props.length > 0 ? (
        <section className="space-y-3">
          <h2 className="ds-headline text-base text-foreground">API Reference</h2>
          <PropsTable data={props} />
        </section>
      ) : null}

      {extra}

      {href ? <DocsPager href={href} /> : null}
    </article>
  )
}
