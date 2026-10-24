import defaultMdxComponents from "fumadocs-ui/mdx"
import type { MDXComponents } from "mdx/types"
import Link from "next/link"
import type { ComponentPropsWithoutRef } from "react"
import { CodeBlock } from "@/components/code-block"
import { DocsPager } from "@/components/docs-pager"
import { InstallModesMatrix } from "@/components/install-modes-matrix"

function AtroLink({
  href = "#",
  children,
  ...rest
}: ComponentPropsWithoutRef<"a">) {
  if (href.startsWith("/") || href.startsWith("#")) {
    return (
      <Link href={href} className="bam-link" {...rest}>
        {children}
      </Link>
    )
  }
  return (
    <a
      href={href}
      className="bam-link"
      target="_blank"
      rel="noopener noreferrer"
      {...rest}
    >
      {children}
    </a>
  )
}

export function getMDXComponents(components?: MDXComponents): MDXComponents {
  return {
    ...defaultMdxComponents,
    a: AtroLink,
    CodeBlock,
    DocsPager,
    InstallModesMatrix,
    ...components,
  }
}
