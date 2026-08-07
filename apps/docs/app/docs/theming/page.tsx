import type { Metadata } from "next"
import { CodeBlock } from "@/components/code-block"
import Link from "next/link"
import { docsPageMetadata } from "@/lib/docs-metadata"

export const metadata: Metadata = docsPageMetadata({
  title: "Theming",
  description:
    "AtroUI dark-first design tokens - black canvas, brand #0b7bff, glass surfaces, Caveat sketch display + Outfit UI. Customize host CSS and @atroui/brand.",
  path: "/docs/theming",
})

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
          ),{" "}
          <strong className="font-medium text-foreground">
            Caveat sketch display
          </strong>
          , Outfit UI, glass panels, and pill CTAs. After{" "}
          <code className="rounded-md bg-muted px-1.5 py-0.5 font-mono text-[12px] text-foreground">
            npx shadcn add
          </code>
          , tokens live in{" "}
          <strong className="font-medium text-foreground">your</strong> host
          CSS (or a theme sheet you copy), not behind a required npm import.
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
        <p className="text-[15px] font-light leading-relaxed text-muted-foreground">
          The docs host and Host API consumers can still import{" "}
          <code className="rounded-md bg-muted px-1.5 py-0.5 font-mono text-[12px] text-foreground">
            atroui/globals.css
          </code>{" "}
          from the npm package when they already depend on{" "}
          <code className="rounded-md bg-muted px-1.5 py-0.5 font-mono text-[12px] text-foreground">
            atroui
          </code>
          . Pure registry apps should keep tokens in the host stylesheet the
          CLI/theme setup already owns. See{" "}
          <Link href="/blog/npm-to-shadcn-registry" className="bam-link">
            npm → shadcn registry
          </Link>
          .
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="ds-headline text-base text-foreground">Fonts</h2>
        <p className="text-[15px] font-light leading-relaxed text-muted-foreground">
          Two voices on purpose:
        </p>
        <ul className="list-disc space-y-2 pl-5 text-[15px] text-muted-foreground">
          <li>
            <strong className="text-foreground">Caveat (sketch)</strong> —
            brand display, stamps, hero couplets (
            <code className="rounded-md bg-muted px-1.5 py-0.5 font-mono text-[12px] text-foreground">
              --font-sketch
            </code>
            ,{" "}
            <code className="rounded-md bg-muted px-1.5 py-0.5 font-mono text-[12px] text-foreground">
              .ds-display
            </code>
            ,{" "}
            <code className="rounded-md bg-muted px-1.5 py-0.5 font-mono text-[12px] text-foreground">
              .ds-sketch
            </code>
            ,{" "}
            <code className="rounded-md bg-muted px-1.5 py-0.5 font-mono text-[12px] text-foreground">
              .ms-stamp
            </code>
            ). The chalkboard{" "}
            <span className="ds-sketch text-foreground">
              Own the UI. Borrow the API.
            </span>{" "}
            mark is the reference.
          </li>
          <li>
            <strong className="text-foreground">Outfit</strong> — body, section
            headlines (
            <code className="rounded-md bg-muted px-1.5 py-0.5 font-mono text-[12px] text-foreground">
              .ds-headline
            </code>
            ), UI chrome. Readable for long docs.
          </li>
          <li>
            <strong className="text-foreground">Geist Mono</strong> — code.
          </li>
        </ul>
        <p className="text-[15px] font-light leading-relaxed text-muted-foreground">
          On the docs host, load Caveat + Outfit in the root layout and expose{" "}
          <code className="rounded-md bg-muted px-1.5 py-0.5 font-mono text-[12px] text-foreground">
            --font-caveat
          </code>{" "}
          /{" "}
          <code className="rounded-md bg-muted px-1.5 py-0.5 font-mono text-[12px] text-foreground">
            --font-outfit
          </code>
          .
        </p>
        <CodeBlock
          language="css"
          code={`/* Token map (already in atroui globals) */
--font-sketch: var(--font-caveat);
--font-display: var(--font-sketch); /* page titles, brand marks */
--font-heading: var(--font-outfit); /* section h2 */
--font-sans: var(--font-outfit);    /* body / UI */`}
        />
      </section>

      <section className="space-y-4">
        <h2 className="ds-headline text-base text-foreground">Site brand</h2>
        <p className="text-[15px] font-light leading-relaxed text-muted-foreground">
          Chrome strings (name, domain, email, site URL) come from{" "}
          <code className="rounded-md bg-muted px-1.5 py-0.5 font-mono text-[12px] text-foreground">
            getBrand()
          </code>{" "}
          after you add{" "}
          <code className="rounded-md bg-muted px-1.5 py-0.5 font-mono text-[12px] text-foreground">
            @atroui/brand
          </code>{" "}
          (typically{" "}
          <code className="rounded-md bg-muted px-1.5 py-0.5 font-mono text-[12px] text-foreground">
            lib/brand.ts
          </code>
          ). Defaults are AtroUI; override with env:
        </p>
        <CodeBlock
          language="bash"
          code={`NEXT_PUBLIC_SITE_NAME=AtroUI\nNEXT_PUBLIC_SITE_DOMAIN=atroui.com\nNEXT_PUBLIC_SITE_EMAIL=hello@iamk.xyz\nNEXT_PUBLIC_SITE_URL=https://www.atroui.com`}
        />
        <p className="text-[15px] font-light leading-relaxed text-muted-foreground">
          Demo modules may still show studio sample copy - swap{" "}
          <code className="rounded-md bg-muted px-1.5 py-0.5 font-mono text-[12px] text-foreground">
            CONTENT
          </code>{" "}
          at the top of each installed block when shipping your own site.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="ds-headline text-base text-foreground">Dark mode</h2>
        <p className="text-[15px] font-light leading-relaxed text-muted-foreground">
          Use{" "}
          <code className="rounded-md bg-muted px-1.5 py-0.5 font-mono text-[12px] text-foreground">
            next-themes
          </code>{" "}
          with{" "}
          <code className="rounded-md bg-muted px-1.5 py-0.5 font-mono text-[12px] text-foreground">
            attribute=&quot;class&quot;
          </code>
          . Add the toggle from the registry:{" "}
          <code className="rounded-md bg-muted px-1.5 py-0.5 font-mono text-[12px] text-foreground">
            npx shadcn add @atroui/theme-toggle
          </code>
          .
        </p>
        <CodeBlock
          language="tsx"
          code={`import { ThemeProvider } from "next-themes"
import { ThemeToggle } from "@/components/ui/theme-toggle"

<ThemeProvider attribute="class" defaultTheme="system" enableSystem>
  <ThemeToggle />
  {children}
</ThemeProvider>`}
        />
      </section>
    </article>
  )
}
