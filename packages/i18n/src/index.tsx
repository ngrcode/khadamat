import faTranslations from './locales/fa';
import enTranslations from './locales/en';
import frTranslations from './locales/fr';
import arTranslations from './locales/ar';
import { Translations } from './types/translationTypes';

export type LanguageCode = 'fa' | 'en' | 'fr' | 'ar';
export type Direction = 'rtl' | 'ltr';

const LANGUAGE_STORAGE_KEY = 'app-language';

let currentLanguage: LanguageCode = 'fa';

const languages: Record<LanguageCode, Translations> = {
  fa: faTranslations,
  en: enTranslations,
  fr: frTranslations,
  ar: arTranslations,
};

export const getLanguageDirection = (language: LanguageCode): Direction =>
  language === 'fa' || language === 'ar' ? 'rtl' : 'ltr';

export const getLanguageFontFamily = (language: LanguageCode) =>
  language === 'en' || language === 'fr'
    ? "'Segoe UI', Arial, sans-serif"
    : "'IranSans', 'IRANSansXFaNum', Arial, sans-serif";

export const getCurrentLanguage = () => currentLanguage;

export const setCurrentLanguage = (language: LanguageCode) => {
  currentLanguage = language;
};

export const loadStoredLanguage = (): LanguageCode => {
  if (typeof window === 'undefined') return currentLanguage;

  const storedLanguage = window.localStorage.getItem(LANGUAGE_STORAGE_KEY);
  if (
    storedLanguage === 'fa' ||
    storedLanguage === 'en' ||
    storedLanguage === 'fr' ||
    storedLanguage === 'ar'
  ) {
    currentLanguage = storedLanguage;
  }

  return currentLanguage;
};

export const persistLanguage = (language: LanguageCode) => {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem(LANGUAGE_STORAGE_KEY, language);
};

export const applyDocumentLanguage = (language: LanguageCode) => {
  if (typeof document === 'undefined') return;

  const direction = getLanguageDirection(language);
  document.documentElement.lang = language;
  document.documentElement.dir = direction;
  document.body.dir = direction;
  document.body.classList.toggle('lang-fa', language === 'fa');
  document.body.classList.toggle('lang-en', language === 'en');
  document.body.classList.toggle('lang-fr', language === 'fr');
  document.body.classList.toggle('lang-ar', language === 'ar');
};

const getTranslation = (
  key: keyof Translations,
  variables?: Record<string, string | number>,
): string => {
  const lang = languages[currentLanguage] ?? faTranslations;
  const fallbackLang = currentLanguage === 'fa' ? enTranslations : faTranslations;
  let translatedString = lang[key] || fallbackLang[key] || enTranslations[key] || String(key);

  if (variables) {
    Object.keys(variables).forEach((variable) => {
      translatedString = translatedString.replace(
        new RegExp(`{${variable}}`, 'g'),
        variables[variable].toString(),
      );
    });
  }

  return translatedString;
};

const t = getTranslation;
const translate = getTranslation;

export { t, translate, LANGUAGE_STORAGE_KEY };
