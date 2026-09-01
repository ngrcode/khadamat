import { beforeEach, describe, expect, it } from 'vitest';

import {
  applyDocumentLanguage,
  getCurrentLanguage,
  getLanguageDirection,
  LANGUAGE_STORAGE_KEY,
  loadStoredLanguage,
  persistLanguage,
  setCurrentLanguage,
  t,
} from '@/configs/language';

describe('language helpers', () => {
  beforeEach(() => {
    window.localStorage.clear();
    document.documentElement.removeAttribute('lang');
    document.documentElement.removeAttribute('dir');
    document.body.removeAttribute('dir');
    document.body.classList.remove('lang-fa', 'lang-en');
    setCurrentLanguage('fa');
  });

  it('tracks current language and direction', () => {
    expect(getCurrentLanguage()).toBe('fa');
    expect(getLanguageDirection('fa')).toBe('rtl');
    expect(getLanguageDirection('en')).toBe('ltr');

    setCurrentLanguage('en');

    expect(getCurrentLanguage()).toBe('en');
    expect(t('offlineMessage')).toBe(
      'You are offline. Please check your internet connection.'
    );
  });

  it('loads, persists, and applies document language settings', () => {
    persistLanguage('en');

    expect(window.localStorage.getItem(LANGUAGE_STORAGE_KEY)).toBe('en');
    expect(loadStoredLanguage()).toBe('en');

    applyDocumentLanguage('en');

    expect(document.documentElement.lang).toBe('en');
    expect(document.documentElement.dir).toBe('ltr');
    expect(document.body.dir).toBe('ltr');
    expect(document.body).toHaveClass('lang-en');
    expect(document.body).not.toHaveClass('lang-fa');
  });

  it('keeps the current language for invalid stored values', () => {
    window.localStorage.setItem(LANGUAGE_STORAGE_KEY, 'de');

    expect(loadStoredLanguage()).toBe('fa');
  });

  it('replaces translation variables and returns the key for unknown labels', () => {
    expect(t('maxLength', { max: 12 })).toContain('12');
    expect(t('missingLabel' as never)).toBe('missingLabel');
  });
});
