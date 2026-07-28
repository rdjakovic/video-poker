import { createContext } from "react";
import { Language, TranslationKey } from "./translations";

export interface LanguageContextValue {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: TranslationKey, params?: Record<string, string | number>) => string;
  tHandRank: (rank: string) => string;
}

export const LanguageContext = createContext<LanguageContextValue | null>(null);
