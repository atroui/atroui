import Link from "next/link"
import { ComponentDoc } from "@/components/component-doc"
import type { PropRow } from "@/components/props-table"
import { AsciiBar } from "../../../registry/default/ui/ascii-bar"
import { AsciiBoot } from "../../../registry/default/ui/ascii-boot"
import { AsciiDecode } from "../../../registry/default/ui/ascii-decode"
import { AsciiDonut } from "../../../registry/default/ui/ascii-donut"
import { AsciiRain } from "../../../registry/default/ui/ascii-rain"
import { AsciiSpark } from "../../../registry/default/ui/ascii-spark"
import { AsciiWave } from "../../../registry/default/ui/ascii-wave"
import { AsciiWordmark } from "../../../registry/default/ui/ascii-wordmark"

/** Preview stage — the ASCII family reads best on a card at fixed size. */
function Stage({ children }: { children: React.ReactNode }) {
  return (
    <div className="overflow-x-auto rounded-[var(--radius)] bg-card p-6">
      <div className="flex min-w-max justify-center py-2">{children}</div>
    </div>
  )
}

/** ─── Section index ─────────────────────────────────────────────────── */

const TECHNIQUES: { href: string; name: string; via: string }[] = [
  { href: "/docs/components/ascii-donut", name: "Donut", via: "3D · z-buffer · luminance ramp" },
  { href: "/docs/components/ascii-rain", name: "Rain", via: "procedural field · fade tails" },
  { href: "/docs/components/ascii-wave", name: "Wave", via: "function field f(x,y,t)" },
  { href: "/docs/components/ascii-spark", name: "Spark", via: "block elements ▁–█" },
  { href: "/docs/components/ascii-bar", name: "Bar", via: "pseudo-graphics progress ▰▱" },
  { href: "/docs/components/ascii-boot", name: "Boot", via: "frame-flip typewriter" },
  { href: "/docs/components/ascii-wordmark", name: "Wordmark", via: "FIGlet pixel font" },
  { href: "/docs/components/ascii-decode", name: "Decode", via: "scramble decrypt" },
]

