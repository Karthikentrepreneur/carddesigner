
import { GoogleGenAI, Type, Schema } from "@google/genai";
import { CardContent, DEFAULT_CONTENT } from "../types";

// Initialize Gemini Client
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const contentSchema: Schema = {
  type: Type.OBJECT,
  properties: {
    tamilTitle: {
      type: Type.STRING,
      description: "A VERY SHORT Tamil headline (max 3 words). E.g., 'இனிய பொங்கல்', 'தீபாவளி நல்வாழ்த்து'. Must be punchy for poster design.",
    },
    englishTitle: {
      type: Type.STRING,
      description: "Short English equivalent (e.g., Happy Pongal).",
    },
    tamilWish: {
      type: Type.STRING,
      description: "A professional, poetic greeting in Tamil. Max 2 sentences.",
    },
    englishWish: {
      type: Type.STRING,
      description: "Matching English wish.",
    },
    footerText: {
      type: Type.STRING,
      description: "A dummy placeholder for contact info if a user was hiring, OR a generic 'Wishes from Family' text. E.g. '+91 99999 99999 | wishes@example.com' or 'Greetings from [Your Name]'",
    },
    isSpecialDay: {
      type: Type.BOOLEAN,
      description: "True if festival.",
    },
    themeColor: {
      type: Type.STRING,
      description: "A deep, rich HEX color (e.g., #2A0A0A, #0B192C).",
    },
    accentColor: {
      type: Type.STRING,
      description: "A gold or metallic accent HEX (e.g., #D4AF37).",
    },
    motif: {
      type: Type.STRING,
      enum: ['lamp', 'pot', 'sun', 'flower', 'temple', 'firework', 'none'],
      description: "Visual element.",
    },
    vibe: {
      type: Type.STRING,
      enum: ['royal', 'festive', 'nature', 'divine'],
      description: "Aesthetic style.",
    }
  },
  required: ["tamilTitle", "englishTitle", "tamilWish", "englishWish", "isSpecialDay", "themeColor", "accentColor", "motif", "vibe"],
};

export const generateCardContent = async (date: string): Promise<CardContent> => {
  try {
    const prompt = `
      Act as a Senior Art Director for a Luxury Indian Brand.
      Analyze the date ${date}.
      
      1. Identify the Tamil Festival.
      2. Content Strategy:
         - **Titles**: MUST BE SHORT. Long titles break the design. (e.g. use 'இனிய பொங்கல்' instead of 'அனைவருக்கும் இனிய பொங்கல் நல்வாழ்த்துக்கள்').
         - **Tone**: Elegant, sophisticated, auspicious.
      
      3. Visual Logic:
         - Deepavali/Karthigai -> 'lamp'
         - Pongal -> 'pot'
         - New Year/Generic -> 'flower' or 'sun'
      
      Output strictly in JSON.
    `;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: contentSchema,
        temperature: 0.7,
      },
    });

    const text = response.text;
    if (!text) return DEFAULT_CONTENT;

    const data = JSON.parse(text) as CardContent;
    return data;

  } catch (error) {
    console.error("Error generating content:", error);
    return DEFAULT_CONTENT;
  }
};
