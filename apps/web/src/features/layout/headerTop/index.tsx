'use client';

import {
  LogoutOutlined,
  MenuOutlined,
  LoadingOutlined,
  CheckOutlined,
  SettingOutlined,
  BgColorsOutlined,
  FontSizeOutlined,
  ColumnHeightOutlined,
  ReloadOutlined,
  EyeOutlined,
  ColumnWidthOutlined,
  BankOutlined,
  SafetyCertificateOutlined,
  TranslationOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Col, Row, Switch, Button, Spin, Tooltip, Dropdown, Popover, Slider, Segmented, Space, Typography, Divider } from 'antd';
import type { MenuProps } from 'antd';
import React, { useState, useEffect, useCallback } from 'react';
import { cn } from '@/lib/talwindeMergeCn';
import DrawerResponsive from './drawerResponsive/drawerResponsive';
import { useTheme } from '@/contexts/app/themeContext';
import { useAuthStore } from '@/store/authStore';
import { showError } from '@/hook/useToust';
import { useLanguage } from '@/configs/language/languageProvider';
import { t } from '@/configs/language';
import type { LanguageCode } from '@/configs/language';
import type { ColorThemeKey, ContentWidthKey, ContrastKey, DensityKey } from '@/contexts/app/themeContext';
import AppearanceSettingsDrawer from '@/components/appearance/AppearanceSettingsDrawer';
import { FullPageLoading } from '@/components/FullPageLoading';
import { ThemeModeToggle } from '@repo/ui';
import { clearPreLoginSession } from '@/utils/clearPreLoginSession';

const { Text } = Typography;

