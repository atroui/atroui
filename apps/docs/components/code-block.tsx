"use client"

import * as React from "react"
import { CopyButton } from "atroui"
import { highlight } from "fumadocs-core/highlight"
import { captureCodeCopied } from "@/lib/analytics-capture"
import { cn } from "@/lib/utils"

export interface CodeBlockFile {
  name: string
  code: string
  language?: string
}

interface CodeBlockProps {
  code: string
  language?: string
  className?: string
  /** Nest inside DocsExample - no outer border, lighter chrome */
  embedded?: boolean
  /**
   * Multi-file tabs. When present with length > 1, a file tab row renders
   * under the header and the copy button copies the active file.
   * Length <= 1 (or absent) = legacy single-file behavior, no visual change.
   */
  files?: CodeBlockFile[]
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
  files,
}: CodeBlockProps) {
  const multi = !!files && files.length > 1
  const [activeIndex, setActiveIndex] = React.useState(0)
  const safeIndex = multi ? Math.min(activeIndex, files.length - 1) : 0
  const activeFile = multi ? files[safeIndex] : undefined
  const activeCode = activeFile?.code ?? code
  const activeLanguage = activeFile?.language ?? language

  const onTabKeyDown = (e: React.KeyboardEvent, index: number) => {
    if (!multi || !files) return
    let next: number | null = null
    if (e.key === "ArrowRight") next = (index + 1) % files.length
    else if (e.key === "ArrowLeft")
      next = (index - 1 + files.length) % files.length
    else if (e.key === "Home") next = 0
    else if (e.key === "End") next = files.length - 1
    if (next !== null) {
      e.preventDefault()
      setActiveIndex(next)
      document.getElementById(`codeblock-file-${next}`)?.focus()
    }
  }

  return (
    <div
      className={cn(
        "docs-codeblock group relative overflow-hidden rounded-[var(--atro-panel-radius)] bg-muted text-foreground",
        !embedded && "border border-border-subtle",
        className,
      )}
    >
      <div className="flex items-center justify-between border-b border-border-subtle bg-secondary px-4 py-2.5">
        <span className="text-[11px] font-semibold tracking-[0.08em] text-muted-foreground uppercase">
          {activeLanguage}
        </span>
        <CopyButton
          value={activeCode}
          size="sm"
          variant="outline"
          timeout={2000}
          onCopied={() => {
            captureCodeCopied({
              language: activeLanguage,
              embedded,
              kind: "snippet",
              source: "code_block",
              ...(activeFile ? { file: activeFile.name } : null),
            })
          }}
          className="h-7 border bg-muted px-2.5 text-[12px] font-medium text-muted-foreground hover:bg-accent hover:text-foreground"
        />
      </div>
      {multi && files ? (
        <div
          role="tablist"
          aria-label="Files"
          className="flex gap-0.5 overflow-x-auto border-b border-border-subtle bg-secondary px-2 py-1.5"
        >
          {files.map((file, index) => {
            const selected = index === safeIndex
            return (
              <button
                key={file.name}
                id={`codeblock-file-${index}`}
                type="button"
                role="tab"
                aria-selected={selected}
                tabIndex={selected ? 0 : -1}
                onClick={() => setActiveIndex(index)}
                onKeyDown={(e) => onTabKeyDown(e, index)}
                className={cn(
                  "relative shrink-0 rounded-md px-3 py-1 font-mono text-[12px] transition-colors",
                  selected
                    ? "bg-foreground/10 text-foreground"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                {file.name}
              </button>
            )
          })}
        </div>
      ) : null}
      <React.Suspense
        key={`${activeLanguage}\0${activeCode}`}
        fallback={<CodeFallback code={activeCode} />}
      >
        <HighlightedCode code={activeCode} language={activeLanguage} />
      </React.Suspense>
    </div>
  )
}
