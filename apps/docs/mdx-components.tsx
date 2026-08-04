import type { MDXComponents } from "mdx/types"

/**
 * Global MDX components for journal/article content imported from atroui.
 */
export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...components,
  }
}
