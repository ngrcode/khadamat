'use client';

import { CheckOutlined, ReloadOutlined, SettingOutlined } from '@ant-design/icons';
import { Button, Drawer, Segmented, Select, Switch, Tooltip, Typography } from 'antd';
import { useState } from 'react';
import { APPEARANCE_PRESETS, APP_FONT_FAMILIES, COLOR_THEMES } from '@repo/theme';
import type { AppearancePreferences, AppearancePresetId, ColorThemeId } from '@repo/theme';
import { useTheme } from '@/contexts/app/themeContext';
import { ThemeModeToggle } from '@repo/ui';

const { Text, Title } = Typography;

const options = <T extends string>(items: readonly [T, string][]) => items.map(([value, label]) => ({ value, label }));

function SettingBlock({ title, hint, children }: { title: string; hint?: string; children: React.ReactNode }) {
  return (
    <section className="rounded-2xl border border-[var(--app-card-border)] bg-[var(--app-card-bg)] p-4">
      <Text strong className="!block !text-[var(--app-text)]">{title}</Text>
      {hint && <Text type="secondary" className="!mb-3 !mt-1 !block !text-xs">{hint}</Text>}
      <div className="mt-3">{children}</div>
    </section>
  );
}

function ToggleRow({ label, checked, onChange }: { label: string; checked: boolean; onChange: (checked: boolean) => void }) {
  return <div className="flex items-center justify-between gap-4 py-2"><Text>{label}</Text><Switch checked={checked} onChange={onChange} /></div>;
}

