'use client';

import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import { ConfigProvider, theme as antdTheme } from 'antd';
import {
  APPEARANCE_PRESETS,
  APP_FONT_FAMILIES,
  COLOR_THEMES,
  DEFAULT_APPEARANCE,
  mergeAppearance,
} from './appearance';
import type {
  AppearancePreferences,
  AppearancePresetId,
  ColorThemeDefinition,
  ColorThemeId,
  ThemeType,
} from './appearance';

export type ColorThemeKey = ColorThemeId;
export type DensityKey = 'compact' | 'comfortable' | 'spacious';
export type ContrastKey = 'normal' | 'high';
export type ContentWidthKey = 'fluid' | 'boxed';
export type ColorThemePreset = Omit<ColorThemeDefinition, 'accent'> & {
  key: ColorThemeId;
  labelKey: string;
  primary: string;
  primaryRgb: string;
  accent: string;
};

interface ThemeContextType {
  theme: ThemeType;
  colorTheme: ColorThemeId;
  appearance: AppearancePreferences;
  palette: ColorThemeDefinition;
  setTheme: (theme: ThemeType) => void;
  toggleTheme: () => void;
  setColorTheme: (id: ColorThemeId) => void;
  updateAppearance: (patch: Partial<AppearancePreferences>) => void;
  applyPreset: (id: AppearancePresetId) => void;
  resetAppearance: () => void;
  colorThemes: ColorThemePreset[];
  fontSize: number;
  density: DensityKey;
  radius: number;
  contrast: ContrastKey;
  reduceMotion: boolean;
  contentWidth: ContentWidthKey;
  setThemeMode: (theme: ThemeType) => void;
  setFontSize: (n: number) => void;
  setDensity: (v: DensityKey) => void;
  setRadius: (n: number) => void;
  setContrast: (v: ContrastKey) => void;
  setReduceMotion: (v: boolean) => void;
  setContentWidth: (v: ContentWidthKey) => void;
  resetThemePreferences: () => void;
}

const STORAGE_KEY = 'khadamat-appearance-v3';

const legacyPalettes: ColorThemePreset[] = COLOR_THEMES.map((item) => ({
  ...item,
  key: item.id,
  labelKey: `theme${item.id}`,
  primary: item.colors[500],
  primaryRgb: item.rgb.replaceAll(' ', ', '),
  accent: item.accent[500],
}));

const initialPalette = COLOR_THEMES[0]!;

export const COLOR_THEME_PRESETS = legacyPalettes;

export const ThemeContext = createContext<ThemeContextType>({
  theme: 'light',
  colorTheme: 'REFAH',
  appearance: DEFAULT_APPEARANCE,
  palette: initialPalette,
  setTheme: () => {},
  toggleTheme: () => {},
  setColorTheme: () => {},
  updateAppearance: () => {},
  applyPreset: () => {},
  resetAppearance: () => {},
  colorThemes: legacyPalettes,
  fontSize: 14,
  density: 'comfortable',
  radius: 8,
  contrast: 'normal',
  reduceMotion: false,
  contentWidth: 'fluid',
  setThemeMode: () => {},
  setFontSize: () => {},
  setDensity: () => {},
  setRadius: () => {},
  setContrast: () => {},
  setReduceMotion: () => {},
  setContentWidth: () => {},
  resetThemePreferences: () => {},
});

const rgb = (value: string) => value.replaceAll(' ', ', ');

