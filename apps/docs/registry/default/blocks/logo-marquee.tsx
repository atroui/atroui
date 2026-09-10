/**
 * Edit CONTENT / LOGOS for your customers or stack. Pure CSS marquee —
 * duplicated row, pauses under reduced motion. Text marks by default.
 */
const CONTENT = {
  stamp: "Powering teams at",
  lede: "Swap LOGOS for real customer marks when you have them.",
}

const LOGOS = [
  "Northline",
  "Cascade",
  "Harbor & Co",
  "Kiln",
  "Fieldwork",
  "Orbit Labs",
  "Meridian",
  "Foxglove",
]

export function LogoMarquee() {
  return (
    <section className="border-t border-border-subtle bg-background text-foreground">
      <div className="border-b border-border-subtle">
        <div className="mx-auto max-w-7xl border-x border-border-subtle px-6 py-10 sm:px-10 sm:py-12">
          <p className="text-center text-[11px] font-semibold tracking-[0.14em] text-muted-foreground uppercase">
            {CONTENT.stamp}
          </p>
          <p className="mt-2 text-center text-sm text-muted-foreground">
            {CONTENT.lede}
          </p>

          <div
            className="relative mt-8 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]"
            role="region"
            aria-label="Customer logos"
          >
            <style>{`
              @keyframes atro-logo-marquee {
                from { transform: translateX(0); }
                to { transform: translateX(-50%); }
              }
              .atro-logo-marquee-track {
                animation: atro-logo-marquee 30s linear infinite;
              }
              @media (prefers-reduced-motion: reduce) {
                .atro-logo-marquee-track {
                  animation: none;
                }
              }
            `}</style>
            <div className="atro-logo-marquee-track flex w-max items-center gap-12 pr-12">
              {[0, 1].map((copy) => (
                <div
                  key={copy}
                  aria-hidden={copy === 1}
                  className="flex items-center gap-12"
                >
                  {LOGOS.map((logo) => (
                    <span
                      key={`${copy}-${logo}`}
                      className="text-[15px] font-semibold tracking-tight whitespace-nowrap text-muted-foreground/80 transition-colors hover:text-foreground"
                    >
                      {logo}
                    </span>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
