"use client";

import { ArrowLeft, ArrowRight, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";

import { cn } from "@/lib/utils";

type PlannerState = {
  projectType: "mvp" | "full" | "";
  features: string[];
  aiRequired: boolean | null;
  aiType: string;
  budget: string;
  timeline: string;
  name: string;
  email: string;
};

const STEPS = [
  "Project type",
  "Features",
  "AI needs",
  "Budget",
  "Contact",
  "Estimate",
] as const;

const FEATURE_OPTIONS = [
  "User authentication",
  "Payments / billing",
  "Admin dashboard",
  "Real-time features",
  "AI / ML feature",
  "Mobile-responsive",
  "Third-party integrations",
];

const AI_TYPES = [
  "Document processing",
  "Chat / conversational",
  "Content generation",
  "Search / RAG",
  "Classification / tagging",
];

const BUDGETS = [
  { id: "<2k", label: "Under $2k" },
  { id: "2k-5k", label: "$2k - $5k" },
  { id: "5k-10k", label: "$5k - $10k" },
  { id: "10k+", label: "$10k+" },
];

function estimateProject(state: PlannerState): {
  service: string;
  serviceId: string;
  priceRange: string;
  timeline: string;
  summary: string;
} {
  const featureCount = state.features.length;
  const hasAI =
    state.aiRequired === true || state.features.includes("AI / ML feature");

  if (state.projectType === "mvp" && featureCount <= 3 && !hasAI) {
    return {
      service: "7-Day MVP Sprint",
      serviceId: "mvp-sprint",
      priceRange: "$4,800",
      timeline: "7 days",
      summary: "A focused sprint to ship your core workflow fast.",
    };
  }

  if (hasAI && featureCount <= 4) {
    return {
      service: "AI Feature Integration",
      serviceId: "ai-integration",
      priceRange: "$2,400 - $4,000",
      timeline: "1-2 weeks",
      summary:
        "Add a well-designed AI feature to your existing or new product.",
    };
  }

  if (state.features.includes("Admin dashboard") && featureCount >= 4) {
    return {
      service: "Full-Stack Product Build",
      serviceId: "full-stack-build",
      priceRange: "$8,000 - $15,000",
      timeline: "4-8 weeks",
      summary: "End-to-end product development with multiple features.",
    };
  }

  if (state.projectType === "mvp") {
    return {
      service: "7-Day MVP Sprint",
      serviceId: "mvp-sprint",
      priceRange: "$4,800 - $6,000",
      timeline: "7-10 days",
      summary:
        "MVP sprint with scoped features - we'll narrow scope on the intro call.",
    };
  }

  return {
    service: "Full-Stack Product Build",
    serviceId: "full-stack-build",
    priceRange: "$8,000+",
    timeline: "4-8 weeks",
    summary: "A complete product build tailored to your requirements.",
  };
}

const fieldInput = cn(
  "w-full border border-border-subtle bg-background px-3.5 py-2.5 text-base text-foreground sm:text-sm",
  "placeholder:text-muted-foreground/60",
  "transition-[border-color,box-shadow] duration-200",
  "focus:border-ring focus:outline-none focus:ring-2 focus:ring-ring/20",
);

function ChoiceButton({
  pressed,
  onClick,
  children,
  className,
}: {
  pressed: boolean;
  onClick: () => void;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={pressed}
      className={cn(
        "border px-4 py-3 text-left transition-colors active:scale-[0.99]",
        pressed
          ? "border-brand bg-brand/8 text-foreground"
          : "border-border-subtle bg-background text-muted-foreground hover:border-border hover:text-foreground",
        className,
      )}
    >
      {children}
    </button>
  );
}

export function ProjectPlanner() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [state, setState] = useState<PlannerState>({
    projectType: "",
    features: [],
    aiRequired: null,
    aiType: "",
    budget: "",
    timeline: "",
    name: "",
    email: "",
  });

  const estimate = useMemo(
    () => (step === 5 ? estimateProject(state) : null),
    [step, state],
  );

  const progress = ((step + 1) / STEPS.length) * 100;

  const canNext = () => {
    switch (step) {
      case 0:
        return !!state.projectType;
      case 1:
        return state.features.length > 0;
      case 2:
        return state.aiRequired !== null;
      case 3:
        return !!state.budget;
      case 4:
        return !!state.name.trim() && !!state.email.trim();
      default:
        return true;
    }
  };

  const toggleFeature = (f: string) => {
    setState((s) => ({
      ...s,
      features: s.features.includes(f)
        ? s.features.filter((x) => x !== f)
        : [...s.features, f],
    }));
  };

  const goToContact = () => {
    const params = new URLSearchParams({
      service: estimate?.serviceId ?? "",
      planner: "1",
    });
    router.push(`/contact?${params.toString()}`);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12">
      {/* Step rail */}
      <aside className="hidden border-r border-border-subtle p-8 lg:col-span-4 lg:block lg:p-10">
        <p className="ms-stamp">Steps</p>
        <ol className="mt-6 space-y-1">
          {STEPS.map((label, i) => {
            const done = i < step;
            const active = i === step;
            return (
              <li
                key={label}
                className={cn(
                  "flex items-center gap-3 border-l-2 py-2.5 pl-4 text-sm",
                  active
                    ? "border-brand text-foreground"
                    : done
                      ? "border-brand/40 text-muted-foreground"
                      : "border-transparent text-muted-foreground/50",
                )}
              >
                <span className="font-mono text-[11px] tabular-nums">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className={cn(active && "font-medium")}>{label}</span>
              </li>
            );
          })}
        </ol>
      </aside>

      {/* Wizard */}
      <div className="flex min-h-0 flex-col lg:col-span-8 lg:min-h-105">
        <div className="border-b border-border-subtle ms-shell-pad py-4">
          <div className="flex items-center justify-between gap-3">
            <p className="ds-mono-label">
              Step {step + 1} / {STEPS.length}
            </p>
            <p className="text-xs text-muted-foreground lg:hidden">
              {STEPS[step]}
            </p>
          </div>
          <div
            className="mt-3 h-px overflow-hidden bg-border-subtle"
            role="progressbar"
            aria-valuenow={Math.round(progress)}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label={`Project planner progress: step ${step + 1} of ${STEPS.length}`}
          >
            <div
              className="h-full bg-brand transition-[width] duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        <div className="flex flex-1 flex-col p-6 sm:p-8 lg:p-10">
          {step === 0 ? (
            <div className="space-y-4">
              <div>
                <h2 className="ds-headline text-2xl text-foreground">
                  What are you building?
                </h2>
                <p className="mt-2 text-sm text-muted-foreground">
                  MVP to validate fast, or a fuller product build?
                </p>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                {(
                  [
                    {
                      id: "mvp" as const,
                      label: "MVP Sprint",
                      desc: "Validate in 7-14 days",
                    },
                    {
                      id: "full" as const,
                      label: "Full Build",
                      desc: "Complete product in 4-8 weeks",
                    },
                  ] as const
                ).map((opt) => (
                  <ChoiceButton
                    key={opt.id}
                    pressed={state.projectType === opt.id}
                    onClick={() =>
                      setState((s) => ({ ...s, projectType: opt.id }))
                    }
                    className="p-5"
                  >
                    <div className="font-medium text-foreground">
                      {opt.label}
                    </div>
                    <div className="mt-1 text-xs text-muted-foreground">
                      {opt.desc}
                    </div>
                  </ChoiceButton>
                ))}
              </div>
            </div>
          ) : null}

          {step === 1 ? (
            <div className="space-y-4">
              <div>
                <h2 className="ds-headline text-2xl text-foreground">
                  Key features needed
                </h2>
                <p className="mt-2 text-sm text-muted-foreground">
                  Select all that apply.
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                {FEATURE_OPTIONS.map((f) => (
                  <ChoiceButton
                    key={f}
                    pressed={state.features.includes(f)}
                    onClick={() => toggleFeature(f)}
                    className="rounded-md px-3.5 py-2 text-sm"
                  >
                    {f}
                  </ChoiceButton>
                ))}
              </div>
            </div>
          ) : null}

          {step === 2 ? (
            <div className="space-y-4">
              <div>
                <h2 className="ds-headline text-2xl text-foreground">
                  AI features required?
                </h2>
                <p className="mt-2 text-sm text-muted-foreground">
                  Streaming chat, document AI, RAG - or none for now.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {[true, false].map((val) => (
                  <ChoiceButton
                    key={String(val)}
                    pressed={state.aiRequired === val}
                    onClick={() =>
                      setState((s) => ({ ...s, aiRequired: val }))
                    }
                    className="p-4 text-center text-sm font-medium"
                  >
                    {val ? "Yes" : "No"}
                  </ChoiceButton>
                ))}
              </div>
              {state.aiRequired ? (
                <div className="border-t border-border-subtle pt-4">
                  <p className="text-xs font-medium text-foreground">
                    AI integration type
                  </p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {AI_TYPES.map((t) => (
                      <ChoiceButton
                        key={t}
                        pressed={state.aiType === t}
                        onClick={() => setState((s) => ({ ...s, aiType: t }))}
                        className="min-h-10 rounded-md px-3.5 py-2 text-xs"
                      >
                        {t}
                      </ChoiceButton>
                    ))}
                  </div>
                </div>
              ) : null}
            </div>
          ) : null}

          {step === 3 ? (
            <div className="space-y-4">
              <div>
                <h2 className="ds-headline text-2xl text-foreground">
                  Budget range
                </h2>
                <p className="mt-2 text-sm text-muted-foreground">
                  Ballpark only - we confirm on the call.
                </p>
              </div>
              <div className="divide-y divide-border-subtle border-y border-border-subtle">
                {BUDGETS.map((b) => (
                  <button
                    key={b.id}
                    type="button"
                    onClick={() => setState((s) => ({ ...s, budget: b.id }))}
                    aria-pressed={state.budget === b.id}
                    className={cn(
                      "flex w-full items-center justify-between px-1 py-4 text-left text-sm transition-colors active:scale-[0.99]",
                      state.budget === b.id
                        ? "font-medium text-foreground"
                        : "text-muted-foreground hover:text-foreground",
                    )}
                  >
                    <span>{b.label}</span>
                    {state.budget === b.id ? (
                      <span className="size-1.5 rounded-full bg-brand" aria-hidden />
                    ) : null}
                  </button>
                ))}
              </div>
            </div>
          ) : null}

          {step === 4 ? (
            <div className="space-y-5">
              <div>
                <h2 className="ds-headline text-2xl text-foreground">
                  Almost there
                </h2>
                <p className="mt-2 text-sm text-muted-foreground">
                  So we can send the estimate and follow up.
                </p>
              </div>
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="planner-name"
                  className="text-xs font-medium text-foreground"
                >
                  Name
                </label>
                <input
                  id="planner-name"
                  type="text"
                  value={state.name}
                  onChange={(e) =>
                    setState((s) => ({ ...s, name: e.target.value }))
                  }
                  className={fieldInput}
                  placeholder="Your name"
                  autoComplete="name"
                  required
                />
              </div>
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="planner-email"
                  className="text-xs font-medium text-foreground"
                >
                  Email
                </label>
                <input
                  id="planner-email"
                  type="email"
                  value={state.email}
                  onChange={(e) =>
                    setState((s) => ({ ...s, email: e.target.value }))
                  }
                  className={fieldInput}
                  placeholder="you@company.com"
                  autoComplete="email"
                  required
                />
              </div>
            </div>
          ) : null}

          {step === 5 && estimate ? (
            <div className="flex flex-col gap-8">
              <div>
                <div className="mb-4 flex size-10 items-center justify-center rounded-lg border border-border-subtle bg-background text-brand">
                  <CheckCircle2 className="size-5" aria-hidden />
                </div>
                <p className="ms-stamp">Recommendation</p>
                <h2 className="ds-headline mt-3 text-2xl text-foreground sm:text-3xl">
                  {estimate.service}
                </h2>
                <p className="mt-3 max-w-md text-sm leading-relaxed text-muted-foreground">
                  {estimate.summary}
                </p>
              </div>

              <dl className="grid grid-cols-1 divide-y divide-border-subtle border-y border-border-subtle sm:grid-cols-2 sm:divide-x sm:divide-y-0">
                <div className="py-5 sm:pr-6">
                  <dt className="text-xs text-muted-foreground">
                    Estimated price
                  </dt>
                  <dd className="ds-display mt-2 text-xl break-words text-foreground sm:text-2xl md:text-3xl">
                    {estimate.priceRange}
                  </dd>
                </div>
                <div className="py-5 sm:pl-6">
                  <dt className="text-xs text-muted-foreground">Timeline</dt>
                  <dd className="ds-display mt-2 text-xl text-foreground sm:text-2xl md:text-3xl">
                    {estimate.timeline}
                  </dd>
                </div>
              </dl>

              <p className="text-xs text-muted-foreground">
                Ballpark only - final scope and price confirmed on the intro
                call.
              </p>

              <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                <button type="button" onClick={goToContact} className="ms-cta">
                  Continue to contact
                  <ArrowRight className="size-4" aria-hidden />
                </button>
                <Link
                  href={`/services/${estimate.serviceId}`}
                  className="ms-cta-ghost"
                >
                  View service details
                </Link>
              </div>
            </div>
          ) : null}

          {step < 5 ? (
            <div className="mt-auto flex items-center justify-between gap-3 border-t border-border-subtle pt-6">
              <button
                type="button"
                onClick={() => setStep((s) => Math.max(0, s - 1))}
                disabled={step === 0}
                className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground disabled:opacity-40"
              >
                <ArrowLeft className="size-3.5" aria-hidden />
                Back
              </button>
              <button
                type="button"
                onClick={() => setStep((s) => s + 1)}
                disabled={!canNext()}
                className="ms-cta disabled:pointer-events-none disabled:opacity-50"
              >
                {step === 4 ? "See estimate" : "Continue"}
                <ArrowRight className="size-4" aria-hidden />
              </button>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
