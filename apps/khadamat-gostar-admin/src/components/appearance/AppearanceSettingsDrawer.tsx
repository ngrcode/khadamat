'use client';

import { CheckOutlined, ReloadOutlined, SettingOutlined } from '@ant-design/icons';
import { Button, Drawer, Segmented, Select, Tooltip, Typography } from 'antd';
import { useState } from 'react';
import { APP_FONT_FAMILIES, COLOR_THEMES, useTheme } from '@repo/theme';
import type { AppearancePreferences, ColorThemeId, ThemeType } from '@repo/theme';

const { Text, Title } = Typography;
const options = <T extends string>(items: readonly [T, string][]) =>
  items.map(([value, label]) => ({ value, label }));

function SettingBlock({
  title,
  hint,
  children,
}: {
  title: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="admin-appearance-section">
      <Text strong className="!block !text-[var(--portal-ink)]">{title}</Text>
      {hint && <Text className="!mt-1 !block !text-xs !text-[var(--portal-muted)]">{hint}</Text>}
      <div className="mt-3">{children}</div>
    </section>
  );
}

export default function AppearanceSettingsDrawer() {
  const [open, setOpen] = useState(false);
  const {
    theme,
    setTheme,
    colorTheme,
    setColorTheme,
    appearance,
    updateAppearance,
    resetAppearance,
    palette,
  } = useTheme();

  const update = <K extends keyof AppearancePreferences>(
    key: K,
    value: AppearancePreferences[K],
  ) => updateAppearance({ [key]: value } as Pick<AppearancePreferences, K>);

  return (
    <>
      <Tooltip title="شخصی‌سازی ظاهر داشبورد">
        <button
          type="button"
          className="portal-control-icon admin-appearance-trigger"
          aria-label="شخصی‌سازی ظاهر داشبورد"
          onClick={() => setOpen(true)}
        >
          <SettingOutlined />
        </button>
      </Tooltip>

      <Drawer
        title="شخصی‌سازی ظاهر داشبورد"
        placement="left"
        width={420}
        open={open}
        onClose={() => setOpen(false)}
        styles={{ body: { padding: 16, background: 'var(--portal-page-bg)' } }}
      >
        <div dir="rtl" className="space-y-4">
          <div className="admin-appearance-preview">
            <div className="mb-4 h-2 rounded-full" style={{ background: 'var(--brand-gradient)' }} />
            <div className="flex items-center justify-between gap-3">
              <div>
                <Title level={5} className="!m-0 !text-[var(--portal-ink)]">پیش‌نمایش زنده</Title>
                <Text className="!text-[var(--portal-muted)]">ظاهر پنل خدمات گستر</Text>
              </div>
              <span className="rounded-full px-3 py-1 text-xs text-white" style={{ background: palette.colors[500] }}>
                {palette.label}
              </span>
            </div>
            <div className="mt-4 flex gap-2 text-xs">
              <span className="rounded-lg bg-[var(--portal-soft)] px-3 py-2">
                {APP_FONT_FAMILIES[appearance.fontFamily].label} ۱۲۳۴۵
              </span>
              <span className="rounded-lg bg-[var(--portal-soft)] px-3 py-2">
                {theme === 'dark' ? 'تیره' : 'روشن'}
              </span>
            </div>
          </div>

          <SettingBlock title="حالت نمایش">
            <Segmented
              block
              value={theme}
              onChange={(value) => setTheme(value as ThemeType)}
              options={options([['light', 'روشن'], ['dark', 'تیره']])}
            />
          </SettingBlock>

          <SettingBlock title="پالت رنگی" hint="روی نوبار، کارت‌ها، دکمه‌ها و نمودارها اعمال می‌شود.">
            <div className="grid grid-cols-5 gap-3">
              {COLOR_THEMES.map((item) => (
                <Tooltip key={item.id} title={`${item.label} — ${item.description}`}>
                  <button
                    type="button"
                    aria-label={item.label}
                    onClick={() => setColorTheme(item.id as ColorThemeId)}
                    className="relative aspect-square rounded-xl border-2 transition-transform hover:scale-105"
                    style={{
                      background: `linear-gradient(135deg, ${item.colors[500]}, ${item.accent[500]})`,
                      borderColor: colorTheme === item.id ? 'var(--portal-ink)' : 'transparent',
                    }}
                  >
                    {colorTheme === item.id && <CheckOutlined className="text-white" />}
                  </button>
                </Tooltip>
              ))}
            </div>
          </SettingBlock>

          <SettingBlock title="فونت داشبورد" hint="نام و نمونه واقعی هر فونت را انتخاب کنید.">
            <div className="mb-3 flex items-center justify-between rounded-xl bg-[var(--portal-soft)] px-3 py-2">
              <Text className="!text-xs !text-[var(--portal-muted)]">فونت انتخاب‌شده</Text>
              <Text strong className="!text-[var(--color-primary)]">{APP_FONT_FAMILIES[appearance.fontFamily].label}</Text>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {Object.entries(APP_FONT_FAMILIES).map(([id, font]) => {
                const selected = appearance.fontFamily === id;
                return (
                  <button
                    key={id}
                    type="button"
                    aria-pressed={selected}
                    onClick={() => update('fontFamily', id as AppearancePreferences['fontFamily'])}
                    className={`admin-font-option ${selected ? 'is-selected' : ''}`}
                    style={{ '--app-font-family': font.css } as React.CSSProperties}
                  >
                    <span className="block text-sm font-bold">{font.label}</span>
                    <span className="mt-1 block text-xs opacity-70">نمونه متن ۱۲۳۴۵</span>
                    {selected && <CheckOutlined className="admin-font-option-check" />}
                  </button>
                );
              })}
            </div>
            <div className="mt-3 space-y-3">
              <Segmented block value={appearance.fontScale} onChange={(value) => update('fontScale', value as AppearancePreferences['fontScale'])} options={options([['COMPACT', '۱۴'], ['COMFORTABLE', '۱۶'], ['LARGE', '۱۷']])} />
              <Segmented block value={appearance.fontWeight} onChange={(value) => update('fontWeight', value as AppearancePreferences['fontWeight'])} options={options([['NORMAL', 'معمولی'], ['MEDIUM', 'متوسط'], ['BOLD', 'ضخیم']])} />
              <Segmented block value={appearance.density} onChange={(value) => update('density', value as AppearancePreferences['density'])} options={options([['COMPACT', 'فشرده'], ['COMFORTABLE', 'راحت']])} />
            </div>
          </SettingBlock>

          <SettingBlock title="کارت‌ها و جلوه‌ها">
            <div className="space-y-3">
              <Select className="w-full" value={appearance.radius} onChange={(value) => update('radius', value)} options={options([['COMPACT', 'گوشه کم'], ['MODERN', 'مدرن'], ['SOFT', 'نرم']])} />
              <Select className="w-full" value={appearance.cardShadow} onChange={(value) => update('cardShadow', value)} options={options([['NONE', 'بدون سایه'], ['SOFT', 'سایه نرم'], ['DEEP', 'سایه عمیق']])} />
              <Select className="w-full" value={appearance.accentIntensity} onChange={(value) => update('accentIntensity', value)} options={options([['SUBTLE', 'رنگ ملایم'], ['BALANCED', 'رنگ متعادل'], ['VIVID', 'رنگ زنده']])} />
              <Segmented block value={appearance.surfaceStyle} onChange={(value) => update('surfaceStyle', value as AppearancePreferences['surfaceStyle'])} options={options([['GLASS', 'شیشه‌ای'], ['SOLID', 'یکدست']])} />
              <Segmented block value={appearance.motion} onChange={(value) => update('motion', value as AppearancePreferences['motion'])} options={options([['FULL', 'حرکت کامل'], ['REDUCED', 'حرکت کمتر']])} />
            </div>
          </SettingBlock>

          <Button danger block size="large" icon={<ReloadOutlined />} onClick={resetAppearance}>
            بازگردانی ظاهر پیش‌فرض
          </Button>
        </div>
      </Drawer>
    </>
  );
}
