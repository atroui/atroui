import { generateObject } from 'ai';
import { xai } from '@ai-sdk/xai';
import { z } from 'zod';

export interface AnalyzerResult {
  mood: string;
  targetAudience: string;
  keySymbols: string[];
}

export class ContentAnalyzerAgent {
  async analyze(title: string, subtitle?: string, badge?: string): Promise<AnalyzerResult> {
    const prompt = `Analyze this YouTube thumbnail content.
    
Content:
Title: "${title}"
Subtitle: "${subtitle || 'None'}"
Badge: "${badge || 'None'}"
`;

    const { object } = await generateObject({
      model: xai(process.env.XAI_MODEL || 'grok-4-1-fast-non-reasoning'),
      schema: z.object({
        mood: z.string().describe("Describe the emotional tone (e.g. Energetic, Mysterious, Professional, Urgent)"),
        targetAudience: z.string().describe("Who is this for (e.g. Beginner programmers, Gamers, Entrepreneurs)"),
        keySymbols: z.array(z.string()).describe("3-5 visual metaphors or items that represent this topic"),
      }),
      prompt: prompt,
      temperature: 0.2,
    });

    return object;
  }
}

