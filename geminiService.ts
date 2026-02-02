
import { GoogleGenAI, Type } from "@google/genai";
import { DatePlan } from "../types";

export const generateDateNarrative = async (plan: DatePlan): Promise<{ vibe: string, schedule: {time: string, activity: string}[], outfit: string }> => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    throw new Error("API_KEY is not defined in environment variables");
  }

  const ai = new GoogleGenAI({ apiKey });
  
  const prompt = `
    You are a world-class luxury date concierge. Your clients are a couple named Bobby and Enni.
    
    Current Plan:
    - Mood: ${plan.mood}
    - Location: ${plan.where.label} (${plan.where.emoji})
    - Dining: ${plan.eat.label} (${plan.eat.emoji})
    - Activity: ${plan.do.label} (${plan.do.emoji})
    
    Task:
    Create a highly aesthetic, romantic, and detailed date narrative. 
    Write strictly in Cyrillic Mongolian language.
    
    1. 'vibe': A poetic 2-sentence description of the atmosphere.
    2. 'schedule': A specific 3-step timeline with times and charming activity names.
    3. 'outfit': A sophisticated 'his and hers' outfit suggestion.
    
    Return the response strictly in JSON format.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-preview',
      contents: prompt,
      config: {
        thinkingConfig: { thinkingBudget: 4000 },
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
    
    const text = response.text;
    if (!text) throw new Error("Empty response from AI");
    return JSON.parse(text);
  } catch (error) {
    console.error("Gemini API Error:", error);
    return {
      vibe: "Хоёр зүрх нэгэн хэмнэлээр цохилох, мартагдашгүй үдшийн эхлэл. Хайр хаа сайгүй мэдрэгдэнэ.",
      outfit: "Bobby: Зөөлөн саарал ноолууран цамц. Enni: Цагаан торгон даашинз ба сувдан зүүлт.",
      schedule: [
        { time: "17:00", activity: "Болзооны нээлт: Халуун дотноор угталт." },
        { time: "19:00", activity: "Амтат зоог: Лааны гэрэлд тухлан ярилцах." },
        { time: "21:00", activity: "Сэтгэлийн аялгуу: Оддын дор өнгөрүүлэх торгон агшин." }
      ]
    };
  }
};
