/** Lightweight analytics + A/B testing — no external SDK required. */

export type AnalyticsEvent = {
  name: string;
  properties?: Record<string, string | number | boolean>;
};

export type Experiment = {
  id: string;
  variants: string[];
  weights?: number[];
};

const STORAGE_PREFIX = "ms_";
const EXPERIMENT_PREFIX = `${STORAGE_PREFIX}exp_`;

function isBrowser(): boolean {
  return typeof window !== "undefined";
}

/** Assign and persist a variant for an experiment (sticky per user). */
export function getExperimentVariant(experiment: Experiment): string {
  if (!isBrowser()) return experiment.variants[0] ?? "";

  const key = `${EXPERIMENT_PREFIX}${experiment.id}`;
  const stored = localStorage.getItem(key);
  if (stored && experiment.variants.includes(stored)) return stored;

  const weights = experiment.weights ?? experiment.variants.map(() => 1);
  const total = weights.reduce((a, b) => a + b, 0);
  let roll = Math.random() * total;
  let variant = experiment.variants[0] ?? "";
  for (let i = 0; i < experiment.variants.length; i++) {
    roll -= weights[i] ?? 0;
    if (roll <= 0) {
      variant = experiment.variants[i] ?? variant;
      break;
    }
  }

  localStorage.setItem(key, variant);
  trackEvent("experiment_assigned", {
    experiment_id: experiment.id,
    variant,
  });
  return variant;
}

/** Track an event — forwards to Plausible/GA if configured, always logs in dev. */
export function trackEvent(
  name: string,
  properties?: Record<string, string | number | boolean>
): void {
  if (!isBrowser()) return;

  const payload: AnalyticsEvent = { name, properties };

  if (process.env.NODE_ENV === "development") {
    console.debug("[analytics]", payload);
  }

  // Plausible custom events
  const plausible = (
    window as Window & { plausible?: (e: string, o?: { props: Record<string, string | number | boolean> }) => void }
  ).plausible;
  if (plausible) {
    plausible(name, properties ? { props: properties } : undefined);
  }

  // Google Analytics 4
  const gtag = (
    window as Window & { gtag?: (...args: unknown[]) => void }
  ).gtag;
  if (gtag) {
    gtag("event", name, properties);
  }

  // Local event buffer for debugging
  try {
    const key = `${STORAGE_PREFIX}events`;
    const existing = JSON.parse(localStorage.getItem(key) ?? "[]") as AnalyticsEvent[];
    existing.push({ ...payload, properties: { ...properties, ts: Date.now() } as Record<string, string | number | boolean> });
    localStorage.setItem(key, JSON.stringify(existing.slice(-50)));
  } catch {
    // ignore quota errors
  }
}

export const CTA_EXPERIMENT: Experiment = {
  id: "homepage_cta",
  variants: ["book_call", "try_planner"],
  weights: [50, 50],
};

export const CONTACT_FORM_EXPERIMENT: Experiment = {
  id: "contact_form_layout",
  variants: ["multi_step", "single_step"],
  weights: [70, 30],
};