const applyDom = (
  theme: ThemeType,
  palette: ColorThemeDefinition,
  appearance: AppearancePreferences,
) => {
  const root = document.documentElement;
  const body = document.body;
  const isDark = theme === 'dark';
  const primaryRgb = rgb(palette.rgb);
  const accentRgb = rgb(palette.accent.rgb);

  const data: Record<string, string> = {
    theme,
    colorTheme: palette.id,
    ...Object.fromEntries(
      Object.entries(appearance).map(([k, v]) => [k, String(v)]),
    ),
  };
  Object.entries(data).forEach(([key, value]) => {
    root.dataset[key] = value;
  });

  body.classList.toggle('dark', isDark);
  body.classList.toggle('light', !isDark);

  const set = (name: string, value: string) => root.style.setProperty(name, value);

  set('--brand-rgb', palette.rgb);
  ([50, 100, 200, 300, 400, 500, 600, 700] as const).forEach((tone) =>
    set(`--brand-${tone}`, palette.colors[tone]),
  );
  set('--brand-accent-100', palette.accent[100]);
  set('--brand-accent-300', palette.accent[300]);
  set('--brand-accent-500', palette.accent[500]);
  set('--brand-accent-600', palette.accent[600]);
  set('--brand-accent-rgb', palette.accent.rgb);
  set('--brand-action', isDark ? palette.colors[200] : palette.colors[500]);
  set('--brand-ink', isDark ? palette.colors[200] : palette.colors[600]);
  set('--brand-ink-strong', isDark ? palette.colors[100] : palette.colors[700]);
  set('--brand-plot-1', palette.colors[500]);
  set('--brand-plot-2', palette.accent[500]);
  set('--brand-plot-3', palette.colors[300]);
  set('--brand-plot-4', palette.accent[300]);
  set('--brand-plot-5', palette.colors[700]);
  set(
    '--brand-gradient',
    `linear-gradient(135deg, ${palette.colors[500]} 0%, ${palette.accent[500]} 100%)`,
  );
  set(
    '--brand-gradient-soft',
    `linear-gradient(135deg, rgba(${primaryRgb}, 0.92), rgba(${accentRgb}, 0.88))`,
  );
  set(
    '--brand-gradient-vertical',
    `linear-gradient(180deg, ${palette.colors[400]} 0%, ${palette.colors[500]} 48%, ${palette.accent[500]} 100%)`,
  );
  set(
    '--brand-gradient-horizontal',
    `linear-gradient(90deg, ${palette.colors[700]} 0%, ${palette.colors[500]} 45%, ${palette.accent[500]} 100%)`,
  );

  const fontSizes = { COMPACT: 14, COMFORTABLE: 16, LARGE: 17 };
  const weights = { NORMAL: 400, MEDIUM: 500, BOLD: 600 };
  const lines = { COMPACT: 1.45, COMFORTABLE: 1.65, SPACIOUS: 1.9 };
  const radii = { COMPACT: 6, MODERN: 10, SOFT: 16 };
  const borders = { SOFT: 1, STANDARD: 1, STRONG: 2 };

  set('--app-font-family', APP_FONT_FAMILIES[appearance.fontFamily].css);
  body.style.setProperty('--app-font-family', APP_FONT_FAMILIES[appearance.fontFamily].css);
  set('--app-font-size', `${fontSizes[appearance.fontScale]}px`);
  set('--app-font-weight', String(weights[appearance.fontWeight]));
  set('--app-line-height', String(lines[appearance.lineHeight]));
  set('--ui-border-width', `${borders[appearance.borderStyle]}px`);
  set('--ui-card-radius', `${radii[appearance.radius]}px`);
  set('--ui-control-radius', `${Math.max(6, radii[appearance.radius] - 2)}px`);
  set('--ui-card-padding', appearance.density === 'COMPACT' ? '12px' : '18px');

  set('--color-primary', palette.colors[500]);
  set('--color-primary-rgb', primaryRgb);
  set('--color-accent', palette.accent[500]);
  set('--color-accent-rgb', accentRgb);

  // Readable semantic tokens for all surfaces (high contrast)
  set('--portal-ink', isDark ? '#f4f7fb' : '#111827');
  set('--portal-muted', isDark ? '#d5deea' : '#3f4b5b');
  set('--portal-subtle', isDark ? '#a9b6c8' : '#64748b');
  set('--portal-icon', isDark ? palette.colors[200] : palette.colors[700]);
  set('--portal-icon-strong', isDark ? palette.colors[100] : palette.colors[700]);
  set('--portal-link', isDark ? palette.colors[200] : palette.colors[700]);
  set('--portal-on-brand', '#ffffff');
  set('--portal-on-brand-muted', 'rgba(255, 255, 255, 0.92)');
  set('--portal-page-bg', isDark ? '#0c111a' : '#f3f5f8');
  set('--portal-page-tint', 'transparent');
  set(
    '--portal-topbar-bg',
    isDark
      ? 'linear-gradient(135deg, rgba(22, 30, 45, 0.94), rgba(16, 22, 34, 0.96))'
      : 'linear-gradient(135deg, rgba(255,255,255,0.96), rgba(255,255,255,0.9))',
  );
  set(
    '--portal-topbar-border',
    isDark ? 'rgba(148, 163, 184, 0.16)' : 'rgba(15, 23, 42, 0.08)',
  );
  set(
    '--portal-control-bg',
    isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(255, 255, 255, 0.92)',
  );
  set(
    '--portal-control-border',
    isDark ? 'rgba(148, 163, 184, 0.18)' : 'rgba(15, 23, 42, 0.1)',
  );
  set('--portal-control-text', isDark ? '#f1f5f9' : '#111827');
  set('--portal-card-bg', isDark ? '#151c2a' : '#ffffff');
  set(
    '--portal-card-border',
    isDark ? 'rgba(148, 163, 184, 0.14)' : 'rgba(15, 23, 42, 0.08)',
  );
  set(
    '--portal-soft-surface',
    isDark ? `rgba(${primaryRgb}, 0.22)` : `rgba(${primaryRgb}, 0.08)`,
  );
  set(
    '--portal-soft-hover',
    isDark ? `rgba(${primaryRgb}, 0.3)` : `rgba(${primaryRgb}, 0.12)`,
  );
  set('--portal-bubble', isDark ? 'rgba(255, 255, 255, 0.05)' : '#eef2f7');
  set(
    '--portal-bubble-own',
    isDark ? `rgba(${accentRgb}, 0.18)` : `rgba(${accentRgb}, 0.1)`,
  );
  set(
    '--portal-bubble-own-border',
    isDark ? `rgba(${accentRgb}, 0.42)` : `rgba(${accentRgb}, 0.28)`,
  );
  set(
    '--portal-shadow',
    isDark
      ? '0 16px 40px rgba(0, 0, 0, 0.42)'
      : '0 12px 30px rgba(15, 23, 42, 0.06)',
  );
  set('--portal-radius', `${radii[appearance.radius] + 4}px`);
  set(
    '--portal-mode-track',
    isDark ? 'rgba(255,255,255,0.06)' : 'rgba(15, 23, 42, 0.06)',
  );
  set(
    '--portal-mode-active',
    isDark
      ? `linear-gradient(135deg, ${palette.colors[400]}, ${palette.accent[500]})`
      : `linear-gradient(135deg, ${palette.colors[500]}, ${palette.accent[500]})`,
  );

  set('--background-start-rgb', isDark ? '12, 17, 26' : '243, 245, 248');
  set('--background-end-rgb', isDark ? '12, 17, 26' : '243, 245, 248');
  set('--foreground-rgb', isDark ? '244, 247, 251' : '17, 24, 39');
  set('--app-surface', isDark ? '#151c2a' : '#ffffff');
  set('--app-surface-alt', isDark ? '#0c111a' : '#f3f5f8');
  set(
    '--app-card-bg',
    isDark ? 'rgba(15,23,42,.92)' : 'rgba(255,255,255,.94)',
  );
  set('--sider-bg', isDark ? '#0f172a' : 'rgba(255,255,255,.98)');
  set(
    '--ant-layout-header',
    isDark
      ? `linear-gradient(100deg, ${palette.colors[700]}, #0f172a)`
      : `linear-gradient(105deg, #ffffff 0%, ${palette.colors[50]} 58%, ${palette.accent[100]} 145%)`,
  );
  set(
    '--ant-table-hover-bg',
    `rgb(${palette.rgb} / ${isDark ? '.18' : '.08'})`,
  );
  set('--table-row-odd-bg', isDark ? '#0f172a' : '#fff');
  set(
    '--table-row-even-bg',
    isDark ? `rgb(${palette.rgb} / .08)` : palette.colors[50],
  );
  set(
    '--table-border-color',
    `rgb(${palette.rgb} / ${appearance.contrastMode === 'HIGH' ? '.45' : '.16'})`,
  );
  set(
    '--app-card-border',
    `rgb(${palette.rgb} / ${appearance.contrastMode === 'HIGH' ? '.45' : '.14'})`,
  );
  set(
    '--glass-shadow',
    appearance.cardShadow === 'NONE'
      ? 'none'
      : appearance.cardShadow === 'DEEP'
        ? `0 22px 55px rgb(${palette.rgb} / .18)`
        : `0 8px 24px rgb(${palette.rgb} / .08)`,
  );
  set('--app-text', isDark ? '#f1f5f9' : '#111827');
  set('--muted-foreground-rgb', isDark ? '203, 213, 225' : '100, 116, 139');
  set('--app-header-control-color', isDark ? '#f8fafc' : palette.colors[700]);
  set(
    '--app-header-control-bg',
    isDark ? 'rgba(255,255,255,.08)' : `rgb(${palette.rgb} / .07)`,
  );
  set(
    '--app-header-control-hover',
    isDark ? 'rgba(255,255,255,.15)' : `rgb(${palette.rgb} / .13)`,
  );
  set('--color-menu-text', isDark ? '#f8fafc' : '#1f2937');
  set('--color-menu-muted', isDark ? '#cbd5e1' : '#64748b');
  set('--color-menu-bg', isDark ? '#0f172a' : '#ffffff');
  set(
    '--color-menu-submenu-bg',
    isDark ? `rgb(${palette.rgb} / .12)` : palette.colors[50],
  );
  set('--color-menu-submenu-border', `rgb(${palette.rgb} / .18)`);
  set('--color-menu-primary', isDark ? palette.colors[200] : palette.colors[500]);
  set('--color-menu-accent', isDark ? palette.accent[300] : palette.accent[500]);
  set('--color-menu-gold', isDark ? palette.accent[300] : palette.accent[500]);
  set('--ant-table-bg', isDark ? '#0f172a' : '#ffffff');
  set(
    '--ant-table-thead-bg',
    isDark ? `rgb(${palette.rgb} / .18)` : palette.colors[50],
  );
  set('--ant-table-thead-color', isDark ? '#f8fafc' : '#0f172a');
  set('--ant-input', isDark ? '#0f172a' : '#ffffff');
  set('--ant-input-outlined', isDark ? '#0f172a' : '#ffffff');
  set('--ant-input-affix-wrapper', isDark ? '#0f172a' : '#ffffff');
  set('--ant-picker', isDark ? '#0f172a' : '#ffffff');
  set('--form-label-color', isDark ? '241, 245, 249' : '31, 41, 55');
  set('--input-border', isDark ? 'rgba(148, 163, 184, 0.45)' : 'rgba(217, 217, 217, 0.5)');
  set('--ant-picker-border', isDark ? 'rgba(148, 163, 184, 0.45)' : 'rgba(217, 217, 217, 0.5)');
  set(
    '--glass-border',
    `${appearance.borderStyle === 'STRONG' ? 2 : 1}px solid rgb(${palette.rgb} / ${isDark ? '.28' : '.12'})`,
  );

  root.style.colorScheme = theme;
  root.style.backgroundColor = isDark ? '#0c111a' : '#f3f5f8';
  body.style.backgroundColor = isDark ? '#0c111a' : '#f3f5f8';
  body.style.color = isDark ? '#f4f7fb' : '#111827';
};

