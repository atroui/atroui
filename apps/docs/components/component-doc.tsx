import { CodeBlock } from "@/components/code-block"
import { ComponentPreview } from "@/components/component-preview"
import { PropsTable, type PropRow } from "@/components/props-table"

interface ComponentDocProps {
  title: string
  description: string
  preview: React.ReactNode
  code: string
  props: PropRow[]
  usage?: string
  extra?: React.ReactNode
}

export function ComponentDoc({
  title,
  description,
  preview,
  code,
  props,
  usage,
  extra,
}: ComponentDocProps) {
  return (
    <article className="mx-auto max-w-3xl space-y-10">
      <header>
        <h1 className="font-display text-4xl tracking-tight">{title}</h1>
        <p className="mt-3 text-lg text-muted-foreground">{description}</p>
      </header>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Preview</h2>
        <ComponentPreview>{preview}</ComponentPreview>
        <CodeBlock code={code} />
      </section>

      {extra}

      {usage ? (
        <section className="space-y-3">
          <h2 className="text-xl font-semibold">Usage guidelines</h2>
          <p className="text-muted-foreground">{usage}</p>
        </section>
      ) : null}

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Props</h2>
        <PropsTable data={props} />
      </section>
    </article>
  )
}
