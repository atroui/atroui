import * as React from "react"
import { cn } from "@/lib/utils"

export type AsciiWordmarkProps = {
  /** Text to spell. Uppercased; glyphs exist for A–Z, 0–9 and a few marks. */
  text?: string
  /** Character for solid ink ("on" cells). */
  ink?: string
  /** Character for the paper between cells ("off" cells). */
  void?: string
  /** Each pixel doubled horizontally for a chunky CRT feel. */
  fat?: boolean
  /** Accessible text. Defaults to the spelled text. */
  label?: string
  className?: string
}

/**
 * 3×5 pixel glyphs ("#" = on). Widths stay uniform for a tabular wordmark.
 */
const GLYPHS: Record<string, string[]> = {
  A: [".#.", "#.#", "###", "#.#", "#.#"],
  B: ["##.", "#.#", "##.", "#.#", "##."],
  C: [".##", "#..", "#..", "#..", ".##"],
  D: ["##.", "#.#", "#.#", "#.#", "##."],
  E: ["###", "#..", "##.", "#..", "###"],
  F: ["###", "#..", "##.", "#..", "#.."],
  G: [".##", "#..", "#.#", "#.#", ".##"],
  H: ["#.#", "#.#", "###", "#.#", "#.#"],
  I: ["###", ".#.", ".#.", ".#.", "###"],
  J: ["..#", "..#", "..#", "#.#", ".#."],
  K: ["#.#", "#.#", "##.", "#.#", "#.#"],
  L: ["#..", "#..", "#..", "#..", "###"],
  M: ["#.#", "###", "#.#", "#.#", "#.#"],
  N: ["#.#", "###", "###", "###", "#.#"],
  O: [".#.", "#.#", "#.#", "#.#", ".#."],
  P: ["##.", "#.#", "##.", "#..", "#.."],
  Q: [".#.", "#.#", "#.#", "##.", ".##"],
  R: ["##.", "#.#", "##.", "#.#", "#.#"],
  S: [".##", "#..", ".#.", "..#", "##."],
  T: ["###", ".#.", ".#.", ".#.", ".#."],
  U: ["#.#", "#.#", "#.#", "#.#", ".#."],
  V: ["#.#", "#.#", "#.#", ".#.", ".#."],
  W: ["#.#", "#.#", "###", "###", "#.#"],
  X: ["#.#", "#.#", ".#.", "#.#", "#.#"],
  Y: ["#.#", "#.#", ".#.", ".#.", ".#."],
  Z: ["###", "..#", ".#.", "#..", "###"],
  "0": [".##", "#.#", "#.#", "#.#", "##."],
  "1": [".#.", "##.", ".#.", ".#.", "###"],
  "2": ["##.", "..#", ".#.", "#..", "###"],
  "3": ["##.", "..#", ".##", "..#", "##."],
  "4": ["#.#", "#.#", "###", "..#", "..#"],
  "5": ["###", "#..", "##.", "..#", "##."],
  "6": [".##", "#..", "##.", "#.#", ".#."],
  "7": ["###", "..#", ".#.", ".#.", ".#."],
  "8": [".#.", "#.#", ".#.", "#.#", ".#."],
  "9": [".#.", "#.#", ".##", "..#", "##."],
  " ": ["..", "..", "..", "..", ".."],
  "-": ["...", "...", "###", "...", "..."],
  ".": ["...", "...", "...", "...", ".#."],
  ":": ["...", ".#.", "...", ".#.", "..."],
  "!": [".#.", ".#.", ".#.", "...", ".#."],
  "?": ["##.", "..#", ".#.", "...", ".#."],
  "+": ["...", ".#.", "###", ".#.", "..."],
  "&": [".#.", "#.#", ".#.", "#.#", ".##"],
}

function charsFor(
  ch: string,
  ink: string,
  void_: string,
  fat: boolean
): string[] {
  const glyph = GLYPHS[ch.toUpperCase()] ?? GLYPHS["?"]!
  return glyph.map((row) =>
    Array.from(row)
      .map((px) => {
        const c = px === "#" ? ink : void_
        return fat ? c + c : c
      })
      .join("")
  )
}

/**
 * ASCII Wordmark — FIGlet-style lettering from a 3×5 pixel font, each on
 * cell drawn in `ink`, doubled horizontally for a chunky CRT feel. Pure
 * render: no client JS, just text you can paste straight into a hero.
 */
export function AsciiWordmark({
  text = "ATROUI",
  ink = "█",
  void: void_ = " ",
  fat = true,
  label,
  className,
}: AsciiWordmarkProps) {
  const spelled = Array.from(text.toUpperCase()).slice(0, 24)
  const rows = [0, 1, 2, 3, 4].map((r) =>
    spelled.map((ch) => charsFor(ch, ink, void_, fat)[r]).join("  ")
  )

  return (
    <pre
      role="img"
      aria-label={label ?? text}
      className={cn(
        "m-0 select-none whitespace-pre font-mono text-[10px] leading-[1.12] text-primary sm:text-[13px]",
        className
      )}
    >
      {rows.join("\n")}
    </pre>
  )
}
