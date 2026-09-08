import { CodeBlock } from "@/components/code-block"
import { DocsArticleHeader } from "@/components/docs/docs-article-header"
import { DocsPager } from "@/components/docs-pager"
import Link from "next/link"


export function ThemingGuide() {
  return (
    <article className="space-y-10">
      <DocsArticleHeader
        eyebrow="Getting started"
        title="Theming"
        lede={
          <>
            Dark-first tokens on a cool charcoal canvas. Primary and{" "}
            <code>--brand</code> share the same violet (
            <code>#6d28d9</code> /{" "}
            <code>oklch(0.457 0.24 277)</code>).{" "}
            <strong>Merriweather</strong> for headings,{" "}
            <strong>DM Sans</strong> for UI and body, opt-in Caveat
            sketch, soft-rect CTAs via <code>--radius</code>. After{" "}
            <code>npx shadcn add</code>, tokens live in{" "}
            <strong>your</strong> host CSS (or a theme sheet you copy), not
            behind a required npm import.
          </>
        }
      />

      <section className="space-y-4">
        <h2 className="docs-section-title">CSS variables</h2>
        <p className="leading-relaxed">
          Light and dark themes live under{" "}
          <code className="rounded-md bg-muted px-1.5 py-0.5 font-mono text-[12px] text-foreground">
            :root
          </code>{" "}
          and{" "}
          <code className="rounded-md bg-muted px-1.5 py-0.5 font-mono text-[12px] text-foreground">
            .dark
          </code>
          . Override brand or neutrals to restyle without rewriting components.
          Site chrome CTAs (<code>.atro-btn</code>, <code>.ms-cta</code>) and
          shadcn <code>Button</code> all read <code>--primary</code>.
        </p>
        <CodeBlock
          language="css"
          code={`.dark {\n  --background: oklch(0.141 0.005 285.823);\n  --foreground: oklch(0.985 0 0);\n  --primary: oklch(0.398 0.195 277.366);\n  --primary-foreground: oklch(0.962 0.018 272.314);\n  --brand: oklch(0.585 0.233 277.117);\n  --font-sans: var(--font-dm-sans);\n}`}
        />
        <p className="leading-relaxed">
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
        <h2 className="docs-section-title">Fonts</h2>
        <p className="leading-relaxed">
          Same pairing as the shadcn Mira + Indigo preset:
        </p>
        <ul className="list-disc space-y-2 pl-5">
          <li>
            <strong className="text-foreground">Merriweather (headings)</strong>{" "}
            — page titles, section H2s, display accents (
            <code className="rounded-md bg-muted px-1.5 py-0.5 font-mono text-[12px] text-foreground">
              .ds-display
            </code>
            ,{" "}
            <code className="rounded-md bg-muted px-1.5 py-0.5 font-mono text-[12px] text-foreground">
              .ds-headline
            </code>
            ,{" "}
            <code className="rounded-md bg-muted px-1.5 py-0.5 font-mono text-[12px] text-foreground">
              .ds-display-italic
            </code>
            ). Bold weight; true italic for accent words.
          </li>
          <li>
            <strong className="text-foreground">DM Sans (base / UI)</strong> —
            body, ledes, labels, buttons, chrome (
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
              .ds-eyebrow
            </code>
            ).
          </li>
          <li>
            <strong className="text-foreground">Caveat (opt-in sketch)</strong> —
            never the default display face. Brand marks and chalkboard accents (
            <code className="rounded-md bg-muted px-1.5 py-0.5 font-mono text-[12px] text-foreground">
              .ds-sketch
            </code>
            ,{" "}
            <code className="rounded-md bg-muted px-1.5 py-0.5 font-mono text-[12px] text-foreground">
              .ds-sketch-accent
            </code>
            ).
          </li>
          <li>
            <strong className="text-foreground">Geist Mono</strong> — code,
            stamps, and section rails (
            <code className="rounded-md bg-muted px-1.5 py-0.5 font-mono text-[12px] text-foreground">
              .ms-stamp
            </code>
            ,{" "}
            <code className="rounded-md bg-muted px-1.5 py-0.5 font-mono text-[12px] text-foreground">
              .ds-nav-section
            </code>
            ,{" "}
            <code className="rounded-md bg-muted px-1.5 py-0.5 font-mono text-[12px] text-foreground">
              .ds-mono-label
            </code>
            ).
          </li>
        </ul>
        <p className="leading-relaxed">
          On the docs host, load Merriweather + DM Sans + Caveat + Geist Mono in
          the root layout and expose{" "}
          <code className="rounded-md bg-muted px-1.5 py-0.5 font-mono text-[12px] text-foreground">
            --font-merriweather
          </code>
          ,{" "}
          <code className="rounded-md bg-muted px-1.5 py-0.5 font-mono text-[12px] text-foreground">
            --font-dm-sans
          </code>
          ,{" "}
          <code className="rounded-md bg-muted px-1.5 py-0.5 font-mono text-[12px] text-foreground">
            --font-caveat
          </code>
          , and{" "}
          <code className="rounded-md bg-muted px-1.5 py-0.5 font-mono text-[12px] text-foreground">
            --font-geist-mono
          </code>
          .
        </p>
        <CodeBlock
          language="css"
          code={`/* Token map (already in atroui globals) */
--font-heading: var(--font-merriweather); /* titles / H2 */
--font-display: var(--font-heading);
--font-sans: var(--font-dm-sans);         /* body / UI */
--font-sketch: var(--font-caveat);        /* opt-in sketch only */`}
        />
      </section>

      <section className="space-y-4">
        <h2 className="docs-section-title">Radius</h2>
        <p className="leading-relaxed">
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
          code={`:root {\n  /* Soft rect (AtroUI default) — controls follow via --atro-control-radius */\n  --radius: 0.45rem;\n\n  /* Sharp — set once, CTAs follow */\n  /* --radius: 0; */\n\n  /* Extra soft — still not a pill */\n  /* --radius: 1.25rem; */\n}`}
        />
        <p className="leading-relaxed">
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
        <h2 className="docs-section-title">Site brand</h2>
        <p className="leading-relaxed">
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
        <p className="leading-relaxed">
          Demo modules may still show studio sample copy - swap{" "}
          <code className="rounded-md bg-muted px-1.5 py-0.5 font-mono text-[12px] text-foreground">
            CONTENT
          </code>{" "}
          at the top of each installed block when shipping your own site.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="docs-section-title">Dark mode</h2>
        <p className="leading-relaxed">
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
      <DocsPager href="/docs/theming" kind="guides" />
    </article>
  )
}
