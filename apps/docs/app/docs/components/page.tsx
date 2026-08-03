import type { Metadata } from "next"
import Link from "next/link"
import { navigation } from "@/lib/navigation"

export const metadata: Metadata = {
  title: "Components",
}

export default function ComponentsIndexPage() {
  const components = navigation.find((s) => s.title === "Components")?.items ?? []
  const items = components.filter((item) => item.href !== "/docs/components")

  return (
    <article className="mx-auto max-w-3xl space-y-10">
      <header>
        <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.08em] text-neutral-400">
          Library
        </p>
        <h1 className="text-[2rem] font-semibold tracking-tight text-neutral-950 sm:text-[2.35rem]">
          Components
        </h1>
        <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-neutral-500 sm:text-base">
          Accessible, composable primitives ready for production — same calm language as the rest of Meridian.
        </p>
      </header>

      <ul className="grid gap-2 sm:grid-cols-2">
        {items.map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              className="flex items-center justify-between rounded-2xl border border-neutral-200/80 bg-[#f7f8fa] px-4 py-3.5 text-[14px] font-medium text-neutral-800 transition-colors hover:border-neutral-300 hover:bg-white hover:text-neutral-950"
            >
              {item.title}
              <span className="text-neutral-300">→</span>
            </Link>
          </li>
        ))}
      </ul>
    </article>
  )
}
