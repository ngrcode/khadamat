import type { ThemeConfig } from 'antd';

export {
  COLOR_THEME_PRESETS,
  ThemeContext,
  useTheme,
  default as ThemeProvider,
} from './ThemeProvider';

export type {
  ThemeType,
  ColorThemeKey,
  DensityKey,
  ContrastKey,
  ContentWidthKey,
  ColorThemePreset,
} from './ThemeProvider';

export { APPEARANCE_PRESETS, APP_FONT_FAMILIES, COLOR_THEMES, DEFAULT_APPEARANCE, mergeAppearance } from './appearance';
export type { AppearancePreferences, AppearancePresetId, ColorThemeDefinition, ColorThemeId } from './appearance';

export function createAntdTheme(options?: {
  colorPrimary?: string;
  fontFamily?: string;
  borderRadius?: number;
  direction?: 'rtl' | 'ltr';
}): ThemeConfig {
  return {
    token: {
      colorPrimary: options?.colorPrimary ?? '#3a1571',
      fontFamily:
        options?.fontFamily ?? 'IranSans, IRANSansXFaNum, Arial, sans-serif',
      borderRadius: options?.borderRadius ?? 8,
    },
    ...(options?.direction ? { cssVar: true } : {}),
  };
}
