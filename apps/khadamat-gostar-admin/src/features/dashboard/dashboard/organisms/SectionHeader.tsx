'use client';

import { Typography } from 'antd';
import type { ReactNode } from 'react';

import { useTranslate } from '@repo/i18n/react';

export function SectionHeader({
  title,
  icon,
  showAll = false,
  onShowAll,
}: {
  title: string;
  icon: ReactNode;
  showAll?: boolean;
  onShowAll?: () => void;
}) {
  const translate = useTranslate();

  return (
    <div className="portal-section-header">
      <div className="portal-section-title">
        <span className="portal-section-bar" />
        <span className="portal-section-icon">{icon}</span>
        <Typography.Text strong className="portal-section-heading">
          {title}
        </Typography.Text>
      </div>
      {showAll && (
        <button type="button" className="portal-show-all" onClick={onShowAll}>
          {translate('dashboardShowAll')}
        </button>
      )}
    </div>
  );
}
