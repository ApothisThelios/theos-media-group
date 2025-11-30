import { GoogleGenAI, Type } from "@google/genai";
import { NewsScript } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateNewsScript = async (topic: string): Promise<NewsScript> => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `Write a 60-second vertical news script about: ${topic}. 
      The tone should be culturally relevant, high-energy, and professional (like Revolt TV or Vice News).
      Include a catchy headline and 3 relevant hashtags.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING },
            script: { type: Type.STRING },
            hashtags: {
              type: Type.ARRAY,
              items: { type: Type.STRING }
            }
          },
          required: ["title", "script", "hashtags"]
        }
      }
    });

    if (response.text) {
      return JSON.parse(response.text) as NewsScript;
    }
    throw new Error("No response text");
  } catch (error) {
    console.error("Gemini API Error:", error);
    // Fallback for demo purposes if API key is missing or fails
    return {
      title: `Breaking: ${topic}`,
      script: `(Camera pans in)\n\nYo, what's good family? We're talking about ${topic} today.\n\nHere's the breakdown: This is shifting the culture in real-time. We're seeing major moves in the sector.\n\nDon't sleep on this. It's not just news, it's the future.\n\nStay locked in.`,
      hashtags: ["TheosNews", "Culture", "Update"]
    };
  }
};