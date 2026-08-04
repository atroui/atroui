/**
 * Style presets for the hybrid OG generator (Phase 2).
 *
 * Each preset is a frozen bundle of: the textless background prompt handed
 * to FLUX, a safe-zone spec that tells the compositor where to park the
 * title/subtitle, and the palette used for the text overlay. The file is
 * pure data with zero Node dependencies so both the client (workspace
 * chips, live preview) and the server (compose pipeline) can import it.
 */

export type StyleKey =
  | "editorial"
  | "techMinimal"
  | "vibrantLaunch"
  | "darkDev"
  | "paperQuote"
  | "indieNeon";

/** Where the title+subtitle stack sits inside the 1200×630 canvas. */
export type SafeZone = "left" | "center" | "lowerThird";

export type StylePreset = {
  key: StyleKey;
  /** Chip label in the workspace. */
  label: string;
  /** One-line tooltip / helper text. */
  description: string;
  /** Background prompt sent to FLUX — always textless by design. */
  backgroundPrompt: string;
  safeZone: SafeZone;
  palette: {
    /** Fallback solid color used in the live CSS preview. */
    background: string;
    title: string;
    subtitle: string;
  };
  /** Two-stop CSS gradient used for the live preview before generation. */
  previewGradient: string;
  /** Typographic flavour — controls overlay font weight + feel. */
  typography: {
    titleWeight: 700;
    /** px — we auto-shrink for long titles in the compositor. */
    titleSizeMax: number;
    subtitleSizeMax: number;
  };
};

/**
 * Shared tail appended to every background prompt. Keeps the tokens that
 * steer FLUX away from letters consistent across presets.
 */
const NO_TEXT_TAIL =
  "strictly no text, no letters, no typography, no characters, no numbers, no logos, no watermarks, no signatures, no symbols, no code snippets, 1200x630";

