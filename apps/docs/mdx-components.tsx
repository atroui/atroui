import type { MDXComponents } from "mdx/types"
import { docsMdxComponents } from "@/components/docs-mdx"

/**
 * Global MDX components — docs prose + journal content.
 */
export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...docsMdxComponents,
    ...components,
  }
}
