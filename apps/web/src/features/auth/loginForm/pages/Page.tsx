'use client';

import React, { useMemo } from 'react';
import { Field } from 'formik';
import {
  ApiOutlined,
  BankOutlined,
  CheckCircleOutlined,
  DashboardOutlined,
  GlobalOutlined,
  KeyOutlined,
  LoginOutlined,
  SafetyCertificateOutlined,
  ThunderboltOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Segmented, Typography } from 'antd';
import { motion } from 'framer-motion';

import FormInput from '@/components/form/formInput';
import { CustomButton, FormikWrapper } from '@/components';
import { t } from '@/configs/language';
import type { LanguageCode } from '@/configs/language';
import { useLanguage } from '@/configs/language/languageProvider';
import { useTheme } from '@/contexts/app/themeContext';
import { cn } from '@/lib/talwindeMergeCn';
import { ThemeModeToggle } from '@repo/ui';

import { FullPageLoading } from '@/components/FullPageLoading';
import { useLoginFormViewModel } from '../model/ViewModel';

const { Text, Title } = Typography;

const languageOptions: Array<{ value: LanguageCode; labelKey: string; short: string }> = [
  { value: 'fa', labelKey: 'persian', short: 'فا' },
  { value: 'en', labelKey: 'english', short: 'EN' },
  { value: 'fr', labelKey: 'french', short: 'FR' },
  { value: 'ar', labelKey: 'arabic', short: 'AR' },
];

const visualStats = [
  { value: '24', labelKey: 'loginMetricTickets', icon: <DashboardOutlined /> },
  { value: '128', labelKey: 'loginMetricRequests', icon: <ApiOutlined /> },
  { value: '2FA', labelKey: 'loginMetricSecurity', icon: <SafetyCertificateOutlined /> },
];

const visualFeatures = [
  { labelKey: 'loginFeatureRealtime', icon: <ThunderboltOutlined /> },
  { labelKey: 'loginFeatureRoles', icon: <CheckCircleOutlined /> },
  { labelKey: 'loginFeatureReports', icon: <DashboardOutlined /> },
];

const chartBars = [42, 58, 49, 72, 86, 64, 94];

