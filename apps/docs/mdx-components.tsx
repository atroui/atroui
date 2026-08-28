import type { MDXComponents } from "mdx/types"
import { mdxComponents } from "@/components/docs-mdx"

/** Global MDX map — fumadocs + journal content (shadcn pattern). */
export function useMDXComponents(
  components: MDXComponents,
): MDXComponents {
  return {
    ...mdxComponents,
    ...components,
  }
}
