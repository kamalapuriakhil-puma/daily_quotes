
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export async function generateDevotionalQuote(theme: string = 'peace and devotion'): Promise<string> {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Generate a short, inspiring devotional quote in Telugu script about ${theme}. The tone should be spiritual and profound. Output ONLY the Telugu text.`,
      config: {
        temperature: 0.7,
        topP: 0.8,
        // Removed maxOutputTokens to follow @google/genai guidelines regarding thinkingBudget requirements
      }
    });

    return response.text || 'ధర్మమే జయం.';
  } catch (error) {
    console.error('Error generating quote:', error);
    return 'భగవంతుడు నీతోనే ఉన్నాడు.';
  }
}
