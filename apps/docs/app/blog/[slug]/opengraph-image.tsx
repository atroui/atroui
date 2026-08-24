import { getPost } from "@/lib/blog"
import { eyebrowForPath, renderShareOgImage } from "@/lib/share-og"

export const alt = "AtroUI blog"
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

type Props = { params: Promise<{ slug: string }> }

export default async function Image({ params }: Props) {
  const { slug } = await params
  const post = getPost(slug)
  const path = `/blog/${slug}`
  return renderShareOgImage({
    eyebrow: eyebrowForPath(path),
    title: post?.title ?? "AtroUI Blog",
    description:
      post?.description ??
      "Guides for owning UI with the shadcn CLI.",
    path,
  })
}
