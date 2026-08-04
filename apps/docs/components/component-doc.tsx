import { DocsExample } from "@/components/docs-example"
import { PropsTable, type PropRow } from "@/components/props-table"

interface ComponentDocProps {
  title: string
  description: string
  preview: React.ReactNode
  code: string
  props?: PropRow[]
  usage?: React.ReactNode
  extra?: React.ReactNode
  fullBleed?: boolean
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
  installation = 'import { … } from "atroui"',
}: ComponentDocProps) {
  return (
    <article
      className={
        fullBleed
          ? "mx-auto max-w-6xl space-y-8"
          : "mx-auto max-w-3xl space-y-8"
      }
    >
      <header className="space-y-3">
        <p className="ms-stamp">Component</p>
        <h1 className="ds-display text-3xl text-foreground sm:text-4xl">{title}</h1>
        <p className="max-w-2xl text-[15px] leading-relaxed text-muted-foreground">
          {description}
        </p>
      </header>

      <DocsExample preview={preview} code={code} fullBleed={fullBleed} />

      <section className="space-y-3">
        <h2 className="ds-headline text-base text-foreground">Installation</h2>
        <pre className="overflow-x-auto rounded-2xl border border-border-subtle bg-muted/40 px-4 py-3 font-mono text-[13px] text-foreground">
          <code>{installation}</code>
        </pre>
      </section>

      {extra}

      {usage ? (
        <section className="space-y-3">
          <h2 className="ds-headline text-base text-foreground">Usage</h2>
          <p className="text-[15px] leading-relaxed text-muted-foreground">{usage}</p>
        </section>
      ) : null}

      {props && props.length > 0 ? (
        <section className="space-y-3">
          <h2 className="ds-headline text-base text-foreground">API Reference</h2>
          <PropsTable data={props} />
        </section>
      ) : null}
    </article>
  )
}
