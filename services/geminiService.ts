
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const getGeminiStudyAdvice = async (topicName: string, currentLevel: string) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `I am currently studying the DSA concept "${topicName}". My current mastery level for this concept is "${currentLevel}". 
      Please provide:
      1. A high-level explanation of this concept/technique.
      2. Time and Space complexity details (Average and Worst cases).
      3. 3 specific LeetCode problem examples that best demonstrate this exact pattern.
      4. A critical logic check or common mistake beginners make with this concept.
      
      Keep it professional, concise, and formatted with bullet points.`,
      config: {
        temperature: 0.6,
      }
    });
    
    return response.text;
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Sorry, I couldn't generate study advice at this time. Please check your API key or connection.";
  }
};
