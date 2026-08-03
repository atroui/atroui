import type { Metadata } from "next"
import { CodeBlock } from "@/components/code-block"

export const metadata: Metadata = {
  title: "Theming",
}

export default function ThemingPage() {
  return (
    <article className="mx-auto max-w-3xl space-y-10">
      <header>
        <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.08em] text-neutral-400">
          Getting started
        </p>
        <h1 className="text-[2rem] font-semibold tracking-tight text-neutral-950 sm:text-[2.35rem]">
          Theming
        </h1>
        <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-neutral-500 sm:text-base">
          Meridian uses CSS variables for color tokens. Override them to match your brand.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-[15px] font-semibold text-neutral-950">CSS variables</h2>
        <p className="text-[15px] leading-relaxed text-neutral-500">
          Tokens live in{" "}
          <code className="rounded-md bg-[#f7f8fa] px-1.5 py-0.5 font-mono text-[12px] text-neutral-700">
            @meridian/ui/globals.css
          </code>
          . Light and dark themes are defined under{" "}
          <code className="rounded-md bg-[#f7f8fa] px-1.5 py-0.5 font-mono text-[12px] text-neutral-700">
            :root
          </code>{" "}
          and{" "}
          <code className="rounded-md bg-[#f7f8fa] px-1.5 py-0.5 font-mono text-[12px] text-neutral-700">
            .dark
          </code>
          .
        </p>
        <CodeBlock
          language="css"
          code={`:root {\n  --primary: 168 55% 32%;\n  --primary-foreground: 40 33% 98%;\n  --radius: 0.625rem;\n}`}
        />
      </section>

      <section className="space-y-4">
        <h2 className="text-[15px] font-semibold text-neutral-950">Dark mode</h2>
        <p className="text-[15px] leading-relaxed text-neutral-500">
          Use{" "}
          <code className="rounded-md bg-[#f7f8fa] px-1.5 py-0.5 font-mono text-[12px] text-neutral-700">
            next-themes
          </code>{" "}
          with{" "}
          <code className="rounded-md bg-[#f7f8fa] px-1.5 py-0.5 font-mono text-[12px] text-neutral-700">
            attribute=&quot;class&quot;
          </code>
          . Toggle the{" "}
          <code className="rounded-md bg-[#f7f8fa] px-1.5 py-0.5 font-mono text-[12px] text-neutral-700">
            .dark
          </code>{" "}
          class to switch themes.
        </p>
        <CodeBlock
          language="tsx"
          code={`import { ThemeProvider } from "next-themes"\n\n<ThemeProvider attribute="class" defaultTheme="system" enableSystem>\n  {children}\n</ThemeProvider>`}
        />
      </section>
    </article>
  )
}
