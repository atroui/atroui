import { getBrand } from "../../lib/brand";

const CONTENT = {
  siteName: "",
  tagline: "A narrow personal site built with AtroUI.",
  links: [
    { href: "/projects", label: "Projects" },
    { href: "/writing", label: "Writing" },
    { href: "/log", label: "Log" },
    { href: "/stack", label: "Stack" },
    { href: "/resume", label: "Resume" },
    { href: "/contact", label: "Contact" },
    { href: "https://github.com", label: "GitHub", external: true },
    { href: "https://x.com", label: "X", external: true },
    { href: "/rss.xml", label: "RSS" },
  ] as Array<{ href: string; label: string; external?: boolean }>,
};

export type SiteFooterNarrowProps = {
  siteName?: string;
  tagline?: string;
  links?: Array<{ href: string; label: string; external?: boolean }>;
  className?: string;
};

export function SiteFooterNarrow({
  siteName,
  tagline = CONTENT.tagline,
  links = CONTENT.links,
  className,
}: SiteFooterNarrowProps = {}) {
  const brand = getBrand();
  const name = siteName || CONTENT.siteName || brand.name;

  return (
    <footer
      className={
        className ??
        "mt-auto border-t border-border-subtle pb-[env(safe-area-inset-bottom)]"
      }
    >
      <div className="mx-auto flex max-w-[640px] flex-col gap-8 px-5 py-8 text-[12px] text-muted-foreground sm:flex-row sm:items-start sm:justify-between sm:gap-10">
        <div className="min-w-0 space-y-1.5">
          <div className="font-mono text-[12px] tracking-[-0.01em] text-foreground">
            {name}
          </div>
          <p className="font-mono text-[11px] leading-[1.55] text-muted-foreground/80">
            {tagline}
          </p>
        </div>

        <nav
          aria-label="Footer"
          className="grid shrink-0 grid-cols-3 gap-x-5 gap-y-1.5 font-mono text-[11.5px] sm:grid-cols-4 sm:justify-items-end"
        >
          {links.map((item) => (
            <a
              key={item.href}
              href={item.href}
              {...(item.external
                ? { target: "_blank", rel: "noopener noreferrer" }
                : {})}
              className="hover:text-foreground"
            >
              {item.label}
            </a>
          ))}
        </nav>
      </div>
    </footer>
  );
}
