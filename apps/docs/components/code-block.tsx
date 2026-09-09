"use client"

import * as React from "react"
import { Check, Copy } from "lucide-react"
import { CopyButton } from "atroui"
import { highlight } from "fumadocs-core/highlight"
import posthog from "posthog-js"
import { cn } from "@/lib/utils"

interface CodeBlockProps {
  code: string
  language?: string
  className?: string
  /** Nest inside DocsExample - no outer border, lighter chrome */
  embedded?: boolean
}

const LANG_ALIASES: Record<string, string> = {
  sh: "bash",
  shell: "bash",
  zsh: "bash",
  env: "dotenv",
  ts: "typescript",
  js: "javascript",
  plaintext: "plaintext",
  text: "plaintext",
  md: "markdown",
  mdx: "mdx",
}

function resolveLang(language: string) {
  return LANG_ALIASES[language] ?? language
}

/** Cache by lang+code — fumadocs useShiki keys by useId, so remounts re-suspend. */
const highlightCache = new Map<string, Promise<React.ReactNode>>()

function getHighlighted(code: string, language: string) {
  const lang = resolveLang(language)
  const key = `${lang}\0${code}`
  let pending = highlightCache.get(key)
  if (!pending) {
    pending = highlight(code, {
      lang: lang as "tsx",
      fallbackLanguage: "tsx",
      themes: {
        light: "github-light",
        dark: "github-dark-dimmed",
      },
      engine: "js",
      components: {
        pre: ({ style, className, ...props }) => (
          <pre
            {...props}
            style={{
              ...style,
              background: "transparent",
              backgroundColor: "transparent",
            }}
            className={cn(
              "docs-codeblock-pre overflow-x-auto p-4 font-mono text-[13px] leading-relaxed",
              className,
            )}
          />
        ),
      },
    })
    highlightCache.set(key, pending)
  }
  return pending
}

function CodeFallback({ code }: { code: string }) {
  return (
    <pre className="docs-codeblock-pre overflow-x-auto p-4 font-mono text-[13px] leading-relaxed text-foreground">
      <code className="whitespace-pre">{code}</code>
    </pre>
  )
}

function HighlightedCode({
  code,
  language,
}: {
  code: string
  language: string
}) {
  return React.use(getHighlighted(code, language))
}

export function CodeBlock({
  code,
  language = "tsx",
  className,
  embedded = false,
}: CodeBlockProps) {
  return (
    <div
      className={cn(
        "docs-codeblock group relative overflow-hidden rounded-[var(--atro-panel-radius)] bg-muted/30 text-foreground",
        !embedded && "border border-border-subtle",
        className,
      )}
    >
      <div className="flex items-center justify-between border-b border-border-subtle bg-muted/60 px-4 py-2.5">
        <span className="text-[11px] font-semibold tracking-[0.08em] text-muted-foreground uppercase">
          {language}
        </span>
        <CopyButton
          value={code}
          size="sm"
          variant="outline"
          timeout={2000}
          onCopied={() => {
            posthog.capture("documentation_code_copied", {
              language,
              embedded,
            })
          }}
          className="h-7 border bg-foreground/[0.04] px-2.5 text-[12px] font-medium text-muted-foreground hover:bg-foreground/[0.06] hover:text-foreground"
        />
      </div>
      <React.Suspense fallback={<CodeFallback code={code} />}>
        <HighlightedCode code={code} language={language} />
      </React.Suspense>
    </div>
  )
}
