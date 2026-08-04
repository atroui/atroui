/**
 * Client for Google Imagen 3 via the Gemini API (Google AI Studio).
 */

export type ImagenAspectRatio = "1:1" | "3:4" | "4:3" | "9:16" | "16:9";

export type ImagenRequest = {
  prompt: string;
  aspectRatio?: ImagenAspectRatio;
};

type GoogleImagePart = {
  inlineData?: {
    data?: string;
  };
};

type GoogleImageResponse = {
  candidates?: Array<{
    content?: {
      parts?: GoogleImagePart[];
    };
  }>;
};

export async function generateImagen3(req: ImagenRequest): Promise<Buffer> {
  const apiKey =
    process.env.GOOGLE_AI_KEY ||
    process.env.GOOGLE_AI_API_KEY ||
    process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error(
      "Google AI key is not set. Use GOOGLE_AI_KEY, GOOGLE_AI_API_KEY, or GEMINI_API_KEY.",
    );
  }

  // Google AI Studio Nano Banana Pro (Gemini 3 Pro Image)
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3-pro-image-preview:generateContent?key=${apiKey}`;

  const body = {
    contents: [
      {
        parts: [
          {
            text: req.prompt,
          },
        ],
      },
    ],
    generationConfig: {
      responseModalities: ["IMAGE"],
      imageConfig: {
        aspectRatio: req.aspectRatio || "16:9",
      },
    },
  };

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    console.error("[google-ai] Nano Banana Error:", error);
    throw new Error(error?.error?.message || `Google API error (${response.status})`);
  }

  const data = (await response.json()) as GoogleImageResponse;
  
  // Extract base64 from the first candidate's image part
  const base64 = data.candidates?.[0]?.content?.parts?.find(
    (part) => typeof part.inlineData?.data === "string",
  )?.inlineData?.data;
  
  if (!base64) {
    console.error("[google-ai] Full Response:", JSON.stringify(data, null, 2));
    throw new Error("No image data returned from Google Nano Banana 2.");
  }

  return Buffer.from(base64, "base64");
}