const LoginForm: React.FC = () => {
  const {
    initialValues,
    validationSchema,
    onSubmit,
    isSubmitting,
    loginLoadingMessage,
  } = useLoginFormViewModel();

  const {
    theme,
    colorTheme,
    colorThemes,
    setColorTheme,
  } = useTheme();
  const { direction, language, setLanguage } = useLanguage();
  const isDark = theme === 'dark';

  const languageSegmentOptions = useMemo(
    () =>
      languageOptions.map((item) => ({
        value: item.value,
        label: (
          <span title={t(item.labelKey as any)} className="font-semibold">
            {item.short}
          </span>
        ),
      })),
    [language],
  );

  return (
    <main
      className="web-login-page relative min-h-svh overflow-x-hidden px-4 py-3 text-zinc-950 sm:px-6 lg:px-8"
      style={{
        background: isDark
          ? 'linear-gradient(180deg, #0c111a 0%, #101826 100%)'
          : 'linear-gradient(180deg, #f3f5f8 0%, #f7f8fb 52%, #f3f5f8 100%)',
      }}
    >
      <FullPageLoading open={isSubmitting} message={loginLoadingMessage} />

      <div className="pointer-events-none absolute inset-0 opacity-[0.04] [background-image:linear-gradient(rgba(15,23,42,0.35)_1px,transparent_1px),linear-gradient(90deg,rgba(15,23,42,0.35)_1px,transparent_1px)] [background-size:46px_46px]" />

      <header
        dir={direction}
        className={cn(
          'relative z-20 mx-auto mb-3 flex w-full max-w-[1120px] flex-wrap items-center justify-between gap-3 rounded-[18px] border px-4 py-2.5 shadow-xl backdrop-blur-xl sm:px-5',
          isDark
            ? 'border-white/10 bg-black/30 shadow-black/30'
            : 'border-white/70 bg-white/58 shadow-black/10',
        )}
      >
        <div className="flex min-w-0 items-center gap-3">
          <div
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl text-lg"
            style={{
              background: isDark ? 'rgba(var(--color-primary-rgb), 0.22)' : 'rgba(var(--color-primary-rgb), 0.12)',
              color: 'rgb(var(--color-primary-rgb))',
            }}
          >
            <BankOutlined />
          </div>
          <div className="min-w-0">
            <Text strong className={cn('block text-[13px] sm:text-sm', isDark && '!text-white')}>
              {t('serviceSystemTitle')}
            </Text>
            <Text className={cn('text-[11px]', isDark ? '!text-zinc-400' : '!text-zinc-600')}>
              {t('refahBankPortal')}
            </Text>
          </div>
        </div>

        <div dir="ltr" className="flex flex-wrap items-center justify-end gap-2">
          <Segmented
            size="small"
            value={language}
            onChange={(value) => setLanguage(value as LanguageCode)}
            options={languageSegmentOptions}
            aria-label={t('chooseLanguage')}
          />

          <div className={cn(
            'flex items-center gap-1 rounded-full border px-2 py-1',
            isDark ? 'border-white/10 bg-white/[0.06]' : 'border-white/70 bg-white/70',
          )}>
            {colorThemes.map((preset) => {
              const isSelected = preset.key === colorTheme;

              return (
                <button
                  key={preset.key}
                  type="button"
                  title={t(preset.labelKey as any)}
                  aria-label={t(preset.labelKey as any)}
                  onClick={() => setColorTheme(preset.key)}
                  className={cn(
                    'h-5 w-5 rounded-full border transition duration-200',
                    isSelected ? 'scale-110 border-zinc-950 shadow-sm dark:border-white' : 'border-white/80 opacity-80 hover:opacity-100',
                  )}
                  style={{
                    background: `linear-gradient(135deg, ${preset.primary}, ${preset.accent})`,
                  }}
                />
              );
            })}
          </div>

          <ThemeModeToggle
            lightLabel={t('lightMode')}
            darkLabel={t('darkMode')}
          />
        </div>
      </header>

      <section className="relative z-10 mx-auto flex min-h-[calc(100svh-6.5rem)] w-full max-w-[1120px] items-center justify-center">
        <motion.div
          dir="ltr"
          initial={{ opacity: 0, y: 18, scale: 0.985 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.45 }}
          className={cn(
            'grid w-full overflow-hidden rounded-[22px] border shadow-2xl lg:min-h-[620px] lg:grid-cols-[0.94fr_1.06fr] xl:min-h-[660px]',
            isDark
              ? 'border-white/10 bg-[#08090d] shadow-black/50'
              : 'border-white/75 bg-white shadow-black/20',
          )}
        >
          <section
            dir={direction}
            className={cn(
              'flex min-h-[580px] flex-col px-6 py-6 sm:px-9 lg:min-h-[620px] lg:px-10 lg:py-8 xl:min-h-[660px] xl:px-12',
              isDark ? 'bg-[#08090d] text-white' : 'bg-white text-zinc-950',
            )}
          >
            <div className="flex flex-1 items-start py-5 lg:items-center lg:py-6">
              <div className="w-full">
                <div className="mb-7">
                  <div
                    className="mb-3 inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold sm:text-sm"
                    style={{
                      background: 'rgba(var(--color-primary-rgb), 0.12)',
                      color: 'rgb(var(--color-primary-rgb))',
                    }}
                  >
                    <GlobalOutlined />
                    {t('loginLanguageTitle')}: {t(languageOptions.find((item) => item.value === language)?.labelKey as any)}
                  </div>

                  <Title
                    level={1}
                    className={cn(
                      '!mb-2 !text-[28px] !font-black !leading-[1.35] sm:!text-[32px] xl:!text-[34px]',
                      isDark ? '!text-white' : '!text-zinc-950',
                    )}
                  >
                    {t('loginAccountTitle')}
                  </Title>
                  <Text className={cn('text-sm leading-7 sm:text-[15px]', isDark ? '!text-zinc-400' : '!text-zinc-500')}>
                    {t('loginAccountDescription')}
                  </Text>
                </div>

                <FormikWrapper
                  initialValues={initialValues}
                  validationSchema={validationSchema}
                  onSubmit={onSubmit}
                >
                  {({ errors, touched }) => (
                    <div className="space-y-4">
                      <div>
                        <label className={cn('mb-2 block text-sm font-semibold', isDark ? 'text-zinc-200' : 'text-zinc-700')}>
                          {t('userName')}
                        </label>
                        <Field
                          name="userName"
                          showLabel={false}
                          component={FormInput}
                          prefix={
                            <UserOutlined
                              className={cn(
                                errors.userName && touched.userName
                                  ? 'text-red-500'
                                  : 'text-zinc-400',
                              )}
                            />
                          }
                          stylesInput={cn(
                            'login-auth-input !h-12 !rounded-2xl !px-4 !text-[15px] !text-right',
                            isDark
                              ? '!border-white/10 !bg-white/[0.05] !text-white placeholder:!text-zinc-500'
                              : '!border-zinc-300 !bg-white !text-zinc-950',
                          )}
                          placeholder={t('userNamePlaceholder')}
                        />
                      </div>

                      <div>
                        <div className="mb-2 flex items-center justify-between gap-3">
                          <label className={cn('block text-sm font-semibold', isDark ? 'text-zinc-200' : 'text-zinc-700')}>
                            {t('password')}
                          </label>
                          <span
                            className="text-xs font-semibold"
                            style={{ color: 'rgb(var(--color-primary-rgb))' }}
                          >
                            {t('forgotPassword')}
                          </span>
                        </div>
                        <Field
                          name="password"
                          type="password"
                          showLabel={false}
                          showPasswordToggle
                          component={FormInput}
                          prefix={
                            <KeyOutlined
                              className={cn(
                                errors.password && touched.password
                                  ? 'text-red-500'
                                  : 'text-zinc-400',
                              )}
                            />
                          }
                          stylesInputPassword={cn(
                            'login-auth-input !h-12 !rounded-2xl !px-4 !text-[15px] !text-right',
                            isDark
                              ? '!border-white/10 !bg-white/[0.05] !text-white'
                              : '!border-zinc-300 !bg-white !text-zinc-950',
                          )}
                          placeholder={t('passwordPlaceholder')}
                        />
                      </div>

                      <CustomButton
                        label={t('loginToSystem')}
                        loading={isSubmitting}
                        type="primary"
                        block
                        size="large"
                        animated={false}
                        icon={<LoginOutlined />}
                        iconPosition={direction === 'rtl' ? 'end' : 'start'}
                        className="login-submit-button !h-12 !rounded-2xl !border-none !text-[15px] !font-semibold !text-white shadow-lg shadow-[rgba(var(--color-primary-rgb),0.24)]"
                        style={{ background: 'var(--brand-gradient)' }}
                      />
                    </div>
                  )}
                </FormikWrapper>

                <div className="mt-6 flex items-start gap-3 text-xs leading-6 sm:text-sm">
                  <SafetyCertificateOutlined
                    className="mt-1"
                    style={{ color: 'rgb(var(--color-primary-rgb))' }}
                  />
                  <Text className={cn(isDark ? '!text-zinc-400' : '!text-zinc-500')}>
                    {t('forgotPasswordHelp')}
                  </Text>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
              <Text className={cn(isDark ? '!text-zinc-500' : '!text-zinc-400')}>
                {t('copyrightText', { year: new Date().getFullYear() })}
              </Text>
              <Text className={cn(isDark ? '!text-zinc-500' : '!text-zinc-400')}>
                {t('versionLabel')}
              </Text>
            </div>
          </section>

          <aside
            className="web-login-visual relative hidden min-h-[620px] overflow-hidden p-4 lg:block xl:min-h-[660px]"
            style={{
              background: isDark
                ? 'linear-gradient(135deg, rgba(var(--color-primary-rgb), 0.26), rgba(var(--color-accent-rgb), 0.12))'
                : 'linear-gradient(135deg, rgba(var(--color-primary-rgb), 0.24), rgba(var(--color-accent-rgb), 0.16))',
            }}
          >
            <div className="absolute inset-4 rounded-[18px] bg-white/24 shadow-inner shadow-white/20 backdrop-blur-sm dark:bg-black/18" />
            <div className="absolute left-8 top-10 h-24 w-24 rounded-full bg-white/24 blur-2xl" />
            <div className="absolute bottom-12 right-10 h-28 w-28 rounded-full bg-[rgba(var(--color-accent-rgb),0.28)] blur-3xl" />

            <div className="relative flex h-full min-h-[580px] items-center justify-center xl:min-h-[620px]">
              <div className="relative h-[540px] w-full max-w-[480px] xl:h-[560px]">
                <div className="absolute left-6 top-10 flex items-end gap-2">
                  {chartBars.map((height, index) => (
                    <span
                      key={height + index}
                      className="block w-4 rounded-t-lg bg-[rgb(var(--color-primary-rgb))] shadow-lg shadow-black/10"
                      style={{
                        height: Math.round(height * 0.85),
                        opacity: 0.48 + index * 0.06,
                      }}
                    />
                  ))}
                  <span className="absolute -right-7 -top-7 text-4xl text-[rgb(var(--color-primary-rgb))]">↗</span>
                </div>

                <div className="absolute right-4 top-16 h-56 w-64 rotate-3 rounded-[24px] border border-white/40 bg-[var(--brand-700)] p-4 shadow-2xl shadow-black/25">
                  <div className="mb-4 flex items-center justify-between">
                    <div className="h-2.5 w-20 rounded-full bg-white/22" />
                    <div className="h-7 w-14 rounded-xl bg-[rgb(var(--color-accent-rgb))]" />
                  </div>
                  <div className="mb-4 grid grid-cols-3 gap-2">
                    {visualStats.map((item) => (
                      <div key={item.labelKey} className="rounded-2xl bg-white/10 p-2.5 text-white">
                        <div className="mb-1.5 text-sm text-[rgb(var(--color-primary-rgb))]">{item.icon}</div>
                        <div className="text-base font-black">{item.value}</div>
                        <div className="mt-1 truncate text-[10px] text-white/58">{t(item.labelKey as any)}</div>
                      </div>
                    ))}
                  </div>
                  <div className="flex h-24 items-end gap-2 rounded-2xl bg-white/8 p-3">
                    {chartBars.slice(0, 6).map((height, index) => (
                      <span
                        key={`screen-${height}-${index}`}
                        className="flex-1 rounded-t-md bg-[rgb(var(--color-primary-rgb))]"
                        style={{ height: `${height}%`, opacity: 0.52 + index * 0.07 }}
                      />
                    ))}
                  </div>
                </div>

                <div className="absolute left-20 top-[180px] rounded-[22px] border border-white/45 bg-white/72 p-4 shadow-2xl shadow-black/10 backdrop-blur-md dark:bg-white/18">
                  <div className="flex items-center gap-3">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[rgba(var(--color-primary-rgb),0.16)] text-2xl text-[rgb(var(--color-primary-rgb))]">
                      <BankOutlined />
                    </div>
                    <div>
                      <div className="h-2.5 w-24 rounded-full bg-zinc-900/20 dark:bg-white/40" />
                      <div className="mt-2.5 h-2.5 w-16 rounded-full bg-zinc-900/12 dark:bg-white/24" />
                    </div>
                  </div>
                </div>

                <div className="absolute bottom-32 left-8 h-28 w-48 -rotate-6 rounded-[24px] border border-white/45 bg-[var(--brand-700)] p-4 shadow-2xl shadow-black/20">
                  <div className="mb-5 h-2.5 w-20 rounded-full bg-white/22" />
                  <div className="relative h-14">
                    <svg viewBox="0 0 180 60" className="h-full w-full text-[rgb(var(--color-primary-rgb))]">
                      <polyline
                        points="0,45 26,38 48,42 70,20 96,28 118,12 140,18 180,6"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                </div>

                <div className="absolute bottom-16 right-14 h-20 w-40 rotate-6 rounded-[22px] border border-white/45 bg-white/74 p-3 shadow-2xl shadow-black/10 backdrop-blur-md dark:bg-white/18">
                  <div className="grid h-full grid-cols-4 items-end gap-2">
                    {[52, 76, 44, 68].map((height, index) => (
                      <span
                        key={`mini-${height}-${index}`}
                        className="rounded-t-md bg-[rgb(var(--color-accent-rgb))]"
                        style={{ height: `${height}%`, opacity: 0.75 }}
                      />
                    ))}
                  </div>
                </div>

                <div className="absolute bottom-24 right-0 grid gap-2">
                  {[0, 1, 2].map((item) => (
                    <span
                      key={item}
                      className="h-8 w-16 rounded-full border border-white/45 bg-[rgb(var(--color-primary-rgb))] shadow-lg shadow-black/15"
                    />
                  ))}
                </div>

                <div className="absolute bottom-4 left-4 grid w-[420px] grid-cols-3 gap-2.5">
                  {visualFeatures.map((item) => (
                    <div
                      key={item.labelKey}
                      className="rounded-2xl border border-white/42 bg-white/52 p-3 shadow-lg shadow-black/5 backdrop-blur-md dark:bg-white/14"
                    >
                      <div className="mb-2 text-lg text-[rgb(var(--color-primary-rgb))]">{item.icon}</div>
                      <Text className="block text-[11px] font-semibold !text-zinc-700 dark:!text-white/80">
                        {t(item.labelKey as any)}
                      </Text>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </aside>
        </motion.div>
      </section>
    </main>
  );
};

export default LoginForm;
