import { useState, useCallback, ReactNode } from "react";
import { Language, translations, HAND_RANK_NAMES } from "./translations";
import { LanguageContext } from "./languageContextValue";

const LANGUAGE_STORAGE_KEY = "video-poker-language";

const readStoredLanguage = (): Language => {
  if (typeof window === "undefined") return "en";
  const stored = window.localStorage.getItem(LANGUAGE_STORAGE_KEY);
  return stored === "en" || stored === "sr" ? stored : "en";
};

const interpolate = (template: string, params?: Record<string, string | number>): string => {
  if (!params) return template;
  return template.replace(/\{(\w+)\}/g, (match, key) =>
    key in params ? String(params[key]) : match,
  );
};

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguageState] = useState<Language>(readStoredLanguage);

  const setLanguage = useCallback((next: Language) => {
    setLanguageState(next);
    window.localStorage.setItem(LANGUAGE_STORAGE_KEY, next);
  }, []);

  const t = useCallback(
    (key: keyof typeof translations["en"], params?: Record<string, string | number>) =>
      interpolate(translations[language][key], params),
    [language],
  );

  const tHandRank = useCallback(
    (rank: string) => HAND_RANK_NAMES[language][rank] || rank,
    [language],
  );

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, tHandRank }}>
      {children}
    </LanguageContext.Provider>
  );
};
