
import { GoogleGenAI, Type } from "@google/genai";
import { DatePlan } from "./types";

export const generateDateNarrative = async (plan: DatePlan): Promise<{ vibe: string, schedule: {time: string, activity: string}[], outfit: string }> => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) throw new Error("API_KEY is missing");

  const ai = new GoogleGenAI({ apiKey });
  
  const prompt = `
    You are a luxury date concierge for a couple named Bobby and Enni.
    Context:
    - Mood: ${plan.mood}
    - Location: ${plan.where.label}
    - Food: ${plan.eat.label}
    - Activity: ${plan.do.label}
    
    Task: Write in Mongolian (Cyrillic). 
    - 'vibe': 2 poetic sentences.
    - 'schedule': 3 time-stamped steps.
    - 'outfit': Aesthetic outfit suggestions.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-preview',
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            vibe: { type: Type.STRING },
            outfit: { type: Type.STRING },
            schedule: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  time: { type: Type.STRING },
                  activity: { type: Type.STRING }
                },
                required: ["time", "activity"]
              }
            }
          },
          required: ["vibe", "schedule", "outfit"]
        }
      }
    });
    
    return JSON.parse(response.text || '{}');
  } catch (error) {
    console.error("AI Error:", error);
    return {
      vibe: "Хоёр зүрх нэгэн хэмнэлээр цохилох мартагдашгүй үдшийн эхлэл.",
      outfit: "Bobby: Зөөлөн ноолууран цамц. Enni: Торгон даашинз.",
      schedule: [
        { time: "18:00", activity: "Болзооны нээлт: Халуун дотно угталт." },
        { time: "19:30", activity: "Амтат зоог ба тухтай яриа." },
        { time: "21:00", activity: "Оддын доорх мартагдашгүй мөч." }
      ]
    };
  }
};
