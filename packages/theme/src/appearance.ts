export type ThemeType = 'light' | 'dark';
export type ColorThemeId = 'REFAH' | 'EMERALD' | 'OCEAN' | 'VIOLET' | 'RUBY' | 'AMBER' | 'TEAL' | 'INDIGO' | 'ROSE' | 'GRAPHITE';
export type AppearancePresetId = 'CONTROL_ROOM' | 'DISPATCH' | 'LAPTOP' | 'ACCESSIBLE' | 'MINIMAL';

export interface AppearancePreferences {
  accentIntensity: 'SUBTLE' | 'BALANCED' | 'VIVID';
  borderStyle: 'SOFT' | 'STANDARD' | 'STRONG';
  cardShadow: 'NONE' | 'SOFT' | 'DEEP';
  contentWidth: 'FOCUSED' | 'WIDE' | 'FULL';
  contrastMode: 'STANDARD' | 'HIGH';
  dashboardLayout: 'SPLIT' | 'STACKED';
  dashboardListLimit: 'FEW' | 'STANDARD' | 'MANY';
  density: 'COMFORTABLE' | 'COMPACT';
  fontFamily: 'IRANSANS' | 'VAZIR' | 'SAHEL' | 'SAMIM' | 'SHABNAM' | 'PARASTOO' | 'TANHA' | 'YEKAN' | 'SYSTEM';
  fontScale: 'COMPACT' | 'COMFORTABLE' | 'LARGE';
  fontWeight: 'NORMAL' | 'MEDIUM' | 'BOLD';
  lineHeight: 'COMPACT' | 'COMFORTABLE' | 'SPACIOUS';
  metricColumns: 'AUTO' | 'TWO' | 'THREE' | 'FOUR';
  motion: 'FULL' | 'REDUCED';
  navigationPosition: 'RIGHT' | 'LEFT' | 'TOP' | 'BOTTOM' | 'HIDDEN';
  navigationWidth: 'COMPACT' | 'STANDARD' | 'WIDE';
  radius: 'COMPACT' | 'MODERN' | 'SOFT';
  showDashboardHeader: boolean;
  showDashboardQuickActions: boolean;
  showDashboardMetrics: boolean;
  showDashboardDistribution: boolean;
  showBackgroundPattern: boolean;
  showNavigationLabels: boolean;
  stickyTableHeader: boolean;
  surfaceStyle: 'GLASS' | 'SOLID';
  tableDensity: 'COMPACT' | 'COMFORTABLE' | 'SPACIOUS';
  tableZebra: boolean;
}

export interface ColorThemeDefinition {
  id: ColorThemeId;
  label: string;
  description: string;
  rgb: string;
  colors: Record<50 | 100 | 200 | 300 | 400 | 500 | 600 | 700, string>;
  accent: { 100: string; 300: string; 500: string; 600: string; rgb: string };
}

const single = (id: ColorThemeId, label: string, description: string, rgb: string, colors: ColorThemeDefinition['colors']): ColorThemeDefinition => ({
  id, label, description, rgb, colors,
  accent: { 100: colors[100], 300: colors[300], 500: colors[500], 600: colors[600], rgb },
});

