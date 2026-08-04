export type StudioProjectStatus = "scoping" | "building" | "review" | "shipped";

export type StudioProject = {
  id: string;
  name: string;
  client: string;
  service: string;
  status: StudioProjectStatus;
  progress: number;
  lastUpdate: string;
  milestone: string;
  /** Anonymized — shown on public dashboard with client permission */
  public: boolean;
};

export const STUDIO_PROJECTS: StudioProject[] = [
  {
    id: "p1",
    name: "Dev tools MVP",
    client: "Stealth founder",
    service: "MVP Sprint",
    status: "building",
    progress: 72,
    lastUpdate: "Deployed auth + dashboard today",
    milestone: "Day 5 of 7",
    public: true,
  },
  {
    id: "p2",
    name: "Document AI pipeline",
    client: "Legal tech",
    service: "AI Integration",
    status: "review",
    progress: 90,
    lastUpdate: "Streaming UI in staging — client review",
    milestone: "Final polish",
    public: true,
  },
  {
    id: "p3",
    name: "Design system v2",
    client: "Fintech",
    service: "Design System",
    status: "scoping",
    progress: 15,
    lastUpdate: "Token audit complete",
    milestone: "Week 1 kickoff",
    public: true,
  },
];

export const STATUS_LABELS: Record<StudioProjectStatus, string> = {
  scoping: "Scoping",
  building: "Building",
  review: "In review",
  shipped: "Shipped",
};

export const STATUS_COLORS: Record<StudioProjectStatus, string> = {
  scoping: "text-amber-600 bg-amber-500/10 border-amber-500/20",
  building: "text-brand bg-brand/10 border-brand/20",
  review: "text-violet-600 bg-violet-500/10 border-violet-500/20",
  shipped: "text-emerald-600 bg-emerald-500/10 border-emerald-500/20",
};
