export type TimelineEntry = {
  year: string;
  title: string;
  description: string;
};

export type PersonalProject = {
  name: string;
  description: string;
  href: string;
  external?: boolean;
};

export const FOUNDER_TIMELINE: TimelineEntry[] = [
  {
    year: "2016",
    title: "Started building for the web",
    description: "First production apps — learned that shipping beats perfecting.",
  },
  {
    year: "2020",
    title: "Full-stack at scale",
    description: "Led frontend and backend for products used by thousands daily.",
  },
  {
    year: "2024",
    title: "Makershot studio",
    description: "Launched the OG Image Generator and started taking client work.",
  },
  {
    year: "2026",
    title: "Studio + tools",
    description: "Running Makershot tools and a small roster of client sprints.",
  },
];

export const FOUNDER_PROJECTS: PersonalProject[] = [
  {
    name: "Makershot OG Generator",
    description: "Free 1200×630 OG image tool — FLUX backgrounds + Satori typography.",
    href: "/og",
  },
  {
    name: "iamk.xyz",
    description: "Personal site — writing, experiments, and the learning log.",
    href: "https://www.iamk.xyz",
    external: true,
  },
  {
    name: "Crest Launcher",
    description: "Custom Android launcher focused on minimal, fast home screens.",
    href: "https://www.iamk.xyz",
    external: true,
  },
  {
    name: "nf tool",
    description: "Network forensics utility for debugging connectivity issues.",
    href: "https://github.com/KOUSTAV2409",
    external: true,
  },
];

export const FOUNDER_CREDENTIALS = [
  "Full-stack engineer since 2016",
  "Based in West Bengal, India — shipping globally",
  "Open source contributor on GitHub",
  "Writing on iamk.xyz about building with AI",
];
