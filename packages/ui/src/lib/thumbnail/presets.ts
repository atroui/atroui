export type ThumbnailStyleKey =
  | "youtubePop"
  | "creatorNight"
  | "fireSale";

export type ThumbnailStylePreset = {
  key: ThumbnailStyleKey;
  label: string;
  description: string;
  /** Background prompt sent to the thumbnail image model. */
  backgroundPrompt: string;
  palette: {
    background: string;
    title: string;
    subtitle: string;
  };
  previewGradient: string;
  typography: {
    titleWeight: 700;
    titleSizeMax: number;
    subtitleSizeMax: number;
  };
};

const NO_TEXT_TAIL =
  "strictly no text, no letters, no typography, no characters, no numbers, no logos, no watermarks, no signatures, no symbols, no code snippets";

export const THUMBNAIL_STYLE_PRESETS: Readonly<
  Record<ThumbnailStyleKey, ThumbnailStylePreset>
> = {
  youtubePop: {
    key: "youtubePop",
    label: "YouTube Pop",
    description: "High contrast yellow & black, maximum click-through rate.",
    backgroundPrompt: `High contrast YouTube thumbnail background, aggressive pop art energy, vibrant yellow and deep black, dynamic diagonal speed lines and bold abstract shapes, high energy but clean composition with a large calm center reserved for text overlay, ${NO_TEXT_TAIL}`,
    palette: {
      background: "#FFD700",
      title: "#111111",
      subtitle: "#222222",
    },
    previewGradient:
      "linear-gradient(135deg, #FFD700 0%, #FFA500 55%, #FF8C00 100%)",
    typography: { titleWeight: 700, titleSizeMax: 110, subtitleSizeMax: 36 },
  },

  creatorNight: {
    key: "creatorNight",
    label: "Creator night",
    description: "Deep black with electric blue — tech YouTuber aesthetic.",
    backgroundPrompt: `Dramatic dark tech creator background, pitch black base with deep electric blue and subtle purple glow from edges, cinematic studio lighting, moody but clean, no bokeh discs, no particles, no fake text, clear center space reserved for large headline, ${NO_TEXT_TAIL}`,
    palette: {
      background: "#050510",
      title: "#FFFFFF",
      subtitle: "#60A5FA",
    },
    previewGradient:
      "linear-gradient(135deg, #050510 0%, #0F1B3D 50%, #1E40AF 100%)",
    typography: { titleWeight: 700, titleSizeMax: 96, subtitleSizeMax: 32 },
  },

  fireSale: {
    key: "fireSale",
    label: "Fire sale",
    description: "Red-to-orange urgency — launch videos and FOMO energy.",
    backgroundPrompt: `High-energy product launch background, dramatic red to deep orange gradient with abstract flowing shapes, intense warm lighting, urgent and exciting atmosphere, bold but uncluttered composition with clear center reserved for headline overlay, ${NO_TEXT_TAIL}`,
    palette: {
      background: "#7F1D1D",
      title: "#FFFFFF",
      subtitle: "#FED7AA",
    },
    previewGradient:
      "linear-gradient(135deg, #7F1D1D 0%, #DC2626 50%, #EA580C 100%)",
    typography: { titleWeight: 700, titleSizeMax: 100, subtitleSizeMax: 34 },
  },
};

export const THUMBNAIL_STYLE_KEYS: readonly ThumbnailStyleKey[] = [
  "youtubePop",
  "creatorNight",
  "fireSale",
];

export function isThumbnailStyleKey(value: unknown): value is ThumbnailStyleKey {
  return (
    typeof value === "string" &&
    (THUMBNAIL_STYLE_KEYS as readonly string[]).includes(value)
  );
}

export const THUMBNAIL_INPUT_LIMITS = {
  titleMax: 90,
  subtitleMax: 160,
  badgeMax: 20,
} as const;

