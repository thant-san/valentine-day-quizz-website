
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateLoveMessage = async (score: number, total: number): Promise<string> => {
  const prompt = `Write a short, romantic Valentine's Day message for someone who just took a "How well do you know me?" quiz and scored ${score} out of ${total}. 
  If the score is low, be funny and encouraging. 
  If the score is high, be deeply poetic and romantic. 
  Keep the message under 40 words.`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        temperature: 0.8,
        topP: 0.9,
      },
    });

    return response.text || "You have my heart forever.";
  } catch (error) {
    console.error("Error generating love message:", error);
    return "No matter the score, you are the missing piece to my puzzle.";
  }
};