export const COLOR_THEMES: ColorThemeDefinition[] = [
  {
    id: 'REFAH',
    label: 'رفاه',
    description: 'بنفش تا سرخابی هویت بصری بانک رفاه کارگران',
    rgb: '58 21 113',
    colors: {
      50: '#f8f4fc',
      100: '#efe6f8',
      200: '#dcc8f0',
      300: '#c0a0e4',
      400: '#8a5fc8',
      500: '#3a1571',
      600: '#2f115c',
      700: '#220c44',
    },
    accent: {
      100: '#fde2ef',
      300: '#f472b6',
      500: '#e5007d',
      600: '#c4006a',
      rgb: '229 0 125',
    },
  },
  single('EMERALD', 'زمردی', 'شفاف و سازمانی', '5 150 105', { 50: '#ecfdf5', 100: '#d1fae5', 200: '#a7f3d0', 300: '#6ee7b7', 400: '#34d399', 500: '#059669', 600: '#047857', 700: '#065f46' }),
  single('OCEAN', 'اقیانوس', 'آبی روشن و حرفه‌ای', '2 132 199', { 50: '#f0f9ff', 100: '#e0f2fe', 200: '#bae6fd', 300: '#7dd3fc', 400: '#38bdf8', 500: '#0284c7', 600: '#0369a1', 700: '#075985' }),
  single('VIOLET', 'بنفش', 'مدرن و خلاق', '124 58 237', { 50: '#f5f3ff', 100: '#ede9fe', 200: '#ddd6fe', 300: '#c4b5fd', 400: '#a78bfa', 500: '#7c3aed', 600: '#6d28d9', 700: '#5b21b6' }),
  single('RUBY', 'یاقوتی', 'قاطع و پرانرژی', '220 38 38', { 50: '#fef2f2', 100: '#fee2e2', 200: '#fecaca', 300: '#fca5a5', 400: '#f87171', 500: '#dc2626', 600: '#b91c1c', 700: '#991b1b' }),
  single('AMBER', 'کهربایی', 'گرم و رسمی', '217 119 6', { 50: '#fffbeb', 100: '#fef3c7', 200: '#fde68a', 300: '#fcd34d', 400: '#fbbf24', 500: '#d97706', 600: '#b45309', 700: '#92400e' }),
  single('TEAL', 'فیروزه‌ای', 'آرام و متعادل', '15 118 110', { 50: '#f0fdfa', 100: '#ccfbf1', 200: '#99f6e4', 300: '#5eead4', 400: '#2dd4bf', 500: '#0f766e', 600: '#115e59', 700: '#134e4a' }),
  single('INDIGO', 'نیلی', 'دقیق و فناورانه', '79 70 229', { 50: '#eef2ff', 100: '#e0e7ff', 200: '#c7d2fe', 300: '#a5b4fc', 400: '#818cf8', 500: '#4f46e5', 600: '#4338ca', 700: '#3730a3' }),
  single('ROSE', 'رز', 'زنده و دوستانه', '225 29 72', { 50: '#fff1f2', 100: '#ffe4e6', 200: '#fecdd3', 300: '#fda4af', 400: '#fb7185', 500: '#e11d48', 600: '#be123c', 700: '#9f1239' }),
  single('GRAPHITE', 'گرافیتی', 'خنثی و مینیمال', '71 85 105', { 50: '#f8fafc', 100: '#f1f5f9', 200: '#e2e8f0', 300: '#cbd5e1', 400: '#94a3b8', 500: '#475569', 600: '#334155', 700: '#1e293b' }),
];

export const APP_FONT_FAMILIES: Record<AppearancePreferences['fontFamily'], { label: string; css: string }> = {
  IRANSANS: { label: 'ایران‌سنس', css: "'IranSans', 'IRANSansXFaNum', sans-serif" },
  VAZIR: { label: 'وزیر', css: "'Vazir', sans-serif" }, SAHEL: { label: 'ساحل', css: "'Sahel', sans-serif" },
  SAMIM: { label: 'صمیم', css: "'Samim', sans-serif" }, SHABNAM: { label: 'شبنم', css: "'Shabnam', sans-serif" },
  PARASTOO: { label: 'پرستو', css: "'Parastoo', sans-serif" }, TANHA: { label: 'تنها', css: "'Tanha', sans-serif" },
  YEKAN: { label: 'یکان', css: "'Yekan', sans-serif" }, SYSTEM: { label: 'سیستمی', css: "Tahoma, Arial, sans-serif" },
};

export const DEFAULT_APPEARANCE: AppearancePreferences = {
  accentIntensity: 'BALANCED', borderStyle: 'STANDARD', cardShadow: 'SOFT', contentWidth: 'FULL', contrastMode: 'STANDARD', dashboardLayout: 'SPLIT', dashboardListLimit: 'STANDARD', density: 'COMFORTABLE', fontFamily: 'IRANSANS', fontScale: 'COMPACT', fontWeight: 'NORMAL', lineHeight: 'COMFORTABLE', metricColumns: 'AUTO', motion: 'FULL', navigationPosition: 'RIGHT', navigationWidth: 'STANDARD', radius: 'MODERN', showDashboardHeader: true, showDashboardQuickActions: true, showDashboardMetrics: true, showDashboardDistribution: true, showBackgroundPattern: true, showNavigationLabels: true, stickyTableHeader: false, surfaceStyle: 'GLASS', tableDensity: 'COMFORTABLE', tableZebra: true,
};

