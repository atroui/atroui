import * as React from "react"
import Link from "next/link"
import type { MDXComponents } from "mdx/types"
import { CodeBlock } from "@/components/code-block"
import { ComponentPreview } from "@/components/component-preview"
import {
  ProductPageHeader,
  docSectionHeading,
  productArticle,
} from "@/components/product-page"
import { DocsPageShell } from "@/components/docs-page-shell"
import { DocsPager } from "@/components/docs-pager"
import { cn } from "@/lib/utils"

const headingScroll =
  "scroll-mt-[calc(var(--header-height,3.5rem)+0.75rem)]"

/** MDX component map for docs prose (shadcn MDX surface). */
export const docsMdxComponents: MDXComponents = {
  h1: (props) => (
    <h1
      className="ds-headline mt-2 text-3xl tracking-tight text-foreground sm:text-4xl"
      {...props}
    />
  ),
  h2: ({ className, ...props }) => (
    <h2
      className={cn(docSectionHeading, headingScroll, className)}
      {...props}
    />
  ),
  h3: ({ className, ...props }) => (
    <h3
      className={cn(
        "mt-8 text-base font-medium text-foreground",
        headingScroll,
        className
      )}
      {...props}
    />
  ),
  p: ({ className, ...props }) => (
    <p
      className={cn(
        "text-[15px] leading-relaxed text-muted-foreground",
        className
      )}
      {...props}
    />
  ),
  a: ({ className, href, ...props }) => {
    const external = href?.startsWith("http")
    const classes = cn("bam-link", className)
    if (href && !external && href.startsWith("/")) {
      return <Link href={href} className={classes} {...props} />
    }
    return (
      <a
        href={href}
        className={classes}
        {...(external
          ? { target: "_blank", rel: "noopener noreferrer" }
          : {})}
        {...props}
      />
    )
  },
  ul: ({ className, ...props }) => (
    <ul
      className={cn(
        "list-disc space-y-2 pl-5 text-[15px] text-muted-foreground",
        className
      )}
      {...props}
    />
  ),
  ol: ({ className, ...props }) => (
    <ol
      className={cn(
        "list-decimal space-y-2 pl-5 text-[15px] text-muted-foreground",
        className
      )}
      {...props}
    />
  ),
  code: ({ className, children, ...props }) => {
    const text = String(children)
    // Fenced blocks are handled by pre > code; inline only here.
    if (className?.includes("language-")) {
      return (
        <code className={className} {...props}>
          {children}
        </code>
      )
    }
    return (
      <code
        className="rounded-md bg-muted px-1.5 py-0.5 font-mono text-[12px] text-foreground"
        {...props}
      >
        {text}
      </code>
    )
  },
  pre: ({ children, ...props }) => {
    const child = React.Children.only(children) as React.ReactElement<{
      className?: string
      children?: React.ReactNode
    }>
    const className = child.props.className ?? ""
    const lang = className.replace(/language-/, "") || "tsx"
    const code = String(child.props.children ?? "").replace(/\n$/, "")
    return <CodeBlock language={lang} code={code} {...props} />
  },
  ComponentPreview,
  ProductPageHeader,
  CodeBlock,
}

type DocsMdxPageProps = {
  href: string
  children: React.ReactNode
  /** Root id for auto TOC. */
  tocRootId?: string
  className?: string
}

/** Shell for MDX (or JSX-in-MDX) docs bodies. */
export function DocsMdxPage({
  href,
  children,
  tocRootId = "docs-mdx",
  className,
}: DocsMdxPageProps) {
  return (
    <DocsPageShell autoTocRootId={tocRootId}>
      <article id={tocRootId} className={cn(productArticle, className)}>
        {children}
        <DocsPager href={href} />
      </article>
    </DocsPageShell>
  )
}
