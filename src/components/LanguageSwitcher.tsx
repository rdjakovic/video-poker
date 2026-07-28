import { Globe } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useLanguage } from "@/i18n/useLanguage";
import { Language, LANGUAGE_NAMES } from "@/i18n/translations";

const LanguageSwitcher = () => {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="flex items-center gap-1.5 sm:gap-2">
      <Globe className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400 flex-shrink-0" />
      <Select value={language} onValueChange={(value) => setLanguage(value as Language)}>
        <SelectTrigger className="h-8 w-[90px] sm:w-[110px] bg-green-700 text-yellow-100 border-yellow-500 text-xs sm:text-sm">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {(Object.keys(LANGUAGE_NAMES) as Language[]).map((lang) => (
            <SelectItem key={lang} value={lang}>
              {LANGUAGE_NAMES[lang]}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default LanguageSwitcher;
