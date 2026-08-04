"use client";

import { useEffect } from "react";
import Script from "next/script";

import { getExperimentVariant, trackEvent } from "../../lib/analytics";

export { trackEvent, getExperimentVariant };

type AnalyticsProviderProps = {
  children?: React.ReactNode;
};

/**
 * Loads optional Plausible/GA scripts and exposes experiment tracking.
 * Set NEXT_PUBLIC_PLAUSIBLE_DOMAIN or NEXT_PUBLIC_GA_ID in env.
 */
export function AnalyticsProvider({ children }: AnalyticsProviderProps) {
  const plausibleDomain = process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN;
  const gaId = process.env.NEXT_PUBLIC_GA_ID;

  useEffect(() => {
    trackEvent("page_view", { path: window.location.pathname });
  }, []);

  return (
    <>
      {plausibleDomain ? (
        <Script
          defer
          data-domain={plausibleDomain}
          src="https://plausible.io/js/script.js"
          strategy="afterInteractive"
        />
      ) : null}
      {gaId ? (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
            strategy="afterInteractive"
          />
          <Script id="ga-init" strategy="afterInteractive">
            {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${gaId}');`}
          </Script>
        </>
      ) : null}
      {children}
    </>
  );
}

export function useExperiment(experimentId: string, variants: string[], weights?: number[]) {
  useEffect(() => {
    getExperimentVariant({ id: experimentId, variants, weights });
  }, [experimentId, variants, weights]);
}