export default function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<ThemeType>('light');
  const [colorTheme, setColorTheme] = useState<ColorThemeId>('REFAH');
  const [appearance, setAppearance] = useState(DEFAULT_APPEARANCE);
  const [hydrated, setHydrated] = useState(false);
  const palette = COLOR_THEMES.find((item) => item.id === colorTheme) ?? initialPalette;

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const saved = JSON.parse(raw);
        setTheme(saved.theme === 'dark' ? 'dark' : 'light');
        setColorTheme(
          COLOR_THEMES.some((p) => p.id === saved.colorTheme)
            ? saved.colorTheme
            : 'REFAH',
        );
        setAppearance(mergeAppearance(saved.appearance));
      }
    } finally {
      setHydrated(true);
    }
  }, []);

  useEffect(() => {
    applyDom(theme, palette, appearance);
    if (hydrated) {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ theme, colorTheme, appearance }),
      );
    }
  }, [appearance, colorTheme, hydrated, palette, theme]);

  const updateAppearance = (patch: Partial<AppearancePreferences>) =>
    setAppearance((prev) => mergeAppearance({ ...prev, ...patch }));

  const value = useMemo<ThemeContextType>(
    () => ({
      theme,
      colorTheme,
      appearance,
      palette,
      setTheme,
      toggleTheme: () => setTheme((v) => (v === 'light' ? 'dark' : 'light')),
      setColorTheme,
      updateAppearance,
      applyPreset: (id) => {
        const preset = APPEARANCE_PRESETS[id];
        if (preset.theme) setTheme(preset.theme);
        updateAppearance(preset.patch);
      },
      resetAppearance: () => {
        setTheme('light');
        setColorTheme('REFAH');
        setAppearance(DEFAULT_APPEARANCE);
      },
      colorThemes: legacyPalettes,
      fontSize: { COMPACT: 14, COMFORTABLE: 16, LARGE: 17 }[appearance.fontScale],
      density: appearance.density === 'COMPACT' ? 'compact' : 'comfortable',
      radius: { COMPACT: 6, MODERN: 10, SOFT: 16 }[appearance.radius],
      contrast: appearance.contrastMode === 'HIGH' ? 'high' : 'normal',
      reduceMotion: appearance.motion === 'REDUCED',
      contentWidth: appearance.contentWidth === 'FOCUSED' ? 'boxed' : 'fluid',
      setThemeMode: setTheme,
      setFontSize: (n) =>
        updateAppearance({
          fontScale: n >= 17 ? 'LARGE' : n >= 16 ? 'COMFORTABLE' : 'COMPACT',
        }),
      setDensity: (v) =>
        updateAppearance({ density: v === 'compact' ? 'COMPACT' : 'COMFORTABLE' }),
      setRadius: (n) =>
        updateAppearance({
          radius: n >= 14 ? 'SOFT' : n <= 7 ? 'COMPACT' : 'MODERN',
        }),
      setContrast: (v) =>
        updateAppearance({ contrastMode: v === 'high' ? 'HIGH' : 'STANDARD' }),
      setReduceMotion: (v) =>
        updateAppearance({ motion: v ? 'REDUCED' : 'FULL' }),
      setContentWidth: (v) =>
        updateAppearance({ contentWidth: v === 'boxed' ? 'FOCUSED' : 'FULL' }),
      resetThemePreferences: () => {
        setTheme('light');
        setColorTheme('REFAH');
        setAppearance(DEFAULT_APPEARANCE);
      },
    }),
    [appearance, colorTheme, palette, theme],
  );

  const radius = { COMPACT: 6, MODERN: 10, SOFT: 16 }[appearance.radius];
  const controlHeight = appearance.density === 'COMPACT' ? 32 : 40;

  return (
    <ThemeContext.Provider value={value}>
      <ConfigProvider
        theme={{
          algorithm: isDarkAlgorithm(theme),
          token: {
            colorPrimary: palette.colors[500],
            colorInfo: palette.colors[500],
            colorLink: theme === 'dark' ? palette.colors[200] : palette.colors[600],
            colorText: theme === 'dark' ? '#f8fafc' : '#0f172a',
            colorTextSecondary: theme === 'dark' ? '#cbd5e1' : '#475569',
            colorBgBase: theme === 'dark' ? '#0f172a' : '#ffffff',
            colorBgContainer: theme === 'dark' ? '#0f172a' : '#ffffff',
            borderRadius: radius,
            controlHeight,
            fontFamily: APP_FONT_FAMILIES[appearance.fontFamily].css,
            colorBorder:
              appearance.contrastMode === 'HIGH'
                ? palette.colors[500]
                : theme === 'dark'
                  ? 'rgba(148, 163, 184, 0.45)'
                  : 'rgba(100, 116, 139, 0.55)',
            colorBorderSecondary:
              theme === 'dark'
                ? 'rgba(148, 163, 184, 0.28)'
                : 'rgba(148, 163, 184, 0.45)',
          },
          components: {
            Menu: {
              itemColor: theme === 'dark' ? '#f8fafc' : '#1f2937',
              itemHoverColor: theme === 'dark' ? '#ffffff' : palette.colors[700],
              itemSelectedColor: '#ffffff',
              itemSelectedBg: palette.colors[500],
              itemHoverBg:
                theme === 'dark'
                  ? `rgba(${rgb(palette.rgb)}, 0.22)`
                  : `rgba(${rgb(palette.rgb)}, 0.1)`,
              iconSize: 16,
            },
            Typography: {
              colorText: theme === 'dark' ? '#f8fafc' : '#0f172a',
              colorTextSecondary: theme === 'dark' ? '#cbd5e1' : '#475569',
            },
            Segmented: {
              itemSelectedBg: palette.colors[500],
              itemSelectedColor: '#ffffff',
              trackBg:
                theme === 'dark'
                  ? 'rgba(15, 23, 42, 0.8)'
                  : 'rgba(255, 255, 255, 0.8)',
            },
            Table: {
              cellPaddingBlock:
                appearance.tableDensity === 'COMPACT'
                  ? 7
                  : appearance.tableDensity === 'SPACIOUS'
                    ? 17
                    : 12,
              cellPaddingInline:
                appearance.tableDensity === 'COMPACT'
                  ? 10
                  : appearance.tableDensity === 'SPACIOUS'
                    ? 18
                    : 14,
              headerBg:
                theme === 'dark'
                  ? `rgb(${palette.rgb} / .18)`
                  : palette.colors[50],
              rowHoverBg: `rgb(${palette.rgb} / ${theme === 'dark' ? '.18' : '.08'})`,
            },
          },
        }}
      >
        {children}
      </ConfigProvider>
    </ThemeContext.Provider>
  );
}

function isDarkAlgorithm(theme: ThemeType) {
  return theme === 'dark' ? antdTheme.darkAlgorithm : antdTheme.defaultAlgorithm;
}

export const useTheme = () => useContext(ThemeContext);
export { APPEARANCE_PRESETS, APP_FONT_FAMILIES, COLOR_THEMES } from './appearance';
export type {
  AppearancePreferences,
  AppearancePresetId,
  ColorThemeDefinition,
  ColorThemeId,
  ThemeType,
} from './appearance';