export const STYLE_PRESETS: Readonly<Record<StyleKey, StylePreset>> = {
  editorial: {
    key: "editorial",
    label: "Editorial",
    description: "Navy + cream, premium magazine feel. Great for blogs.",
    backgroundPrompt: `Editorial tech blog cover background, soft gradient from deep ink-blue to violet, abstract geometric shapes floating, subtle dotted grid pattern, muted premium color palette, cinematic depth of field, clean minimalist composition with generous empty space on the left for a headline overlay, ${NO_TEXT_TAIL}`,
    safeZone: "left",
    palette: {
      background: "#0B132B",
      title: "#F6F1E4",
      subtitle: "#F6F1E4CC",
    },
    previewGradient:
      "linear-gradient(135deg, #0B132B 0%, #1C2541 55%, #3A1C71 100%)",
    typography: { titleWeight: 700, titleSizeMax: 80, subtitleSizeMax: 30 },
  },

  techMinimal: {
    key: "techMinimal",
    label: "Tech minimal",
    description: "Ink-blue to violet, modern SaaS launch energy.",
    backgroundPrompt: `Minimalist modern SaaS background, soft gradient from midnight indigo to plum, abstract geometric line work, thin vector mesh in the upper right, subtle light gleam, premium calm tech feel, clean left-safe composition reserved for a product name, ${NO_TEXT_TAIL}`,
    safeZone: "left",
    palette: {
      background: "#12163B",
      title: "#EEF1FF",
      subtitle: "#CBD2FFCC",
    },
    previewGradient:
      "linear-gradient(135deg, #12163B 0%, #1F2060 50%, #5B21B6 100%)",
    typography: { titleWeight: 700, titleSizeMax: 82, subtitleSizeMax: 30 },
  },

  vibrantLaunch: {
    key: "vibrantLaunch",
    label: "Vibrant launch",
    description: "Coral → pink sunset, exciting product launch energy.",
    backgroundPrompt: `Product launch announcement background, warm sunset gradient from coral orange to hot pink, abstract 3D floating shapes with soft bloom lighting, energetic but clean premium feel, center-safe zone kept open for a large product name overlay, ${NO_TEXT_TAIL}`,
    safeZone: "center",
    palette: {
      background: "#FF6B6B",
      title: "#FFFFFF",
      subtitle: "#FFFFFFCC",
    },
    previewGradient:
      "linear-gradient(135deg, #FF7A59 0%, #FF5284 50%, #D93A9B 100%)",
    typography: { titleWeight: 700, titleSizeMax: 92, subtitleSizeMax: 32 },
  },

  darkDev: {
    key: "darkDev",
    label: "Dark dev",
    description:
      "Ink-studio noir — charcoal depths, mint accent like proof highlights on dark paper.",
    backgroundPrompt: `Premium dark-mode product background inspired by refined pen-and-ink on paper reinterpreted as soft digital fields: rich matte charcoal and near-black tones, restrained cool mint-teal luminosity at the edges only (syntax-highlight calm, not neon), silky smooth gradients with generous negative space in the center, high-contrast restrained studio lighting like a monochrome sketch under soft lamp light — calm, authoritative, solitary maker energy, absolutely no terminals, keyboards, brackets, grids, cables, wires, HUD, sci-fi neon, crypto aesthetic, chrome UI, photographs, faces, handwriting, glyphs, symbols, icons, logos, fake text or numbers, ${NO_TEXT_TAIL}`,
    safeZone: "center",
    palette: {
      background: "#0D1117",
      title: "#E7F6EE",
      subtitle: "#86EFAC",
    },
    previewGradient:
      "linear-gradient(135deg, #0D1117 0%, #161B22 60%, #065F46 100%)",
    typography: { titleWeight: 700, titleSizeMax: 84, subtitleSizeMax: 28 },
  },

  paperQuote: {
    key: "paperQuote",
    label: "Paper quote",
    description: "Cream + olive, editorial quote / newsletter vibe.",
    backgroundPrompt: `Editorial social quote card background, warm paper white base, muted olive and rust palette, subtle torn paper texture at the edges, classic serif editorial look, center-safe zone kept open for a large quote overlay, ${NO_TEXT_TAIL}`,
    safeZone: "center",
    palette: {
      background: "#F2EAD3",
      title: "#2D2A26",
      subtitle: "#6B5A3A",
    },
    previewGradient:
      "linear-gradient(135deg, #F2EAD3 0%, #E8DCC2 55%, #D8C9A7 100%)",
    typography: { titleWeight: 700, titleSizeMax: 76, subtitleSizeMax: 26 },
  },

  indieNeon: {
    key: "indieNeon",
    label: "Indie neon",
    description: "Midnight + cyan sweep, build-in-public energy.",
    backgroundPrompt: `Build-in-public revenue update background, confident dark mode, deep navy with a single bold cyan gradient sweep from lower left to upper right, abstract upward-trending line motif subtly embedded, maker/indie-hacker energy, center-safe zone reserved for a revenue number and caption overlay, ${NO_TEXT_TAIL}`,
    safeZone: "center",
    palette: {
      background: "#0A192F",
      title: "#E6F7FF",
      subtitle: "#7DD3FC",
    },
    previewGradient:
      "linear-gradient(135deg, #0A192F 0%, #0E4166 55%, #06B6D4 100%)",
    typography: { titleWeight: 700, titleSizeMax: 92, subtitleSizeMax: 30 },
  },
};

export const STYLE_KEYS: readonly StyleKey[] = [
  "paperQuote",
  "techMinimal",
  "vibrantLaunch",
  "darkDev",
  "editorial",
  "indieNeon",
];

export function isStyleKey(value: unknown): value is StyleKey {
  return (
    typeof value === "string" && (STYLE_KEYS as readonly string[]).includes(value)
  );
}

/** Server-side input constraints kept in one place. */
export const QUICK_INPUT_LIMITS = {
  titleMax: 80,
  subtitleMax: 140,
} as const;
