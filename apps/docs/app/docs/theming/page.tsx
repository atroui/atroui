import type { Metadata } from "next"
import { CodeBlock } from "@/components/code-block"

export const metadata: Metadata = {
  title: "Theming",
}

export default function ThemingPage() {
  return (
    <article className="mx-auto max-w-3xl space-y-8">
      <div>
        <h1 className="font-display text-4xl tracking-tight">Theming</h1>
        <p className="mt-3 text-lg text-muted-foreground">
          Meridian uses CSS variables for color tokens. Override them to match your brand.
        </p>
      </div>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold">CSS variables</h2>
        <p className="text-muted-foreground">
          Tokens live in <code className="rounded bg-muted px-1.5 py-0.5 text-xs">@meridian/ui/globals.css</code>.
          Light and dark themes are defined under <code className="rounded bg-muted px-1 text-xs">:root</code> and{" "}
          <code className="rounded bg-muted px-1 text-xs">.dark</code>.
        </p>
        <CodeBlock
          language="css"
          code={`:root {\n  --primary: 168 55% 32%;\n  --primary-foreground: 40 33% 98%;\n  --radius: 0.625rem;\n}`}
        />
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold">Dark mode</h2>
        <p className="text-muted-foreground">
          The docs site uses <code className="rounded bg-muted px-1.5 py-0.5 text-xs">next-themes</code> with{" "}
          <code className="rounded bg-muted px-1 text-xs">attribute=&quot;class&quot;</code>. Toggle via the navbar
          control, or set the theme programmatically.
        </p>
        <CodeBlock
          language="tsx"
          code={`import { ThemeProvider } from "next-themes"\n\n<ThemeProvider attribute="class" defaultTheme="system" enableSystem>\n  {children}\n</ThemeProvider>`}
        />
      </section>
    </article>
  )
}
