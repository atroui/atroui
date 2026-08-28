import { defineConfig, defineDocs } from "fumadocs-mdx/config"
import rehypeAutolinkHeadings from "rehype-autolink-headings"
import rehypeSlug from "rehype-slug"
import remarkGfm from "remark-gfm"

export default defineConfig({
  mdxOptions: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [
      rehypeSlug,
      [
        rehypeAutolinkHeadings,
        {
          behavior: "append",
          properties: {
            className: ["heading-anchor"],
            ariaHidden: true,
            tabIndex: -1,
          },
        },
      ],
    ],
  },
})

export const docs = defineDocs({
  dir: "content/docs",
})
