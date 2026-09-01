'use client';

import { ConfigProvider } from 'antd';
import React, {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

import {
  applyDocumentLanguage,
  getCurrentLanguage,
  getLanguageDirection,
  getLanguageFontFamily,
  LanguageCode,
  loadStoredLanguage,
  persistLanguage,
  setCurrentLanguage,
  t,
} from './index';

const LANGUAGE_SEQUENCE: LanguageCode[] = ['fa', 'en', 'fr', 'ar'];

interface LanguageContextValue {
  language: LanguageCode;
  direction: 'rtl' | 'ltr';
  setLanguage: (language: LanguageCode) => void;
  toggleLanguage: () => void;
}

const LanguageContext = createContext<LanguageContextValue>({
  language: 'fa',
  direction: 'rtl',
  setLanguage: () => undefined,
  toggleLanguage: () => undefined,
});

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguageState] = useState<LanguageCode>(() => {
    const storedLanguage = loadStoredLanguage();
    setCurrentLanguage(storedLanguage);
    return storedLanguage;
  });
  const direction = getLanguageDirection(language);

  useEffect(() => {
    applyDocumentLanguage(language);
  }, [language]);

  const setLanguage = useCallback((nextLanguage: LanguageCode) => {
    setCurrentLanguage(nextLanguage);
    persistLanguage(nextLanguage);
    applyDocumentLanguage(nextLanguage);
    setLanguageState(nextLanguage);
  }, []);

  const toggleLanguage = useCallback(() => {
    const currentIndex = LANGUAGE_SEQUENCE.indexOf(language);
    const nextLanguage =
      LANGUAGE_SEQUENCE[(currentIndex + 1) % LANGUAGE_SEQUENCE.length] ?? 'fa';
    setLanguage(nextLanguage);
  }, [language, setLanguage]);

  const value = useMemo(
    () => ({
      language,
      direction,
      setLanguage,
      toggleLanguage,
    }),
    [direction, language, setLanguage, toggleLanguage]
  );

  return (
    <LanguageContext.Provider value={value}>
      <ConfigProvider direction={direction}>
        <div key={language} dir={direction} lang={language}>
          {children}
        </div>
      </ConfigProvider>
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used inside LanguageProvider');
  }
  return context;
};

export const useTranslate = () => {
  const { language } = useLanguage();
  return useMemo(() => t, [language]);
};
