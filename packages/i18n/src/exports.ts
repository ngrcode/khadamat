export {
  t,
  translate,
  LANGUAGE_STORAGE_KEY,
  getLanguageDirection,
  getLanguageFontFamily,
  getCurrentLanguage,
  setCurrentLanguage,
  loadStoredLanguage,
  persistLanguage,
  applyDocumentLanguage,
} from './index';
export type { LanguageCode, Direction } from './index';
export { LanguageProvider, useLanguage, useTranslate } from './LanguageProvider';
