# atroui

React / Next.js component catalog for [AtroUI](https://atroui.com).

```bash
npm install atroui
```

```tsx
import { Button, ThemeProvider } from "atroui"
import "atroui/globals.css"
```

## Brand

Chrome (logo, SEO, mail defaults) uses `getBrand()` — AtroUI by default. Override with `NEXT_PUBLIC_SITE_*` or component props.

Sample studio data under `atroui/content/*` is optional portfolio copy (may still mention Makershot). Skip or replace when shipping your own product.

## Optional heavy dependencies

`atroui` currently ships AI / image helpers (`ai`, `@ai-sdk/xai`, `@huggingface/inference`, `sharp`, `satori`, `@resvg/resvg-js`) alongside UI primitives. A future split (e.g. `atroui` + `atroui/tools`) may isolate those for lighter installs. Until then, install as one package and only import the modules you need.

See the monorepo README for design tokens and docs.