export function AsciiIndexDoc() {
  return (
    <article className="space-y-10">
      <header className="docs-book-header">
        <p className="docs-book-eyebrow">Catalog · ASCII</p>
        <h1 className="docs-book-title">ASCII</h1>
        <p className="docs-book-lede">
          Characters are pixels. Eight effects, each built on a different
          text-rendering technique — luminance ramps, z-buffered 3D,
          function fields, frame-flip animation, block elements, pixel
          lettering. All pure text underneath: you own the glyphs and can
          paste them anywhere a string goes.
        </p>
      </header>

      <section className="space-y-3">
        <h2 className="docs-section-title" id="rig">
          Shared rig
        </h2>
        <p>
          The family shares one small lib — <code>@atroui/ascii-rig</code> —
          with the character ramps, the tick loop (pauses offscreen, honors
          reduced motion, budgeted to ~16&nbsp;fps, deliberately machine-y),
          and canvas cell metrics so columns land on exact character-cell
          widths. Install it alongside any effect:
        </p>
        <div className="overflow-hidden rounded-[var(--radius)] border bg-card">
          <div className="border-b px-5 py-2 font-mono text-xs text-foreground/60">
            npx shadcn@latest add @atroui/ascii-rig @atroui/ascii-donut
          </div>
          <pre className="pointer-events-none px-5 py-6">
            <AsciiWave cols={44} rows={5} label="Wave rig preview" />
          </pre>
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="docs-section-title" id="techniques">
          Technique map
        </h2>
        <ul className="divide-y divide-border rounded-[var(--radius)] border">
          {TECHNIQUES.map((t) => (
            <li key={t.href}>
              <Link
                href={t.href}
                className="flex items-baseline justify-between gap-4 px-5 py-3 transition-colors hover:bg-muted/60"
              >
                <span className="font-mono text-sm">{t.name}</span>
                <span className="text-right text-xs text-foreground/55">
                  {t.via}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </article>
  )
}

/** ─── Donut ─────────────────────────────────────────────────────────── */

export function AsciiDonutDoc() {
  const props: PropRow[] = [
    { name: "cols", type: "number", default: "64", description: "Columns in character cells; rows derive from the 1:2 cell ratio." },
    { name: "speed", type: "number", default: "1", description: "Spin multiplier." },
    { name: "chars", type: "string", default: '.,-~:;=!*#$@', description: "Luminance ramp (dim → bright), or a rig ramp name." },
    { name: "label", type: "string", default: '"Rotating ASCII torus"', description: "Accessible description; canvas is aria-hidden." },
    { name: "className", type: "string", default: "—", description: "Regular className." },
  ]
  return (
    <ComponentDoc
      href="/docs/components/ascii-donut"
      registryName="ascii-donut"
      title="ASCII Donut"
      description="The spinning torus — 3D points depth-buffered per character cell and shaded by surface normal through a luminance ramp (.,-~:;=!*#$@)."
      preview={
        <Stage>
          <AsciiDonut cols={62} label="Rotating ASCII torus, 62 columns" />
        </Stage>
      }
      code={`import { AsciiDonut } from "@/components/ui/ascii-donut"

<AsciiDonut cols={80} speed={1.2} />`}
      usage="One hero-moment scene. Keep cols ≤ 110 — the frame is pure canvas work and small cells are happier than big ones. Pass chars='newskool' for the scene-style ramp."
      props={props}
    />
  )
}

/** ─── Rain ──────────────────────────────────────────────────────────── */

export function AsciiRainDoc() {
  const props: PropRow[] = [
    { name: "cols", type: "number", default: "52", description: "Stream count; wider grids use proportionally more rows." },
    { name: "speed", type: "number", default: "1", description: "Fall-speed multiplier." },
    { name: "chars", type: "string", default: "half-width katakana", description: "Characters that fall — any string." },
    { name: "label", type: "string", default: '"Falling columns of characters"', description: "Accessible description." },
    { name: "className", type: "string", default: "—", description: "Regular className." },
  ]
  return (
    <ComponentDoc
      href="/docs/components/ascii-rain"
      registryName="ascii-rain"
      title="ASCII Rain"
      description="Falling streams of glyphs whose color fades along each tail, head cell bright — the procedural field effect behind the matrix look."
      preview={
        <Stage>
          <AsciiRain cols={46} />
        </Stage>
      }
      code={`import { AsciiRain } from "@/components/ui/ascii-rain"

<div className="relative overflow-hidden rounded-[var(--radius)] bg-card p-10">
  <AsciiRain cols={64} opacity={0.5} />
  <p className="relative">Lands behind your content</p>
</div>`}
      usage="Pin behind content like meteors: the canvas is decorative (aria-hidden under a role=img wrapper). Swap chars to '01' for a leaner field, katakana for the classic."
      props={props}
    />
  )
}

/** ─── Wave ──────────────────────────────────────────────────────────── */

export function AsciiWaveDoc() {
  const props: PropRow[] = [
    { name: "cols", type: "number", default: "56", description: "Grid width in cells (clamped 16–160)." },
    { name: "rows", type: "number", default: "16", description: "Grid height in lines (clamped 4–64)." },
    { name: "speed", type: "number", default: "1", description: "Field speed multiplier." },
    { name: "chars", type: "string", default: "ladder", description: "Ramp for the field, dim → bright." },
    { name: "label", type: "string", default: '"Interference wave of characters"', description: "Accessible description." },
    { name: "className", type: "string", default: "—", description: "Regular className." },
  ]
  return (
    <ComponentDoc
      href="/docs/components/ascii-wave"
      registryName="ascii-wave"
      title="ASCII Wave"
      description="Every visible cell is f(x, y, t) — travelling sines over a diagonal carrier — mapped through a luminance ramp. One text node per frame, no canvas."
      preview={
        <Stage>
          <AsciiWave cols={54} rows={13} />
        </Stage>
      }
      code={`import { AsciiWave } from "@/components/ui/ascii-wave"

<AsciiWave cols={72} rows={7} chars={"░▒▓"} />`}
      usage="A quiet background band for footers and horns of hero sections. Sizing: cells at text-[11px] are ~11px wide; keep rows small so the band stays a band."
      props={props}
    />
  )
}

/** ─── Spark ─────────────────────────────────────────────────────────── */

export function AsciiSparkDoc() {
  const props: PropRow[] = [
    { name: "data", type: "number[]", default: "12-point sample", description: "Series drawn as bar heights." },
    { name: "max", type: "number", default: "series max", description: "Scale ceiling for bar height." },
    { name: "label", type: "string", default: '"first → last over N points"', description: "Accessible one-line summary." },
    { name: "className", type: "string", default: "—", description: "Regular className." },
  ]
  return (
    <ComponentDoc
      href="/docs/components/ascii-spark"
      registryName="ascii-spark"
      title="ASCII Spark"
      description="A series compressed to block-element bars (▁▂▃▄▅▆▇█) — zero animation, plain text you can copy. Works inline, even server-rendered."
      preview={
        <div className="flex flex-wrap items-center gap-3 rounded-[var(--radius)] bg-card p-6 font-mono text-sm">
          <AsciiSpark data={[4, 9, 7, 12, 10, 15, 11, 18, 13, 17, 22, 19]} />
          <span className="text-foreground/55">
            weekly bookings · past 12 weeks
          </span>
        </div>
      }
      code={`import { AsciiSpark } from "@/components/ui/ascii-spark"

<AsciiSpark data={weeks.map((w) => w.signups)} max={40} />`}
      usage="Sits inline after a headline or in stat bands. Contrast comes from text-primary; size it with className text-sm/text-lg like any font string."
      props={props}
    />
  )
}

/** ─── Bar ───────────────────────────────────────────────────────────── */

export function AsciiBarDoc() {
  const props: PropRow[] = [
    { name: "value", type: "number", default: "68", description: "0–100." },
    { name: "cols", type: "number", default: "24", description: "Bar width in ▰▱ cells." },
    { name: "showPercent", type: "boolean", default: "true", description: "Append a percent readout after the bar." },
    { name: "label", type: "string", default: '"Progress"', description: "Accessible name; aria-valuenow tracks value." },
    { name: "className", type: "string", default: "—", description: "Regular className." },
  ]
  return (
    <ComponentDoc
      href="/docs/components/ascii-bar"
      registryName="ascii-bar"
      title="ASCII Bar"
      description="A progress readout in pseudo-graphics (▰▱) that fills in discrete plottable steps — percentage tweens with the fill, reduced motion jumps straight to target."
      preview={
        <Stage>
          <AsciiBar value={64} label="Storage used" />
        </Stage>
      }
      code={`import { AsciiBar } from "@/components/ui/ascii-bar"

<AsciiBar value={quotaPct} label="Storage used" cols={18} />`}
      usage="Good inside tables and status cards where a design-system progress bar would read too polished. Keep cols ≤ 40 so the bar stays readable at small sizes."
      props={props}
    />
  )
}

/** ─── Boot ──────────────────────────────────────────────────────────── */

export function AsciiBootDoc() {
  const props: PropRow[] = [
    { name: "lines", type: "string[]", default: "init-log sample", description: "Log lines typed in order." },
    { name: "speed", type: "number", default: "9", description: "Milliseconds per character." },
    { name: "lineDelay", type: "number", default: "260", description: "Pause after each completed line." },
    { name: "loop", type: "boolean", default: "false", description: "Restart after a settled dwell." },
    { name: "label", type: "string", default: '"Boot log"', description: "Accessible description." },
    { name: "className", type: "string", default: "—", description: "Regular className." },
  ]
  return (
    <ComponentDoc
      href="/docs/components/ascii-boot"
      registryName="ascii-boot"
      title="ASCII Boot"
      description="An init-log typewriter — classic VT100 flavor: lines typed character-by-character with a pause between them, cursor pulsing at the end."
      preview={
        <Stage>
          <AsciiBoot />
        </Stage>
      }
      code={`import { AsciiBoot } from "@/components/ui/ascii-boot"

<AsciiBoot
  lines={[
    "[ OK ] deploy edge",
    "[ OK ] hydrate islands",
    ">> live",
  ]}
/>`}
      usage="Frame-flip form: lines are state, so read them like typed terminal output. Reduced motion prints the whole log at once. Runs at character granularity — long lines cost time."
      props={props}
    />
  )
}

/** ─── Wordmark ──────────────────────────────────────────────────────── */

export function AsciiWordmarkDoc() {
  const props: PropRow[] = [
    { name: "text", type: "string", default: '"ATROUI"', description: "Text to spell — A–Z, 0–9, space, and - . : ! ? + &." },
    { name: "ink", type: "string", default: '"█"', description: "Character used for on-cells." },
    { name: "void", type: "string", default: '" "', description: "Character between ink cells — try · or ░." },
    { name: "fat", type: "boolean", default: "true", description: "Double each cell horizontally for the chunky CRT feel." },
    { name: "label", type: "string", default: "the text itself", description: "Accessible name; the pre is decorative." },
    { name: "className", type: "string", default: "—", description: "Regular className — size with text-*." },
  ]
  return (
    <ComponentDoc
      href="/docs/components/ascii-wordmark"
      registryName="ascii-wordmark"
      title="ASCII Wordmark"
      description="FIGlet-style lettering from a built-in 3×5 pixel font — big-text banners that are still plain text underneath, pasteable anywhere."
      preview={
        <Stage>
          <AsciiWordmark text="ATROUI" />
        </Stage>
      }
      code={`import { AsciiWordmark } from "@/components/ui/ascii-wordmark"

<AsciiWordmark text="SHIP IT" ink="▓" void="·" fat={false} />`}
      usage="Zero client JS. Unknown characters fall back to a visible placeholder glyph — keep text to the supported set. Size via className text-[10px] … sm:text-[13px]."
      props={props}
    />
  )
}

/** ─── Decode ────────────────────────────────────────────────────────── */

export function AsciiDecodeDoc() {
  const props: PropRow[] = [
    { name: "text", type: "string", default: '"characters are pixels"', description: "The message resolved from the scramble." },
    { name: "charset", type: "string", default: "<>!_[]{}=+*^?#", description: "Cipher pool for unresolved characters." },
    { name: "duration", type: "number", default: "1800", description: "Total reveal time in ms (clamped 200–8000)." },
    { name: "loop", type: "boolean", default: "false", description: "Scramble again after a settled dwell." },
    { name: "label", type: "string", default: '"Decrypting text"', description: "Accessible name for the decorative line." },
    { name: "className", type: "string", default: "—", description: "Regular className." },
  ]
  return (
    <ComponentDoc
      href="/docs/components/ascii-decode"
      registryName="ascii-decode"
      title="ASCII Decode"
      description="The decrypt resolve — a whole line of cipher glyphs locking into the message left-to-right, each character churning at bit-stable frame frequencies so it flickers deliberately, not randomly."
      preview={
        <Stage>
          <AsciiDecode text="the terminal never sleeps" loop />
        </Stage>
      }
      code={`import { AsciiDecode } from "@/components/ui/ascii-decode"

<AsciiDecode
  text="signed in as boss"
  duration={1400}
/>`}
      usage="Best on status lines and empty-state headings. Starts when scrolled into view, pauses offscreen. Min-height is baked in so layout doesn't jump while scrambling."
      props={props}
    />
  )
}
