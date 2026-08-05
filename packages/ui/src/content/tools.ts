/**
 * Makershot tool catalog. Drives /tools grid + home teaser.
 * Keep this the single source of truth - each tool has its own card + route.
 */

export type ToolStatus = "live" | "beta" | "soon";

export type Tool = {
  id: string;
  name: string;
  tagline: string;
  description: string;
  href: string;
  status: ToolStatus;
  /** Category chip - used for filters later. */
  category: "images" | "documents" | "writing" | "dev";
  /** Short feature bullets for the card footer. */
  highlights: string[];
};

export const TOOLS: Tool[] = [
  {
    id: "og",
    name: "OG Image Generator",
    tagline: "Viral OG images in seconds",
    description:
      "Turn a single prompt into a polished 1200×630 Open Graph image. No templates, no design skills needed.",
    href: "/og",
    status: "live",
    category: "images",
    highlights: ["1200×630", "One-prompt generate", "Instant download"],
  },
  {
    id: "thumbnail",
    name: "Thumbnail Generator",
    tagline: "Click-worthy thumbnails on demand",
    description:
      "Generate YouTube, LinkedIn, and blog thumbnails that actually get clicks - from a prompt or a link.",
    href: "/thumbnail",
    status: "live",
    category: "images",
    highlights: ["YouTube 16:9", "LinkedIn 1.91:1", "Blog covers"],
  },
  {
    id: "smart-pdf",
    name: "Smart PDF Tools",
    tagline: "Understand, extract, and transform PDFs",
    description:
      "AI-powered PDF toolkit: summarize, extract structured data, and convert between formats - built for makers.",
    href: "/tools#smart-pdf",
    status: "soon",
    category: "documents",
    highlights: ["Summarize", "Extract tables", "Clean exports"],
  },
  {
    id: "link-scraper",
    name: "Link-to-Preview",
    tagline: "Beautiful preview cards from any URL",
    description:
      "Paste any link, get a designer-grade preview card with title, description, and OG image - ready to embed.",
    href: "/tools#link-scraper",
    status: "soon",
    category: "dev",
    highlights: ["Embed as HTML", "Fast OG scrape", "Themeable"],
  },
];

export const LIVE_TOOLS = TOOLS.filter((t) => t.status === "live");
