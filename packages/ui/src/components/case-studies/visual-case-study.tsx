import type { CaseStudy } from "../../content/case-studies";

import { BeforeAfterSlider } from "./before-after-slider";

type VisualCaseStudyProps = {
  study: CaseStudy;
};

/**
 * Self-contained case-study band: meta, mockup compare, narrative, metrics.
 * Host pages can still compose a fuller article around this module.
 */
export function VisualCaseStudy({ study }: VisualCaseStudyProps) {
  const variant = study.mockupVariant ?? "saas";
  const topResult = study.results[0];

  return (
    <article className="overflow-hidden border border-border-subtle bg-background text-foreground">
      <header className="border-b border-border-subtle px-5 py-6 sm:px-8 sm:py-8">
        <div className="flex flex-wrap gap-x-3 gap-y-1 text-xs text-muted-foreground">
          <span className="font-medium uppercase tracking-wide text-foreground">
            {study.client.industry}
          </span>
          <span aria-hidden>·</span>
          <span>{study.projectType}</span>
          <span aria-hidden>·</span>
          <span>
            {study.timeline} · {study.budget}
          </span>
        </div>
        <h2 className="ds-display mt-4 max-w-3xl text-2xl tracking-tight sm:text-3xl">
          {study.title}
        </h2>
        <p className="mt-2 text-sm text-muted-foreground">{study.client.name}</p>
      </header>

      <div className="border-b border-border-subtle px-5 py-6 sm:px-8 sm:py-8">
        <BeforeAfterSlider variant={variant} />
        <p className="mt-3 text-center text-xs text-muted-foreground">
          Drag the handle or use arrow keys to compare wireframe vs shipped UI.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12">
        <div className="space-y-8 border-b border-border-subtle p-5 sm:p-8 lg:col-span-7 lg:border-r lg:border-b-0">
          <div>
            <p className="ms-stamp">The challenge</p>
            <p className="mt-4 text-[15px] leading-relaxed text-foreground/90">
              {study.challenge}
            </p>
          </div>
          <div>
            <p className="ms-stamp">The solution</p>
            <p className="mt-4 text-[15px] leading-relaxed text-foreground/90">
              {study.solution}
            </p>
          </div>
          {study.testimonial ? (
            <blockquote className="border-l-2 border-brand pl-5">
              <p className="text-[15px] leading-relaxed text-foreground/90">
                &ldquo;{study.testimonial}&rdquo;
              </p>
              {study.testimonialAuthor ? (
                <footer className="mt-3 text-xs text-muted-foreground">
                  - {study.testimonialAuthor}
                </footer>
              ) : null}
            </blockquote>
          ) : null}
        </div>

        <aside className="flex flex-col gap-8 bg-muted/30 p-5 sm:p-8 lg:col-span-5">
          {topResult ? (
            <div>
              <p className="ds-mono-label">Outcome</p>
              <p className="ds-display mt-3 text-4xl tracking-tight sm:text-5xl">
                {topResult.value}
              </p>
              <p className="mt-2 text-sm text-muted-foreground">
                {topResult.metric}
                {topResult.description ? ` - ${topResult.description}` : ""}
              </p>
            </div>
          ) : null}

          {study.results.length > 0 ? (
            <div>
              <p className="ds-mono-label">All results</p>
              <ul className="mt-3 space-y-3">
                {study.results.map((result) => (
                  <li key={result.metric} className="border-b border-border-subtle pb-3 last:border-0">
                    <p className="text-sm font-medium text-foreground">
                      {result.value}
                      <span className="ml-2 text-muted-foreground">
                        {result.metric}
                      </span>
                    </p>
                    {result.description ? (
                      <p className="mt-0.5 text-xs text-muted-foreground">
                        {result.description}
                      </p>
                    ) : null}
                  </li>
                ))}
              </ul>
            </div>
          ) : null}

          {study.technologies.length > 0 ? (
            <div>
              <p className="ds-mono-label">Stack</p>
              <ul className="mt-3 flex flex-wrap gap-2">
                {study.technologies.map((tech) => (
                  <li
                    key={tech}
                    className="rounded-md border border-border-subtle bg-background px-3 py-1 text-xs text-muted-foreground"
                  >
                    {tech}
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </aside>
      </div>
    </article>
  );
}
