export type BlogCodeBlock = {
  language: string
  code: string
}

export type BlogPost = {
  slug: string
  title: string
  description: string
  date: string
  /** Short body sections for the post page. Body may include [label](/path) links. */
  sections: {
    heading?: string
    body: string[]
    codeBlocks?: BlogCodeBlock[]
  }[]
}

export const blogPosts: BlogPost[] = [
  {
    slug: "opinionated-start-own-the-files",
    title: "Add the section. Then edit the file.",
    description:
      "AtroUI is MIT. You install with the shadcn CLI, the source lands in your repo, and Host APIs use your keys. We pick defaults so the first hour is usable. After that, change whatever you want.",
    date: "2026-08-24",
    sections: [
      {
        body: [
          "shadcn/ui will give you a button. You still have to write the hero, the who band, and `/api/contact`.",
          "That leftover work is what AtroUI is for. You run `npx shadcn add @atroui/home-hero`, then edit `CONTENT` at the top of the file.",
          "The section is already in git. There is no AtroUI runtime wrapping it.",
          "`@atroui` is in the [official shadcn directory](https://ui.shadcn.com/docs/directory?q=atroui). You do not paste a registry URL first.",
          "The catalog, the docs, and the Host API handlers are MIT. There is no trial mode.",
        ],
      },
      {
        heading: "We pick a few things on purpose",
        body: [
          "If every registry ships Radix, Base UI, and three motion stacks, you spend the afternoon choosing infrastructure. We already made those choices.",
          "Tokens are dark-first. The docs site and most blocks were designed on a black canvas.",
          "Corners are soft rectangles. We got tired of capsule CTAs.",
          "Primitives we wrap use [Base UI](https://base-ui.com). Today that is `button` and `form-select`, not a second AtroUI SKU for Radix.",
          "Motion runs when the UI is going somewhere, like a drawer or a step. It is not scramble text or a glow card as a homepage.",
          "Forms and OG tools follow the same split. The UI copies in; the route on your Next app calls `atroui/api/contact`.",
          "Mail and models use your SMTP, Resend, Hugging Face, Gemini, or xAI keys. No env means a 503, not a studio key on atroui.com.",
          "Longer version: [Host APIs](/blog/host-apis-own-the-ui-bring-your-keys).",
        ],
      },
      {
        heading: "npm stays for handlers, not for heroes",
        body: [
          "Heroes and chrome do not need `npm i atroui`. Add `@atroui/home-hero` and you own the TypeScript in your tree.",
          "The published package is the boring server path: validation, honeypot, body caps, rate limits, Satori/resvg for images.",
          "Native addons do not belong in every consumer’s `components/` folder. [Why we split it](/blog/npm-to-shadcn-registry).",
          "Same CLI as shadcn/ui. Different altitude: atoms vs sections. [AtroUI vs shadcn/ui](/blog/atroui-vs-shadcn).",
        ],
      },
      {
        heading: "Delete it if it is wrong",
        body: [
          "The flexibility is git, not a settings panel. Restyle the block, swap the primitive, or fork `app/api/contact/route.ts`.",
          "We will not publish `@atroui/radix-*` next to `@atroui/base-*` so the catalog looks complete. That is two products. We can staff one.",
        ],
        codeBlocks: [
          {
            language: "bash",
            code: `npx shadcn@latest init
npx shadcn@latest add @atroui/home-hero`,
          },
        ],
      },
      {
        heading: "Money, later, maybe",
        body: [
          "Everything on atroui.com that you can install is free. If we ever charge, it will be because the catalog needs it, not because MIT was bait.",
          "We will not put your API keys on our servers to make a paid tier work.",
          "The useful move now is still the install. Form backend: [Host APIs](/docs/host-api). Other kits: [Compare](/docs/compare).",
        ],
      },
    ],
  },
  {
    slug: "adaptive-theme-switch",
    title: "Why we shipped Adaptive Theme Switch",
    description:
      "Naive dark mode crushes designed light palettes. Adaptive Theme Switch builds an OKLCH night companion from your light tokens so muted copy still reads. Own the files. Not a theme engine.",
    date: "2026-08-20",
    sections: [
      {
        body: [
          "Most light/dark switches do one job: put `.dark` on `<html>` and hope the stylesheet already knows how to invert. That is fine when you designed both sheets by hand. It fails the moment someone ships a custom light palette (warm paper, quiet gray captions, a brand mixed for daylight) and then flips to night.",
          "The canvas goes black. The caption color does not. `--muted-foreground` that was a tasteful slate on cream becomes unreadable sludge on charcoal. Vital copy disappears. Designers call it “the invert looked fine in Figma.” Engineers call it “dark mode is done.” Readers bounce.",
          "We built [Adaptive Theme Switch](/docs/components/ui-theme-adapt) because AtroUI already had a [theme toggle](/docs/components/ui-theme-toggle) and it was not enough. A class flip is a mode. A companion is a second design. The catalog should ship the second one when the first one lies. shadcn/ui does not.",
        ],
      },
      {
        heading: "The problem we kept seeing",
        body: [
          "AtroUI is [dark-first](/blog/why-dark-first-design-systems). Our own canvas is near black on purpose. Light is the alternate. That is the right default for product UIs that stay dark for hours.",
          "Consumers are not us. They install a block, override `:root` for a kiln-warm marketing site or an edition-paper blog, and keep `.dark` as a leftover invert. next-themes does its job. [ThemeProvider](/blog/theme-provider-dark-mode-atroui) does its job. The tokens do not. Gray type that passed WCAG on a light field fails the same ratio on a crushed field.",
          "The failure is specific. Body ink often survives. **Muted type does not.** Captions, helper text, timestamps, empty states: the copy you need when something is quiet is the copy that dies. That is the dirty-bathroom problem in color: the chrome looks themed, the corners do not work.",
        ],
      },
      {
        heading: "What naive dark actually does",
        body: [
          "A naive night takes the light background and mixes it toward black. It takes muted ink and mixes it toward that same black. Hue collapses. Contrast collapses. Brand often desaturates into a gray that no longer looks like the product.",
          "We kept that crush as a teaching column in the preview above. Kiln, Uptime, Dusk, and Edition each show three rooms: the light you designed, the naive invert, and the companion. The muted contrast ratio is live so you can see AA fail and recover on the same swatch.",
          "The preview is the argument. Switch palettes. Click NIGHT. If you cannot see the crush, you will ship it.",
        ],
      },
      {
        heading: "What the companion does instead",
        body: [
          "DAY and NIGHT are separate radios, not one toggle pretending to be two worlds. DAY is your light sheet. NIGHT samples that light `:root` through the CSSOM, even if `.dark` is already on, and builds an OKLCH companion before paint.",
          "Keep the hue. Darken the canvas. Raise type until it meets WCAG AA (4.5:1 by default). Keep brand as brand, not as a gray afterthought. Write `--background`, `--foreground`, `--muted-foreground`, `--card`, `--border`, `--brand`, `--primary`, and the nearby surface tokens onto `<html>` with `data-theme-adapt=\"companion\"`. DAY clears those inline properties and you are back on the designed light tokens.",
          "That is how we practice Family Values in the control: one primary idea (appearance), a sliding indicator instead of a remount, and a caption that appears only when the companion is actually on. No extra chrome for people who never go night.",
        ],
      },
      {
        heading: "Why publish it as a component",
        body: [
          "A helper buried in docs would stay a recipe. A registry item lands in your repo the same way a hero does. You can read it, diff it, delete it, or change the contrast floor.",
          "Two items, on purpose. `@atroui/adaptive-theme` is the library: parse, OKLCH, sample light tokens, apply and clear. `@atroui/theme-adapt` is the DAY/NIGHT control. The CLI pulls the lib as a registry dependency. You own both files.",
          "We did not hide this behind a paid theme studio or a hosted palette API. There is no AtroUI server in the loop. The browser already has your CSS. We read it.",
        ],
        codeBlocks: [
          {
            language: "bash",
            code: `npx shadcn@latest add @atroui/theme-adapt`,
          },
        ],
      },
      {
        heading: "What shadcn actually ships",
        body: [
          "shadcn/ui is the ownership model we already use: files in your repo, tokens in `:root` and `.dark`, a [class on `<html>`](https://ui.shadcn.com/docs/dark-mode). That is a toggle. You still author both sheets. If you only designed daylight, night is a leftover invert.",
          "Theme builders in that world emit more static CSS. They do not sample the light tokens you already shipped and raise muted type to AA at runtime. We could not find that control in shadcn’s registry, or in the kits that copy its toggle. So we shipped it as `@atroui/theme-adapt`: same CLI, higher altitude, same as the rest of the catalog.",
          "This is not a diss. Keep shadcn primitives. Add the companion when the class is not a design. See [AtroUI vs shadcn/ui](/blog/atroui-vs-shadcn).",
        ],
      },
      {
        heading: "How it sits next to Theme Toggle",
        body: [
          "`@atroui/theme-toggle` is still the right control when you designed both sheets and only need Light / System / Dark. Compact icon variant: `@atroui/theme-toggle-icon`. Wire `next-themes` with `attribute=\"class\"` as in the [ThemeProvider post](/blog/theme-provider-dark-mode-atroui).",
          "Reach for ThemeAdapt when a naive invert would hide body copy or flatten a light canvas you actually designed. `adapt={false}` is an escape hatch: same radios, class only, no companion. `minContrast` defaults to 4.5; raise it if your legal copy needs a harder floor.",
          "atroui.com chrome still uses the old toggle. That is intentional. The catalog default stays the simple switch. Adaptive Theme Switch is for hosts whose light tokens are the product, not a leftover invert.",
        ],
        codeBlocks: [
          {
            language: "tsx",
            code: `import { ThemeAdapt } from "@/components/ui/theme-adapt"

<ThemeAdapt />
{/* class-only: <ThemeAdapt adapt={false} /> */}`,
          },
        ],
      },
      {
        heading: "What this is not",
        body: [
          "This is not a full theme engine. It does not generate `--brand-hover`, sidebar tokens, or `--primary-foreground`. It does not retint images. It does not offer a System radio. DAY and NIGHT are explicit choices. Colors hardcoded in components stay hardcoded; only CSS variables on the root move.",
          "We published the honest version. A switch that claims to restyle the universe and then leaves captions crushed is worse than a switch that names its job. The job is: companion night from light tokens, type to AA, brand kept.",
          "If you need a second designed dark sheet, design one. ThemeAdapt is the bridge for palettes that were born in the light and still have to work at 1 a.m.",
        ],
      },
      {
        heading: "Install it",
        body: [
          "Add the control, keep ThemeProvider in the root layout, then click NIGHT on a page whose `:root` is yours. If muted captions hold, the companion did its job. If a one-off color still vanishes, it was never a token. Put it on a variable or leave it as a designed exception.",
          "Docs: [Adaptive Theme Switch](/docs/components/ui-theme-adapt). Token map: [Theming](/docs/theming). Dark-first argument: [design tokens](/blog/dark-first-design-tokens). Catalog: [Registry](/docs/registry).",
        ],
      },
    ],
  },
  {
    slug: "from-scope-to-social-card",
    title: "From scope to social card",
    description:
      "AtroUI launch workflow: one ProjectBrief carries Scope Chat and Project Planner into the OG workspace. Own the UI. Preview without keys. Bring your own Host API keys for AI.",
    date: "2026-08-13",
    sections: [
      {
        body: [
          "Most registries ship widgets. You install a hero, a form, an OG maker, and then you retype the same project story into each one.",
          "That is the gap we closed. Scope Chat, Project Planner, and the OG workspace now share a thin **ProjectBrief**: name, one-liner, audience, pages, tone, and optional OG title/subtitle. Describe the build once. Open a social card with the fields already filled.",
          "Try it live: [From scope to social card](/docs/launch-workflow) → [OG workspace](/og). Preview downloads work with no AI keys. Generate still needs **your** Host API env. AtroUI never holds secrets.",
        ],
      },
      {
        heading: "The path",
        body: [
          "**Scope Chat:** talk through the project. After a message, **Draft OG card** builds a brief from the last reply and opens Quick mode with title and subtitle prefilled.",
          "**Project Planner:** pick type, features, budget. On the estimate step, **Preview social card** sends the recommendation into the same OG Quick-mode URL.",
          "**OG workspace** (`/og` on this site): accepts `?mode=quick&title=&subtitle=`. Switch styles (Tech minimal first), download a text preview for free, or Generate when your `@atroui/api-generate` route and keys are wired.",
        ],
      },
      {
        heading: "The brief, not a platform",
        body: [
          "Install the type and helpers into your repo:",
        ],
        codeBlocks: [
          {
            language: "bash",
            code: `npx shadcn@latest add @atroui/project-brief`,
          },
        ],
      },
      {
        body: [
          "`buildOgHref(brief)` returns a host-relative URL like `/og?mode=quick&title=…&subtitle=…#og-workspace`. You own the `/og` page. We ship one on atroui.com so the guide and planner links have somewhere real to land.",
          "This is workflow glue, not a new SaaS. No AtroUI backend for the brief. Optional `localStorage` key if you want persistence on the host. Same ownership model as the rest of the catalog: source in your tree, edit `CONTENT`, delete what you do not need.",
        ],
      },
      {
        heading: "Install what you need",
        body: [
          "Only the OG maker:",
        ],
        codeBlocks: [
          {
            language: "bash",
            code: `npx shadcn@latest add @atroui/og-workspace
# AI Generate (optional, BYOK):
npx shadcn@latest add @atroui/api-generate`,
          },
        ],
      },
      {
        body: [
          "Full launch stack (brief + scope + planner + OG):",
        ],
        codeBlocks: [
          {
            language: "bash",
            code: `npx shadcn@latest add @atroui/project-brief
npx shadcn@latest add @atroui/scope-chat
npx shadcn@latest add @atroui/project-planner
npx shadcn@latest add @atroui/og-workspace
npx shadcn@latest add @atroui/api-scope @atroui/api-generate`,
          },
        ],
      },
      {
        heading: "Why this matters",
        body: [
          "Indie founders and small studios do not need another dashboard. They need intake → estimate → shareable card without losing the thread.",
          "Few component catalogs own that vertical slice. The guide is the narrative; the brief is the contract; Host APIs stay BYOK when you want AI behind the text.",
          "Deep docs: [launch workflow guide](/docs/launch-workflow), [Host APIs](/docs/host-api), [OG workspace](/docs/components/og-og-workspace). Live tool: [/og](/og).",
        ],
      },
    ],
  },
  {
    slug: "atroui-in-shadcn-directory",
    title: "AtroUI is now in the official shadcn registry directory",
    description:
      "@atroui merged into the official shadcn/ui registry directory. What changed, what did not, and how to install without a manual registry URL.",
    date: "2026-08-10",
    sections: [
      {
        body: [
          "AtroUI started as a catalog you could install by pointing the shadcn CLI at a custom URL. That worked, but it was one extra step and a bit of proof-of-concept energy.",
          "Today [shadcn-ui/ui#11420](https://github.com/shadcn-ui/ui/pull/11420) is merged. `@atroui` is now listed in the [official shadcn registry directory](https://ui.shadcn.com/docs/directory?q=atroui). Consumers can install blocks without a manual `registry add` URL. Same registry. Same source. One less chore.",
          "The registry URL is still `https://www.atroui.com/r/{name}.json`. The change is that the CLI now resolves the namespace from the directory, so the first install path looks like the rest of the ecosystem.",
        ],
      },
      {
        heading: "What changed",
        body: [
          "`@atroui` appears in `https://ui.shadcn.com/r/registries.json`. The directory entry points at `https://www.atroui.com/r/{name}.json` with a short description and a logo.",
          "New installs do not need to run `npx shadcn registry add @atroui=https://...`. They can run `npx shadcn add @atroui/home-hero` directly after `shadcn init`. The CLI will add the registry to `components.json` automatically if needed.",
          "Our docs, README, and install snippets have been updated to the simpler flow. Older projects that already have the registry URL in `components.json` continue to work unchanged.",
        ],
        codeBlocks: [
          {
            language: "bash",
            code: `npx shadcn@latest init
npx shadcn@latest add @atroui/home-hero
npx shadcn@latest add @atroui/site-header @atroui/site-footer`,
          },
        ],
      },
      {
        heading: "What did not change",
        body: [
          "The source still lands in your repo. You still own every file. Edit `CONTENT` and `DEFAULT_BRAND` at the top.",
          "Registry items are still served from `https://www.atroui.com/r`. The directory is just a pointer.",
          "Host APIs are still the same hybrid: UI from the registry, hardened handlers from `atroui` on npm, and you bring your own keys.",
          "We did not replace the shadcn install path. AtroUI CLI remains an alternative for teams that prefer not to use the shadcn toolchain. Both use the same JSON.",
        ],
      },
      {
        heading: "What this means for the project",
        body: [
          "Distribution is no longer gated on a custom registry command. Being in the directory lowers friction for anyone already inside the shadcn ecosystem.",
          "It also makes the catalog easier to discover. A builder can `shadcn search` or browse the directory and find AtroUI alongside the official and community registries.",
          "Most importantly, the product stays the same. We are not pivoting to be a shadcn clone. The directory entry is a door, not a rebrand. We still ship production sections, Host APIs, and an identity kit that stays on-brand.",
        ],
      },
      {
        heading: "Try it",
        body: [
          "Start a fresh Next.js app, run `shadcn init`, then add one block:",
        ],
        codeBlocks: [
          {
            language: "bash",
            code: `npx shadcn@latest add @atroui/home-hero`,
          },
        ],
      },
      {
        body: [
          "Open the installed file, edit `CONTENT`, and the hero is yours. For forms, AI tools, and rate limits: see [Host APIs](/docs/host-api). For the earlier thinking behind the registry model: [npm to shadcn registry](/blog/npm-to-shadcn-registry).",
        ],
      },
    ],
  },
  {
    slug: "webgl-hero-gate-loading",
    title: "Don’t show the hero until the sphere is ready",
    description:
      "How atroui.com loads a heavy WebGL hero: opaque gate, real progress, shader warm-up underneath, one fade into the finished room. Why piecemeal UI while Three.js boots feels broken.",
    date: "2026-08-09",
    sections: [
      {
        body: [
          "The Digital Success sphere on [atroui.com](https://www.atroui.com) is not decoration. It is the temperament of the landing hero. Without it, the page is just black type on a void.",
          "That temperament costs something: Three.js, R3F, and shadergradient land as a multi-megabyte chunk. Download, parse, and first GPU compile take real time. Pretending otherwise is how you get a half-built hero and a sphere that pops in four seconds late.",
        ],
      },
      {
        heading: "What we tried that failed",
        body: [
          "CSS stand-ins while WebGL deferred. Fast first paint, hollow identity.",
          "Show the full thesis immediately, fade the sphere in later. The room arrived without its atmosphere.",
          "Hide thesis and chrome, leave LiveInstall alone, then fade everything in when ready. Closer, but still felt like UI turning on, not a finished scene opening.",
          "Heavy sites do not assemble the experience piecemeal while the engine boots. They **gate**, then reveal.",
        ],
      },
      {
        heading: "The pattern we shipped",
        body: [
          "**Opaque gate:** brand mark, stage label, progress. Nothing of the hero peeks through.",
          "**Warm underneath:** the sphere mounts and paints under the gate at full underpainting strength. Compile hitch stays invisible.",
          "**Finished hero already in place:** thesis, install, CTAs, chrome. Sealed from interaction until open.",
          "**One fade:** when the canvas has settled frames, the gate lifts. You see the room intact, sphere included.",
          "Progress stages are honest ceilings (fetch → compile → warm → first frame → ready), smoothed on the compositor so the bar does not hitch every React render.",
        ],
      },
      {
        heading: "Rules we kept",
        body: [
          "Gate on a real ready signal, not a guessed timer. Failsafe if WebGL stalls.",
          "Skip the gate for `prefers-reduced-motion`, Save-Data, and slow-2g. Temperament yields to access.",
          "Do not restart the paint loop when progress updates. Callbacks stay ref-stable or the gate sticks at 92%.",
          "Drive the progress fill with DOM transforms, not `setState` every frame. Main-thread WebGL work already steals frames; the bar should not.",
        ],
      },
      {
        heading: "Why it fits AtroUI",
        body: [
          "Family Values: gradual revelation, then fluidity. The wait is a designed beat. The open is one continuous lift into a complete composition.",
          "Own the UI means owning the hard parts too, including when the pretty sphere is expensive. Borrow the industry pattern. Keep the keys (and the temperament) yours.",
          "Hard refresh [atroui.com](https://www.atroui.com) and watch the gate. Then ship the same idea on your own hero when WebGL is the product, not the garnish.",
        ],
      },
    ],
  },
  {
    slug: "indie-site-kit-new-components",
    title: "Indie site kit: new AtroUI components for portfolio sites",
    description:
      "What shipped in the AtroUI indie site kit: narrow chrome, command menu, changelog, countdown, personal hero, and more. Plus Home Crafts, Feature Grid, and Logo Cloud. How to install and where it sits vs studio Blocks.",
    date: "2026-08-07",
    sections: [
      {
        body: [
          "AtroUI started as a dark-first studio catalog: heroes, pricing, Host APIs, marketing sections extracted from shipped work. That remains the [Blocks](/docs/components) story.",
          "Indie founders also need a different altitude: a narrow column, mono stamps, a ⌘K palette, a ship log, a portrait hero. Not another max-w-7xl marketing band.",
          "We shipped that as the **indie site kit**. Same registry install model. Same tokens. A second chrome language you can own in your repo.",
          "This post lists what landed, how to install it, and how it sits next to studio Blocks without replacing them.",
        ],
      },
      {
        heading: "Why a second kit",
        body: [
          "Studio Blocks assume a wide editorial frame: border-x shells, loud CTAs, package pricing. Portfolio sites often want the opposite: ~640px reading width, quiet hairlines, status rows, and tools that feel like a personal homepage.",
          "Shipping both styles is intentional. [Site Header](/docs/components/site-header) and [Site Header Narrow](/docs/components/site-header-narrow) are different products. Same for footer and theme toggle. Pick the language that matches the site you are shipping.",
          "In the docs sidebar the kit lives under **Indie**. Component IDs stay stable (`@atroui/personal-hero`, `@atroui/command-menu`, and so on).",
        ],
      },
      {
        heading: "What shipped in Indie",
        body: [
          "**Chrome and motion:** `@atroui/site-header-narrow`, `@atroui/site-footer-narrow`, `@atroui/theme-toggle-icon`, `@atroui/reveal` (CSS IntersectionObserver reveal, no motion dependency).",
          "**Home surfaces:** `@atroui/personal-hero` (optional circular portrait), `@atroui/currently`, `@atroui/project-list`, `@atroui/reading-shelf`, `@atroui/stack-list`.",
          "**Ship in public:** `@atroui/log-preview`, `@atroui/changelog` (tag filters, month groups).",
          "**Tools:** `@atroui/command-menu` (cmdk, ⌘K), `@atroui/social-float`, `@atroui/deadline-countdown` + `@atroui/count-up`, `@atroui/local-clock`, `@atroui/weather-chip` (Open-Meteo, no API key), `@atroui/resume`.",
          "Browse the full list under [Indie](/docs/components/personal-hero) in the docs nav, or start from any item above.",
        ],
      },
      {
        heading: "Also new in Blocks",
        body: [
          "Alongside the kit we fixed catalog trust and filled two common landing gaps:",
          "**Home Crafts** (`@atroui/home-crafts`) is a real capabilities band, not a pricing alias. Pair it with [Pricing Overview](/docs/components/pricing-overview) when you need a rate card.",
          "**Feature Grid** and **Logo Cloud** ship as CONTENT-driven landing blocks. They stay off the atroui.com homepage until you have real social proof worth showing. Install them when your product site needs pillars or partner marks.",
          "**Site Footer** is no longer an alias of Bold Footer. Quiet chrome and loud wordmark footer are distinct demos again.",
        ],
      },
      {
        heading: "Install",
        body: [
          "Same CLI as everything else in the catalog. No Host API package required for these UI blocks.",
        ],
        codeBlocks: [
          {
            language: "bash",
            code: `# Indie chrome
npx shadcn@latest add @atroui/site-header-narrow @atroui/site-footer-narrow

# Homepage slice
npx shadcn@latest add @atroui/personal-hero @atroui/currently @atroui/project-list

# Command palette (needs cmdk)
npx shadcn@latest add @atroui/command-menu

# Studio landing extras
npx shadcn@latest add @atroui/home-crafts @atroui/feature-grid`,
          },
        ],
      },
      {
        body: [
          "Edit the top-level `CONTENT` (and lists) after install. For Personal Hero, set `imageSrc` to your portrait path. For Command Menu, mount once in the root layout; it listens for ⌘K / Ctrl+K.",
          "If you use Host APIs too, keep the install-mode story straight: [registry UI only](/docs/installation) for these sections; npm `atroui` only when you add forms or AI routes. See [Host APIs](/docs/host-api).",
        ],
      },
      {
        heading: "What we did not do",
        body: [
          "We did not replace studio Blocks. We did not put fake testimonials on atroui.com. We did not ship a personal brand mark as AtroUI identity.",
          "The kit is for builders who want the portfolio altitude in their git history. Compose it with studio sections when a product page needs both.",
        ],
      },
      {
        heading: "Where to go next",
        body: [
          "Open the **Indie** section in the docs sidebar and click through previews.",
          "Read [Installation](/docs/installation) if you are new to the registry.",
          "Read [Host APIs: own the UI, bring your keys](/blog/host-apis-own-the-ui-bring-your-keys) if forms and AI tools are next.",
          "Own the UI. Borrow the boring API security when you need it. Bring your own keys.",
        ],
      },
    ],
  },
  {
    slug: "host-apis-own-the-ui-bring-your-keys",
    title:
      "Host APIs: own the UI, borrow the boring security, bring your own keys",
    description:
      "How AtroUI Host APIs work: thin Next.js routes, hardened handlers in atroui/api/*, BYOK for forms and AI tools, install modes, rate limits, and what you still own in production.",
    date: "2026-08-07",
    sections: [
      {
        body: [
          "Most UI kits stop at a nice form. You still write `/api/contact` yourself: validation, a spam honeypot, body size caps, rate limits, and the mail send. AI workspaces add more glue: the compose pipeline, provider errors, and what happens when the key is missing.",
          "AtroUI’s answer is **Host APIs**. You copy UI from the [shadcn registry](/docs/registry), keep a thin `app/api/*/route.ts` stub on **your** Next.js app, and call production-minded handlers in the published `atroui` package (`atroui/api/*`). Secrets stay in **your** env. AtroUI never ships shared keys and does not run paid AI on [atroui.com](https://www.atroui.com).",
          "The line we use everywhere:",
          "**Own the UI in your repo. Borrow the boring API security. Bring your own keys.**",
          "This post is the long version of [Host APIs](/docs/host-api). It covers why the split exists, how install modes work, what is wired today, and what you still own in production.",
        ],
      },
      {
        heading: "What a Host API is",
        body: [
          "**Host** is the app that hosts the route: your Next.js deployment. **API** is that backend handler. Together: Host API.",
          "Three layers fit together:",
        ],
        codeBlocks: [
          {
            language: "text",
            code: `Browser  →  your /api/contact  →  atroui/api/contact (library)
                                      ↓
                            your SMTP / Resend / HF / xAI`,
          },
        ],
      },
      {
        body: [
          "**UI:** registry items like `@atroui/contact-form` or `@atroui/og-workspace`. The CLI copies source into your repo. You edit `CONTENT`, rebrand, and delete what you do not need.",
          "**Route stub:** `@atroui/api-contact` (and siblings) drop a thin App Router file that forwards `POST` to the package handler.",
          "**Handler:** `atroui/api/contact|waitlist|newsletter|generate|thumbnail|scope`. Shared validation, honeypot, body caps, rate limits, and mail or AI wiring. You upgrade this with npm instead of re-vendoring native image deps into every app.",
        ],
        codeBlocks: [
          {
            language: "ts",
            code: `import { handleContactPost } from "atroui/api/contact"

export const runtime = "nodejs"

export async function POST(req: Request) {
  return handleContactPost(req)
}`,
          },
        ],
      },
      {
        body: [
          "Host APIs are **not** a SaaS API on atroui.com that you call with an AtroUI key. They are not required for pure marketing sections (heroes, footers, who bands). Those stay [registry UI only](/docs/installation).",
          "They target the **Next.js App Router** today. If your stack is not Next, you can still own the UI via the CLI. Host APIs are the optional backend chapter for Next hosts. See [What is AtroUI?](/blog/what-is-atroui) for the wider catalog story.",
        ],
      },
      {
        heading: "Why this stands out",
        body: [
          "Typical kits ship buttons and forms UI, then leave the API to you. Shared demo hosts often bake in studio keys. That is fine for a playground. It is wrong for a library that claims you own production.",
          "AtroUI ships named exports with boring security already in place, refuses to hold consumer secrets, and documents rate-limit upgrades instead of pretending in-memory limits are multi-region safe.",
          "That hybrid is rare: **copy-paste UI plus production-minded handlers**, with BYOK as a product rule, not a footnote.",
        ],
      },
      {
        heading: "Three install modes",
        body: [
          "Never lead with `npm i atroui` for pure UI. The matrix is identical on [Host APIs](/docs/host-api), [Installation](/docs/installation), and the READMEs.",
        ],
        codeBlocks: [
          {
            language: "bash",
            code: `# 1) Registry UI only (no npm package)
npx shadcn@latest add @atroui/home-hero

# 2) Forms: package + thin route stubs
npm i atroui
# next.config.ts → transpilePackages: ["atroui"]
npx shadcn@latest add @atroui/contact-form @atroui/api-contact
# same pattern: waitlist, newsletter

# 3) AI tools: same package setup
npx shadcn@latest add @atroui/og-workspace @atroui/api-generate
npx shadcn@latest add @atroui/thumbnail-workspace @atroui/api-thumbnail
npx shadcn@latest add @atroui/scope-chat @atroui/api-scope`,
          },
        ],
      },
      {
        body: [
          "`transpilePackages: [\"atroui\"]` matters when you import Host API handlers from the package. It does not matter when you only copy heroes. More context: [transpilePackages and Turbopack](/blog/transpile-packages-turbopack-ui-libraries) and [why npm stayed for handlers](/blog/npm-to-shadcn-registry).",
        ],
      },
      {
        heading: "From zero to a live contact form",
        body: [
          "A concrete path for forms:",
          "1. Register the catalog and add the form plus route (see [Installation](/docs/installation)).",
          "2. Install `atroui` and set `transpilePackages`.",
          "3. Put mail secrets in the **host** env. Never commit them.",
          "4. Deploy your Next app. The browser posts to **your** `/api/contact`.",
        ],
        codeBlocks: [
          {
            language: "bash",
            code: `CONTACT_EMAIL_TO=hello@acme.test
CONTACT_EMAIL_FROM=noreply@acme.test
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=…
SMTP_PASSWORD=…
# or
RESEND_API_KEY=…
RESEND_AUDIENCE_ID=…   # newsletter audience subscribe`,
          },
        ],
      },
      {
        body: [
          "Without mail config, handlers return **503**. That means “host not configured,” not “the client sent a bad payload.” Bots that fill the `honeypot` field get a fake **200** and no send.",
        ],
      },
      {
        heading: "AI tools: UI, route, and BYOK",
        body: [
          "OG, thumbnail, and scope follow the same pattern. Preview and rule-based paths work without keys so demos stay useful. Full AI generation returns **503** until providers are set, including on atroui.com.",
        ],
        codeBlocks: [
          {
            language: "bash",
            code: `HUGGINGFACE_API_KEY=…   # OG / thumbnail AI
GEMINI_API_KEY=…          # optional freeform / Pro image
XAI_API_KEY=…             # optional scope LLM + thumbnail Pro`,
          },
        ],
      },
      {
        body: [
          "**What works without keys:** OG and thumbnail preview-only downloads; scope chat **rule-based** replies when `XAI_API_KEY` is unset.",
          "**Supported engines today:** Hugging Face, Gemini, and xAI where each feature needs them. Dropping `OPENAI_API_KEY` or `ANTHROPIC_API_KEY` in `.env` does **not** auto-wire those vendors. BYOK means bring **supported** keys. More providers are deliberate future work. Until then you can fork the thin route and call your own SDK while keeping the UI.",
          "Catalog entries tagged **Host API** in the sidebar link back to the [Host APIs](/docs/host-api) guide and the matching component docs.",
        ],
      },
      {
        heading: "Security defaults in the handlers",
        body: [
          "These are the boring controls handlers already apply. Per-route numbers live on the docs page:",
          "Honeypot JSON field `honeypot`: filled bots get a quiet fake success.",
          "Body cap **8 MB** JSON; contact attachment cap **5 MB** decoded.",
          "Per-IP sliding windows (15 minutes): contact 5 · waitlist/newsletter 10 · scope 30 · generate/thumbnail preview 30 · AI 5.",
          "**429** means rate limit exceeded (`retryAfterSec`). **503** means missing mail or AI config.",
          "Handlers cover common copy-paste route mistakes. You still own auth, CDN/WAF abuse controls, email deliverability, provider spend, and shared rate-limit storage across instances. Full threat model: [Host APIs](/docs/host-api).",
        ],
      },
      {
        heading: "Production rate limiting: memory vs Redis",
        body: [
          "Default `checkRateLimit` is an **in-memory** sliding window per Node process. That is fine locally and on a single instance. On multi-region Vercel (or any multi-instance host), each process has its own map, so effective limits multiply.",
          "Set Upstash Redis REST or Vercel KV env vars on the host. The same API switches to a shared backend automatically. You do not fork handlers. Redis is optional; memory stays the default. If Redis is unreachable, handlers fall back to memory so forms stay up. On Vercel production without a store, you get a one-time console warning.",
        ],
        codeBlocks: [
          {
            language: "bash",
            code: `# Upstash Redis REST (recommended)
UPSTASH_REDIS_REST_URL=https://….upstash.io
UPSTASH_REDIS_REST_TOKEN=…

# or Vercel KV (same REST protocol)
KV_REST_API_URL=…
KV_REST_API_TOKEN=…`,
          },
        ],
      },
      {
        heading: "Why handlers stay on npm",
        body: [
          "UI moved to the registry so you own files day one ([npm to shadcn registry](/blog/npm-to-shadcn-registry)). Handlers stayed in `atroui` on purpose.",
          "Contact and waitlist are mostly TypeScript. OG and thumbnail pull in Satori, resvg, sharp, fonts, and compose logic. Vendoring that into every consumer via the CLI would ship native `.node` addons and font paths into app trees in painful ways. A versioned package keeps one upgrade path for security and compose fixes while UI remains editable source in your repo.",
        ],
      },
      {
        heading: "What this product optimizes for",
        body: [
          "Speed from “pretty form” to “posts to my `/api` with sane defaults.”",
          "A hard boundary: AtroUI never holds your Resend, HF, or xAI bill.",
          "Honest install modes: CLI for UI, npm only when you need handlers.",
          "Docs and demos that fail closed (503 / preview / rules) instead of burning a shared studio key.",
        ],
      },
      {
        heading: "Next steps",
        body: [
          "Canonical guide: [Host APIs](/docs/host-api).",
          "CLI setup: [Installation](/docs/installation). Catalog: [Registry](/docs/registry).",
          "Try a form: [Contact form](/docs/components/contact-contact-form).",
          "How the split happened: [Why we moved to the shadcn registry](/blog/npm-to-shadcn-registry).",
          "Fresh app walkthrough: [Install AtroUI in a Next.js App Router project](/blog/install-atroui-nextjs-app-router).",
        ],
      },
    ],
  },
  {
    slug: "npm-to-shadcn-registry",
    title:
      "Why AtroUI moved from npm install to the shadcn registry (and what stayed on npm)",
    description:
      "A detailed look at migrating AtroUI from a classic npm UI package to a shadcn-compatible registry: ownership, updates, Host APIs, and how to migrate an existing app.",
    date: "2026-08-06",
    sections: [
      {
        body: [
          "For a long time the natural way to ship a React design system was simple: publish an npm package, tell people to `npm install atroui`, import from `atroui/…`, and hope `transpilePackages` plus peer deps lined up.",
          "That model still works for some libraries. It stopped being the right *consumer* story for AtroUI. The catalog is now a [shadcn-compatible registry](https://www.atroui.com/docs/registry): you run `npx shadcn add @atroui/home-hero`, source lands in your repo, and you edit `CONTENT` at the top of the file.",
          "This post explains what we migrated, why, what still lives on npm, and how to move an app that already depended on the package.",
        ],
      },
      {
        heading: "What the old npm-first path looked like",
        body: [
          "Early AtroUI leaned on the classic library contract:",
        ],
        codeBlocks: [
          {
            language: "bash",
            code: `# Install
npm i atroui next-themes

# next.config.ts
transpilePackages: ["atroui"]

# Import UI from the package
import { HomeHero } from "atroui/components/…"
import "atroui/globals.css"`,
          },
        ],
      },
      {
        body: [
          "That is fine when every consumer wants the *same* locked component binary. It fights you when every consumer wants to rewrite copy, swap CTAs, fork layout, and ship tomorrow.",
        ],
      },
      {
        heading: "Where npm-as-UI started to hurt",
        body: [
          "Black-box ownership. A hero that lives only in node_modules is awkward to restyle. Teams either monkey-patched props forever or forked the package. The shadcn ecosystem already solved that by copying source into the app.",
          "Update friction in the wrong place. Semver bumps for a wording tweak or a class rename force a dependency upgrade dance across every consumer. When the file lives in *your* repo, you merge what you want and ignore the rest.",
          "Install surface area. Fresh App Router apps hit Turbopack/webpack errors until `transpilePackages` was set. Peers were easy to forget. Docs had to teach library packaging before teaching design. See [transpilePackages and Turbopack](/blog/transpile-packages-turbopack-ui-libraries).",
          "Wrong altitude for marketing UI. Atoms in a package make sense. Full page bands with studio demo copy locked behind an import path do not. AtroUI’s job is production sections - heroes, who bands, footers, CTAs - with editable constants on day one.",
          "Discovery. Designers and indie makers already know `npx shadcn add`. Teaching a second install religion for the same class of UI slows adoption.",
        ],
      },
      {
        heading: "What we migrated to",
        body: [
          "AtroUI now leads with the registry on [atroui.com](https://www.atroui.com):",
        ],
        codeBlocks: [
          {
            language: "bash",
            code: `npx shadcn@latest init
npx shadcn@latest add @atroui/home-hero
npx shadcn@latest add @atroui/site-header @atroui/site-footer`,
          },
        ],
      },
      {
        body: [
          "Each item is a JSON registry entry that points at source under `apps/docs/registry/`. The CLI copies files into your aliases (`components/blocks/…`, `lib/brand.ts`, and so on). Dependencies resolve as `@atroui/brand`, `@atroui/utils`, etc. - registry names, not opaque package internals.",
          "You own the files. Diff them. Delete what you do not need. Rebrand by editing `DEFAULT_BRAND` or setting `NEXT_PUBLIC_SITE_*`. That is the same ownership model as shadcn/ui, aimed at a higher altitude: [AtroUI vs shadcn/ui](/blog/atroui-vs-shadcn).",
        ],
      },
      {
        heading: "Why the shadcn ecosystem specifically",
        body: [
          "It is already the default distribution channel for copy-into-repo UI in Next.js land. Fighting that means inventing a second CLI, a second docs language, and a second mental model.",
          "Registries compose. Teams can keep blank-slate primitives from one registry and AtroUI sections from another, as long as tokens do not fight. We document that path on [Compare](/docs/compare).",
          "Directory and tooling. `@atroui` is listed in the [official registry directory](https://ui.shadcn.com/docs/directory) ([PR #11420](https://github.com/shadcn-ui/ui/pull/11420)), so `npx shadcn add @atroui/…` works without a manual registry URL. See our [directory notes](https://github.com/atroui/atroui/blob/master/apps/docs/SHADCN_DIRECTORY.md).",
          "Docs and product stay aligned. The same registry that powers consumer installs also builds the live catalog on atroui.com. What you add is what we demo.",
        ],
      },
      {
        heading: "What we deliberately kept on npm",
        body: [
          "The migration is not “delete the package.” It is “stop pretending every UI file should be consumed as a versioned black box.”",
          "The published `atroui` package (**0.3.0**) still matters for:",
          "Host API handlers under `atroui/api/*` - contact, waitlist, newsletter, generate, thumbnail, scope. These share validation, honeypots, body caps, rate limits, and image compose logic (Satori, resvg, sharp). Vendoring that into every app via the CLI would ship native `.node` addons and font paths into consumer trees in painful ways.",
          "The docs monorepo itself - `@atroui/docs` depends on `atroui: workspace:*` so the marketing site and API routes can import the same handlers.",
          "Optional `atroui/globals.css` for hosts that already install the package.",
          "So the product has **three install modes** (identical matrix on [Host APIs](/docs/host-api) and [Installation](/docs/installation)):",
        ],
        codeBlocks: [
          {
            language: "bash",
            code: `# Registry UI only - no npm package
npx shadcn@latest add @atroui/home-hero

# Forms - package + thin route stubs
npm i atroui
# next.config.ts → transpilePackages: ["atroui"]
npx shadcn@latest add @atroui/contact-form @atroui/api-contact

# AI tools - same package setup
npx shadcn@latest add @atroui/og-workspace @atroui/api-generate`,
          },
        ],
      },
      {
        body: [
          "AtroUI never ships API keys and does not run paid AI on atroui.com. BYOK stays in *your* env. That rule is easier to enforce when secrets never live in copied UI files.",
        ],
      },
      {
        heading: "How the monorepo changed shape",
        body: [
          "The repo split is deliberate: registry for UI you own, package for Host API machinery.",
        ],
        codeBlocks: [
          {
            language: "text",
            code: `apps/docs/registry/     # source of truth for copy-paste items
pnpm registry:build     # emits apps/docs/public/r/*.json for the CLI
packages/ui             # publishable atroui (handlers, compose, tests)
apps/docs/app/api/*     # thin wrappers (= @atroui/api-* stubs)`,
          },
        ],
      },
      {
        body: [
          "Consumer-facing README and install docs lead with the CLI. npm is documented where Host APIs need it, not as the default hero path.",
        ],
      },
      {
        heading: "Migrating an existing npm-based app",
        body: [
          "If you already `import … from \"atroui/…\"` for UI, plan a deliberate cutover rather than a big-bang delete.",
        ],
        codeBlocks: [
          {
            language: "bash",
            code: `# 1. Add the blocks you actually use (example)
# @atroui is in the official directory - no manual registry URL
npx shadcn@latest add @atroui/home-hero @atroui/site-header @atroui/brand @atroui/utils

# 2. Point imports at local files (@/components/…, @/lib/brand)
# 3. Copy CONTENT / DEFAULT_BRAND values you already customized
# 4. Keep or add npm atroui only if you use Host APIs
npm i atroui   # optional - Host API consumers only`,
          },
        ],
      },
      {
        body: [
          "Replace `from \"atroui/components/…\"` with imports from the files the CLI wrote.",
          "Replace `from \"atroui/lib/brand\"` with `@/lib/brand` (or your alias) after adding `@atroui/brand`.",
          "Move token ownership into the host CSS sheet you already maintain. Keep `atroui/globals.css` only if you still depend on the package for other reasons.",
          "If you use contact / OG / thumbnail / scope, install the matching `@atroui/api-*` routes and leave `transpilePackages: [\"atroui\"]` in place.",
          "Delete unused package imports last. Run the app, then drop `atroui` from package.json only if nothing under `atroui/api/*` remains.",
        ],
      },
      {
        heading: "Versioning after the split",
        body: [
          "Registry items are not semver’d the same way as npm. The JSON on atroui.com is what the CLI fetches; your copied files version with *your* git history.",
          "The npm package still uses Changesets. **atroui@0.3.0** ships the Host API surface (`atroui/api/contact|waitlist|newsletter|generate|thumbnail|scope`). See [Changelog](/docs/changelog) and [SECURITY](https://github.com/atroui/atroui/blob/master/SECURITY.md).",
          "Docs app `@atroui/docs@0.1.0` is private and ignored by Changesets - that version is not the library version.",
        ],
      },
      {
        heading: "What we optimized for",
        body: [
          "Speed to a coherent dark UI you can edit.",
          "Same CLI muscle memory as the rest of the Next.js ecosystem.",
          "A clean boundary for secrets and native image tooling via Host APIs.",
          "One canonical brand home: [www.atroui.com](https://www.atroui.com).",
        ],
      },
      {
        heading: "Next steps",
        body: [
          "Host APIs deep dive: [Own the UI, borrow the boring security, bring your keys](/blog/host-apis-own-the-ui-bring-your-keys).",
          "New project: [Install AtroUI in a Next.js App Router project](/blog/install-atroui-nextjs-app-router).",
          "Catalog: [Registry](/docs/registry).",
          "Brand: [Rebrand with getBrand()](/blog/rebrand-with-getbrand).",
          "Positioning: [What is AtroUI?](/blog/what-is-atroui).",
          "Lessons from shipping: [Registry + package internals](/blog/shipping-component-library-npm).",
        ],
      },
    ],
  },
  {
    slug: "what-is-atroui",
    title: "What is AtroUI? A Next.js component catalog on the shadcn registry",
    description:
      "AtroUI is a dark-first React / Next.js component catalog. Add it with the shadcn CLI - source lands in your repo. Production sections, brand chrome, editable CONTENT.",
    date: "2026-08-05",
    sections: [
      {
        body: [
          "AtroUI is a production React and Next.js component catalog. You add it with the shadcn CLI the same way you add any registry item. Components copy into your project so you own the source: dark-first sections, brand chrome, and optional host-bound tools that call your own APIs.",
          "The canonical home is [atroui.com](https://www.atroui.com). Docs, compare notes, and this blog all live under that brand so search results point somewhere real.",
        ],
      },
      {
        heading: "The job it is hired for",
        body: [
          "Most teams do not want to rebuild a hero, footer, and OG workspace from scratch for every product. They want a coherent dark UI that already looks like a shipped app, then they customize brand and content.",
          "That is the job AtroUI is built for. You hire it to get from empty App Router project to a branded dark surface without assembling fifty primitives into a design system yourself.",
        ],
      },
      {
        heading: "Same ownership model as shadcn",
        body: [
          "Copy-paste kits optimize for owning every file in your repo. AtroUI uses that same model: `npx shadcn add @atroui/…` copies source in. The difference is altitude - production sections (heroes, who bands, CTAs, footers), brand chrome via getBrand(), and Host API tools that expect your own /api routes.",
          "Edit CONTENT at the top of each installed file. Day one, you own the UI. See [AtroUI vs copy-paste kits](/docs/compare) and [AtroUI vs shadcn/ui](/blog/atroui-vs-shadcn).",
        ],
      },
      {
        heading: "Who it is for",
        body: [
          "Indie makers and small teams shipping Next.js products who want a dark-first system without spending a sprint on chrome.",
          "Agencies and studios rebranding via DEFAULT_BRAND or NEXT_PUBLIC_SITE_*.",
          "Builders who want SEO helpers and AI-adjacent workspaces that do not burn shared LLM keys on the docs host.",
        ],
      },
      {
        heading: "What you get in the box",
        body: [
          "Registry items for utils, brand, button, logo, site header, home bands, pricing, CTAs, and contact.",
          "Editable CONTENT / DEFAULT_BRAND constants in every block file.",
          "Host API tools (OG, thumbnails, scope, forms): UI plus thin routes plus hardened handlers; you bring keys. Deep dive: [Host APIs essay](/blog/host-apis-own-the-ui-bring-your-keys).",
        ],
      },
      {
        heading: "Get started in one path",
        body: [
          "Init shadcn, add the @atroui registry, then add a component. Open the file and edit CONTENT.",
          "Full steps: [Installation](/docs/installation). Catalog: [Registry](/docs/registry). Walkthrough: [Install AtroUI in a Next.js App Router project](/blog/install-atroui-nextjs-app-router). Forms and AI backends: [Host APIs](/docs/host-api).",
        ],
      },
    ],
  },
  {
    slug: "install-atroui-nextjs-app-router",
    title: "Install AtroUI in a Next.js App Router project (step-by-step)",
    description:
      "Add AtroUI with the shadcn CLI: init, then add @atroui/home-hero. Listed in the official directory. Components land in your repo with editable CONTENT.",
    date: "2026-08-05",
    sections: [
      {
        body: [
          "This guide gets AtroUI into a Next.js App Router app the shadcn way. Target: Next.js 15+, React 18/19, Tailwind CSS v4.",
          "When you finish, you should have a hero (or button) file in your project that you can edit. Deeper detail always lives on the [Installation docs](/docs/installation).",
        ],
      },
      {
        heading: "1. Init shadcn",
        body: [
          "You need a components.json in the app. If you already have one, skip this step.",
        ],
        codeBlocks: [
          {
            language: "bash",
            code: "npx shadcn@latest init",
          },
        ],
      },
      {
        heading: "2. Add a component",
        body: [
          "`@atroui` is in the [official shadcn registry directory](https://ui.shadcn.com/docs/directory?q=atroui). No manual `registry add` URL step. The CLI resolves the namespace for you.",
          "Dependencies resolve as @atroui/brand, @atroui/utils, and so on - not bare names on the default shadcn registry.",
        ],
        codeBlocks: [
          {
            language: "bash",
            code: `npx shadcn@latest add @atroui/home-hero
npx shadcn@latest add @atroui/site-header
npx shadcn@latest add @atroui/button`,
          },
        ],
      },
      {
        heading: "3. Edit CONTENT",
        body: [
          "Open the installed file (for example components/blocks/home-hero.tsx). Change the CONTENT constants at the top - stamp, headline, CTAs. That is the point of the registry.",
          "Full catalog: [Registry](/docs/registry). Theming tokens: [Theming](/docs/theming).",
        ],
      },
    ],
  },
  {
    slug: "dark-first-design-tokens",
    title: "Dark-first design tokens in AtroUI",
    description:
      "How AtroUI’s dark-first tokens work: black canvas, brand blue #0b7bff, glass surfaces, Outfit, and how to override them in atroui/globals.css.",
    date: "2026-08-05",
    sections: [
      {
        body: [
          "Most “dark mode” systems are light themes with an invert toggle. AtroUI is dark-first: the default canvas is near black, type and surfaces are designed for that canvas, and light is the exception, not the starting point.",
          "That framing matters for product UIs that stay dark for hours (dashboards, creator tools, AI workspaces). You are not fighting a light-first token map every time you ship a panel.",
        ],
      },
      {
        heading: "The visual system in one pass",
        body: [
          "Canvas near black. Brand blue at #0b7bff (and the matching --brand CSS variable). Cyan mist accents. Glass panels via utilities like ms-panel / md-glass. Rounded-full CTAs that match the docs site.",
          "Display type expects Outfit exposed as --font-outfit. Sans and mono fall through the same token sheet so marketing pages and app chrome share one rhythm.",
        ],
      },
      {
        heading: "Where tokens live",
        body: [
          "Tokens live in atroui/globals.css: CSS variables under :root and .dark. Host apps import that stylesheet once in the root layout. You do not need a separate Tailwind theme file just to use the catalog tokens.",
          "Components consume those variables. Override the variables and the catalog restyles without rewriting every section.",
        ],
      },
      {
        heading: "Customize without forking the catalog",
        body: [
          "After importing globals, override --brand and related neutrals in your own CSS. Prefer small, intentional overrides over a full fork until you know which tokens you actually change.",
        ],
        codeBlocks: [
          {
            language: "css",
            code: `.dark {
  --brand: oklch(0.62 0.2 255);
  --background: oklch(0 0 0);
  --primary: oklch(0.99 0 0);
  --primary-foreground: oklch(0 0 0);
  --font-sans: var(--font-outfit);
}`,
          },
        ],
      },
      {
        heading: "Brand chrome vs visual tokens",
        body: [
          "Visual tokens control color and type. Product chrome (logo wordmark, default SEO name, mailto) resolves through getBrand(). Keep those concerns separate: restyle the canvas with CSS variables; rename the product with env or props.",
          "More on chrome: [Rebranding with getBrand()](/blog/rebrand-with-getbrand). Token map and theming notes: [Theming docs](/docs/theming). Brand assets: [Brand kit](/docs/brand).",
        ],
      },
      {
        heading: "Why this helps shipping",
        body: [
          "A dark-first token sheet reduces decision fatigue. New sections inherit the same black canvas, brand accent, and glass language, so marketing and app surfaces feel like one product instead of a collage of kit defaults.",
          "For the longer argument, see [Why dark-first design systems age better](/blog/why-dark-first-design-systems).",
        ],
      },
    ],
  },
  {
    slug: "rebrand-with-getbrand",
    title: "Rebrand AtroUI chrome with getBrand() and NEXT_PUBLIC_SITE_*",
    description:
      "Override AtroUI logo text, SEO defaults, and mail chrome with getBrand() or NEXT_PUBLIC_SITE_*. Keep demo content under content/ separate.",
    date: "2026-08-05",
    sections: [
      {
        body: [
          "When you install AtroUI, product chrome defaults to AtroUI / atroui.com. That is correct for the docs host. It is wrong the moment you ship Acme.",
          "getBrand() is the single resolver for logo wordmark, headers, footers, JSON-LD defaults, and mailto targets. Override it once and the chrome stays coherent.",
        ],
      },
      {
        heading: "Environment overrides",
        body: [
          "Set these in the host app (.env.local or your deploy env). They are public by design: they appear in the client bundle.",
        ],
        codeBlocks: [
          {
            language: "bash",
            code: `NEXT_PUBLIC_SITE_NAME=Acme
NEXT_PUBLIC_SITE_DOMAIN=acme.test
NEXT_PUBLIC_SITE_EMAIL=hello@acme.test
NEXT_PUBLIC_SITE_URL=https://acme.test
NEXT_PUBLIC_SITE_TAGLINE=Ship faster with Acme`,
          },
        ],
      },
      {
        heading: "Props for one-off sections",
        body: [
          "Sections like HomeWho and MadeWithEmbed also accept brand props when you need a local override without changing the whole host. Prefer env for site-wide chrome; use props for demos and A/B experiments.",
          "Logo mark defaults through BrandLogo to getBrand().name. Pass title or name when a single mount should differ.",
        ],
      },
      {
        heading: "What not to rebrand by accident",
        body: [
          "Modules under atroui/content/* are optional portfolio / studio sample data. They may still mention demo brands on purpose. Skip those modules when you ship your own product. Do not treat them as the source of truth for chrome.",
          "Visual tokens (colors, glass, type) are separate from getBrand(). Override CSS variables for look; override getBrand() for name and domain. See [dark-first tokens](/blog/dark-first-design-tokens).",
        ],
      },
      {
        heading: "Assets and the Made-with badge",
        body: [
          "Brand kit downloads and voice notes live on the [Brand kit](/docs/brand) page. The Made-with embed and related media ship with the package so consumer apps do not 404 on docs-only /public paths.",
        ],
      },
      {
        heading: "Ship the rebrand",
        body: [
          "Set the env vars, restart the Next server, confirm the wordmark and mailto. Then walk the [Installation](/docs/installation) checklist once so ThemeProvider and globals are still wired.",
          "Lower switching cost for your own clients: document which NEXT_PUBLIC_SITE_* keys you support and keep demo content out of the default import path.",
        ],
      },
    ],
  },
  {
    slug: "atroui-vs-shadcn",
    title: "AtroUI vs shadcn/ui: production sections on the same ownership model",
    description:
      "Both use the shadcn CLI. AtroUI ships production sections and brand chrome; shadcn/ui-style kits optimize for blank-slate primitives.",
    date: "2026-08-05",
    sections: [
      {
        body: [
          "shadcn/ui and similar kits are excellent at one job: generate accessible primitives into your repo so you own every line. AtroUI uses the same CLI and ownership model, aimed at a different altitude: production sections and brand chrome that already look like a shipped product.",
          "This is not a replacement pitch. It is a hiring decision: which catalog matches how you ship.",
        ],
      },
      {
        heading: "Same CLI, different catalog",
        body: [
          "You run the shadcn CLI either way. Components land in your monorepo. You customize freely. Updates are merges you control.",
          "Choose a blank-slate kit when you are building a long-term internal design system from atoms. Choose AtroUI when you want heroes, who bands, footers, and CTAs with editable CONTENT on day one.",
        ],
      },
      {
        heading: "AtroUI: sections that ship",
        body: [
          "Add @atroui/home-hero, open the file, edit CONTENT. Brand defaults resolve through getBrand(). Tokens are dark-first.",
          "Choose this when you want speed to a coherent dark UI, marketing + app chrome that share one system, and optional Host API tools that call your backends with BYOK.",
        ],
      },
      {
        heading: "Side-by-side differences",
        body: [
          "Distribution: both copy files into your repo via the CLI.",
          "Altitude: atoms and patterns you assemble vs sections and chrome already composed.",
          "Brand: you build chrome from scratch vs getBrand() + NEXT_PUBLIC_SITE_*.",
          "Theme: often light-first or two static sheets (`:root` / `.dark`) vs dark-first defaults, plus Adaptive Theme Switch when you only designed light.",
          "AI / media tools: usually out of scope vs optional workspaces that expect your /api/*.",
        ],
      },
      {
        heading: "You can use both",
        body: [
          "Some teams keep shadcn-style primitives for domain forms and use AtroUI for marketing bands and site chrome. That is valid. Avoid two competing token sheets on the same page without a clear boundary.",
        ],
      },
      {
        heading: "Pick and install",
        body: [
          "Prefer a blank-slate kit if you want every primitive from scratch. Prefer AtroUI if you want a ready dark catalog at [atroui.com](https://www.atroui.com).",
          "Docs: [Compare](/docs/compare). Install: [Installation](/docs/installation). Registry: [Registry](/docs/registry). Positioning: [What is AtroUI?](/blog/what-is-atroui).",
        ],
      },
    ],
  },
  {
    slug: "transpile-packages-turbopack-ui-libraries",
    title: "transpilePackages and Turbopack: UI library install gotchas",
    description:
      "Why Next.js needs transpilePackages for TypeScript UI libraries like AtroUI, common Turbopack errors, and how to fix a fresh App Router install.",
    date: "2026-08-05",
    sections: [
      {
        body: [
          "Fresh Next.js apps that import the published `atroui` package (Host APIs) often fail until Next compiles that package with the app. The error looks like a package bug. The fix is usually one line in next.config: transpilePackages.",
          "Pure registry UI (`npx shadcn add @atroui/…` only) does **not** need `npm i atroui` or transpilePackages. Use transpilePackages only when you install the package for `atroui/api/*` handlers.",
          "AtroUI Host API handlers ship as TypeScript Next must compile with your app. Without transpilePackages: [\"atroui\"], Turbopack and webpack can refuse unknown module types or skip transforming the package.",
        ],
      },
      {
        heading: "The required config (Host API consumers)",
        body: [
          "Add AtroUI to transpilePackages alongside any other source-shipped packages you consume.",
        ],
        codeBlocks: [
          {
            language: "ts",
            code: `import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  transpilePackages: ["atroui"],
}

export default nextConfig`,
          },
        ],
      },
      {
        heading: "Symptoms you are missing it",
        body: [
          "Unknown module type when importing from atroui.",
          "Unexpected token / TSX parse errors inside node_modules/atroui.",
          "Works in the monorepo docs app but breaks in a clean create-next-app consumer that uses Host APIs.",
        ],
      },
      {
        heading: "Barrel imports and heavy side paths",
        body: [
          "Prefer documented public exports from registry items you installed. Stick to paths listed in the [Installation](/docs/installation), [Host APIs](/docs/host-api), and [Registry](/docs/registry) guides.",
        ],
      },
      {
        heading: "CSS and peer dependencies",
        body: [
          "If a block needs next-themes or other peers, the CLI installs them. Theme failures usually mean the layout is incomplete. See [ThemeProvider and dark mode](/blog/theme-provider-dark-mode-atroui).",
        ],
      },
      {
        heading: "Checklist",
        body: [
          "components.json includes the @atroui registry",
          "npx shadcn add @atroui/… succeeded",
          "CONTENT / DEFAULT_BRAND edited for your brand",
          "If you use Host APIs: npm i atroui + transpilePackages: [\"atroui\"] - see [Host APIs](/docs/host-api)",
          "Restart the Next dev server after config changes",
          "Pure registry UI does not require the npm package - see [npm → shadcn registry](/blog/npm-to-shadcn-registry)",
        ],
      },
    ],
  },
  {
    slug: "theme-provider-dark-mode-atroui",
    title: "ThemeProvider and dark mode with AtroUI and next-themes",
    description:
      "Wire dark mode for AtroUI registry components: class strategy, default dark, and tokens so dark-first styles actually apply.",
    date: "2026-08-05",
    sections: [
      {
        body: [
          "AtroUI’s tokens assume a class-based dark theme. Whether you use next-themes or your own provider, .dark on the html element is what makes CSS variables resolve correctly.",
          "Skip the provider, or use the wrong attribute, and you get a half-themed app: components render, but backgrounds and brand colors miss the dark sheet.",
        ],
      },
      {
        heading: "Install the peer if needed",
        body: [
          "If you add @atroui/theme-toggle or similar, the CLI may pull next-themes. Install it if your layout does not already have it.",
        ],
        codeBlocks: [
          {
            language: "bash",
            code: "npm install next-themes",
          },
        ],
      },
      {
        heading: "Recommended provider setup",
        body: [
          "Use attribute=\"class\", defaultTheme=\"dark\", and enableSystem if you want OS preference to win when the user has not chosen. suppressHydrationWarning on <html> avoids the classic theme flash warning.",
        ],
        codeBlocks: [
          {
            language: "tsx",
            code: `import { ThemeProvider } from "next-themes"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body className="min-h-screen bg-background text-foreground antialiased">
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}`,
          },
        ],
      },
      {
        heading: "Fonts and the dark class",
        body: [
          "Load Outfit with variable: \"--font-outfit\" and put that variable on <html> so display styles match the catalog. You can keep className=\"dark\" on html for first paint while ThemeProvider manages the class afterward.",
          "Full layout snippet: [Install AtroUI in Next.js](/blog/install-atroui-nextjs-app-router).",
        ],
      },
      {
        heading: "Tokens still come from globals",
        body: [
          "ThemeProvider toggles the class. atroui/globals.css defines what .dark means. Import globals once. Override --brand and neutrals in your CSS when you re-skin. See [dark-first tokens](/blog/dark-first-design-tokens) and [Theming](/docs/theming).",
        ],
      },
      {
        heading: "Common mistakes",
        body: [
          "Forgetting next-themes in package.json.",
          "Using data-theme when tokens expect .dark.",
          "Importing globals in a leaf component instead of the root layout.",
          "Expecting light-first defaults. AtroUI is dark-first; light is the alternate.",
        ],
      },
    ],
  },
  {
    slug: "why-dark-first-design-systems",
    title: "Why dark-first design systems age better for product UIs",
    description:
      "Light-first dark mode is a retrofit. Dark-first tokens, surfaces, and type (like AtroUI) stay coherent as product UIs grow.",
    date: "2026-08-05",
    sections: [
      {
        body: [
          "Many design systems start in light mode, ship a product, then bolt on dark mode under deadline. The result is inverted grays, glowing borders that never existed in light, and components that look correct in only one theme.",
          "Dark-first systems invert that sequence. They design for the canvas users stare at for hours, then add light if needed. AtroUI follows that path for Next.js product UIs.",
        ],
      },
      {
        heading: "Product UI is not a marketing brochure",
        body: [
          "Marketing sites often want bright air and photography. Creator tools, dashboards, IDEs, and AI workspaces usually want focus: low luminance, clear hierarchy, accent color used sparingly.",
          "When your system is light-first, every new dark panel is a translation problem. When your system is dark-first, new panels inherit the native language.",
        ],
      },
      {
        heading: "Tokens that mean what they say",
        body: [
          "In a dark-first sheet, --background is black on purpose. --brand is an electric accent on purpose. Glass utilities assume a dark underlay. You spend less time fighting contrast hacks.",
          "AtroUI encodes that in atroui/globals.css and documents the map on [Theming](/docs/theming). The essay-length practice notes are in [Dark-first design tokens](/blog/dark-first-design-tokens).",
        ],
      },
      {
        heading: "Fewer second-order theme bugs",
        body: [
          "Retrofitted dark mode creates second-order bugs: charts that assume white, emails that assume black text, screenshots that look “broken” in the other theme. Starting dark does not eliminate theme bugs. It reduces the class of bugs where dark is the neglected child.",
        ],
      },
      {
        heading: "Coherence compounds",
        body: [
          "A catalog of sections that share one dark language compounds. Heroes, footers, and app chrome feel related without a brand committee meeting. That coherence is hard to retrofit onto a pile of unrelated primitives.",
          "If you want the catalog rather than only the argument, [install AtroUI](/docs/installation) and skim [What is AtroUI?](/blog/what-is-atroui).",
        ],
      },
    ],
  },
  {
    slug: "shipping-component-library-npm",
    title: "Lessons from shipping AtroUI (registry + package internals)",
    description:
      "Practical lessons from shipping AtroUI: shadcn registry for consumers, peers, CSS entrypoints, and keeping demo content off the public path.",
    date: "2026-08-05",
    sections: [
      {
        body: [
          "Consumers add AtroUI through the shadcn registry. Behind that, the docs site and catalog still need a clean package boundary, peers, and assets that do not 404 in the wild.",
          "Here are the lessons worth stealing if you are building a similar catalog.",
        ],
      },
      {
        heading: "Lead with the registry for consumers",
        body: [
          "The happy path is `npx shadcn add @atroui/…`. Document that first. Package internals matter for the docs host and for maintainers - not as the primary install story. See [Installation](/docs/installation).",
        ],
      },
      {
        heading: "Peers must be real peers",
        body: [
          "Theme bridges like next-themes belong in peerDependencies (or CLI-installed deps) with install instructions. Soft-assuming the docs app’s dependencies exist in the consumer is how you get “works on my machine” libraries.",
        ],
      },
      {
        heading: "One CSS entrypoint for tokens",
        body: [
          "Whether tokens ship via a stylesheet you copy or a shared theme file, consumers should import once. Do not rely on monorepo-only @source paths that resolve in the docs app and break outside it.",
        ],
      },
      {
        heading: "Media used by components must travel with them",
        body: [
          "If a component references /images/founder-portrait.png and that file only exists in the docs public/ folder, every consumer gets a 404. Bundle assets with registry items or the package, or do not ship the component as public API.",
        ],
      },
      {
        heading: "Keep demo content off the default barrel",
        body: [
          "Portfolio MDX, journal loaders, and studio sample data are fine for docs demos. They are poison on the main export if they pull unknown module types into Turbopack. Split registries from loaders; let consumers opt into content.",
        ],
      },
      {
        heading: "Brand defaults need an escape hatch",
        body: [
          "Defaulting chrome to your brand is correct for your site. Consumers need getBrand()-style overrides and env keys on day one. Otherwise every install ships with your logo text until someone forks.",
          "AtroUI’s approach: [Rebrand with getBrand()](/blog/rebrand-with-getbrand).",
        ],
      },
      {
        heading: "Install docs are part of the product",
        body: [
          "A four-step quickstart with copy-paste CLI commands beats a beautiful catalog that nobody can mount. Keep [Installation](/docs/installation) and the [install blog post](/blog/install-atroui-nextjs-app-router) aligned with the live registry.",
        ],
      },
    ],
  },
]

export function getPost(slug: string): BlogPost | undefined {
  return blogPosts.find((p) => p.slug === slug)
}

/** Newest by `date` (YYYY-MM-DD); ties keep array order. */
export function getLatestPost(): BlogPost | undefined {
  if (blogPosts.length === 0) return undefined
  return [...blogPosts].sort((a, b) => {
    const byDate = b.date.localeCompare(a.date)
    if (byDate !== 0) return byDate
    return blogPosts.indexOf(a) - blogPosts.indexOf(b)
  })[0]
}

export function getOlderPosts(): BlogPost[] {
  const latest = getLatestPost()
  if (!latest) return []
  return blogPosts.filter((p) => p.slug !== latest.slug)
}
