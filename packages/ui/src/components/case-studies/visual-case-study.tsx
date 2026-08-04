import type { CaseStudy } from "../../content/case-studies";

import { BeforeAfterSlider } from "./before-after-slider";

type VisualCaseStudyProps = {
  study: CaseStudy;
};

export function VisualCaseStudy({ study }: VisualCaseStudyProps) {
  const variant = study.mockupVariant ?? "saas";

  return (
    <div className="space-y-3">
      <BeforeAfterSlider variant={variant} />
      <p className="text-center text-xs text-muted-foreground">
        Drag the handle or use arrow keys to compare wireframe vs shipped UI.
      </p>
    </div>
  );
}
