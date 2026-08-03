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
        <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.08em] text-neutral-400">
          Component
        </p>
        <h1 className="text-[2rem] font-semibold tracking-tight text-neutral-950 sm:text-[2.35rem]">
          {title}
        </h1>
        <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-neutral-500 sm:text-base">
          {description}
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-[15px] font-semibold text-neutral-950">Preview</h2>
        <ComponentPreview>{preview}</ComponentPreview>
        <CodeBlock code={code} />
      </section>

      {extra}

      {usage ? (
        <section className="space-y-3">
          <h2 className="text-[15px] font-semibold text-neutral-950">Usage guidelines</h2>
          <p className="text-[15px] leading-relaxed text-neutral-500">{usage}</p>
        </section>
      ) : null}

      <section className="space-y-4">
        <h2 className="text-[15px] font-semibold text-neutral-950">Props</h2>
        <PropsTable data={props} />
      </section>
    </article>
  )
}
