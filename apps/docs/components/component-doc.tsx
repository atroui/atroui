import Link from "next/link"
import { DocsExample } from "@/components/docs-example"
import { DocsPager } from "@/components/docs-pager"
import { DocsPageShell } from "@/components/docs-page-shell"
import type { TocItem } from "@/components/docs-toc"
import { PseoOnPage } from "@/components/pseo-on-page"
import {
  ProductPageHeader,
  productArticle,
  productArticleWide,
} from "@/components/product-page"
import { PropsTable, type PropRow } from "@/components/props-table"
import {
  findNavContext,
  relatedNavItems,
  type DocKind,
} from "@/lib/navigation"
import { getPseoPage } from "@/lib/pseo"

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

const sectionScroll =
  "scroll-mt-[calc(var(--header-height,3.5rem)+0.75rem)]"

function DocStep({
  id,
  n,
  label,
  children,
}: {
  id: string
  n: string
  label: string
  children: React.ReactNode
}) {
  return (
    <section id={id} className={`space-y-3 ${sectionScroll}`}>
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

function buildComponentDocToc({
  usage,
  props,
  path,
}: {
  usage?: React.ReactNode
  props?: PropRow[]
  path?: string
}): TocItem[] {
  const items: TocItem[] = [{ id: "preview", title: "Preview" }]

  if (usage) {
    items.push({ id: "usage", title: "Usage" })
  }

  if (props && props.length > 0) {
    items.push({
      id: "api-reference",
      title: "API reference",
    })
  }

  if (path) {
    const overlay = getPseoPage(path)
    if (overlay) {
      items.push({ id: "overview", title: overlay.job })
    }
    if (overlay?.faqs?.length) {
      items.push({ id: "faq", title: "FAQ" })
    }
    if (relatedNavItems(path, 1).length > 0) {
      items.push({ id: "related", title: "Related" })
    }
  }

  return items
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

  const toc = buildComponentDocToc({ usage, props, path: href })

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

  const badges = (
    <>
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
    </>
  )

  const articleClass = fullBleed ? productArticleWide : productArticle

  return (
    <DocsPageShell
      toc={toc}
      wide={fullBleed}
      copyPage={{
        title,
        description,
        installCommand: installCmd ?? undefined,
        url: href ? `https://www.atroui.com${href}` : undefined,
      }}
    >
      <article className={articleClass}>
        <ProductPageHeader
          stamp={kind}
          title={title}
          lede={description}
          hint="Preview → install → use"
          badges={badges}
        />

        <DocStep id="preview" n="01" label="Preview">
          <div className="space-y-3">
            <DocsExample
              preview={preview}
              code={code}
              fullBleed={fullBleed}
              installCommand={installCmd ?? undefined}
              registrySlug={registryName ?? undefined}
              blurb={
                isHostApi
                  ? "Borrow the API — UI + Host route (BYOK)"
                  : inRegistry
                    ? "Own the UI — edit CONTENT after install"
                    : undefined
              }
            />
            {installCmd ? (
              setupLinks
            ) : (
              <div className="md-glass space-y-2 px-4 py-3">
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
          <DocStep id="usage" n="02" label="Usage">
            <div className="ds-body text-muted-foreground">{usage}</div>
          </DocStep>
        ) : null}

        {props && props.length > 0 ? (
          <DocStep
            id="api-reference"
            n={usage ? "03" : "02"}
            label="API reference"
          >
            <PropsTable data={props} />
          </DocStep>
        ) : null}

        {extra}

        {href ? (
          <PseoOnPage path={href} title={title} registryName={registryName} />
        ) : null}

        {href ? <DocsPager href={href} /> : null}
      </article>
    </DocsPageShell>
  )
}
