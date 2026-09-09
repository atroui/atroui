import Link from "next/link"
import { CodeBlock } from "@/components/code-block"
import { DocsArticleHeader } from "@/components/docs/docs-article-header"
import { DocsExample } from "@/components/docs-example"
import { DocsPager } from "@/components/docs-pager"
import { PseoOnPage } from "@/components/pseo-on-page"
import { PropsTable, type PropRow } from "@/components/props-table"
import {
  findNavContext,
  type DocKind,
} from "@/lib/navigation"

export interface DocExample {
  title: string
  tip?: string
  preview: React.ReactNode
  code: string
}

function slugify(text: string) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
}

interface ComponentDocProps {
  title: string
  description: string
  preview: React.ReactNode
  code: string
  props?: PropRow[]
  usage?: React.ReactNode
  /** Depth on demand: one focused variant per example, revealed after Usage. */
  examples?: DocExample[]
  extra?: React.ReactNode
  fullBleed?: boolean
  href?: string
  kind?: DocKind
  registryName?: string
  installation?: string
}

export function ComponentDoc({
  title,
  description,
  preview,
  code,
  props,
  usage,
  examples,
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

  return (
    <article className={fullBleed ? "docs-book-wide space-y-6" : "space-y-6"}>
      <DocsArticleHeader
        eyebrow={
          <>
            {kind}
            {inRegistry ? " · CLI" : null}
            {isHostApi ? " · Host API" : null}
          </>
        }
        title={title}
        lede={description}
      />

      <section className="space-y-3">
        <h2 className="docs-section-title" id="preview">
          Preview
        </h2>
        <DocsExample
          preview={preview}
          code={code}
          fullBleed={fullBleed}
          installCommand={installCmd ?? undefined}
        />
        {installCmd ? null : (
          <p className="text-[14px] leading-relaxed text-muted-foreground">
            Not in the CLI registry yet. Prefer registry blocks when you want
            owned source via{" "}
            <Link href="/docs/registry" className="bam-link">
              shadcn add @atroui/…
            </Link>
            .
          </p>
        )}
      </section>

      {installCmd ? (
        <section className="space-y-3">
          <h2 className="docs-section-title" id="installation">
            Installation
          </h2>
          <pre className="overflow-x-auto rounded-lg border border-border-subtle bg-muted/60 px-3 py-2.5">
            <code className="font-mono text-[12px] text-foreground sm:text-[13px]">
              {installCmd}
            </code>
          </pre>
          <p className="text-[13px] text-muted-foreground">
            Source lands in your repo.{" "}
            <Link href="/docs/installation" className="bam-link">
              Installation
            </Link>
            {" · "}
            <Link href="/docs/registry" className="bam-link">
              Registry
            </Link>
            {isHostApi ? (
              <>
                {" · "}
                <Link href="/docs/host-api" className="bam-link">
                  Host APIs
                </Link>
              </>
            ) : null}
          </p>
        </section>
      ) : null}

      {code.trim() || usage ? (
        <section className="space-y-3">
          <h2 className="docs-section-title" id="usage">
            Usage
          </h2>
          {usage ? (
            <div className="docs-prose !mt-0 text-[15px]">{usage}</div>
          ) : null}
          {code.trim() ? <CodeBlock code={code} language="tsx" /> : null}
        </section>
      ) : null}

      {examples?.map((example) => (
        <section key={example.title} className="space-y-3">
          <h2 className="docs-section-title" id={slugify(example.title)}>
            {example.title}
          </h2>
          {example.tip ? (
            <p className="text-[14px] leading-relaxed text-muted-foreground">
              {example.tip}
            </p>
          ) : null}
          <DocsExample preview={example.preview} code={example.code} />
        </section>
      ))}

      {props && props.length > 0 ? (
        <section className="space-y-3">
          <h2 className="docs-section-title" id="api">
            API reference
          </h2>
          <PropsTable data={props} />
        </section>
      ) : null}

      {extra}

      {href ? (
        <PseoOnPage path={href} title={title} registryName={registryName} />
      ) : null}

      {href ? <DocsPager href={href} /> : null}
    </article>
  )
}