export const APPEARANCE_PRESETS: Record<AppearancePresetId, { label: string; theme?: ThemeType; patch: Partial<AppearancePreferences> }> = {
  CONTROL_ROOM: { label: 'نمایش گسترده', theme: 'dark', patch: { contentWidth: 'FULL', fontScale: 'LARGE', metricColumns: 'FOUR', showNavigationLabels: false, cardShadow: 'DEEP' } },
  DISPATCH: { label: 'تمرکز بر نمودار', patch: { showDashboardQuickActions: false, dashboardLayout: 'STACKED' } },
  LAPTOP: { label: 'نمایش لپ‌تاپ', patch: { density: 'COMPACT', fontScale: 'COMPACT', contentWidth: 'FOCUSED', metricColumns: 'TWO', showDashboardQuickActions: false } },
  ACCESSIBLE: { label: 'دسترس‌پذیر', patch: { contrastMode: 'HIGH', fontScale: 'LARGE', motion: 'REDUCED', surfaceStyle: 'SOLID', showBackgroundPattern: false, tableDensity: 'SPACIOUS' } },
  MINIMAL: { label: 'مینیمال', patch: { accentIntensity: 'SUBTLE', cardShadow: 'NONE', showBackgroundPattern: false, surfaceStyle: 'SOLID', tableZebra: false } },
};

const enumValue = <T extends string>(value: unknown, allowed: readonly T[], fallback: T): T => allowed.includes(value as T) ? value as T : fallback;
export const mergeAppearance = (value?: Partial<AppearancePreferences>): AppearancePreferences => {
  const v = value ?? {};
  const result = { ...DEFAULT_APPEARANCE } as AppearancePreferences;
  const enums: Partial<Record<keyof AppearancePreferences, readonly string[]>> = {
    accentIntensity: ['SUBTLE', 'BALANCED', 'VIVID'], borderStyle: ['SOFT', 'STANDARD', 'STRONG'], cardShadow: ['NONE', 'SOFT', 'DEEP'], contentWidth: ['FOCUSED', 'WIDE', 'FULL'], contrastMode: ['STANDARD', 'HIGH'], dashboardLayout: ['SPLIT', 'STACKED'], dashboardListLimit: ['FEW', 'STANDARD', 'MANY'], density: ['COMFORTABLE', 'COMPACT'], fontFamily: Object.keys(APP_FONT_FAMILIES), fontScale: ['COMPACT', 'COMFORTABLE', 'LARGE'], fontWeight: ['NORMAL', 'MEDIUM', 'BOLD'], lineHeight: ['COMPACT', 'COMFORTABLE', 'SPACIOUS'], metricColumns: ['AUTO', 'TWO', 'THREE', 'FOUR'], motion: ['FULL', 'REDUCED'], navigationPosition: ['RIGHT', 'LEFT', 'TOP', 'BOTTOM', 'HIDDEN'], navigationWidth: ['COMPACT', 'STANDARD', 'WIDE'], radius: ['COMPACT', 'MODERN', 'SOFT'], surfaceStyle: ['GLASS', 'SOLID'], tableDensity: ['COMPACT', 'COMFORTABLE', 'SPACIOUS'],
  };
  Object.entries(enums).forEach(([key, allowed]) => { const k = key as keyof AppearancePreferences; (result as any)[k] = enumValue((v as any)[k], allowed!, (DEFAULT_APPEARANCE as any)[k]); });
  (Object.keys(DEFAULT_APPEARANCE) as (keyof AppearancePreferences)[]).forEach((key) => { if (typeof DEFAULT_APPEARANCE[key] === 'boolean') (result as any)[key] = typeof v[key] === 'boolean' ? v[key] : DEFAULT_APPEARANCE[key]; });
  return result;
};