export default function AppearanceSettingsDrawer() {
  const [open, setOpen] = useState(false);
  const { theme, colorTheme, setColorTheme, appearance, updateAppearance, applyPreset, resetAppearance, palette } = useTheme();
  const update = <K extends keyof AppearancePreferences>(key: K, value: AppearancePreferences[K]) => updateAppearance({ [key]: value } as Pick<AppearancePreferences, K>);

  return (
    <>
      <Tooltip title="شخصی‌سازی ظاهر">
        <Button type="text" shape="circle" className="app-header-icon-button" aria-label="شخصی‌سازی ظاهر" icon={<SettingOutlined style={{ fontSize: 19 }} />} onClick={() => setOpen(true)} />
      </Tooltip>
      <Drawer title="شخصی‌سازی ظاهر داشبورد" placement="left" width={420} open={open} onClose={() => setOpen(false)} styles={{ body: { padding: 16, background: 'var(--app-surface-alt)' } }}>
        <div dir="rtl" className="space-y-4">
          <div className="visual-surface overflow-hidden !p-4">
            <div className="mb-4 h-2 rounded-full" style={{ background: 'var(--brand-gradient)' }} />
            <div className="flex items-center justify-between gap-3">
              <div><Title level={5} className="!m-0">پیش‌نمایش زنده</Title><Text type="secondary">کارت نمونه داشبورد</Text></div>
              <div className="rounded-full px-3 py-1 text-xs text-white" style={{ background: palette.colors[500] }}>{palette.label}</div>
            </div>
            <div className="mt-4 flex gap-2 text-xs"><span className="surface-soft rounded-lg px-3 py-2">{APP_FONT_FAMILIES[appearance.fontFamily].label} ۱۲۳۴۵</span><span className="surface-soft rounded-lg px-3 py-2">{theme === 'dark' ? 'تیره' : 'روشن'}</span></div>
          </div>

          <SettingBlock title="پیش‌تنظیم‌های آماده" hint="هر پیش‌تنظیم فقط گزینه‌های مرتبط را تغییر می‌دهد.">
            <div className="grid grid-cols-2 gap-2">{Object.entries(APPEARANCE_PRESETS).map(([id, preset]) => <Button key={id} onClick={() => applyPreset(id as AppearancePresetId)}>{preset.label}</Button>)}</div>
          </SettingBlock>

          <SettingBlock title="حالت نمایش">
            <div className="flex items-center justify-between gap-3 rounded-xl border border-[var(--app-card-border)] bg-[var(--app-surface)] px-4 py-3">
              <div>
                <Text strong className="!block !text-[var(--app-text)]">
                  {theme === 'dark' ? 'حالت تاریک' : 'حالت روشن'}
                </Text>
                <Text type="secondary" className="!text-xs">
                  با یک کلیک بین روشن و تاریک جابه‌جا شوید
                </Text>
              </div>
              <ThemeModeToggle />
            </div>
          </SettingBlock>

          <SettingBlock title="جایگاه منوی اصلی" hint="در حالت مخفی، منوی دائمی نمایش داده نمی‌شود.">
            <Select className="w-full" value={appearance.navigationPosition} onChange={value => update('navigationPosition', value)} options={options([['RIGHT', 'راست'], ['LEFT', 'چپ'], ['TOP', 'بالا'], ['BOTTOM', 'پایین'], ['HIDDEN', 'مخفی']])} />
          </SettingBlock>

          <SettingBlock title="فضای کار و منو">
            <div className="space-y-3">
              <Segmented block value={appearance.contentWidth} onChange={value => update('contentWidth', value as AppearancePreferences['contentWidth'])} options={options([['FOCUSED', 'متمرکز'], ['WIDE', 'عریض'], ['FULL', 'تمام‌عرض']])} />
              <Segmented block value={appearance.navigationWidth} onChange={value => update('navigationWidth', value as AppearancePreferences['navigationWidth'])} options={options([['COMPACT', 'باریک'], ['STANDARD', 'معمولی'], ['WIDE', 'عریض']])} />
              <ToggleRow label="نمایش عنوان منوها" checked={appearance.showNavigationLabels} onChange={value => update('showNavigationLabels', value)} />
            </div>
          </SettingBlock>

          <SettingBlock title="اجزای داشبورد" hint="فقط بخش‌هایی که در داشبورد فعلی وجود دارند.">
            <div className="space-y-3">
              <Segmented block value={appearance.dashboardLayout} onChange={value => update('dashboardLayout', value as AppearancePreferences['dashboardLayout'])} options={options([['SPLIT', 'نمودار و دسترسی کنار هم'], ['STACKED', 'نمودار و دسترسی زیر هم']])} />
              <Select className="w-full" value={appearance.metricColumns} onChange={value => update('metricColumns', value)} options={options([['AUTO', 'چینش خودکار کارت‌های آماری'], ['TWO', 'دو کارت در هر ردیف'], ['THREE', 'سه کارت در هر ردیف'], ['FOUR', 'چهار کارت در هر ردیف']])} />
              <Select className="w-full" value={appearance.dashboardListLimit} onChange={value => update('dashboardListLimit', value)} options={options([['FEW', '۳ دسترسی سریع'], ['STANDARD', '۴ دسترسی سریع'], ['MANY', '۶ دسترسی سریع']])} />
              <ToggleRow label="نمایش سربرگ معرفی و خروجی اکسل" checked={appearance.showDashboardHeader} onChange={value => update('showDashboardHeader', value)} />
              <ToggleRow label="نمایش کارت‌های آماری" checked={appearance.showDashboardMetrics} onChange={value => update('showDashboardMetrics', value)} />
              <ToggleRow label="نمایش نمودار توزیع ماژول‌ها" checked={appearance.showDashboardDistribution} onChange={value => update('showDashboardDistribution', value)} />
              <ToggleRow label="نمایش دسترسی‌های سریع" checked={appearance.showDashboardQuickActions} onChange={value => update('showDashboardQuickActions', value)} />
            </div>
          </SettingBlock>

          <SettingBlock title="پالت رنگی" hint="رنگ انتخابی روی منو، جدول، دکمه و نمودار اعمال می‌شود.">
            <div className="grid grid-cols-5 gap-3">{COLOR_THEMES.map(item => <Tooltip key={item.id} title={`${item.label} — ${item.description}`}><button type="button" aria-label={item.label} onClick={() => setColorTheme(item.id as ColorThemeId)} className="relative aspect-square rounded-xl border-2 transition-transform hover:scale-105" style={{ background: `linear-gradient(135deg, ${item.colors[500]}, ${item.accent[500]})`, borderColor: colorTheme === item.id ? 'var(--app-text)' : 'transparent' }}>{colorTheme === item.id && <CheckOutlined className="text-white" />}</button></Tooltip>)}</div>
          </SettingBlock>

          <SettingBlock title="فونت داشبورد" hint="فونت انتخابی بلافاصله روی تمام متن‌های داشبورد و کنترل‌ها اعمال می‌شود.">
            <div className="mb-3 flex items-center justify-between rounded-xl bg-[rgba(var(--color-primary-rgb),0.08)] px-3 py-2">
              <Text type="secondary" className="!text-xs">فونت انتخاب‌شده</Text>
              <Text strong className="!text-[var(--color-primary)]">{APP_FONT_FAMILIES[appearance.fontFamily].label}</Text>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {Object.entries(APP_FONT_FAMILIES).map(([id, font]) => {
                const isSelected = appearance.fontFamily === id;

                return (
                  <button
                    key={id}
                    type="button"
                    aria-pressed={isSelected}
                    onClick={() => update('fontFamily', id as AppearancePreferences['fontFamily'])}
                    className="relative min-h-[68px] rounded-xl border p-3 text-right transition hover:-translate-y-0.5 hover:border-[var(--color-primary)] hover:bg-[rgba(var(--color-primary-rgb),0.06)]"
                    style={{
                      '--app-font-family': font.css,
                      borderColor: isSelected ? 'var(--color-primary)' : 'var(--app-card-border)',
                      background: isSelected ? 'rgba(var(--color-primary-rgb),0.1)' : 'var(--app-surface)',
                    } as React.CSSProperties}
                  >
                    <span className="block text-sm font-bold text-[var(--app-text)]">{font.label}</span>
                    <span className="mt-1 block text-xs text-[rgb(var(--muted-foreground-rgb))]">نمونه متن ۱۲۳۴۵</span>
                    {isSelected && (
                      <span className="absolute left-2 top-2 grid h-5 w-5 place-items-center rounded-full bg-[var(--color-primary)] text-[10px] text-white">
                        <CheckOutlined />
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
            <div className="mt-3 space-y-3"><Segmented block value={appearance.fontScale} onChange={value => update('fontScale', value as AppearancePreferences['fontScale'])} options={options([['COMPACT', '۱۴'], ['COMFORTABLE', '۱۶'], ['LARGE', '۱۷']])} /><Segmented block value={appearance.fontWeight} onChange={value => update('fontWeight', value as AppearancePreferences['fontWeight'])} options={options([['NORMAL', 'معمولی'], ['MEDIUM', 'متوسط'], ['BOLD', 'ضخیم']])} /><Segmented block value={appearance.density} onChange={value => update('density', value as AppearancePreferences['density'])} options={options([['COMPACT', 'فشرده'], ['COMFORTABLE', 'راحت']])} /></div>
          </SettingBlock>

          <SettingBlock title="سطوح، مرز و حرکت">
            <div className="space-y-3"><Select className="w-full" value={appearance.radius} onChange={value => update('radius', value)} options={options([['COMPACT', 'گوشه کم'], ['MODERN', 'مدرن'], ['SOFT', 'نرم']])} /><Select className="w-full" value={appearance.borderStyle} onChange={value => update('borderStyle', value)} options={options([['SOFT', 'مرز نرم'], ['STANDARD', 'مرز معمولی'], ['STRONG', 'مرز قوی']])} /><Select className="w-full" value={appearance.cardShadow} onChange={value => update('cardShadow', value)} options={options([['NONE', 'بدون سایه'], ['SOFT', 'سایه نرم'], ['DEEP', 'سایه عمیق']])} /><Select className="w-full" value={appearance.accentIntensity} onChange={value => update('accentIntensity', value)} options={options([['SUBTLE', 'تأکید ملایم'], ['BALANCED', 'تأکید متعادل'], ['VIVID', 'تأکید زنده']])} /><Segmented block value={appearance.surfaceStyle} onChange={value => update('surfaceStyle', value as AppearancePreferences['surfaceStyle'])} options={options([['GLASS', 'شیشه‌ای'], ['SOLID', 'یکدست']])} /><ToggleRow label="الگوی پس‌زمینه" checked={appearance.showBackgroundPattern} onChange={value => update('showBackgroundPattern', value)} /><ToggleRow label="کاهش حرکت" checked={appearance.motion === 'REDUCED'} onChange={value => update('motion', value ? 'REDUCED' : 'FULL')} /></div>
          </SettingBlock>

          <Button danger block size="large" icon={<ReloadOutlined />} onClick={resetAppearance}>بازگردانی ظاهر پیش‌فرض</Button>
        </div>
      </Drawer>
    </>
  );
}
