import Link from "next/link"
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

function DocStep({
  n,
  label,
  children,
}: {
  n: string
  label: string
  children: React.ReactNode
}) {
  return (
    <section className="space-y-3">
      <div className="flex items-baseline gap-2.5">
        <span className="font-mono text-[11px] tracking-[0.12em] text-brand/80">
          {n}
        </span>
        <h2 className="ds-headline text-base text-foreground">{label}</h2>
      </div>
      {children}
    </section>
  )
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
  const isHostApi = nav?.item.badge === "host-api"
  const installCmd =
    installation ??
    (registryName ? `npx shadcn@latest add @atroui/${registryName}` : null)

  const setupLinks = (
    <p className="text-[13px] text-muted-foreground">
      Source lands in your repo. Setup:{" "}
      <Link href="/docs/installation" className="bam-link">
        Installation
      </Link>
      {" · "}
      <Link href="/docs/registry" className="bam-link">
        Registry catalog
      </Link>
      {isHostApi ? (
        <>
          {" · "}
          <Link href="/docs/host-api" className="bam-link">
            Host APIs
          </Link>
        </>
      ) : null}
      .
    </p>
  )

  return (
    <article
      className={
        fullBleed
          ? "mx-auto w-full max-w-6xl space-y-8 sm:space-y-10"
          : "mx-auto w-full max-w-3xl space-y-8 sm:space-y-10"
      }
    >
      <header className="space-y-2 sm:space-y-3">
        <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
          <p className="ms-stamp">{kind}</p>
          {inRegistry ? (
            <span className="font-mono text-[10px] tracking-[0.14em] text-brand/80 uppercase">
              CLI registry
            </span>
          ) : null}
          {isHostApi ? (
            <Link
              href="/docs/host-api"
              className="font-mono text-[10px] tracking-[0.14em] text-brand/80 uppercase transition-colors hover:text-brand"
            >
              Host API
            </Link>
          ) : null}
        </div>
        <h1 className="ds-display text-2xl text-foreground sm:text-3xl md:text-4xl">
          {title}
        </h1>
        <p className="max-w-2xl text-[14px] leading-relaxed text-muted-foreground sm:text-[15px]">
          {description}
        </p>
        <p className="font-mono text-[11px] tracking-[0.1em] text-muted-foreground/70 uppercase">
          Preview → install → use
        </p>
      </header>

      <DocStep n="01" label="Preview">
        <div className="space-y-3">
          <DocsExample
            preview={preview}
            code={code}
            fullBleed={fullBleed}
            installCommand={installCmd ?? undefined}
          />
          {installCmd ? (
            setupLinks
          ) : (
            <div className="space-y-2 rounded-xl border border-border-subtle bg-muted/30 px-4 py-3">
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
        </div>
      </DocStep>

      {usage ? (
        <DocStep n="02" label="Usage">
          <div className="text-[15px] leading-relaxed text-muted-foreground">
            {usage}
          </div>
        </DocStep>
      ) : null}

      {props && props.length > 0 ? (
        <DocStep n={usage ? "03" : "02"} label="API reference">
          <PropsTable data={props} />
        </DocStep>
      ) : null}

      {extra}

      {href ? <DocsPager href={href} /> : null}
    </article>
  )
}
