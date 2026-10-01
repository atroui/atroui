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
      <div className="@container mx-auto max-w-7xl border-x border-border-subtle">
        <div className="flex flex-col items-center ms-shell-pad py-12 @min-[40rem]:py-20">
          <div className="mb-12 flex w-full min-w-0 flex-col items-start justify-between gap-10 @min-[48rem]:mb-20 @min-[48rem]:flex-row @min-[48rem]:gap-12">
            <div className="w-full min-w-0 max-w-md">
              <h2 className="ds-display mb-6 text-3xl tracking-tight text-pretty text-foreground">
                Have a project in mind? Let&apos;s ship something this week.
              </h2>
              <a
                href={`mailto:${email}`}
                className="inline-block max-w-full border-b-2 border-foreground pb-1 text-lg font-medium break-words transition-colors hover:border-brand hover:text-brand"
              >
                {email}
              </a>
            </div>

            <div className="grid w-full min-w-0 grid-cols-1 gap-8 @min-[28rem]:grid-cols-2 @min-[28rem]:gap-10 @min-[40rem]:gap-16">
              <div>
                <p className="ms-stamp mb-4">Studio</p>
                <nav className="flex flex-col gap-1 text-sm">
                  <Link
                    href="/work"
                    className="inline-flex min-h-10 items-center font-medium hover:text-brand"
                  >
                    Work
                  </Link>
                  <Link
                    href="/tools"
                    className="inline-flex min-h-10 items-center font-medium hover:text-brand"
                  >
                    Tools
                  </Link>
                  <Link
                    href="/services"
                    className="inline-flex min-h-10 items-center font-medium hover:text-brand"
                  >
                    Services
                  </Link>
                  <Link
                    href="/about"
                    className="inline-flex min-h-10 items-center font-medium hover:text-brand"
                  >
                    About
                  </Link>
                  <Link
                    href="/contact"
                    className="inline-flex min-h-10 items-center font-medium hover:text-brand"
                  >
                    Contact
                  </Link>
                </nav>
              </div>
              <div>
                <p className="ms-stamp mb-4">Elsewhere</p>
                <nav className="flex flex-col gap-1 text-sm">
                  <a
                    href="https://github.com/KOUSTAV2409"
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
                  <a
                    href="https://www.iamk.xyz"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-10 items-center font-medium hover:text-brand"
                  >
                    iamk.xyz
                  </a>
                  <Link
                    href="/journal"
                    className="inline-flex min-h-10 items-center font-medium hover:text-brand"
                  >
                    Journal
                  </Link>
                  <Link
                    href="/resources"
                    className="inline-flex min-h-10 items-center font-medium hover:text-brand"
                  >
                    Resources
                  </Link>
                  <Link
                    href="/brand"
                    className="inline-flex min-h-10 items-center font-medium hover:text-brand"
                  >
                    Brand & links
                  </Link>
                </nav>
              </div>
            </div>
          </div>

          <div className="@container relative w-full min-w-0 overflow-hidden">
            <p
              aria-hidden
              className="pointer-events-none select-none text-[clamp(2.75rem,22cqi,10rem)] leading-[0.85] font-black tracking-tighter text-foreground opacity-5"
            >
              {name}
            </p>
            <div className="relative z-10 flex flex-col gap-4 border-t border-border-subtle pt-8 pb-2 backdrop-blur-sm @min-[36rem]:flex-row @min-[36rem]:items-end @min-[36rem]:justify-between">
              <span className="text-xs font-medium tracking-widest text-muted-foreground uppercase">
                © {year} {name}
              </span>
              <div className="flex items-center gap-6 @min-[36rem]:gap-8">
                <span className="hidden text-xs text-muted-foreground @min-[36rem]:inline">
                  West Bengal · Remote
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
