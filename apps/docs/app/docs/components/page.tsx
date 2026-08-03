import type { Metadata } from "next"
import Link from "next/link"
import { navigation } from "@/lib/navigation"

export const metadata: Metadata = {
  title: "Components",
}

export default function ComponentsIndexPage() {
  const components = navigation.find((s) => s.title === "Components")?.items ?? []

  return (
    <article className="mx-auto max-w-3xl space-y-8">
      <div>
        <h1 className="font-display text-4xl tracking-tight">Components</h1>
        <p className="mt-3 text-lg text-muted-foreground">
          Accessible, composable primitives ready for production.
        </p>
      </div>
      <ul className="grid gap-2 sm:grid-cols-2">
        {components.map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              className="block rounded-lg border px-4 py-3 text-sm font-medium transition-colors hover:bg-accent"
            >
              {item.title}
            </Link>
          </li>
        ))}
      </ul>
    </article>
  )
}
