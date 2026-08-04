"use client";

import { ExternalLink } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useMemo, useState } from "react";

type Props = { url?: string };

/**
 * Calendly inline embed — theme-aware, framed by the parent page.
 * Falls back to email CTA when NEXT_PUBLIC_CALENDLY_URL is unset.
 */
export function CalendlyEmbed({ url }: Props) {
  const calendlyUrl = url || process.env.NEXT_PUBLIC_CALENDLY_URL || "";
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- hydration-gated mount flag
    setMounted(true);
  }, []);

  const isDark = mounted && resolvedTheme === "dark";

  const src = useMemo(() => {
    if (!calendlyUrl) return "";
    const u = new URL(calendlyUrl);
    const params = new URLSearchParams({
      hide_gdpr_banner: "1",
      hide_landing_page_details: "1",
      hide_event_type_details: "0",
      // Copper brand + stone surfaces
      primary_color: "d4894c",
      background_color: isDark ? "1c1917" : "ffffff",
      text_color: isDark ? "faf7f2" : "1c1917",
    });
    u.search = u.search
      ? `${u.search}&${params.toString()}`
      : `?${params.toString()}`;
    return u.toString();
  }, [calendlyUrl, isDark]);

  if (!calendlyUrl) {
    return (
      <div className="flex flex-col gap-4 px-2 py-10 sm:px-4 sm:py-14">
        <p className="ds-mono-label">Scheduler</p>
        <h3 className="ds-headline text-xl text-foreground">
          Calendly isn&rsquo;t connected yet
        </h3>
        <p className="max-w-md text-sm leading-relaxed text-muted-foreground">
          Send a message above and we&rsquo;ll reply with times — or email
          directly and we&rsquo;ll find a slot the same day.
        </p>
        <a
          href="mailto:hello@makershot.tech?subject=Intro%20call"
          className="ms-cta w-fit"
        >
          hello@makershot.tech
          <ExternalLink className="size-3.5" aria-hidden />
        </a>
      </div>
    );
  }

  return (
    <div className="overflow-hidden border border-border-subtle bg-background">
      {!mounted ? (
        <div
          className="flex h-[min(720px,75dvh)] min-h-[420px] items-center justify-center bg-muted/30"
          aria-hidden
        >
          <div className="h-full w-full animate-pulse bg-muted/40" />
        </div>
      ) : (
        <iframe
          src={src}
          title="Book a 15-minute intro call with Makershot"
          loading="lazy"
          className="block h-[min(720px,75dvh)] min-h-[420px] w-full border-0"
        />
      )}
    </div>
  );
}
