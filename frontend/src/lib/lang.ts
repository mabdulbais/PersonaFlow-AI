import type { Language } from "./schemas";

export const LANGUAGES: { code: Language; label: string; native: string }[] = [
  { code: "en", label: "English", native: "English" },
  { code: "ur", label: "Urdu",    native: "اردو" },
  { code: "ar", label: "Arabic",  native: "العربية" },
];

export const isRTL = (lang: Language): boolean => lang === "ur" || lang === "ar";

export const langInstruction = (lang: Language): string => {
  if (lang === "ur") {
    return "Respond in natural, fluent Urdu (اردو) using Urdu script for all string fields. Use culturally adapted register, not literal translation.";
  }
  if (lang === "ar") {
    return "Respond in natural, fluent Arabic (العربية) using Arabic script for all string fields. Use culturally adapted register, not literal translation.";
  }
  return "Respond in clear, natural English for all string fields.";
};
