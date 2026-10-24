export type SourceExcerptLine = {
  lineNumber: number
  text: string
  highlight: boolean
}

/** Honest slice from real registry source — CONTENT block + export line. */
export function extractSourceExcerpt(
  source: string,
  maxLines = 16
): {
  lines: SourceExcerptLine[]
  truncated: boolean
} {
  const allLines = source.split("\n")
  const contentStart = allLines.findIndex((line) => /const CONTENT\s*=/.test(line))

  if (contentStart < 0) {
    return {
      lines: allLines.slice(0, 12).map((text, i) => ({
        lineNumber: i + 1,
        text,
        highlight: false,
      })),
      truncated: allLines.length > 12,
    }
  }

  let depth = 0
  let contentEnd = contentStart
  for (let i = contentStart; i < allLines.length; i++) {
    for (const ch of allLines[i]!) {
      if (ch === "{") depth++
      if (ch === "}") depth--
    }
    if (i > contentStart && depth === 0) {
      contentEnd = i
      break
    }
  }

  let end = contentEnd
  for (let i = contentEnd + 1; i < Math.min(contentEnd + 5, allLines.length); i++) {
    if (/export (async )?function/.test(allLines[i]!)) {
      end = i
      break
    }
  }

  const slice = allLines.slice(contentStart, end + 1)
  const clipped = slice.length > maxLines
  const visible = clipped ? slice.slice(0, maxLines) : slice

  return {
    lines: visible.map((text, i) => ({
      lineNumber: contentStart + i + 1,
      text,
      highlight: i === 0,
    })),
    truncated: clipped || end < allLines.length - 1,
  }
}
