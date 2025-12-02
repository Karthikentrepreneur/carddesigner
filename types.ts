
export type CardMotif = 'lamp' | 'pot' | 'sun' | 'flower' | 'temple' | 'firework' | 'none';
export type CardVibe = 'royal' | 'festive' | 'nature' | 'divine';

export interface CardContent {
  tamilTitle: string;
  englishTitle: string;
  tamilWish: string;
  englishWish: string;
  footerText?: string; // New field for Contact/Phone/Email
  isSpecialDay: boolean;
  
  // Design Specifics determined by AI
  themeColor: string;
  accentColor: string;
  motif: CardMotif;
  vibe: CardVibe;
}

export interface CardState {
  date: string; // ISO string YYYY-MM-DD
  logoUrl: string | null;
  content: CardContent;
  isLoading: boolean;
  // User override for layout style
  layout: 'frame' | 'poster' | 'minimal' | 'divine' | 'floral' | 'agency' | 'tear' | 'tech'; 
}

export const DEFAULT_CONTENT: CardContent = {
  tamilTitle: "இனிய நாள் வாழ்த்துக்கள்",
  englishTitle: "Have a Wonderful Day",
  tamilWish: "இந்த நாள் உங்களுக்கு மகிழ்ச்சியும் வெற்றியும் தரட்டும்.",
  englishWish: "May this day bring you happiness and success.",
  footerText: "+91 99446 01656 | example@gmail.com",
  isSpecialDay: false,
  themeColor: "#4f46e5",
  accentColor: "#fbbf24",
  motif: "flower",
  vibe: "nature"
};
