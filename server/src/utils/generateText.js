import { GoogleGenAI } from '@google/genai';

const aiClient = new GoogleGenAI({
  apiKey: process.env.GOOGLE_API_KEY,
});

export const generateText = async (prompt) => {
  try {
    const response = await aiClient.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    return response.text;
  } catch (error) {
    throw new Error('AI text generation failed');
  }
};
