export type ResourceType = "guide" | "template" | "checklist" | "video";

export type Resource = {
  id: string;
  title: string;
  description: string;
  type: ResourceType;
  category: "AI" | "Design" | "Development" | "Business";
  downloadUrl?: string;
  externalUrl?: string;
  readTime?: string;
  premium?: boolean;
};

export const RESOURCE_TYPES: { id: ResourceType; label: string }[] = [
  { id: "guide", label: "Guides" },
  { id: "template", label: "Templates" },
  { id: "checklist", label: "Checklists" },
  { id: "video", label: "Videos" },
];

export const RESOURCE_CATEGORIES = [
  "AI",
  "Design",
  "Development",
  "Business",
] as const;

export const RESOURCES: Resource[] = [
  {
    id: "mvp-scope-template",
    title: "MVP Scope Template",
    description:
      "A one-page template for scoping your MVP before you talk to any studio. Forces you to pick one workflow and define success metrics.",
    type: "template",
    category: "Business",
    downloadUrl: "/downloads/mvp-scope-template.md",
    readTime: "5 min to fill",
  },
  {
    id: "ai-feature-checklist",
    title: "AI Feature Launch Checklist",
    description:
      "18 items to verify before shipping an AI feature: guardrails, cost caps, streaming UX, fallbacks, and monitoring.",
    type: "checklist",
    category: "AI",
    downloadUrl: "/downloads/ai-feature-checklist.md",
    readTime: "10 min read",
  },
  {
    id: "design-token-starter",
    title: "Design Token Starter Kit",
    description:
      "A Tailwind v4 token file with color, type, spacing, and motion scales — ready to drop into a Next.js project.",
    type: "template",
    category: "Design",
    externalUrl: "/journal/design-tokens-in-practice",
    readTime: "Guide",
  },
  {
    id: "sprint-playbook",
    title: "7-Day Sprint Playbook",
    description:
      "Day-by-day breakdown of how we ship an MVP in a week. The stack, decisions we skip, and ones we never skip.",
    type: "guide",
    category: "Development",
    externalUrl: "/journal/the-7-day-mvp-sprint-playbook",
    readTime: "8 min read",
  },
  {
    id: "async-client-guide",
    title: "Async Client Communication Guide",
    description:
      "How to run a client project without daily standups: update templates, Loom walkthroughs, and decision logs.",
    type: "guide",
    category: "Business",
    downloadUrl: "/downloads/async-client-guide.md",
    readTime: "6 min read",
  },
  {
    id: "stack-decision-tree",
    title: "Stack Decision Tree",
    description:
      "When to use Next.js vs. a simpler stack, when to add a database, and when AI is actually worth the complexity.",
    type: "checklist",
    category: "Development",
    downloadUrl: "/downloads/stack-decision-tree.md",
    readTime: "4 min read",
  },
  {
    id: "og-image-spec",
    title: "OG Image Spec Sheet",
    description:
      "Dimensions, safe zones, and typography guidelines for 1200×630 social cards that look sharp everywhere.",
    type: "template",
    category: "Design",
    downloadUrl: "/downloads/og-image-spec.md",
    readTime: "3 min read",
  },
];
