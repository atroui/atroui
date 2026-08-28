import Link from "next/link";

import { getBrand } from "../lib/brand";

/**
 * Site-wide bold footer - brand name/email from getBrand().
 * Quieter alternative: SiteFooter / @atroui/site-footer.
 */
export function BoldFooter() {
  const year = new Date().getFullYear();
  const { name, email } = getBrand();

  return (
    <footer className="w-full overflow-hidden border-t border-border-subtle bg-background text-foreground pb-[env(safe-area-inset-bottom)]">
      <div className="mx-auto max-w-7xl border-x border-border-subtle">
        <div className="flex flex-col items-center ms-shell-pad py-16 sm:py-20">
          <div className="mb-16 flex w-full flex-col items-start justify-between gap-12 md:mb-20 md:flex-row">
            <div className="max-w-md">
              <h2 className="ds-display mb-6 text-3xl tracking-tight text-pretty text-foreground">
                Own the UI. Borrow the API.
              </h2>
              <a
                href={`mailto:${email}`}
                className="border-b-2 border-foreground pb-1 text-lg font-medium transition-colors hover:border-brand hover:text-brand"
              >
                {email}
              </a>
            </div>

            <div className="grid grid-cols-2 gap-12 sm:gap-16">
              <div>
                <p className="ms-stamp mb-4">Product</p>
                <nav className="flex flex-col gap-1 text-sm">
                  <Link
                    href="/docs"
                    className="inline-flex min-h-10 items-center font-medium hover:text-brand"
                  >
                    Docs
                  </Link>
                  <Link
                    href="/docs/components"
                    className="inline-flex min-h-10 items-center font-medium hover:text-brand"
                  >
                    Components
                  </Link>
                  <Link
                    href="/docs/host-api"
                    className="inline-flex min-h-10 items-center font-medium hover:text-brand"
                  >
                    Host APIs
                  </Link>
                  <Link
                    href="/docs/registry"
                    className="inline-flex min-h-10 items-center font-medium hover:text-brand"
                  >
                    Registry
                  </Link>
                  <Link
                    href="/docs/theming"
                    className="inline-flex min-h-10 items-center font-medium hover:text-brand"
                  >
                    Theming
                  </Link>
                </nav>
              </div>
              <div>
                <p className="ms-stamp mb-4">Elsewhere</p>
                <nav className="flex flex-col gap-1 text-sm">
                  <a
                    href="https://github.com/atroui/atroui"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-10 items-center font-medium hover:text-brand"
                  >
                    GitHub
                  </a>
                  <a
                    href="https://x.com/iamk"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-10 items-center font-medium hover:text-brand"
                  >
                    X / Twitter
                  </a>
                  <Link
                    href="/blog"
                    className="inline-flex min-h-10 items-center font-medium hover:text-brand"
                  >
                    Blog
                  </Link>
                  <Link
                    href="/docs/brand"
                    className="inline-flex min-h-10 items-center font-medium hover:text-brand"
                  >
                    Brand kit
                  </Link>
                  <Link
                    href="/docs/changelog"
                    className="inline-flex min-h-10 items-center font-medium hover:text-brand"
                  >
                    Changelog
                  </Link>
                </nav>
              </div>
            </div>
          </div>

          <div className="relative w-full">
            <p
              aria-hidden
              className="pointer-events-none -mb-[2vw] select-none text-[12vw] leading-none font-black tracking-tighter text-foreground opacity-5"
            >
              {name}
            </p>
            <div className="relative z-10 flex flex-col gap-4 border-t border-border-subtle pt-8 pb-2 backdrop-blur-sm sm:flex-row sm:items-end sm:justify-between">
              <span className="text-xs font-medium tracking-widest text-muted-foreground uppercase">
                © {year} {name}
              </span>
              <div className="flex items-center gap-6 sm:gap-8">
                <span className="hidden text-xs text-muted-foreground sm:inline">
                  atroui.com
                </span>
                <a
                  href="#main"
                  className="inline-flex min-h-10 items-center text-xs font-bold tracking-widest uppercase transition-colors hover:text-brand"
                >
                  Back to top ↑
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
