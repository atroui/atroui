import Link from "next/link"
import { DocsBreadcrumb } from "@/components/docs-breadcrumb"
import { DocsExample } from "@/components/docs-example"
import { DocsPageHeader } from "@/components/docs-page-header"
import { DocsPager } from "@/components/docs-pager"
import { PseoOnPage } from "@/components/pseo-on-page"
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
  href?: string
  kind?: DocKind
  registryName?: string
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
    <section className="space-y-4">
      <div className="flex items-baseline gap-3 border-b border-[var(--line)] pb-2">
        <span className="spec-num">{n}</span>
        <h2 className="spec-heading text-foreground">{label}</h2>
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
    <p className="text-[13px] leading-relaxed text-muted-foreground">
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

  const meta = (
    <>
      {inRegistry ? <span className="spec-label">CLI</span> : null}
      {isHostApi ? (
        <Link
          href="/docs/host-api"
          className="spec-label text-[var(--brand)] transition-opacity hover:opacity-80"
        >
          Host API
        </Link>
      ) : null}
    </>
  )

  const crumbs = href
    ? [
        { label: "Docs", href: "/docs" },
        { label: "Components", href: "/docs/components" },
        { label: title },
      ]
    : []

  return (
    <article
      className={
        fullBleed
          ? "mx-auto w-full max-w-6xl space-y-10 sm:space-y-12"
          : "mx-auto w-full max-w-3xl space-y-10 sm:space-y-12"
      }
    >
      {crumbs.length > 0 ? <DocsBreadcrumb items={crumbs} /> : null}

      <DocsPageHeader
        eyebrow={kind}
        title={title}
        description={description}
        meta={meta}
      />

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
            <div className="rounded-[var(--radius-md)] border border-[var(--line)] px-4 py-3">
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

      {href ? (
        <PseoOnPage path={href} title={title} registryName={registryName} />
      ) : null}

      {href ? <DocsPager href={href} /> : null}
    </article>
  )
}
