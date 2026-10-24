import { NotFoundPanel } from "@/components/not-found-panel"

/** Missing post — the blog layout already carries SiteHeader + SiteFooter. */
export default function BlogNotFound() {
  return (
    <NotFoundPanel
      doors={[
        { label: "Blog", href: "/blog" },
        { label: "Docs", href: "/docs" },
        { label: "Components", href: "/docs/components" },
      ]}
    />
  )
}
