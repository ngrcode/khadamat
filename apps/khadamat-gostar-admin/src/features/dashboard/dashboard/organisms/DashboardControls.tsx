'use client';

import { CheckOutlined, GlobalOutlined } from '@ant-design/icons';
import { Dropdown, Tooltip } from 'antd';
import type { MenuProps } from 'antd';

import type { LanguageCode } from '@repo/i18n';
import { useLanguage, useTranslate } from '@repo/i18n/react';
import { ThemeModeToggle } from '@repo/ui';
import AppearanceSettingsDrawer from '@/components/appearance/AppearanceSettingsDrawer';

const languageOptions: Array<{
  value: LanguageCode;
  labelKey: string;
  shortKey: string;
}> = [
  { value: 'fa', labelKey: 'persian', shortKey: 'dashboardLanguageFaShort' },
  { value: 'en', labelKey: 'english', shortKey: 'dashboardLanguageEnShort' },
  { value: 'fr', labelKey: 'french', shortKey: 'dashboardLanguageFrShort' },
  { value: 'ar', labelKey: 'arabic', shortKey: 'dashboardLanguageArShort' },
];

export function DashboardControls() {
  const { language, setLanguage } = useLanguage();
  const translate = useTranslate();
  const activeLanguage = languageOptions.find((item) => item.value === language);
  const languageItems: MenuProps['items'] = languageOptions.map((item) => ({
    key: item.value,
    label: translate(item.labelKey),
    icon:
      language === item.value ? (
        <CheckOutlined />
      ) : (
        <span className="inline-block w-[14px]" />
      ),
  }));

  return (
    <div className="portal-control-panel">
      <div className="portal-control-group">
        <AppearanceSettingsDrawer />
      </div>

      <div className="portal-control-group portal-theme-mode-group">
        <ThemeModeToggle
          lightLabel={translate('lightMode')}
          darkLabel={translate('darkMode')}
        />
      </div>

      <div className="portal-control-group">
        <Dropdown
          trigger={['click']}
          placement="bottomLeft"
          menu={{
            items: languageItems,
            selectedKeys: [language],
            onClick: ({ key }) => setLanguage(key as LanguageCode),
          }}
        >
          <Tooltip
            title={`${translate('chooseLanguage')}: ${
              activeLanguage ? translate(activeLanguage.labelKey) : ''
            }`}
          >
            <button
              type="button"
              className="portal-control-icon admin-language-trigger"
              aria-label={translate('chooseLanguage')}
            >
              <GlobalOutlined />
              <span className="admin-language-code">
                {activeLanguage
                  ? translate(activeLanguage.shortKey)
                  : language.toUpperCase()}
              </span>
            </button>
          </Tooltip>
        </Dropdown>
      </div>
    </div>
  );
}
