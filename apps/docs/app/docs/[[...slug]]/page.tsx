import type { Metadata } from "next"
import { notFound } from "next/navigation"
import type { ComponentType } from "react"
import type { MDXComponents } from "mdx/types"
import { getMDXComponents } from "@/components/mdx"
import { docsPageMetadata } from "@/lib/docs-metadata"
import { source } from "@/lib/source"

type PageProps = {
  params: Promise<{ slug?: string[] }>
}

type MdxPageData = {
  title: string
  description?: string
  body: ComponentType<{ components?: MDXComponents }>
}

export default async function DocsMdxPage(props: PageProps) {
  const params = await props.params
  const page = source.getPage(params.slug)
  if (!page) notFound()

  const data = page.data as MdxPageData
  const MDX = data.body

  return (
    <div className="docs-mdx">
      <MDX components={getMDXComponents()} />
    </div>
  )
}

export function generateStaticParams() {
  return source.generateParams()
}

export async function generateMetadata(props: PageProps): Promise<Metadata> {
  const params = await props.params
  const page = source.getPage(params.slug)
  if (!page) notFound()

  const data = page.data as MdxPageData
  const path =
    !params.slug || params.slug.length === 0 || page.url === "/docs"
      ? "/docs"
      : page.url.startsWith("/")
        ? page.url
        : `/${page.url}`

  return docsPageMetadata({
    title: data.title,
    description: data.description ?? "",
    path,
  })
}
