# atroui

**[AtroUI](https://atroui.com)** - production React / Next.js component library and dark-first design system.

```bash
npm install atroui
```

```tsx
import { Button, ThemeProvider } from "atroui"
import "atroui/globals.css"

export function App({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <Button>Get started</Button>
      {children}
    </ThemeProvider>
  )
}
```

## Docs

- Site: [atroui.com](https://atroui.com)
- Install: [atroui.com/docs/installation](https://atroui.com/docs/installation)
- Brand kit: [atroui.com/docs/brand](https://atroui.com/docs/brand)
- Compare: [atroui.com/docs/compare](https://atroui.com/docs/compare)
- Blog: [atroui.com/blog](https://atroui.com/blog)

## Brand

Chrome (logo, SEO, mail defaults) uses `getBrand()` - AtroUI by default. Override with `NEXT_PUBLIC_SITE_*` or component props.

Sample studio data under `atroui/content/*` is optional portfolio copy. Skip or replace when shipping your own product.

## Optional heavy dependencies

`atroui` currently ships AI / image helpers (`ai`, `@ai-sdk/xai`, `@huggingface/inference`, `sharp`, `satori`, `@resvg/resvg-js`) alongside UI primitives. Import only what you need. A future package split may isolate tools.

## License

[MIT](https://github.com/atroui/atroui/blob/master/LICENSE)
