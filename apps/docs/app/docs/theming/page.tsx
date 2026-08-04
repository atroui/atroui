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
        <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-muted-foreground">
          Meridian uses the Makershot stone OKLCH system — copper brand accent,
          Outfit UI, Fraunces display. Tokens are CSS variables in{" "}
          <code className="rounded-md bg-muted px-1.5 py-0.5 font-mono text-[12px] text-foreground">
            @meridian/ui/globals.css
          </code>
          .
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="ds-headline text-base text-foreground">CSS variables</h2>
        <p className="text-[15px] leading-relaxed text-muted-foreground">
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
          code={`:root {\n  --color-brand: oklch(0.72 0.12 55);\n  --color-brand-hover: oklch(0.78 0.12 55);\n  --font-sans: var(--font-outfit);\n  --font-display: var(--font-fraunces);\n}`}
        />
      </section>

      <section className="space-y-4">
        <h2 className="ds-headline text-base text-foreground">Fonts</h2>
        <p className="text-[15px] leading-relaxed text-muted-foreground">
          Load Outfit and Fraunces in the host layout and expose{" "}
          <code className="rounded-md bg-muted px-1.5 py-0.5 font-mono text-[12px] text-foreground">
            --font-outfit
          </code>{" "}
          /{" "}
          <code className="rounded-md bg-muted px-1.5 py-0.5 font-mono text-[12px] text-foreground">
            --font-fraunces
          </code>{" "}
          (see the docs root layout). Display classes like{" "}
          <code className="rounded-md bg-muted px-1.5 py-0.5 font-mono text-[12px] text-foreground">
            ds-display
          </code>{" "}
          depend on them.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="ds-headline text-base text-foreground">Dark mode</h2>
        <p className="text-[15px] leading-relaxed text-muted-foreground">
          Prefer the package{" "}
          <code className="rounded-md bg-muted px-1.5 py-0.5 font-mono text-[12px] text-foreground">
            ThemeProvider
          </code>{" "}
          (next-themes wrapper) with{" "}
          <code className="rounded-md bg-muted px-1.5 py-0.5 font-mono text-[12px] text-foreground">
            attribute=&quot;class&quot;
          </code>
          . Pair with{" "}
          <code className="rounded-md bg-muted px-1.5 py-0.5 font-mono text-[12px] text-foreground">
            ThemeToggle
          </code>
          .
        </p>
        <CodeBlock
          language="tsx"
          code={`import { ThemeProvider, ThemeToggle } from "@meridian/ui"\n\n<ThemeProvider attribute="class" defaultTheme="system" enableSystem>\n  <ThemeToggle />\n  {children}\n</ThemeProvider>`}
        />
      </section>
    </article>
  )
}