export const HeaderTop = () => {
  const {
    theme: isDarkModethem,
    colorTheme,
    colorThemes,
    setColorTheme,
    fontSize,
    setFontSize,
    density,
    setDensity,
    radius,
    setRadius,
    contrast,
    setContrast,
    reduceMotion,
    setReduceMotion,
    contentWidth,
    setContentWidth,
    resetThemePreferences,
  } = useTheme();
  const { direction, language, setLanguage } = useLanguage();

  const userName = useAuthStore((state) => state.userName);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const logout = useAuthStore((state) => state.logout);
  const setLoading = useAuthStore((state) => state.setLoading);
  const isLoading = useAuthStore((state) => state.isLoading);
  const _hasHydrated = useAuthStore((state) => state._hasHydrated);

  const [isMobile, setIsMobile] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [logoutLoading, setLogoutLoading] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    const handleScroll = () => setScrolled(window.scrollY > 20);

    handleResize();
    window.addEventListener('resize', handleResize);
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleLogout = useCallback(async () => {
    if (logoutLoading) return;

    try {
      setLogoutLoading(true);
      setLoading(true);

      // Let the full-page overlay paint before clearing session / navigating.
      await new Promise<void>((resolve) => {
        requestAnimationFrame(() => requestAnimationFrame(() => resolve()));
      });

      await clearPreLoginSession();
      logout();

      window.location.href = `${window.location.origin}/login`;
      return;
    } catch (error: any) {
      const errorMessage = error?.message || t('logoutError');
      showError(errorMessage);
      console.error('Logout error:', error);
      setLogoutLoading(false);
      setLoading(false);
    }
  }, [logout, setLoading, logoutLoading]);

  if (!mounted || !_hasHydrated) {
    return (
      <div
        style={{
          height: 75,
          zIndex: 40,
          background: 'var(--ant-layout-header)',
          borderBottom: 'var(--glass-border)'
        }}
        className="w-full fixed top-0 left-0 right-0 backdrop-blur-[5px]"
      />
    );
  }

  const isDarkMode = isDarkModethem === 'dark';
  const isLoading_state = isLoading || logoutLoading;
  const languageLabels: Record<LanguageCode, string> = {
    fa: t('persian'),
    en: t('english'),
    fr: t('french'),
    ar: t('arabic'),
  };
  const languageItems: MenuProps['items'] = [
    {
      key: 'fa',
      label: languageLabels.fa,
      icon: language === 'fa' ? <CheckOutlined /> : null,
    },
    {
      key: 'en',
      label: languageLabels.en,
      icon: language === 'en' ? <CheckOutlined /> : null,
    },
    {
      key: 'fr',
      label: languageLabels.fr,
      icon: language === 'fr' ? <CheckOutlined /> : null,
    },
    {
      key: 'ar',
      label: languageLabels.ar,
      icon: language === 'ar' ? <CheckOutlined /> : null,
    },
  ];
  const brandOffsetClass = isMobile
    ? direction === 'rtl'
      ? 'mr-4'
      : 'ml-4'
    : direction === 'rtl'
      ? 'mr-28'
      : 'ml-28';

  const settingsContent = (
    <div style={{ width: isMobile ? 260 : 320, direction }}>
      <Space direction="vertical" size={12} className="w-full">
        <div>
          <Space className="mb-2">
            <BgColorsOutlined />
            <Text strong>{t('colorTheme')}</Text>
          </Space>
          <div className="grid grid-cols-7 gap-2 max-[360px]:grid-cols-4">
            {colorThemes.map((preset) => {
              const isSelected = colorTheme === preset.key;

              return (
                <Tooltip key={preset.key} title={t(preset.labelKey as any)}>
                  <Button
                    aria-label={t(preset.labelKey as any)}
                    shape="circle"
                    onClick={() => setColorTheme(preset.key as ColorThemeKey)}
                    icon={isSelected ? <CheckOutlined /> : null}
                    style={{
                      background: `linear-gradient(135deg, ${preset.primary}, ${preset.accent})`,
                      borderColor: isSelected ? 'rgb(var(--foreground-rgb))' : 'transparent',
                      boxShadow: isSelected ? '0 0 0 2px rgba(var(--color-primary-rgb), 0.22)' : 'none',
                      color: '#ffffff',
                    }}
                  />
                </Tooltip>
              );
            })}
          </div>
        </div>

        <Divider className="my-1" />

        <div>
          <Space className="mb-2">
            <FontSizeOutlined />
            <Text strong>{t('fontSize')}</Text>
            <Text type="secondary">{fontSize}px</Text>
          </Space>
          <Slider
            min={12}
            max={18}
            step={1}
            value={fontSize}
            onChange={setFontSize}
            tooltip={{ formatter: (value) => `${value}px` }}
          />
        </div>

        <div>
          <Space className="mb-2">
            <ColumnHeightOutlined />
            <Text strong>{t('density')}</Text>
          </Space>
          <Segmented
            block
            value={density}
            onChange={(value) => setDensity(value as DensityKey)}
            options={[
              { label: t('densityCompact'), value: 'compact' },
              { label: t('densityComfortable'), value: 'comfortable' },
              { label: t('densitySpacious'), value: 'spacious' },
            ]}
          />
        </div>

        <div>
          <Space className="mb-2">
            <ColumnWidthOutlined />
            <Text strong>{t('contentWidth')}</Text>
          </Space>
          <Segmented
            block
            value={contentWidth}
            onChange={(value) => setContentWidth(value as ContentWidthKey)}
            options={[
              { label: t('contentFluid'), value: 'fluid' },
              { label: t('contentBoxed'), value: 'boxed' },
            ]}
          />
        </div>

        <div>
          <Space className="mb-2">
            <SettingOutlined />
            <Text strong>{t('cornerRadius')}</Text>
            <Text type="secondary">{radius}px</Text>
          </Space>
          <Slider
            min={4}
            max={16}
            step={1}
            value={radius}
            onChange={setRadius}
            tooltip={{ formatter: (value) => `${value}px` }}
          />
        </div>

        <div className="grid grid-cols-1 gap-2">
          <div className="flex items-center justify-between gap-3 rounded-lg border border-[var(--app-card-border)] bg-[var(--app-card-bg)] px-3 py-2">
            <Space>
              <EyeOutlined />
              <Text>{t('highContrast')}</Text>
            </Space>
            <Switch
              size="small"
              checked={contrast === 'high'}
              onChange={(checked) => setContrast((checked ? 'high' : 'normal') as ContrastKey)}
            />
          </div>
          <div className="flex items-center justify-between gap-3 rounded-lg border border-[var(--app-card-border)] bg-[var(--app-card-bg)] px-3 py-2">
            <Space>
              <SettingOutlined />
              <Text>{t('reduceMotion')}</Text>
            </Space>
            <Switch
              size="small"
              checked={reduceMotion}
              onChange={setReduceMotion}
            />
          </div>
        </div>

        <Button
          block
          icon={<ReloadOutlined />}
          onClick={resetThemePreferences}
        >
          {t('resetSettings')}
        </Button>
      </Space>
    </div>
  );

  void settingsContent;

  return (
    <>
      <FullPageLoading open={logoutLoading} message={t('logoutLoading')} />

    <div
      className={cn(
        'w-full fixed top-0 left-0 right-0 py-2 transition-all duration-300 backdrop-blur-[5px]',
        scrolled ? 'shadow-lg' : 'shadow-md'
      )}
      style={{
        height: 75,
        zIndex: 40,
        direction,
        background: 'var(--ant-layout-header)',
        borderBottom: 'var(--glass-border)',
        boxShadow: scrolled ? 'var(--glass-shadow)' : 'none'
      }}
    >
      <Row align="middle" justify="space-between" wrap={false} className="px-4 h-full">

        <Col flex="auto" className="min-w-0">
          <div className={cn('flex min-w-0 items-center gap-3', brandOffsetClass)}>
            <div className="app-brand-lockup flex min-w-0 items-center gap-3">
              <div className="app-brand-mark">
                <BankOutlined style={{ fontSize: 22 }} />
              </div>
              <div className="min-w-0 leading-tight">
                <div className="app-brand-title">{t('serviceSystemTitle')}</div>
                {!isMobile && (
                  <div className="app-brand-caption inline-flex items-center gap-1">
                    <SafetyCertificateOutlined />
                    <span>{t('refahBankPortal')}</span>
                  </div>
                )}
              </div>
            </div>

            {isAuthenticated && userName && (
              <div
                className={cn(
                  'app-user-chip text-sm font-medium transition-all',
                  isLoading_state && 'opacity-50'
                )}
              >
                <UserOutlined style={{ color: 'var(--color-primary)' }} />
                <span>{userName}</span>
              </div>
            )}
          </div>
        </Col>

        <Col className="flex items-center gap-3 px-3">
          <Dropdown
            trigger={['click']}
            placement={direction === 'rtl' ? 'bottomRight' : 'bottomLeft'}
            disabled={isLoading_state}
            menu={{
              items: languageItems,
              selectedKeys: [language],
              onClick: ({ key }) => {
                if (key === 'fa' || key === 'en' || key === 'fr' || key === 'ar') {
                  setLanguage(key as LanguageCode);
                }
              },
            }}
          >
            <Tooltip title={`${t('systemLanguage')}: ${languageLabels[language]}`}>
              <Button
                type="text"
                shape="circle"
                disabled={isLoading_state}
                aria-label={t('chooseLanguage')}
                className="app-header-icon-button"
                icon={
                  <TranslationOutlined style={{ fontSize: 19 }} />
                }
              />
            </Tooltip>
          </Dropdown>

          <AppearanceSettingsDrawer />

          <ThemeModeToggle
            disabled={isLoading_state}
            lightLabel={t('lightMode')}
            darkLabel={t('darkMode')}
          />
        </Col>

        <Col>
          {!isMobile && isAuthenticated && (
            <Button
              type="text"
              onClick={handleLogout}
              disabled={isLoading_state}
              className={cn(
                'flex items-center gap-2 rounded-lg transition-all px-4 py-2 font-medium',
                isDarkMode
                  ? 'text-gray-300 hover:bg-red-950/30 hover:text-red-400'
                  : 'text-gray-700 hover:bg-red-50 hover:text-red-600',
                isLoading_state && 'opacity-50 cursor-not-allowed'
              )}
            >
              {isLoading_state ? (
                <Spin indicator={<LoadingOutlined style={{ fontSize: 18, color: 'var(--color-accent)' }} />} />
              ) : (
                <LogoutOutlined style={{ fontSize: 18 }} />
              )}
              <span>
                {isLoading_state ? '...' : t('logout')}
              </span>
            </Button>
          )}

          {isMobile && isAuthenticated && (
            <DrawerResponsive
              userName={userName}
              onLogout={handleLogout}
              isLoading={isLoading_state}
            />
          )}

          {isMobile && !isAuthenticated && (
            <Button
              type="text"
              className="app-header-icon-button"
              icon={
                <MenuOutlined style={{ fontSize: 22 }} />
              }
              disabled={isLoading_state}
            />
          )}
        </Col>
      </Row>
    </div>
    </>
  );
};
