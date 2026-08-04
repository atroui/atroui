import { ArrowRight } from "lucide-react";
import Link from "next/link";

import { FadeIn } from "../motion/fade-in";
import { FounderAvatar } from "../ui/founder-avatar";

/**
 * Closing band — founder + CTA in one editorial row.
 */
export function HomeWho() {
  return (
    <section className="border-t border-border-subtle">
      <div className="border-b border-border-subtle">
        <div className="mx-auto grid max-w-7xl grid-cols-1 border-x border-border-subtle lg:grid-cols-12">
          {/* Who */}
          <FadeIn className="border-b border-border-subtle p-6 sm:p-8 lg:col-span-7 lg:border-r lg:border-b-0 lg:p-10">
            <div className="flex flex-col gap-6 sm:flex-row sm:gap-8">
              <FounderAvatar size="lg" />
              <div className="min-w-0">
                <p className="ms-stamp ms-stamp-brush">Who</p>
                <h2 className="ds-display mt-3 text-3xl text-foreground sm:text-4xl">
                  Makershot is{" "}
                  <span className="ds-display-italic text-brand">me</span>.
                </h2>
                <p className="mt-4 max-w-md text-[15px] leading-relaxed text-muted-foreground">
                  Koustav — solo founder. Every line of code, every pixel, every
                  email. When you hire the studio, you talk to the person
                  building your thing. One sprint at a time. Reply same day.
                </p>
                <div className="mt-5 flex flex-wrap gap-4 text-sm">
                  <Link href="/about" className="bam-link">
                    More about the studio
                  </Link>
                  <a
                    href="https://www.iamk.xyz"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bam-link"
                  >
                    iamk.xyz
                  </a>
                </div>
              </div>
            </div>
          </FadeIn>

          {/* Talk */}
          <FadeIn
            delay={0.06}
            className="flex flex-col justify-between gap-8 bg-muted/30 p-6 sm:p-8 lg:col-span-5 lg:p-10"
          >
            <div>
              <p className="ms-stamp">Ready when you are</p>
              <h2 className="ds-headline mt-3 text-2xl text-foreground sm:text-3xl">
                Tell us the shape of your next week.
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                Free 15-minute intro. Two project slots open this quarter.
                We&rsquo;ll say honestly if we&rsquo;re a fit.
              </p>
            </div>
            <div className="flex flex-col gap-3">
              <Link href="/contact" className="ms-cta w-full justify-center sm:w-auto sm:justify-start">
                Start a project
                <ArrowRight className="size-4" aria-hidden />
              </Link>
              <a
                href="mailto:hello@makershot.tech"
                className="ms-cta-ghost text-sm"
              >
                hello@makershot.tech
              </a>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
