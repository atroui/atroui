import type { Metadata } from "next"
import Link from "next/link"
import { CodeBlock } from "@/components/code-block"

export const metadata: Metadata = {
  title: "Introduction",
}

export default function DocsIntroPage() {
  return (
    <article className="mx-auto max-w-3xl space-y-10">
      <header>
        <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.08em] text-neutral-400">
          Getting started
        </p>
        <h1 className="text-[2rem] font-semibold tracking-tight text-neutral-950 sm:text-[2.35rem]">
          Introduction
        </h1>
        <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-neutral-500 sm:text-base">
          Meridian is the shared catalog of <strong className="font-medium text-neutral-800">your</strong> components —
          the ones used across projects like ogsaas. Not a generic UI kit.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-[15px] font-semibold text-neutral-950">Source of truth</h2>
        <p className="text-[15px] leading-relaxed text-neutral-500">
          Components here were copied from <code className="rounded-md bg-[#f7f8fa] px-1.5 py-0.5 font-mono text-[12px] text-neutral-700">/home/koustav/ogsaas</code> into{" "}
          <code className="rounded-md bg-[#f7f8fa] px-1.5 py-0.5 font-mono text-[12px] text-neutral-700">packages/ui</code>.
          The ogsaas repo is never modified by this library.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-[15px] font-semibold text-neutral-950">Quick start</h2>
        <CodeBlock language="bash" code={`pnpm install\npnpm dev`} />
      </section>

      <div className="flex flex-wrap gap-3 pt-1">
        <Link
          href="/docs/installation"
          className="inline-flex h-11 items-center rounded-full bg-neutral-950 px-6 text-[14px] font-medium text-white transition-colors hover:bg-neutral-800"
        >
          Installation
        </Link>
        <Link
          href="/docs/components"
          className="inline-flex h-11 items-center rounded-full border border-neutral-200 bg-white px-6 text-[14px] font-medium text-neutral-800 transition-colors hover:bg-neutral-50"
        >
          Browse components
        </Link>
      </div>
    </article>
  )
}
