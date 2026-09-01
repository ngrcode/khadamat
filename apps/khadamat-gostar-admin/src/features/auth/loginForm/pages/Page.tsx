'use client';

import React from 'react';
import Image from 'next/image';
import { Field } from 'formik';
import {
  BankOutlined,
  GlobalOutlined,
  KeyOutlined,
  LoginOutlined,
  SafetyCertificateOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Segmented, Typography } from 'antd';
import { motion } from 'framer-motion';

import { t } from '@repo/i18n';
import type { LanguageCode } from '@repo/i18n';
import { useLanguage } from '@repo/i18n/react';
import { useTheme } from '@repo/theme';
import { ThemeModeToggle } from '@repo/ui';
import { CustomButton, FormInput, FormikWrapper } from '@repo/ui';
import { cn } from '@repo/utils/cn';

import { useLoginFormViewModel } from '../model/ViewModel';

const { Text, Title } = Typography;

const languageOptions: Array<{ value: LanguageCode; labelKey: string; short: string }> = [
  { value: 'fa', labelKey: 'persian', short: 'فا' },
  { value: 'en', labelKey: 'english', short: 'EN' },
  { value: 'fr', labelKey: 'french', short: 'FR' },
  { value: 'ar', labelKey: 'arabic', short: 'AR' },
];

const LoginForm: React.FC = () => {
  const {
    initialValues,
    validationSchema,
    onSubmit,
    isSubmitting,
  } = useLoginFormViewModel();

  const {
    theme,
    colorTheme,
    colorThemes,
    setColorTheme,
  } = useTheme();
  const { direction, language, setLanguage } = useLanguage();
  const isDark = theme === 'dark';

  const languageSegmentOptions = languageOptions.map((item) => ({
    value: item.value,
    label: (
      <span title={t(item.labelKey as any)} className="font-semibold">
        {item.short}
      </span>
    ),
  }));

  return (
    <main
      className="admin-login-page relative min-h-svh overflow-x-hidden px-4 py-3 text-zinc-950 sm:px-6 lg:px-8"
      style={{
        background: isDark
          ? 'linear-gradient(180deg, #0c111a 0%, #101826 100%)'
          : 'linear-gradient(180deg, #f3f5f8 0%, #f7f8fb 52%, #f3f5f8 100%)',
      }}
    >
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
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl text-xl"
            style={{
              background: isDark ? 'rgba(var(--color-primary-rgb), 0.22)' : 'rgba(var(--color-primary-rgb), 0.12)',
              color: 'rgb(var(--color-primary-rgb))',
            }}
          >
            <BankOutlined />
          </div>
          <div className="min-w-0">
            <Text strong className={cn('block text-sm sm:text-base', isDark && '!text-white')}>
              {t('serviceSystemTitle')}
            </Text>
            <Text className={cn('text-xs', isDark ? '!text-zinc-400' : '!text-zinc-600')}>
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
                    className="mb-4 inline-flex items-center gap-2 rounded-full px-3 py-1 text-sm font-semibold"
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
                      '!mb-2 !text-[30px] !font-black !leading-[1.35] sm:!text-[34px] xl:!text-[36px]',
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
                            'login-auth-input !h-12 !rounded-2xl !px-4 !text-base !text-right',
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
                            'login-auth-input !h-12 !rounded-2xl !px-4 !text-base !text-right',
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
                        icon={<LoginOutlined className='!mt-3'/>}
                        iconPosition={direction === 'rtl' ? 'end' : 'start'}
                        className="login-submit-button !h-12 !rounded-2xl !border-none !text-white shadow-lg shadow-[rgba(var(--color-primary-rgb),0.24)]"
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
            className="admin-login-visual relative hidden min-h-[620px] overflow-hidden lg:block xl:min-h-[660px]"
          >
            <Image
              src="/images/admin-login-management.png"
              alt="مدیریت هوشمند سامانه خدمات گستر"
              fill
              priority
              sizes="(min-width: 1024px) 54vw, 0px"
              className="object-cover object-center"
            />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(29,13,73,0.04),rgba(29,13,73,0.2))]" />
            <div className="absolute inset-x-6 bottom-6 rounded-2xl border border-white/20 bg-black/25 p-5 text-right text-white shadow-2xl backdrop-blur-md">
              <div className="mb-2 flex items-center justify-end gap-2 text-base font-black">
                <span>{t('serviceSystemTitle')}</span>
                <SafetyCertificateOutlined className="text-[var(--brand-accent-300)]" />
              </div>
              <p className="m-0 text-xs leading-6 text-white/75">
                پنل یکپارچه مدیریت کاربران، خدمات، درخواست‌ها و دسترسی‌های سازمانی
              </p>
            </div>
          </aside>
        </motion.div>
      </section>
    </main>
  );
};

export default LoginForm;
