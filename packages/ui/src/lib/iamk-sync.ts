/** Parse public data from iamk.xyz HTML with static fallback. */

export type IamkProfile = {
  name: string;
  tagline: string;
  location: string;
  streakDays: number;
  examTarget: string;
  examDate: string;
  examProgress: number;
  currently: string[];
  projects: { name: string; description: string; tags: string[] }[];
  recentLog: { date: string; title: string; tags: string[] }[];
  syncedAt: string;
  source: "live" | "fallback";
};

export const IAMK_FALLBACK: IamkProfile = {
  name: "Koustav Ganguly",
  tagline:
    "Frontend developer becoming a full-stack AI engineer and computer science researcher.",
  location: "West Bengal, India",
  streakDays: 0,
  examTarget: "TIFR GS CS",
  examDate: "December 14, 2026",
  examProgress: 28,
  currently: [
    "Reading Rosen — propositional logic, proof techniques",
    "Learning GO Classes — discrete math lectures",
    "Shipping Crest launcher",
    "Target TIFR GS CS — 14 December 2026",
  ],
  projects: [
    {
      name: "Crest",
      description:
        "A premium, keyboard-first productivity launcher for Linux. Built with Tauri and Rust.",
      tags: ["Tauri", "Rust", "React"],
    },
    {
      name: "nf",
      description:
        "Single-command note tool for Linux & macOS — capture in the terminal.",
      tags: ["Bash", "CLI", "Open source"],
    },
    {
      name: "iamk.xyz",
      description: "Personal site — a living document updated as things happen.",
      tags: ["Next.js", "Tailwind v4", "MDX"],
    },
  ],
  recentLog: [
    {
      date: "May 05",
      title: "Shipped Crest — a premium productivity launcher for Linux.",
      tags: ["crest", "rust", "tauri"],
    },
    {
      date: "Apr 17",
      title: "Phase 2 of the rebuild — streak row, reading shelf, log preview.",
      tags: ["meta"],
    },
  ],
  syncedAt: new Date().toISOString(),
  source: "fallback",
};

function extractText(html: string, pattern: RegExp): string | null {
  const m = html.match(pattern);
  return m?.[1]?.trim() ?? null;
}

function extractAll(html: string, pattern: RegExp): string[] {
  return [...html.matchAll(pattern)].map((m) => m[1]?.trim() ?? "").filter(Boolean);
}

export function parseIamkHtml(html: string): IamkProfile {
  const profile = { ...IAMK_FALLBACK, source: "live" as const, syncedAt: new Date().toISOString() };

  const name = extractText(html, /<h1[^>]*>([^<]+)<\/h1>/i);
  if (name) profile.name = name;

  const tagline = extractText(html, /shipping<\/[^>]+>\s*<\/[^>]+>\s*<p[^>]*>([^<]+)/i)
    ?? extractText(html, /Frontend developer[^<]+/i);
  if (tagline) profile.tagline = tagline.replace(/\s+/g, " ").trim();

  const streak = extractText(html, /current[^0-9]*(\d+)\s*days/i);
  if (streak) profile.streakDays = parseInt(streak, 10);

  const progress = extractText(html, /(\d+)%\s*to exam/i);
  if (progress) profile.examProgress = parseInt(progress, 10);

  const currentlyItems = extractAll(html, /<li[^>]*>[\s\S]*?<span[^>]*>([^<]{10,80})<\/span>/gi);
  if (currentlyItems.length) profile.currently = currentlyItems.slice(0, 5);

  return profile;
}

export async function fetchIamkProfile(): Promise<IamkProfile> {
  try {
    const res = await fetch("https://www.iamk.xyz", {
      next: { revalidate: 3600 },
      headers: {
        "User-Agent": `AtroUI/1.0 (+${process.env.NEXT_PUBLIC_SITE_URL || "https://atroui.com"})`,
      },
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const html = await res.text();
    return parseIamkHtml(html);
  } catch {
    return { ...IAMK_FALLBACK, syncedAt: new Date().toISOString(), source: "fallback" };
  }
}
