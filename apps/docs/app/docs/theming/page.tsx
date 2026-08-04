import type { Metadata } from "next"
import { CodeBlock } from "@/components/code-block"

export const metadata: Metadata = {
  title: "Theming",
}

export default function ThemingPage() {
  return (
    <article className="mx-auto max-w-3xl space-y-10">
      <header>
        <p className="ms-stamp mb-3">Getting started</p>
        <h1 className="ds-display text-3xl text-foreground sm:text-4xl">
          Theming
        </h1>
        <p className="mt-3 max-w-2xl text-[15px] font-light leading-relaxed text-muted-foreground">
          AtroUI&rsquo;s design system is dark-first: black canvas, brand blue
          from the hero shader (
          <code className="rounded-md bg-muted px-1.5 py-0.5 font-mono text-[12px] text-foreground">
            #0b7bff
          </code>
          ), Outfit UI, glass panels, and pill CTAs. Tokens live in{" "}
          <code className="rounded-md bg-muted px-1.5 py-0.5 font-mono text-[12px] text-foreground">
            atroui/globals.css
          </code>
          .
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="ds-headline text-base text-foreground">CSS variables</h2>
        <p className="text-[15px] font-light leading-relaxed text-muted-foreground">
          Light and dark themes live under{" "}
          <code className="rounded-md bg-muted px-1.5 py-0.5 font-mono text-[12px] text-foreground">
            :root
          </code>{" "}
          and{" "}
          <code className="rounded-md bg-muted px-1.5 py-0.5 font-mono text-[12px] text-foreground">
            .dark
          </code>
          . Override brand or neutrals to restyle without rewriting components.
        </p>
        <CodeBlock
          language="css"
          code={`.dark {\n  --brand: oklch(0.62 0.2 255);\n  --background: oklch(0 0 0);\n  --primary: oklch(0.99 0 0);\n  --primary-foreground: oklch(0 0 0);\n  --font-sans: var(--font-outfit);\n}`}
        />
      </section>

      <section className="space-y-4">
        <h2 className="ds-headline text-base text-foreground">Fonts</h2>
        <p className="text-[15px] font-light leading-relaxed text-muted-foreground">
          Load Outfit in the host layout and expose{" "}
          <code className="rounded-md bg-muted px-1.5 py-0.5 font-mono text-[12px] text-foreground">
            --font-outfit
          </code>
          . Display and UI share the same family at medium weight — matching
          the hero typography.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="ds-headline text-base text-foreground">Dark mode</h2>
        <p className="text-[15px] font-light leading-relaxed text-muted-foreground">
          Prefer the package{" "}
          <code className="rounded-md bg-muted px-1.5 py-0.5 font-mono text-[12px] text-foreground">
            ThemeProvider
          </code>{" "}
          with{" "}
          <code className="rounded-md bg-muted px-1.5 py-0.5 font-mono text-[12px] text-foreground">
            enableSystem
          </code>
          . Pair with{" "}
          <code className="rounded-md bg-muted px-1.5 py-0.5 font-mono text-[12px] text-foreground">
            ThemeToggle
          </code>
          .
        </p>
        <CodeBlock
          language="tsx"
          code={`import { ThemeProvider, ThemeToggle } from "atroui"\n\n<ThemeProvider attribute="class" defaultTheme="system" enableSystem>\n  <ThemeToggle />\n  {children}\n</ThemeProvider>`}
        />
      </section>
    </article>
  )
}
