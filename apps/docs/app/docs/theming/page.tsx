import type { Metadata } from "next"
import { CodeBlock } from "@/components/code-block"
import { DocsPageHeader } from "@/components/docs-page-header"
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
      <DocsPageHeader
        eyebrow="Getting started"
        title="Theming"
        description={
          <>
            AtroUI&rsquo;s design system is dark-first: black canvas, brand blue
            from the hero shader (
            <code className="rounded-md bg-muted px-1.5 py-0.5 font-mono text-[12px] text-foreground">
              #0b7bff
            </code>
            ),{" "}
            <strong className="font-medium text-foreground">
              Caveat sketch display
            </strong>
            , Outfit UI, quiet panels, and soft-rect CTAs. After{" "}
            <code className="rounded-md bg-muted px-1.5 py-0.5 font-mono text-[12px] text-foreground">
              npx shadcn add
            </code>
            , tokens live in{" "}
            <strong className="font-medium text-foreground">your</strong> host
            CSS (or a theme sheet you copy), not behind a required npm import.
          </>
        }
      />

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
            brand display, stamps, list titles, nav section rails (
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
            ,{" "}
            <code className="rounded-md bg-muted px-1.5 py-0.5 font-mono text-[12px] text-foreground">
              .ds-nav-section
            </code>
            ).
          </li>
          <li>
            <strong className="text-foreground">Outfit (calm UI)</strong> —
            body and supporting copy at{" "}
            <em className="text-foreground">regular</em> weight — not
            ultra-light — so it sits quietly under handwriting (
            <code className="rounded-md bg-muted px-1.5 py-0.5 font-mono text-[12px] text-foreground">
              .ds-lede
            </code>
            ,{" "}
            <code className="rounded-md bg-muted px-1.5 py-0.5 font-mono text-[12px] text-foreground">
              .ds-body
            </code>
            ,{" "}
            <code className="rounded-md bg-muted px-1.5 py-0.5 font-mono text-[12px] text-foreground">
              .ds-meta
            </code>
            ,{" "}
            <code className="rounded-md bg-muted px-1.5 py-0.5 font-mono text-[12px] text-foreground">
              .ds-headline
            </code>
            ).
          </li>
          <li>
            <strong className="text-foreground">Geist Mono</strong> — code /
            technical precision.
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
        <h2 className="ds-headline text-base text-foreground">Radius</h2>
        <p className="text-[15px] font-light leading-relaxed text-muted-foreground">
          One knob. CTAs, stamps, and panels use{" "}
          <code className="rounded-md bg-muted px-1.5 py-0.5 font-mono text-[12px] text-foreground">
            --radius
          </code>{" "}
          (and{" "}
          <code className="rounded-md bg-muted px-1.5 py-0.5 font-mono text-[12px] text-foreground">
            --radius-lg
          </code>
          ,{" "}
          <code className="rounded-md bg-muted px-1.5 py-0.5 font-mono text-[12px] text-foreground">
            --radius-md
          </code>
          ). Default is soft rectangle — not capsules. Circles stay for avatars,
          status dots, and true toggles.
        </p>
        <CodeBlock
          language="css"
          code={`:root {\n  /* Soft rect (AtroUI default) */\n  --radius: 0.875rem;\n\n  /* Sharp — set once, CTAs follow */\n  /* --radius: 0; */\n\n  /* Extra soft — still not a pill */\n  /* --radius: 1.25rem; */\n}`}
        />
        <p className="text-[15px] font-light leading-relaxed text-muted-foreground">
          Want full pills? Edit the installed block — change{" "}
          <code className="rounded-md bg-muted px-1.5 py-0.5 font-mono text-[12px] text-foreground">
            rounded-lg
          </code>{" "}
          to{" "}
          <code className="rounded-md bg-muted px-1.5 py-0.5 font-mono text-[12px] text-foreground">
            rounded-full
          </code>{" "}
          on that button. We don&rsquo;t ship a second variant of every block.
        </p>
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
          . If flipping to dark hides muted copy or flattens a designed light
          palette, use{" "}
          <Link href="/docs/components/ui-theme-adapt" className="bam-link">
            Adaptive Theme Switch
          </Link>{" "}
          (
          <code className="rounded-md bg-muted px-1.5 py-0.5 font-mono text-[12px] text-foreground">
            @atroui/theme-adapt
          </code>
          ) instead. It still uses{" "}
          <code className="rounded-md bg-muted px-1.5 py-0.5 font-mono text-[12px] text-foreground">
            .dark
          </code>
          , then lifts type tokens to WCAG AA.
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
