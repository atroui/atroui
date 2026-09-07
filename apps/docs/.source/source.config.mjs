// source.config.ts
import { defineConfig, defineDocs } from "fumadocs-mdx/config";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";
var source_config_default = defineConfig({
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
            tabIndex: -1
          }
        }
      ]
    ]
  }
});
var docs = defineDocs({
  dir: "content/docs"
});
export {
  source_config_default as default,
  docs
};
