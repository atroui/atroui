import Link from "next/link"
import {
  ProductPageHeader,
  ProductPanel,
} from "@/components/product-page"
import { badgeLabel, navigation } from "@/lib/navigation"

export function DocsComponentsIndexView() {
  const sections = navigation.filter((s) => s.title !== "Getting Started")

  return (
    <>
      <ProductPageHeader
        stamp="Catalog"
        title={
          <>
            Components{" "}
            <span className="ds-sketch-accent">you install</span>
          </>
        }
        lede={
          <>
            Live previews on this site are the same registry exports{" "}
            <code className="rounded-md bg-muted px-1.5 py-0.5 font-mono text-[12px] text-foreground">
              shadcn add @atroui/…
            </code>{" "}
            writes into your repo. For intent clusters (forms, OG, launch), start
            at{" "}
            <Link href="/docs/collections" className="bam-link">
              Collections
            </Link>
            .
          </>
        }
      />

      {sections.map((section) => (
        <section key={section.title} className="space-y-3">
          <h2 className="ds-nav-section text-foreground">{section.title}</h2>
          <ProductPanel>
            {section.items.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="group flex items-center justify-between gap-3 px-4 py-3.5 transition-colors hover:bg-white/5"
              >
                <span className="min-w-0">
                  <span className="font-medium text-foreground transition-colors group-hover:text-brand">
                    {item.title}
                  </span>
                  {item.description ? (
                    <span className="ds-meta mt-0.5 block">
                      {item.description}
                    </span>
                  ) : null}
                </span>
                <span className="flex shrink-0 items-center gap-3">
                  {item.badge ? (
                    <span
                      className={`ds-sketch text-[13px] ${
                        item.badge === "registry" || item.badge === "host-api"
                          ? "text-brand"
                          : "text-muted-foreground"
                      }`}
                    >
                      {badgeLabel[item.badge]}
                    </span>
                  ) : null}
                  <span className="text-muted-foreground" aria-hidden>
                    →
                  </span>
                </span>
              </Link>
            ))}
          </ProductPanel>
        </section>
      ))}
    </>
  )
}
