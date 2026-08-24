import { renderShareOgImage } from "@/lib/share-og"

export const alt = "AtroUI blog"
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

export default async function Image() {
  return renderShareOgImage({
    eyebrow: "Blog",
    title: "AtroUI blog",
    description:
      "Host APIs, shadcn registry, dark-first tokens, and Next.js notes from search to owning the UI.",
    path: "/blog",
  })
}
